# The Toolkit  

```js
Turtle 

// take and modify polylines return polylines
iteratePoints(polylines, ... ) 
cut(polylines, ... ) 
cover(polylines, ... ) 
pointInside(polylines, ... ) 
scale(polylines, ... ) 
rotate(polylines, ... ) 
translate(polylines, ... ) 
originate(polylines, ... ) 
resample(polylines, ... ) 
simplify(polylines, ... ) 
trim(polylines, ... )
merge(polylines, ... )  
join(polylines, ... ) 
copy(polylines, ... )
union(polylines, ... )
difference(polylines, ... )
intersect(polylines, ... )
xor(polylines, ... )

// take polylines return other
getAngle(polylines, t [0 to 1]) 
getPoint(polylines, t [0 to 1]) 
getNormal(polylines, t [0 to 1]) 
bounds(polylines)

// take other return polylines
svgToPolylines 


// curves
bezierEasing

// make pls
rect
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

draw(noisyCircle);
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

draw(noisyCircle);
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
  
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "copy", "union", "difference", "intersect", "xor", "svgToPolylines" ].forEach(name => {
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

  methods.polylines = pls;
  methods.draw = (...args) => {
    draw(pls, ...args);
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
    
  [ "iteratePoints", "cut", "cover", "scale", "rotate", "translate", "originate", "resample", "simplify", "trim", "merge", "join", "copy", "union", "difference", "intersect", "xor", "svgToPolylines" ].forEach(name => {
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
    draw(pls, ...args);
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

Circle

Rectangle

Hatching

