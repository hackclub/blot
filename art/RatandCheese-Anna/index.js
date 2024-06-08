/*
@title: RatandCheese
@author: Anna K
@snapshot: RatSS1.png
*/

/* My drawing is a rat that, with every run, changes the length of its tail,
the angle that the head is looking up, and the overall size of the rat. Additionally,
there is a piece of cheese that, with every run, changes how far away it isfrom the rat and how large it is. */

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

const size = bt.rand() * 5 + 3;
const size2 = bt.rand() * 5 +4 ;
const size3 = bt.rand() * 5 +4 ;
const startPos = t.pos ;

t.left(30)
t.forward(size)
t.left(40)
t.forward(size/2)
t.right(70)
t.forward(size/3)
t.right(50)
t.forward(size/3)
t.right(50)
t.forward(size/3)
// nose to end of ear
t.left(170)
t.forward(size/3)
t.right(30)
t.forward(size)
t.arc(-110, size*2.5)
// shoulder to end of back
t.left(66)
t.forward(size2*4)
t.right(176)
t.forward(size2*4+1)
// tail
t.left(90)
t.forward(size/4)
t.right(80)
t.forward(size/1.5)
t.right(10)
t.forward(size/2)
t.right(118)
t.forward(size/6)
t.right(50)
t.forward(size/3)
// back foot
t.left(168)
t.forward(size*3)
// stomach
t.left(90)
t.forward(size/6)
t.right(80)
t.forward(size/1.5)
t.right(10)
t.forward(size/3)
t.right(118)
t.forward(size/6)
t.right(50)
t.forward(size/2)
// front foot
t.goTo(startPos)
// neck area
t.up()
t.right(5)
t.forward(size)
t.down()
t.arc(360, size/12)

t.jump([125-(size3*10), 125-(size3*10)])
/*for (let i = 0; i < 3; i++)
{t.forward(size*2)
t.left(120)}*/
const cheesePos = t.pos ;
t.forward(size3*2)
t.right(70)
t.forward(size3)
const cheesePos2 = t.pos ;
t.goTo(cheesePos)
t.right(45)
t.forward(size3)
t.left(93)
t.forward(size3*2.5)
t.goTo(cheesePos2)
//cheese



// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);