import { flattenSVG } from "flatten-svg";

export class Turtle {
  constructor(start = [ 0, 0 ]) {
    start = createPoint(...start);
    this.drawing = true;
    this.location = start;
    this.angle = 0;
    this.path = [
      [ start ]
    ];
  }

  up() {
    this.drawing = false;
    this.path.push([
      createPoint(this.location.x, this.location.y)
    ])
    return this;
  }

  down() {
    this.drawing = true;
    return this;
  }

  goTo(x, y) {

    const lastPath = this.path.at(-1);
    if (this.drawing) {
      lastPath.push(createPoint(x, y));
    } else {
      if (lastPath.length === 1) lastPath[0] = createPoint(x, y);
    }

    this.location = createPoint(x, y);
    
    return this;
  }

  forward(distance) {
    const last = this.location;
    const a = this.angle/180 * Math.PI;
    const x = last.x + distance * Math.cos(a);
    const y = last.y + distance * Math.sin(a);

    this.goTo(x, y);

    return this;
  }

  arc(angle, radius) {
    const theta = Math.abs(angle);
    
    const length = radius*theta/180*Math.PI;

    const ogAngle = this.angle;
    const thetaStep = 1;
    const steps = theta/thetaStep;
    const distanceStep = length/steps;

    for (let i = 0; i < steps; i++) {
      if (angle >= 0) this.right(thetaStep);
      else this.left(thetaStep);

      this.forward(distanceStep);
    }

    this.setAngle(ogAngle + angle);

    return this;
  }

  setAngle(theta) {
    this.angle = theta;

    return this;
  }

  right(theta) {
    this.angle -= theta;

    return this;
  }

  left(theta) {
    this.angle += theta;

    return this;
  }

  translate(x, y, origin) {
    this.location = translate(this.location, x, y, origin);
    
    iteratePath(this, pt => {
      const newPt = translate(pt, x, y, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
      pt[0] = newPt.x;
      pt[1] = newPt.y;
    })
  }

  rotate(angle, origin) {
    if (!origin) origin = this.cc;

    this.location = rotate(this.location, angle, origin);

    iteratePath(this, pt => {
      const newPt = rotate(pt, angle, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
      pt[0] = newPt.x;
      pt[1] = newPt.y;
    })
  }

  scale(factor, origin) {
    if (!origin) origin = this.cc;

    this.location = scale(this.location, factor, origin);

    iteratePath(this, pt => {
      const newPt = scale(pt, factor, origin);
      pt.x = newPt.x;
      pt.y = newPt.y;
      pt[0] = newPt.x;
      pt[1] = newPt.y;
    })
  }

  fromSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.querySelector("svg");
    const pls = flattenSVG(svg, { maxError: 0.001 });

    pls.forEach(pl => {
      this.up();
      pl.points.forEach((pt, i) => {
        this.goTo(pt.x, pt.y);
        if (i === 0) this.down();
      })
    })

    return this;
  }

  join(turtle) {
    this.path = [
      ...this.path,
      ...tutle.path
    ];

    return this;
  }

  extrema() {
    return extrema(this.path.flat());
  }

  get width() {
    const { xMin, xMax } = this.extrema();

    return xMax - xMin;
  }

  get height() {
    const { yMin, yMax } = this.extrema();

    return yMax - yMin;
  }

  get start() {
    
    const pt = this.path.at(0).at(0);

    return [ pt.x, pt.y ];
  }

  get end() {
    const pt = this.path.at(-1).at(-1);

    return [ pt.x, pt.y ];
  }

  get lt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMin,
      yMax
    ]
  }

  get lc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMin,
      (yMax+yMin)/2
    ]
  }

  get lb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMin,
      yMin
    ]
  }

  get ct() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      (xMax+xMin)/2,
      yMax
    ]
  }

  get cc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      (xMax+xMin)/2,
      (yMax+yMin)/2
    ]
  }

  get cb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      (xMax+xMin)/2,
      yMin
    ]
  }

  get rt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMax,
      yMax
    ]
  }

  get rc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMax,
      (yMax+yMin)/2
    ]
  }

  get rb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();

    return [
      xMax,
      yMin
    ]
  }

  iteratePath(fn) {
    iteratePath(turtle);
  }


}

function iteratePath(turtle, fn) {
  const path = turtle.path;

  path.flat().forEach(fn);
}

function convertPt(pt) {
  if (Array.isArray(pt)) {
    return createPoint(pt[0], pt[1]);
  } else {
    return pt;
  }
}

function translate(pt, x, y, origin = { x: 0, y: 0 }) {
  origin = convertPt(origin);

  return createPoint(
    pt.x + x - origin.x,
    pt.y + y - origin.y
  );
}


function rotate(pt, angle, origin) {
  pt = convertPt(pt);
  origin = convertPt(origin);

  let delta = (angle / 180) * Math.PI;

  let hereX = pt.x - origin.x;
  let hereY = pt.y - origin.y;

  let newPoint = createPoint(
    hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin.x,
    hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin.y,
  );

  return newPoint;
}

function scale(pt, factor, origin) {
  pt = convertPt(pt);
  origin = convertPt(origin);

  if (typeof factor === "number") factor = [ factor, factor ];
  const [ xFactor, yFactor ] = factor;
  const  { x, y } = origin;
  const newPoint = createPoint(
    (pt.x - x) * xFactor + x, 
    (pt.y - y) * yFactor + y
  );

  return newPoint;
}

function extrema(pts) {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;

  pts.forEach((p) => {
    const  { x, y } = p;

    if (xMin > x) xMin = x;
    if (xMax < x) xMax = x;
    if (yMin > y) yMin = y;
    if (yMax < y) yMax = y;
  });

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}

function createPoint(x, y) {
  const pt = [ x, y ];
  pt.x = x;
  pt.y = y;
  
  return pt;
}

