/*
@title: Tidal Flats
@author: Leo McElroy
@snapshot: 1.png

This piece was originally created while at the Center for Machine Arts inaugural residency.
The residency is documented here: https://static1.squarespace.com/static/63fbc39db5b01b5fa30423db/t/649b424d33b2ce3e0d5b63a5/1687896656015/June+Cohort+Zine.pdf

Much thanks to Reinder Nijhoff for his utility code. And to Gabor Ugray for inspiration.
*/

const { 
  scale, 
  translate, 
  rotate, 
  originate,
  Turtle,
  rand,
  randInRange,
  randIntInRange,
  noise,
  bounds,
  setRandSeed
} = blotToolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height)

const seed = 326; // min=1, max=100, step=1
const radius = 1.3; // min=0.1, max=5, step=0.01
const maxPathLength = 50;  // min=1, max=100, step=0.1
const frequency = 1.9; //min=.1, max=10, step=.01
const maxTries = 1000;

setRandSeed(seed)

const grid  = new PoissonDiscGrid(radius);

let grass = [];

for (let i = 0; i < +212; i++) {
  const blade = [ createBlade() ];
  const x = i*0.45+0.05*noise([i/2.2, i/7.2])*7.0;
  const y = randInRange(0, 3) + 0.28*noise([i/92, i/71]);
  translate(blade, [x, y]);
  
  grass.push([y, blade]);
}
grass.sort((a, b) => b[0] - a[0]);
grass = grass.map(x => x[1]).flat();

let ground = [];
for (let i = 0; i < +72; i++) {
  const t = new Turtle();
  t.left(13);

  for (let j = 0; j < +49; j++) {
    t.forward(randInRange(1, 3)*0.3);
    t.up();
    t.forward(randInRange(1, 2)*0.4);
    t.down();
  }


  translate(t.path, [i*2.0, 0] )
  // t.ptArrs();
  ground.push(...t.path)
}

let sky = swirl();
scale(sky, .4)
rotate(sky, 270)

const rect = rectangle(168, 126);
translate(rect, [14.579, 51.8])

removeOutsidePolylines(sky, rect[0]);

translate(sky, [20.079, 48.252]);

translate(ground, [-75.863, 24.114]);

translate(grass, [-25.448, 30.53])

const frame = rectangle(75, 66);
translate(frame, [0, 0], bounds(frame).lb);
translate(frame, [-16, 5])


const final = [
  ...sky, 
  ...ground, 
];

grass.forEach(blade => {
  bt.cover(final, [ blade ]);
  final.push(blade)
})

removeOutsidePolylines(final, frame[0]);

const bb = () => bounds(final);

scale(final, width/bb().width * .9);
translate(final, [width/2, height/2], bb().cc)

final.forEach(poly => {
  drawLines([poly],
            {
    stroke: "black",
    // strokeWidth: .01
  });
})

function createBlade() {
  let t = new Turtle();
  t.left(90);
  for (let i = 0; i < randIntInRange(6, 10); i++) {
    t.forward(randInRange(.5, 2));
    t.right(randInRange(-7, 7))
  }

  let bladeSide0 = [];
  let bladeSide1 = [];
  const bottom = 0.416;
  const top = 0.043;
  t.path[0].forEach((pt, i, arr) => {
    const [x, y] = pt;
    bladeSide0.push([
      x - lerp(bottom, top, i/arr.length),
      y
    ]);
    
    bladeSide1.push([
      x + lerp(bottom, top, i/arr.length),
      y
    ]);
  })
  
  const blade = [
    ...bladeSide0.reverse(),
    ...bladeSide1,
    [...bladeSide0.at(0)]
  ]

  return blade;
}

function pointInPolygon(point, polygon) {
    let crosses = 0;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        if (((polygon[i][1] > point[1]) != (polygon[j][1] > point[1])) &&
             (point[0] < (polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / 
             (polygon[j][1] - polygon[i][1]) + polygon[i][0])) {
            crosses++;
        }
    }
    return crosses % 2 > 0;
}

