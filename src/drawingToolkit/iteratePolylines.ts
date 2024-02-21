export function iteratePolylines(polylines, fn) {
  const toRemove = new Set()
  const toBreak = new Set()

  // t should maybe be for the current polyline, but that would mess up other things
  const tValues = tValuesForPoints(polylines)

  let ptIndex = 0

  let newPts = {}
  for (let i = 0; i < polylines.length; i++) {
    for (let j = 0; j < polylines[i].length; j++) {
      const pt = polylines[i][j]

      const newPt = fn(pt, tValues[ptIndex])

      if (newPt === 'BREAK') {
        toBreak.add(`${i},${j}`)
      } else if (newPt === 'REMOVE') {
        toRemove.add(`${i},${j}`)
      } else if (Array.isArray(newPt)) {
        newPts[ptIndex] = newPt
      }

      ptIndex++
    }
  }

  polylines.flat().forEach((pt, i) => {
    if (i in newPts) {
      pt[0] = newPts[i][0]
      pt[1] = newPts[i][1]
    }
  })

  filterBreakPolylines(
    polylines,
    (i, j, arr) => toRemove.has(`${i},${j}`),
    (i, j, arr) => toBreak.has(`${i},${j}`)
  )

  return polylines
}

function tValuesForPoints(polylines) {
  let totalLength = 0
  let lengths = []
  let tValues = []

  let segmentLength = 0
  for (let i = 0; i < polylines.length; i++) {
    let polyline = polylines[i]
    for (let j = 0; j < polyline.length; j++) {
      if (j > 0) {
        let dx = polyline[j][0] - polyline[j - 1][0]
        let dy = polyline[j][1] - polyline[j - 1][1]
        segmentLength = Math.sqrt(dx * dx + dy * dy)
        totalLength += segmentLength
      }

      lengths.push(segmentLength)
    }
  }

  let accumulatedLength = 0
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i]
    tValues.push(accumulatedLength / totalLength)
  }

  return tValues
}

function filterBreakPolylines(polylines, filterFunction, breakFunction) {
  for (let i = polylines.length - 1; i >= 0; i--) {
    for (let j = polylines[i].length - 1; j >= 0; j--) {
      if (filterFunction(i, j, polylines)) {
        polylines[i].splice(j, 1)
      } else if (breakFunction(i, j, polylines)) {
        if (j === 0 || j === polylines[i].length - 1) {
          polylines[i].splice(j, 1)
        } else {
          let polyline1 = polylines[i].slice(0, j)
          let polyline2 = polylines[i].slice(j + 1)

          polylines[i] = polyline1

          polylines.splice(i + 1, 0, polyline2)
        }
      }
    }

    if (polylines[i].length === 1) {
      polylines.splice(i, 1)
    }
  }

  for (let i = 0; i < polylines.length; ) {
    if (polylines[i].length < 0) {
      polylines.splice(i, 1);
    } else {
      i++;
    }
  }

  return polylines
}