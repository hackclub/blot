/*
@title: Message Maze
@author: Iambodha
@snapshot: helloworld1.png
*/

// Message Maze is a system where the path of the maze forms a secret message. 
// This message can be any text you choose.

//To hide your own message scroll to the last line and change the phrase to whatever you like.
//Make sure to only use capital letters in the english alphabet and spaces. No other special character would work.
//Enjoy :)

class Maze {
  constructor(cols, rows, start = null, end = null, solutionCells = null) {
    this.cols = cols;
    this.rows = rows;
    this.grid = this.createGrid(cols, rows);
    this.start = start || { i: 0, j: 0 };
    this.end = end || { i: cols - 1, j: rows - 1 };
    this.solutionCells = solutionCells || [];
  }

  setStart(i, j) {
    this.start = { i, j };
  }

  setEnd(i, j) {
    this.end = { i, j };
  }

  startCell() {
    return this.grid[this.start.j][this.start.i];
  }

  endCell() {
    return this.grid[this.end.j][this.end.i];
  }

  createGrid(cols, rows) {
    let grid = new Array(rows);
    for (let j = 0; j < rows; j++) {
      grid[j] = new Array(cols);
      for (let i = 0; i < cols; i++) {
        grid[j][i] = new Cell(i, j);
      }
    }
    return grid;
  }

  getNeighbors(cell) {
    const neighbors = [];
    const i = cell.i;
    const j = cell.j;

    if (j > 0) neighbors.push(this.grid[j - 1][i]); // Top neighbor
    if (i > 0) neighbors.push(this.grid[j][i - 1]); // Left neighbor
    if (j < this.rows - 1) neighbors.push(this.grid[j + 1][i]); // Bottom neighbor
    if (i < this.cols - 1) neighbors.push(this.grid[j][i + 1]); // Right neighbor

    return neighbors;
  }

  cellAt(i, j) {
    return this.grid[j][i];
  }

  static fromJSON(jsonData) {
    const cols = jsonData.cols;
    const rows = jsonData.rows;
    const start = { i: jsonData.start[0], j: jsonData.start[1] };
    const end = { i: jsonData.end[0], j: jsonData.end[1] };
    const solutionCells = jsonData.solutionCells.map(cell => {
      return { i: cell[0], j: cell[1] };
    });
    const maze = new Maze(cols, rows, start, end, solutionCells);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const cellData = jsonData.grid[j][i];
        const cell = new Cell(cellData.i, cellData.j);
        cell.walls = cellData.walls;
        cell.visited = cellData.visited;
        maze.grid[j][i] = cell;
      }
    }

    return maze;
  }

  show(p, cellSize, showSolution) {
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        this.grid[j][i].show(p, cellSize);
      }
    }

    // Draw solution
    if (showSolution) {
      for (const cellCoors of this.solutionCells) {
        const cell = this.cellAt(cellCoors.i, cellCoors.j);
        cell.highlight(p, cellSize, [255, 255, 0]);
      }
    };

    let startX = this.start.i * cellSize + cellSize / 2;
    let startY = this.start.j * cellSize + cellSize / 2;
    let endX = this.end.i * cellSize + cellSize / 2;
    let endY = this.end.j * cellSize + cellSize / 2;

    // Draw start point
    p.fill(0, 255, 0);
    p.noStroke();
    p.ellipse(startX, startY, cellSize / 2, cellSize / 2);

    // Draw end point
    p.fill(255, 0, 0);
    p.noStroke();
    p.ellipse(endX, endY, cellSize / 2, cellSize / 2);
  }
  exportMaze() {
    let mazeRepresentation = [];
    for (let j = 0; j < this.rows; j++) {
      let mazeRow = [];
      for (let i = 0; i < this.cols; i++) {
        let cell = this.grid[j][i];
        let cellWalls = [
          cell.walls[0] ? 1 : 0,
          cell.walls[3] ? 1 : 0,
          cell.walls[2] ? 1 : 0,
          cell.walls[1] ? 1 : 0
        ];
        mazeRow.push(cellWalls);
      }
      mazeRepresentation.push(mazeRow);
    }

    return mazeRepresentation;
  }
}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  removeWall(neighbor) {
    let x = this.i - neighbor.i;
    let y = this.j - neighbor.j;

    if (x === 1) {
      this.walls[1] = false;
      neighbor.walls[3] = false;
    } else if (x === -1) {
      this.walls[3] = false;
      neighbor.walls[1] = false;
    }

    if (y === 1) {
      this.walls[0] = false;
      neighbor.walls[2] = false;
    } else if (y === -1) {
      this.walls[2] = false;
      neighbor.walls[0] = false;
    }
  }

  addWall(neighbor) {
    let x = this.i - neighbor.i;
    let y = this.j - neighbor.j;

    if (x === 1) {
      this.walls[1] = true;
      neighbor.walls[3] = true;
    } else if (x === -1) {
      this.walls[3] = true;
      neighbor.walls[1] = true;
    }

    if (y === 1) {
      this.walls[0] = true;
      neighbor.walls[2] = true;
    } else if (y === -1) {
      this.walls[2] = true;
      neighbor.walls[0] = true;
    }
  }

  highlight(p, cellSize, color = [255, 0, 0]) {
    let x = this.i * cellSize + cellSize / 2;
    let y = this.j * cellSize + cellSize / 2;
    p.fill(color[0], color[1], color[2]);
    p.noStroke();
    p.ellipse(x, y, cellSize / 2, cellSize / 2);
  }

  show(p, cellSize) {
    let x = this.i * cellSize;
    let y = this.j * cellSize;

    p.stroke(255);
    p.strokeWeight(2);
    if (this.walls[0]) {
      p.line(x, y, x + cellSize, y);
    }
    if (this.walls[1]) {
      p.line(x, y, x, y + cellSize);
    }
    if (this.walls[2]) {
      p.line(x, y + cellSize, x + cellSize, y + cellSize);
    }
    if (this.walls[3]) {
      p.line(x + cellSize, y + cellSize, x + cellSize, y);
    }
  }
}

