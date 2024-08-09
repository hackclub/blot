/*
@title: framed_landscape
@author: PonderSlime
@snapshot: example1.png
*/
const canvasWidth = 125;
const canvasHeight = 125;


/* ======= Customization ======= */

const frameType = "default"  //The current frames available are: "default", "ribbon"
const scale = (bt.randInRange(20, 25) + 0.7);    //Scale of the border

const isNight = true;    //Render night sky
const isCloudy = false;    // Render clouds
const moonRadius = 5; // Size of moon
const sunRays = 23;    // How many sun rays to spawn

const starCount = bt.randInRange(15, 40);    // How many stars to spawn
const starSize =  0.75;    // What size of stars do you want?
const cloudSize =  1;    // What s8ize of clouds do you want?

const cloudCount = 12;    // How many clouds to spawn

const distanceFalloff = 4;    // Distance falloff of terrain
const heightScale = 40.9;    // Multiply the terrain height by this
const seaLevel = 16.6;    // Height of the water

const noiseScale = bt.randInRange(0.3, 0.5);    // Noise randomization of terrain
const waveHeight = 0.16;    // Height of waves in the ocean

/* ======= End of Customization ======= */

setDocDimensions(canvasWidth, canvasHeight);

const resX = 5.16
const resY = 0.52

const cameraX = 23.54;
const time = 106;
let lineLength;
const eraseSize = 5 * 25;
let drawSize;
const dx = 1 / (resX * 10);
const dy = 1 / (resY * 10);
const xCenter = canvasWidth / 2;
const yCenter = canvasHeight / 2;
const globalScale = scale;
const waveScale = noiseScale * 27.55 * Math.sin(time * 0.1);
let maxHeights = Array(Math.floor(10 / dx)).fill(0);
const moonClipOffsetX = 0.5;
const moonClipOffsetY = -0.4;

const t = new bt.Turtle();
const sun = new bt.Turtle();
const moon = new bt.Turtle();
const t4 = new bt.Turtle();

const finalLines = [];
const borderLines = [];

let turn1 = 0;
let turn2 = 0;
let cloudHeight = 2.5;
let cloudHeightSize = 3;
if (frameType == "default") {
  turn1 = 34;
  turn2 = 90;
  drawSize = 2.0456 * scale;
  lineLength = 2.5 * scale
}
else if (frameType == "ribbon") {
  turn1 = 34;
  turn2 = 83;
  drawSize = 2.206 * scale
  lineLength = 2.4 * scale
}

const createShape = (turtle, n, size) => {
  const turnAngle = 360 / n;
  for (let i = 0; i < n; i++) {
    turtle.forward(size);
    turtle.left(turnAngle);
  }
}
const createLines = (canvasWidth, canvasHeight) => {
  const t = new bt.Turtle();
  for (let i = 0; i < canvasHeight / 1.5; i++) {
    t.forward(lineLength);
    t.up();
    t.left(turn1);
    t.forward(lineLength);
    t.left(turn2);
    t.forward(lineLength);
    t.left(turn1);
    t.down();
  }
  return t.lines();
}

function go(x, y) {
  t.goTo([x * globalScale, (y - 8) * globalScale])
}
// Generate a list of points that forms the circle for the border
let eraseCircle = [];
let drawCircle = [];

for (let i = 0; i < lineLength; i++) {
  eraseCircle.push([canvasWidth / 2 + eraseSize * Math.cos(2 * Math.PI * i / lineLength), canvasHeight / 2 + eraseSize * Math.sin(2 * Math.PI * i / lineLength)]);
  drawCircle.push([canvasWidth / 2 + drawSize * Math.cos(2 * Math.PI * i / lineLength), canvasHeight / 2 + drawSize * Math.sin(2 * Math.PI * i / lineLength)]);
}

function genHeight(x, y) {
  let height =
    (bt.noise([x * noiseScale + cameraX, Math.pow(y, 1.4) * noiseScale]) *
      heightScale) /
    (y + distanceFalloff)
  height = Math.max(
    height,
    (seaLevel + waveHeight * Math.sin(x * waveScale + Math.cos(y * 25.0))) /
    (y + 4)
  )
  return height
}

function drawLandscape() {
  for (let y = 0; y < +10; y += dy) {
    for (let x = 0; x < 10; x += dx) {
      let height = (4 * genHeight(x, y)) / 6.56
      if (x > 0) {
        t.down()
      } else {
        t.up()
      }
      if (height + y / 2 >= maxHeights[Math.floor(x / dx)]) {
        go(x, y / 2 + height)
        maxHeights[Math.floor(x / dx)] = height + y / 2
      } else {
        t.up()
        go(x, y / 2 + height)
      }
    }

    t.up()
    go(0, 0)
  }
}
let moonFaceCircle = [];
let moonCircle = [];

function drawSun() {
  if (!isNight) {
    sun.jump([(canvasWidth / 2) - moonRadius * 2, canvasHeight / 2]).setAngle(270).down().arc(360, moonRadius); // circle
    for (let i = 1; i < sunRays + 1; i++) {
      let angle = -i / (sunRays + 1) * 380;
      let distance = i % 2 == 1 ? 11 : 8;
      sun.jump([canvasWidth / 2 , canvasHeight / 2]).setAngle(270).down().arc(angle, moonRadius); // go to pos
      sun.setAngle(angle).up().forward(0.2).down().forward(distance); // sun ray
    }
  };
  if (isNight) {
    for (let i = 0; i < lineLength; i++) {
    moonFaceCircle.push([canvasWidth / 2 + (moonRadius) * Math.cos(2 * Math.PI * i / lineLength), canvasHeight / 2 + (moonRadius) * Math.sin(2 * Math.PI * i / lineLength)]);
    moonCircle.push([canvasWidth / 2 + (moonClipOffsetX) + (moonRadius) * Math.cos(2 * Math.PI * i / lineLength), canvasHeight / 2 + (moonClipOffsetY) + (moonRadius) * Math.sin(2 * Math.PI * i / lineLength)]);
    }
  }
}

