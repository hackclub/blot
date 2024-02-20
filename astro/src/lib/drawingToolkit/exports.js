import { Turtle } from './turtle.ts'
import { rand, randInRange, randIntInRange, setRandSeed } from "./ext-utils/rand.ts";
import { noise } from "./ext-utils/noise.ts";
import { bezierEasing } from "./ext-utils/bezierEasing3.ts";
import { isPointInPolyline, inside } from "./ext-utils/isPointInPolyline.ts";

export default {
  Turtle,
  createTurtle() {
    return new Turtle()
  },
  rand,
  randInRange,
  randIntInRange,
  setRandSeed,
  noise,
  bezierEasing,
  isPointInPolyline,
  inside,
  lerp(start, end, t) {
    return (1 - t) * start + t * end
  },
}