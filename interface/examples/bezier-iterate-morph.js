const t = createTurtle();

const h1 = [0.16, 0.34];
const h2 = [0.49, 0.30]

const warper3 = be1(
  0,
  h1, 
  h2,
  0
);

t
  .forward(1)
  .resample(.01)
  .iteratePath((pt, tValue) => {
    const angle = t.getAngle(tValue);
    
    const r = warper3(tValue);
    
    const dx = -Math.sin(angle/180*Math.PI)*r;
    const dy = Math.cos(angle/180*Math.PI)*r;

    return [ 
      pt[0] + dx, 
      pt[1] + dy
    ]
  })


drawTurtles(
  t,  
  createTurtle(t.start).goto(h1),
  createTurtle(t.end).goto(h2),
);

