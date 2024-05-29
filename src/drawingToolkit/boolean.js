import { ClipperLib } from "./clipper_unminified.js";


export function boolean(subjectPaths, clipPaths, type, ops = {}) {
  const ogPolylines = subjectPaths;
  if (typeof subjectPaths.at(0)?.at(0) === "number") subjectPaths = [subjectPaths];
  if (typeof clipPaths.at(0)?.at(0) === "number") clipPaths = [clipPaths];

  const toClipperFormat = pl => {
    return pl.map( 
    ([ x, y ]) => ({ X:x, Y:y }) 
  )}

  const fromClipperFormat = pl => pl.map( 
    ({ X, Y }) => [ X, Y ] 
  )

  const subjectClosed = ops.subjectClosed ?? true;
  const clipClosed = ops.clipClosed ?? true;

  const tempSubjectPaths = subjectPaths.map(toClipperFormat);
  clipPaths = clipPaths.map(toClipperFormat);

  const result = new ClipperLib.Paths();
  const clipper = new ClipperLib.Clipper();

  clipper.AddPaths(tempSubjectPaths, ClipperLib.PolyType.ptSubject, subjectClosed);
  clipper.AddPaths(clipPaths, ClipperLib.PolyType.ptClip, clipClosed);

  const clipTypes = {
    "intersection": ClipperLib.ClipType.ctIntersection,
    "union": ClipperLib.ClipType.ctUnion,
    "difference": ClipperLib.ClipType.ctDifference,
    "xor": ClipperLib.ClipType.ctXor,
  }
  clipper.Execute(clipTypes[type], result);

  const final = result.map(fromClipperFormat);

  while (subjectPaths.length > final.length) subjectPaths.pop();

  final.forEach((pl, i) =>  {
    subjectPaths[i] = pl;

    subjectPaths[i].push([
      pl[0][0],
      pl[0][1],
    ])
    
  });

  return ogPolylines;
}