# Idioms

Useful common patterns.

### Imports in One Line

```js
const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, nurbs, catmullRom, svgToPolylines, rand, setRandSeed, randInRange, randIntInRange, noise } = bt;

```

### Displace Along Normal

```js
const w = 125;
const h = 125;

setDocDimensions(w, h);

const noisyCircle = new bt.Turtle()
  .arc(360, 26)
  .apply(turtle => {
    const pls = turtle.path;
    bt.resample(pls, .1);
    bt.iteratePoints(pls, (pt, t) => {
      const [x, y] = pt;
      let freq = 1.5;
      const mag = Math.sin(t*18*Math.PI*2)*2;
      const norm = bt.getNormal(pls, t);

      return [
        x + norm[0]*mag,
        y + norm[1]*mag
      ]
    })
  })
  .path;

bt.originate(noisyCircle);

drawLines(noisyCircle);
```

### Displace Along Angle

```js
const w = 125;
const h = 125;

setDocDimensions(w, h);

const noisyCircle = new bt.Turtle()
  .arc(360, 26)
  .apply(turtle => {
    const pls = turtle.path;
    bt.resample(pls, .05);
    bt.iteratePoints(pls, (pt, t) => {
      const [x, y] = pt;
      let freq = 1.5;
      const mag = bt.noise([x*freq, y*freq])*2;
      const angle = (bt.getAngle(pls, t)+90)/180*Math.PI;

      return [
        x + Math.cos(angle)*mag,
        y + Math.sin(angle)*mag
      ]
    })
  })
  .path;

bt.originate(noisyCircle);

drawLines(noisyCircle);
```


### Poisson-Disc Sampling (thanks to Reinder Nijhoff)

```js
function createPoissonDisc(radius) {
  let cellSize = 1 / Math.sqrt(2) / radius;
  let cells = [];
  let queue = [];

  function insert(p) {
    const x = p[0] * cellSize | 0;
    const y = p[1] * cellSize | 0;
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
  function cell(x, y) {
    const c = cells;
    return (c[x] ? c[x] : c[x] = [])[y] ? c[x][y] : c[x][y] = [];
  }


  return {
    cell,
    insert
  };
}
```

### Circle

```js
function circle(r) {
  const t = new bt.Turtle();
  t.arc(360, r);
  const cc = bt.bounds(t.path).cc;
  bt.translate(t.path, [0, 0], cc);

  return t.path;
}
```

### Rectangle

```js
function rect(w, h) {
  return [
    [-w/2, h/2],
    [-w/2, -h/2],
    [w/2, -h/2],
    [w/2, h/2],
    [-w/2, h/2],
  ]
}
```

### Length

```js
function length([x0, y0], [x1, y1]) {
  return Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
}
```