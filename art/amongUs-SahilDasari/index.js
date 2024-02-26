/*
@title: among us
@author: Sahil Dasari
@snapshot: Original.png
*/

// welcome to blot!

const width = 167;
const height = 232;

setDocDimensions(width, height);

const t = createTurtle();
t.jump([71, 53])
t.right(90)
t.arc(-180, 17)
//his height
t.forward(123)
//the second var is the size of his head
t.arc(-180, 53)

t.left(90)
t.arc(-180, 22)
//size of glasses
t.forward(59)

t.right(65)
t.arc(-49, 51)
t.goTo([143, 176])
t.jump([145, 53])
t.right(156)
t.arc(-181, 17)
t.forward(23)
t.jump([125, 77])
t.left(98)
t.arc(-21, 148)
t.jump([71, 53])
t.right(77)
t.forward(27)
t.jump([145, 53])
t.arc(10, 454)
//bag
t.jump([37, 177.8])
t.left(81)
t.forward(1)
t.arc(92, 30)
t.right(2)
t.forward(33)
t.arc(92, 30)





drawTurtles([
  t
]);