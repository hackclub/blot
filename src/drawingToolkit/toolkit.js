import { boolean } from "./boolean.js";
import { Turtle } from "./Turtle.js";
import { cut, cover } from "./cutCover.js";
import { pointInPolylines } from "./pointInPolylines.js";
import { iteratePolylines } from "./iteratePolylines.js";
import { mergePolylines } from "./mergePolylines.js";
import { scale, rotate, translate } from "./affineTransformations.js";
import { rand, randInRange, randIntInRange, setRandSeed } from "./rand.js";
import { noise } from "./noise.js";
import { getAngleAtT } from "./getAngleAtT.js";
import { getPointAtT } from "./getPointAtT.js";
import { getNormalAtT } from "./getNormalAtT.js";
import { resamplePolylines } from "./resamplePolylines.js";
import { simplify as simplifyPolyline } from "./simplify.js";
import { trimPolylines } from "./trimPolylines.js";
import { flattenSVG } from "./flatten-svg/index.js";
import { transform } from "./transform.js";
import { bounds } from "./bounds.js";
import { catmullRom } from "./catmullRom.js";
import { nurbs } from "./nurbs.js";
import { offset } from "./offset.js"

// import * as polyclip from 'polyclip-ts';
// import polygonClipping from "polygon-clipping";
// import { displacePolylines as displace } from "./displacePolylines.js";
// import { bezierEasing } from "./bezierEasing.js";

export const toolkit = {
  union: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "union", ops),
  intersection: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "intersection", ops),
  difference: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "difference", ops),
  xor: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "xor", ops),
  offset,
  iteratePoints: iteratePolylines,
  transform,
  bounds,
  Turtle,
  // createTurtle() {
  //   return new Turtle(...arguments);
  // },
  cut,
  cover,
  pointInside: pointInPolylines,
  scale,
  rotate,
  translate,
  // bezierEasing, // used to be in
  catmullRom,
  nurbs(points, ops = {}) {
    const degree = ops.degree ?? 2;
    const steps = ops.steps ?? 100;
    const boundary = isClosed(points) ? "closed" : "clamped";
    
    if (boundary === "closed" && points.length > 3) {
      points.pop();
    };

    var curve = nurbs({
      points,
      degree,
      boundary
    });

    const pl = [];
    const domain = curve.domain[0];
    const range = domain[1] - domain[0];
    const stepSize = range/steps;

    let i = domain[0]; 
    while (i <= domain[1]) {

      const pt = curve.evaluate([], i);
      pl.push(pt);

      i += stepSize;
    }

    if (i !== domain[1]) {
      const pt = curve.evaluate([], domain[1]);
      pl.push(pt);
    }

    return pl;

    function isClosed(polyline, epsilon = 1e-3) {
      let start = polyline[0]
      let end = polyline[polyline.length - 1]
      return (
        Math.abs(start[0] - end[0]) < epsilon &&
        Math.abs(start[1] - end[1]) < epsilon
      )
    }
  },
  originate(polylines) {
    const cc = bounds(polylines).cc;
    translate(polylines, [0, 0], cc);
    return polylines;
  },
  rand, 
  randInRange, 
  randIntInRange, 
  setRandSeed,
  noise,
  getAngle: getAngleAtT,
  getPoint: getPointAtT,
  getNormal: getNormalAtT,
  resample: resamplePolylines,
  simplify(polylines, tolerance, hq = true) {
    polylines.forEach(pl => {
      const newPl = simplifyPolyline(pl, tolerance, hq)
      while (pl.length > 0) pl.pop()

      while (newPl.length > 0) {
        pl.push(newPl.shift())
      }
    })

    return polylines;
  },
  trim: trimPolylines,
  merge: mergePolylines,
  svgToPolylines(svgString) { // undoced
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'image/svg+xml');
      const svg = doc.querySelector('svg');
      const polylines = flattenSVG(svg, { maxError: 0.001 }).map(pl => pl.points);

      return polylines;
    } catch (err) {
      throw new Error("SVGs can not be parsed in web workers.");
    }
    
  },
  scalePolylinesToDimension(polylines, width, height){
    polylines = JSON.parse(polylines);

    let minXVal = Number.POSITIVE_INFINITY;
    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        if (coord[0] < minXVal) {
          minXVal = coord[0];
        }
      })
    })

    let minYVal = Number.POSITIVE_INFINITY;
    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        if (coord[1] < minYVal) {
          minYVal = coord[1];
        }
      })
    })

    if (minXVal != 0) {
      polylines.forEach((obj) => {
        obj.forEach((coord) => {
          coord[0] -= minXVal;
        })
      })
    }

    if (minYVal != 0) {
      polylines.forEach((obj) => {
        obj.forEach((coord) => {
          coord[1] -= minYVal;
        })
      })
    }
    
    let maxXVal = Number.NEGATIVE_INFINITY;
    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        if (coord[0] > maxXVal) {
          maxXVal = coord[0];
        }
      })
    })

    let maxYVal = Number.NEGATIVE_INFINITY;
    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        if (coord[1] > maxYVal) {
          maxYVal = coord[1];
        }
      })
    })

    const xFactor = width/maxXVal;
    const yFactor = height/maxYVal;

    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        coord[0] *= xFactor;
      })
    })

    polylines.forEach((obj) => {
      obj.forEach((coord) => {
        coord[1] *= yFactor;
      })
    })
    
    return JSON.stringify(polylines);
  },
  join() {
    const [first, ...rest] = arguments;
    if (!first) return [];
    if (!rest) return first;

    rest.forEach(pls => {
      pls.forEach(pl => {
        first.push(pl);
      })
    });

    return first;
  },
  copy: obj => JSON.parse(JSON.stringify(obj))
}



/*

-[x] Turtle
-[x] bounds
-[x] iteratePolylines // could be called applyFnToPolylines or applyFnToPts
-[x] resample
-[x] simplify
-[x] getAngleAtT
-[x] getNormalAtT
-[x] getPointAtT // interpolate
-[x] trim
-[x] merge
-[x] displace
-[x] svgToPolylines

-[x] translate
-[x] rotate
-[x] scale

-[x] isPointInPolyLine // assumes closed?
-[ ] getIntersections // polylines0 polylines1

-[x] setRandSeed
-[x] rand
-[x] rangInRange
-[x] randIntInRange
-[x] noise

// curves
-[ ] bezierEasing
-[ ] centroid
-[ ] poisson disk sampling
-[ ] outline

-[x] originate

how to apply functions to turtle paths
what to call turtle paths (polylines or paths)
how to integrate direct manipulation
should I add curve drawing?
cos interpolation maybe?
*/