const t0 = new Turtle()
t0.fromSVG(`...`)
t0.forward(90)
t0.goTo(0, 1)
t0.right()
t0.left()
t0.up()
t0.down()
t0.translate(0, 0, [0, 0]) // should this be [x, y]
t0.rotate(32, [0, 0])
t0.scale([1, 2], [0, 0]) // can also be scale rather than [xScale, yScale]

// drawing and drawing turtles (virtual and physical)
renderTurtles(t0) // or drawTurtles(t0);
runMachineTurtles(t0)

// do I want to draw the current instance (by value) or reference the Turtle
// referencing allows us to drag and position the turtle later
// will direct manipulations be tracked in the source
// could use a drawing queue

clear()

setOrigin()
await machine.goTo(0, 0)
await machine.penUp()
await machine.penDown()

/*

x - machine disconnect
better styles
  - command line
  - top buttons
  x - highlight numbers (needed to format html correctly)
  x - get codemirror horizontal scrollbar to always appear
drag and transform turtles
command line
  - store previous command
  - use arrows to move amoung them
  - pretty print objects
window resizing
examples

show machine position in viewer

x - save/download script
x - js highlighting
x - tab and shift+tab out
x - svg drop upload
x - js drop upload
x - run program on shift enter (or when hitting command line?)
x - command line has access to global scope
x - default program loading
x - number dragging
    - get highlighting to work properly

ai assistant
- give inspiration
- generate examples
  - with images
- help find bugs
- practices didactic/feynman method

- what questions should I ask?
*/
