import { assertArgs } from './assert.js'
import { ClipperLib } from "./clipper_unminified.js";

const overlap = (p0, p1) => 0.00000001 > Math.abs(p0[0] - p1[0]) + Math.abs(p0[1] - p1[1]);
const isClosed = shape => {
  if (shape.length === 0) return true;
  const start = shape[0][0];
  const end = shape.at(-1).at(-1);
  const closed = overlap(start, end);
  return closed;
}

export function offset(polylines, delta, ops = {}) {
  assertArgs(arguments, ['polylines', 'number', 'any?'], 'bt.offset')

  const ogPolylines = polylines;
  if (typeof polylines.at(0)?.at(0) === "number") polylines = [polylines];

  /*
    {
      joinType
      endType
      miterLimit
      arcTolerance
    }
  */

  const endTypes = {
    openSquare: 0,
    openRound: 1,
    openButt: 2,
    closedLine: 3,
    closedPolygon: 4
  }

  const joinTypes = {
    square: 0,
    round: 1,
    miter: 2
  }

  let et = ops.endType;
  if (!et) {
    const start = polylines[0][0];
    const end = polylines.at(-1).at(-1);
    const closed = overlap(start, end);
    et = closed ? 'closedPolygon' : "openRound";
  }

  let jt = ops.joinType;
  if (!(jt in joinTypes)) jt = "round";

  const miterLimit = ops.miterLimit || 2;
  const arcTolerance = ops.arcTolerance || 0.1;

  const endType = endTypes[et];
  const joinType = joinTypes[jt];

  const toClipperFormat = pl => pl.map( 
    ([ x, y ]) => ({ X:x, Y:y }) 
  )

  const fromClipperFormat = pl => pl.map( 
    ({ X, Y }) => [ X, Y ] 
  )

  const subjectClosed = isClosed(polylines);
  const clipPaths = polylines.map(toClipperFormat);
  const co = new ClipperLib.ClipperOffset(miterLimit, arcTolerance);
  
  co.AddPaths(clipPaths, joinType, endType);
  const result = new ClipperLib.Paths();
  co.Execute(result, delta);

  const final = result.map(fromClipperFormat);

  while (polylines.length > final.length) polylines.pop();

  final.forEach((pl, i) =>  {
    polylines[i] = pl;

    polylines[i].push([
      pl[0][0],
      pl[0][1],
    ])
    
  });

  return ogPolylines;
}