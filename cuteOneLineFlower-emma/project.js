/*
@title: cute one-line flower
@author: emma x and sophia x
@snapshot: line_flower
*/


let r = bt.randInRange(0,15);
const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();
const size = 100

//stem
let curve = bt.catmullRom([[30,12], [35, 48], [38, 60], [45, 78], [50 + r, 90]]);

//leaf
let leaf1 = bt.catmullRom([[30, 12], [35, 23], [50 + r, 40]])
let leaf2 = bt.catmullRom([[50 + r, 40], [50, 32 + r], [30, 12]])

//petals
let petalOne = bt.catmullRom([[50,90], [45 , 85], [40, 75], [42, 65], [50, 60 + r], [58, 65], [60, 75], [55, 85], [50, 90]], 10)
//for (let i=0; i<6; i++) {
  //petals = bt.rotate(petals, 72*i, [50, 90]);
  //drawLines([petalOne]) 
//}

let petalTwo = bt.catmullRom([[50,90], [45, 95], [35, 105], [38, 116], [43, 120-r], [48, 106], [53, 100], [50, 90]], 10);

let petalThree = bt.catmullRom([[50,90], [53, 94], [60, 102], [65, 120-r], [70, 123-r], [75, 100], [68, 90], [50,90]],10);

bt.translate([petalOne, petalTwo, petalThree], [r, 0]);


//flower center
//const c = new bt.Turtle()
//goTo([50 + r, 90]
//  c.forward(500)
//const centerPath = c.path;

//background colour
  const bg = [
    [0,0],
    [0,125],
    [125, 125],
    [125, 0],
    [0,0]
  ];

drawLines([bg], {fill:'lightblue'})
drawLines([curve, leaf1, leaf2], {stroke: 'green'}, 30);
drawLines([petalOne, petalTwo, petalThree], {fill:'pink'}, {stroke: 'pink'}, 30)
//drawLines(c.lines());


