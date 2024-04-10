/*
@title: Housy
@author: Rahul R.
@snapshot: Housy the Great
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

for (let i = 0; i < 4; i++) {
  t.forward(50);
  t.right(90);
  }


t.up();
t.goTo([20, -50]);
t.down();
t.forward(10);
t.left(90);
t.forward(20);
t.left(90);
t.forward(10);
t.left(90);
t.forward(20);
t.up();


t.goTo([6, -9]);
t.down();
for (let i = 0; i < 4; i++){
  t.forward(15);
  t.left(90);
}
t.up();

t.goTo([30, -9]);
t.down();
for (let i = 0; i < 4; i++){
  t.forward(15);
  t.left(90);
}
t.up();

t.goTo([0, 0]);
t.down();
t.left(134);
t.forward(35.5);
t.right(90);
t.forward(35.5);


for (let i = 0; i < 32; i++) { 
  t.down();
  t.setAngle(77 + Math.random() * 30); 
  t.forward(1 + Math.random() * 10); 
  t.up();
  t.goTo([-20 + Math.random() * 20, -50]); 
}

for (let i = 0; i < 32; i++) { 
  t.down();
  t.setAngle(81 + Math.random() * 28); 
  t.forward(1 + Math.random() * 10); 
  t.up();
  t.goTo([-38 + Math.random() * 20, -50]); 
}


for (let i = 0; i < 32; i++) { 
  t.down();
  t.setAngle(81 + Math.random() * 28); 
  t.forward(1 + Math.random() * 10); 
  t.up();
  t.goTo([51 + Math.random() * 20, -50]); 
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);