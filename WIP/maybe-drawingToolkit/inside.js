import { segmentIntersect } from "./segmentIntersect.js";
import { getIntersection } from "./getIntersection.js";

export function inside(polylines, pt) {
  let int = 0;

  let intersections = [];

  polylines.forEach(polyline => {
    for (let i = 0; i < polyline.length-1; i++) {
      const distanceToSegment = pDistance(pt, polyline[i], polyline[i+1]);
      if (distanceToSegment < 1e-4) return;

      const intersection = getIntersection(
          pt, 
          [pt[0], Number.MAX_SAFE_INTEGER],
          polyline[i], 
          polyline[i + 1]
        );

      // could be an issue if it intersects on a corner
      if (intersection) {

        if (intersections.length === 0) {
          intersections.push(intersection);
          int++;
          continue;
        } 
        
        // should sort pts along line maybe?
        const distanceFromLast = length(intersection, intersections.at(-1));
        if (distanceFromLast < 1e-4) continue;

        intersections.push(intersection);
        int++;
      }
    }
  });

  const isInside = (int & 1) === 1; // if even, you're outside; if odd, you're inside

  return isInside;
}

function length([x0, y0], [x1, y1]) {
  return Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
}

function pDistance([x, y], [x1, y1], [x2, y2]) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
      param = dot / len_sq;

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

