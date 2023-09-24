const t = createTurtle();
t.up();

const numLayers =150; // number of layers
let blockSize = 0.02; // initial size of the rectangular block
const verticalOffset = 0.03; // vertical offset between layers
const rotationAngle = 69; // angle for rotation

for (let layer = 0; layer < numLayers; layer++) {
  
  t.down();
  for (let i = 0; i < 4; i++) {
    t.forward(blockSize);
    t.right(90);
  }
  t.up();

  
  t.forward(verticalOffset);

  
  t.right(rotationAngle);

  
  blockSize += 0.01;
}

drawTurtles(t)