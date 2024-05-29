import { bounds } from "./bounds.js";

export const translate = (polylines, to, origin = [0, 0]) => {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  polylines.flat().forEach(pt => {
    const [x, y] = translatePt(pt, to, origin);
    pt[0] = x;
    pt[1] = y;
  });

  return ogPolylines;
}

export const rotate = (polylines, angle, origin) => {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  if (!origin) origin = bounds(polylines).cc

  polylines.flat().forEach(pt => {
    const [x, y] = rotatePt(pt, angle, origin);
    pt[0] = x;
    pt[1] = y;
  });

  return ogPolylines
}

export const scale = (polylines, factor, origin) => {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  if (!origin) origin = bounds(polylines).cc

  polylines.flat().forEach(pt => {
    const [x, y] = scalePt(pt, factor, origin);
    pt[0] = x;
    pt[1] = y;
  });

  return ogPolylines
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