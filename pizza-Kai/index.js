// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;

setDocDimensions(width, width);

const finalLines = [];

const t = new bt.Turtle();

const crustWidth = 10;
const slices = 8;

//toppings
const pepperoniCount = 5;
const pepperoniSize = 5

const mushroomCount = 5
const mushroomSize = 5

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





// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
// const cc = bt.bounds(finalLines).cc;
// bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);