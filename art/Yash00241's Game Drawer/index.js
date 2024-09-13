/*
@title: Sudoku Game Drawer
@author: Yash Vardhan Niranjan
@snapshot: image.png
*/

const width = 120  // Set the width of the canvas to 120 units
const height = 120 // Set the height of the canvas to 120 units
const difficulty = 65 // Set the difficulty level (affects the number of hidden squares) Good Values = 50 to 75

setDocDimensions(width, height)  // Set the document dimensions to the previously specified width and height

const shapes = [];  // Create an array to store the shapes to be drawn

// Function to draw numbers (1-9) using a Turtle graphics-like system
function drawNumber(number) {
  const t = new bt.Turtle();  // Create a new Turtle object

  // Series of conditionals to draw the number based on its value ***DO NOT CHANGE***
  if (number == 1) {
    t.right(90);    // Turn right 90 degrees
    t.forward(10);  // Move forward 10 units
  } else if (number == 2) {
    t.forward(5); t.left(90); t.forward(5); 
    t.left(90); t.forward(5); t.right(90);
    t.forward(5); t.right(90); t.forward(5);
  } else if (number == 3) {
    t.forward(5); t.left(90); t.forward(5); 
    t.left(90); t.forward(5); t.left(180);
    t.forward(5); t.left(90); t.forward(5); 
    t.left(90); t.forward(5);
  } else if (number == 4) {
    t.left(90); t.forward(5); t.right(90); 
    t.forward(5); t.right(90); t.forward(5); 
    t.right(180); t.forward(10);
  } else if (number == 5) {
    t.forward(5); t.right(90); t.forward(5); 
    t.right(90); t.forward(5); t.left(90); 
    t.forward(5); t.left(90); t.forward(5);
  } else if (number == 6) {
    t.forward(5); t.right(180); t.forward(5); 
    t.right(90); t.forward(10); t.right(90); 
    t.forward(5); t.right(90); t.forward(5); 
    t.right(90); t.forward(5);
  } else if (number == 7) {
    t.forward(5); t.left(90); t.forward(10);
  } else if (number == 8) {
    t.forward(5); t.left(90); t.forward(10); 
    t.left(90); t.forward(5); t.left(90); 
    t.forward(10); t.right(180); t.forward(5);
    t.right(90); t.forward(5);
  } else if (number == 9) {
    t.left(90); t.forward(5); t.right(90); 
    t.forward(5); t.left(90); t.forward(5); 
    t.left(90); t.forward(5); t.left(90); 
    t.up(); t.forward(10); t.down(); 
    t.left(90); t.forward(5); t.left(90); t.forward(5);
  }

  return t;  // Return the Turtle object after drawing the number
}

// Function to create a small square
function createSquare() {
  const t = new bt.Turtle();  // Create a new Turtle object

  // Draw a small square by moving forward and turning right
  for (let i = 0; i < 2; i++) {
    t.forward(width / 9);   // Move forward by a fraction of the width
    t.right(90);            // Turn right 90 degrees
    t.forward(height / 9);  // Move forward by a fraction of the height
    t.right(90);            // Turn right 90 degrees
  }

  return t;  // Return the Turtle object
}

// Function to create a large square
function createBigSquare() {
  const t = new bt.Turtle();  // Create a new Turtle object

  // Draw a large square by moving forward and turning right
  for (let i = 0; i < 2; i++) {
    t.forward(width / 3);    // Move forward by a third of the width
    t.right(90);             // Turn right 90 degrees
    t.forward(height / 3);   // Move forward by a third of the height
    t.right(90);             // Turn right 90 degrees
  }

  return t;  // Return the Turtle object
}

// Nested loops to draw the grid of small squares (9x9)
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    const t = createSquare();  // Create a small square
    bt.translate(t.path, [0, 0], bt.bounds(t.path).lb);  // Position the square
    bt.translate(t.path, [width / 9 * i, height / 9 * j]);  // Translate based on grid position
    bt.join(shapes, t.lines());  // Add the square's lines to the shapes array
  }
}

// Nested loops to draw the grid of large squares (3x3)
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const t = createBigSquare();  // Create a large square
    bt.translate(t.path, [0.3, 0.3], bt.bounds(t.path).lb);  // Position the square
    bt.translate(t.path, [width / 3 * i, height / 3 * j]);  // Translate based on grid position
    bt.join(shapes, t.lines());  // Add the squares lines to the shapes array
  }
}

// Sudoku generator class
class SudokuGenerator {
  constructor() {
    this.rows = [];  // Initialize rows
    this.cols = [];  // Initialize columns
    this.nums = [];  // Initialize numbers
    this.board = [];  // Initialize the board

    // Initialize rows, cols, and board
    for (let i = 0; i < 9; i++) {
      this.rows.push([]);
      this.cols.push([]);
      this.nums.push(i + 1);  // Fill nums with 1 to 9
      this.board.push([]);
    }

    this.shuffle(this.nums);  // Shuffle the numbers

    // Shuffle rows for each group of 3 rows
    for (let g = 0; g < 3; g++) {
      const rowShuffle = this.shuffle([0, 1, 2]);  // Shuffle group of 3 rows
      rowShuffle.forEach((r) => {
        for (let c = 0; c < 3; c++) {
          this.rows.push(g * 3 + r);  // Add shuffled rows
          this.cols[g * 3 + c].push(g * 3 + r);  // Add shuffled columns
        }
      });
    }

    // Fill the Sudoku board using the shufled numbers
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const num = this.nums[(3 * r + Math.floor(r / 3) + c) % 9];  // Calculate the number
        this.board[r].push(num);  // Add the number to the board
      }
    }
  }

  // Shuffle the array in place
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(bt.rand() * (i + 1));  // Generate a random index
      [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
    }
    return arr;  // Return the shuffled array
  }

  // Create the Sudoku challenge by removing some numbers from the board
  createChallenge(d) {
    while (d != 0) {  // Continue until the difficulty level is reached
      let mi = bt.randIntInRange(0, 9);  // Random row index
      let bi = bt.randIntInRange(0, 9);  // Random column index

      try {
        if (this.board[mi][bi] != 0) {  // If the cell is not already empty
          this.board[mi][bi] = 0;  // Set the cell to 0 (empty)
          d -= 1;  // Decrease the difficulty counter
        }
      } catch (e) {}  // Catch any errors
    }
  }
}

let sudoku = new SudokuGenerator();  // Create a new Sudoku puzzle
sudoku.createChallenge(difficulty);  // Create a challenge with the specified difficulty

// Draw the numbers on the Sudoku bord
for (let rn = 0; rn < 9; rn++) {
  let row = sudoku.board[rn];  // Get th current row
  for (let on = 0; on < 9; on++) {
    if (row[on] == 0) { continue }  // Skip the empty cells

    const obj = drawNumber(row[on]);  // Draw the numbers
    bt.translate(obj.path, [0, 0], bt.bounds(obj.path).lb);  // Psitioning the number
    bt.translate(obj.path, [width / 9 * on + 2.5, height / 9 * rn + 2.5]);  // Translate based on cell position
    bt.join(shapes, obj.path);  // Add the number to the shapes array
  }
}

bt.scale(shapes, [0.90, -0.90]);  // Scale the shapes to fit the canvas

drawLines(shapes);  // Draw all the shapes on the canvas
