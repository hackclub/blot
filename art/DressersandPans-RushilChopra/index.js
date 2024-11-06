/*
@title: DressersandPans
@author: Rushil Chopra
@snapshot: 0.png
*/

// Constants
const WIDTH = 50;
const HEIGHT = 50;
const DRAWER_WIDTH = 35;
const DRAWER_HEIGHT = 8;
const HANDLE_SIZE = 2;

// Set document dimensions
setDocDimensions(WIDTH, HEIGHT);

// Initialize shapes array
const shapes = [];

/**
 * Creates the dresser base.
 * @returns {bt.Turtle} The turtle object representing the dresser base.
 */
function createDresserBase() {
  const t = new bt.Turtle();
  t.forward(40);
  t.right(90);
  t.forward(30);
  t.right(90);
  t.forward(40);
  t.right(90);
  t.forward(30);
  return t;
}

/**
 * Creates a single tiny drawer with a handle.
 * @param {number} index The index of the drawer.
 * @returns {bt.Turtle} The turtle object representing the drawer.
 */
function createDrawer(index) {
  const t = new bt.Turtle();
  const handleType = Math.floor(Math.random() * 2);

  // Create the drawer
  t.forward(DRAWER_WIDTH);
  t.right(90);
  t.forward(DRAWER_HEIGHT);
  t.right(90);
  t.forward(DRAWER_WIDTH);
  t.right(90);
  t.forward(DRAWER_HEIGHT);

  // Move to the handle position
  t.left(90);
  t.forward(DRAWER_WIDTH / 2 - HANDLE_SIZE / 2);
  t.right(90);
  t.forward(DRAWER_HEIGHT / 2 - HANDLE_SIZE / 2);

  // Create the handle
  if (handleType === 0) {
    // Square handle
    for (let i = 0; i < 4; i++) {
      t.forward(HANDLE_SIZE);
      t.right(90);
    }
  } else if (handleType === 1) {
    // Triangular handle
    for (let i = 0; i < 3; i++) {
      t.forward(HANDLE_SIZE);
      t.right(120);
    }
  }

  return t;
}

/**
 * Creates the tiny dresser with a specified number of tiny drawers.
 * @param {number} numDrawers The number of drawers.
 */
function createDresser(numDrawers) {
  const dresserBase = createDresserBase();
  // Move the dresser base higher
  bt.translate(dresserBase.path, [WIDTH / 2 - 20, HEIGHT / 2 + 10]);
  bt.join(shapes, dresserBase.path);

  for (let i = 0; i < numDrawers; i++) {
    const drawer = createDrawer(i);
    // Move each drawer higher
    bt.translate(drawer.path, [WIDTH / 2 - DRAWER_WIDTH / 2, HEIGHT / 2 + 10 - (i * (DRAWER_HEIGHT + 2))]);
    bt.join(shapes, drawer.path);
  }
}

// Randomly choose between 1 and 4 drawers
const numDrawers = Math.floor(Math.random() * 4) + 1;
createDresser(numDrawers);

// Draw the shapes
drawLines(shapes);
