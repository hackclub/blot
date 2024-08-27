const width = 400;
const height = 400;
setDocDimensions(width, height);

const cellSize = 20;
const cols = Math.floor(width / cellSize);
const rows = Math.floor(height / cellSize);

// 2D array to track visited cells
const grid = Array(cols).fill().map(() => Array(rows).fill(false));

// Store final lines here
const finalLines = [];

function generateMaze(x, y) {
  grid[x][y] = true;

  const directions = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  shuffleArray(directions);

  for (let [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;

    if (newX >= 0 && newX < cols && newY >= 0 && newY < rows && !grid[newX][newY]) {
      // Remove wall between current cell and next cell
      if (dx === 1) {
        finalLines.push([[x * cellSize + cellSize, y * cellSize], [x * cellSize + cellSize, (y + 1) * cellSize]]);
      } else if (dx === -1) {
        finalLines.push([[x * cellSize, y * cellSize], [x * cellSize, (y + 1) * cellSize]]);
      } else if (dy === 1) {
        finalLines.push([[x * cellSize, y * cellSize + cellSize], [(x + 1) * cellSize, y * cellSize + cellSize]]);
      } else if (dy === -1) {
        finalLines.push([[x * cellSize, y * cellSize], [(x + 1) * cellSize, y * cellSize]]);
      }

      generateMaze(newX, newY);
    }
  }
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Generate the outer walls
finalLines.push([[0, 0], [width, 0]]);
finalLines.push([[width, 0], [width, height]]);
finalLines.push([[width, height], [0, height]]);
finalLines.push([[0, height], [0, 0]]);

// Start maze generation from the top-left corner
generateMaze(0, 0);

// Draw the maze
drawLines(finalLines);