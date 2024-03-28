/*
@title: lampda
@author: snipchu
@snapshot: lampielampda0.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);
const t = new bt.Turtle();

let reverselamp = false;
// leg 1 parameters
let leg1_len = 50;
let leg1_width = 6;
const leg1_degree = -50;

// leg 2 parameters
let leg2_len = 50;
let leg2_width = 6;
const leg2_degree = 0;

let wire_len = 8;

// lampbox parameters
let lampbox_height = 12;
let lampbox_width = 14;

// lamp parameters
let lamp_radius = 12;
let lamp_height = 12;
let lamp_width = 4;
const lamp_degree = 193;

// light parameters
let light_size = 10;
let light_width = 38;

// parameters with 'let' have restrictions so it works :D
if (leg1_len<15) {leg1_len=15;}
if (leg1_width<2) {leg1_width=2;}
if (leg2_len<10) {leg2_len=10;}
if (leg2_width<2) {leg2_width=2;}
if (wire_len<4) {wire_len=4;}
if (lampbox_height<2) {lampbox_height=2;}
if (lampbox_width<2) {lampbox_width=2;}
if (lamp_radius<1) {lamp_radius=1;}
if (lamp_height<0) {lamp_height=0;}
if (lamp_width<0) {lamp_width=0;}
if (light_size<0) {light_size=0;}

// base
t.jump([0,-113]);
t.setAngle(-12.5);
t.arc(25,90);
t.jump([0,-106]);
t.setAngle(-12.5);
t.arc(25,90);
t.jump([0,-105.5]);
t.setAngle(9.5);
t.arc(-19.5,116);
t.jump([0,-112.6]);
t.setAngle(90);
t.forward(7);
t.jump([39,-112.6]);
t.setAngle(90);
t.forward(7);

// joint1
t.jump([14.5,-106]);
for (let i=0; i<2; i++) {
  t.forward(8);
  t.right(90);
  t.forward(10);
  t.right(90);
}

// leg 1
t.jump([19.5,-102]);
t.setAngle(leg1_degree);
let lenlist = [leg1_width/2, leg1_len, leg1_width, leg1_len, leg1_width/2];
for (let i=0; i<5; i++) {
  t.forward(lenlist[i]);
  t.left(90);
}
t.right(90);

//leg 2
t.up();
t.left(90);
t.forward(leg1_len-5);
t.down();
t.right(leg2_degree);
lenlist = [leg2_width/2, leg2_len, leg2_width, leg2_len, leg2_width/2];
for (let i=0; i<5; i++) {
  t.forward(lenlist[i]);
  t.left(90);
}
t.right(90);

//connecting wires
t.up();
t.left(90);
t.forward(leg2_len-3);
t.down();
t.forward(wire_len);
  
//lampbox
t.jump(t.path.at(-1).at(-1));
t.left(90);
t.right(lamp_degree);
lenlist = [lampbox_width/2, lampbox_height, lampbox_width, lampbox_height, lampbox_width/2];
for (let i=0; i<5; i++) {
  t.forward(lenlist[i]);
  t.left(90);
}
t.right(90);
//lamp
let flip = 1;
if (reverselamp) {flip=-1;}
t.jump(t.path.at(-1).at(-1));
t.left(90);
t.up();
if (!reverselamp) {
  t.forward(lampbox_height/2-lamp_radius-(lamp_height/2));
} else {
  t.forward(lampbox_height/2+lamp_radius+(lamp_height/2));
}
t.left(90);
t.forward(flip*(lamp_radius+lamp_width+lampbox_width-(lampbox_width/1.5)));
t.down();
t.right(180);
if (reverselamp) {t.right(180);}
t.forward(lamp_width);
t.arc(90,lamp_radius);
t.forward(lamp_height);
t.arc(90,lamp_radius);
t.forward(lamp_width);
const arcend = t.path.at(-1).at(-1);
t.right(-90);
t.forward(lamp_radius*2+lamp_height);

//light
t.jump(t.path.at(-1).at(-1));
t.right(90);
t.left(light_size);
t.forward(light_width);
t.jump(arcend);
t.right(light_size*2);
t.forward(light_width);

bt.translate(
  t.path,
  [width/2, height/2], 
  bt.bounds(t.path).cc
);
drawLines(t.lines());