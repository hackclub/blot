import polygonClipping from "polygon-clipping";
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
import { displacePolylines as displace } from "./displacePolylines.js";
import { flattenSVG } from "./flatten-svg/index.js";
import { transform } from "./transform.js";
import { bounds } from "./bounds.js";
import { catmullRom } from "./catmullRom.js";
import { nurbs } from "./nurbs.js";
import { bezierEasing } from "./bezierEasing.js";
import * as polyclip from 'polyclip-ts';
import { turnForward } from "./turnForward.js"
import { arc } from "./arc.js"
import { offset } from "./offset.js"

export const toolkit = {
  // polyclip, // NOT INCLUDED
  // boolean, // NOT INCLUDED
  // polygonClipping, // NOT INCLUDED
  // displace, // NOT INCLUDED

  union: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "union", ops),
  intersection: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "intersection", ops),
  difference: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "difference", ops),
  xor: (polylines0, polylines1, ops = {}) => boolean(polylines0, polylines1, "xor", ops),
  
  offset, // undoced
  turnForward, // undoced
  arc, // undoced
  step: (polylines, dx, dy) => { // undoced
    if (polylines.length === 0) {
      polylines.push([ [0, 0] ])
    }

    const [x, y] = polylines.at(-1).at(-1);

    polylines.at(-1).push([
      x + dx,
      y + dy
    ])

    return polylines;
  },

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
  bezierEasing,
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
  svgToPolylines(svgString) {
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