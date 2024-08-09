/*
@title: Nightsky
@author: khrj
@snapshot: craterless.png
*/

/* START OF CONFIG */

// randomly rotate each star
const enableRotation = false

// give the moon craters
const enableCraters = true

// set a value to set the number of stars of that type to generate
// set null to pick randomly from 1 to 4
const stars = {
  simpleStar: null,
  crossStar: null,
  classicStar: null,
  classicStarUnfilled: null,
  curveStar: 10,
  arcStar: null
}

/* END OF CONFIG */

const randInt = (a,b) => Math.floor(Math.random() * (b-a)) + a
for (const [type, count] of Object.entries(stars)) {
  if (count === null) {
    stars[type] = randInt(1, 5)
  }
}

/* drawing starts */

const width = 100;
const height = 100;

setDocDimensions(width, height);

const times = (f, n) => {
  for (let i = 0; i < n; i++) f()
}

const finalLines = [];

const simpleStar = () => {
  return [
    [[40, 50], [60, 50]],
    [[50, 40], [50, 60]]
  ]
}

const crossStar = () => {
  return bt.rotate(
    simpleStar(),
    45
  )
}

const classicStar = () => {
  const t = new bt.Turtle()
  const size = 10

  t.left(90)
  t.right(18)

  times(() => {
    t.forward(size)
    t.right(180 - 36)
  }, 5)

  return t.lines()
}

const classicStarUnfilled = () => {
  const t = new bt.Turtle()
  const size = 10

  t.left(90)
  t.right(18)

  times(() => {
    t.forward(size)
    t.left(90 - 18)
    t.forward(size)
    t.right(180 - 36)
  }, 5)

  return t.lines()
}

const curveStar = () => {
  return [bt.catmullRom([
    [0, 50],
    [40, 60],
    [50, 100],
    [60, 60],
    [100, 50],
    [60, 40],
    [50, 0],
    [40, 40],
    [0, 50]
  ])]
}

const arcStar = () => {
  const t = new bt.Turtle()
  const radius = 10

  times(() => {
    t.arc(90, radius)
    t.right(180)
  }, 4)

  return t.lines()
}

const circle = (r) => {
  const t = new bt.Turtle()
  t.arc(360, r)
  return t.lines()
}

const starCount = Object.values(stars).reduce((a,b) => a+b)
const n = Math.floor(Math.sqrt(starCount)) + 1

console.log(starCount)

const available = []

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    available.push([i, j])
  }
}

const takeAvailable = () => available.splice(randInt(0, available.length), 1)[0]

const padding = 10
const offsetW = Math.floor((width - (2 * padding)) / n)
const offsetH = Math.floor((height - (2 * padding)) / n)


for (const [type, count] of Object.entries(stars)) {
  times(() => {
    const fn = eval(type)
    const star = fn()
    const bounds = bt.bounds(star)

    const [gridX, gridY] = takeAvailable()
    const posX = gridX * offsetW + randInt(0, offsetW) + padding
    const posY = gridY * offsetH + randInt(0, offsetH) + padding

    const size = randInt(2, 5)
    const scale = size / bounds.width

    bt.scale(star, scale)
    if (enableRotation) bt.rotate(star, randInt(0, 360))
    bt.translate(star, [posX, posY], bounds.cc)
    bt.join(finalLines, star)
  }, count)
}

const moon = () => {
  const t = new bt.Turtle()
  const size = 35
  
  t.arc(180, size)
  t.right(209)
  t.arc(-122, 40)
    
  const lines = t.lines()
  const arc = lines[0]
  
  const bounds = bt.bounds(lines)

  // craters
  if (enableCraters) times(() => {
    const c = circle(2)

    bt.translate(c, [randInt(0, 35), randInt(0, 70)], bt.bounds(c).cc)
    bt.cut(c, lines)
    bt.join(lines, c)
  }, 5)
  
  bt.rotate(lines, -40)
  bt.translate(lines, [width/2,height/2], bt.bounds(lines).cc)

  return lines
}

const theMoon = moon()
bt.scale(theMoon, 0.5)
bt.translate(theMoon, [72,76], bt.bounds(theMoon).cc)

const guard = circle(25)
bt.translate(guard, [72,76], bt.bounds(guard).cc)
bt.cover(finalLines, guard)

bt.join(finalLines, theMoon)

drawLines(finalLines)
