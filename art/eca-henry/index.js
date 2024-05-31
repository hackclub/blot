/*
@title: eca
@author: henry
@snapshot: eca1.png
*/

setDocDimensions(125, 125);

const t = new bt.Turtle();

const w = 50

let genStart = Array(w).fill(0)
genStart = genStart.map(() => Math.round(Math.random()))
genStart[w / 2] = 1

t.goTo([0, 0])

let rule = toBits(Math.floor(Math.random() * 255), 8)
let allGens = [genStart]

function toBits(num, overhead) {
  let bits = num.toString(2)
  return ('0'.repeat(overhead - bits.length) + bits).split('').map(s => {
    return parseInt(s)
  })
}

function nextGen(prev, gen) {
  let nextGen = []
  for (let i = 0; i < prev.length; i++) {
    for (let state = 0; state < 8; state++) {
      let bits = toBits(state, 3)
      let l = i <= 1 ? 0 : prev[i - 1]
      let c = prev[i]
      let r = i >= prev.length - 1 ? 0 : prev[i + 1]
      if (c == bits[1] && l == bits[0] && r == bits[2]) {
        nextGen.push(rule[8 - state - 1])
        break
      }
    }
  }
  return nextGen
}

function goTo(pos) {
  t.goTo([pos[0] * 0.2, pos[1] * 0.2])
}

function drawGen(arr, y) {
  let prevGen = allGens[-y]
  for (let x = 0; x < arr.length; x++) {
    arr[x] ? t.down() : t.up()
    if (arr[x]) {
      t.up()
      goTo([x, y])
      t.down()
      if (prevGen[x] == 1) goTo([x, y + 1.0])
      goTo([x, y])
      if (prevGen[x - 1] == 1) goTo([x - 1.0, y + 1.0])
      goTo([x, y])
      if (prevGen[x + 1] == 1) goTo([x + 1.0, y + 1.0])
      goTo([x, y])
      if (arr[x - 1] == 1) goTo([x - 1, y])
      goTo([x, y])
    }
    t.up()
  }
  t.up()
  goTo([w, y - 1])
  t.down()
}

for (let gen = 0; gen < w * 2; gen++) {
  allGens.push(nextGen(allGens[gen], gen))
  drawGen(allGens[gen + 1], -gen)
}

const bb = () => bt.bounds(t.path);
bt.scale(t.path, 110/bb().height);
bt.translate(t.path, [125/2, 125/2], bb().cc);

drawLines(t.lines());
