/*
@title: ThoughtTree
@author: Irtaza
@snapshot: the name of the snapshot file you want in the gallery
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

/* Create the cone using a triangle
const cone = bt.resample([[[0, 0], [-30, -80], [30, -80], [0, 0]]], 1);

// Create the ice cream scoop using a semi-circle
const iceCream = bt.catmullRom([[30, -80], [20, -90], [10, -100], [0, -110], [-10, -100], [-20, -90], [-30, -80]]);

// Combine cone and ice cream
const iceCreamCone = [ ...cone, iceCream];

// Center the ice cream cone in the document
bt.translate(iceCreamCone, [width / 2, height / 2], bt.bounds(iceCreamCone).cc);

// Draw the ice cream cone
drawLines(iceCreamCone);
*/

/*const t = new bt.Turtle()

const size = 100

t.forward(size)
t.left(120)
t.forward(size)
t.left(120)
t.forward(size)

drawLines(t.lines())
*/



// Generate any polygon
const shape = (n) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).right(360/n)
  return t.lines()
}

// Draw shaft as a stretched triangle
const shaft = bt.scale(shape(100), [3, 3])

// Draw vanes as a hendecagon (!?)
const vanes1 = bt.scale(shape(50), [2.5, 1.5])
const vanes2 = bt.scale(shape(50), [2.5, 1.5])

const smile = bt.scale(shape(50), [2, 1])

// move the vanes to the end of the shaft
bt.translate(vanes1, [-26.6, bt.bounds(shaft).cb[0] - bt.bounds(vanes1).cb[0]])
bt.translate(vanes2, [27.5, bt.bounds(shaft).cb[0] - bt.bounds(vanes2).cb[0]])

bt.translate(smile, [0, -40])

// combine the two shapes, then move and rotate them together!
// (this "destructuring" syntax in JavaScript combines the two arrays)
const feather = [...shaft, ...vanes1, ...vanes2, ...smile]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)

drawLines(feather)
