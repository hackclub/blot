import { getIntersection } from "./getIntersection.js";

export function getIntersections(polylines1, polylines2) {
  const intersections = [];

  console.log(polylines1, polylines2);

  for (let i = 0; i < polylines1.length - 1; i++) {
    let seenIntersection = false;
    for (let j = 0; j < polylines2.length - 1; j++) {
      const intersection = getIntersection(
        polylines1[i], polylines1[i + 1],
        polylines2[j], polylines2[j + 1]
      );
      console.log(intersection);
      if (
        intersection 
        && seenIntersection 
        && length(intersection, intersections.at(-1)) > 1e-4
      ) {
        intersections.push(intersection);
      }

      if (
        intersection && !seenIntersection
      ) {
        intersections.push(intersection);
        seenIntersection = true;
      }
    }
  }

  return intersections;
}

function length([x0, y0], [x1, y1]) {
  return Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
}