# The Toolkit  

### Environment Affecting

```js
setDocDimensions(width, height)
drawLines(polylines, options = { fill, stroke, width })
```

### Modify Polylines
```js
// take and modify polylines return polylines
iteratePoints(polylines0, (pt, t) => { ... } ) 
scale(polylines0, scale : scaleXY | [scaleX, scaleY], ?origin: [ x, y ] ) 
rotate(polylines0, degrees, ?origin: [ x, y ] ) 
translate(polylines0, [dx, dy], ?origin: [ x, y ] ) 
originate(polylines) // moves center to [0, 0] 
resample(polylines0, sampleRate ) 
simplify(polylines0, ... ) 
trim(polylines0, tStart, tEnd )
merge(polylines)  
join(polylines0, ...morePolylines ) 
copy(polylines )
cut(polylines0, polylines1 ) 
cover(polylines0, polylines1 ) 
union(polylines0, polylines1 )
difference(polylines0, polylines1 )
intersection(polylines0, polylines1 )
xor(polylines0,polylines1 )

```

### Get Data From Polylines

```js
// take polylines return other
getAngle(polylines, t [0 to 1]) // returns angle in degrees
getPoint(polylines, t [0 to 1]) // returns point as [x, y]
getNormal(polylines, t [0 to 1]) // returns normal vector as [x, y]

pointInside(polylines, pt)

bounds(polylines) 
/*
returns { 
  xMin, xMax, 
  yMin, yMax, 
  lt, ct, rt, 
  lc, cc, rc,
  lb, cb, rb,
  width, height
}
*/
```

### Generate Polylines

```js
const myTurtle = new Turtle()
  .forward(distance: number)
  .arc(angle, radius)
  .goTo( [ x, y ] ) // move with up/down state
  .jump( [ x, y ] ) // move but don't draw
  .right(angle)
  .left(angle)
  .setAngle(angle)
  .up() // sets drawing to false
  .down() // sets drawing to true
  .copy()
  .apply(fn) // takes (turtle) => { }

// data
const position = myTurtle.pos;
const angle = myTurtle.angle;
const path = myTurtle.path; // is array of polylines
const drawing = myTurtle.drawing;
```

```js
catmullRom(points, steps = 1000)
nurbs(points, ops = { steps: 100, degree: 2})
```

```js
// take other return polylines
svgToPolylines(svgString)
```

### Easing Curves

```js
bezierEasing(startY, controlPt0, controlPt1, endY)
```

### Randomness

```js
rand() 

randInRange(min: number, max: number) 

randIntInRange(min: number, max: number) 

setRandSeed(seed: number) 

noise(
  [ x:number , ?y: number , ?z: number ], 
  { 
    octaves: number [0 to 8], 
    falloff: number [0 to 100] 
  }
)
```

### Idioms

Useful common patterns.

<details>
<summary>imports in one line</summary>

```js
// common imports
const { Turtle, cut, cover, copy, rotate, scale, translate, originate, iteratePoints, resample, join, getAngle, getNormal, getPoint, bounds, svgToPolylines, rand, setRandSeed, randInRange, noise, bezierEasing } = toolkit;

// all imports
const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, svgToPolylines, rand, setRandSeed, randInRange, randIntInRange, noise, bezierEasing } = toolkit;

```
</details>

<details>
<summary>Displace Along Normal</summary>

```js
const { Turtle, noise, getNormal, resample, iteratePoints, originate } = toolkit;

const w = 125;
const h = 125;

setDocDimensions(w, h);

const noisyCircle = new Turtle()
  .arc(360, 26)
  .applyToPath(pls => {
    resample(pls, .1);
    iteratePoints(pls, (pt, t) => {
      const [x, y] = pt;
      let freq = 1.5;
      const mag = Math.sin(t*18*Math.PI*2)*2;
      const norm = getNormal(pls, t);

      return [
        x + norm[0]*mag,
        y + norm[1]*mag
      ]
    })
  })
  .polylines();

originate(noisyCircle);

drawLines(noisyCircle);
```

</details>

<details>
<summary>Displace Along Angle</summary>

