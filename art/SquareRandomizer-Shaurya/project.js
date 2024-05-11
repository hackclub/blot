/*
@title: Square randomizer v0.2 fix
@author: Shaurya Mohapatra (@shaurio / Github)
@snapshot: square_randomizer_main.png
*/

/*

Enhancement Ideas:
------------------
1. Fill in the rectangle (all sides different shades of grey)
2. Randomize the perspective i.e., angle in which the inner share is shown
3. Experiment with cresating other shapes, i.e. shapes with less or more than 4 sides.
4. Pseudo-3d: Cutt off the lines, and add lines at the end of the cut off, making
it look 3d with definitive sides. So instead of extenting the lines till
the outer square, we could stop it short of it, then add lines going from
each of the endings to make it look like a real 3d shape.

*/


/* variables */

const s = 100; // size of the outer square container
const m = bt.randInRange(0, 100);  // controls x and y position of two inner square points
const c = bt.randInRange(0, 100); // controls y position of two inner square points
const a = bt.randInRange(0, 100); // controls x for half of the points
const angle = bt.randInRange(1, 4); // an idea for future, the point/"angle" in which the lines go to the shape
let vr = m // another idea for "filling" in the square

// draws outer square
drawLines([ 
    [[0, 0], [0, s]],
    [[0, s], [s, s]],
    [[s, s], [s, 0]],
    [[s, 0], [0, 0]]
])

// draws inner square
drawLines([ 
    [[a, c], [a, m]],
    [[a, m], [m, m]],
    [[m, m], [m, c]],
    [[m, c], [a, c]]
])

// draws lines that go from inner square to one central point in the outer square
drawLines([ 
  [[a, c], [100, 100]],
  [[a, m], [100, 100]],
  [[m, m], [100, 100]],
  [[m, c], [100, 100]],

  ])

// We can use a variable, put is as M (how long the lines are) and call the lines to repeat untill the variable = 0, meaning we fill the square.

