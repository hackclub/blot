// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 150;
const height = 150;
const puzzleSize = 100;

setDocDimensions(width, height);

const t = new bt.Turtle();

//Functions for random nubs

function randomNubHori() {
  var rand = bt.rand();
  if (rand > 0.5) {
    inNubHori();
  } else outNubHori();
};

function inNubHori() {
  t.right(90);
  t.arc(180, width / puzzleSize / 6);
  t.right(90);
}

function outNubHori() {
  t.left(90);
  t.arc(-180, width / puzzleSize / 6);
  t.left(90);
};

function randomNubVert() {
  var rand = bt.rand();
  if (rand > 0.5) {
    inNubVert();
  } else outNubVert();
};

function inNubVert() {
  t.right(90);
  t.arc(180, height / puzzleSize / 6);
  t.right(90);
}

function outNubVert() {
  t.left(90);
  t.arc(-180, height / puzzleSize / 6);
  t.left(90);
};


function drawPuzzleHori() {
  for (var i = 0; i < puzzleSize; i++) {
    t.forward(width / puzzleSize / 3);
    t.apply(randomNubHori);
    t.forward(width / puzzleSize / 3);
  };
};

function drawPuzzleVert() {
  for (var i = 0; i < puzzleSize; i++) {
    t.forward(height / puzzleSize / 3);
    t.apply(randomNubVert);
    t.forward(height / puzzleSize / 3);
  };
};

//Outline the Puzzle
for (var i = 0; i < 2; i++) {
  t.forward(width);
  t.left(90);
  t.forward(height);
  t.left(90);
}
t.left(90);

//Horizontal Lines
for (var i = 1; i < puzzleSize; i++) {
  //moves the turtle forward
  t.forward(height / puzzleSize);
  //draws the lines
  t.right(90);
  drawPuzzleHori();
  //resets the turtle
  t.right(180);
  t.up();
  t.forward(width);
  t.right(90);
  t.down();
}

//Rotates things
t.forward(height / puzzleSize);
t.right(90);

//Vertical Lines
for (var i = 1; i < puzzleSize; i++) {
  //moves the turtle forward
  t.forward(width / puzzleSize);
  //draws the lines
  t.right(90);
  drawPuzzleVert();
  //resets the turtle
  t.right(180);
  t.up();
  t.forward(height);
  t.right(90);
  t.down();
}


drawLines(t.lines());