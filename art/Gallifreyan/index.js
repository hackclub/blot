/*
@title: Gallifreyan
@author: Shav Kinderlehrer
@snapshot: snapshot0.png
*/

/* Replace this with the word to draw */
let word = "blot"
  .toLowerCase();

/* General params */
const width = 124;
const height = 124;
const padding = 5;
const letterArcRad = 20;
const letterWidth = 20;
const letterRadius = letterWidth / 2;
const letterPadding = 1.1;
const letterAccLineLen = 5 + letterRadius;

/* For those trying to read this, good luck. I wrote it as 
fast as I could, so a lot of corners have been cut. */
const finalPadding = padding + letterWidth + letterPadding + 1; // letterPadding is an approximation but good enough

// shape: gibbous: 0, above: 1, half: 2, in: 3, vowel: 4
// accent: 0-4: dot, 5-7: line, 8: inverse line
const consLetterMap = {
  b: { shape: 0, accent: 0 },
  ch: { shape: 0, accent: 2 },
  d: { shape: 0, accent: 3 },
  nd: { shape: 0, accent: 4 },
  g: { shape: 0, accent: 5 },
  h: { shape: 0, accent: 6 },
  f: { shape: 0, accent: 7 },
  j: { shape: 1, accent: 0 },
  ph: { shape: 1, accent: 1 },
  k: { shape: 1, accent: 2 },
  l: { shape: 1, accent: 3 },
  c: { shape: 1, accent: 4 },
  n: { shape: 1, accent: 5 },
  p: { shape: 1, accent: 6 },
  m: { shape: 1, accent: 7 },
  t: { shape: 2, accent: 0 },
  wh: { shape: 2, accent: 1 },
  sh: { shape: 2, accent: 2 },
  r: { shape: 2, accent: 3 },
  nt: { shape: 2, accent: 4 },
  v: { shape: 2, accent: 5 },
  w: { shape: 2, accent: 6 },
  s: { shape: 2, accent: 7 },
  th: { shape: 3, accent: 0 },
  gh: { shape: 3, accent: 1 },
  y: { shape: 3, accent: 2 },
  z: { shape: 3, accent: 3 },
  q: { shape: 3, accent: 4 },
  qu: { shape: 3, accent: 5 },
  x: { shape: 3, accent: 6 },
  ng: { shape: 3, accent: 7 },
  a: { shape: 4, accent: 0 },
  e: { shape: 4, accent: 0 },
  i: { shape: 4, accent: 5 },
  o: { shape: 4, accent: 0 },
  u: { shape: 4, accent: 8 },
};

setDocDimensions(width, height);

let letters = [];
let pos = 0;
while (true) {
  if (pos == word.length) break;
  let c = word[pos];
  switch (c) {
    case "c":
      if (word[pos + 1] == "h") {
        letters.push("ch");
        pos++
      } else { letters.push("c"); }
      break;
    case "n":
      if (word[pos + 1] == "d") {
        letters.push("nd");
        pos++;
        break;
      }
      if (word[pos + 1] == "t") {
        letters.push("nt");
        pos++;
        break;
      }
      if (word[pos + 1] == "g") {
        letters.push("ng");
        pos++
      } else { letters.push("n"); }
      break;
    case "p":
      if (word[pos + 1] == "h") {
        letters.push("ph");
        pos++
      } else { letters.push("p"); }
      break;
    case "w":
      if (word[pos + 1] == "h") {
        letters.push("wh");
        pos++
      } else { letters.push("w"); }
      break;
    case "s":
      if (word[pos + 1] == "h") {
        letters.push("sh");
        pos++
      } else { letters.push("s"); }
      break;
    case "t":
      if (word[pos + 1] == "h") {
        letters.push("th");
        pos++
      } else { letters.push("t"); }
      break;
    case "g":
      if (word[pos + 1] == "h") {
        letters.push("gh");
        pos++
      } else { letters.push("g"); }
      break;
    default:
      letters.push(c);
  }
  pos++;
}

// Plot a series of equidistant points around a circle with a given starting point.
let mainCircleRadius = (Math.min(width, height) / 2) - finalPadding
let mainCircle = new bt.Turtle().up()
  .goTo([width / 2, finalPadding])
  .down()
  .arc(360, mainCircleRadius);

let center = { x: width / 2, y: height / 2 };
let letterPositions = [];
let step = 2 * Math.PI / letters.length;
let offsetAngle = Math.atan2(center.x + mainCircleRadius - (width / 2), center.y - height / 2, ); // this should not work but it does
for (let i = 0; i < letters.length; i++) {
  let angle = step * i - offsetAngle;
  let x = center.x + mainCircleRadius * Math.cos(angle);
  let y = center.y + mainCircleRadius * Math.sin(angle);
  letterPositions.push([x, y])
}

