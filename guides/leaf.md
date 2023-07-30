# How to draw a leaf

> You can follow along in this editor: https://editor.haxidraw.hackclub.com/

---

Let's learn how to draw a leaf that looks likes this.

<img width="389" alt="Screen Shot 2023-07-03 at 2 14 10 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/9ce96217-bc5e-49cc-87b2-178681188eb3">


Let's break it down into parts.

## Outline

We'll start with the outline of the leaf.

<img width="382" alt="Screen Shot 2023-07-03 at 2 16 33 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/7027b27a-cc5f-4565-9357-2c8fd1b21e6f">

First let's lay down a line which will become the top edge.

```js
const leafLength = 5;
const leafW = 1.3;

const edge = createTurtle()
  .forward(leafLength)


// render the final leaf like such
const leaf = createTurtle()
  .join(edge)

drawTurtles(
  leaf
)
```

<img width="366" alt="Screen Shot 2023-07-03 at 2 17 32 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/aa904051-d23a-4542-9da9-025cd658fc28">

Now we can warp the line by resampling points and then using `warp` with a bezier curve.

```js
const edge = createTurtle()
  .forward(leafLength)
  .resample(.01) // we resample to have points to bend
  .warp(bezierEasing(0, [0.4, 2.58], [0.52, 0.31], 0)); // bezierEasing takes a start y, control point, control point, end y
```

<img width="374" alt="Screen Shot 2023-07-03 at 2 19 18 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/1ed396a9-41bd-42d6-bd60-95dd8eea3719">

Let's make the bottom edge too.

```js
const bottom = edge.copy().scale([1, -1], [0, 0]);

const leaf = createTurtle()
  .join(edge)
  .join(bottom)

drawTurtles(
  leaf
)
```

<img width="378" alt="Screen Shot 2023-07-03 at 2 22 51 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/88b1ccfb-0811-49bf-80f5-ce3cf7c93609">

Now we can add some noise to make the leaf look a bit more organic.

```js
edge.warp(t => noise(t*20.4, { octaves: 2 })*0.09*(t===0 || t === 1 ? 0 : 1));
bottom.warp(t => noise(t*23.6, { octaves: 2})*-0.10*(t===0 || t === 1 ? 0 : 1));
```

This term `(t===0 || t === 1 ? 0 : 1)` makes sure that the endpoints stay the same on the curve. 
Try playing with the multiplication terms.

<img width="358" alt="Screen Shot 2023-07-03 at 2 23 45 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/d547cd78-ec67-4fbe-8c72-78363c611946">

Now we have an outline let's do the veins of the leaf.

## Veins

After adding the veins our leaf will look like this.

<img width="347" alt="Screen Shot 2023-07-03 at 2 25 44 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/ad810112-ca58-48f4-8961-311cb7d44ec7">

We'll start with the top side by drawing some lines the follow the distribution of the edge.
Let's make a veins function which will return some lines we can add to our main drawing.

```js
function veins() {
  const lines = createTurtle();

  let littleLinesMax = 61;
  for (let i = 4; i < littleLinesMax-5; i++) {

    const t = i/(littleLinesMax-1);  // this line to get t values 0 to 1 while iterating is very common
    const x0 = t*leafLength;
    const y0 = 0;

    // try playing with the `0.1` term
    // interpolate returns a point and we take `[1]` to get the y value 
    y = edge.interpolate(t+0.1)[1];
    
    const line = createTurtle([ x0, y0 ]);

    line.right(
          -70+t*37
          + randInRange(-4, 4)
    );

    let r = y*0.7;


    if (r < 0.01) continue;
    
    line
      .forward(r)

    
    lines.join(line)
  }

  return lines;
}
```

Which we add to the drawing like such.

```js
leaf.join(veins());
```

<img width="370" alt="Screen Shot 2023-07-03 at 2 28 37 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/cfed6d56-3b16-4ecc-9daf-bc7c33045ba8">

If we add back in the randomness term `randInRange(-4, 4)` to the angle of the line we can start to make a more natural image.

<img width="344" alt="Screen Shot 2023-07-03 at 2 30 53 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/2a5b649d-e8ed-47f8-afae-8a3ff9e7dc12">

Now let's bend the lines with our warping function again.

```js

// try removing the y scaling and see what happens
const warper = bezierEasing(0, [0.28, y/4], [0.58, y/8], 0);

line
  .forward(r)
  .resample(0.01) // we resample so there are points to warp, see what happens when this is removed
  .warp(warper)
```
<img width="363" alt="Screen Shot 2023-07-03 at 2 32 08 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/03698576-c5ec-4aaf-9168-7bcaa90274bf">

Let's randomly trim each vein with every fifth being a bite longer.

```js
// the ternary makes evey fifth line trimmed up to 0.7 to 0.9 and all the others between 0.1 and 0.7
const trimTo = (i % 5 === 0)
  ? randInRange(0.7, 0.9) 
  : randInRange(0.1, 0.7);

if (r < 0.01) continue;

const warper = bezierEasing(0, [0.28, y/4], [0.58, y/8], 0);

line
  .forward(r)
  .resample(0.01)
  .warp(warper)
  .trim(0, trimTo);
```

<img width="350" alt="Screen Shot 2023-07-03 at 2 33 06 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/46cfb081-9b3c-4e1f-bca6-336be48e1828">

And let's randomly break up these lines.

```js
line.iteratePath(pt => {
  return Math.random() < (i % 5 === 0 ? +0.17 : 0.56)
    ? "BREAK" 
    : pt;
})
```

<img width="346" alt="Screen Shot 2023-07-03 at 2 33 49 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/98c82e8e-aa3c-4d5a-a24e-74d13cd5d4a6">

Then call veins again and flip it over for the bottom side.

```js
leaf.join(veins().scale([1, -1], [0, 0]));
```

<img width="352" alt="Screen Shot 2023-07-03 at 2 34 39 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/b7a4bf33-5598-4ee3-9787-6b57de6cdae4">


## The Stem

The stem is the easiest part.

We just need to draw a line.

```js
const lineStem = createTurtle([-1, 0])
  .forward(leafLength+1)
  .resample(.1)

leaf.join(lineStem);
```

<img width="426" alt="Screen Shot 2023-07-03 at 2 35 26 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/7cf0afbc-af28-439b-a672-17e60080b8bb">

## Finishing Up

To Finish our leaf let's go through all the points and add a little noise and a bend upwards.

```js
leaf.iteratePath(pt => {
  let [x,y] = pt;
  y += x*x*0.02;
  y += noise([x*0.2])*0.3;
  return [x, y]
});
```
And now we have a leaf!

<img width="416" alt="Screen Shot 2023-07-03 at 2 37 02 PM" src="https://github.com/hackclub/haxidraw/assets/27078897/ced13771-b8e6-4eb0-a035-5528c9e38cde">

## Acknowledgements

Thanks to [Lingdong](https://github.com/LingDong-) for drawing the first draft of the leaf with me.

