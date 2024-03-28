/*
@title: hilbert
@author: henry bass
@snapshot: hilbert_golf.png
*/

setDocDimensions(125, 125);

let t = new bt.Turtle();
t.jump([7, -7]);

for (let i of eval(
    `'A'` + `.replace(/[AB]/g,c=>c=='A'?'-BF+AFA+FB-':'+AF-BFB-FA+')`.repeat(5)
  ))
  try {
    eval(i == 'F' ? `t.forward(-0.1)` : `t.left(${i}87)`)
  } catch {}

const path = t.path;
bt.scale(path, 110 / bt.bounds(path).width);
bt.translate(path, [125 / 2, 125 / 2], t.cc);
drawLines(path)