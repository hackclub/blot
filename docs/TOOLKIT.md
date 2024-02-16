# Welcome to Blot

This is Blot's programmatic art IDE. For an introduction to the editor watch this video (coming soon!).

## Turtle
Our main drawing primitive is a turtle. It's a collection of polylines with an associated pen that has a location and direction.

## Creating a Turtle
**`const t = createTurtle();`**
Initializes a new turtle object for drawing.
> By default, the turtle object starts at points [0,0] with an angle of 0 degrees (bottom left corner, facing right) and begins in the drawing state.
#### Rendering the Turtle
-   **`drawTurtles([turtle])`** - Renders the specified list of turtles onto the canvas.
## Drawing 
 - **`t.goTo([ x: number, y: number ])`**  - Moves the turtle to the
   specified coordinates, drawing a line (if the pen is down).
 -  **`t.forward(distance: number)`** - Moves the turtle forward by the
   specified distance, drawing a line (if the pen is down).
-  **`t.arc(angle: number, radius: number)`** - Draws an arc with the given
   angle **in degrees** and radius. The direction of the arc depends on
   the sign of the angle (positive goes counterclockwise, negative goes
   clockwise). 
 - **`t.jump([x, y]):`** - Moves the turtle to specified
   coordinates without drawing (basically goTo but always without
   drawing).

> All functions under `Drawing` end in the drawing state. 

## Orientation and Movement
- **`t.up()`** - Lifts the blot's pen.
- **`t.down()`** - Lowers the blot's pen. 
- **`t.setAngle(theta: number)`** - Sets the turtle's current direction to the specified angle **in degrees**. 
- **`t.right(theta: number)`** - Rotates the turtle's direction to the right (clockwise) by the specified angle **in degrees**.
- **`t.left(theta: number)`** - Rotates the turtle's direction to the left (counterclockwise) by the specified angle **in degrees**.
 
 ## Transformations

-   **`t.translate(from: pt, to: pt)`** - Translates the turtle's path from one point to another.
-   **`t.rotate(angle: number, origin: pt)`** - Rotates the turtle's path around the specified origin point by the given angle **in degrees**.
-   **`t.scale(factor: number, origin: pt)`** - Scales the turtle's path by the specified factor, relative to the given origin.
> type pt = [ number, number ]

## Importing SVGS
**`t.fromSVG(svgString: string)`** - Imports an SVG
> You can drag in SVG's, and the interface will generate a turtle for it. Keep in mind that SVG's are often imported far too large, and will need to be scaled and translated.

## Special Points and Dimensions
These are all variables. You can get 9 points of interest from the turtle as get methods.
- **`t.start`** - Access the start points of the turtle's path.
- **`t.end`** - Access the end points of the turtle's path.
- **`t.width`** - Retrieve the width of the turtle's drawing area.
- **`t.height`** -  Retrieve the height of the turtle's drawing area.
> l is left, r is right, c is center, b is bottom.
```js 
lt -- ct -- rt
|     |     |
lc -- cc -- rc
|     |     |
lb -- cb -- rb
```

## Paths
### Joining Paths
- **`t.join(anotherTurtle)`** - Merges the paths of other Turtle instances into the current Turtle's path.
### Modifying Paths
- **`t.iteratePath(fn)`** - Apply a function to all pts in a turtle
- **`t.resample(resolution)`** 
- **`t.interpolate(tValue)`** - takes value 0 - 1 and returns point that far along paths
- **`t.getAngle(tValue)`** 0 takes value 0 - 1 and returns angle that far along paths

> fn takes (pt, tValue) => { ... }
> - return [ x, y ] to replace the old point value with the new one
> - return "BREAK" to split path at that point
> - return "REMOVE" to filter out that point

<!-- 
displace
warp
bezierEasing
trim 
merge
getNormal
extrema
copy
orginate
interpolate
-->

## Randomness

- **`rand()`** - Generates a number between 0 (inclusive) and 1 (exclusive).
- **`setRandSeed(seed: number)`** - initializes the random number generator's seed, allowing for reproducible sequences of random numbers.
- **`randInRange(min: number, max: number)`** - Generates a float-point number between `max` (inclusive) and `min` (exclusive).
- **`randIntInRange(min: number, max: number)`** - Generates a integer between `max` (inclusive) and `min` (exclusive).

## Noise
Noise is one of the most powerful tools for making proceduarally generated natural looking things. It can be thought of as smooth randomness.
`noise([x,y,z], {octaves, falloff})`
- `octaves` and `falloff` control the complexity and smoothness 
- `x`, `y`, `z` are the dimensions of noise
#### eg:
```js
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
```js
noise([2, 3])
```

## Examples

To find examples check out [`/gallery`](/gallery).
