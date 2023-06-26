# Interface to Haxidraw

To run

```
yarn
yarn dev
```
---

# Functions Available in Editor:

### Turtle

Our main drawing primative is a turtle. It's a collection of polylines with an associated pen that has a location and direction. 
```
const t = new Turtle();

// move turtle up and down
t.up()
t.down()

// draw paths
t.goto(x: number, y: number)
t.forward(distance: number)
t.arc(angle: number, radius: number)

// change angle
t.setAngle(theta: number)
t.right(theta: number)
t.left(theta: number)

// transform turtle path
// type pt = [ number, number ]
t.translate(from: pt, to: pt)
t.rotate(angle: number, origin: pt)
t.scale(factor: number, origin: pt)

// import svgs
t.fromSVG(svgString: string)

// Turtle special points and dimensions
/*
You can get 9 points of interest from the turtle as get methods.
l is left, r is right, c is center, b is bottom.
The points are as such. 

lt -- ct -- rt
|     |     |
lc -- cc -- rc
|     |     |
lb -- cb -- rb

You can also get the start, end, width, and height
*/

t.lt
t.ct
t.rt
t.lc
t.cc
t.rc
t.lb
t.cb
t.rb
t.start
t.end

t.width
t.height

// to add turtles together
t.join(anotherTurtle)

// to apply a function to all pts in a turtle
// this will replace the old point values with the new ones
t.iteratePath(fn)
```

To render a turtle use `drawTurtles` it is variadic (can take multiple turtles as arguments).
```
drawTurtles(...turtles)
```

You can drag in SVG's, and the interface will generate a turtle for it. Keep in mind that SVG's are often imported far too large, and will need to be scaled and translated.

### Randomness

```
rand()
setRandSeed(seed: number)
randInRange(min: number, max: number)
randIntInRange(min: number, max: number)
```
### Noise

Noise is one of the most powerful tools for making proceduarally generated natural looking things. It can be thought of as smooth randomness.

```
// y and z are optional
noise(
  [ 
    x: number, 
    y: number, 
    z: number 
  ], 
  { 
    octaves = 4, 
    falloff = 0.5 
  }
)
```

Can be used like such

```
noise([ 2, 3 ])
```

### Utilities

```
// min: number, max: number, t: number (0 to 1)
lerp(min, max, t)
```

# Examples

To find examples check [`/examples`](/examples).





