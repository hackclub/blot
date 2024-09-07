import { assertArgs } from './assert'

export function catmullRom(controlPoints, segments = 100) {
  assertArgs(arguments, ['polyline', 'number?'], 'bt.catmullRom');

  const isClosed = (points) => {
    const start = points[0];
    const end = points[points.length - 1];
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < 1e-5; // Adjust as necessary for your application
  };

  if (!isClosed(controlPoints)) {
    controlPoints = [[...controlPoints[0]], ...controlPoints, [...controlPoints[controlPoints.length - 1]]];
  } else {
    controlPoints = [[...controlPoints.at(-2)], ...controlPoints, [...controlPoints.at(1)]];
  }

  const result = [];
  for (let i = 0; i < controlPoints.length - 3; i++) {
    for (let t = 0; t <= segments; t++) {
      const t1 = t / segments;
      const t2 = t1 * t1;
      const t3 = t2 * t1;
      const p0 = controlPoints[i];
      const p1 = controlPoints[i + 1];
      const p2 = controlPoints[i + 2];
      const p3 = controlPoints[i + 3];

      const x = 0.5 * ((-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3 +
                       (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
                       (-p0[0] + p2[0]) * t1 + 2 * p1[0]);
      const y = 0.5 * ((-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3 +
                       (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
                       (-p0[1] + p2[1]) * t1 + 2 * p1[1]);
      result.push([x, y]);
    }
  }
  return result;
}