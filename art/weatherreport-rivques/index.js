/*
@title: Weather Report
@author: rivques
@snapshot: weatherreport-main.png
*/
/*
Rivques' Weather Report
This Blot program automatically creates a graphical weather report for your location.
To use it, either sign up for a free weatherapi.com account and put your API key on line 23
or leave that blank and just play around with the settings starting from line 28.

Huge thanks to @geshmit for making BlotFont, it made this much easier!
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const globalOrigin = [0, 0]; // for moving the whole icon around
const scalingFactor = 1.0;
// there's more settings at the top of some turtle functions

const API_KEY = "" // put your weatherapi.com key here!

// these defaults apply if there's no weatherapi key, play around with them!
// assumptions: there's only rain, snow, or lightning if there's a cloud
// and there's never more than 2 of rain, snow, or lightning
let doSun = true;
let doCloud = true;
let doRain = true;
let doSnow = false;
let doLightning = false;
let conditionString = "Rain showers";
let maxtemp_f = 96;
let mintemp_f = 69;

// the following monstrosity is a conversion from weatherapi's condition codes to my icon parameters
const ICON_DATA = JSON.parse(`{"1000":{"doSun":true,"doCloud":false,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Clear"},"1003":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Partly cloudy"},"1006":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Cloudy"},"1009":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Cloudy"},"1030":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Mist"},"1063":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Rain possible"},"1066":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow possible"},"1069":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":true,"doLightning":false,"desc":"Sleet possible"},"1072":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Frz. rain poss."},"1087":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":true,"desc":"Thunder poss."},"1114":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow"},"1117":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Blizzard"},"1135":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Fog"},"1147":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":false,"doLightning":false,"desc":"Freezing fog"},"1150":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Light rain"},"1153":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Light rain"},"1168":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Freezing rain"},"1171":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Hvy. frz. rain"},"1180":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Light rain poss."},"1183":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Light rain"},"1186":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Moderate rain"},"1189":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Moderate rain"},"1192":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Heavy rain poss."},"1195":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Heavy rain"},"1198":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Lght. frz. rain"},"1201":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Freezing rain"},"1204":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":true,"doLightning":false,"desc":"Light sleet"},"1207":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":true,"doLightning":false,"desc":"Sleet"},"1210":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow poss."},"1213":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Light snow"},"1216":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow poss."},"1219":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow"},"1222":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Heavy snow"},"1225":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Heavy snow"},"1237":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Ice"},"1240":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Light rain"},"1243":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Rain"},"1246":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":false,"desc":"Heavy Rain"},"1249":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":true,"doLightning":false,"desc":"Light Sleet"},"1252":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":true,"doLightning":false,"desc":"Sleet"},"1255":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Light snow"},"1258":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Snow"},"1261":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Sleet"},"1264":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":false,"desc":"Heavy sleet"},"1273":{"doSun":true,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":true,"desc":"Light thunder"},"1276":{"doSun":false,"doCloud":true,"doRain":true,"doSnow":false,"doLightning":true,"desc":"Thunderstorm"},"1279":{"doSun":true,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":true,"desc":"Thundersnow"},"1282":{"doSun":false,"doCloud":true,"doRain":false,"doSnow":true,"doLightning":true,"desc":"Thundersnow"}}`)

function getSunTurtle(isFullSun){
  // settings
  const origin = [1, 0];
  const startAngle = 50;
  const partialEndAngle = 225;
  const sunCircleRadius = 7;
  const numRays = 17;
  const rayLength = 7;
  const raySpacing = 4;

  // setup
  const turtle = createTurtle();
  const circleAngle = partialEndAngle-startAngle

  // drawing inner circle

  turtle.up();
  turtle.goTo(origin);
  turtle.setAngle(startAngle);
  turtle.forward(sunCircleRadius);
  turtle.setAngle(startAngle + 90);
  turtle.down(); // all of that was to get to the right starting location
  turtle.arc(isFullSun ? 360 : circleAngle, sunCircleRadius);
  turtle.up();

  // drawing outer rays
  for(let i = 0; i < numRays; i++){
    const thisAngle = i*(360/numRays);
    if(isFullSun|| ((thisAngle >= Math.min(startAngle, startAngle+circleAngle)) && (thisAngle <= Math.max(startAngle, startAngle+circleAngle)))){
      // ^ that's an inelegant check to see if this ray should be drawn
      turtle.goTo(origin);
      turtle.setAngle(thisAngle);
      turtle.forward(sunCircleRadius + raySpacing);
      turtle.down();
      turtle.forward(rayLength);
      turtle.up();
    }
  }
  
  return turtle;
}

function getCloudTurtle(){
  // settings
  const origin = [0, -17];
  
  // setup
  const turtle = createTurtle();

  // drawing
  turtle.up();
  turtle.goTo(origin);
  turtle.down();
  turtle.forward(37); // this was all just trial and error, it's a pain to adjust cloud shape
  turtle.setAngle(5);
  turtle.arc(143, 9);
  turtle.setAngle(106);
  turtle.arc(129,16);
  turtle.setAngle(151);
  turtle.arc(117,10);
  turtle.setAngle(210);
  turtle.arc(145,7);
  
  return turtle;
}

function getRainTurtle(isSharing){
  // settings
  const origin = [6, -20];
  const numLinesFull = 6;
  const numLinesSharing = 3;
  const lineAngle = 250;
  const lineLength = 15;
  const lineSpacing = 5;

  // setup
  const turtle = createTurtle();
  const numLines = isSharing ? numLinesSharing : numLinesFull;

  // drawing
  turtle.up();
  for(let i = 0; i < numLines; i++){
    const startPoint = [origin[0] + (i * lineSpacing), origin[1]];
    turtle.goTo(startPoint);
    turtle.setAngle(lineAngle);
    turtle.down();
    turtle.forward(lineLength);
    turtle.up();
  }

  return turtle;
}

function getSnowTurtle(isSharing, isPushedRight){
  // settings
  let origin = [29, -27];
  const numFlakesFull = 2;
  const numFlakesSharing = 1;
  const lineLength = 6;
  const flakeSpacing = -18;
  if(isPushedRight){
    origin[0] = origin[0] + flakeSpacing;
  }

  // setup
  const turtle = createTurtle();
  const numFlakes = isSharing ? numFlakesSharing : numFlakesFull;

  // drawing
  turtle.up();
  for(let i = 0; i < numFlakes; i++){
    const flakeOrigin = [origin[0] + (i * flakeSpacing), origin[1]];
    for(let j = 0; j < 6; j++){
      const startAngle = j * 60;
      turtle.goTo(flakeOrigin);
      turtle.setAngle(startAngle);
      turtle.down();
      turtle.forward(lineLength);
      turtle.up();
      for(let k = -1; k < 2; k+= 2) {
        turtle.goTo(flakeOrigin); // a little flair on the snowflakes
        turtle.setAngle(startAngle); // i don't love the 3-nested for loop but it works
        turtle.forward(lineLength*0.6);
        turtle.setAngle(startAngle + (54*k));
        turtle.down();
        turtle.forward(lineLength*0.4);
        turtle.up();
      }
    }
  }

  return turtle;
}

function getLightningTurtle(){
  // settings
  const origin = [25, -21];

  // setup
  const turtle = createTurtle();

  // drawing
  turtle.up(); // this is another ugly trial and error one
  turtle.goTo(origin);
  turtle.down();
  turtle.forward(5); // head over...
  turtle.setAngle(247);
  turtle.forward(6); // down...
  turtle.setAngle(16);
  turtle.forward(3);
  turtle.setAngle(233);
  turtle.forward(11);
  turtle.setAngle(69); // aaand turn around
  turtle.forward(7);
  turtle.setAngle(192);
  turtle.forward(3);
  turtle.goTo(origin);
  
  return turtle;
}

function drawText(){
  const textOrigin = [35 + globalOrigin[0], 79 + globalOrigin[1]];
  const date = new Date();
  let weatherString = "";
  weatherString += `${date.toLocaleString("en-US", {weekday: "long"})} `;
  weatherString += `${date.toLocaleString("en-US", {dateStyle: "short"})}\n`;
  weatherString += `H: ${maxtemp_f} F L: ${mintemp_f} F\n`;
  weatherString += conditionString;
  DrawText(weatherString, textOrigin, 1.5);
}

// from BlotFont -- https://github.com/geschmit/blotfont
// built code pasted from https://raw.githubusercontent.com/hackclub/blot/main/art/blotfont-geschmit/index.js
// because afaik there's not a great way to include libraries
// non-library code resumes around line 426
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
  const turtle = createTurtle(org);
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
  drawTurtles([turtle]);
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
  const turtle = createTurtle(org);
  if (instructions) {
    turtle.jump(RunInstructions(instructions, org, scale));
  }
  turtle.setAngle(ang);
  turtle.forward(curveSizes[0] * scale);
  turtle.resample(0.1);
  turtle.warp((x) => bezfunc(x) * curveSizes[1] * scale);
  drawTurtles([turtle]);
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


// talk to weatherapi
if(API_KEY != ""){
  //console.log("HEY RIV, YOU FORGOT TO REMOVE YOUR API KEY BEFORE PUSHING, YOU SHOULD PROBABLY REMOVE THAT"); // save future me from inconvenience
  const url = "https://api.weatherapi.com/v1/forecast.json?q=auto:ip&days=1&aqi=no&alerts=no&key=" + API_KEY;
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send();
  const forecast = JSON.parse(req.response).forecast.forecastday[0].day; // see https://www.weatherapi.com/api-explorer.aspx#forecast
  //console.log(forecast)
  const thisIconData = ICON_DATA[forecast.condition.code];
  doSun = thisIconData.doSun;
  doCloud = thisIconData.doCloud;
  doRain = thisIconData.doRain;
  doSnow = thisIconData.doSnow;
  doLightning = thisIconData.doLightning;
  maxtemp_f = forecast.maxtemp_f;
  mintemp_f = forecast.mintemp_f;
  conditionString = thisIconData.desc;
}

// collect everything together
let turtlesToDraw = [];

if (doSun){
  turtlesToDraw.push(getSunTurtle(!doCloud));
}
if(doCloud){
  turtlesToDraw.push(getCloudTurtle());
}
if(doRain){
  turtlesToDraw.push(getRainTurtle(doSnow || doLightning));
}
if(doSnow){
  turtlesToDraw.push(getSnowTurtle(doRain || doLightning, doLightning))
}
if(doLightning){
  turtlesToDraw.push(getLightningTurtle());
}

const finalTurtle = createTurtle();
for (let turtle of turtlesToDraw){
  finalTurtle.join(turtle);
}

finalTurtle.translate([width/2+globalOrigin[0], height/2+globalOrigin[1]], finalTurtle.ct); // center the final result
finalTurtle.scale(scalingFactor, [width/2+globalOrigin[0], height/2+globalOrigin[1]]);
drawTurtles([finalTurtle]);

drawText();