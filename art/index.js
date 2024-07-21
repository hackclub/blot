/*
@title: StylisticIntro
@author: Rose W
@snapshot: 0.png

Thx to Leo McElroy for inspriation with the background
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
  setRandSeed,
} = blotToolkit;

const width = 125;
const height = 125;

setDocDimensions(width, height)

const seed = randInRange(10,100); // min=1, max=100, step=1
const radius = 1.3; // min=0.1, max=5, step=0.01
const maxPathLength = 25;  // min=1, max=100, step=0.1
const frequency = 4; //min=.1, max=10, step=.01
const maxTries = 1000;
var expand = randInRange(10,120); //is used to create expanding background
var i = 65;
var w = 30;
var inte = 10;
var sc = 0.5;
var low = -10;

setRandSeed(seed)

const grid  = new PoissonDiscGrid(radius);


let sky = swirl();
scale(sky, .4)
rotate(sky, 270)

const rect = rectangle(168, 126);
translate(rect, [14.579, 51.8])

removeOutsidePolylines(sky, rect[0]);

translate(sky, [20.079, 48.252]);
const frame = rectangle(75, expand);
translate(frame, [0, 0], bounds(frame).lb);
translate(frame, [-16, 5])


const final = [
  ...sky, 
];

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

function swirl() {
  const turtle = new Turtle();
  turtle.setAngle(0);
  turtle.traveled = 0;

  while (walk()){}
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
      const curl = curlNoise(p[0], p[1]);
      const dest = [p[0]+curl[0], p[1]+curl[1]];
      if (turtle.traveled < maxPathLength && Math.abs(dest[0]) < 110 && Math.abs(dest[1]) < 110 && grid.insert(dest)) {
          turtle.goTo(dest);
          turtle.traveled += Math.hypot(curl[0], curl[1]);
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

const pugFace = [
  [
    [sc*(30+i), sc*(90+w)],
    [sc*(40+i), sc*(70+w)],
    [sc*(60+i), sc*(70+w)],
    [sc*(70+i), sc*(90+w)],
    [sc*(60+i), sc*(110+w)],
    [sc*(50+i), sc*(120+w)],
    [sc*(40+i), sc*(110+w)],
    [sc*(35+i), sc*(100+w)],
    [sc*(30+i), sc*(90+w)]
  ],
  [
    [sc*(30 + inte+i), sc*(90+w)],
    [sc*(40 + inte+i), sc*(70+w)],
    [sc*(60 + inte+i), sc*(70+w)],
    [sc*(70 + inte+i), sc*(90+w)],
    [sc*(60 + inte+i), sc*(110+w)],
    [sc*(50 + inte+i), sc*(120+w)],
    [sc*(40 + inte+i), sc*(110+w)],
    [sc*(35 + inte+i), sc*(100+w)],
    [sc*(30 + inte+i), sc*(90+w)]
  ],
  [
    [sc*(30+i + (inte / 2)), sc*(90 +w+ low)],
    [sc*(40+i + (inte / 2)), sc*(70 +w+low)],
    [sc*(60+i + (inte / 2)), sc*(70+w + low)],
    [sc*(70+i + (inte / 2)), sc*(90 +w+ low)],
    [sc*(60+i + (inte / 2)), sc*(110 +w+ low)],
    [sc*(50+i + (inte / 2)), sc*(120 +w+ low)],
    [sc*(40+i + (inte / 2)), sc*(110 +w+ low)],
    [sc*(35+i + (inte / 2)), sc*(100 +w+ low)],
    [sc*(30+i + (inte / 2)), sc*(90 +w+ low)]
  ]
];
drawLines(pugFace, {fill:'white'});
var i = 95;
var w = 60;
var inte = 10;
var sc = 0.4;
var low = -10;
const pugFace2 = [
  [
    [sc*(30+i), sc*(90+w)],
    [sc*(40+i), sc*(70+w)],
    [sc*(60+i), sc*(70+w)],
    [sc*(70+i), sc*(90+w)],
    [sc*(60+i), sc*(110+w)],
    [sc*(50+i), sc*(120+w)],
    [sc*(40+i), sc*(110+w)],
    [sc*(35+i), sc*(100+w)],
    [sc*(30+i), sc*(90+w)]
  ],
  [
    [sc*(30 + inte+i), sc*(90+w)],
    [sc*(40 + inte+i), sc*(70+w)],
    [sc*(60 + inte+i), sc*(70+w)],
    [sc*(70 + inte+i), sc*(90+w)],
    [sc*(60 + inte+i), sc*(110+w)],
    [sc*(50 + inte+i), sc*(120+w)],
    [sc*(40 + inte+i), sc*(110+w)],
    [sc*(35 + inte+i), sc*(100+w)],
    [sc*(30 + inte+i), sc*(90+w)]
  ],
  [
    [sc*(30+i + (inte / 2)), sc*(90 +w+ low)],
    [sc*(40+i + (inte / 2)), sc*(70 +w+low)],
    [sc*(60+i + (inte / 2)), sc*(70+w + low)],
    [sc*(70+i + (inte / 2)), sc*(90 +w+ low)],
    [sc*(60+i + (inte / 2)), sc*(110 +w+ low)],
    [sc*(50+i + (inte / 2)), sc*(120 +w+ low)],
    [sc*(40+i + (inte / 2)), sc*(110 +w+ low)],
    [sc*(35+i + (inte / 2)), sc*(100 +w+ low)],
    [sc*(30+i + (inte / 2)), sc*(90 +w+ low)]
  ]
];
drawLines(pugFace2);

/*const maine = [
    [(30+i + (inte / 2)), 90 +w+ low],
    [(70 + inte+i), 90+w],
    [(60+i + (inte / 2)), 110 +w+ low],
    [(50+i + (inte / 2)), 120 +w+ low],
    [(40+i + (inte / 2)), 110 +w+ low],
    [(30 + inte+i), 90+w]
    ];
drawLines(maine, {fill:'black'});
*/
