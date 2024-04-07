/*
@title: Sunflower
@author: Ofir
@snapshot: sunflower1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const arcOneCount = bt.randIntInRange(1, 2);
const arcTwoCount = bt.randIntInRange(1, 2);

const pedalsCount = bt.randIntInRange(1, 2);
const pedalSzie = bt.randIntInRange(30, 35);

console.log(arcOneCount);
console.log(arcTwoCount);
const arc1 = (n) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n + 1; i++) {
    t.up();
    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(i * (360 / n));
    t.forward(2);
    t.down();
    t.arc(-90, 9);
  }
  return t.lines();
};

const arc2 = (n) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n + 1; i++) {
    t.up();
    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(i * (360 / n));
    t.forward(2);
    t.down();
    t.arc(90, 9);
  }
  return t.lines();
};

const pedals = (n, s) => {
  const t = new bt.Turtle();
  for (let i = 0; i < n; i++) {
    let pedal = [];
    t.up();

    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(i * (360 / n) + 5);
    t.forward(2 + 9 * Math.sqrt(2));
    pedal.push(t.pos);

    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(i * (360 / n));
    t.forward(2 + 9 * Math.sqrt(2));
    t.forward(s / 2);
    pedal.push(t.pos);

    let second = (i + 1) * (360 / n);

    if (second > 360) {
      second = second - 360;
    }

    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(((i + 1) * (360 / n) + i * (360 / n)) / 2);
    t.forward(2 + 9 * Math.sqrt(2));
    t.down();
    t.forward(s / 4);
    t.up();
    t.forward(s - s / 4);
    pedal.push(t.pos);
    t.up();

    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(second);
    t.forward(2 + 9 * Math.sqrt(2));
    t.forward(s / 2);
    pedal.push(t.pos);

    t.goTo([width / 2, height / 2 + 10]);
    t.setAngle(second - 5);
    t.forward(2 + 9 * Math.sqrt(2));
    pedal.push(t.pos);

    let curve = bt.catmullRom(pedal);

    drawLines([curve]);
  }
  return t.lines();
};

const stem = () => {
  const t = new bt.Turtle();
  t.up();
  t.goTo([width / 2 - 1, 0]);
  t.down();
  t.goTo([width / 2 - 1, height / 2 + 8]);
  t.up();
  t.goTo([width / 2 + 1, 0]);
  t.down();
  t.goTo([width / 2 + 1, height / 2 + 8]);
  return t.lines();
};

if (arcOneCount == 1) {
  drawLines(arc1(21));
} else {
  drawLines(arc1(34));
}

if (arcTwoCount == 1) {
  drawLines(arc2(21));
} else {
  drawLines(arc2(34));
}

if (pedalsCount == 1) {
  drawLines(pedals(21, pedalSzie));
} else if (pedalsCount == 2) {
  drawLines(pedals(34, pedalSzie));
}

drawLines(stem());
