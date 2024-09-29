

import { RunInstructions } from "./instructions"
import { allLetters, letters } from "./letters"
import { Turtle } from "../Turtle"
import { resamplePolylines } from "../resamplePolylines"
import { warp } from "./legacyBezier"

export type Point = [number, number]
export type Polyline = Array<Point>


export const DrawBezier = (org: Point, ang: number, scale: number, bezfunc: any, curveSizes: Point, instructions?: string): Array<Polyline> => {
  const turtle = new Turtle()
  const otherLines:Array<Polyline> = []
  if (instructions) {
    const preperf = RunInstructions(instructions, org, scale, true)
    turtle.jump(preperf[0])
    otherLines.push(...preperf[1] as Array<Polyline>)
  }
  turtle.setAngle(ang)
  turtle.forward(curveSizes[0] * scale)
  resamplePolylines(turtle.path, 0.1)
  warp(turtle, x => bezfunc(x) * curveSizes[1] * scale)

  return [...otherLines,...turtle.lines()]
}

export const DrawText = (text: string, org: Point, scale: number = 100, spacing: Point = [2.5, 4.5]): Array<Polyline> => {
  let xInd = 0
  let yInd = 0
  const lines: Array<Polyline> = []
  for (const x of text.toLowerCase()) {
    if (allLetters.indexOf(x, 0) == -1) {
      // no instructions for symbol
        (RunInstructions(
        letters["?"],
        [
          org[0] + (xInd * spacing[0] * scale),
          org[1] - (yInd * spacing[1] * scale),
        ], scale) as Array<Polyline>).forEach((x) => {
          lines.push(x)
        })
      xInd += 1
      continue
    } else {
      switch (x) {
        case "\r":
          xInd = 0
          continue

        case "\n":
          xInd = 0
          yInd += 1
          continue

        default:
          if (typeof letters[x] == "string") {
            // basic symbols(no bezier)
              (RunInstructions(
              letters[x],
              [
                org[0] + (xInd * spacing[0] * scale),
                org[1] - (yInd * spacing[1] * scale),
              ], scale) as Array<Polyline>).forEach((x) => {
                lines.push(x)
              })
          } else if (typeof letters[x] == "function") {
            // advanced symbols(probs bezier involved)
            (letters[x]([
              org[0] + (xInd * spacing[0] * scale),
              org[1] - (yInd * spacing[1] * scale),
            ], scale) as Array<Polyline>).forEach((x) => {
              lines.push(x)
            })
          }
          break;

      }
      xInd += 1
      continue
    }

  }
  return lines

}
