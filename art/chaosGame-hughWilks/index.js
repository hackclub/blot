/*
@title: Chaos Game
@author: Hugh Wilks
@snapshot: DetailedPentagon.png
*/

/*
This is a Blot version of the Chaos Game. Basically, you 
choose a point, then go a set % of the way to a random 
corner of your polygon. There's a bit more math involved,
but that's the gist. I used the following resources:

Short version:
https://en.wikipedia.org/wiki/Chaos_game

Long version:
https://epubs.siam.org/doi/pdf/10.1137/20M1386438
*/


/*
I think it looks best with dots >= 150,000 and res = 0.1, but 
that's not gonna work great on the physical Blot. You can 
still see the pattern at much lower values of dots though, so 
that's what I set it to here. Feel free to experiment!
*/

const size = 125
const height = size
const width = size

const res = 0.3 // Resolution (Dot size)
const dots = 3600 // Number of dots
const n = 5 // Sides on the polygon
// (For math reasons, n=4 doesn't really work)

// Here's all that math I was talking about
const k = Math.floor((n + 2) / 4.0 + 0.5)
const z = Math.sin((2 * k - 1) * Math.PI / n)
const r = z / (z + Math.sin(Math.PI / n))
const dist = r

setDocDimensions(width, height);


const poly = (n) => {
  // Make a regular polygon with n sides
  n = Math.min(n, 100)
  const t = new bt.Turtle()
  for (let i = 0; i < n; i++) t.forward(1).left(360 / n)
  return t.lines()
}

const pixel = (t, r) => {
  // Draw a tiny rectangle
  for (let i = 0; i < 3; i++) t.forward(r).right(120)
  drawLines(t.lines())
}

const scaleUp = (s, size) => {
  // Make the polygon use up most of the available space
  bt.translate(s, [width / 2, height / 2])
  let i = 1
  while (bt.bounds(s).xMax < size && bt.bounds(s).yMax < size) {
    bt.scale(s, (i + 1) / i)
    i++
  }
  if (i != 1) {
    bt.scale(s, i / i + 1)
    bt.scale(s, 0.48)
  }
  bt.originate(s)
  bt.translate(s, [size / 2, size / 2])
  return i
}

const drawNext = (pos, dist, shape, draw) => {
  // Go dist% from pos to a random vertex on shape
  let goalX = 0
  let goalY = 0

  let vertex = bt.randIntInRange(0, n - 1)

  let spot = vertex / n
  const newPos = bt.getPoint(shape, spot)
  goalX = pos[0] * (1 - dist) + newPos[0] * dist
  goalY = pos[1] * (1 - dist) + newPos[1] * dist

  const dave = new bt.Turtle()
  dave.jump([goalX, goalY])
  if (draw) {
    pixel(dave, res)
  }

  return [goalX, goalY]
}

const shape = poly(n)
const scale = scaleUp(shape, size)

let pos = bt.bounds(shape).cc
// The first couple moves don't always match up, so move a few
// times without drawing to get it ready
for (let i = 0; i < 3; i++)
  pos = drawNext(pos, dist, shape, false)

// Now we can draw our points!
for (let j = 0; j < dots; j++) {
  pos = drawNext(pos, dist, shape, true)
}




drawLines(shape)