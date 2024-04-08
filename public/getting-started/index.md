---
title: Getting started with Blot
---

Blot is a way to make art with code. The instructions you write in this editor can generate art on screen, but they can also control the Blot drawing machine!

This guide will introduce you to some of the main tools in the toolkit, and help you make your first artwork. As you work through it, you will see **text in bold, with suggested challenges**, but you should also feel free to just tinker with your own ideas. Along the way, we'll also use the example of drawing a feather, just to demonstrate what can be achieved with each set of tools.

If you are a complete beginner to JavaScript we reccomend watching [this short introduction to programming](https://youtu.be/3KAan1PzmxA).

<img src="/getting-started/steps.png" style="margin:auto" />

### Drawing lines

To use Blot, you will write code to define lines, then call the `drawLines` function. When you click "run", these lines will be drawn either on screen or in the real world, using a connected Blot machine.

You can use plain JavaScript, or any of the "toolkit" functions provided. Your job is just to turn your ideas into lines: Blot will do the rest!

The simplest way to draw a line is by specifying its coordinates. Here is one way to draw a line from the bottom left to the top right:

```js
const width = 125;
const height = 125;

setDocDimensions(width, height);

drawLines([
    [[0, 0], [width, height]]
])
```

Type in the code from above, run it, and make sure that you see something like this:

<img src="/getting-started/diagonal.png" width="40%" style="margin:auto;border:1px solid blue" />

**Next, try changing it. Can you draw a line from top left to bottom right, instead? Could you draw a square?**

By the way, we are setting the document dimensions to 125x125 because that is a sensible limit, in millimeters, when using a physical Blot machine. 0,0 is located in the bottom left. See [setDocDimensions](/docs#setDocDimensions) for more info.

You can generate lines in a number of different ways, including plain JavaScript. One way to draw a square with sides of length `s` could be:

```js
const s = 50

drawLines([
    [[0, 0], [0, s]],
    [[0, s], [s, s]],
    [[s, s], [s, 0]],
    [[s, 0], [0, 0]]
])
```

Here we are calling `drawLines` with a JavaScript array of four lines, which are themselves just pairs of points. You may notice that it's pretty repetitive: we're specifying each point as both the start of one line and end of the other. Luckily we can call `drawLines` with a "polyline", which is just a line several connected points. You can think of these as locations that the Blot drawing machine will move, one after the other, with the pen down. As a polyline, we could draw our square like this:

```js
const s = 50;

drawLines([
    [[0, 0], [0, s], [s, s], [s, 0], [0, 0]]
])
```

**Notice that our polyline has 5 points. What do you think would have been drawn if we had forgotten to include the final one?**

It turns out that a lot of our drawings will have connected lines, so we'll be using polylines a lot. As we get more creative, we'll also want better ways of generating our generating these polylines!

### Turtle drawing

Let's say you wanted to draw a more interesting shape, like a triangle or a pentagon or a hamster. Finding the coordinates of the triangle might not be too hard, but the others are starting to feel tricky!

Sometimes, it's easier to draw shapes like this by imagining that our pen is like a little turtle on the page, that can turn a certain amount left and right, walk forward, and jump around. If it's easier to think about how your pen moves than _where your pen moves to_, you may want to use a turtle.

Here is how you might draw a triangle, for instance, remembering that a turtle would need to rotate itself 120 degrees each time to point in the right direction.


```js
const t = new bt.Turtle()
const size = 100

t.forward(size)
t.left(120)
t.forward(size)
t.left(120)
t.forward(size)

drawLines(t.lines())
```

**Copy this code into the editor and confirm that it draws a triangle. Can you draw a pentagon instead?**

<details>
<summary>See answer</summary>
One way to draw a pentagon might be to write code much like the above, but turn 72 degrees instead of 120, and go forward 5 times instead of 3. You could also start to see that squares, triangles and pentagons all have similar instructions, and decide to make that into a JavaScript function that can draw any regular polygon:

```js
const shape = (n, size) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(size).right(360/n)
  return t.lines()
}

drawLines(shape(3, 120))  // triangle with 120mm sides
drawLines(shape(5, 80))  // pentagon with 80mm sides
```
</details>


If you were to `console.log(t.lines())` here and look in the developer console, you would see that the turtle figured out what polylines it effectively traced by following these instructions. Sometimes, this can be a lot easier than doing the math for yourself, although there's nothing to stop you! Here's another way to draw the same triangle as above:

```js
const size = 100
const angle = 120/180 * Math.PI

drawLines([
    [[0, 0], [0, size], [size * Math.sin(angle), size + size * Math.cos(angle)]]
])
```

Let's say that our first idea for drawing a feather is to draw a kind of stretched out hexagon for the vanes, and a rectangle for the shaft. The coordinates of the rectangle could be easy enough to define directly, but the hexagon might be tricky!

To practice using turtle commands, **see if you can draw your own shapes with turtles**. For the full list of turtle commands, see [the docs](/docs#Turtle). If you need a suggestion, maybe you could draw a blocky feather using a rectangle for the shaft and a kind of stretched out hexagon for the vanes, like this:

<img src="/getting-started/feather-1.png" width="40%" style="margin:auto;border:1px solid blue" />

<details>
<summary>Show</summary>

Here's one of many approaches you could take:

```js
const shth = 3  // shaft thickness
const shl = 120  // shaft length
const cl = 30  // calamus length (part without vanes)
const vw = 20  // vane width, per vane
const t = new bt.Turtle()

// start pointing diagonally, and further within drawing area
t.left(45).jump([20, 20])

// draw the shaft
t.forward(shl).left(90).forward(shth).left(90)
t.forward(shl).left(90).forward(shth).left(90)

// move to start of vanes
t.up().forward(cl).left(90).forward(shth/2).right(90).down()

// draw vanes
const short = vw * Math.sqrt(2)
const long = shl - cl - 2 * vw

t.left(45)
t.forward(short).right(45).forward(long).right(45).forward(short)
.right(90)
t.forward(short).right(45).forward(long).right(45).forward(short)

drawLines(t.lines())
```

We have a lot of room for improvement, if we want this to be a realistic looking feather, but it's a good start!
</details>


### Transforming lines

Turtles may be good at drawing geometric shapes, but more interesting art pieces will often require curves, as well as more sophisticated ways to modify our lines after we've defined the basic form. 

The toolkit comes with a number of functions that operate over polylines, so for instance we can [`translate`](/docs/#translate) our lines to move them, [`rotate`](/docs/#rotate) to turn them all at once, [`scale`](/docs/#translate) to stretch them, and so on.

Here is an example that draws a 1x1 square, stretches it to a 50x80 rectangle, then centers it:

```js
const width = 125
const height = 125

setDocDimensions(width, height)

const sq = new bt.Turtle()
for (let i = 0; i < 4; i++) sq.forward(1).right(90)

const rect = bt.scale(sq.lines(), [50, 80])
bt.translate(rect, [width/2, height/2], bt.bounds(rect).cc)

drawLines(rect)
```

Notice that we used the [`bounds` function](/docs#bounds) here for the first time above, to find the bounds of center point of the rectangle and move that to the center of our document.

**See if you can also rotate the shape by 30 degrees**

While you're welcome to code in whatever style you prefer, you may find that using transform functions makes your code to be more flexible, allowing you to play more with the parameters and overall design.

As an example, consider the following reformulation of the feather code from above. By defining a `shape` function and just scaling shapes as needed, it's easier for us to do things like change the number of sides of the shapes, or their sizes:

```js
const width = 125
const height = 125

setDocDimensions(width, height)

// Generate any polygon
const shape = (n) => {
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).right(360/n)
  return t.lines()
}

// Draw shaft as a stretched triangle
const shaft = bt.scale(shape(3), [2, 150])

// Draw vanes as a hendecagon (!?)
const vanes = bt.scale(shape(11), [8, 30])

// move the vanes to the end of the shaft
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])

// combine the two shapes, then move and rotate them together!
// (this "destructuring" syntax in JavaScript combines the two arrays)
const feather = [...shaft, ...vanes]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.rotate(feather, 135)
drawLines(feather)
```

The above code draws the following feather:

<img src="/getting-started/feather-2.png" width="40%" style="margin:auto;border:1px solid blue" />

This is another improvement, but still looking pretty rigid! **See if you can make some further transformations to help the feather look more natural**. One idea might be to use the [`iteratePoints`](/docs#iteratePoints) function to displace each point by a variable amount, to give the feather a bit of a bend.

<details>
<summary>Show</summary>

This approach uses `iteratePoints` to consider each [x, y] co-ordinate one by one, and change the x value by an amount that corresponds to its position. We can also [`resample`](/docs#resample) the points on our line (increase the number of points along the line) to emphasize this effect:

```js
// -- define and translate the feather, but don't rotate it yet

// resample, to increase number of points that we'll nudge
bt.resample(feather, 4)

// nudge the x value of each point, based on where it is in the doc, to make
// the whole thing curvy
bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])

// -- now, rotate and draw it 
```

Adding the above code in the right place gives us the following:

<img src="/getting-started/feather-3.png" width="40%" style="margin:auto;border:1px solid blue" />
</details>



### Drawing curves

While it was fun to use the word "hendecagon" above, it will often be preferable to draw curves directly, rather than composing increasingly complex turtle shapes. While Blot can only draw straight lines, if you draw enough small ones of them they'll start to pass for curves!

Thankfully there are toolkit functions to help us with this. Here's an example of using the [`catmullRom`](/docs#catmullRom) function, which tries to draw a nice curve passing through all the points you provide. Here we specify just 4 points, but end up drawing enough tiny line segments to see a curve:

```js
const width = 125
const height = 125

setDocDimensions(width, height)

const curve = bt.catmullRom([[0, 0], [30, 20], [50, 100], [125, 125]])

drawLines([curve])
```

Note that `bt.catmullRom` returns a single polyline, so we need to wrap it in a JavaScript array to pass it to `drawLines`. The above code generates this curve:

<img src="/getting-started/curve.png" width="40%" style="margin:auto;border:1px solid blue" />

**Draw some more curves yourself, like a wave, or a wobbly circle thing. As a stretch goal, try re-writing the latest feather code using catmullRom or another [curve function](/docs#curves).**

<details>
<summary>Show</summary>
Here is a version of our feather drawing that uses Catmull-Rom spline to define a curve, instead of a many-sided polygon. We also take the opportunity to just define the shaft directly (since the turtle drawing was mainly to draw the vanes anyway) and to only resample the shaft, since the catmullRom uses numerous sample points already.

```js
const width = 125
const height = 125

setDocDimensions(width, height)

// Shaft is a stretched triangle
const shaft = bt.resample([[[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]], 4)

// Vanes are a Catmull-Rom curve
const vanes = [bt.catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// move the vanes nearer to the end of the shaft
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1] - 8])

// combine the two shapes, then move and rotate them together!
const feather = [...shaft, ...vanes]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
bt.rotate(feather, 135)
drawLines(feather)
```

This short program gives us an impressively natural looking feather shape:

<img src="/getting-started/feather-4.png" width="40%" style="margin:auto;border:1px solid blue" />
</details>

Once you start drawing curves, you'll want to keep going! As a stretch goal, **see if you can add barbs to the feather, or otherwise make it more realistic**.

<details>
<summary>Show</summary>

By iterating over the points in our shaft, we can draw individual barbs as their own Catmull-Rom splines. We can then use the vane definition not to draw a vane, but to mask out the barbs using [cut](/docs#cut).

```js
const width = 125
const height = 125

setDocDimensions(width, height)

// Shaft is a stretched triangle
const shaft = bt.resample([[[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]], 1)

// Vanes are a Catmull-Rom curve
const vanes = [bt.catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// Barbs are Catmull-Rom curves originating at the shaft
const barbs = []
for (let i = 0; i < shaft[0].length; i++) {
  const parity = i > shaft[0].length/2 ? -1 : 1
  const [x, y] = shaft[0][i]
  barbs.push(bt.catmullRom(
    [[x, y], [x + parity * 10, y - 2], [x + parity * 30, y]]))
}

// move the vanes nearer to the end of the shaft
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])

// Use the vane shape to trim the barbs!
bt.cut(barbs, vanes)

// combine the two shapes, then move and rotate them together!
const feather = [...shaft, ...barbs]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
bt.rotate(feather, 135)
drawLines(feather)
```

Progress!

<img src="/getting-started/feather-5.png" width="40%" style="margin:auto;border:1px solid blue" />

</details>


### Randomness

If our art piece feels a little boring at this point, it may be because we haven't done anything random! Using randomness in our programs can add interest to an individual piece by modeling a more natural process, but it can also turn our static piece into something more generative, that can draw a different variant of the work each time we hit "refresh".

**Using toolkit functions like [randInRange](/docs#randInRange), modify the piece to generate a new, interesting feather each time!**

Once you're comfortable with the [randomness](/docs#randomness) functions, you'll want to use them extensively, since the results can be much more interesting!

<img src="/getting-started/feather-montage.png" style="margin:auto" />

<details>
<summary>Show code</summary>

Below is one approach that chooses some parameters within random ranges, and also randomly "clumps" together some of the barbs:

```js
const width = 125
const height = 125

setDocDimensions(width, height)

const rr = bt.randInRange

const shaftLength = rr(0.5, 0.8) * Math.sqrt(width * width + height * height)
const vaneLength = rr(0.7, 0.8) * shaftLength
const vaneWidth = rr(0.2, 0.3) * vaneLength
const barbCurviness = rr(1, 4)
const numClumps = rr(1, 6)

const shaft = bt.resample([[[0, 0], [0.8, 0], [0, -shaftLength], [-0.8, 0], [0, 0]]], 1)

const vanes = bt.scale([bt.catmullRom([
  [0, 0],
  [rr(-1, -0.5), rr(0.15, 0.3)],
  [rr(-1, -0.5), rr(0.7, 0.9)],
  [0, 1],
  [rr(0.5, 1), rr(0.7, 0.9)],
  [rr(0.5, 1), rr(0.15, 0.3)],
  [0, 0]
])], [vaneWidth, vaneLength])

// Barbs are Catmull-Rom curves originating at the shaft
const barbs = []
const len = shaft[0].length
for (let i = 0; i < len; i++) {
  const parity = i > len / 2 ? -1 : 1
  const [x, y] = shaft[0][i]
  barbs.push(bt.catmullRom([
    [x, y],
    [x + parity * vaneWidth * 0.3, y - barbCurviness],
    [x + parity * vaneWidth, y]
  ], 5))
}

// move the vanes to the end of the shaft
bt.translate(vanes, [0, bt.bounds(shaft).cb[1] - bt.bounds(vanes).cb[1]])

// Use the vane shape to trim the barbs!
bt.cut(barbs, vanes)

// Clump some of the trimmed barbs together, like nature intended
for (let i = 0; i < numClumps; i++) {
  const numBarbs = Math.floor(rr(3, 20))
  const start = Math.floor(rr(0, barbs.length - numBarbs))
  const target = barbs[Math.floor(start + rr(0, numBarbs))]
  for (let j = 0; j <= numBarbs; j++) {
    const barb = barbs[start + j]
    const t = j / numBarbs
    const [tx, ty] = target[Math.floor((target.length - 1) * 0.9)]
    const [bx, by] = barb[Math.floor((barb.length - 1) * 0.9)]
    const mid = [tx * (1 - t) + bx * t, ty * (1 - t) + by * t] 
    barbs[start + j] = bt.catmullRom([
      barb[0],
      mid,
      target[target.length-1]
    ], 10)
  }
}

// combine the shaft with the barbs
const feather = [...shaft, ...barbs]
bt.translate(feather, [width / 2, height / 2], bt.bounds(feather).cc)
bt.iteratePoints(feather, ([x, y]) => [x - 0.001*(width/2-y)*(width/2-y), y])
bt.rotate(feather, bt.randInRange(120, 150))
drawLines(feather)
```

</details>



### Next steps

This tutorial was just a brief introduction to how Blot works, and to some of the toolkit functions. From here, you may want to just try to implement your own ideas using [the docs](/docs) as needed. Or, take a look at one of the many [user-contributed guides](/guides). Once you're happy with a piece, be sure to share it! Have fun!

