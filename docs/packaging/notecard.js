
const buildno = 7; // this is an example number, please change it for the build being packed

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
        turtle.arc(data[0], data[1] * scale);
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
      xInd += 1;
      continue;
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

// examples/card.ts
var CreateTube = (char, org, scale) => {
  if (typeof letters[char[0]] == "function") {
    letters[char[0]](org, scale);
  } else {
    RunInstructions(letters[char[0]], org, scale);
  }
  RunInstructions("u,sa$90,f$4.5,l$90,d,f$.5,l$90,f$4.5,arc$-90:.5,f$2,arc$-90:.5,f$4.5,l$90,f$.5,arc$90:1,sa$270,u,f$0.025,d,arc$90:1", org, scale);
  RunInstructions("u,sa$270,f$0.5,d,f$1,u,l$90,f$.5,l$90,d,f$1,u,r$90,f$.5,r$90,d,f$1,u,l$90,f$.5,l$90,d,f$1,u,r$90,f$.5,r$90,d,f$1", org, scale);
  return;
};
setDocDimensions(125, 125);
var blotLogo = createTurtle();
blotLogo.fromSVG(String.raw`<svg viewBox="57.38 43.015 367.274 376.623" xmlns="http://www.w3.org/2000/svg">  <defs></defs>  <path d="M 229.465 49.614 C 226.882 50.82 224.204 53.196 222.465 55.823 C 220.043 59.483 219.649 61.07 219.649 67.152 C 219.649 73.606 220.065 75.046 224.399 83.611 C 228.052 90.828 229.144 94.062 229.127 97.611 C 229.084 106.564 223.113 114.605 213.2 119.058 C 206.902 121.886 193.88 121.851 185.97 118.985 C 172.01 113.925 160.999 103.433 146.35 81.234 C 140.546 72.439 133.514 62.962 130.723 60.173 C 113.693 43.156 88.517 46.893 82.578 67.32 C 81.211 72.024 81.12 73.955 82.047 78.572 C 85.033 93.438 95.277 103.296 116.42 111.651 C 136.259 119.489 144.374 125.299 149.057 135.017 C 154.371 146.045 154.049 158.374 148.103 171.486 C 144.111 180.29 140.001 185.121 133.931 188.146 C 127.552 191.325 122.402 191.441 108.149 188.725 C 95.482 186.311 89.241 186.211 82.177 188.309 C 71.286 191.544 65.229 197.542 63.058 207.242 C 62.096 211.539 62.187 213.353 63.612 218.304 C 65 223.13 66.376 225.262 71.051 229.834 C 77.874 236.508 82.417 238.267 96.587 239.726 C 113.372 241.454 118.973 243.92 122.185 250.996 C 124.783 256.719 124.631 261.366 121.648 267.35 C 118.322 274.025 112.375 280.065 100.483 288.846 C 88.013 298.055 82.053 304.181 78.486 311.457 C 71.071 326.583 78.778 342.905 93.407 343.056 C 103.867 343.163 112.523 335.935 122.983 318.357 C 133.489 300.701 140.638 293.725 148.223 293.725 C 155.585 293.725 159.517 299.533 162.101 314.225 C 163.273 320.888 165.485 324.566 169.505 326.537 C 171.673 327.601 173.557 327.619 179.418 326.634 C 185.829 325.557 187.034 325.614 189.981 327.138 C 194.852 329.657 196.149 333.737 196.149 346.545 C 196.149 356.219 196.403 357.807 198.432 360.827 C 199.88 362.984 202.219 364.749 204.834 365.66 C 208.724 367.016 209.206 366.96 213.486 364.66 C 216.195 363.205 221.179 358.611 225.877 353.241 C 235.652 342.067 241.374 338.296 248.558 338.296 C 254.804 338.296 259.012 340.893 261.776 346.455 C 263.405 349.734 263.653 352.702 263.68 369.225 C 263.713 389.171 264.016 391.384 267.737 398.832 C 272.73 408.829 280.139 414.456 289.594 415.431 C 300.059 416.512 309.208 410.528 313.134 400.036 C 317.091 389.461 315.226 380.493 305.547 363.547 C 298.201 350.684 296.149 345.034 296.149 337.665 C 296.149 331.204 297.55 327.512 301.304 324.083 C 304.907 320.792 309.174 320.39 320.415 322.282 C 329.852 323.871 330.944 323.881 334.431 322.403 C 337.207 321.227 338.704 319.705 340.057 316.681 C 342.524 311.171 341.728 308.146 334.802 296.713 C 326.66 283.271 326.132 277.042 332.603 270.77 C 335.291 268.164 337.1 267.34 340.943 266.971 C 347.362 266.354 351.934 268.431 364.282 277.575 C 376.974 286.974 382.916 289.703 390.721 289.715 C 402.979 289.735 412.344 283.677 415.707 273.551 C 419.409 262.404 414.312 251.139 402.779 244.981 C 400.284 243.649 395.694 243.2 380.149 242.767 C 361.721 242.255 360.403 242.087 356.179 239.722 C 347.807 235.034 344.916 225.243 349.148 215.916 C 350.224 213.547 354.934 207.626 359.616 202.76 C 364.297 197.893 368.582 192.715 369.138 191.253 C 372.091 183.486 369.009 178.19 358.43 172.854 C 348.808 168 346.067 165.192 345.436 159.537 C 344.518 151.323 349.099 148.175 369.838 142.77 C 385.202 138.765 391.488 135.682 394.95 130.45 C 401.765 120.152 394.683 108.265 382.859 110.155 C 376.766 111.13 371.889 114.111 361.566 123.171 C 356.303 127.79 350.501 132.279 348.672 133.147 C 341.172 136.706 332.372 133.87 329.458 126.953 C 328.594 124.903 327.257 118.95 326.487 113.725 C 323.998 96.827 320.961 90.2 314.105 86.702 C 306.951 83.053 302.807 84.33 294.649 92.695 C 284.77 102.826 274.52 106.937 264.655 104.726 C 252.742 102.056 248.723 93.353 252.649 78.725 C 254.785 70.766 254.559 63.203 252.028 57.975 C 247.952 49.556 237.713 45.761 229.465 49.614" stroke="none" fill="#fff" fill-rule="evenodd"></path></svg>`);
blotLogo.scale([0.025, -0.025]);
blotLogo.translate([-203, -115]);
drawTurtles([blotLogo]);
DrawText("Build No. ", [3, 28], 0.82);
var tubeOrg = [52.15, 26.85];
var tubeScale = 1.35;
for (let i = 0; i <= 6; i++) {
  if (i == 0) {
    CreateTube("#", [tubeOrg[0] + 3.5 * tubeScale * (i - 6), tubeOrg[1]], tubeScale);
    continue;
  }
  CreateTube((Math.floor(buildno / 10 ** Math.abs(i - 6)) % 10).toString(), [tubeOrg[0] + 3.5 * tubeScale * (i - 6), tubeOrg[1]], tubeScale);
}
var DrawBox = (org, size) => {
  const turtle = createTurtle();
  turtle.jump(org);
  turtle.forward(size[0]);
  turtle.left(90);
  turtle.forward(size[1]);
  turtle.left(90);
  turtle.forward(size[0]);
  turtle.left(90);
  turtle.forward(size[1]);
  turtle.left(90);
  drawTurtles([turtle]);
};
/*DrawBox([0,23],[125,76.8])*/
DrawText("M5x35", [85, 89], 0.75, [2.97, 1]);
DrawText("mm", [96.5, 89], 0.53, [2.97, 1]);
DrawBox([85, 83], [35, 5]);
DrawText("M5x30", [85, 77], 0.75, [2.97, 1]);
DrawText("mm", [96.5, 77], 0.53, [2.97, 1]);
DrawBox([85, 71], [20, 5]);
DrawText("M5x10", [85, 65], 0.75, [2.97, 1]);
DrawText("mm", [96.5, 65], 0.53, [2.97, 1]);
DrawBox([85, 59], [10, 5]);
DrawText("M3x10", [85, 53], 0.75, [2.97, 1]);
DrawText("mm", [96.5, 53], 0.53, [2.97, 1]);
DrawBox([85, 49], [10, 3]);
DrawText("Blot", [12.22, 91], 0.89);
DrawText("Welcome to Blot", [5.63, 78.73], 1.59);
DrawText(`-> Your blot device is finally here to assemble! It's now
up to you what your drawing machine's limits are.

-> Follow the build guide on                           - the
lines on the side of this card match with yours in the kit!

-> Please keep in mind that the Blot is not a consumer
product, and may occasionally perform in unexpected 
and undesired manners.

-> All Blot-related content(site, designs, models) can 
be found at github.com/hackclub/blot.

Happy Drawing!`, [4.22, 72.87], 0.47, [2.75, 5.1]);
for (let i = 0; i <= 0; i++) {
  DrawText("blot.hackclub.dev/assembly", [41.58, 65.73], 0.47, [2.75, 5.1]);
}