function combineHorizontally(mazesList) {
  const mazeHeight = mazesList[0].rows;
  let mazeWidth = 0;

  for (const maze of mazesList) {
    mazeWidth += maze.cols;
    if (mazeHeight !== maze.rows) {
      throw new Error("Maze heights are not the same");
    }
  }

  const combinedMaze = new Maze(mazeWidth, mazeHeight);
  combinedMaze.grid = mazesList[0].grid;
  let widthTemp = 0;

  for (let j = 1; j < mazesList.length; j++) {
    widthTemp += mazesList[j - 1].cols;

    for (const row of mazesList[j].grid) {
      for (const cell of row) {
        cell.i += widthTemp;
      }
    }

    for (const solutionCell of mazesList[j].solutionCells) {
      solutionCell.i += widthTemp;
    }

    mazesList[j - 1].endCell().removeWall(mazesList[j].startCell());

    for (let i = 0; i < mazeHeight; i++) {
      combinedMaze.grid[i].push(...mazesList[j].grid[i]);
    }
  }

  combinedMaze.setStart(mazesList[0].startCell().i, mazesList[0].startCell().j);
  combinedMaze.setEnd(mazesList[mazesList.length - 1].endCell().i, mazesList[mazesList.length - 1].endCell().j);

  for (const maze of mazesList) {
    combinedMaze.solutionCells.push(...maze.solutionCells);
  }

  return combinedMaze;
}

function combineVertically(mazesList) {
  const mazeWidth = mazesList[0].cols;
  let mazeHeight = 0;

  for (const maze of mazesList) {
    mazeHeight += maze.rows;
    if (mazeWidth !== maze.cols) {
      throw new Error("Maze widths are not the same");
    }
  }

  const combinedMaze = new Maze(mazeWidth, mazeHeight);
  combinedMaze.grid = mazesList[0].grid;
  let heightTemp = 0;

  for (let j = 1; j < mazesList.length; j++) {
    heightTemp += mazesList[j - 1].rows;

    for (const row of mazesList[j].grid) {
      for (const cell of row) {
        cell.j += heightTemp;
      }
    }

    for (const solutionCell of mazesList[j].solutionCells) {
      solutionCell.j += heightTemp;
    }

    mazesList[j - 1].endCell().removeWall(mazesList[j].startCell());

    combinedMaze.grid.push(...mazesList[j].grid);
  }

  combinedMaze.setStart(mazesList[0].startCell().i, mazesList[0].startCell().j);
  combinedMaze.setEnd(mazesList[mazesList.length - 1].endCell().i, mazesList[mazesList.length - 1].endCell().j);

  for (const maze of mazesList) {
    combinedMaze.solutionCells.push(...maze.solutionCells);
  }

  return combinedMaze;
}

function toChar(strLine) {
  const charsList = [];
  const words = strLine.split(' ');

  for (const word of words) {
    for (const char of word) {
      charsList.push(char, 'sep');
    }
    charsList.pop();
    charsList.push('space');
  }
  charsList.pop();
  return charsList;
}

