/**
 * @title: Arsh's Random Tree Generator 
 * @author: Aradhya Shaswat
 * @snapshot: ran-tree-snap1.png
 */

const canvasWidth = 600;
const canvasHeight = 400;
setDocDimensions(canvasWidth, canvasHeight);

const treeSize = 100;
const baseBranchAngle = 30; 
const leafSize = 5;
const maxLevels = 4; 

function generateRandomSeed() {
  return Math.floor(Math.random() * 100000);
}

const randSeed = generateRandomSeed(); 
bt.setRandSeed(randSeed); 

const t = new bt.Turtle();

function drawLeaf(t, size) {
  const leaf = new bt.Turtle();
  const steps = 10;
  const angle = 150 / steps; 

  leaf.up();
  leaf.goTo(t.pos);
  leaf.down();
  leaf.right(60); 
  for (let i = 0; i < steps; i++) {
    leaf.forward(size * Math.PI / steps);
    leaf.right(angle);
  }

  leaf.left(90);
  leaf.forward(size *0.6); 
  leaf.left(90);
  leaf.forward(size * 0.3);

  bt.join(t.path, leaf.lines());
}

function drawTree(t, size, level, angleOffset = 0) {
  if (level > 0) {
    const branchThickness = level * 0.8;

    t.down();
    t.forward(size);

    const branchAngle = baseBranchAngle + bt.randInRange(-10, 10);
    const newSize = size * bt.randInRange(0.6, 0.8);

    t.right(angleOffset + branchAngle);

    for (let i = 0; i < Math.ceil(branchThickness); i++) {
      drawTree(t, newSize, level - 1, -angleOffset);
    }

    t.left((angleOffset + branchAngle) * 2);

    for (let i = 0; i < Math.ceil(branchThickness); i++) {
      drawTree(t, newSize, level - 1, angleOffset);
    }

    t.right(angleOffset + branchAngle);

    t.up();
    t.forward(-size); 
  } else {
    drawLeaf(t, leafSize);
  }
}

t.up();
t.goTo([canvasWidth / 2, canvasHeight]);
t.right(90);

t.right(180);
drawTree(t, treeSize, maxLevels);

let lines = t.lines();

bt.translate(lines, [canvasWidth / 2, canvasHeight / 2], bt.bounds(lines).cc);
drawLines(lines);
