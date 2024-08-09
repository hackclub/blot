/*
@title: cute one-line flower
@author: emma x and sophia x
@snapshot: line_flower
*/

//set up constants and variables
let r = parseInt(bt.randInRange(0,15));
const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();
const size = 100

//FOR FLOWER 1
//stem
let curve = bt.catmullRom([[30,12], [35, 48], [38, 60], [45, 78], [50 + r, 90]]);

//leaf
let leafPart1 = bt.catmullRom([[30, 12], [35, 23], [50 + r, 40]])
let leafPart2 = bt.catmullRom([[50 + r, 40], [50, 32 + r], [30, 12]])

let leafPart3 = bt.catmullRom([[30, 12], [30, 50], [20, 80]])
let leafPart4 = bt.catmullRom([[30, 12], [28 - r, 69], [20, 80]])

//petals
let petalOne = bt.catmullRom([[50,90], [45 , 85], [40, 75], [42, 65], [50, 60 + r], [58, 65], [60, 75], [55, 85], [50, 90]], 10)
let petalTwo = bt.catmullRom([[50,90], [45, 95], [35, 105], [38, 116], [43, 120-r], [48, 106], [53, 100], [50, 90]], 10);
let petalThree = bt.catmullRom([[50,90], [53, 94], [60, 102], [65, 120-r], [70, 123-r], [75, 100], [68, 90], [50,90]],10);

bt.translate([petalOne, petalTwo, petalThree], [r, 0]);

//FOR FLOWER 2
//stem
let curve2 = bt.catmullRom([[60 , 10], [62, 14], [75, 27 + r], [82, 45 + r], [88 + 0.6*r, 69]]);

//leaf
let leafPart5 = bt.catmullRom([[60, 10], [69, 20], [75, 32], [87, 40]]);
let leafPart6 = bt.catmullRom([[60, 10], [68, 17], [72 + r, 16 + r], [87, 40]]);

//petal
let petalFour = bt.catmullRom([[88, 69], [95, 78], [102, 95 + r], [108 + 0.5*r, 82], [88, 69]]);
let petalFive = bt.catmullRom([[88, 69], [82, 60], [70 + 0.5*r, 55], [66, 53], [75, 68], [78, 77 + 0.5*r], [88, 69]]);
let petalSix = bt.catmullRom([[88, 69], [94, 52], [98, 48], [104, 60 + 0.5*r], [88, 69]]);

bt.translate([petalFour, petalFive, petalSix], [0.6*r, 0]);

//ground
let ground = bt.catmullRom([[0,0], [0, 10], [31, 10], [61, 9], [125, 5], [125, 0]]);

//background colour
  const bg = [
    [0,0],
    [0,125],
    [125, 125],
    [125, 0],
    [0,0]
  ];

//drawing all shapes
drawLines([bg], {fill:'lightblue'})
//flower 1
drawLines([curve], {stroke:'green'}, 30);
if (Number.isInteger(r/3)) {
  drawLines([leafPart1, leafPart2], {stroke: 'green'}, 30);}
drawLines([petalOne, petalTwo, petalThree], {fill:'pink'}, {stroke: 'pink'}, 30)
if (Number.isInteger(r/2)) {
  console.log(r/2)
  drawLines([leafPart3, leafPart4], {stroke: 'green'}, 30);}
//flower 2
drawLines([curve2], {stroke: 'green'}, 30);
if (r>3) {
  drawLines([leafPart5, leafPart6], {stroke: 'green'}, 30);}
drawLines([petalFour, petalFive, petalSix], {fill: 'violet'}, {stroke: 'violet'}, 30)
drawLines([ground], {fill: 'green'}, 30);
