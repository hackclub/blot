import { translatePt, rotatePt } from "./affineTransformations.js";

const copy = obj => JSON.parse(JSON.stringify(obj))

export class Turtle {

  constructor() {
    this.drawing = true
    this.position = [ 0, 0 ]
    this.angle = 0
    // TODO: should this be called polylines?
    this.path = [
      [ [0, 0] ]
    ]
  }

  up() {
    if (!this.drawing) return this
    this.drawing = false
    this.path.push([[...this.position]])
    return this
  }

  down() {
    this.drawing = true
    return this
  }

  goTo([x, y]) {
    const lastPath = this.path.at(-1)
    if (this.drawing) {
      const [lastX, lastY] = this.position
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2)
      if (dist < 0.0001) return this
      lastPath.push([x, y])
    } else {
      if (lastPath.length === 1) lastPath[0] = [x, y]
    }

    this.position = [x, y]

    return this
  }

  step([dx, dy]) { // document this
    const [x, y] = this.position;

    this.goTo([
      x+dx,
      y+dy
    ])

    return this;
  }

  jump(pt) {
    const [x, y] = pt;
    const lastPath = this.path.at(-1);
    if (lastPath.length === 1) {
      lastPath[0] = [x, y];
      this.position = [x, y];
      return this;
    }

    this.up()
    this.goTo(pt)
    this.down()
    return this
  }

  forward(distance) {
    const last = this.position
    const a = (this.angle / 180) * Math.PI
    const x = last[0] + distance * Math.cos(a)
    const y = last[1] + distance * Math.sin(a)

    this.goTo([x, y])

    return this
  }

  arc(angle, radius) {
    if (angle === 0 || radius === 0) return this;
    
    const n = 64;
    let pts = [ ];
    const a = angle/180*Math.PI;
    const lp = this.position;
    const la = this.angle;

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

    pts.slice(1).forEach(pt => this.goTo(pt));

    this.setAngle(la + angle);

    return this;
  } 

  get pos() {
    return this.position;
  }

  set pos(value) {
    this.position = value;
  }

  // setHeading?
  setAngle(theta) {
    this.angle = theta

    return this
  }

  // heading() {
  //   return this.angle;
  // }

  right(theta) {
    this.angle -= theta

    return this
  }

  left(theta) {
    this.angle += theta

    return this
  }

  // TODO: do I want this
  polylines() {
    const pls = copy(this.path);

    return pls.filter(pl => pl.length > 1);
  }

  // TODO: do I want this
  lines() {
    const pls = copy(this.path);

    return pls.filter(pl => pl.length > 1);
  }

  // get lines() {
  //   return this.path;
  // }

  // set lines(value) {
  //   this.path = value;
  // }


  copy() {
    const t = new Turtle()

    t.path = copy(this.path)
    t.drawing = copy(this.drawing)
    t.position = copy(this.position)
    t.angle = copy(this.angle)

    return t
  }

  // TODO: do i want this; prioritize this
  applyToPath(fn) {
    fn(this.path);
    return this;
  }

  // TODO: do i want this;
  apply(fn) {
    fn(this);
    return this;
  }
  
}