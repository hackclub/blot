//import { flattenSVG } from "./flatten-svg";
import { displace } from './displace.js'
import { resample } from './resample.js'
import { interpolatePolylines } from './interpolatePolylines.js'
import { getAngle } from './getAngle.js'
import { getNormal } from './getNormal.js'
import { trimPolylines } from './trimPolylines.js'
import { filterPolylines } from './filterPolylines.js'
import { breakPolylines } from './breakPolylines.js'
import { filterBreakPolylines } from './filterBreakPolylines.js'
import { mergePolylines } from './mergePolylines.js'

export class Turtle {
  constructor(start = [0, 0]) {
    start = createPoint(...start)
    this.drawing = true
    this.location = start
    this.angle = 0
    this.path = [[start]]
  }

  up() {
    if (!this.drawing) return this
    this.drawing = false
    this.path.push([createPoint(this.location[0], this.location[1])])
    return this
  }

  down() {
    this.drawing = true
    return this
  }

  goto([x, y]) {
    const lastPath = this.path.at(-1)
    if (this.drawing) {
      const [lastX, lastY] = this.location
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2)
      if (dist < 0.0001) return this
      lastPath.push(createPoint(x, y))
    } else {
      if (lastPath.length === 1) lastPath[0] = createPoint(x, y)
    }

    this.location = createPoint(x, y)

    return this
  }

  forward(distance) {
    const last = this.location
    const a = (this.angle / 180) * Math.PI
    const x = last[0] + distance * Math.cos(a)
    const y = last[1] + distance * Math.sin(a)

    this.goto([x, y])

    return this
  }

  arc(angle, radius) {
    const theta = Math.abs(angle)

    const length = ((radius * theta) / 180) * Math.PI

    const ogAngle = this.angle
    const thetaStep = 1
    const steps = theta / thetaStep
    const distanceStep = length / steps

    for (let i = 0; i < steps; i++) {
      if (angle >= 0) this.right(thetaStep)
      else this.left(thetaStep)

      this.forward(distanceStep)
    }

    this.setAngle(ogAngle - angle)

    return this
  }

  setAngle(theta) {
    this.angle = theta

    return this
  }

  right(theta) {
    this.angle -= theta

    return this
  }

  left(theta) {
    this.angle += theta

    return this
  }

  translate(to, origin) {
    this.location = translate(this.location, to, origin)

    iteratePath(this, pt => translate(pt, to, origin))
    return this
  }

  rotate(angle, origin) {
    if (!origin) origin = this.cc

    this.location = rotate(this.location, angle, origin)

    iteratePath(this, pt => rotate(pt, angle, origin))
    return this
  }

  scale(factor, origin) {
    if (!origin) origin = this.cc

    this.location = scale(this.location, factor, origin)

    iteratePath(this, pt => scale(pt, factor, origin))
    return this
  }

  displace(fn) {
    this.path.forEach(pl => displace(pl, fn))

    return this
  }

  iteratePath(fn) {
    iteratePath(this, fn)
    return this
  }

  originate() {
    this.translate([0, 0], this.cc)
    return this
  }

  fromSVG(svgString) {
    const parser = new DOMParser()
    const doc = parser.parseFromString(svgString, 'image/svg+xml')
    const svg = doc.querySelector('svg')
    const pls = flattenSVG(svg, { maxError: 0.001 })

    pls.forEach(pl => {
      this.up()
      pl.points.forEach((pt, i) => {
        this.goto([pt[0], pt[1]])
        if (i === 0) this.down()
      })
    })

    return this
  }

  join(...turtles) {
    turtles.forEach(t => {
      this.path.push(...t.path)
    })

    return this
  }

  merge(threshold = 0.01) {
    this.path = mergePolylines(this.path, threshold)

    return this
  }

  copy() {
    const newPath = JSON.parse(JSON.stringify(this.path))
    const t = new Turtle()
    t.path = newPath
    return t
  }

  resample(resolution) {
    this.path.forEach(pl => {
      const newPl = resample(pl, resolution)
      while (pl.length > 0) pl.pop()

      while (newPl.length > 0) {
        pl.push(newPl.shift())
      }
    })

    return this
  }

  interpolate(t) {
    return interpolatePolylines(this.path, t)
  }

  getAngle(t) {
    return getAngle(this.path, t)
  }

  getNormal(t) {
    return getNormal(this.path, t)
  }

  trim(t0, t1) {
    trimPolylines(this.path, t0, t1)
    return this
  }

  warp(fn, baseAngle = null) {
    // TODO: if baseAngle is undefined then normal, if fn, pass normal, if number use number

    if (fn instanceof Turtle) {
      const ogTurtle = fn
      fn = t => ogTurtle.interpolate(t)[1]
    }

    const tValues = tValuesForPoints(this.path)

    const newPts = []

    tValues.forEach((t, i) => {
      const pt = this.path.flat()[i]

      let angle = baseAngle
      if (angle === null) {
        angle = this.getAngle(t)
      } else if (typeof angle === 'function') {
        angle = angle(this.getAngle(t))
      } else if (typeof angle === 'number') {
        angle = angle
      }

      // const normal = this.getNormal(t);

      const y = fn(t)

      // const newPt = displacePointAlongNormal(pt, normal, y);
      // newPts.push(newPt);

      const newPoint = rotate([0, y], angle)

      newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]])
    })

    this.path.flat().forEach((pt, i, arr) => {
      pt[0] = newPts[i][0]
      pt[1] = newPts[i][1]
    })

    return this
  }

  extrema() {
    return extrema(this.path.flat())
  }

  get width() {
    const { xMin, xMax } = this.extrema()

    return xMax - xMin
  }

  get height() {
    const { yMin, yMax } = this.extrema()

    return yMax - yMin
  }

  get length() {
    return getTotalLength(this.path)
  }

  get start() {
    const pt = this.path.at(0).at(0)

    return [pt[0], pt[1]]
  }

  get end() {
    const pt = this.path.at(-1).at(-1)

    return [pt[0], pt[1]]
  }

  get lt() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMin, yMax]
  }

  get lc() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMin, (yMax + yMin) / 2]
  }

  get lb() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMin, yMin]
  }

  get ct() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [(xMax + xMin) / 2, yMax]
  }

  get cc() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [(xMax + xMin) / 2, (yMax + yMin) / 2]
  }

  get cb() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [(xMax + xMin) / 2, yMin]
  }

  get rt() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMax, yMax]
  }

  get rc() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMax, (yMax + yMin) / 2]
  }

  get rb() {
    const { xMin, xMax, yMin, yMax } = this.extrema()

    return [xMax, yMin]
  }
}

