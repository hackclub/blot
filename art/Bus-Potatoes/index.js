/*
@title: Bus
@author: Valentina
@snapshot: snapshot1.png
*/

// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

const wheelRad = 9
const wheelY = 47

const space = amtWheels+1
const spaceWidth = (105-(amtWheels*wheelRad*2))/space

var prevSpace = spaceWidth;

const totalWindowWidth = 20
const windowHeight = 20
const windowTop = 60

const totalSpacing = 97 - (amtWindows * totalWindowWidth)
const spaceBetweenWindows = totalSpacing / (amtWindows + 1)

var windowX = 10 + spaceBetweenWindows

setDocDimensions(width, height);

const amtWheels = bt.randIntInRange(2, 4);
const amtWindows = bt.randIntInRange(1, 4);

// store final lines here
const finalLines = [];

const busBody = [
    [10, 45],
    [115, 45], 
    [115, 90], 
    [10, 90],
    [10, 45] 
];

drawLines([busBody]);

for (let i = 0; i < amtWindows; i++) {
    const window = [
        [windowX, windowTop],
        [windowX + totalWindowWidth, windowTop],
        [windowX + totalWindowWidth, windowTop + windowHeight],
        [windowX, windowTop + windowHeight],
        [windowX, windowTop]
    ]
    windowX += totalWindowWidth + spaceBetweenWindows
    drawLines([window]);
}

const frontWindow = [
    [107, 60],
    [115, 60],
    [115, 80],
    [107, 80],
    [107, 60]
]

drawLines([frontWindow]);

function createCircle(radius, x=0, y=0, quality = 100) {
  const turtle = new bt.Turtle()
  turtle.up()
  turtle.goTo([x + radius, y])
  turtle.down()
  
  const circum = 2 * Math.PI * radius
  
  for (let i=0; i < quality; i++) {
    // const xCoord = x + radius * Math.cos(2 * Math.PI * i / quality);
    // const yCoord = y + radius * Math.sin(2 * Math.PI * i / quality);
    turtle.forward(circum/quality)
    turtle.right(360/quality)
  }

  return turtle;
}

for (let i = 1; i <= amtWheels; i++) {
  const dist = prevSpace+wheelRad;
  const circle = createCircle(wheelRad, dist, wheelY);
  prevSpace = prevSpace + (wheelRad * 2 + spaceWidth);

  drawLines(circle.lines());
}
