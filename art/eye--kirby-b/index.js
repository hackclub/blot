// welcome to blot!
const width = 150;
const height = 125;

setDocDimensions(width, height);

rand()
const eye = createTurtle();
const pupil = createTurtle();
const topEye = createTurtle();
const bottomEye = createTurtle();
const eyelash = createTurtle();

eye.arc(360, randIntInRange(14, 20))

eye.translate(
  [width/2, height/2], 
  eye.cc
);

pupil.arc(360,randIntInRange(1, 12))

pupil.translate(
  [width/2, height/2], 
  pupil.cc
);

topEye.left(130)
topEye.arc(100,70)

topEye.translate(
  [width/2, height/2], 
  topEye.cb
);

bottomEye.right(50)
bottomEye.arc(100,70)

bottomEye.translate(
  [width/2, height/2], 
  bottomEye.ct
);

drawTurtles([
    eye,
    pupil,
    topEye,
    bottomEye,
    eyelash
]);