function iteratePath(turtle, fn) {
  const path = turtle.path
  const toRemove = new Set()
  const toBreak = new Set()

  const tValues = tValuesForPoints(path)

  let ptIndex = 0

  let newPts = {}
  for (let i = 0; i < path.length; i++) {
    for (let j = 0; j < path[i].length; j++) {
      const pt = path[i][j]

      const newPt = fn(pt, tValues[ptIndex])

      if (newPt === 'BREAK') {
        toBreak.add(`${i},${j}`)
      } else if (newPt === 'REMOVE') {
        toRemove.add(`${i},${j}`)
      } else if (Array.isArray(newPt)) {
        // const [ newX, newY ] = newPt;
        // path[i][j] = [ newX, newY ];
        newPts[ptIndex] = newPt
      }

      ptIndex++
    }
  }

  path.flat().forEach((pt, i) => {
    if (i in newPts) {
      pt[0] = newPts[i][0]
      pt[1] = newPts[i][1]
    }
  })

  filterBreakPolylines(
    path,
    (i, j, arr) => toRemove.has(`${i},${j}`),
    (i, j, arr) => toBreak.has(`${i},${j}`)
  )

  turtle.path = path.filter(pl => pl.length > 1)

  return turtle
}

function translate(pt, [x, y], origin = [0, 0]) {
  return createPoint(pt[0] + x - origin[0], pt[1] + y - origin[1])
}

function rotate(pt, angle, origin = [0, 0]) {
  let delta = (angle / 180) * Math.PI

  let hereX = pt[0] - origin[0]
  let hereY = pt[1] - origin[1]

  let newPoint = createPoint(
    hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
    hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
  )

  return newPoint
}

function scale(pt, factor, origin) {
  if (typeof factor === 'number') factor = [factor, factor]
  const [xFactor, yFactor] = factor
  const [x, y] = origin
  const newPoint = createPoint(
    (pt[0] - x) * xFactor + x,
    (pt[1] - y) * yFactor + y
  )

  return newPoint
}

function extrema(pts) {
  let xMin = Number.POSITIVE_INFINITY
  let xMax = Number.NEGATIVE_INFINITY
  let yMin = Number.POSITIVE_INFINITY
  let yMax = Number.NEGATIVE_INFINITY

  pts.forEach(p => {
    const [x, y] = p

    if (xMin > x) xMin = x
    if (xMax < x) xMax = x
    if (yMin > y) yMin = y
    if (yMax < y) yMax = y
  })

  return {
    xMin,
    xMax,
    yMin,
    yMax
  }
}

function createPoint(x, y) {
  const pt = [x, y]

  return pt
}

// function convertPt(pt) {
//   if (Array.isArray(pt)) {
//     return createPoint(pt[0], pt[1]);
//   } else {
//     return pt;
//   }
// }

function tValuesForPoints(polylines) {
  let totalLength = 0
  let lengths = []
  let tValues = [0]

  for (let i = 0; i < polylines.length; i++) {
    let polyline = polylines[i]
    for (let j = 1; j < polyline.length; j++) {
      let dx = polyline[j][0] - polyline[j - 1][0]
      let dy = polyline[j][1] - polyline[j - 1][1]
      let segmentLength = Math.sqrt(dx * dx + dy * dy)
      totalLength += segmentLength
      lengths.push(segmentLength)
    }
  }

  let accumulatedLength = 0
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i]
    tValues.push(accumulatedLength / totalLength)
  }

  return tValues
}

function getTotalLength(polylines) {
  let totalLength = 0
  for (let i = 0; i < polylines.length; i++) {
    let polyline = polylines[i]
    for (let j = 1; j < polyline.length; j++) {
      let dx = polyline[j][0] - polyline[j - 1][0]
      let dy = polyline[j][1] - polyline[j - 1][1]
      totalLength += Math.sqrt(dx * dx + dy * dy)
    }
  }
  return totalLength
}

function displacePointAlongNormal([px, py], normal, magnitude) {
  // Scale the normal by the magnitude
  let dx = normal[0] * magnitude
  let dy = normal[1] * magnitude

  // Translate the point by the scaled normal
  let newPx = px + dx
  let newPy = py + dy

  return [newPx, newPy]
}
