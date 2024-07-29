// Blot Chess Puzzle Generator
// This program uses the Chess.com API to grab a random puzzle
// After fetching the random puzzle, this program coverts the FEN format into a Board Array
// It then draws in a grid and all the pieces on it
// Currently it does not show the solution (maybe in the next update it could?!)
// To show the solution, it could just draw a QR code or a link on the side (can blot even draw a QR code?)
// Anyways that's that. (Thanks acon for the idea <3)
// Created by Arnnav Kudale (blazecoding2009)

const width = 200;
const height = 200;
const gridSize = 8;
const squareSize = width / gridSize;
const finalLines = [];
const pieces = {
  K: drawPiece,
  Q: drawPiece,
  R: drawPiece,
  B: drawPiece,
  N: drawPiece,
  P: drawPiece,
  k: drawPieceFilled,
  q: drawPieceFilled,
  r: drawPieceFilled,
  b: drawPieceFilled,
  n: drawPieceFilled,
  p: drawPieceFilled,
};

setDocDimensions(width, height);
for (let x = 0; x <= gridSize; x++) finalLines.push([[x * squareSize, 0], [x * squareSize, height]]);
for (let y = 0; y <= gridSize; y++) finalLines.push([[0, y * squareSize], [width, y * squareSize]]);

function drawPiece(x, y, size, type) {
  const templates = {
    K: [
      [0.5, 0.1],
      [0.4, 0.3],
      [0.6, 0.3],
      [0.5, 0.1],
      [0.3, 0.4],
      [0.7, 0.4],
      [0.3, 0.7],
      [0.7, 0.7],
      [0.3, 0.9],
      [0.7, 0.9],
    ],
    Q: [
      [0.5, 0.1],
      [0.4, 0.3],
      [0.6, 0.3],
      [0.5, 0.1],
      [0.3, 0.4],
      [0.7, 0.4],
      [0.5, 0.5],
      [0.3, 0.9],
      [0.7, 0.9],
    ],
    R: [
      [0.3, 0.1],
      [0.7, 0.1],
      [0.7, 0.3],
      [0.3, 0.3],
      [0.3, 0.7],
      [0.7, 0.7],
      [0.7, 0.9],
      [0.3, 0.9],
      [0.3, 0.1],
    ],
    B: [
      [0.5, 0.1],
      [0.4, 0.2],
      [0.6, 0.2],
      [0.5, 0.1],
      [0.3, 0.3],
      [0.7, 0.3],
      [0.5, 0.5],
      [0.3, 0.9],
      [0.7, 0.9],
    ],
    N: [
      [0.5, 0.1],
      [0.4, 0.2],
      [0.6, 0.2],
      [0.5, 0.1],
      [0.4, 0.4],
      [0.6, 0.4],
      [0.4, 0.6],
      [0.6, 0.6],
      [0.3, 0.9],
      [0.7, 0.9],
    ],
    P: [
      [0.5, 0.1],
      [0.4, 0.2],
      [0.6, 0.2],
      [0.5, 0.1],
      [0.3, 0.3],
      [0.7, 0.3],
      [0.3, 0.9],
      [0.7, 0.9],
    ],
  };
  finalLines.push(templates[type].map(([dx, dy]) => [x + dx * size, y + dy * size]));
}

function drawPieceFilled(x, y, size, type) {
  for (let i = 0; i < 10; i++) {
    drawPiece(x, y + i * 0.01 * size, size, type);
  }
}

function getDailyPuzzle() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.chess.com/pub/puzzle/random", false);
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const daily = JSON.parse(xhr.responseText);
      const boardArray = fenToBoardArray(daily.fen);
      drawBoard(boardArray);
    }
  };
  xhr.send();
}

function fenToBoardArray(fen) {
	const rows = fen.split(" ")[0].split("/");
	return rows.map((row) => {
		return row.split("").map((char) => (isNaN(char) ? char : " ".repeat(parseInt(char)))).join("");
	});
}

function drawBoard(boardArray) {
  	for (let row = 0; row < 8; row++) {
		for (let col = 0; col < 8; col++) {
			const piece = boardArray[row][col];
			if (piece !== " " && pieces[piece]) pieces[piece](
													col * squareSize,
													row * squareSize,
													squareSize,
													piece.toUpperCase());
		}
  	}
  	drawLines(finalLines);
}

getDailyPuzzle();
