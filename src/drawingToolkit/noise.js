import { assertArgs } from './assert.js'
import { rand } from './rand.js'

let PERLIN_YWRAPB = 4
let PERLIN_YWRAP = 1 << PERLIN_YWRAPB
let PERLIN_ZWRAPB = 8
let PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB
let PERLIN_SIZE = 4095

let scaled_cosine = function (i) {
  return 0.5 * (1.0 - Math.cos(i * Math.PI))
}

let perlin// will be initialized lazily by noise() or noiseSeed()

export function noise( vector, options = {}) {
  assertArgs(arguments, [['number', 'numberArray'], 'any?'], 'bt.noise')

  if (typeof vector === 'number') vector = [vector, 0, 0]
  let [x, y, z] = vector
  y = y || 0
  z = z || 0

  const perlin_octaves = options?.octaves || 4 // default to medium smooth
  const perlin_amp_falloff = options?.falloff || 0.5 // 50% reduction/octave

  if (perlin == null) {
    perlin = Float64Array.from({ length: PERLIN_SIZE + 1 }, () => rand())
  }

  if (x < 0) {
    x = -x
  }
  if (y < 0) {
    y = -y
  }
  if (z < 0) {
    z = -z
  }

  let xi = Math.floor(x),
    yi = Math.floor(y),
    zi = Math.floor(z)
  let xf = x - xi
  let yf = y - yi
  let zf = z - zi
  let rxf, ryf

  let r = 0
  let ampl = 0.5

  let n1, n2, n3

  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)

    rxf = scaled_cosine(xf)
    ryf = scaled_cosine(yf)

    n1 = perlin[of & PERLIN_SIZE]
    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)
    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)
    n1 += ryf * (n2 - n1)

    of += PERLIN_ZWRAP
    n2 = perlin[of & PERLIN_SIZE]
    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)
    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]
    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)
    n2 += ryf * (n3 - n2)

    n1 += scaled_cosine(zf) * (n2 - n1)

    r += n1 * ampl
    ampl *= perlin_amp_falloff
    xi <<= 1
    xf *= 2
    yi <<= 1
    yf *= 2
    zi <<= 1
    zf *= 2

    if (xf >= 1.0) {
      xi++
      xf--
    }
    if (yf >= 1.0) {
      yi++
      yf--
    }
    if (zf >= 1.0) {
      zi++
      zf--
    }
  }
  return r
}