function removeOutsidePolylines(polylines, polygon) {
    let i = 0;
    while (i < polylines.length) {
        if (polylines[i].some(point => !pointInPolygon(point, polygon))) {
            polylines.splice(i, 1);
        } else {
            i++;
        }
    }
}

function lerp(start, end, t) {
    return (1 - t) * start + t * end;
}


function rectangle(w, h) {
  return [
    [
      [-w/2, h/2],
      [w/2, h/2],
      [w/2, -h/2],
      [-w/2, -h/2],
      [-w/2, h/2],
    ]
  ]
}

////////////////////////////////////////////////////////////////
// Curl Noise. Created by Reinder Nijhoff 2021 - @reindernijhoff
// https://turtletoy.net/turtle/740f09b88c
// adapted by Leo McElroy
////////////////////////////////////////////////////////////////

function swirl() {
  const turtle = new Turtle();
  turtle.setAngle(0);
  turtle.traveled = 0;

  while (walk()){}

  // turtle.ptArrs();

  return turtle.path;
  
  function fbm(x, y) {
      x *= frequency / 1000;
      y *= frequency / 1000;
      let f = 1, v = 0.;
      for (let i=0; i<3; i++) {
          v += noise([x * f+0.1, y * f+.1]) / f;
          f *= 2; x += 17;
      }
      return v;
  }
  
  function curlNoise(x, y) {
      const eps = 0.01;
      
      const dx = (fbm(x, y + eps) - fbm(x, y - eps))/(2 * eps);
      const dy = (fbm(x + eps, y) - fbm(x - eps, y))/(2 * eps);
      
      const l = Math.hypot(dx, dy) / radius * .99;
      return [dx / l, -dy / l]; 
  }
  
  function walk() {
      const p = turtle.pos;
      // console.log(p);
  
      const curl = curlNoise(p[0], p[1]);
      const dest = [p[0]+curl[0], p[1]+curl[1]];
  
      // console.log(dest);
      
      if (turtle.traveled < maxPathLength && Math.abs(dest[0]) < 110 && Math.abs(dest[1]) < 110 && grid.insert(dest)) {
          turtle.goTo(dest);
          turtle.traveled += Math.hypot(curl[0], curl[1]);
  
          // console.log("done");
      } else {
          turtle.traveled = 0;
          let r = [0, 0];
          let i = 0;
          do { 
              r =[rand()*200-100, rand()*200-100];
              i ++;
          } while(!grid.insert(r) && i < maxTries);
          if (i >= maxTries) {
              return false;
          }
        
          turtle.up();
          turtle.goTo(r);
          turtle.down();
      }
    
      return true;
  }

}

////////////////////////////////////////////////////////////////
// Poisson-Disc utility code. Created by Reinder Nijhoff 2019
// https://turtletoy.net/turtle/b5510898dc
////////////////////////////////////////////////////////////////

function PoissonDiscGrid(radius) {
    class PoissonDiscGrid {
        constructor(radius) {
            this.cellSize = 1/Math.sqrt(2)/radius;
            this.radius2 = radius*radius;
            this.cells = [];
        }
        insert(p) {
            const x = p[0]*this.cellSize|0, y=p[1]*this.cellSize|0;
            for (let xi = x-1; xi<=x+1; xi++) {
                for (let yi = y-1; yi<=y+1; yi++) {
                    const ps = this.cell(xi,yi);
                    for (let i=0; i<ps.length; i++) {
                        if ((ps[i][0]-p[0])**2 + (ps[i][1]-p[1])**2 < this.radius2) {
                            return false;
                        }
                    }
                }       
            }
            this.cell(x, y).push(p);
            return true;
        }
        cell(x,y) {
            const c = this.cells;
            return (c[x]?c[x]:c[x]=[])[y]?c[x][y]:c[x][y]=[];
        }
    }
    return new PoissonDiscGrid(radius);
}
  