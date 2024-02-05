import { Polyline } from '../types'

export function getNormal(polylines: Polyline[], t: number) {
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
          // Calculate the normal
          let magnitude = Math.sqrt(dx * dx + dy * dy)
          let normal = [dy / magnitude, -dx / magnitude] // [dy, -dx] gives a normal. We normalize it by dividing by the magnitude
          return normal
        }

        accumulatedLength += segmentLength
      }
    }
    accumulatedLength += lengths[i]
  }
}
