/*
@title: eclipse
@author: logan fick
@snapshot: 0.png
*/

const Width = 196;
const Height = 163;

var percentCoverage = 1.03 //0-100%
if (percentCoverage > 1){
  percentCoverage = 1
}else if (percentCoverage < 0){
  percentCoverage = 0
}

const SunSize = Width/26.57
const MoonSize = SunSize * percentCoverage
const radius = (5 / 28) * Width
const rayPadding = 5

const drawingConstant = 12

const Date = "April 8th 2024"
const Location = "NY"
const EclipseText = Date + " Total Solar Eclipse " + Location
const TotalityText = "Totality!"

const Times = [
    "<2:40PM",
    "2:40PM",
    "3:00PM",
    "3:20PM",
    "3:25PM",
    "3:30PM"
  ]

const TimeZone = "EST"
var TimeText = " " + TimeZone

var visibility = 15 - percentCoverage * 10;

if (percentCoverage >= 1){
  visibility = 3
}
// ============================ Text Engine ============================
// instructions.ts
var ParseCoords = (cstr, multScale = 1) => {
  const coordArray = [];
  for (const x of cstr.split(":")) {
    if (parseFloat(x)) {
      coordArray.push(parseFloat(x));
    }
  }
  return coordArray;
};
var RunInstructions = (inst, org, scale = 1) => {
  const turtle = new bt.Turtle();
  turtle.jump(org)
  for (const x of inst.split(",")) {
    const cmd = x.split("$")[0];
    const args = x.split("$")[1];
    let data;
    switch (cmd) {
      case "u":
        turtle.up();
        break;
      case "d":
        turtle.down();
        break;
      case "f":
        turtle.forward(parseFloat(args) * scale);
        break;
      case "arc":
        data = ParseCoords(args);
        turtle.arc(-data[0], data[1] * scale);
        break;
      case "jmp":
        data = ParseCoords(args);
        turtle.jump(data);
        break;
      case "sa":
        turtle.setAngle(parseFloat(args));
        break;
      case "l":
        turtle.left(parseFloat(args));
        break;
      case "r":
        turtle.right(parseFloat(args));
        break;
      default:
        break;
    }
  }
  drawLines(turtle.lines());
  return turtle.position;
};