```js
const { Turtle, noise, getAngle, resample, iteratePoints, originate } = toolkit;

const w = 125;
const h = 125;

setDocDimensions(w, h);

const noisyCircle = new Turtle()
  .arc(360, 26)
  .applyToPath(pls => {
    resample(pls, .05);
    iteratePoints(pls, (pt, t) => {
      const [x, y] = pt;
      let freq = 1.5;
      const mag = noise([x*freq, y*freq])*2;
      const angle = (getAngle(pls, t)+90)/180*Math.PI;

      return [
        x + Math.cos(angle)*mag,
        y + Math.sin(angle)*mag
      ]
    })
  })
  .polylines();

originate(noisyCircle);

drawLines(noisyCircle);
```

</details>

<details>
<summary>Poisson-Disc Sampling (thanks to Reinder Nijhoff)</summary>

```js
function createPoissonDisc(radius) {
  let cellSize = 1 / Math.sqrt(2) / radius;
  let cells = [];
  let queue = [];

  insert(p) {
    const x = p[0] * cellSize | 0,
      y = p[1] * cellSize | 0;
    for (let xi = x - 1; xi <= x + 1; xi++) {
      for (let yi = y - 1; yi <= y + 1; yi++) {
        const ps = this.cell(xi, yi);
        for (let i = 0; i < ps.length; i++) {
          if ((ps[i][0] - p[0]) ** 2 + (ps[i][1] - p[1]) ** 2 < (ps[i][2] + p[2]) ** 2) {
            return false;
          }
        }
      }
    }
    queue.push([p, x, y]);
    if (queue.length > (10 * radius + 1) | 0) {
      const d = queue.shift();
      this.cell(d[1], d[2]).push(d[0]);
    }
    return true;
  }
  cell(x, y) {
    const c = cells;
    return (c[x] ? c[x] : c[x] = [])[y] ? c[x][y] : c[x][y] = [];
  }


  return {
    cell,
    insert
  };
}
```
</details>

<details>
<summary>Add methods to polylines</summary>

```js
function L(pls) {
  const methods = {};
  
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "union", "difference", "intersection", "xor", "svgToPolylines" ].forEach(name => {
    methods[name] = (...args) => {
      toolkit[name](pls, ...args);
      return methods;
    };
  });

  [ "getAngle", "getPoint", "getNormal", "bounds", "pointInside" ].forEach(name => {
    methods[name] = (...args) => {
      return toolkit[name](pls, ...args);
    };
  })

  methods.copy = () => {
    const copied = toolkit.copy(pls);
    return L(copied);
  }

  methods.polylines = pls;
  methods.draw = (...args) => {
    drawLines(pls, ...args);
    return methods;
  }

  return methods;
}
```
</details>

<details>
<summary>Add methods to Turtle</summary>

```js
function createTurtle() {
  const t = new toolkit.Turtle();
  const pls = t.path;
    
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "copy", "union", "difference", "intersection", "xor", "svgToPolylines" ].forEach(name => {
    t[name] = (...args) => {
      toolkit[name](
        pls, 
        ...args.map(x => x instanceof toolkit.Turtle ? x.path : x)
      )
      return t;
    };
  });

  [ "getAngle", "getPoint", "getNormal", "bounds", "pointInside" ].forEach(name => {
    t[name] = (...args) => {
      return toolkit[name](pls, ...args);
    };
  })

  t.draw = (...args) => {
    drawLines(pls, ...args);
    return t;
  }

  t.apply = (fn) => {
    fn(t);
    return t;
  }
  
  return t;
}
```
</details>

<details>
<summary>Circle</summary>

```js
function circle(r) {
  const t = new Turtle();
  t.arc(360, r);
  const cc = bounds(t.path).cc;
  translate(t.path, [0, 0], cc);

  return t.polylines();
}
```
</details>

<details>
<summary>Rectangle</summary>

```js
function rect(w, h) {
  return [
    [
      [-w/2, h/2],
      [-w/2, -h/2],
      [w/2, -h/2],
      [w/2, h/2],
      [-w/2, h/2],
    ]
  ]
}
```
</details>

<details>
<summary>length</summary>

```js
function length([x0, y0], [x1, y1]) {
  return Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
}
```
</details>


Hatching

