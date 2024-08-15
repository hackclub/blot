/*
@title: Owais
@author: Owais ahmad
@snapshot:leaves
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Generate a random feather shape
const shape = (n) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n; i++) t.forward(bt.randInRange(0.8, 1.2)).right(360/n);
  return t.lines();
};

const shaft = bt.scale(shape(3), [2, 150]);
const vanes = bt.scale(shape(11), [8, 30]);

bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]]);
const feather = [...shaft, ...vanes];

bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc);
bt.rotate(feather, bt.randInRange(130, 140));

drawLines(feather);
