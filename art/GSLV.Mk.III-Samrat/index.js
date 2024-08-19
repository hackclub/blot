/*
@title: GSLV.Mk.III
@author: Samrat
@snapshot: snapshot2.png
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);

const codeSnippet1 = () => {
const width = 200;
const height = 600;

setDocDimensions(width, height);

const sky = [
  [0, 0],
  [width, 0],
  [width, height],
  [0, height],
  [0, 0]
];

drawLines([sky], { fill: "skyblue" });

const bodyWidth = 50;
const bodyHeight = 300;

const body = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([body], { fill: "white" });

const noseHeight = 80;
const noseCone = [
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2, height / 2 + bodyHeight / 2 + noseHeight],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2]
];

drawLines([noseCone], { fill: "white" });

const finHeight = 50;
const finWidth = 30;
const leftFin = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

const rightFin = [
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([leftFin], { fill: "white" });
drawLines([rightFin], { fill: "white" });

const boosterWidth = 20;
const boosterHeight = 250;
const leftBooster = [
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2]
];

const rightBooster = [
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2]
];

drawLines([leftBooster], { fill: "white" });
drawLines([rightBooster], { fill: "white" });

const flagPosition = height / 1.7 + bodyHeight / 4;

const flagWidth = 30;
const flagHeight = 15;

const saffronStripe = [
  [width / 2 - flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition]
];

const whiteStripe = [
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3]
];

const greenStripe = [
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3]
];

drawLines([saffronStripe], { fill: "orange" });
drawLines([whiteStripe], { fill: "white" });
drawLines([greenStripe], { fill: "green" });

const chakraRadius = flagHeight / 6;
const chakraCenter = [width / 2, flagPosition - flagHeight / 2];
const chakra = [];
const chakraLines = 24;

for (let i = 0; i < chakraLines; i++) {
  const angle = (2 * Math.PI / chakraLines) * i;
  const x = chakraCenter[0] + chakraRadius * Math.cos(angle);
  const y = chakraCenter[1] + chakraRadius * Math.sin(angle);
  chakra.push([chakraCenter, [x, y]]);
}

const chakraOuter = new bt.Turtle();
chakraOuter.up();
chakraOuter.goTo([chakraCenter[0], chakraCenter[1] - chakraRadius]);
chakraOuter.down();
chakraOuter.arc(360, chakraRadius);

drawLines([chakraOuter.lines()[0]], { stroke: "blue" });
drawLines(chakra, { stroke: "blue" });

var letters = {
  i: `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  s: `f$1,arc$-180:1,arc$180:1,f$1`,
  r: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284`,
  o: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1`
};

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

var DrawVerticalText = (text, org, scale = 1, spacing = 25) => {
  let yInd = 0;
  for (const x of text.toLowerCase()) {
    if (letters[x]) {
      RunInstructions(letters[x], [org[0], org[1] - yInd * spacing], scale);
      yInd += 1;
    }
  }
  return;
};

const letterSpacing = 25;
const startX = width / 2 - 5;
const startY = height / 2 + bodyHeight / 2 - 60;

DrawVerticalText("ISRO", [startX, startY], 2.5, letterSpacing);

const landHeight = 100;
const land = [
  [0, 0],
  [width, 0],
  [width, landHeight],
  [0, landHeight],
  [0, 0]
];

drawLines([land], { fill: "green" });

const cloud = (cx, cy, r) => {
  const t = new bt.Turtle();
  t.up();
  t.goTo([cx, cy - r]);
  t.down();
  t.arc(360, r);
  return t.lines();
};

const cloud1 = [
  ...cloud(40, height - 100, 15),
  ...cloud(60, height - 100, 20),
  ...cloud(80, height - 100, 15),
  ...cloud(60, height - 110, 20)
];

const cloud2 = [
  ...cloud(100, height - 150, 20),
  ...cloud(120, height - 150, 25),
  ...cloud(140, height - 150, 20),
  ...cloud(120, height - 160, 25)
];

const cloud3 = [
  ...cloud(50, height - 200, 15),
  ...cloud(70, height - 200, 20),
  ...cloud(90, height - 200, 15),
  ...cloud(70, height - 210, 20)
];

// drawLines(cloud1, { fill: "white" });
// drawLines(cloud2, { fill: "lightgrey" });
// drawLines(cloud3, { fill: "grey" });

// const rocket = [
//   ...body, 
//   ...noseCone, 
//   ...leftFin, 
//   ...rightFin, 
//   ...leftBooster, 
//   ...rightBooster, 
//   ...saffronStripe, 
//   ...whiteStripe, 
//   ...greenStripe, 
//   ...chakraOuter.lines()[0], 
//   ...chakra
// ];

// bt.translate(rocket, [0, -150]);
// drawLines(rocket);

  const t = new bt.Turtle();
  t.forward(100).right(120).forward(100).right(120).forward(100);
  drawLines(t.lines());
};

const codeSnippet2 = () => {
const width = 200;
const height = 600;

setDocDimensions(width, height);

const sky = [
  [0, 0],
  [width, 0],
  [width, height],
  [0, height],
  [0, 0]
];

drawLines([sky], { fill: "skyblue" });

const bodyWidth = 50;
const bodyHeight = 300;

const body = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([body], { fill: "white" });

const noseHeight = 80;
const noseCone = [
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2, height / 2 + bodyHeight / 2 + noseHeight],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2]
];

drawLines([noseCone], { fill: "white" });

const finHeight = 50;
const finWidth = 30;
const leftFin = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

const rightFin = [
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([leftFin], { fill: "white" });
drawLines([rightFin], { fill: "white" });

const boosterWidth = 20;
const boosterHeight = 250;
const leftBooster = [
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2]
];

const rightBooster = [
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2]
];

drawLines([leftBooster], { fill: "white" });
drawLines([rightBooster], { fill: "white" });

const flagPosition = height / 1.7 + bodyHeight / 4;

const flagWidth = 30;
const flagHeight = 15;

const saffronStripe = [
  [width / 2 - flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition]
];

const whiteStripe = [
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3]
];

const greenStripe = [
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3]
];

drawLines([saffronStripe], { fill: "orange" });
drawLines([whiteStripe], { fill: "white" });
drawLines([greenStripe], { fill: "green" });

const chakraRadius = flagHeight / 6;
const chakraCenter = [width / 2, flagPosition - flagHeight / 2];
const chakra = [];
const chakraLines = 24;

for (let i = 0; i < chakraLines; i++) {
  const angle = (2 * Math.PI / chakraLines) * i;
  const x = chakraCenter[0] + chakraRadius * Math.cos(angle);
  const y = chakraCenter[1] + chakraRadius * Math.sin(angle);
  chakra.push([chakraCenter, [x, y]]);
}

const chakraOuter = new bt.Turtle();
chakraOuter.up();
chakraOuter.goTo([chakraCenter[0], chakraCenter[1] - chakraRadius]);
chakraOuter.down();
chakraOuter.arc(360, chakraRadius);

drawLines([chakraOuter.lines()[0]], { stroke: "blue" });
drawLines(chakra, { stroke: "blue" });

var letters = {
  i: `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  s: `f$1,arc$-180:1,arc$180:1,f$1`,
  r: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284`,
  o: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1`
};

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

var DrawVerticalText = (text, org, scale = 1, spacing = 25) => {
  let yInd = 0;
  for (const x of text.toLowerCase()) {
    if (letters[x]) {
      RunInstructions(letters[x], [org[0], org[1] - yInd * spacing], scale);
      yInd += 1;
    }
  }
  return;
};

const letterSpacing = 25;
const startX = width / 2 - 5;
const startY = height / 2 + bodyHeight / 2 - 60;

DrawVerticalText("ISRO", [startX, startY], 2.5, letterSpacing);

const flameHeight = 60;
const flameWidth = 30;

const flameYellow = bt.catmullRom([
  [width / 2 - bodyWidth / 4, height / 2 - bodyHeight / 2],
  [width / 2 - flameWidth, height / 2 - bodyHeight / 2 - flameHeight / 2],
  [width / 2, height / 2 - bodyHeight / 2 - flameHeight],
  [width / 2 + flameWidth, height / 2 - bodyHeight / 2 - flameHeight / 2],
  [width / 2 + bodyWidth / 4, height / 2 - bodyHeight / 2]
]);

const flameOrange = bt.catmullRom([
  [width / 2 - bodyWidth / 6, height / 2 - bodyHeight / 2],
  [width / 2 - flameWidth / 2, height / 2 - bodyHeight / 2 - flameHeight / 3],
  [width / 2, height / 2 - bodyHeight / 2 - flameHeight * 2 / 3],
  [width / 2 + flameWidth / 2, height / 2 - bodyHeight / 2 - flameHeight / 3],
  [width / 2 + bodyWidth / 6, height / 2 - bodyHeight / 2]
]);

drawLines([flameYellow], { fill: "yellow" });
drawLines([flameOrange], { fill: "orange" });

const cloud = (cx, cy, r) => {
  const t = new bt.Turtle();
  t.up();
  t.goTo([cx, cy - r]);
  t.down();
  t.arc(360, r);
  return t.lines();
};

const cloud1 = [
  ...cloud(40, height - 100, 15),
  ...cloud(60, height - 100, 20),
  ...cloud(80, height - 100, 15),
  ...cloud(60, height - 110, 20)
];

const cloud2 = [
  ...cloud(100, height - 150, 20),
  ...cloud(120, height - 150, 25),
  ...cloud(140, height - 150, 20),
  ...cloud(120, height - 160, 25)
];

const cloud3 = [
  ...cloud(50, height - 200, 15),
  ...cloud(70, height - 200, 20),
  ...cloud(90, height - 200, 15),
  ...cloud(70, height - 210, 20)
];

// drawLines(cloud1, { fill: "white" });
// drawLines(cloud2, { fill: "lightgrey" });
// drawLines(cloud3, { fill: "grey" });

// const rocket = [
//   ...body, 
//   ...noseCone, 
//   ...leftFin, 
//   ...rightFin, 
//   ...leftBooster, 
//   ...rightBooster, 
//   ...saffronStripe, 
//   ...whiteStripe, 
//   ...greenStripe, 
//   ...chakraOuter.lines()[0], 
//   ...chakra, 
//   ...flameYellow,
//   ...flameOrange
// ];

// bt.translate(rocket, [0, -100]);
// drawLines(rocket);

  const t = new bt.Turtle();
  const s = 50;
  drawLines([
    [[0, 0], [0, s], [s, s], [s, 0], [0, 0]]
  ]);
};

const codeSnippet3 = () => {
const width = 200;
const height = 600;
const middleHeight = height / 2;
const arcPosition = 0;

setDocDimensions(width, height);

const background = [
  [0, 0],
  [width, 0],
  [width, height],
  [0, height],
  [0, 0]
];

drawLines([background], { fill: "black" });

const addStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * width;
    const y = Math.random() * (height / 2) + middleHeight;
    const star = [[x, y], [x + 0.5, y + 0.5]];
    stars.push(star);
  }
  drawLines(stars, { stroke: "white" });
};

addStars(100);

const skyBlueArc = new bt.Turtle();
skyBlueArc.up();
skyBlueArc.goTo([0, arcPosition]);
skyBlueArc.down();
skyBlueArc.arc(180, width);

drawLines([skyBlueArc.lines()[0]], { fill: "skyblue" });

const addLandPatches = (count) => {
  const landPatches = [];
  for (let i = 0; i < count; i++) {
    const cx = Math.random() * width;
    const cy = Math.random() * (middleHeight / 2) + arcPosition;
    const r = Math.random() * 10 + 5;
    const t = new bt.Turtle();
    t.up();
    t.goTo([cx, cy - r]);
    t.down();
    t.arc(360, r);
    // landPatches.push(...t.lines());
  }
  drawLines(landPatches, { fill: "green" });
};

addLandPatches(10);

const bodyWidth = 50;
const bodyHeight = 300;

const body = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([body], { fill: "white" });

const noseHeight = 80;
const noseCone = [
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2, height / 2 + bodyHeight / 2 + noseHeight],
  [width / 2 + bodyWidth / 2, height / 2 + bodyHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + bodyHeight / 2]
];

drawLines([noseCone], { fill: "white" });

const finHeight = 50;
const finWidth = 30;
const leftFin = [
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2]
];

const rightFin = [
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + finWidth, height / 2 - bodyHeight / 2 - finHeight],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2 - finHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2]
];

drawLines([leftFin], { fill: "white" });
drawLines([rightFin], { fill: "white" });

const boosterWidth = 20;
const boosterHeight = 250;
const leftBooster = [
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 - bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 - bodyWidth / 2 - boosterWidth, height / 2 - bodyHeight / 2]
];

const rightBooster = [
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 + boosterHeight / 2],
  [width / 2 + bodyWidth / 2, height / 2 - bodyHeight / 2],
  [width / 2 + bodyWidth / 2 + boosterWidth, height / 2 - bodyHeight / 2]
];

drawLines([leftBooster], { fill: "white" });
drawLines([rightBooster], { fill: "white" });

const flagPosition = height / 1.7 + bodyHeight / 4;

const flagWidth = 30;
const flagHeight = 15;

const saffronStripe = [
  [width / 2 - flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition]
];

const whiteStripe = [
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight / 3]
];

const greenStripe = [
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - 2 * flagHeight / 3],
  [width / 2 + flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - flagHeight],
  [width / 2 - flagWidth / 2, flagPosition - 2 * flagHeight / 3]
];

drawLines([saffronStripe], { fill: "orange" });
drawLines([whiteStripe], { fill: "white" });
drawLines([greenStripe], { fill: "green" });

const chakraRadius = flagHeight / 6;
const chakraCenter = [width / 2, flagPosition - flagHeight / 2];
const chakra = [];
const chakraLines = 24;

for (let i = 0; i < chakraLines; i++) {
  const angle = (2 * Math.PI / chakraLines) * i;
  const x = chakraCenter[0] + chakraRadius * Math.cos(angle);
  const y = chakraCenter[1] + chakraRadius * Math.sin(angle);
  chakra.push([chakraCenter, [x, y]]);
}

const chakraOuter = new bt.Turtle();
chakraOuter.up();
chakraOuter.goTo([chakraCenter[0], chakraCenter[1] - chakraRadius]);
chakraOuter.down();
chakraOuter.arc(360, chakraRadius);

drawLines([chakraOuter.lines()[0]], { stroke: "blue" });
drawLines(chakra, { stroke: "blue" });

var letters = {
  i: `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  s: `f$1,arc$-180:1,arc$180:1,f$1`,
  r: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284`,
  o: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1`
};

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

var DrawVerticalText = (text, org, scale = 1, spacing = 25) => {
  let yInd = 0;
  for (const x of text.toLowerCase()) {
    if (letters[x]) {
      RunInstructions(letters[x], [org[0], org[1] - yInd * spacing], scale);
      yInd += 1;
    }
  }
  return;
};

const letterSpacing = 25;
const startX = width / 2 - 5;
const startY = height / 2 + bodyHeight / 2 - 60;

DrawVerticalText("ISRO", [startX, startY], 2.5, letterSpacing);

const flameHeight = 60;
const flameWidth = 30;

const flameYellow = bt.catmullRom([
  [width / 2 - bodyWidth / 4, height / 2 - bodyHeight / 2],
  [width / 2 - flameWidth * 0.8, height / 2 - bodyHeight / 2 - flameHeight * 0.8],
  [width / 2 - flameWidth * 0.4, height / 2 - bodyHeight / 2 - flameHeight * 0.6],
  [width / 2, height / 2 - bodyHeight / 2 - flameHeight],
  [width / 2 + flameWidth * 0.4, height / 2 - bodyHeight / 2 - flameHeight * 0.6],
  [width / 2 + flameWidth * 0.8, height / 2 - bodyHeight / 2 - flameHeight * 0.8],
  [width / 2 + bodyWidth / 4, height / 2 - bodyHeight / 2]
]);

const flameOrange = bt.catmullRom([
  [width / 2 - bodyWidth / 6, height / 2 - bodyHeight / 2],
  [width / 2 - flameWidth * 0.6, height / 2 - bodyHeight / 2 - flameHeight * 0.7],
  [width / 2 - flameWidth * 0.2, height / 2 - bodyHeight / 2 - flameHeight * 0.5],
  [width / 2, height / 2 - bodyHeight / 2 - flameHeight * 0.8],
  [width / 2 + flameWidth * 0.2, height / 2 - bodyHeight / 2 - flameHeight * 0.5],
  [width / 2 + flameWidth * 0.6, height / 2 - bodyHeight / 2 - flameHeight * 0.7],
  [width / 2 + bodyWidth / 6, height / 2 - bodyHeight / 2]
]);

drawLines([flameYellow], { fill: "yellow" });
drawLines([flameOrange], { fill: "orange" });

const cloud = (cx, cy, r) => {
  const t = new bt.Turtle();
  t.up();
  t.goTo([cx, cy - r]);
  t.down();
  t.arc(360, r);
  return t.lines();
};

const cloud1 = [
  ...cloud(40, height - 100, 15),
  ...cloud(60, height - 100, 20),
  ...cloud(80, height - 100, 15),
  ...cloud(60, height - 110, 20)
];

const cloud2 = [
  ...cloud(100, height - 150, 20),
  ...cloud(120, height - 150, 25),
  ...cloud(140, height - 150, 20),
  ...cloud(120, height - 160, 25)
];

const cloud3 = [
  ...cloud(50, height - 200, 15),
  ...cloud(70, height - 200, 20),
  ...cloud(90, height - 200, 15),
  ...cloud(70, height - 210, 20)
];

// drawLines(cloud1, { fill: "white" });
// drawLines(cloud2, { fill: "lightgrey" });
// drawLines(cloud3, { fill: "grey" });

// const rocket = [
//   ...body, 
//   ...noseCone, 
//   ...leftFin, 
//   ...rightFin, 
//   ...leftBooster, 
//   ...rightBooster, 
//   ...saffronStripe, 
//   ...whiteStripe, 
//   ...greenStripe, 
//   ...chakraOuter.lines()[0], 
//   ...chakra, 
//   ...flameYellow,
//   ...flameOrange
// ];

// bt.translate(rocket, [0, -100]);
// drawLines(rocket);

  const curve = bt.catmullRom([[0, 0], [30, 20], [50, 100], [125, 125]]);
  drawLines([curve]);
};


const codeSnippets = [codeSnippet1, codeSnippet2, codeSnippet3];

if (typeof globalThis.currentIndex === 'undefined') {
  globalThis.currentIndex = 0;
}


codeSnippets[globalThis.currentIndex]();

globalThis.currentIndex = (globalThis.currentIndex + 1) % codeSnippets.length;
