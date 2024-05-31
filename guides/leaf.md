---
title: How to draw a leaf
thumbnail: https://cloud-7rdff2vjy-hack-club-bot.vercel.app/0250635645-9ce96217-bc5e-49cc-87b2-178681188eb3.webp
contributors: leomcelroy
---

> You can follow along in this editor: https://blot.hackclub.com/editor?guide=leaf

---

Let's learn how to draw a leaf that looks likes this.

<img
  width="389"
  alt="leaf"
  src="https://cloud-7rdff2vjy-hack-club-bot.vercel.app/0250635645-9ce96217-bc5e-49cc-87b2-178681188eb3.webp"
/>

Let's break it down into parts.

## Outline

We'll start with the outline of the leaf.

<img
  width="382"
  alt="Screen Shot 2023-07-03 at 2 16 33 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/7027b27a-cc5f-4565-9357-2c8fd1b21e6f"
/>

First let's lay down a line which will become the top edge.

```js
// welcome to blot!

const width = 125;
const height = 125;

setDocDimensions(width, height);

const leafLength = 5
const leafW = 1.8

const finalLines = [];

const topEdge = [
  [
    [0, 0],
    [leafLength*0.3, leafW],
    [leafLength*0.8, leafW*.01],
    [leafLength, 0]
  ]
]

bt.join(finalLines, topEdge);

// center piece
const finalBounds = bt.bounds(finalLines);
const finalScale = width/finalBounds.width*.85;
bt.scale(finalLines, finalScale);
bt.translate(finalLines, [width / 2, height / 2], bt.bounds(finalLines).cc);

// draw it
drawLines(finalLines);
```

<img
  width="366"
  alt="Screen Shot 2023-07-03 at 2 17 32 PM"
  src="https://github.com/hackclub/blot/assets/27078897/c919b844-9106-488c-840f-a93bb48d0729"
/>

We can make this line smooth using a NURBS curve.

```js
const topEdge = [
  bt.nurbs([
    [0, 0],
    [leafLength*0.3, leafW],
    [leafLength*0.8, leafW*.01],
    [leafLength, 0]
  ])
]
```

<img
  width="374"
  alt="Screen Shot 2023-07-03 at 2 19 18 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/1ed396a9-41bd-42d6-bd60-95dd8eea3719"
/>

Let's make the bottom edge too.

```js
...

const topEdge = [
  bt.nurbs([
    [0, 0],
    [leafLength*0.3, leafW],
    [leafLength*0.8, leafW*.01],
    [leafLength, 0]
  ])
]

// add our code here
const bottomEdge = bt.copy(topEdge);
bt.scale(bottomEdge, [1, -1], [0, 0]);
bt.join(finalLines, bottomEdge);

bt.join(finalLines, topEdge);

...
```

<img
  width="378"
  alt="Screen Shot 2023-07-03 at 2 22 51 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/88b1ccfb-0811-49bf-80f5-ce3cf7c93609"
/>

Now we can add some noise to make the leaf look a bit more organic.

```js
bt.iteratePoints(topEdge, (pt, t) => {
  const [x, y] = pt;
  const freq = 2.84;
  const dy = bt.noise(t * 20.4, { octaves: 2 }) * 0.15 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.iteratePoints(bottomEdge, (pt, t) => {
  const [x, y] = pt;
  const dy = bt.noise(t * 20.8, { octaves: 2 }) * -0.2 * (t === 0 || t === 1 ? 0 : 1)
  return [x, y + dy]
})

bt.join(finalLines, topEdge);

...
```

This term `(t===0 || t === 1 ? 0 : 1)` makes sure that the endpoints stay the same on the curve.
Try playing with the multiplication terms.

<img
  width="358"
  alt="Screen Shot 2023-07-03 at 2 23 45 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/d547cd78-ec67-4fbe-8c72-78363c611946"
/>

Now we have an outline let's do the veins of the leaf.

## Veins

After adding the veins our leaf will look like this.

