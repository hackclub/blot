import { Turtle, Point } from './drawingToolkit/index.js'
import * as drawingUtils from './drawingToolkit/utils.js'

let _returnTurtles: Turtle[] = []

const customGlobal = {
  // setTimeout: patchedTimeout,
  // setInterval: patchedInterval,
  // loop,
  // sleep,

  // console: hConsole,

  // drawing functions

  ...drawingUtils,
  Turtle,
  createTurtle: (pt: Point) => new Turtle(pt),
  lerp(start: number, end: number, t: number) {
    return (1 - t) * start + t * end
  },
  drawTurtles: (turtlesToDraw: Turtle[], style = {}) => {
    turtlesToDraw.forEach(t => {
      const temp = t.copy();
      if (style.fill === undefined) style.fill = "none";
      if (style.stroke === undefined) style.stroke = "black";
      temp.style = style;
      turtles.push(temp);
    });
  },
  setDocDimensions(w: number, h: number) {}
}

export function runTextReturnTurtles(text: string) {
  _returnTurtles = []

  const f = new Function(...Object.keys(customGlobal), text)
  f(...Object.values(customGlobal))

  return _returnTurtles
}
