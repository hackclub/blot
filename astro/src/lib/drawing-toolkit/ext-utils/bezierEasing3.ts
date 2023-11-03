import { type Point } from '../types'

function calculateBezierPoint(
  t: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point
) {
  let u = 1 - t
  let tt = t * t
  let uu = u * u
  let uuu = uu * u
  let ttt = tt * t

  let p = [uuu * p0[0], uuu * p0[1]] // u^3 * p0
  p[0] += 3 * uu * t * p1[0] // 3u^2t * p1
  p[1] += 3 * uu * t * p1[1]
  p[0] += 3 * u * tt * p2[0] // 3ut^2 * p2
  p[1] += 3 * u * tt * p2[1]
  p[0] += ttt * p3[0] // t^3 * p3
  p[1] += ttt * p3[1]

  return p
}

function findTForGivenX(
  xTarget: number,
  p0: Point,
  p1: Point,
  p2: Point,
  p3: Point
) {
  let tolerance = 0.00001
  let t = 0.5 // Start with approximate solution
  let iterations = 0

  while (iterations < 1000) {
    // Max iterations to prevent infinite loop
    let p = calculateBezierPoint(t, p0, p1, p2, p3)
    let difference = p[0] - xTarget
    if (Math.abs(difference) < tolerance) {
      return t
    } else {
      t = t - difference / 2 // Approximate a new t value
    }
    iterations++
  }
  return t // Return the approximate t value
}

function getYForX(x: number, p0: Point, p1: Point, p2: Point, p3: Point) {
  let t = findTForGivenX(x, p0, p1, p2, p3)
  let p = calculateBezierPoint(t, p0, p1, p2, p3)
  return p[1]
}

export function bezierEasing(
  initial: number,
  p0: Point,
  p1: Point,
  final: number
) {
  return (x: number) =>
    getYForX(
      x,
      [0, initial],
      [Math.min(Math.max(0, p0[0]), 1), p0[1]],
      [Math.min(Math.max(0, p1[0]), 1), p1[1]],
      [1, final]
    )
}
