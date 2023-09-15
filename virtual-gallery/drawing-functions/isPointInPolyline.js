export function isPointInPolyline(point, polyline) {
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

export function inside(point, polyline) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  if (!isClosed(polyline)) {
    return false // If the polyline is open, no point is inside it.
  }

  var x = point[0],
    y = point[1]

  var inside = false
  for (var i = 0, j = polyline.length - 1; i < polyline.length; j = i++) {
    var xi = polyline[i][0],
      yi = polyline[i][1]
    var xj = polyline[j][0],
      yj = polyline[j][1]

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

function isClosed(polyline, epsilon = 1e-4) {
  let start = polyline[0]
  let end = polyline[polyline.length - 1]

  return (
    Math.abs(start[0] - end[0]) < epsilon &&
    Math.abs(start[1] - end[1]) < epsilon
  )
}
