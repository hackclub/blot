// A test pattern you can use while tuning your blot.
// Diagnose issues with your blot using the tuning guide: https://blot.hackclub.com/tuning

const width = 125;
const height = 125;
setDocDimensions(width, height);
const t = createTurtle();

///////////////
// 🅱️ORPHEUS //
///////////////

const dinoHeight = 50;
const dinoFlatWidth = 15;
const hatWidth = 24;
const hatHeight = 5;

// The Spine
t.left(90);
t.forward(dinoHeight);

// The 🅱️eret
t.right(-20); // slant beret
// Get in position...
t.left(90);
t.up();
t.forward(hatWidth/2);
// Bottom part of hat
t.right(180);
t.down();
t.forward(hatWidth);
// Right rounded part
for (let i = 0; i < 8; i++) {
  t.forward(1);
  t.left(180/8);
}
// Top part of beret
t.forward(hatWidth);
// Left rounded part
for (let i = 0; i < 8; i++) {
  t.forward(1);
  t.left(180/8);
}
// Vertical Hatching
t.left(90);
for(let x = 0; x < hatWidth+1; x+=2){
  t.down();
  t.forward(hatHeight);
  t.up();
  t.right(90);
  t.forward(1);
  t.right(90);
  t.down();
  t.forward(hatHeight);
  t.up();
  t.left(90);
  t.forward(1);
  t.left(90);
}
// Horizontal hatching
t.up();
t.forward(0.25);
t.down(); t.forward(4.4); t.up();
t.left(90);
t.forward(27);
t.left(90);
t.down(); t.forward(4.4); t.up();
// The beret stalk
t.right(180);
t.forward(4.75);
t.right(90);
t.forward(12);
t.down();
t.left(125);
t.forward(5);
t.right(125);
t.forward(2);
t.right(55);
t.forward(5);
t.left(55);
t.left(180);
t.up();
for(let y = 0; y < 3; y+=2){
  t.down(); t.forward(2); t.up();
  t.right(90);
  t.forward(1);
  t.left(90);
  t.forward(0.7);
  t.left(180);
  t.down(); t.forward(2); t.up();
  t.left(90);
  t.forward(1);
  t.left(90);
  t.forward(0.7);
}
// Reset position...
//t.down();
t.left(90);
t.forward(9.0);
t.left(90);
t.forward(1.8);
t.down();
t.right(20); // unslant beret

// The 🅱️
t.forward(dinoFlatWidth);
for (let i = 0; i < 8; i++) {
  t.forward(5);
  t.right(180/8);
}
t.right((9/8)*180);
for (let i = 0; i < 8; i++) {
  t.forward(5);
  t.right(180/8);
}
t.left(180/8);
t.forward(dinoFlatWidth);

// The Tail
for (let i = 0; i < 5; i++) {
  t.forward(5);
  t.right(180/8);
}
t.right(180*6/8);
for (let i = 0; i < 4; i++) {
  t.forward(5);
  t.left(180/8);
}

// The 👀
let drawEye = ()=>{
  for (let i = 0; i < 20; i++) {
    t.forward(0.7);
    t.left(360/20);
  }
};
t.up();
t.left(46.9);
t.forward(29.0);
t.down(); drawEye(); t.up();
t.left(-45.9);
t.forward(11.0);
t.down(); drawEye(); t.up();

/*
for (let i = 0; i < 25; i++) {
    t.forward(i);
    t.left(90);
}
*/

t.translate(
  [width/2, height/2], 
  t.cc
);

drawTurtles([
    t
]);