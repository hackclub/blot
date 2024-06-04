import { translatePt, rotatePt } from "./affineTransformations.js";
import { turnForward } from "./turnForward.js";

export function arc(polylines, angle, radius) {
  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  if (angle === 0 || radius === 0) return polylines;

  if (polylines.length === 0) {
    polylines.push([ [0, 0] ])
  }
  
  const n = 64;
  let pts = [ ];
  const a = angle/180*Math.PI;
  const lp = polylines.at(-1).at(-1);
  const la = getLastAngle(polylines);

  const getX = (theta, r) => r*Math.cos(theta);
  const getY = (theta, r) => r*Math.sin(theta);

  for ( let i = 0; i <= n; i++) {
    const theta = a/n*i;
    const x = getX(theta, radius);
    const y = getY(theta, radius);
    pts.push([ x, y ]);
  }

  pts = pts.map(pt => translatePt(pt, lp, pts[0]));
  pts = pts.map(pt => rotatePt(pt, la + (angle < 0 ? 90 : -90), pts[0]));

  pts.slice(1).forEach(pt => polylines.at(-1).push(pt));

  const curAngle = getLastAngle(polylines);
  turnForward(polylines, (angle+la)-curAngle, radius/1_000_000_000_000);

  return ogPolylines;
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