/*
@title: HypnoSquares
@author: Shayan Malik
@snapshot: Snapshot1
*/
const width = 120;
const height = 120;

setDocDimensions(width, height);

const squar1e = createTurtle();
squar1e.right(270)
squar1e.forward(110);
squar1e.right(90);
squar1e.forward(110);
squar1e.right(90);
squar1e.forward(110);
squar1e.right(90);
squar1e.forward(110);
squar1e.right(90);

drawTurtles([squar1e])

const square = createTurtle();
square.right(270)
square.forward(100);
square.right(90);
square.forward(100);
square.right(90);
square.forward(100);
square.right(90);
square.forward(100);
square.right(90);


drawTurtles([square]);

const squar = createTurtle();

squar.right(270)
squar.forward(90)
squar.right(90)
squar.forward(90)
squar.right(90)
squar.forward(90)
squar.right(90)
squar.forward(90)

drawTurtles([squar])

const squa = createTurtle();

squa.right(270)
squa.forward(80)
squa.right(90)
squa.forward(80)
squa.right(90)
squa.forward(80)
squa.right(90)
squa.forward(80)

drawTurtles([squa])

//phase 2
const t = createTurtle();

t.jump([120 , 120])
t.down();
t.goTo([50 , 50]);
t.right(90);
t.up();
t.jump([10 , 10]);
t.right(180);
t.forward(60);
t.right(90);
t.forward(60);
t.right(90);
t.forward(60);
t.right(90);
t.forward(60);
t.right(90);
t.forward(60);
t.jump([0 , 80]);
t.goTo([20,60]);
t.right(180);
t.forward(40);
t.right(180);
t.forward(40);
t.right(90);
t.forward(40);
t.right(90);
t.forward(40);
t.right(90);
t.forward(40);
t.right(90);
t.jump([30, 30]);
t.forward(20);
t.right(90);
t.forward(20);
t.right(90);
t.forward(20);
t.right(90);
t.forward(20);
t.right(90);
drawTurtles([t]);

const b = randInRange(20 , 100);
const c = randInRange(20 , 100);
const a = createTurtle();

a.up();

a.jump([0 , 0]);
a.goTo([30 , 30]);
a.jump([80 , 0]);
a.goTo([50 , 30])
a.jump([20 , 60]);
a.goTo([30 , 50]);
a.jump([b , c])
a.arc(180, 10)
a.forward(10)
a.arc(180, 10)
a.forward(10)
drawTurtles([a])