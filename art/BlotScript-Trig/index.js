/*
@title: BlotScript
@author: Trig Northrup
@snapshot: example1.png
*/


const { Turtle, translate } = blotToolkit;

const textToDraw = "Blot is cool";


setDocDimensions(400, 125);

const characters = {
  A: [[[0,0],[2,4],[4,0]], [[1,2],[3,2]]],
  B: [[[0,0],[0,4],[3,4],[4,3],[3,2],[4,1],[3,0],[0,0]], [[0,2],[3,2]]],
  C: [[[4,0],[0,0],[0,4],[4,4]]],
  D: [[[0,0],[0,4],[2,4],[4,2],[2,0],[0,0]]],
  E: [[[4,0],[0,0],[0,4],[4,4]], [[0,2],[3,2]]],
  F: [[[0,0],[0,4],[4,4]], [[0,2],[3,2]]],
  G: [[[4,2],[4,0],[0,0],[0,4],[4,4]]],
  H: [[[0,0],[0,4]], [[4,0],[4,4]], [[0,2],[4,2]]],
  I: [[[0,0],[4,0]], [[2,0],[2,4]], [[0,4],[4,4]]],
  J: [[[0,4],[4,4],[4,0],[2,0],[0,2]]],
  K: [[[0,0],[0,4]], [[0,2],[4,4]], [[1,2],[4,0]]],
  L: [[[0,4],[0,0],[4,0]]],
  M: [[[0,0],[0,4],[2,2],[4,4],[4,0]]],
  N: [[[0,0],[0,4],[4,0],[4,4]]],
  O: [[[0,0],[0,Math.random() * 4],[Math.random() * 4,4],[4,0],[0,0]]],
  P: [[[0,0],[0,4],[4,4],[4,2],[0,2]]],
  Q: [[[0,0],[0,4],[4,4],[4,0],[0,0]], [[2,2],[4,0]]],
  R: [[[0,0],[0,4],[4,4],[4,2],[0,2]], [[2,2],[4,0]]],
  S: [[[0,0],[4,0],[4,2],[0,2],[0,4],[4,4]]],
  T: [[[0,4],[4,4]], [[2,4],[2,0]]],
  U: [[[0,4],[0,0],[4,0],[4,4]]],
  V: [[[0,4],[2,0],[4,4]]],
  W: [[[0,4],[1,0],[2,2],[3,0],[4,4]]],
  X: [[[0,0],[4,4]], [[0,4],[4,0]]],
  Y: [[[0,4],[2,2],[4,4]], [[2,2],[2,0]]],
  Z: [[[0,4],[4,4],[0,0],[4,0]]]
};

function drawCharacter(char, x, y, scale) {
  const lines = characters[char.toUpperCase()];
  if (!lines) return; 

  const turtle = new Turtle();
  lines.forEach(line => {
    turtle.up();
    turtle.goTo([x + line[0][0] * scale, y + line[0][1] * scale]);
    turtle.down();
    for (let i = 1; i < line.length; i++) {
      turtle.goTo([x + line[i][0] * scale, y + line[i][1] * scale]);
    }
  });
  return turtle.lines();
}

function drawText(text, scale = 5, spacing = 1) {
  let allLines = [];
  let x = 0;
  
  for (let char of text) {
    if (char === ' ') {
      x += 3 * scale;
      continue;
    }
    const charLines = drawCharacter(char, x, 0, scale);
    if (charLines) {
      allLines.push(charLines);
      x += 5 * scale + spacing * scale;
    }
  }
  
  return allLines;
}

function getTextWidth(text, scale, spacing) {
  return text.length * (5 * scale + spacing * scale) - spacing * scale;
}

const scale = 1.5;
const spacing = 1;
const textWidth = getTextWidth(textToDraw, scale, spacing);
const startX = (125 - textWidth) / 2;
const startY = (125 - 4 * scale) / 2;

const textLines = drawText(textToDraw, scale, spacing);
textLines.forEach(charLines => {
  translate(charLines, [startX+ 100, startY]);
  drawLines(charLines);
});