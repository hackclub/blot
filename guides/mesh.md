# Draw a triangle mesh in Haxidraw

### This guide is based on a tutorial on *[generativeartistry](https://generativeartistry.com/tutorials/triangular-mesh/)* by [maxwellito](https://maxwellito.com/)
---

![https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png](https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png)
We'll build the above mesh like this:

- First, generate a grid of points, where every other line is slightly offset
- Next, offset each point according to some noise
- Then, we iterate through that grid, drawing triangles at every 3 points

### Let's start with some code

First, create a turtle:
`const t = new Turtle();`

Next, let's define a scale for the whole image:
`const size = 80`

Then, we can create a grid. This is identical to a typical rectangular grid, except we offset every other line by a bit, making it triangular.

```
var line, dot,
    odd = false,
    lines = [],
    gap = 1;

for(var y = gap / 2; y <= size; y+= gap) {
  odd = !odd;
  line = [];
  for(var x = gap / 4; x <= size; x+= gap) {
    dot = {x: x + (odd ? gap/2 : 0), y: y};
```
Then, use the built-in haxidraw noise function to offset the points again, this time randomly. Also, add an offset on the x axis if we're drawing an odd-numbered line.
```
    let n = noise([x * 0.1, y * 0.1])
    line.push({
      x: x + (n*4.1 - .4) * gap  + (odd ? gap/2 : 0),
      y: y + (n*6.9 - .4) * gap
    });
  }
  lines.push(line);
}
```

Now, we need a way to draw this. We can define a simple function to render a triange, where we simply go through every point of the triangle with the turtle `goto` function.

```
function drawTriangle(pointA, pointB, pointC) {
  t.goto([pointA.x, pointA.y]);
  t.down()
  t.goto([pointB.x, pointB.y]);
  t.goto([pointC.x, pointC.y]);
  t.goto([pointA.x, pointA.y]);
  t.up()
}
```

Now, to draw the whole mesh, we can iterate through the points, drawing triangles at every 3 points next to each other in 2D.
```
var dotLine;
odd = true;

for(var y = 0; y < lines.length - 1; y++) {
  odd = !odd;
  dotLine = [];
  for(var i = 0; i < lines[y].length; i++) {
    dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);
    dotLine.push(odd ? lines[y+1][i] : lines[y][i]);
  }
  for(var i = 0; i < dotLine.length - 2; i++) {
    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);
  }
}

drawTurtles(t)
```

And, that's it! If all went well, you should have an image resembling the one at the start of the guide.
