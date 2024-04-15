/*
@title: unicorn
@author: Leo
@snapshot: snapshot0
*/

const stripeSize = bt.randInRange(5.4, 5.8);
const stripeStartAngle = bt.randInRange(160, 180);
const tailLength = bt.randInRange(30, 50);
const explodeLines = 0;
const explodeLength = 5;

const width = 125;
const height = 125;

setDocDimensions(width, height);
const finalLines = [];
const t = new bt.Turtle();

//body
t.setAngle(60);
t.forward(50);
const tailStart = t.pos
t.right(85);
t.forward(28);
t.left(70);
t.forward(2);
t.jump([63, 24.5]);
t.setAngle(276);
t.forward(35);
t.right(75);
t.forward(13);
t.setAngle(90);
t.forward(25);
t.left(160);
t.forward(24);
t.right(88);
t.forward(11);
t.setAngle(65);
t.forward(23);
t.left(95);
t.forward(15);
t.setAngle(260);
t.forward(22);
t.right(90);
t.forward(9);
t.right(90);
t.forward(11);
t.right(3);
t.forward(10);
t.left(170);
t.forward(26);
t.goTo([0,0]);

//tail
t.jump(tailStart);
for (let i=0; i<4; i++) {
  t.setAngle(115+i*5);
  t.forward(tailLength/2);
  t.left(bt.randInRange(10, 30));
  t.forward(tailLength/2);
  t.left(bt.randInRange(150, 170));
  t.forward(tailLength/2);
  t.goTo(tailStart);
}

//scarf
t.jump([64, 24.5]);
t.setAngle(170);
t.arc(-85, 17);
t.setAngle(30);
t.forward(13);
const headEnd = t.pos
t.setAngle(-88);
t.arc(25, 50);
const headStart = t.pos
t.goTo([64, 24.5]);
t.jump([52, 44]);
t.setAngle(133);
t.forward(40);
t.right(105);
t.forward(15);
t.goTo([56, 46]);
t.jump([57, 46.5]);
t.setAngle(100);
t.forward(42);
t.right(102);
t.forward(15);
t.goTo([60, 48.5]);

//head
t.jump(headStart);
t.setAngle(-60);
t.arc(6, 100);
t.left(10);
t.arc(40, 20);
t.left(12);
t.arc(50,10);
t.left(-10);
const mouthStart = t.pos
t.arc(35,13);
t.left(12);
t.arc(36, 50);
const hornStart = t.pos
t.left(40);
t.arc(-50, 10);
const hornEnd = t.pos
const ear1 = t.pos
t.setAngle(165);
t.arc(10, 25);
const ear2 = t.pos
t.left(8);
t.arc(80, 11);
t.goTo(headEnd);

//horn
t.jump(hornStart);
t.setAngle(70);
t.forward(25);
t.goTo(hornEnd);
t.jump([85, 60]);
t.goTo(hornEnd);
t.jump([86.5, 64]);
t.setAngle(180);
t.forward(6);
t.jump([88.5, 69]);
t.setAngle(170);
t.forward(3.3);

//ears 
t.jump(ear1);
t.up();
t.setAngle(90);
t.forward(2);
t.down();
const ear1End = t.pos
t.setAngle(85);
t.arc(-8, 100);
t.left(80);
t.arc(150, 5);
t.goTo(ear1End);

t.jump(ear2);
t.up();
t.setAngle(90);
t.forward(1);
t.setAngle(0);
t.forward(2);
t.down();
const ear2End = t.pos
t.setAngle(110);
t.arc(-10, 100);
t.left(120);
t.arc(100, 9);
t.goTo(ear2End);

//eyes
t.jump([88,38]);
t.setAngle(0);
t.arc(360, 6);
t.jump([75,38.5]);
t.setAngle(0);
t.arc(360, 5);
t.jump([bt.randInRange(72, 77.5), bt.randInRange(39.5, 44.5)]); //72, 40
t.setAngle(0);
t.arc(360, 1.5);
t.setAngle(90);
t.jump([bt.randInRange(85, 91), bt.randInRange(39, 46)]);
t.setAngle(0);
t.arc(360, 1.6);
t.setAngle(90);

//nostrils
t.jump([77, 28.5]);
t.setAngle(0);
t.arc(360, 0.8);
t.setAngle(90);
t.jump([91, 29]);
t.setAngle(0);
t.arc(360, 1);
t.setAngle(90);

//mouth
t.jump(mouthStart);
t.setAngle(115);
t.arc(145 , 11);
t.setAngle(10);
t.arc(-10.7, 100);
t.jump([76, 16.8]);
t.setAngle(90);
t.forward(6.3);
t.jump([81.3, 17.2]);
t.setAngle(90);
t.forward(7.7);
t.jump([86.3, 17.6]);
t.setAngle(90);
t.forward(6.3);

//eyebrows
t.jump([70, 51.5]);
t.setAngle(15);
t.arc(25,13);
t.jump([92, 53]);
t.setAngle(175);
t.arc(-25,13);

function explosion(x, y, numLines, maxLength) {
    t.up();
    t.goTo([x,y]);
    t.down();
    for (let i = 0; i < numLines; i++) {
        const angle = bt.rand() * 360;
        const length = bt.rand() * maxLength;
        t.setAngle(angle);
        t.forward(length);
        t.up();
        t.goTo([x,y]);
        t.down();
    }
}

//pooping rainbows
let multiplier = 1;
t.jump([0,0]);
let stripe = [];
for(let i = 0; i < bt.randIntInRange(2,4); i++) {
  if (bt.rand() < .5) 
    multiplier = 1;
  else
    multiplier = -1;
  stripe.push([multiplier*bt.randInRange(5, 15), bt.randInRange(40,50)]); // degrees, radius
}
for(let i = 1; i < 8; i++) {
  t.jump([stripeSize/1.73205081 * i, stripeSize*i]);
  if (bt.rand() < .5) 
    multiplier = 1;
  else
    multiplier = -1;
  t.setAngle(stripeStartAngle + bt.randInRange(-2, 2)*multiplier);
  for (let j = 0; j<stripe.length; j++) {
    t.arc(stripe[j][0], stripe[j][1]);
  }
  explosion(t.pos[0], t.pos[1], explodeLines, explodeLength);
}


// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.rotate(finalLines, bt.randInRange(0, 360));
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);