let consMainLines = [
  [
    []
  ]
];
let consAbsLines = [
  [
    []
  ]
];
let consAccLines = [
  [
    []
  ]
];
let vowelLines = [
  [
    []
  ]
];
for (let i = 0; i < letters.length; i++) {
  let cons = new bt.Turtle().up();
  let pos = letterPositions[i];
  let c = letters[i];
  let center = [pos[0], pos[1] + letterRadius];

  cons.goTo(pos)
    .down()
    .arc(360, letterRadius).up();

  let centered = bt.translate(cons.path, [0, pos[1] - center[1]]);
  let lineToCenter = [
    [pos, [width / 2, height / 2]]
  ];
  if (Object.hasOwn(consLetterMap, c)) {
    let positioned;
    let absPositioned;
    switch (consLetterMap[c].shape) {
      case 0: {
        let m = bt.getPoint(lineToCenter, (letterRadius / mainCircleRadius) * 0.75);
        positioned = bt.translate(centered, [-(pos[0] - m[0]), -(pos[1] - m[1])]);
        bt.join(consAccLines, drawAcc(c, m, cons.path));
        break;
      }
      case 1: {
        let m = bt.getPoint(lineToCenter, (letterRadius / mainCircleRadius) * letterPadding);
        absPositioned = bt.translate(centered, [-(pos[0] - m[0]), -(pos[1] - m[1])]);
        bt.join(consAccLines, drawAcc(c, m, cons.path));
        break;
      }
      case 2:
        positioned = centered;
        bt.join(consAccLines, drawAcc(c, pos, cons.path));
        break;
      case 3: {
        absPositioned = centered;
        bt.join(consAccLines, drawAcc(c, pos, cons.path));
        break;
      }
      case 4: {
        let radius = letterRadius / 2;
        let vowel = new bt.Turtle().up();
        let pos = letterPositions[i];
        let c = letters[i];
        let center = [pos[0], pos[1] + radius];

        vowel.goTo(pos)
          .down()
          .arc(360, radius).up();

        let centered = bt.translate(vowel.path, [0, pos[1] - center[1]]);
        switch (c) {
          case "a": {
            let m = bt.getPoint(lineToCenter, (radius / mainCircleRadius) * letterPadding);
            bt.join(vowelLines, bt.translate(centered, [(pos[0] - m[0]), (pos[1] - m[1])]));
            break;
          }
          case "e":
            bt.join(vowelLines, centered)
            break;
          case "i": {
            bt.join(vowelLines, centered);
            bt.join(vowelLines, drawAcc(c, pos, centered));
            break;
          }
          case "o": {
            let m = bt.getPoint(lineToCenter, (radius / mainCircleRadius) * letterPadding);
            bt.join(vowelLines, bt.translate(centered, [-(pos[0] - m[0]), -(pos[1] - m[1])]));
            break;
          }
          case "u": {
            bt.join(vowelLines, centered);
            bt.join(vowelLines, drawAcc(c, pos, centered));
            break;
          }
          default:
            break;
        }
      }
    }
    if (positioned) consMainLines = bt.join(consMainLines, positioned);
    if (absPositioned) consAbsLines = bt.join(consAbsLines, absPositioned);
  }
}

drawLines(bt.difference(mainCircle.path, consMainLines));
drawLines(consAbsLines);
drawLines(consAccLines, { fill: "black" });
drawLines(vowelLines, { width: 4 });

function drawAcc(c, center, path) {
  let lines = [
    [
      []
    ]
  ];
  for (let i = 0; i < letters.length; i++) {
    let acc = new bt.Turtle().up();

    if (Object.hasOwn(consLetterMap, c)) {
      let accent = consLetterMap[c].accent;
      if (accent < 5) { // dots
        for (let i = 0; i < accent; i++) {
          let x = center[0] + letterRadius / 3 * Math.cos(2 * Math.PI * i / accent);
          let y = center[1] + letterRadius / 3 * Math.sin(2 * Math.PI * i / accent);
          acc.goTo([x, y]).down().arc(360, 2).up();
          bt.join(lines, acc.path)
        }
      } else { //lines
        let letterLines = consMainLines;
        let lineToCenter = [
          [
            center, [width / 2, height / 2]
          ]
        ];
        let endPoint = bt.getPoint(lineToCenter, 0.6)
        let num = accent - 4;
        let middle = [width / 2, height / 2];
        let lens = [middle[0] - center[0], middle[1] - center[1]];
        let hyp = Math.sqrt(lens[0] ** 2 + lens[1] ** 2);
        let above = center[1] > height / 2;
        let angle = ((Math.acos(lens[0] / hyp)) * 180 / Math.PI) * (above ? -1 : 1);
        let t = new bt.Turtle().up()
        t.setAngle(angle);
        switch (num) {
          case 1: {
            t.goTo(center).down().forward(letterAccLineLen);
            lines = bt.cover(t.path, path);
            break;
          }
          case 2: {
            t.goTo(center).down();
            t.right(90)
              .forward(1)
              .left(90)
              .down()
              .forward(letterAccLineLen)
              .up()
              .goTo(center)
              .left(90)
              .forward(1)
              .right(90)
              .down()
              .forward(letterAccLineLen);
            lines = bt.cover(t.path, path);
            break;
          }
          case 3: {
            t.goTo(center).down();
            t.forward(letterAccLineLen)
              .up()
              .goTo(center)
              .right(90)
              .forward(1)
              .left(90)
              .down()
              .forward(letterAccLineLen)
              .up()
              .goTo(center)
              .left(90)
              .forward(1)
              .right(90)
              .down()
              .forward(letterAccLineLen);
            lines = bt.cover(t.path, path);
            break;
          }
          case 4: {
            t.right(180);
            t.goTo(center).down().forward(letterAccLineLen);
            lines = bt.cover(t.path, path);
            break;
          }
        }
      }
    }
  }
  return lines;
}