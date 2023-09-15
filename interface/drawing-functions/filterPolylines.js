export function filterPolylines(polylines, filterFunction) {
  for (let i = polylines.length - 1; i >= 0; i--) {
    for (let j = polylines[i].length - 1; j >= 0; j--) {
      // Call the filter function, if it returns false, remove the point
      if (!filterFunction(i, j, polylines)) {
        polylines[i].splice(j, 1)
      }
    }
    // If there's only one point left in the polyline, remove it too
    if (polylines[i].length === 1) {
      polylines[i].splice(0, 1)
    }

    // If the polyline is empty, remove it from the array
    if (polylines[i].length === 0) {
      polylines.splice(i, 1)
    }
  }
}
