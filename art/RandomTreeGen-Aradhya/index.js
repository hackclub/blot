/**
 * @title: Arsh's Random Tree Generator 
 * @author: Aradhya Shaswat
 * @snapshot: ran-tree-snap1.png
 */

// Set canvas size
const canvasWidth = 600;
const canvasHeight = 400;
setDocDimensions(canvasWidth,canvasHeight);

// tree info
const treeSize = 100; // size
const branchingFactor = 3; // no. of branches 
const baseBranchAngle = 30; // angle
const leafSize = 10; // size of leaf

// random seed gen go brrr
function generateRandomSeed() {
  return Math.floor(Math.random() * 100000);
}

// set random seed for varyiations
const randSeed = generateRandomSeed(); 
bt.setRandSeed(randSeed); 

const t = new bt.Turtle();

// draw leaf
function drawLeaf(t, size) {
  const leaf = new bt.Turtle();
  const steps = 10;
  const angle = 360 / steps;
  leaf.up();
  leaf.goTo(t.pos);
  leaf.down();
  for (let i = 0; i < steps; i++) {
    leaf.forward(size * Math.PI / steps);
    leaf.right(angle);
  }
  bt.join(t.path, leaf.lines());
}

// draw tree
function drawTree(t, size, level) {
  if (level > 0) {
    t.down();
    t.forward(size);

    // branch angle and size randomizer
    const branchAngle = baseBranchAngle + bt.randInRange(-10, 10);
    const newSize = size * bt.randInRange(0.6, 0.8);

    t.right(branchAngle);
    drawTree(t,newSize,level - 1);
    t.left(branchAngle * 2);
    drawTree(t,newSize,level - 1);
    t.right(branchAngle);

    t.up();
    t.right(180); 
    t.forward(size); // doing this beacuse this doesnt have turn back
    t.right(180); 
  } else {
    drawLeaf(t, leafSize);
  }
}

// centering
t.up();
t.goTo([canvasWidth / 2, canvasHeight]);
t.right(90);

drawTree(t, treeSize, 5);

let lines = t.lines();

bt.translate(lines, [canvasWidth/ 2, canvasHeight/2], bt.bounds(lines).cc);

drawLines(lines);