function formatInput(message) {
  const wordsList = message.toUpperCase().split(' ');
  const wordsLength = wordsList.map(word => word.length);
  const numWords = wordsList.length;
  const linesList = [];
  const maxLine = 14;
  let count = 0;
  let currentLine = [];

  if (numWords === 1) {
    return [toChar(wordsList[0])];
  } else {
    for (let i = 0; i < numWords; i++) {
      count = count + wordsLength[i] + 1;

      if (count <= maxLine) {
        currentLine.push(wordsList[i]);
      } else if (wordsList[i].length >= maxLine) {
        if (i !== 0 && wordsList[i - 1].length < maxLine) {
          linesList.push(currentLine);
        }
        linesList.push([wordsList[i]]);
        count = 0;
      } else {
        linesList.push(currentLine);
        currentLine = [wordsList[i]];
        count = wordsLength[i];
      }

      if (i === numWords - 1 && count === maxLine) {
        linesList.push(currentLine);
      }

      if (i === numWords - 1 && count < maxLine) {
        if (wordsList[i].length < maxLine) {
          linesList.push(currentLine);
        }
      }
    }

    const joinedLines = linesList.map(line => line.join(' '));
    return joinedLines.map(line => toChar(line));
  }
}

var extension = 10;

function importPattern(character) {
  const req = new XMLHttpRequest();
  const url = `https://raw.githubusercontent.com/iambodha/Message-Maze-Blot/main/Updated-MessageMaze/assets/patterns/${character}.json`
  req.open("GET", url, false);
  req.send();
  const maze = Maze.fromJSON(JSON.parse(req.response));
  return maze;
}

function makeRow(charMazesList, start, end, lineWidth) {
  const charsMaze = combineHorizontally(charMazesList);

  const leftPadding = Math.floor((lineWidth - charsMaze.cols) / 2);
  const rightPadding = lineWidth - charsMaze.cols - leftPadding;
  const leftMazeSize = { rows: charsMaze.rows, cols: leftPadding };
  const rightMazeSize = { rows: charsMaze.rows, cols: rightPadding };

  let leftMaze, rightMaze;

  if (start.i < end.i) {
    const leftMazeStart = start;
    const leftMazeEnd = { j: charsMaze.startCell().j, i: leftMazeSize.cols - 1 };

    leftMaze = randomPattern(leftMazeSize, leftMazeStart, leftMazeEnd);

    const rightMazeStart = { j: charsMaze.endCell().j, i: 0 };
    const rightMazeEnd = { j: end.j, i: end.i - leftMazeSize.cols - charsMaze.cols };

    rightMaze = randomPattern(rightMazeSize, rightMazeStart, rightMazeEnd);
  }

  if (start.i > end.i) {
    const leftMazeStart = { j: charsMaze.startCell().j, i: leftMazeSize.cols - 1 };
    const leftMazeEnd = end;

    leftMaze = randomPattern(leftMazeSize, leftMazeEnd, leftMazeStart);

    const rightMazeStart = { j: start.j, i: start.i - leftMazeSize.cols - charsMaze.cols };
    const rightMazeEnd = { j: charsMaze.endCell().j, i: 0 };

    rightMaze = randomPattern(rightMazeSize, rightMazeEnd, rightMazeStart);
  }

  const row = combineHorizontally([leftMaze, charsMaze, rightMaze]);

  if (start.i > end.i) {
    const tmp = row.startCell();
    row.setStart(row.endCell().i, row.endCell().j);
    row.setEnd(tmp.i, tmp.j);
  }

  return row;
}

function rBFS(maze, reduced = 8 / 16) {
  const n = maze.rows;
  const m = maze.cols;
  let queue = [];
  const visitedPath = new Set();

  if (maze.solutionCells.length === 0) {
    queue.push(maze.startCell());
    visitedPath[`${maze.start.i},${maze.start.j}`] = true;
  } else {
    for (const cell of maze.solutionCells) {
      queue.push(maze.cellAt(cell.i, cell.j));
      visitedPath.add(`${cell.i}-${cell.j}`);
    }
  }

  console.log(queue.length);

  shuffle(queue, true);
  const savedQueue = queue.splice(0, Math.floor(reduced * queue.length));
  queue = queue.slice(Math.floor(reduced * queue.length));

  console.log(queue.length);

  const parent = new Map();
  while (visitedPath.size < n * m) {
    while (queue.length > 0) {
      const cur = queue.shift();
      visitedPath.add(`${cur.i}-${cur.j}`);

      const neighbours = maze.getNeighbors(cur);
      shuffle(neighbours, true);

      let hasUnvisitedNeighbor = false;
      for (const cell of neighbours) {
        const cellKey = `${cell.i}-${cell.j}`;
        if (!visitedPath.has(cellKey)) {
          cur.removeWall(cell);
          queue.push(cell);
          visitedPath.add(cellKey);
          parent.set(cellKey, cur);
          hasUnvisitedNeighbor = true;
          break;
        }
      }

      if (!hasUnvisitedNeighbor && visitedPath.size < n * m) {
        const curKey = `${cur.i}-${cur.j}`;
        if (parent.has(curKey)) {
          queue.push(parent.get(curKey));
        }
      }
    }

    if (visitedPath.size < n * m && savedQueue.length > 0) {
      queue.push(savedQueue.shift());
    }
  }

  return maze;
}

