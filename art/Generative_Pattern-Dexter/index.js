// welcome to blot!

const width = 120;
const height = 120;
let xpos = width/12
let ypos = height-height/12
setDocDimensions(width, height);

const testTurtle = createTurtle();

//draws a square with side length "len" with centre at coords (xpos, ypos)
function drawSq(len, xpos, ypos){
  const testTurtle = new Turtle;
  for (let i = 0; i < 4; i++) {
    testTurtle.forward(len);
    testTurtle.left(90);
  }
  testTurtle.translate(
    [xpos, ypos], 
    testTurtle.cc
  );
  drawTurtles(
    testTurtle
  );
}
//draws a circle with radius "rad", with the coords (xpos, ypos)
function drawCi(rad, xpos, ypos){
  const testTurtle = new Turtle;
  testTurtle.arc(360, rad);
  testTurtle.translate(
    [xpos, ypos], 
    testTurtle.cc
  );
  drawTurtles(
    testTurtle
  );
}

//draws an arc with a length of ((pi*2*radius)*angle)/360, coordinates of (xpos, ypos) rotated by rangle degrees
function drawArc(xpos, ypos, angle, rangle, radius) {
  const testTurtle = new Turtle;
  testTurtle.arc(angle, radius);
  testTurtle.translate(
    [xpos, ypos], 
    testTurtle.cc
  );
  testTurtle.rotate(rangle);
  drawTurtles(
    testTurtle
  );
}

// draws the squares going from top length to bottom right
for (let i = 0; i < 11; i++) {
  drawSq(width/6, xpos, ypos);
  xpos+=width/12;
  ypos-=height/12;
}

// draws the squares going from top right to bottom left
xpos = width-width/12
ypos = height-width/12
for (let i = 0; i < 11; i++) {
  drawSq(width/6, xpos, ypos);
  xpos-=width/12;
  ypos-=height/12;
}

//draws all of the outer circles along the circumference of the larger circle
drawCi(width/12, width/6, height/2);
drawCi(width/12, width-width/6, height/2);
drawCi(width/12, width/2, height/6);
drawCi(width/12, width/2, height-height/6);
drawCi(width/12, (4*width)/15, (11*height)/15);
drawCi(width/12, (4*width)/15, (4*height)/15);
drawCi(width/12, (29*width)/40, (11*height)/15);
drawCi(width/12, (29*width)/40, (4*height)/15);

//draws all of the internal arcs
drawArc(width/3, height/3, 90, 0, (width+height)/6);
drawArc(width/2, (31*height)/120, 90, 45, (width+height)/6);
drawArc((2*width)/3, height/3, 90, 90, (width+height)/6);
drawArc((11*width)/15, height/2, 90, 135, (width+height)/6);
drawArc((2*width)/3, (2*height)/3, 90, 180, (width+height)/6);
drawArc(width/2, (11*height)/15, 90, 225, (width+height)/6);
drawArc(width/3, (2*height)/3, 90, 270, (width+height)/6);
drawArc((4*width)/15, height/2, 90, 315, (width+height)/6);

//draws the outer circle
drawCi((width+height)/6, width/2, height/2);