const leafLength = 5;
const leafW = 1.3;

const edge = new Turtle();

const max = 200;
for (let i = 0; i < max; i++) {
  const t = i/(max-1);
  const x = t*leafLength;
  
  let s = (t-1/3)/(2/3);
  let ss = s**2;
  
  let y = t < 1/3
    ? Math.sin(t*Math.PI*3/2)
    : (Math.sin((t-4)*Math.PI*3/2)/2 +0.5) * (1-ss) + (1-t) * (ss);

  let ya = leafW*y;
  let yb = leafW*y;
  
  edge.goto([ x, ya ]);
}


function stem_func(t){
  // return 0;
  return (1-t)*0.06-0.02;
}

function breaky(p,c){
  let o = [];
  for (let i = 0; i < p.length-2; i+=2){
    if (Math.random() < c){
      o.push([p[i],p[i+1],p[i+2]]);
    }
  }
  return o;
}




function veins(scale = 1) {
  const lines = [];

  const arc = createTurtle()
    .right(-90)
    .arc(180, 0.08)
    .scale([1, 0.36], [0, 0]);

  let littleLinesMax = 50;
  for (let i = 3; i < littleLinesMax-5; i++) {
    
    const t = i/(littleLinesMax-1);
    const x0 = t*leafLength;
    const y0 = 0;

    // let s = (t-1/3)/(2/3);
    // let ss = s**2;
    
    // let y = t < 1/3
    //   ? Math.sin(t*Math.PI*3/2)
    //   : (Math.sin((t-4)*Math.PI*3/2)/2 +0.5) * (1-ss) + (1-t) * (ss);

    y = edge.interpolate(t+0.04)[1];
    
    const line = new Turtle([ x0, y0 ]);

    line.right(-60 + randInRange(-4, 4));

    let r = y*0.7;
    let a = 22 + randIntInRange(-4, 8);
    
    line
      .forward(r)
      .resample(0.02)
      .warp(arc)
      .trim(0, 
            (i % 5 === 0) 
            ? randInRange(.7, .9) 
            : randInRange(.1, .3)
           );
    
    lines.push(line)
  }

  return lines;
}

let maxStem = 20;
let stem0 = [];
let stem1 = [];
for (let i = -3; i < maxStem-2; i++){
  let t = i / (maxStem-1);
  let x = t * leafLength;
  let y = stem_func(t)
  stem0.push([x,y]);
  stem1.push([x,-y]);
}
let stem = stem0.concat(stem1.slice().reverse());


const t = new Turtle();

t.join(edge);
t.join(...veins());


const arc = createTurtle()
  .right(-90)
  .arc(181, 1.3)
  // .arc(-180, 1)
  .translate([-3, 0]);


const toWarp = createTurtle()
  .right(-57)
  .forward(2)
  .resample(0.02)
  .warp(arc);
  
// console.log(arc.getAngle(tt))
// console.log(testT, marker.start, marker.end, marker.path);

// t.iteratePath(pt => {
//   let [x,y] = pt;
//   y += x*x*0.02;
//   y += noise([x*0.2])*0.3;
//   return [x, y]
// })


drawTurtles(
  toWarp,
  arc,
  t
);
