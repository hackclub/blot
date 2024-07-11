import { assertArgs } from './assert'

let jsr = 69

export function rand() {
  assertArgs(arguments, [], 'bt.rand')

  const max = 4294967295
  jsr ^= jsr << 17
  jsr ^= jsr >>> 13
  jsr ^= jsr << 5
  return (jsr >>> 0) / max
}

export function setRandSeed(seed) {
  assertArgs(arguments, ['number'], 'bt.setRandSeed')

  jsr = seed
}

export function randInRange(min, max) {
  assertArgs(arguments, ['number', 'number'], 'bt.randInRange')

  return rand() * (max - min) + min
}

export function randIntInRange(min, max) {
  assertArgs(arguments, ['number', 'number'], 'bt.randIntInRange')
  
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(rand() * (max - min + 1) + min)
}