// letters.ts
var letters = {
  // some of these instructions could definitely be minified. I will most
  // likely submit a second pr to fix some of these later
  // todo unterrible letter instructions
  a: `sa$90,f$2,r$90,f$2,r$90,f$2,u,sa$90,f$2,d,l$30,f$2,l$120,f$2`,
  b: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1`,
  c: `sa$90,u,r$90,f$2,r$180,d,arc$180:2`,
  d: `sa$90,f$4,r$90,arc$180:2`,
  e: `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  f: `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  g: `u,f$1,sa$90,f$2,r$90,d,arc$270:1,f$2,arc$90:1`,
  h: `sa$90,f$4,u,f$-2,r$90,d,f$2,u,l$90,f$-2,d,f$4`,
  i: `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  j: `sa$90,u,f$4,r$90,d,f$2,u,f$-1,r$90,d,f$3,arc$90:1`,
  k: `sa$90,f$4,u,f$-2,r$45,d,f$2.75,u,f$-2.75,r$90,d,f$2.75`,
  l: `sa$90,u,f$4,r$180,d,f$4,l$90,f$2`,
  m: `sa$90,f$4,sa$0,r$71.57,f$3.162,sa$0,l$71.57,f$3.162,sa$0,r$90,f$4`,
  n: `sa$90,f$4,r$153.43,f$4.47,l$153.43,f$4`,
  o: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1`,
  p: `sa$90,f$4,r$90,f$1,arc$180:1,f$1`,
  q: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,r$90,f$1,r$45,d,f$1.414`,
  r: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284`,
  s: `f$1,arc$-180:1,arc$180:1,f$1`,
  t: `u,f$1,sa$90,d,f$4,u,r$90,f$-1,d,f$2`,
  u: `sa$90,u,f$4,sa$-90,d,f$3,arc$-180:1,f$3`,
  v: `sa$90,u,f$4,r$165.96,d,f$4.12,l$151.93,f$4.12`,
  w: `sa$90,u,f$4,sa$0,r$82.87,d,f$4.03,sa$0,l$63.43,f$1.12,sa$0,r$63.43,f$1.12,sa$0,l$82.87,f$4.03`,
  x: `sa$90,u,f$4,r$153.44,d,f$4.47,u,l$153.44,f$4,l$153.44,d,f$4.47`,
  y: `u,f$1,sa$90,d,f$2.5,r$33.69,f$1.8,u,f$-1.8,l$67.38,d,f$1.8`,
  z: `u,f$2,d,f$-2,l$63.44,f$4.47,r$63.44,f$-2`,
  ["0"]: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,f$2,arc$45:1,sa$-66.80,d,f$3.675`,
  ["1"]: (origin, scale) => DrawBezier(
    origin,
    -106,
    scale,
    bezierEasing(0.026, [0.984, -1], [1, 1], 0.9561),
    [2, -0.47],
    `f$2,u,f$-1,sa$90,d,f$4,l$90`
  ),
  ["2"]: `u,f$2,r$180,d,f$2,sa$90,arc$90:1,arc$-90:1,f$1,arc$-180:1`,
  ["3"]: `sa$90,u,f$4,r$90,d,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1`,
  ["4"]: `u,f$2,sa$90,f$1,l$90,d,f$2,r$116.57,f$3.35,sa$-90,f$4`,
  ["5"]: `u,sa$90,f$1,r$180,d,arc$-180:1,f$1,arc$-90:1,arc$90:1,sa$0,f$2`,
  ["6"]: (origin, scale) => DrawBezier(
    origin,
    74,
    scale,
    bezierEasing(-0.018, [0.054, -0.373], [1, -0.758], 0.9181),
    [3.2, -0.36],
    `u,sa$90,f$1,d,arc$360:1`
  ),
  ["7"]: (origin, scale) => DrawBezier(
    origin,
    245,
    scale,
    bezierEasing(-5e-3, [0, -0.149], [0, 1], 0.206),
    [4.5, -0.59],
    `u,sa$90,f$4,r$90,d,f$2`
  ),
  ["8"]: `u,f$1,d,arc$-180:1,arc$360:1,arc$-180:1`,
  ["9"]: (origin, scale) => DrawBezier(
    origin,
    -107,
    scale,
    bezierEasing(-0.018, [0.054, -0.373], [1, -0.758], 0.9181),
    [3.2, -0.36],
    `u,sa$90,f$4,r$90,f$1,d,arc$360:1,u,arc$90:1,d`
  ),
  ["."]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25`,
  [","]: `sa$90,u,f$.5,r$90,f$1,r$90,d,arc$90:.25`,
  ["?"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$1,r$90,arc$-270:1`,
  ["!"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$3`,
  ["+"]: `sa$90,u,f$2,r$90,d,f$2,u,f$-1,l$90,f$-1,d,f$2`,
  ["-"]: `sa$90,u,f$2,r$90,d,f$2`,
  ["*"]: `sa$90,u,f$2,r$90,f$1,l$90,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2`,
  ["/"]: `l$63.43,f$4.47`,
  ["="]: `sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2`,
  ["$"]: `f$1,arc$-180:1,arc$180:1,f$1,u,f$-1,r$90,d,f$4`,
  [":"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$2.5,d,r$90,arc$360:.25`,
  [";"]: `sa$90,u,f$.25,r$90,f$1,r$90,d,arc$90:.25,u,arc$270:.25,r$180,f$3,d,r$90,arc$-360:.25`,
  ["("]: `u,f$1.25,r$180,d,arc$90:.5,f$3,arc$90:.5`,
  [")"]: `u,f$.75,d,arc$-90:.5,f$3,arc$-90:.5`,
  ["["]: `u,f$1.5,r$180,d,f$1,r$90,f$4,r$90,f$1`,
  ["]"]: `u,f$.5,d,f$1,l$90,f$4,l$90,f$1`,
  ["#"]: `sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2,u,r$90,f$.5,r$90,f$.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2`,
  ["%"]: `sa$90,u,f$2,r$45,d,f$2.83,u,l$45,f$-1.5,d,arc$-360:.5,u,f$1.5,l$90,f$1.5,d,arc$-360:.5`,
  ["_"]: `f$2`,
  ["|"]: `u,f$1,sa$90,d,f$4`,
  ["\\"]: `u,f$4,r$153.43,d,f$4.47`,
  ['"']: `u,f$.5,sa$90,f$3,d,f$1,u,r$90,f$1,r$90,f$1`,
  ["'"]: `u,f$1,sa$90,f$3,d,f$1`,
  [">"]: `sa$90,u,f$1,r$63.43,d,f$2.24,l$127,f$2.24`,
  // redo
  ["<"]: `u,f$2,sa$90,f$1,l$63.43,d,f$2.24,r$127,f$2.24`,
  // specials
  [" "]: ``,
  ["\r"]: ``,
  ["\n"]: ``
};
var allLetters = Object.keys(letters).join("");

// funcs.ts
var DrawBezier = (org, ang, scale, bezfunc, curveSizes, instructions) => {
  const turtle = new bt.Turtle();
  turtle.jump(org);
  if (instructions) {
    turtle.jump(RunInstructions(instructions, org, scale));
  }
  turtle.setAngle(ang);
  turtle.forward(curveSizes[0] * scale);
  bt.resample(turtle.path, 0.1);
  warp(turtle, (x) => bezfunc(x) * curveSizes[1] * scale);
  drawLines(turtle.lines());
  return;
};

var DrawText = (text, org, scale = 100, spacing = [2.5, 4.5]) => {
  let xInd = 0;
  let yInd = 0;
  for (const x of text.toLowerCase()) {
    if (allLetters.indexOf(x, 0) == -1) {
      RunInstructions(
        letters["?"],
        [
          org[0] + xInd * spacing[0] * scale,
          org[1] - yInd * spacing[1] * scale
        ],
        scale
      );
    } else {
      switch (x) {
        case "\r":
          xInd = 0;
          continue;
        case "\n":
          xInd = 0;
          yInd += 1;
          continue;
        default:
          if (typeof letters[x] == "string") {
            RunInstructions(
              letters[x],
              [
                org[0] + xInd * spacing[0] * scale,
                org[1] - yInd * spacing[1] * scale
              ],
              scale
            );
          } else if (typeof letters[x] == "function") {
            letters[x]([
              org[0] + xInd * spacing[0] * scale,
              org[1] - yInd * spacing[1] * scale
            ], scale);
          }
          break;
      }
      xInd += 1;
      continue;
    }
  }
  return;
};

setDocDimensions(Width, Height);
const Board = new bt.Turtle();
const Lines = new bt.Turtle();
const finalLines = [];

const top = [ //12 o clock
    [Width / 2, Height / 2 + radius + rayPadding],
    [Width / 2, Height / 2 + radius + rayPadding + visibility]
]
const topRight = [
    [Width / 2 + (radius - 5), Height / 2 + (radius - 5)],
    [Width / 2 + (radius - 5) + visibility, Height / 2 + (radius - 5) + visibility] 
]
const right = [
    [Width / 2 + radius + rayPadding, Height / 2],
    [Width / 2 + radius + rayPadding + visibility, Height / 2]
]
const bottomRight = [
    [Width / 2 + (radius - 5), Height / 2 - (radius - 5)],
    [Width / 2 + (radius - 5) + visibility, Height / 2 - (radius - 5) - visibility]
]
const bottom = [
    [Width / 2, Height / 2 - radius - rayPadding],
    [Width / 2, Height / 2 - radius - rayPadding - visibility]
]
const bottomLeft = [
    [Width / 2 - (radius - 5), Height / 2 - (radius - 5)],
    [Width / 2 - (radius - 5) - visibility, Height / 2 - (radius - 5) - visibility]
]
const left = [
    [Width / 2 - radius - rayPadding, Height / 2],
    [Width / 2 - radius - rayPadding - visibility, Height / 2]
]
const topLeft = [
    [Width / 2 - (radius - 5), Height / 2 + (radius - 5)],
    [Width / 2 - (radius - 5) - visibility, Height / 2 + (radius - 5) + visibility]
]

const rays = [
  top,
  topRight,
  right,
  bottomRight,
  bottom,
  bottomLeft,
  left,
  topLeft
]


for (let i = 0; i < 50; i++) {
  Board.forward(SunSize);
  Board.right(drawingConstant);
}

for (let i = 0; i < 30; i++) {
  Board.forward(MoonSize);
  Board.right(drawingConstant);
}

// add turtle to final lines
bt.join(finalLines, Board.lines());
bt.join(finalLines, Lines.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [Width / 2, Height / 2], cc);

// draw it
drawLines(finalLines);
if(percentCoverage == 1.0){
  drawLines(rays);
  TimeText = Times[5] + TimeText
}else if(percentCoverage < 1 && percentCoverage >= 0.95){
  drawLines([top,topRight,right]);  
  TimeText = Times[4] + TimeText
}else if(percentCoverage < 0.95 && percentCoverage >= 0.8){
  drawLines([top,topRight,right,bottomRight,bottom]);  
  TimeText = Times[3] + TimeText
}else if(percentCoverage < 0.8 && percentCoverage >= 0.4){
  drawLines([top,topRight,right,bottomRight,bottom,topLeft,left]);  
  TimeText = Times[2] + TimeText
}else{
  drawLines(rays);
  TimeText = Times[1] + TimeText
}

if(percentCoverage<=0){
  TimeText = Times[0] + " " + TimeZone
}

DrawText(EclipseText, [16, 151], 1.8);
DrawText(TimeText, [78, 7], 1.8);
if(percentCoverage >= 1){
  DrawText(TotalityText, [79,134],1.8);
}

// helper functions - added by Leo when porting piece from old library

function calculateBezierPoint(t, p0, p1, p2, p3) {
  let u = 1 - t
  let tt = t * t
  let uu = u * u
  let uuu = uu * u
  let ttt = tt * t

  let p = [uuu * p0[0], uuu * p0[1]] // u^3 * p0
  p[0] += 3 * uu * t * p1[0] // 3u^2t * p1
  p[1] += 3 * uu * t * p1[1]
  p[0] += 3 * u * tt * p2[0] // 3ut^2 * p2
  p[1] += 3 * u * tt * p2[1]
  p[0] += ttt * p3[0] // t^3 * p3
  p[1] += ttt * p3[1]

  return p
}

function findTForGivenX(xTarget, p0, p1, p2, p3) {
  let tolerance = 0.00001
  let t = 0.5 // Start with approximate solution
  let iterations = 0

  while (iterations < 1000) {
    // Max iterations to prevent infinite loop
    let p = calculateBezierPoint(t, p0, p1, p2, p3)
    let difference = p[0] - xTarget
    if (Math.abs(difference) < tolerance) {
      return t
    } else {
      t = t - difference / 2 // Approximate a new t value
    }
    iterations++
  }
  return t // Return the approximate t value
}

function getYForX(x, p0, p1, p2, p3) {
  let t = findTForGivenX(x, p0, p1, p2, p3)
  let p = calculateBezierPoint(t, p0, p1, p2, p3)
  return p[1]
}

function bezierEasing(initial, p0, p1, final) {
  return (x) =>
    getYForX(
      x,
      [0, initial],
      [Math.min(Math.max(0, p0[0]), 1), p0[1]],
      [Math.min(Math.max(0, p1[0]), 1), p1[1]],
      [1, final]
    )
}

function warp(turtle, fn, baseAngle = null) {
  const tValues = tValuesForPoints(turtle.path);
  const newPts = [];
  tValues.forEach((t, i) => {
    const pt = turtle.path.flat()[i];
    let angle = baseAngle ?? bt.getAngle(turtle.path, t);
    if (typeof angle === "function") {
      angle = angle(bt.getAngle(turtle.path, t));
    } else if (typeof angle === "number") {
      angle = angle;
    }
    const y = fn(t);
    const newPoint = rotate([0, y], angle);
    newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
  });
  turtle.path.flat().forEach((pt, i, arr) => {
    pt[0] = newPts[i][0];
    pt[1] = newPts[i][1];
  });
  return turtle

  function rotate(pt, angle, origin = [0, 0]) {
    let delta = angle / 180 * Math.PI;
    let hereX = pt[0] - origin[0];
    let hereY = pt[1] - origin[1];
    let newPoint = [
      hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
      hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
    ];
    return newPoint;
  }
}

function tValuesForPoints(polylines) {
  let totalLength = 0;
  let lengths = [];
  let tValues = [];
  let segmentLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 0; j < polyline2.length; j++) {
      if (j > 0) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        segmentLength = Math.sqrt(dx * dx + dy * dy);
        totalLength += segmentLength;
      }
      lengths.push(segmentLength);
    }
  }
  let accumulatedLength = 0;
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    tValues.push(accumulatedLength / totalLength);
  }
  return tValues;
};
