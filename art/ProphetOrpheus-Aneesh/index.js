/*
@title: Prophet Orpheus
@author: Aneesh Terani
@snapshot: prophetOrpheusNormalNeck.png
*/

bt.setRandSeed(3484);
const neckLen = bt.randIntInRange(1, 20); // makes neck length different each time

const width = 125;
const height = 125;

setDocDimensions(width, height);

const topHalf = new bt.Turtle()
  .jump([10, 32])
  .arc(60, 19.1)
  .left(30)
  .left(90)
  .arc(-75, 15)
  .right(180)
  .arc(360, 4)
  .arc(180, 4)
  .left(195)
  .arc(45, 10)
  .left(105)
  .forward(neckLen + 3)
  .arc(-180, 9)
  .arc(-140, 5)
  .right(40)
  .forward(2.5); // top half of Prophet Orpheus

const bottomHalf = new bt.Turtle()
  .jump([39, 47.5 + neckLen])
  .right(90)
  .forward(neckLen)
  .left(90)
  .arc(-60, 17)
  .arc(-360, 3.75)
  .arc(-180, 3.75)
  .arc(60, 10.5)
  .left(90)
  .arc(75, 12)
  .right(180)
  .arc(360, 4)
  .arc(180, 4)
  .left(180)
  .arc(-45, 12)
  .right(15)
  .forward(4.5)
  .left(75)
  .forward(3)
  .left(75)
  .forward(2.5)
  .arc(45, 4)
  .right(150)
  .arc(360, 4)
  .arc(180, 4)
  .left(180)
  .arc(-70, 10)
  .left(120)
  .arc(-62.3, 14); // bottom half of Prophet Orpheus

drawLines(topHalf.lines());
drawLines(bottomHalf.lines())

const eye1 = new bt.Turtle(); // first eye
eye1.jump([37.1, 53.5 + neckLen]);
eye1.arc(360, 0.5);
drawLines(bt.scale(eye1.lines(), [2.0, 1.25]), { fill: "black" });

const eye2 = new bt.Turtle(); // second eye
eye2.jump([41.7, 53.5 + neckLen]);
eye2.arc(360, 0.5);
drawLines(bt.scale(eye2.lines(), [2.0, 1.25]), { fill: "black" });

const eye1rim = new bt.Turtle(); //rim around first eye
eye1rim.jump([37.1, 53.5 + neckLen]);
eye1rim.arc(360, 0.9);
drawLines(bt.scale(eye1rim.lines(), [2.0, 1.25]));

const eye2rim = new bt.Turtle(); // rim around second eye
eye2rim.jump([41.7, 53.5 + neckLen]);
eye2rim.arc(360, 0.9);
drawLines(bt.scale(eye2rim.lines(), [2.0, 1.25]));