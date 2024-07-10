const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

const createRect = (turtle, width, height) => {
  for (let i = 0; i < 4; i++) {
    const size = i % 2 == 0 ? width : height;
    turtle.forward(size);
    turtle.left(90);
  }
};

const createShape = (turtle, n, size) => {
  const turnAngle = 360 / n;

  for (let i = 0; i < n; i++) {
    turtle.forward(size);
    turtle.left(turnAngle);
  }
};

const createNumberZero = (turtle, size) => {
  turtle.forward(size / 2);
  turtle.left(45);
  turtle.forward(size / 4);
  turtle.left(45);
  turtle.forward(size);
  turtle.left(45);
  turtle.forward(size / 4);
  turtle.left(45);
  turtle.forward(size / 2);
  turtle.left(45);
  turtle.forward(size / 4);
  turtle.left(45);
  turtle.forward(size);
  turtle.left(45);
  turtle.forward(size / 4);
  turtle.left(45);
  turtle.up();
  turtle.forward(size);
};

const createNumberOne = (turtle, size) => {
  turtle.forward(size);
  turtle.up();
  turtle.left(180);
  turtle.forward(size / 2);
  turtle.right(90);
  turtle.down();
  turtle.forward(size * 3 / 2);
  turtle.left(135);
  turtle.forward(size / 2);
  turtle.up();
  turtle.left(180);
  turtle.forward(size / 2);
  turtle.right(135);
  turtle.forward(size * 3 / 2);
  turtle.left(90);
  turtle.forward(size / 2);
};

const createCube = (width, height, depth) => {
  const t = new bt.Turtle();

  createRect(t, width, height);
  
  t.up();
  t.forward(width);

  t.down();
  t.left(45);
  t.forward(depth / 2);

  t.left(45);
  t.forward(height);

  t.left(90);
  t.forward(width);

  t.left(45);
  t.forward(depth / 2);

  t.up();
  t.left(135);
  t.forward(width);

  t.down();
  t.left(45);
  t.forward(depth / 2);

  return t.lines();
};

const createTerminal = (width, height) => {
  const t = new bt.Turtle();

  createRect(t, width, height);

  t.up();
  t.forward(width * 13 / 15);
  t.left(90);
  t.forward(height / 4);
  t.right(90);
  t.down();

  createShape(t, 20, height * 1 / 12);

  return t.lines();
};

const createSinWindow = (width, height) => {
  const t = new bt.Turtle();

  createRect(t, width, height);

  t.up();
  t.forward(10);
  t.left(90);
  t.forward(3);
  t.right(90);
  t.down();

  for (let i = 0; i < 10; i++) {
    const num = bt.randIntInRange(0, 1);
    
    if (num === 0) createNumberZero(t, 2);
    else if (num === 1) createNumberOne(t, 2);
    
    t.forward(3);
    t.down();
  }

  return t.lines();
};

let finalLines = [];

const cube = createCube(85, 94, 48);
bt.translate(cube, [width / 2, height / 2], bt.bounds(cube).cc);

const terminal = createTerminal(70, 10);
bt.translate(terminal, [53, 16], bt.bounds(terminal).cc);

const sinWindow = createSinWindow(75, 43);
bt.translate(sinWindow, [54, 74], bt.bounds(sinWindow).cc);

finalLines = finalLines.concat(cube);
finalLines = finalLines.concat(terminal);
finalLines = finalLines.concat(sinWindow);

drawLines(finalLines);