let stars = [];
if (isNight) {
  cloudHeightSize = 6
  cloudHeight = 2.1
  for (let i = 0; i < starCount; i++) {
    const xCenter = (0.9*Math.random()+0.05)*canvasWidth;
    const yCenter = (0.9*Math.random()+0.05)*canvasHeight/1.75+canvasHeight/2.5;
    const randomSize = 1.5*Math.random() + 0.5;
    let star = [
      [xCenter+starSize*randomSize,yCenter],
      [xCenter+starSize*randomSize*0.2,yCenter+starSize*randomSize*0.2],
      [xCenter,yCenter+starSize*randomSize],
      [xCenter-starSize*randomSize*0.2,yCenter+starSize*randomSize*0.2],
      [xCenter-starSize*randomSize,yCenter],
      [xCenter-starSize*randomSize*0.2,yCenter-starSize*randomSize*0.2],
      [xCenter,yCenter-starSize*randomSize],
      [xCenter+starSize*randomSize*0.2,yCenter-starSize*randomSize*0.2],
      [xCenter+starSize*randomSize,yCenter]]
      stars.push(star);
    
  }
}
    
if (!isNight) {
  cloudHeight = 2.5
  cloudHeightSize = 3;
}
if (isCloudy) {
  for (let i = 0; i < cloudCount; i++) {
    const xCenter = (0.9*Math.random()+0.05)*canvasWidth;
    const yCenter = (0.9*Math.random()+0.05)*canvasHeight/cloudHeightSize+canvasHeight/cloudHeight;
    const randomSize = (1.5*Math.random() + 1) * (cloudSize)*0.15;
    let cloudType = Math.floor(Math.random() * 2)
      ;
    if (Math.min(drawSize) < randomSize * (cloudSize * 0.1)){
      continue // Star is too close to moon or sun. It would be covered, so don't draw it.
    }
    if (cloudType == 0) {
      cloudType = 1
    }
    if (cloudType == 1) {
      t4.jump([xCenter,yCenter])
      t4.down();
      t4.setAngle(0);
      t4.forward(47.54 * randomSize);
      t4.arc(103, 7 * randomSize);
      t4.setAngle(102);
      t4.arc(86, 8 * randomSize);
      t4.setAngle(-93);
      t4.arc(125, -9 * randomSize);
      t4.setAngle(172);
      t4.arc(28, 23 * randomSize);
      t4.setAngle(145);
      t4.arc(113, 15 * randomSize);
      t4.setAngle(215);
      t4.arc(28, 7 * randomSize);
      t4.arc(106, 7 * randomSize);
    }
    else if (cloudType == 2) {
      t4.jump([xCenter,yCenter])
      t4.down();
      t4.setAngle(0);
      t4.forward(36.28 * randomSize);
      t4.arc(110, 8 * randomSize);
      t4.setAngle(102);
      t4.arc(48, 10 * randomSize);
      t4.setAngle(75);
      t4.arc(121, 6* randomSize);
      t4.setAngle(90);
      t4.arc(125, 8 * randomSize);
      t4.setAngle(136);
      t4.arc(127, 8* randomSize);
      t4.setAngle(160);
      t4.arc(127, 10* randomSize);
      t4.setAngle(235.55);
      t4.arc(124.96, 9* randomSize);
    }
  }
}
drawLandscape()
drawSun()
const lines = createLines(canvasWidth, canvasHeight);
const moonFacePolylines = [moonFaceCircle];
const moonPolylines = [moonCircle];
const moonPolylines2 = [moonCircle];

bt.scale(t.path, canvasWidth / bt.bounds(t.path).width);
bt.translate(t.path, [canvasWidth / 2, -24], bt.bounds(t.path).cb);
bt.translate(sun.path, [canvasWidth / 2, 0], [canvasWidth - canvasWidth / 3 * scale / 4 + 175, 0 - canvasHeight / 4 * scale / 20]);
bt.translate(moonFacePolylines, [canvasWidth / 2, 0], [canvasWidth - canvasWidth / 3 * scale / 4 + 175 - moonRadius, 0 - canvasHeight / 5 * scale / 20]);
bt.translate(moonPolylines, [canvasWidth / 2 + 2, 0 - 1], [canvasWidth - canvasWidth / 3 * scale / 4 + 175 - moonRadius, 0 - canvasHeight / 5 * scale / 20]);

bt.translate(lines, [canvasWidth / 2, canvasHeight / 2], bt.bounds(lines).cc);

drawLines(stars, { stroke: "black", fill: "white" });

drawLines(t.path, { stroke: "black", fill: "white" });

bt.difference(moonFacePolylines, moonPolylines);
drawLines(moonPolylines2, { stroke: "white", fill: "white" });
drawLines(moonFacePolylines, { stroke: "black", fill: "white" });

const subjectPolylines = [eraseCircle];
const clippingPolylines = [drawCircle];
bt.difference(subjectPolylines, clippingPolylines);
drawLines(sun.path, { stroke: "black", fill: "white" });
bt.join(borderLines, subjectPolylines);
drawLines(t4.path, { stroke: "black", fill: "white" });

drawLines(borderLines, { stroke: "none", fill: "white" });
drawLines(lines);