function generateMazeWithTextSolution(inputText) {
  const inputTextArr = formatInput(inputText);

  const charMazesLists = [];
  for (const line of inputTextArr) {
    const charMazes = [];
    for (const character of line) {
      const maze = importPattern(character);
      charMazes.push(maze);
    }
    charMazesLists.push(charMazes);
  }

  const lineWidth = Math.max(
    ...charMazesLists.map(charMazes =>
      charMazes.reduce((acc, charMaze) => acc + charMaze.cols, 0)
    )
  ) + extension;
  const lineHeight = charMazesLists[0][0].rows;

  let maze;

  if (inputTextArr.length === 1) {
    const start = { j: 0, i: 0 };
    const end = { j: lineHeight - 1, i: lineWidth - 1 };
    maze = makeRow(charMazesLists[0], start, end, lineWidth);
  } else {
    const mazesList = [];

    const firstStart = { j: 0, i: 0 };
    const firstEnd = {
      j: lineHeight - 1,
      i: lineWidth - Math.floor(Math.random() * (extension / 2 - 1)) - 1,
    };
    const firstRow = makeRow(charMazesLists[0], firstStart, firstEnd, lineWidth);
    mazesList.push(firstRow);

    let currEnd = firstEnd;
    for (let i = 1; i < charMazesLists.length - 1; i++) {
      let currStart, currRow;
      currStart = { j: 0, i: currEnd.i };

      if (i % 2 !== 0) {
        currEnd = {
          j: lineHeight - 1,
          i: Math.floor(Math.random() * (extension / 2 - 2)),
        };
      } else {
        currEnd = {
          j: lineHeight - 1,
          i: lineWidth - Math.floor(Math.random() * (extension / 2 - 1)) - 1,
        };
      }

      currRow = makeRow(charMazesLists[i], currStart, currEnd, lineWidth);
      mazesList.push(currRow);
    }

    const lastStart = { j: 0, i: currEnd.i };
    const lastEnd = {
      j: lineHeight - 1,
      i: inputTextArr.length % 2 === 1 ? lineWidth - 1 : 0,
    };

    const lastRow = makeRow(charMazesLists[charMazesLists.length - 1], lastStart, lastEnd, lineWidth);
    mazesList.push(lastRow);

    maze = combineVertically(mazesList);
  }

  maze = rBFS(maze);

  return maze;
}

