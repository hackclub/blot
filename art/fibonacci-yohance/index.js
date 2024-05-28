/*
@title: Fib
@author: Yohance
@snapshot: img1.png
*/
const density = -5; //increasing this decreases density
const squareOpenness = 120 // between 91 & 360 (angle between adjacent squares within the fibonacci - should be 90 for perfect fibonacci squares)
const t = new bt.Turtle();
const width = 125;
const height = 125;
const finalLines = [];
setDocDimensions(width, height);
const size = [0.1,0.1]
for(let i = 0; i < 10; i++){
  size.push(1*(size[size.length-1] + size[size.length-2]))
}
console.log(size)
t.left(90)

for (let k = 0; k < bt.randInRange(5,15); k++){
  for (let i = 2; i < size.length; i++){
    for (let j = 0; j < 6; j++){
      t.forward(size[i])
      t.left(90)
      if (j > 4){t.up()}
        
    }
    t.down()
    t.right(bt.randInRange(90, squareOpenness))
  }
  t.left(bt.randInRange(0, 360))
  t.forward(density)
}

bt.join(finalLines, t.lines())

bt.translate(finalLines, [width/2, height/2], bt.bounds(finalLines).cc)
const coveringPolylines = [[[0, 0], [0, 120], [120,120], [120, 0]]];
bt.cut(finalLines, coveringPolylines);


drawLines(finalLines)
