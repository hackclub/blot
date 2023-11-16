import type { Polyline } from '../types'

export function filterBreakPolylines(
  polylines: Polyline[],
  filterFunction: (x: number, y: number, polylines: Polyline[]) => boolean,
  breakFunction: (x: number, y: number, polylines: Polyline[]) => boolean
) {
  for (let i = polylines.length - 1; i >= 0; i--) {
    for (let j = polylines[i].length - 1; j >= 0; j--) {
      // Call the filter function, if it returns false, remove the point
      if (filterFunction(i, j, polylines)) {
        polylines[i].splice(j, 1)
      } else if (breakFunction(i, j, polylines)) {
        // Call the break function, if it returns true, break the polyline at this point
        // If the break point is at the start or end of the polyline, just remove it
        if (j === 0 || j === polylines[i].length - 1) {
          polylines[i].splice(j, 1)
        } else {
          // Otherwise, split the polyline into two at the break point
          let polyline1 = polylines[i].slice(0, j)
          let polyline2 = polylines[i].slice(j + 1)

          // Replace the original polyline with the first part
          polylines[i] = polyline1

          // Insert the second part after the first part
          polylines.splice(i + 1, 0, polyline2)
        }
      }
    }

    // If a polyline has only one point, remove it
    if (polylines[i].length === 1) {
      polylines.splice(i, 1)
    }
  }
}
