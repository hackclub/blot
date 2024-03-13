---
title: Getting started with Blot
---

Blot is a way to make art with code. The instructions you write in this editor can generate art on screen, but they can also control the Blot drawing machine! This guide will introduce you to some of the main tools in the toolkit, and help you make your first artwork. We'll ultimately aim to draw a feather, but feel free to go off script and play around. **Text in bold suggests challenges for you, along the way**.

### Drawing lines

You will write code that defines lines, then call the `drawLines` function. When you click "run", these lines will be drawn either on screen or in the real world, using a connected Blot machine.

You can use plain JavaScript, or any of the "toolkit" functions provided. Your job is just to turn your ideas into lines: Blot will do the rest!

The simplest way to draw a line is by specifying its coordinates directly. Here is one way to draw a line from the bottom left to the top right:

```js
const width = 125;
const height = 125;

setDocDimensions(width, height);

drawLines([
    [[0, 0], [width, height]]
])
```

Type in the code from above, run it, and make sure that you see something like this:

![](/getting-started/diagonal.png)

**Next, try changing it. Can you draw a line from top left to bottom right, instead? Could you draw a square?**

By the way, we are setting the document dimensions to 125x125 because that is a sensible limit, in millimeters, when using a physical Blot machine. See [setDocDimensions](/docs#setDocDimensions) for more info.

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

Let's say that our first idea for drawing a feather is to draw a kind of stretched out hexagon for the vanes, and a rectangle for the shaft. The coordinates of the rectangle could be easy enough to define directly, but the hexagon might be tricky!

Sometimes, it's easier to draw shapes like this by imagining that our pen is like a little turtle on the page, that can turn a certain amount left and right, walk forward, and jump around. If it's easier to think about how your pen moves than _where your pen moves to_, you may want to use a turtle!

Here is how you might draw a triangle, for instance, remembering that a turtle would need to rotate itself 120 degrees each time to point in the right direction.

```js
const t = new Turtle()
const size = 100

t.forward(size)
t.left(120)
t.forward(size)
t.left(120)
t.forward(size)

drawLines(t.lines())
```

If you were to `console.log(t.lines)` here and look in the developer console, you would see that the turtle figured out what polylines it effectively traced by following these instructions. Sometimes, this can be a lot easier than doing the math for yourself, although there's nothing to stop you! Here's another way to draw the same triangle:

```js
const size = 100
const angle = 120/180 * Math.PI

drawLines([
    [[0, 0], [0, size], [size * Math.sin(angle), size + size * Math.cos(angle)]]
])
```

**Now, see if you can draw your own turtle shapes!** If you're feeling up for the challenge, draw a feather-looking thing with a stretched hexagon for the panes and rectangle for the shaft. For the full list of turtle commands, see [the docs](/docs#Turtle).

Here's one of many approaches you could take:

```js
const shth = 3  // shaft thickness
const shl = 120  // shaft length
const cl = 30  // calamus length (part without vanes)
const vw = 20  // vane width, per vane
const t = new toolkit.Turtle()

// start pointing diagonally, and further within drawing area
t.left(45).jump([20, 20])

// draw the shaft
t.forward(shl).left(90).forward(shth).left(90).forward(shl).left(90).forward(shth).left(90)

// move to start of vanes
t.up().forward(cl).left(90).forward(shth/2).right(90).down()

// draw vanes
const short = vw * Math.sqrt(2)
const long = shl - cl - 2 * vw

t.left(45)
t.forward(short).right(45).forward(long).right(45).forward(short).right(90)
t.forward(short).right(45).forward(long).right(45).forward(short)

drawLines(t.lines())
```

This is the result! We have a lot of room for improvement, but I think it's a good start!

![](/getting-started/feather-1.png)

### Transforming lines

Turtles may be good at drawing geometric shapes, but more interesting art pieces will often require curves, as well as more sophisticated ways to modify our lines after we've defined the basic form. We'll come back to curve drawing soon, but in the meantime, let's see if we can distort our feather to give it a more organic shape.

The toolkit comes with a number of functions that operate over polylines, so for instance we can `translate` our lines to move them, `rotate` to turn them all at once, `scale` to stretch them, and so on. We can also transform polylines ourselves, of course by changing the coordinate values directly using JavaScript.

Here is another feather drawing, this time using transform functions instead of specific turtle operations, allowing us to fiddle with the parameters (like number of sides on the vane shape) more readily:

```js
// Generate any polygon
const shape = (n) => {
  const t = new toolkit.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).right(360/n)
  return t.lines()
}

// Shaft is a stretched triangle
const shaft = scale(shape(3), [2, 150])

// vanes are a hendecagaon (!?)
let vanes = scale(shape(11), [8, 30])

// move the vanes to the end of the shaft
vanes = translate(vanes, [0, bounds(shaft).cb[1] - bounds(vanes).cb[1]])

// combine the two shapes, then move and rotate them together!
let feather = [...shaft, ...vanes]
feather = translate(feather, [width / 2, height / 2], bounds(feather).cc)
feather = rotate(feather, 135)
drawLines(feather)
```

The above code draws the following feather:

![](/getting-started/feather-2.png)

Notice that we used the [`bounds` function](/docs#bounds) for the first time above, to find the bounding boxes of both shapes to help line them up.

This is another improvement, but still looking pretty rigid! **See if you can make some further transformations to help the feather look more natural**.

One idea might be to give the whole feather a bit of a natural looking curve, by translating every point in the curve by an amount that corresponds to its position. We can do this using the `iteratePoints` toolkit function, which helps us apply our own custom function to each point on a line. To emphasize this effect, we can also "resample" the points on our lines, so that we can transform more points overall. 

Using this code before we rotate, we start to see the effect we're looking for:

```js
feather = resample(feather, 4)
feather = iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
```

![](/getting-started/feather-3.png)


### Drawing curves

While it was fun to use the word "hendecagon" above, it will often be preferable to draw curves directly, rather than composing increasingly complex turtle shapes. While Blot can only draw straight lines, if you draw enough small ones of them they'll start to pass for curves!

Thankfully there are toolkit functions to help us with this. Here is a version of our feather drawing that uses a "Catmull-Rom spline" to define a curve: roughly speaking, this function will define a curve that passes through the given points. We also take the opportunity to just define the shaft directly (since the turtle drawing was mainly to draw the vanes anyway) and to only resample the shaft, since the catmullRom uses numerous sample points already.

```js
// Shaft is a stretched triangle
const shaft = resample([[[0, 0], [1, 0], [0, -130], [-1, 0], [0, 0]]], 4)

// Vanes are a Catmull-Rom curve
let vanes = [catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// move the vanes nearer to the end of the shaft
vanes = translate(vanes, [0, bounds(shaft).cb[1] - bounds(vanes).cb[1] - 8])

// combine the two shapes, then move and rotate them together!
let feather = [...shaft, ...vanes]
feather = translate(feather, [width / 2, height / 2], bounds(feather).cc)

feather = iteratePoints(feather, ([x, y]) => [x - 0.002*(width/2-y)*(width/2-y), y])
feather = rotate(feather, 135)
drawLines(feather)
```

This short program gives us an impressively natural looking feather shape:

![](/getting-started/feather-4.png)

But we could and should keep going! Our feather could do with barbs. **See if you can add barbs to the feather, or otherwise make it more realistic**

By iterating over the points in our shaft, we can draw individual barbs as their own Catmull-Rom splines. We can then use the vane definition not to draw a vane, but to mask out the barbs!

```js
// Shaft is a stretched triangle
const shaft = resample([[[0, 0], [0.8, 0], [0, -130], [-0.8, 0], [0, 0]]], 1)

// Vanes are a Catmull-Rom curve
let vanes = [catmullRom([[0, 0], [-14, 16], [-22, 77], [0, 100], [15, 79], [14, 31], [0, 0]])]

// Barbs are Catmull-Rom curves originating at the shaft
const barbs = []
for (let i = 0; i < shaft[0].length; i++) {
  const parity = i > shaft[0].length/2 ? -1 : 1
  const [x, y] = shaft[0][i]
  barbs.push(catmullRom(
    [[x, y], [x + parity * 10, y - 2], [x + parity * 30, y]]))
}


// move the vanes to the end of the shaft
vanes = translate(vanes, [0, bounds(shaft).cb[1] - bounds(vanes).cb[1]])

// Use the vane shape to trim the barbs!
cut(barbs, vanes)

// combine the shaft with the barbs
let feather = [...shaft, ...barbs]
feather = translate(feather, [width / 2, height / 2], bounds(feather).cc)
feather = iteratePoints(feather, ([x, y]) => [x - 0.001*(width/2-y)*(width/2-y), y])
feather = rotate(feather, 135)

drawLines(feather)
```

Progress!

![](/getting-started/feather-5.png)


### Randomness

If our art piece feels a little boring at this point, it may be because we haven't done anything random! Using randomness in our programs can add interest to an individual piece by modeling a more natural process, but it can also turn our static piece into something more generative, that can draw a different variant of the work each time we hit "refresh".

**Using toolkit functions like [randInRange](/docs#randInRange), modify the piece to generate a new, interesting feather each time!**

Below is one approach that chooses some parameters within random ranges, and also randomly "clumps" together some of the barbs:

```js
const width = 125
const height = 125

setDocDimensions(width, height)

const rr = randInRange

const shaftLength = rr(0.5, 0.8) * Math.sqrt(width * width + height * height)
const vaneLength = rr(0.7, 0.8) * shaftLength
const vaneWidth = rr(0.2, 0.3) * vaneLength
const barbCurviness = rr(1, 4)
const numClumps = rr(1, 6)

const shaft = resample([[[0, 0], [0.8, 0], [0, -shaftLength], [-0.8, 0], [0, 0]]], 1)

const vanes = scale([catmullRom([
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
  barbs.push(catmullRom([
    [x, y],
    [x + parity * vaneWidth * 0.3, y - barbCurviness],
    [x + parity * vaneWidth, y]
  ], 5))
}

// move the vanes to the end of the shaft
translate(vanes, [0, bounds(shaft).cb[1] - bounds(vanes).cb[1]])

// Use the vane shape to trim the barbs!
cut(barbs, vanes)

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
    barbs[start + j] = catmullRom([
      barb[0],
      mid,
      target[target.length-1]
    ], 10)
  }
}

// combine the shaft with the barbs
let feather = [...shaft, ...barbs]
feather = translate(feather, [width / 2, height / 2], bounds(feather).cc)
feather = iteratePoints(feather, ([x, y]) => [x - 0.001*(width/2-y)*(width/2-y), y])
feather = rotate(feather, randInRange(120, 150))

drawLines(feather)

```

Each time you run this, you will get a new random feather! Here are just a few examples:

![](/getting-started/feather-montage.png)

### Next steps

This tutorial was just a brief introduction to how Blot works, and to some of the toolkit functions. From here, you may want to just try to implement your own ideas using [the docs](/docs) as needed. Or, take a look at one of the many [user-contributed guides](/guides). Once you're happy with a piece, be sure to share it! Have fun!

