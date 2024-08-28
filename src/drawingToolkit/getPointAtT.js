import { assertArgs } from './assert'

export function getPointAtT(polylines, t) {
  assertArgs(arguments, ['polylines', 'number'], 'bt.getPoint')

  t = Math.max(t, 0)
  t = Math.min(t, 1)

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

  // Find the polyline where the target point is located
  let accumulatedLength = 0
  for (let i = 0; i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      // Find the exact point within this polyline
      let polyline = polylines[i]
      for (let j = 1; j < polyline.length; j++) {
        let dx = polyline[j][0] - polyline[j - 1][0]
        let dy = polyline[j][1] - polyline[j - 1][1]
        let segmentLength = Math.sqrt(dx * dx + dy * dy)

        if (targetLength <= accumulatedLength + segmentLength) {
          // Interpolate between the two points in this segment
          let segmentT = (targetLength - accumulatedLength) / segmentLength
          let x = polyline[j - 1][0] + dx * segmentT
          let y = polyline[j - 1][1] + dy * segmentT
          return [x, y]
        }

        accumulatedLength += segmentLength
      }
    }
    accumulatedLength += lengths[i]
  }

  // If 't' is 1, return the last point
  let lastPolyline = polylines[polylines.length - 1]
  return lastPolyline[lastPolyline.length - 1]
}