<img
  width="347"
  alt="Screen Shot 2023-07-03 at 2 25 44 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/ad810112-ca58-48f4-8961-311cb7d44ec7"
/>

We'll start with the top side by drawing some lines the follow the distribution of the edge.
Let's make a veins function which will return some lines we can add to our main drawing.

```js

function makeVeins() {
  const veins = [];

  let littleLinesMax = 61
  for (let i = 4; i < littleLinesMax - 5; i++) {
    const t = i / (littleLinesMax - 1); // this line to get t values 0 to 1 while iterating is very common
    const x0 = t * leafLength;
    const y0 = 0;
  
    const y = bt.getPoint(topEdge, t + 0.1)[1]
  
    const angle = (-70 + t * 37 + bt.randInRange(-4, 4)) / 180 * Math.PI;
    let r = y * 0.8;
  
    const line = [
      bt.nurbs([
        [x0, y0],
        [
          x0 + Math.cos(angle) * r / 2 - y / 4,
          -(y0 + Math.sin(angle) * r / 2)
        ],
        [
          x0 + Math.cos(angle) * r,
          -(y0 + Math.sin(angle) * r)
        ]
      ])
    ];
  
    if (r < 0.01) continue;
  
    bt.join(veins, line);
  }

  return veins;
}
```

Which we can add to the drawing like such:

```js
bt.join(finalLines, makeVeins());
```

<img
  width="363"
  alt="Screen Shot 2023-07-03 at 2 32 08 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/03698576-c5ec-4aaf-9168-7bcaa90274bf"
/>

Let's randomly trim each vein with every fifth being a bite longer.

```js
if (r < 0.01) continue;

// the ternary makes evey fifth line trimmed up to 0.7 to 0.9 and all the others between 0.1 and 0.7
const trimTo = (i % 5 === 0) ?
  bt.randInRange(0.7, 0.9) :
  bt.randInRange(0.1, 0.7);

bt.trim(line, 0, trimTo);

```

<img
  width="350"
  alt="Screen Shot 2023-07-03 at 2 33 06 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/46cfb081-9b3c-4e1f-bca6-336be48e1828"
/>

And let's randomly break up these lines.

```js
bt.resample(line, .03);

bt.iteratePoints(line, pt => {
  return Math.random() < (i % 5 === 0 ? 0.28 : 0.40) ? 'BREAK' : pt;
});
```

<img
  width="346"
  alt="Screen Shot 2023-07-03 at 2 33 49 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/98c82e8e-aa3c-4d5a-a24e-74d13cd5d4a6"
/>

Then call veins again and flip it over for the bottom side.

```js
const bottomVeins = makeVeins();
bt.scale(bottomVeins, [1, -1], [0, 0]);
bt.join(finalLines, bottomVeins);
```

<img
  width="352"
  alt="Screen Shot 2023-07-03 at 2 34 39 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/b7a4bf33-5598-4ee3-9787-6b57de6cdae4"
/>

## The Stem

The stem is the easiest part.

We just need to draw a line.

```js
const stem = [
  [
    [-leafLength*.2, 0],
    [leafLength, 0]
  ]
];
bt.resample(stem, 0.01);
bt.join(finalLines, stem);
```

<img
  width="426"
  alt="Screen Shot 2023-07-03 at 2 35 26 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/7cf0afbc-af28-439b-a672-17e60080b8bb"
/>

## Finishing Up

To Finish our leaf let's go through all the points and add a little noise and a bend upwards.

```js
bt.iteratePoints(finalLines, pt => {
  let [x, y] = pt
  y += x * x * 0.02
  y += bt.noise([x * 0.2]) * 0.3
  return [x, y]
});
```

And now we have a leaf!

<img
  width="416"
  alt="Screen Shot 2023-07-03 at 2 37 02 PM"
  src="https://github.com/hackclub/haxidraw/assets/27078897/ced13771-b8e6-4eb0-a035-5528c9e38cde"
/>

## Acknowledgements

Thanks to [Lingdong](https://github.com/LingDong-) for drawing the first draft of the leaf with me.
