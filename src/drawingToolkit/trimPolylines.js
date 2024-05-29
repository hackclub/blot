export function trimPolylines(polylines, t1, t2) {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  t1 = Math.max(0, Math.min(1, t1));
  t2 = Math.max(0, Math.min(1, t2));

  let totalLength = getTotalLength(polylines);
  let targetLength1 = totalLength * t1;
  let targetLength2 = totalLength * t2;

  let newPolylines = [];
  let accumulatedLength = 0;

  for (let i = 0; i < polylines.length; i++) {
    let polyline = polylines[i];
    let newPolyline = [];

    for (let j = 1; j < polyline.length; j++) {
      let segment = [polyline[j - 1], polyline[j]];
      let dx = segment[1][0] - segment[0][0];
      let dy = segment[1][1] - segment[0][1];
      let segmentLength = Math.sqrt(dx * dx + dy * dy);

      let nextAccumulatedLength = accumulatedLength + segmentLength;

      if (nextAccumulatedLength >= targetLength1 && accumulatedLength <= targetLength2) {
        if (accumulatedLength < targetLength1) {
          // Interpolate start point
          let t = (targetLength1 - accumulatedLength) / segmentLength;
          newPolyline.push([
            segment[0][0] + t * dx,
            segment[0][1] + t * dy,
          ]);
        } else if (newPolyline.length === 0) {
          // If this is the first segment after targetLength1, add the start point
          newPolyline.push(segment[0]);
        }

        if (nextAccumulatedLength > targetLength2) {
          // Interpolate end point and break
          let t = (targetLength2 - accumulatedLength) / segmentLength;
          newPolyline.push([
            segment[0][0] + t * dx,
            segment[0][1] + t * dy,
          ]);
          break;
        } else {
          newPolyline.push(segment[1]);
        }
      }

      accumulatedLength += segmentLength;

      if (accumulatedLength >= targetLength2) break;
    }

    if (newPolyline.length > 0) {
      newPolylines.push(newPolyline);
    }

    if (accumulatedLength >= targetLength2) break;
  }

  while (polylines.length) polylines.pop();
  newPolylines.forEach(pl => polylines.push(pl));

  return ogPolylines;
}

function getTotalLength(polylines) {
  let totalLength = 0;
  for (let polyline of polylines) {
    for (let i = 1; i < polyline.length; i++) {
      let dx = polyline[i][0] - polyline[i - 1][0];
      let dy = polyline[i][1] - polyline[i - 1][1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return totalLength;
}