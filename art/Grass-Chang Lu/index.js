/*
@title: Grass
@author: Chang Lu
@snapshot: GRASS
*/

const SIZE = 200
const STEP = 7
const SLANT1 = bt.rand() * 2
const SLANT2 = bt.rand() * 4 - 2
const OCTAVE = 4
const FALLOFF = 50
const DIMINISH = 5000
const RANDOMNESS = 0.3

setDocDimensions(SIZE, SIZE)

for (let x = 50; x < SIZE - 50; x += STEP * bt.rand()) {
  for (let y = 50; y < SIZE - 50; y += STEP * bt.rand()) {
    let d1 = (bt.noise([x + bt.rand(), y + bt.rand(), 0], { octaves: OCTAVE, falloff: FALLOFF }) + 1) / DIMINISH
    let d2 = (bt.noise([x + bt.rand(), y + bt.rand(), 1], { octaves: OCTAVE, falloff: FALLOFF }) + 1) / DIMINISH
    let temp = bt.rand()
    drawLines([
      [
        [x, y],
        [x + d1, y + d1 * SLANT1 * (1 + temp * RANDOMNESS)],
        [x + d1 + d2, y + d1 * SLANT1 * (1 + temp * RANDOMNESS) + d2 * SLANT2 * (1 + bt.rand() * RANDOMNESS)],
      ]
    ])
  }
}