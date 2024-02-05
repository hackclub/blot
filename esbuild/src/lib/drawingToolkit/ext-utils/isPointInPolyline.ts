import { Point, Polyline } from '../types'

export function isPointInPolyline(point: Point, polyline: Polyline) {
  if (!isClosed(polyline)) {
    return false // If the polyline is open, no point is inside it.
  }

  let x = point[0],
    y = point[1]
  let inside = false

  // Iterate over polygon segments
  for (let i = 0, j = polyline.length - 1; i < polyline.length; j = i++) {
    let xi = polyline[i][0],
      yi = polyline[i][1]
    let xj = polyline[j][0],
      yj = polyline[j][1]

    // Check if point is in polygon using the ray casting algorithm
    let intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export function inside(point: Point, polyline: Polyline) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  if (!isClosed(polyline)) {
    return false // If the polyline is open, no point is inside it.
  }

  const x = point[0],
    y = point[1]

  let inside = false
  for (let i = 0, j = polyline.length - 1; i < polyline.length; j = i++) {
    const xi = polyline[i][0],
      yi = polyline[i][1]
    const xj = polyline[j][0],
      yj = polyline[j][1]

    const intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

function isClosed(polyline: Polyline, epsilon = 1e-4) {
  const start = polyline[0]
  const end = polyline[polyline.length - 1]

  return (
    Math.abs(start[0] - end[0]) < epsilon &&
    Math.abs(start[1] - end[1]) < epsilon
  )
}
