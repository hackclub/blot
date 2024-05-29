export function turnForward(polylines, angle, distance) {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  if (polylines.length === 0) {
    polylines.push([ [0, 0] ])
  }

  let totalAngle = typeof angle === "function"
    ? angle(getLastAngle(polylines))
    : getLastAngle(polylines) + angle;

  const last = polylines.at(-1).at(-1);
  const a = (totalAngle / 180) * Math.PI
  const x = last[0] + distance * Math.cos(a)
  const y = last[1] + distance * Math.sin(a)

  polylines.at(-1).push([x, y]);

  return ogPolylines
}

function getLastAngle(polylines) {
  if (!Array.isArray(polylines) || polylines.length === 0) {
      return 0;
  }

  const lastPolyline = polylines[polylines.length - 1];

  if (!Array.isArray(lastPolyline) || lastPolyline.length < 2) {
      return 0;
  }

  const [x1, y1] = lastPolyline[lastPolyline.length - 2];
  const [x2, y2] = lastPolyline[lastPolyline.length - 1];

  const deltaX = x2 - x1;
  const deltaY = y2 - y1;

  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  return angle;
}