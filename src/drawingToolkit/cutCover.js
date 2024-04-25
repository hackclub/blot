import { bounds } from "./bounds.js";
import { pointInPolylines } from "./pointInPolylines.js"
import { mergePolylines } from "./mergePolylines.js";

export const cut = (polylines0, polylines1, assumeClosed = true) => {
  if (assumeClosed) polylines1.forEach(poly => {
    const [x, y] = poly.at(0);
    poly.push([x, y]);
  })

  const result = [];
  polylines0.forEach(poly0 => {
    polylines1.forEach(poly1 => {
      result.push(...boolean(poly0, poly1, false))
    });
  });

  while (polylines0.length) polylines0.pop();
  result.forEach( p => polylines0.push(p));

  if (assumeClosed) polylines1.forEach(poly => {
    poly.pop();
  })

  return polylines0;
};

export const cover = (polylines0, polylines1, assumeClosed = true) => {
  if (assumeClosed) polylines1.forEach(poly => {
    const [x, y] = poly.at(0);
    poly.push([x, y]);
  })

  polylines1.forEach(poly1 => {
    polylines0 = helper(polylines0, poly1);
  });

  if (assumeClosed) polylines1.forEach(poly => {
    poly.pop();
  })

  return polylines0;

  function helper(polylines0, poly1) {
    const result = [];
    polylines0.forEach(poly0 => {
      result.push(...boolean(poly0, poly1, true))
    });

    while (polylines0.length) polylines0.pop();
    result.forEach( p => polylines0.push(p));

    return polylines0;
  }
};

function boolean(polyline0, polyline1, diff = true) {

  const bounds0 = bounds([ polyline0 ]);
  const bounds1 = bounds([ polyline1 ]);

  if (!doRectanglesOverlap(bounds0, bounds1)) {
    return diff ? [ polyline0 ] : []; 
  }

  const ndp = [];

  // Removed to fix a bug but removing it may have broken other things
  // function addToNdp(pt0, pt1) {
  //   const epsilon = 1e-4;
  //   for (let i = 0; i < ndp.length; i++) {
  //     const poly = ndp[i];
  //     if (poly.length === 0) continue;

  //     if (poly.at(0) && length(pt1, poly.at(0)) < epsilon) {
  //       poly.unshift(pt0);
  //       return;
  //     }

  //     if (poly.at(-1) && length(pt0, poly.at(-1)) < epsilon) {
  //       poly.push(pt1);
  //       return;
  //     }
  //   }

  //   ndp.push([pt0, pt1]);
  // }

  for (let i = 0; i < polyline0.length-1; i ++) {
    const ls0 = polyline0[i];
    const ls1 = polyline0[i + 1];
    // find all intersections with clip path
    const int = [];
    for (let j = 0; j < polyline1.length-1; j++) {
      const pint = segmentIntersect(
        ls0,
        ls1,
        polyline1[j],
        polyline1[j + 1],
      );
      if (pint !== false) {
        int.push(pint);
      }
    }

    if (int.length === 0) {
      // 0 intersections, inside or outside?
      if (diff === !pointInPolylines([ polyline1 ], ls0)) {
        ndp.push([ls0, ls1]);
        // addToNdp(ls0, ls1)
      }
    } else {
      int.push(ls0, ls1);
      // order intersection points on line ls.p1 to ls.p2
      const cmpx = ls1[0] - ls0[0];
      const cmpy = ls1[1] - ls0[1];
      int.sort(
        (a, b) =>
          (a[0] - ls0[0]) * cmpx +
          (a[1] - ls0[1]) * cmpy -
          (b[0] - ls0[0]) * cmpx -
          (b[1] - ls0[1]) * cmpy,
      );


      for (let j = 0; j < int.length - 1; j++) {
        const intX0 = int[j][0];
        const intX1 = int[j + 1][0];
        const intY0 = int[j][1];
        const intY1 = int[j + 1][1];
        const distSquared = (intX0 - intX1) ** 2 + (intY0 - intY1) ** 2;

        if (distSquared >= 0.001) {
          if (
            diff ===
            !pointInPolylines(
              [ polyline1 ],
              [
                (intX0 + intX1) / 2,
                (intY0 + intY1) / 2,
              ]
            )
          ) {
            // could merge here
            // addToNdp(int[j], int[j+1]);
            ndp.push([ int[j], int[j+1] ]);
          }
        }
      }
    }
  }

  const merged = mergePolylines(ndp.filter(list => list.length > 0));

  // while (polyline0.length) polyline0.pop();
  // ndp.forEach(pt => polyline0.push(pt));

  return merged;
}

function segmentIntersect(l1p1, l1p2, l2p1, l2p2) {
  const d =
    (l2p2[1] - l2p1[1]) * (l1p2[0] - l1p1[0]) -
    (l2p2[0] - l2p1[0]) * (l1p2[1] - l1p1[1]);
  if (d === 0) return false;
  const n_a =
    (l2p2[0] - l2p1[0]) * (l1p1[1] - l2p1[1]) -
    (l2p2[1] - l2p1[1]) * (l1p1[0] - l2p1[0]);
  const n_b =
    (l1p2[0] - l1p1[0]) * (l1p1[1] - l2p1[1]) -
    (l1p2[1] - l1p1[1]) * (l1p1[0] - l2p1[0]);
  const ua = n_a / d;
  const ub = n_b / d;
  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return [
      l1p1[0] + ua * (l1p2[0] - l1p1[0]),
      l1p1[1] + ua * (l1p2[1] - l1p1[1]),
    ];
  }
  return false;
}

function length([x0, y0], [x1, y1]) {
  return Math.sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2)
}

function doRectanglesOverlap(rect1, rect2) {
  return !(rect1.xMax < rect2.xMin || rect2.xMax < rect1.xMin || rect1.yMax < rect2.yMin || rect2.yMax < rect1.yMin);
}
