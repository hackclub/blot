const leafLength = 5;
const leafW = 1.3;

const edge = createTurtle();

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

function veins() {
  const lines = createTurtle();

  let littleLinesMax = 36;
  for (let i = 4; i < littleLinesMax-5; i++) {
    
    const t = i/(littleLinesMax-1);
    const x0 = t*leafLength;
    const y0 = 0;

    y = edge.interpolate(t+0.1)[1];
    
    const line = createTurtle([ x0, y0 ]);

    line.right(-62+t*37 + randInRange(-4, 4));

    let r = y*0.7;

    const trimTo = (i % 5 === 0) 
      ? randInRange(0.7, 0.9) 
      : randInRange(0.1, 0.7);

    if (r < 0.01) continue;

    const warper = createTurtle()
      .left(90)
      .arc(144, r)
      .scale([1, 0.1], [0, 0]);
    
    line
      .forward(r)
      .resample(0.04)
      .warp(warper)
      .resample(0.29)
      .trim(0, trimTo);

    line.iteratePath(pt => {
      return Math.random() < .2 ? "BREAK" : pt;
    })
    
    lines.join(line)
  }

  return lines;
}

const t = createTurtle();

const bottom = edge.copy().scale([1, -1], [0, 0])

edge.warp(t => noise(t*20.4, { octaves: 2})*0.09*(t===0 || t === 1 ? 0 : 1))
bottom.warp(t => noise(t*23.6, { octaves: 2})*-0.10*(t===0 || t === 1 ? 0 : 1))

t.join(edge);
t.join(bottom);
t.join(veins());
t.join(veins().scale([1, -1], [0, 0]));

const lineStem = createTurtle([-1, 0])
  .forward(leafLength+1)
  .resample(.1)

t.join(lineStem);

t.iteratePath(pt => {
  let [x,y] = pt;
  y += x*x*0.02;
  y += noise([x*0.2])*0.3;
  return [x, y]
});

const workarea = createTurtle()
  .forward(5*25.4)
  .right(90)
  .forward(4.8*25.4);

drawTurtles(
  t,
  // workarea
);
