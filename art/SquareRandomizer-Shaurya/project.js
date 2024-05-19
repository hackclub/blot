/*
@title: Square randomizer v0.4
@author: Shaurya Mohapatra (@shaurio / Github)
@snapshot: square_randomizer_main_v2.png
*/

/*
Changes in v0.4:
- Added more squares
- Moved code into a repeatable function drawSquares()
- Wrapped function inside a for loop to generate add more projections of polygons that work the same way
and crate a cool effect
*/

let cpx = bt.randInRange(5, 5);
// this changes the complexity, change the values-
// -and see what happens :D


function drawSquares() {

  const s = 100 
  //boundry square size
  const m = bt.randInRange(25, 50); 
  // inner square size 
  const c = bt.randInRange(25, 50);
  // inner square size add depth
  const a = bt.randInRange(25, 50); 
  // inner square size add volume
  let x = (m) - (c) // to separate squares
  const xr = bt.randInRange(25, 50); 
  // filler variable for randomness of pos
  let xx = (x) + (xr) 
  // filler variable to understand what I'm doing
  let rx = xr - (xr + xr) 
  // filler variable to split into steps for understanding
  let yx = rx + 20 
  // filler variable to move some squares to the right (effect)
  const cc = bt.randInRange(15, 30) 
  // filler variable for the x change in squares

  // This is to draw the boundry square 100 by 100
  drawLines([
    [
      [0, 0],
      [0, s]
    ],
    [
      [0, s],
      [s, s]
    ],
    [
      [s, s],
      [s, 0]
    ],
    [
      [s, 0],
      [0, 0]
    ]
  ])

  // draw sqaure
  drawLines([
    [
      [a, c],
      [a, m]
    ],
    [
      [a, m],
      [m, m]
    ],
    [
      [m, m],
      [m, c]
    ],
    [
      [m, c],
      [a, c]
    ]
  ])
  
  // draw sqaure + height difference
  drawLines([
    [
      [a, c + xr],
      [a, m + xr]
    ],
    [
      [a, m + xr],
      [m, m + xr]
    ],
    [
      [m, m + xr],
      [m, c + xr]
    ],
    [
      [m, c + xr],
      [a, c + xr]
    ]
  ])

  // draw sqaure + height difference + x difference
  drawLines([
    [
      [a + cc, c + yx],
      [a + cc, m + yx]
    ],
    [
      [a + cc, m + yx],
      [m + cc, m + yx]
    ],
    [
      [m + cc, m + yx],
      [m + cc, c + yx]
    ],
    [
      [m + cc, c + yx],
      [a + cc, c + yx]
    ]
  ])

  // draw lines from square
  drawLines([
    [
      [a, c],
      [100, 100]
    ],
    [
      [a, m],
      [100, 100]
    ],
    [
      [m, m],
      [100, 100]
    ],
    [
      [m, c],
      [100, 100]
    ],

  ])

  // draw lines from square + height difference
  drawLines([
    [
      [a, c + xr],
      [100, 100]
    ],
    [
      [a, m + xr],
      [100, 100]
    ],
    [
      [m, m + xr],
      [100, 100]
    ],
    [
      [m, c + xr],
      [100, 100]
    ],

  ])

  // draw lines from square + height difference + x difference
  drawLines([
    [
      [a + cc, c + yx],
      [100, 100]
    ],
    [
      [a + cc, m + yx],
      [100, 100]
    ],
    [
      [m + cc, m + yx],
      [100, 100]
    ],
    [
      [m + cc, c + yx],
      [100, 100]
    ],

  ])

}

// change "cpx" to any number you would like, to alter the complexity
for (let i = 0; i <= (cpx); i += 1)[
  drawSquares()
]
