/*
@title: Summoning Circles
@author: Armaan Gomes
@snapshot: GrandSummoningCircle.png
A modified version of a Banach curve using recursion to keep the code as simple as possible.
*/
const width = 125;
const height = 125;
const centerX = 62.5
const centerY = 62.5;
const size = 12;
const layers = 3; //>0
const simplification = 2
setDocDimensions(width, height);

const finalLines = [];
const t = new bt.Turtle();
// Built using recursion to decrease code length
function draw(marker, level, x, y, length, maxlevel) {
  if (level === maxlevel) {
    return;
  }




  if (level == 0) {
    marker.jump([x, y - length]);
    marker.arc(360, length);
    draw(marker, level + 1, x, y, length / 3, maxlevel);
  }

  marker.jump([x, y - length]);
  marker.arc(360, length);

  draw(marker, level + 1, x, y, length / 3, maxlevel);

  for (let i = 0; i < 8; i++) {
    let angle = i * Math.PI / 4;
    let newX = x + Math.sin(angle) * length * 3;
    let newY = y + Math.cos(angle) * length * 3;

    marker.jump([newX, newY - length]);
    marker.arc(360, length);

    draw(marker, level + 1, newX, newY, length / 3, maxlevel);
  }
}


draw(t, 0, centerX, centerY, size, layers);

bt.join(finalLines, bt.simplify(t.lines(), simplification));
drawLines(finalLines);