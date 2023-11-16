import type { Polyline } from '../types'

export function getAngle(polylines: Polyline[], t: number) {
  // Calculate the total length of all polylines
  let totalLength = 0
  let lengths = polylines.map(polyline => {
    let length = 0
    for (let i = 1; i < polyline.length; i++) {
      let dx = polyline[i][0] - polyline[i - 1][0]
      let dy = polyline[i][1] - polyline[i - 1][1]
      length += Math.sqrt(dx * dx + dy * dy)
    }
    totalLength += length
    return length
  })

  // Find the target length at 't'
  let targetLength = totalLength * t

  // Find the polyline and the segment where the target point is located
  let accumulatedLength = 0
  for (let i = 0; i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline = polylines[i]
      for (let j = 1; j < polyline.length; j++) {
        let dx = polyline[j][0] - polyline[j - 1][0]
        let dy = polyline[j][1] - polyline[j - 1][1]
        let segmentLength = Math.sqrt(dx * dx + dy * dy)

        if (targetLength <= accumulatedLength + segmentLength) {
          // Calculate the angle
          let angle = Math.atan2(dy, dx) // Angle in radians
          return angle * (180 / Math.PI) // Convert to degrees
        }

        accumulatedLength += segmentLength
      }
    }
    accumulatedLength += lengths[i]
  }

  // If 't' is 1, calculate the angle at the last point
  let lastPolyline = polylines[polylines.length - 1]
  let dx =
    lastPolyline[lastPolyline.length - 1][0] -
    lastPolyline[lastPolyline.length - 2][0]
  let dy =
    lastPolyline[lastPolyline.length - 1][1] -
    lastPolyline[lastPolyline.length - 2][1]
  let angle = Math.atan2(dy, dx) // Angle in radians
  return angle * (180 / Math.PI) // Convert to degrees
}
