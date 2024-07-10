/*
@title: BinaryComputer
@author: NotRewd
@snapshot: image-1.png
*/

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

const createRectNoTurtle = (width, height) => {
  const turtle = new bt.Turtle();
  
  for (let i = 0; i < 4; i++) {
    const size = i % 2 == 0 ? width : height;
    turtle.forward(size);
    turtle.left(90);
  }

  return turtle.lines();
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
  t.forward(-6);
  t.left(90);
  t.forward(2.6);
  t.right(90);

  for (let i = 0; i < 4; i++) {
    createRect(t, 10, 5);
    t.up();
    
    t.forward(16);
    t.down();
  }
  
  createShape(t, 20, height * 1 / 12);

  return t.lines();
};

const createBinaryWindow = (width, height) => {
  const t = new bt.Turtle();

  createRect(t, width, height);

  t.up();
  t.forward(4);
  t.left(90);
  t.forward(3);
  t.right(90);
  t.down();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 14; j++) {
      const num = bt.randIntInRange(0, 1);
      
      if (num === 0) createNumberZero(t, 2);
      else if (num === 1) createNumberOne(t, 2);
      
      t.forward(3);
      t.down();
    }

    t.up();
    t.left(90);
    t.forward(4);
    t.left(90);
    t.forward(70);
    t.left(180);
  }

  return t.lines();
};

const createLines = (width, height) => {
  const t = new bt.Turtle();

  for (let i = 0; i < height; i++) {
    t.forward(width);
    t.up();
    t.left(90);
    t.forward(2);
    t.left(90);
    t.forward(width);
    t.left(180);
    t.down();
  }

  return t.lines();
}

const createAntenna = () => {
  const t = new bt.Turtle();

  t.left(45);
  t.forward(5);
  t.left(60);
  t.forward(7);
  t.right(75);
  t.forward(4);

  createShape(t, 20, 0.5);

  return t.lines();
};

const createSinContent = (count, spacing, rotationIncrement) => {
  let lines = [];

  for (let i = 0; i < count; i++) {
    const square = createRectNoTurtle(10, 10);
    bt.translate(square, [i * spacing, 0], bt.bounds(square).cc);
    bt.rotate(square, i * rotationIncrement);

    lines = lines.concat(square);
  }

  return lines;
};

const createGrid = (width, height, spacing) => {
  let lines = []

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const square = createRectNoTurtle(spacing, spacing);
      bt.translate(square, [spacing * j, spacing * i], bt.bounds(square).bl);

      lines = lines.concat(square);
    }
  }

  return lines;
}

let finalLines = [];

const cube = createCube(85, 94, 48);
bt.translate(cube, [width / 2, height / 2], bt.bounds(cube).cc);

const terminal = createTerminal(70, 10);
bt.translate(terminal, [53, 16], bt.bounds(terminal).cc);

const binaryWindow = createBinaryWindow(75, 43);
bt.translate(binaryWindow, [54, 74], bt.bounds(binaryWindow).cc);

const stripedLines = createLines(73, 22);
bt.translate(stripedLines, [54, 74], bt.bounds(stripedLines).cc);

const antenna = createAntenna();
bt.translate(antenna, [96, 116], bt.bounds(antenna).cc);

const sinWindow = createRectNoTurtle(40, 20);
bt.translate(sinWindow, [68, 38], bt.bounds(sinWindow).cc);

const sinContent = createSinContent(20, 1, 11);
bt.translate(sinContent, [69, 38], bt.bounds(sinContent).cc);

const grid = createGrid(19, 10, 2);
bt.translate(grid, [68, 38], bt.bounds(grid).cc);

finalLines = finalLines.concat(cube);
finalLines = finalLines.concat(terminal);
finalLines = finalLines.concat(binaryWindow);
finalLines = finalLines.concat(antenna);
finalLines = finalLines.concat(sinWindow);

drawLines(stripedLines, { width: 0.1 });
drawLines(grid, { width: 0.1 });
drawLines(sinContent, { width: 0.2 });

drawLines(finalLines, { width : 1 });