# The Toolkit  

> This is a quick reference sheet. For <a href="/docs">full documentation refer to this</a>.

> For an introduction to Blot check out <a href="/editor?guide=start">this guide</a>. 

There are three names that provide functionality available in the Blot editor:
`setDocDimensions`, `drawLines`, and `blotToolkit` (which can also be referenced as `bt`).

The first two affect the drawing environment itself, and the `blotToolkit` is used for creating line drawings.

## Environment Affecting

```js
setDocDimensions(width: number, height: number)
drawLines(polylines: [number, number][][])
```

## Modify Polylines

Take and modify polylines in place returns first passed polylines.

These functions are available in the `blotToolkit` or `bt` object.

```js
bt.iteratePoints(polylines, (pt, t) => { ... }) // return pt to modify, "BREAK" to split, "REMOVE" to filter out point
bt.scale(polylines, scale : scaleXY | [scaleX, scaleY], ?origin: [ x, y ]) 
bt.rotate(polylines, degrees, ?origin: [ x, y ]) 
bt.translate(polylines, [dx, dy], ?origin: [ x, y ]) 
bt.originate(polylines) // moves center to [0, 0] 
bt.resample(polylines, sampleRate) 
bt.simplify(polylines, tolerance) 
bt.trim(polylines, tStart, tEnd)
bt.merge(polylines)  
bt.join(polylines0, ...morePolylines) 
bt.copy(polylines)
bt.cut(polylines0, polylines1) 
bt.cover(polylines0, polylines1) 
bt.union(polylines0, polylines1)
bt.difference(polylines0, polylines1)
bt.intersection(polylines0, polylines1)
bt.xor(polylines0, polylines1)
```

## Get Data From Polylines

These functions are available in the `blotToolkit` or `bt` object.

```js
// take polylines return other
bt.getAngle(polylines, t: [0 to 1]) // returns angle in degrees
bt.getPoint(polylines, t: [0 to 1]) // returns point as [x, y]
bt.getNormal(polylines, t: [0 to 1]) // returns normal vector as [x, y]

bt.pointInside(polylines, pt)

bt.bounds(polylines) 
/*
returns { 
  xMin, xMax, 
  yMin, yMax, 
  lt, ct, rt, 
  lc, cc, rc,
  lb, cb, rb,
  width, height
}

l is left
c is center
r is right
t is top
b is bottom

they are arranged in this configuration around the bounding box of the polylines

lt--ct--rt
 |   |   |
lc--cc--rc
 |   |   | 
lb--cb--rb
*/
```

## Generate Polylines

These functions are available in the `blotToolkit` or `bt` object.

```js
const myTurtle = new bt.Turtle()
  .forward(distance: number)
  .arc(angle: number, radius: number)
  .goTo( [ x: number, y: number ] ) // move with up/down state
  .jump( [ x: number, y: number ] ) // move but don't draw
  .right(angle: number)
  .left(angle: number)
  .setAngle(angle: number)
  .up() // sets drawing to false
  .down() // sets drawing to true
  .copy()
  .apply(fn) // takes (turtle) => { }
  .lines() // get copy of the Turtle's path

// data
const position = myTurtle.pos // [x: number, y: number]
const angle = myTurtle.angle // number
const path = myTurtle.path // is array of polylines [number, number][][]
const drawing = myTurtle.drawing // boolean
```

```js
bt.catmullRom(points, ?steps = 1000) // returns polyline [number, number][]
bt.nurbs(points, ?ops = { steps: 100, degree: 2}) // returns polyline [number, number][]
```

<!-- 
```js
bt.svgToPolylines(svg: string) // returns array of polylines [number, number][][]
``` 
-->

## Randomness

These functions are available in the `blotToolkit` or `bt` object.

```js
bt.rand();

bt.randInRange(min: number, max: number);

bt.randIntInRange(min: number, max: number); 

bt.setRandSeed(seed: number);

bt.noise(
  number | [ x:number , ?y: number , ?z: number ], 
  { 
    octaves: number [0 to 8], 
    falloff: number [0 to 100] 
  }
);
```