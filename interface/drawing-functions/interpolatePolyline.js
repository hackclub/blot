export function interpolatePolyline(t, polyline) {
  // Normalize t to the total length of the polyline
  let totalLength = 0
  for (let i = 0; i < polyline.length - 1; i++) {
    let dx = polyline[i + 1][0] - polyline[i][0]
    let dy = polyline[i + 1][1] - polyline[i][1]
    totalLength += Math.sqrt(dx * dx + dy * dy)
  }

  let targetLength = t * totalLength
  let length = 0

  for (let i = 0; i < polyline.length - 1; i++) {
    let dx = polyline[i + 1][0] - polyline[i][0]
    let dy = polyline[i + 1][1] - polyline[i][1]
    let segmentLength = Math.sqrt(dx * dx + dy * dy)

    if (length + segmentLength > targetLength) {
      let segmentT = (targetLength - length) / segmentLength
      return {
        x: polyline[i][0] + dx * segmentT,
        y: polyline[i][1] + dy * segmentT
      }
    }

    length += segmentLength
  }

  // If for some reason we've reached the end without returning, return the last vertex
  return polyline[polyline.length - 1]
}
