// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

//Changable constants
const includeBoxes = true; 
const num =1; 
const size = 10000;
const spirals = 20;



const finalLines = [];
const t = new bt.Turtle();
var lastI = 1;
var lastLastI = 0;
var fib;

//t.forward(0.1);
//t.right((200-i));
//t.forward(i);
//t.left(200+i)
//lastLastI = lastI
//lastI = i
const scalar = 57.2965;
t.right(90)
for (let k = 0; k < num; k++){
  lastI = 1; 
  lastLastI = 1;
for (let i = 1; i < spirals; i++) {
  fib = lastLastI + lastI;
  if(includeBoxes){
  t.forward((fib / size) * scalar);
  t.right(90)
  t.forward((fib / size) * scalar);
  t.right(90)
  t.forward((fib / size) * scalar);
  t.right(90)
  t.forward((fib / size) * scalar);
    t.right(90)


  t.left(0.5)

    
  }
    t.right(90)

 

  for (let j = 0; j < 90; j++) {
    t.forward(fib / size);
    t.left(1)

  }
  t.right(0.5)

  t.left(90)
  lastLastI = lastI
  lastI = fib
}
  t.right(0);
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);