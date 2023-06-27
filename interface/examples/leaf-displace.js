const leafLength = 5;
const leafW = 1.4;
const sinPts = [];
const otherSinPts = [];

const max = 200;
for (let i = 1; i < max; i++) {
  const t = i/(max-1);
  const x = t*leafLength;
  let s = (t-1/3)/(2/3);
  let ss = s**2;
  let y = t < 1/3
    ? Math.sin(t*Math.PI*3/2)
    : (Math.sin((t-4)*Math.PI*3/2)/2 +0.5) * (1-ss) + (1-t) * (ss);

  let ya = leafW*y* (noise([t*2,1])*1.0+0.8);
  let yb = leafW*y* (noise([t*2,2])*1.0+0.8);

  
  // ya += Math.sin(t*100)*0.2+0.2;
  sinPts.push([x, ya]);
  otherSinPts.push([x, -yb]);
}


displace(sinPts, t => Math.sin(t)*0.02+0.06)

sinPts.push(...otherSinPts.reverse())



function stem_func(t){
  // return 0;
  return (1-t)*0.06+0.02;
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

const lines = [];

let littleLinesMax = 50;
for (let i = 1; i < littleLinesMax-4; i++) {
  const t = i/(littleLinesMax-1);
  const x0 = t*leafLength*1.04;
  const y0 = stem_func(t);

  let s = t+0.11;
  let x1 = s*leafLength;
  let y1 = s < 1/3
    ? Math.sin(s*Math.PI*3/2)
    : Math.sin((t-4)*Math.PI*3/2)/2 +0.5;
  y1 *= (t<0.4)?0.8:(1-t)

  let r = (Math.random()*0.3+0.7);
  let bc = 0.7;
  if (i % 5 != 0){
    r *= Math.random()*0.9;
    bc = 0.2;
  }
  x1 = x0+(x1-x0)*r
  y1 = y0+(y1-y0)*r


  
  lines.push(...breaky(resampLine([
    [x0, y0],
    [x1, leafW*y1]
  ],0.1),bc))
}

for (let i = 1; i < littleLinesMax-4; i++) {
  const t = i/(littleLinesMax-1);
  const x0 = t*leafLength*1.04;
  const y0 = -stem_func(t);

  let s = t+0.11;
  let x1 = s*leafLength;
  let y1 = s < 1/3
    ? Math.sin(s*Math.PI*3/2)
    : Math.sin((t-4)*Math.PI*3/2)/2 +0.5;
  y1 *= 1.5*(1-t)

  let r = (Math.random()*0.3+0.7);
  let bc = 0.7;
  if (i % 5 != 0){
    r *= Math.random()*0.8;
    bc = 0.2;
  }
  x1 = x0+(x1-x0)*r
  y1 = y0+(y1-y0)*r

  y1 *= -1;
  
  lines.push(...breaky(resampLine([
    [x0, y0],
    [x1, y1]
  ],-0.05),bc))
}

function resampLine(l,q){
  let [x0,y0] = l[0];
  let [x1,y1] = l[1];
  let o = [];
  let dx = x1-x0;
  let dy = y1-y0;
  let nx = -dy;
  let ny = dx;
  
  let n = Math.sqrt((nx*nx)+(ny*ny));
  nx /= n;
  ny /= n;
  for (let i = 0; i < 20; i++){
    let t = i/19;
    let x = x0 * (1-t) + x1 * t;
    let y = y0 * (1-t) + y1 * t;
    let p = Math.sin(t*Math.PI);
    x += nx*p*q*n //+ (noise([i*0.1,0,q])*1.0-0.5)*0.2;
    y += ny*p*q*n //+ (noise([i*0.1,1,q])*1.0-0.5)*0.2;
    o.push([x,y])
  }
  return o;
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



let leaf = [
  sinPts,
  ...lines,
  stem
];


const t = new Turtle();

t.path = leaf;

t.iteratePath(pt => {
  let [x,y] = pt;
  y += x*x*0.02;
  y += noise([x*0.2])*0.3;
  return [x, y]
})

t.translate([3, 0])

drawTurtles(t);
