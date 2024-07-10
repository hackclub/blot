const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

const createCube = (width, height, depth) => {
  const t = new bt.Turtle();

  for (let i = 0; i < 4; i++) {
    const size = i % 2 == 0 ? width : height;
    t.forward(size);
    t.left(90);
  }
  
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

const cube = createCube(85, 94, 48);

bt.translate(cube, [width / 2, height / 2], bt.bounds(cube).cc);

drawLines(cube);