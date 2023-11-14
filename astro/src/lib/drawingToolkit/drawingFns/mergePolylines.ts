import type { Point, Polyline } from '../types'

function calculateDistance(point1: Point, point2: Point) {
  // Use Euclidean distance formula
  let dx = point2[0] - point1[0]
  let dy = point2[1] - point1[1]
  return Math.sqrt(dx * dx + dy * dy)
}

function isClosed(polyline: Polyline, epsilon = 1e-3) {
  let start = polyline[0]
  let end = polyline[polyline.length - 1]
  return (
    Math.abs(start[0] - end[0]) < epsilon &&
    Math.abs(start[1] - end[1]) < epsilon
  )
}

export function mergePolylines(
  polylines: Polyline[],
  threshold: number
): Polyline[] {
  let n = polylines.length
  for (let i = 0; i < n - 1; i++) {
    if (isClosed(polylines[i])) continue // Skip if polyline i is already closed

    for (let j = i + 1; j < n; j++) {
      if (isClosed(polylines[j])) continue // Skip if polyline j is already closed

      // Check if the end of polyline i is close to the start of polyline j
      let d1 = calculateDistance(
        polylines[i][polylines[i].length - 1],
        polylines[j][0]
      )
      if (d1 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j])
        polylines.splice(j, 1) // remove polyline j
        n--
        j--
        continue
      }

      // Check if the end of polyline i is close to the end of polyline j
      let d2 = calculateDistance(
        polylines[i][polylines[i].length - 1],
        polylines[j][polylines[j].length - 1]
      )
      if (d2 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j].reverse())
        polylines.splice(j, 1) // remove polyline j
        n--
        j--
        continue
      }

      // Check if the start of polyline i is close to the start of polyline j
      let d3 = calculateDistance(polylines[i][0], polylines[j][0])
      if (d3 <= threshold) {
        polylines[i] = polylines[j].concat(polylines[i])
        polylines.splice(j, 1) // remove polyline j
        n--
        j--
        continue
      }

      // Check if the start of polyline i is close to the end of polyline j
      let d4 = calculateDistance(
        polylines[i][0],
        polylines[j][polylines[j].length - 1]
      )
      if (d4 <= threshold) {
        polylines[i] = polylines[j].reverse().concat(polylines[i])
        polylines.splice(j, 1) // remove polyline j
        n--
        j--
      }
    }
  }
  return polylines
}
