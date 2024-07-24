/*
@title: Starseed
@author: Sahand Soleimani
@snapshot: a.png
*/

/* --------------------- Customizable Parameters --------------------- */

const w = 125; // Canvas width (in mm)
const h = 125; // Canvas height (in mm)
const randomnessFactor = 1; // Factor to adjust the randomness of the smaller stars

/* ------------------------------------------------------------------- */

/* -------------------- Uncustomizable Parameters -------------------- */

const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, nurbs, catmullRom, rand, setRandSeed, randInRange, randIntInRange, noise } = blotToolkit;
const background = [[[0, 0], [0, w], [0, h], [w, h], [w, 0], [0, 0]]];
const starSeed = [[[57.5, 67.5], [62.5, 100], [67.5, 67.5], [100, 62.5], [67.5, 57.5], [62.5, 25], [57.5, 57.5], [25, 62.5], [57.5, 67.5]]];
const t = new Turtle();

/* ------------------------------------------------------------------- */

/* ---------------------------- Functions ---------------------------- */

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function isOutsideStarSeed(x, y, radius) {
  const starSeedCenterX = 62.5;
  const starSeedCenterY = 62.5;
  const starSeedMaxRadius = 37.5; // Approximating the maximum radius of the main star
  return distance(x, y, starSeedCenterX, starSeedCenterY) > (starSeedMaxRadius + radius);
}

function clipToCanvas(shape) {
  // Define the canvas bounds as a polygon
  const canvasBounds = [[0, 0], [0, h], [w, h], [w, 0], [0, 0]];

  // Check if the shape is an array and contains valid points
  if (Array.isArray(shape) && shape.length > 0 && Array.isArray(canvasBounds) && canvasBounds.length > 0) {
    try {
      // Ensure both shapes are closed polygons
      if (shape[0][0] !== shape[shape.length - 1][0] || shape[0][1] !== shape[shape.length - 1][1]) {
        shape.push(shape[0]);
      }
      if (canvasBounds[0][0] !== canvasBounds[canvasBounds.length - 1][0] || canvasBounds[0][1] !== canvasBounds[canvasBounds.length - 1][1]) {
        canvasBounds.push(canvasBounds[0]);
      }

      // Perform intersection
      return intersection(shape, canvasBounds);
    } catch (error) {
      console.error('Error performing intersection:', error);
      return shape; // Return the original shape if an error occurs
    }
  }
  return shape; // Return the original shape if input is invalid
}

/* ------------------------------------------------------------------- */

setDocDimensions(w, h);

drawLines(background, {fill:"#000000"});
scale(starSeed, randInRange(1, 1));
drawLines(starSeed, {fill:"#ffffff", stroke:"#0000FF"});

class Star {
  constructor() {
    this.radius = randIntInRange(2, 7); // Smaller radius between 2 and 7
    this.x = randIntInRange(this.radius, w - this.radius); // Ensure stars fit within canvas
    this.y = randIntInRange(this.radius, h - this.radius); // Ensure stars fit within canvas
    this.rotation = randInRange(-5 * randomnessFactor, 5 * randomnessFactor); // Adjusted random rotation angle

    // Ensure the new star is not touching the main centered star
    while (!isOutsideStarSeed(this.x, this.y, this.radius)) {
      this.x = randIntInRange(this.radius, w - this.radius);
      this.y = randIntInRange(this.radius, h - this.radius);
    }
  }

  draw() {
    let scaledStar = copy(starSeed);
    scale(scaledStar, this.radius / 37.5); // Scale star to fit the radius
    translate(scaledStar, [this.x - 62.5, this.y - 62.5]); // Move star to the correct position
    rotate(scaledStar, this.rotation); // Slight rotation

    // Clip star to canvas bounds
    let clippedStar = clipToCanvas(scaledStar);
    drawLines(clippedStar, {fill:"#ffffff", stroke:"#0000FF"});
  }
}

let stars = [];
let offset = 10;

let count = 0;

while (count < 100) {
  count++;
  let newStar = new Star();

  let lap = 0;

  for (let i = 0; i < stars.length; i++) {
    let elem = stars[i];
    let dist = Math.hypot(newStar.x - elem.x, newStar.y - elem.y);

    if (dist < (newStar.radius + elem.radius + offset)) {
      lap++;
      break;
    }
  }

  if (lap === 0) {
    newStar.draw();
    stars.push(newStar);
  }
}
