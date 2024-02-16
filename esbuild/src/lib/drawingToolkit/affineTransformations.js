import { iteratePolylines } from "./iteratePolylines.js";
import { bounds } from "./bounds.js";

export const translate = (polylines, to, origin = [0, 0]) => {
  iteratePolylines(polylines, pt => translatePt(pt, to, origin));
  return polylines;
}

export const rotate = (polylines, angle, origin) => {
  if (!origin) origin = bounds(polylines).cc

  iteratePolylines(polylines, pt => rotatePt(pt, angle, origin))
  return polylines
}

export const scale = (polylines, factor, origin) => {
  if (!origin) origin = bounds(polylines).cc

  iteratePolylines(polylines, pt => scalePt(pt, factor, origin))
  return polylines
}

export function translatePt(pt, [x, y], origin = [0, 0]) {
  return [pt[0] + x - origin[0], pt[1] + y - origin[1]]
}

export function rotatePt(pt, angle, origin = [0, 0]) {
  let delta = (angle / 180) * Math.PI

  let hereX = pt[0] - origin[0]
  let hereY = pt[1] - origin[1]

  let newPoint = [
    hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
    hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
  ]

  return newPoint
}

export function scalePt(pt, factor, origin) {
  if (typeof factor === 'number') factor = [factor, factor]
  const [xFactor, yFactor] = factor
  const [x, y] = origin
  const newPoint = [(pt[0] - x) * xFactor + x, (pt[1] - y) * yFactor + y]

  return newPoint
}