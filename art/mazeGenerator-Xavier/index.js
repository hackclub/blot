/*
@title: Maze Generator
@author: Xavier Choe
@snapshot: snapshot1.png
*/


//Generates a random maze using a Depth-First Search (DFS)


//Parameters
const rows = 30;
const cols = 30;
const cellSize = 5;


//Initialize the Document
const border = cellSize * 5;
const width = cols * cellSize + 2*border;
const height = rows * cellSize + 2*border;


setDocDimensions(width, height);

//Initialize the maze grid

const grid = [];
for (let i = 0; i < rows; i++) {
  grid[i] = [];
  for (let j = 0; j < cols; j++) {
    grid[i][j] = {
      x: j, // X-coordinate of the cell
      y: i, // Y-coordinate of the cell
      walls: [true, true, true, true], // Top, Right, Bottom, Left
      visited: false // Whether the cell has been visited
    };
  }
}


// Create a stack for the DFS
const stack = [];

// Directions: [dx, dy] for top, right, bottom, left
const directions = [
  [0, -1],  // top
  [1, 0],   // right
  [0, 1],   // bottom
  [-1, 0]   // left
];


// Start at the first cell
  let currentCell = grid[0][0];
  currentCell.visited = true;
  stack.push(currentCell);


// Function to remove walls between two cells
function removeWall(cell1, cell2) {
  const x = cell1.x - cell2.x;
  const y = cell1.y - cell2.y;

  if (x === 1) {
    cell1.walls[3] = false; // Remove left wall of cell1
    cell2.walls[1] = false; // Remove right wall of cell2
  } else if (x === -1) {
    cell1.walls[1] = false; // Remove right wall of cell1
    cell2.walls[3] = false; // Remove left wall of cell2
  }

  if (y === 1) {
    cell1.walls[0] = false; // Remove top wall of cell1
    cell2.walls[2] = false; // Remove bottom wall of cell2
  } else if (y === -1) {
    cell1.walls[2] = false; // Remove bottom wall of cell1
    cell2.walls[0] = false; // Remove top wall of cell2
  }
}

// Function to log the grid to the console (for debugging)
function logGrid() {
  let log = '';
  for (let i = 0; i < rows; i++) {
    let topLine = '';
    let midLine = '';
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      topLine += cell.walls[0] ? '+---' : '+   ';
      midLine += cell.walls[3] ? '| ' : '  ';
      midLine += cell.visited ? 'V ' : '  ';
    }
    log += topLine + '+\n' + midLine + '|\n';
  }
  log += '+'.repeat(cols * 4) + '+';
  console.log(log);
}

// Main DFS loop
function generateMaze() {
  while (stack.length > 0) {
    // Current cell
    currentCell = stack[stack.length - 1];

    // Get unvisited neighbors
    const neighbors = [];

    for (let [dx, dy] of directions) {
      const nx = currentCell.x + dx;
      const ny = currentCell.y + dy;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows) {
        const neighbor = grid[ny][nx];
        if (!neighbor.visited) {
          neighbors.push(neighbor);
        }
      }
    }

    if (neighbors.length > 0) {
      // Randomly select a neighbor
      const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(currentCell, nextCell);
      nextCell.visited = true;
      stack.push(nextCell);
    } else {
      // Backtrack
      stack.pop();
    }
    // logGrid();
  }
}

// Run the maze generation
generateMaze();



//Turtles!!
const t = new bt.Turtle()


// Function to jump turtle to a specified corner of a specified cell
function tJumpTo(cellx , celly, corner) {
  if (corner == "tl") {
    t.goTo([border + cellx * cellSize, height - (border + celly * cellSize)]);
  }
  else if (corner == "tr") {
    t.goTo([border + (cellx + 1) * cellSize, height - (border + celly * cellSize)]);
  }
  else if (corner == "bl") {
    t.goTo([border + cellx * cellSize, height - (border + celly * cellSize + cellSize)]);
  }
  else if (corner == "br") {
    t.goTo([border + (cellx + 1) * cellSize, height - (border + celly * cellSize + cellSize)]);
  }
}


// Function to draw the maze
function drawMaze() {
  // Draw top and right edges
  t.up();
  tJumpTo(0,0,"tl");
  t.down();
  t.setAngle(0);
  t.forward(cols * cellSize);
  t.right(90);
  t.forward((rows - 1) * cellSize);
  t.up();
  // Draw left and bottom edges
  tJumpTo(0,0, "bl");
  t.down();
  t.setAngle(270);
  t.forward((rows - 1) * cellSize);
  t.left(90);
  t.forward(cols * cellSize);
  t.up();
  // Draw horizontal bars of the Maze
  t.setAngle(0);
  for (let i = 0; i < rows - 1; i++) {
    for (let j = 0; j < cols; j++) {
      const cell = grid[i][j];
      if (cell.walls[2]) {
        t.up();
        tJumpTo(j,i,"bl");
        t.down();
        t.forward(cellSize);
      }
    }
  }
  // Draw vertical bars of the Maze
  t.setAngle(-90);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      const cell = grid[i][j];
      if (cell.walls[1]) {
        t.up();
        tJumpTo(j,i,"tr");
        t.down();
        t.forward(cellSize);
      }
    }
  }
  
  //Draw Maze
  const Maze = t.lines();
  drawLines(Maze);
}


drawMaze();

// Step 6: Profit