function shuffle(array, inPlace = false) {
  const result = inPlace ? array : array.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function generateRandomSteps(start, end, maxVars) {
  const dx = end.j - start.j;
  const dy = end.i - start.i;
  const varX = Math.floor(Math.random() * (maxVars[0] + 1));
  const varY = Math.floor(Math.random() * (maxVars[1] + 1));

  const steps = new Array(Math.abs(dx)).fill(dx > 0 ? { i: 0, j: 1 } : { i: 0, j: -1 })
    .concat(new Array(Math.abs(dy)).fill(dy > 0 ? { i: 1, j: 0 } : { i: -1, j: 0 }))
    .concat(new Array(varX).fill({ i: 0, j: 1 }))
    .concat(new Array(varX).fill({ i: 0, j: -1 }))
    .concat(new Array(varY).fill({ i: 1, j: 0 }))
    .concat(new Array(varY).fill({ i: -1, j: 0 }));

  shuffle(steps, true);

  return steps;
}

function randomPattern(size, start, end, retryCount = 0) {
  if (start.i < 0 || start.i >= size.cols || start.j < 0 || start.j >= size.rows) {
    throw new Error('Invalid start coordinates: ' + JSON.stringify(start) + ' ' + JSON.stringify(size));
  }

  if (end.i < 0 || end.i >= size.cols || end.j < 0 || end.j >= size.rows) {
    throw new Error('Invalid end coordinates: ' + JSON.stringify(end) + ' ' + JSON.stringify(size));
  }

  const steps = retryCount < 3 ?
    generateRandomSteps(start, end, [Math.floor(size.rows / 3), Math.floor(size.cols / 3)]) :
    generateRandomSteps(start, end, [0, 0]);

  const maze = new Maze(size.cols, size.rows);
  maze.setStart(start.i, start.j);
  maze.setEnd(end.i, end.j);

  let currentCell = maze.startCell();
  maze.solutionCells.push({ i: currentCell.i, j: currentCell.j });
  const seq = [];
  let nMove = 0;
  const threshold = steps.length;

  while (steps.length > 0) {
    if (currentCell.i === maze.end.i && currentCell.j === maze.end.j) {
      break;
    }

    nMove++;
    seq.push(currentCell);
    if (nMove > threshold && (new Set(seq.slice(-threshold))).size === 1) {
      return randomPattern(size, start, end, retryCount + 1);
    }

    const { i: dI, j: dJ } = steps.shift();
    const nextCellCoords = { i: currentCell.i + dI, j: currentCell.j + dJ };
    let go = false;

    if (maze.grid[nextCellCoords.j] && maze.grid[nextCellCoords.j][nextCellCoords.i]) {
      const nextCell = maze.grid[nextCellCoords.j][nextCellCoords.i];
      if (!maze.solutionCells.some(cell => cell.i === nextCell.i && cell.j === nextCell.j)) {
        go = true;
        currentCell.removeWall(nextCell);
        currentCell = nextCell;
        maze.solutionCells.push({ i: currentCell.i, j: currentCell.j });
      }
    }

    if (!go) {
      steps.push({ i: dI, j: dJ });
    }
  }

  return maze;
}

function generateMazeListFromString(inputString) {
  // Sanitize input string
  inputString = inputString.replace(/[^a-zA-Z]/g, ' ').replace(/\s+/g, ' ').trim();

  if (inputString.length === 0) {
    throw new Error('Input string is empty!');
  }

  if (inputString.length > 30) {
    throw new Error('Input string is too long! Please keep it under 30 characters.');
  }

  // Generate the maze
  const maze = generateMazeWithTextSolution(inputString);

  // Create a list representation of the maze
  const mazeList = maze.exportMaze();

  return mazeList;
}
function drawMazeFromString(hiddenMessage) {
  try {
    // Generate maze data from the hidden message
    const mazeData = generateMazeListFromString(hiddenMessage);
    console.log(mazeData);

    // Set dimensions
    const rows = mazeData.length;
    const cols = mazeData[0].length;
    const cellSize = 5;
    const border = cellSize * 5;
    const width = cols * cellSize + 2 * border;
    const height = rows * cellSize + 2 * border;
    setDocDimensions(width, height);

    // Prepare the grid
    const grid = [];
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < cols; j++) {
        grid[i][j] = {
          x: j,
          y: i,
          walls: mazeData[i][j]
        };
      }
    }

    // Initialize the turtle
    const t = new bt.Turtle();

    // Helper function to move the turtle to a specific corner of a cell
    function tJumpTo(cellx, celly, corner) {
      if (corner == "tl") {
        t.goTo([border + cellx * cellSize, height - (border + celly * cellSize)]);
      } else if (corner == "tr") {
        t.goTo([border + (cellx + 1) * cellSize, height - (border + celly * cellSize)]);
      } else if (corner == "bl") {
        t.goTo([border + cellx * cellSize, height - (border + celly * cellSize + cellSize)]);
      } else if (corner == "br") {
        t.goTo([border + (cellx + 1) * cellSize, height - (border + celly * cellSize + cellSize)]);
      }
    }

    // Function to draw the maze
    function drawMaze() {
      // Draw the outer edges
      t.up();
      tJumpTo(0, 0, "tl");
      t.down();
      t.setAngle(0);
      t.forward(cols * cellSize);
      t.up();
      tJumpTo(0, 0, "bl");
      t.down();
      t.setAngle(270);
      t.forward((rows - 1) * cellSize);
      t.up();
      t.setAngle(0);

      // Draw vertical walls
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j];
          if (cell.walls[2]) {
            t.up();
            tJumpTo(j, i, "bl");
            t.down();
            t.forward(cellSize);
          }
        }
      }

      // Draw horizontal walls
      t.setAngle(-90);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j];
          if (cell.walls[1]) {
            t.up();
            tJumpTo(j, i, "tr");
            t.down();
            t.forward(cellSize);
          }
        }
      }

      // Draw the lines on the canvas
      const Maze = t.lines();
      drawLines(Maze);
    }

    // Execute the drawing function
    drawMaze();
  } catch (error) {
    console.error("Error:", error);
  }
}

//Change the string to whatever message you would like :)
drawMazeFromString("HELLO");