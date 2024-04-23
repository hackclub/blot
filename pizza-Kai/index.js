// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 1095;

setDocDimensions(width, width);

const finalLines = [];

const t = new bt.Turtle();

const crustWidth = width * 0.05;
const slices = 0;

//toppings
const pepperoniCount = 0;
const pepperoniSize = width * 0.04

const mushroomCount = 20
const mushroomSize = width * 0.05

function radians(angle) {
  return angle * (Math.PI / 180);
}


// base pizza
t.up();
t.goTo([width / 2, 0]);
t.down();
t.arc(360, width / 2);
t.up();
t.goTo([width / 2, crustWidth]);
t.down();
t.arc(360, width / 2 - crustWidth);


//slices
const sliceAngle = 360 / slices
for (let i = 0; i < slices; i++) {
  t.jump([width / 2, width / 2]);
  t.setAngle(sliceAngle * i);
  t.forward(width / 2);
}


// pepperoni
var pepperoniLength = 0;
var pepperoniAngle = 0;
for (let i = 0; i < pepperoniCount; i++) {
  pepperoniLength = bt.randIntInRange(0, width / 2 - crustWidth - pepperoniSize);
  // console.log(pepperoniLength);
  pepperoniAngle = bt.randIntInRange(0, 360);
  t.jump([width / 2, width / 2]);
  t.setAngle(pepperoniAngle);
  t.up();
  t.forward(pepperoniLength);
  t.down();
  t.arc(360, pepperoniSize);
}


// mushroom
function makeMushroom(x, y, size) {
  t.jump([x, y]);
  t.setAngle(90);
  t.down();
  t.arc(180, size);
  t.goTo([x - size + size / 6, y]);
  t.goTo([x - size + size / 6, y - size * 1.5]);
  t.goTo([x - size - size / 6, y - size * 1.5]);
  t.goTo([x - size - size / 6, y]);
  t.goTo([x, y])
  t.up()
}

var mushroomLength = 0
var mushroomAngle = 0
var xValMushroom = 0
var yValMushroom = 0
for (let j = 0; j < mushroomCount; j++) {
  mushroomLength = bt.randIntInRange(0, width / 2 - crustWidth - mushroomSize);
  mushroomAngle = bt.randIntInRange(0, 360);
  xValMushroom = width / 2 + Math.cos(mushroomAngle) * mushroomLength;
  yValMushroom = width / 2 + Math.sin(mushroomAngle) * mushroomLength;
  makeMushroom(xValMushroom, yValMushroom, mushroomSize);
}


// cheese
const cheeseLocs = [
  [
    [190, 180],
    [206, 174],
    [202, 150],
    [212, 141],
    [223, 144],
    [220, 175],
    [230, 180]
  ],
  [
    [36, 189],
    [45, 174],
    [35, 135],
    [55, 131],
    [69, 144],
    [61, 175],
    [90, 162]
  ],
  [
    [118, 230],
    [121, 213],
    [126, 189],
    [114, 177],
    [130, 137],
    [146, 169],
    [154, 165],
    [147, 203],
    [149, 215],
    [152, 217]
  ],
  [
    [52, 122],
    [79, 131],
    [79, 106],
    [67, 83],
    [84, 67],
    [90, 111],
    [112, 106],
    [127, 128],
    [150, 83],
    [148, 128],
    [162, 128],
    [174, 117]
  ]
]
const degreesPerCheese = 360 / cheeseLocs.length;
const offset = 65
for (let i = 0; i < cheeseLocs.length; i++) {
  const cheese = bt.scale([bt.catmullRom(cheeseLocs[i])], width / 286);
  bt.translate(bt.originate(cheese), [width / 2, width / 2]); // center cheese
  bt.translate(cheese, [((width - crustWidth) / 2 - offset * width / 286) * Math.cos(radians(degreesPerCheese * i)), ((width - crustWidth) / 2 - offset * width / 286) * Math.sin(radians(degreesPerCheese * i))]) //evenly spread
  bt.join(finalLines, cheese);
}

// add turtle to final lines
bt.join(finalLines, t.lines())

// draw it
drawLines(finalLines);