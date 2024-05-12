/*
@title: Pong 
@author: Jorge Uribe
@snapshot: nameOfPicture.png
*/
// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Paddle dimensions
const paddleWidth = 5;
const paddleHeight = 20;
const paddleGap = 10;

// Ball dimensions
const ballSize = 4;

// Paddles
const leftPaddle = [[paddleGap - paddleWidth / 2, height / 2 - paddleHeight / 2], [paddleGap + paddleWidth / 2, height / 2 - paddleHeight / 2], [paddleGap + paddleWidth / 2, height / 2 + paddleHeight / 2], [paddleGap - paddleWidth / 2, height / 2 + paddleHeight / 2]];
const rightPaddle = [[width - paddleGap - paddleWidth / 2, height / 2 - paddleHeight / 2], [width - paddleGap + paddleWidth / 2, height / 2 - paddleHeight / 2], [width - paddleGap + paddleWidth / 2, height / 2 + paddleHeight / 2], [width - paddleGap - paddleWidth / 2, height / 2 + paddleHeight / 2]];
drawLines([leftPaddle, rightPaddle], { fill: "black" });

// Draw ball
const ball = [
  [[width / 2 - ballSize / 2, height / 2 - ballSize / 2], [width / 2 + ballSize / 2, height / 2 - ballSize / 2]],
  [[width / 2 + ballSize / 2, height / 2 - ballSize / 2], [width / 2 + ballSize / 2, height / 2 + ballSize / 2]],
  [[width / 2 + ballSize / 2, height / 2 + ballSize / 2], [width / 2 - ballSize / 2, height / 2 + ballSize / 2]],
  [[width / 2 - ballSize / 2, height / 2 + ballSize / 2], [width / 2 - ballSize / 2, height / 2 - ballSize / 2]]
];
drawLines(ball);

// Draw line and center
const centerLine = [];
for (let i = 0; i < height; i += 5) {
  centerLine.push([width / 2, i]);
}
drawLines([centerLine]);

// initial score
let scoreText = "1 - 1"; //update score to 0 or 1 
const scoreX = 39; // X position of score text
const scoreY = 100; // Y position of score text 

// individual characters of the score
const drawCharacter = (char, x, y) => {
  switch (char) {
    case '0':
      drawLines([
        [[x + 1, y], [x + 6, y]],
        [[x + 1, y + 10], [x + 6, y + 10]],
        [[x + 1, y], [x + 1, y + 10]],
        [[x + 6, y], [x + 6, y + 10]]
      ]);
      break;
    case '1':
      drawLines([
        [[x + 4, y], [x + 4, y + 10]]
      ]);
      break;
    default:
      break;
  }
};

// Draw score
for (let i = 0; i < scoreText.length; i++) {
  drawCharacter(scoreText[i], scoreX + i * 8, scoreY);
}
