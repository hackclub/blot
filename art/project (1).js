// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < 402; i++) {
  t.forward(i);
  t.right(-91);
  
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);
// Shaft is a stretched triangle
const shaft = bt.resample([[[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]], 1)

// Vanes are a Catmull-Rom curve
const vanes = [bt.catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// Barbs are Catmull-Rom curves originating at the shaft
const barbs = []
for (let i = 0; i < shaft[0].length; i++) {
  const parity = i > shaft[0].length/2 ? -1 : 1
  const [x, y] = shaft[0][i]
  barbs.push(bt.catmullRom(
    [[x, y], [x + parity * 10, y - 2], [x + parity * 30, y]]))
}

// move the vanes nearer to the end of the shaft
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])

// Use the vane shape to trim the barbs!
bt.cut(barbs, vanes)

// combine the two shapes, then move and rotate them together!
const feather = [...shaft, ...barbs]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.fillStyle = 'green';
bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
bt.rotate(feather, 135)
drawLines(feather)
// draw it
drawLines(finalLines);