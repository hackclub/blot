const t = new Turtle();

const w = 50;

let genStart = Array(w).fill(0);
genStart = genStart.map(() => Math.round(Math.random()));
genStart[w / 2] = 1;

t.goto([0, 0]);

let rule = toBits(Math.floor(Math.random() * 255), 8);
let allGens = [genStart];

function toBits(num, overhead) {
  let bits = num.toString(2);
  return ("0".repeat(overhead - bits.length) + bits).split("").map((s) => {
    return parseInt(s);
  });
}

function nextGen(prev, gen) {
  let nextGen = [];
  for (let i = 0; i < prev.length; i++) {
    for (let state = 0; state < 8; state++) {
      let bits = toBits(state, 3);
      let l = i <= 1 ? 0 : prev[i - 1];
      let c = prev[i];
      let r = i >= prev.length - 1 ? 0 : prev[i + 1];
      if (c == bits[1] && l == bits[0] && r == bits[2]) {
        nextGen.push(rule[8 - state - 1]);
        break;
      }
    }
  }
  return nextGen;
}

function goto(pos) {
  t.goto([pos[0] * 0.2, pos[1] * 0.2]);
}

function drawGen(arr, y) {
  let prevGen = allGens[-y];
  for (let x = 0; x < arr.length; x++) {
    arr[x] ? t.down() : t.up();
    if (arr[x]) {
      t.up();
      goto([x, y]);
      t.down();
      if (prevGen[x] == 1) goto([x, y + 1.0]);
      goto([x, y]);
      if (prevGen[x - 1] == 1) goto([x - 1.0, y + 1.0]);
      goto([x, y]);
      if (prevGen[x + 1] == 1) goto([x + 1.0, y + 1.0]);
      goto([x, y]);
      if (arr[x - 1] == 1) goto([x - 1, y]);
      goto([x, y]);
    }
    t.up();
  }
  t.up();
  goto([w, y - 1]);
  t.down();
}

for (let gen = 0; gen < w * 2; gen++) {
  allGens.push(nextGen(allGens[gen], gen));
  drawGen(allGens[gen + 1], -gen);
}

drawTurtles(t);
