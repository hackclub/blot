const width = 125;
const height = 125;

setDocDimensions(width, height);

const turtle = createTurtle();


const polygons = Polygons();



const cubes = [];
const Point = class {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.xp = 0;
    this.yp = 0;
  }
  project(angle) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const xy = angle.cx * y - angle.sx * z;
    const xz = angle.sx * y + angle.cx * z;
    const yz = angle.cy * xz - angle.sy * x;
    const yx = angle.sy * xz + angle.cy * x;
    const scale = 0.65 * fov / (fov + yz);
    this.xp = yx * scale;
    this.yp = xy * scale;
    return yz;
  }
};
const Face = class {
  constructor(p0, p1, p2, p3) {
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
  project(angle) {
    this.p0.project(angle);
    this.p1.project(angle);
    this.p2.project(angle);
    this.p3.project(angle);
  }
  draw() {
    if (((this.p1.yp - this.p0.yp) / (this.p1.xp - this.p0.xp) < (this.p2.yp - this.p0.yp) / (this.p2.xp - this.p0.xp) ^ this.p0.xp < this.p1.xp == this.p0.xp > this.p2.xp)) {
      const p = polygons.create();
      p.addPoints(
        [this.p0.xp, this.p0.yp],
        [this.p1.xp, this.p1.yp],
        [this.p2.xp, this.p2.yp],
        [this.p3.xp, this.p3.yp]
      );
      p.addOutline(0);
      polygons.draw(turtle, p);
    }
  }
};
const Cube = class {
  constructor(x, y, z, w, h, p) {
    p /= 2;
    w /= 2;
    h /= 2;
    this.z = 0;
    this.points = [
      new Point(x - w, y - h, z - p),
      new Point(x + w, y - h, z - p),
      new Point(x + w, y + h, z - p),
      new Point(x - w, y + h, z - p),
      new Point(x - w, y - h, z + p),
      new Point(x + w, y - h, z + p),
      new Point(x + w, y + h, z + p),
      new Point(x - w, y + h, z + p)
    ];
    const c = this.points;
    this.faces = [
      new Face(c[0], c[1], c[2], c[3]),
      new Face(c[0], c[4], c[5], c[1]),
      new Face(c[3], c[2], c[6], c[7]),
      new Face(c[0], c[3], c[7], c[4]),
      new Face(c[1], c[5], c[6], c[2]),
      new Face(c[5], c[4], c[7], c[6])
    ];
    cubes.push(this);
  }
  project(angle) {
    this.z = 0;
    for (const p of this.points) this.z += p.project(angle);

  }
  draw() {
    for (const f of this.faces) f.draw();
  }
};
const fov = 300;
const rx = 2 * Math.random() - 1;
const ry = 2 * Math.random() - 1;
const angle = {
  cx: Math.cos(rx),
  sx: Math.sin(rx),
  cy: Math.cos(ry),
  sy: Math.sin(ry)
};
for (let x = -4; x <= 4; x++) {
  for (let y = -4; y <= 4; y++) {
    for (let z = -4; z <= 4; z++) {
      new Cube(x * 20, y * 20, z * 20, 15, 15, 15);
    }
  }
}
for (let c of cubes) c.project(angle);
cubes.sort((a, b) => a.z - b.z);
for (let c of cubes) c.draw();

function Polygons() {
  const polygonList = [];
  const linesDrawn = [];
  const Polygon = class {
    constructor() {
      this.cp = []; // clip path
      this.dp = []; // 2d line 
      this.aabb = []; // AABB bounding box
    }
    addPoints(...points) {
      for (let i = 0; i < points.length; i++) this.cp.push(points[i]);
      this.aabb = this.AABB();
    }
    addSegments(...points) {
      for (let i = 0; i < points.length; i++) this.dp.push(points[i]);
    }
    addOutline(s = 0) {
      for (let i = s, l = this.cp.length; i < l; i++) {
        this.dp.push(this.cp[i], this.cp[(i + 1) % l]);
      }
    }
    createPoly(x, y, c, r, a) {
      this.cp.length = 0;
      for (let i = 0; i < c; i++) {
        this.cp.push([
          x + Math.sin(i * Math.PI * 2 / c + a) * r,
          y + Math.cos(i * Math.PI * 2 / c + a) * r
        ]);
      }
      this.aabb = this.AABB();
    }
    draw(t) {
      if (this.dp.length === 0) return;
      for (let i = 0, l = this.dp.length; i < l; i += 2) {
        const d0 = this.dp[i];
        const d1 = this.dp[i + 1];
        const line_hash =
          Math.min(d0[0], d1[0]).toFixed(2) +
          "-" +
          Math.max(d0[0], d1[0]).toFixed(2) +
          "-" +
          Math.min(d0[1], d1[1]).toFixed(2) +
          "-" +
          Math.max(d0[1], d1[1]).toFixed(2);

        if (!linesDrawn[line_hash]) {
          t.up();
          t.goTo(d0);
          t.down();
          t.goTo(d1);
          linesDrawn[line_hash] = true;
        }
      }
    }
    AABB() {
      let xmin = 2024;
      let xmax = -2000;
      let ymin = 2000;
      let ymax = -2000;
      for (let i = 0, l = this.cp.length; i < l; i++) {
        const x = this.cp[i][0];
        const y = this.cp[i][1];
        if (x < xmin) xmin = x;
        if (x > xmax) xmax = x;
        if (y < ymin) ymin = y;
        if (y > ymax) ymax = y;
      }

      // Bounding box: center x, center y, half width, half height

      return [
        (xmin + xmax) * 0.5,
        (ymin + ymax) * 0.5,
        (xmax - xmin) * 0.5,
        (ymax - ymin) * 0.5
      ];
    }
    addHatching(a, d) {
      const tp = new Polygon();
      tp.cp.push(
        [this.aabb[0] - this.aabb[2], this.aabb[1] - this.aabb[3]],
        [this.aabb[0] + this.aabb[2], this.aabb[1] - this.aabb[3]],
        [this.aabb[0] + this.aabb[2], this.aabb[1] + this.aabb[3]],
        [this.aabb[0] - this.aabb[2], this.aabb[1] + this.aabb[3]]
      );
      const dx = Math.sin(a) * d,
        dy = Math.cos(a) * d;
      const cx = Math.sin(a) * 200,
        cy = Math.cos(a) * 200;
      for (let i = 0.5; i < 150 / d; i++) {
        tp.dp.push([dx * i + cy, dy * i - cx], [dx * i - cy, dy * i + cx]);
        tp.dp.push([-dx * i + cy, -dy * i - cx], [-dx * i - cy, -dy * i + cx]);
      }
      tp.boolean(this, false);
      for (let i = 0, l = tp.dp.length; i < l; i++) this.dp.push(tp.dp[i]);
    }
    inside(p) {
      // find number of i ntersection points from p to far away
      // if even your outside
      const p1 = [0.1, -1000];
      let int = 0;
      for (let i = 0, l = this.cp.length; i < l; i++) {
        if (
          this.vec2_find_segment_intersect(
            p,
            p1,
            this.cp[i],
            this.cp[(i + 1) % l]
          ) !== false
        ) {
          int++;
        }
      }
      return int & 1;
    }
    boolean(p, diff = true) {
      // polygon diff algorithm (narrow phase)
      const ndp = [];
      for (let i = 0, l = this.dp.length; i < l; i += 2) {
        const ls0 = this.dp[i];
        const ls1 = this.dp[i + 1];
        // find all intersections with clip path
        const int = [];
        for (let j = 0, cl = p.cp.length; j < cl; j++) {
          const pint = this.vec2_find_segment_intersect(
            ls0,
            ls1,
            p.cp[j],
            p.cp[(j + 1) % cl]
          );
          if (pint !== false) {
            int.push(pint);
          }
        }
        if (int.length === 0) {
          if (diff === !p.inside(ls0)) {
            ndp.push(ls0, ls1);
          }
        } else {
          int.push(ls0, ls1);
          // order intersection points on line ls.p1 to ls.p2
          const cmpx = ls1[0] - ls0[0];
          const cmpy = ls1[1] - ls0[1];
          for (let i = 0, len = int.length; i < len; i++) {
            let j = i;
            const item = int[j];
            for (
              const db = (item[0] - ls0[0]) * cmpx + (item[1] - ls0[1]) * cmpy; j > 0 && (int[j - 1][0] - ls0[0]) * cmpx + (int[j - 1][1] - ls0[1]) * cmpy < db; j--
            ) int[j] = int[j - 1];
            int[j] = item;
          }
          for (let j = 0; j < int.length - 1; j++) {
            if (
              (int[j][0] - int[j + 1][0]) ** 2 + (int[j][1] - int[j + 1][1]) ** 2 >= 0.01
            ) {
              if (
                diff ===
                !p.inside([
                  (int[j][0] + int[j + 1][0]) / 2,
                  (int[j][1] + int[j + 1][1]) / 2
                ])
              ) {
                ndp.push(int[j], int[j + 1]);
              }
            }
          }
        }
      }
      this.dp = ndp;
      return this.dp.length > 0;
    }
    
    vec2_find_segment_intersect(l1p1, l1p2, l2p1, l2p2) {
      const d =
        (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) -
        (l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);
      if (d === 0) return false;
      const n_a =
        (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) -
        (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
      const n_b =
        (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) -
        (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
      const ua = n_a / d;
      const ub = n_b / d;
      if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        return [
          l1p1[0] + ua * (l1p2[0] - l1p1[0]),
          l1p1[1] + ua * (l1p2[1] - l1p1[1])
        ];
      }
      return false;
    }
  };
  return {
    list() {
      return polygonList;
    },
    create() {
      return new Polygon();
    },
    draw(turtle, p) {
      let vis = true;
      for (let j = 0; j < polygonList.length; j++) {
        const p1 = polygonList[j];



        
        if (
          Math.abs(p1.aabb[0] - p.aabb[0]) - (p.aabb[2] + p1.aabb[2]) < 0 &&
          Math.abs(p1.aabb[1] - p.aabb[1]) - (p.aabb[3] + p1.aabb[3]) < 0
        ) {
          if (p.boolean(p1) === false) {
            vis = false;
            break;
          }
        }
      }
      if (vis) {
        p.draw(turtle);
        polygonList.push(p);
      }
    }
  };
}

drawTurtles([
  turtle
]);