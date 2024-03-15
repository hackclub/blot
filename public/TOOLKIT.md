# The Toolkit  

> This is a quick reference sheet. For <a href="/documentation">full documentation refer to this</a>.

There are three names that provide functionality available in the Blot editor:
`setDocDimensions`, `drawLines`, and `toolkit` (which can also be referenced as `tk`).

The first two affect the drawing environment itself, and the toolkit is used for creating line drawings.

## Environment Affecting

```js
setDocDimensions(width: number, height: number)
drawLines(polylines: [number, number][][])
```

## Modify Polylines

Take and modify polylines in place returns first passed polylines.

These functions are available in the `toolkit` or `tk` object.

```js
tk.iteratePoints(polylines, (pt, t) => { ... }) // return pt to modify, "BREAK" to split, "REMOVE" to filter out point
tk.scale(polylines, scale : scaleXY | [scaleX, scaleY], ?origin: [ x, y ]) 
tk.rotate(polylines, degrees, ?origin: [ x, y ]) 
tk.translate(polylines, [dx, dy], ?origin: [ x, y ]) 
tk.originate(polylines) // moves center to [0, 0] 
tk.resample(polylines, sampleRate) 
tk.simplify(polylines, tolerance) 
tk.trim(polylines, tStart, tEnd)
tk.merge(polylines)  
tk.join(polylines0, ...morePolylines) 
tk.copy(polylines)
tk.cut(polylines0, polylines1) 
tk.cover(polylines0, polylines1) 
tk.union(polylines0, polylines1)
tk.difference(polylines0, polylines1)
tk.intersection(polylines0, polylines1)
tk.xor(polylines0, polylines1)
```

## Get Data From Polylines

These functions are available in the `toolkit` or `tk` object.

```js
// take polylines return other
tk.getAngle(polylines, t: [0 to 1]) // returns angle in degrees
tk.getPoint(polylines, t: [0 to 1]) // returns point as [x, y]
tk.getNormal(polylines, t: [0 to 1]) // returns normal vector as [x, y]

tk.pointInside(polylines, pt)

tk.bounds(polylines) 
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

These functions are available in the `toolkit` or `tk` object.

```js
const myTurtle = new tk.Turtle()
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

// data
const position = myTurtle.pos // [x: number, y: number]
const angle = myTurtle.angle // number
const path = myTurtle.path // is array of polylines [number, number][][]
const drawing = myTurtle.drawing // boolean
```

```js
tk.catmullRom(points, ?steps = 1000) // returns polyline [number, number][]
tk.nurbs(points, ?ops = { steps: 100, degree: 2}) // returns polyline [number, number][]
```

```js
tk.svgToPolylines(svg: string) // returns array of polylines [number, number][][]
```

## Easing Curves

These functions are available in the `toolkit` or `tk` object.

```js
tk.bezierEasing(startY, controlPt0, controlPt1, endY); // returns function which takes x (0 to 1) and returns y value
```

## Randomness

These functions are available in the `toolkit` or `tk` object.

```js
tk.rand();

tk.randInRange(min: number, max: number);

tk.randIntInRange(min: number, max: number); 

tk.setRandSeed(seed: number);

tk.noise(
  number | [ x:number , ?y: number , ?z: number ], 
  { 
    octaves: number [0 to 8], 
    falloff: number [0 to 100] 
  }
);
```