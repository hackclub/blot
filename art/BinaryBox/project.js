/*
@title: Binary Box
@author: Derek Gou
@snapshot: snap1.png
*/

// set dimensions
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
var finalLines = [];

// create box
const screen = [
  [20, 20],
  [20, height-40],
  [width-30, height-40],
  [width-30, 20],
  [20, 20]
];
const edge1 = [
  [20, height-40],
  [width-30, height-40],
  [width-20, height-30],
  [30, height-30],
  [20, height-40],
];
const edge2 = [
  [width-30, 20],
  [width-30, height-40],
  [width-20, height-30],
  [width-20, 30],
  [width-30, 20],
];

// add the box to the final lines
finalLines.push(screen);
finalLines.push(edge1);
finalLines.push(edge2);


// generate and draw binary
for (let x = 0; x<width-55; x+=5){
  let currLines = []
  for (let y = 0; y<height-65; y+=5){
    let rand = bt.rand();
    let str
    if (rand<0.5){
      str = '0'
    } else {
      str = '1'
    }
    currLines = [...currLines, ...bt.text(str,[x+22.5, y+22.5],1)]
  }
  finalLines = [...finalLines, ...currLines]
}

for (let x = 0; x<width-55; x+=5){
  let currLines = []
  for (let y = 0; y<10; y+=5){
    let rand = bt.rand();
    let str
    if (rand<0.5){
      str = '0'
    } else {
      str = '1'
    }
    currLines = [...currLines, ...bt.text(str,[x+width-97, y+height-39],1)]
  }
  bt.scale(currLines, [1, 0.8]);
  bt.rotate(currLines, -45);
  finalLines = [...finalLines, ...currLines]
}

for (let x = 0; x<10; x+=5){
  let currLines = []
  for (let y = 0; y<height-65; y+=5){
    let rand = bt.rand();
    let str
    if (rand<0.5){
      str = '0'
    } else {
      str = '1'
    }
    currLines = [...currLines, ...bt.text(str,[x+width-28, y+height-100+x],1)]
  }
  finalLines = [...finalLines, ...currLines]
}

// draw it
drawLines(finalLines);