/*
@title: mycoBuild
@author: Manaal Lakhani
@snapshot: mycoBuild1
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

// Simple seed-based random number generator
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Function to generate a new seed based on the current time
function generateSeed() {
  return new Date().getTime() % 100000;
}

// Use a random seed
let randomSeed = generateSeed();

// expose parameters to control variations
const numGills = Math.floor(seededRandom(randomSeed) * 15) + 5; // random number of gills between 5 and 20
const numSkyLines = 20; // number of sky lines
const skyLineRadiusFactor = 28; // factor for sky line radius
const skyLineAngleStep = Math.PI / 90; // angle step for sky lines
const soilDashLength = 28; // dash length for soil texture
const soilGapLength = 1; // gap length for soil texture

// Random sizes for mushroom shaft and cap
const shaftScaleFactor = seededRandom(randomSeed + 1) * 0.5 + 0.75; // random scale factor between 0.75 and 1.25
const capScaleFactor = seededRandom(randomSeed + 2) * 0.5 + 0.75; // random scale factor between 0.75 and 1.25

// mushroom shaft (stretched triangle)
let gr = [bt.catmullRom([[5, 1], [-3, 12], [-48, 75], [1, 104], [10, 62], [28, 15], [4, 1]])]; // shaft
bt.scale(gr, [shaftScaleFactor, shaftScaleFactor]); // scale shaft

// mushroom cap (catmull-rom curve)
let vanes = [bt.catmullRom([[-66, -12], [-118, 23], [-37, 75], [-16, 94], [14, 110], [16, -14], [-66, -12]])]; // cap
bt.scale(vanes, [capScaleFactor, capScaleFactor]); // scale cap

// gills curve
const grah = [bt.catmullRom([[-44, -35], [27, -9], [72, 29], [88, 58]])]; // gills

// soil line (longer and bumpier)
const soil = [bt.catmullRom([
  [-280, -281], 
  [-105, -130], 
  [-53, -109], 
  [-30, -97], 
  [51, -60], 
  [200, 1], 
  [279, 61], 
  [478, 172],
])]; // soil

// calculate bounds and adjust positions
const grBounds = bt.bounds(gr); // bounds for shaft
const vanesBounds = bt.bounds(vanes); // bounds for cap
bt.translate(vanes, [76, grBounds.cb[1] - vanesBounds.cb[1] - 82]); // align cap with shaft
bt.translate(soil, [-62, grBounds.cb[0] - vanesBounds.cb[1] - -147]); // align soil

// create gills
const gills = [];
const grahPoints = bt.resample(grah, numGills)[0]; // resample gills curve
for (let i = 0; i < grahPoints.length; i++) {
  const [x, y] = grahPoints[i];
  const gillLength = 35; // length of gill
  const angle = Math.atan2(grBounds.cb[1] - y, grBounds.cb[0] - x); // angle for gill
  const endX = x + gillLength * Math.cos(angle); // end point x
  const endY = y + gillLength * Math.sin(angle); // end point y
  gills.push(bt.catmullRom([[x, y], [endX, endY]])); // create gill
}
bt.cut(gills, vanes); // cut gills with cap

// combine mushroom parts
const mushroom = [...gr, ...vanes, ...grah, ...gills, ...soil]; // combine parts

// scale and position mushroom
const bounds = bt.bounds(mushroom); // get bounds of mushroom
const scaleX = width / bounds.width; // scale factor x
const scaleY = height / bounds.height; // scale factor y
const scale = Math.min(scaleX, scaleY) * 1.16; // min scale factor
bt.scale(mushroom, [scale, scale], bounds.cc); // scale mushroom
bt.translate(mushroom, [width / 2, height / 2.6], bounds.cc); // center mushroom
bt.iteratePoints(mushroom, ([x, y]) => [x - 0.003 * (width / 2 - y) * (width / 2 - y), y]); // add distortion
bt.rotate(mushroom, 151); // rotate mushroom

// function to create broken sky lines starting from the middle
function createBrokenSkyLines(seed) {
  const skyLines = [];
  const centerX = width / 2; // center x
  const centerY = height / 2; // center y
  const maxRadius = Math.max(width, height); // max radius

  for (let i = 0; i < numSkyLines; i++) { // loop for sky lines
    const radius = maxRadius * (i + 1) / skyLineRadiusFactor; // radius
    let skyLine = [];
    let isDrawing = true; // flag to draw
    for (let angle = 0; angle < Math.PI * 2; angle += skyLineAngleStep) { // loop for angles
      if (seededRandom(seed + i * 10 + angle) < 0.1) { // random toggle
        isDrawing = !isDrawing;
      }
      if (isDrawing && radius > width / 5) { // draw only from the middle
        const x = centerX + radius * Math.cos(angle); // x coord
        const y = centerY + radius * Math.sin(angle); // y coord
        skyLine.push([x, y]); // add point to skyLine
      } else {
        if (skyLine.length > 0) {
          try {
            const catmullRomResult = bt.catmullRom(skyLine); // create catmullRom curve
            skyLines.push(catmullRomResult); // add to skyLines
          } catch (error) {
            console.error("Error processing skyLine:", skyLine, error); // error handling
          }
          skyLine = []; // reset skyLine
        }
      }
    }
    if (skyLine.length > 0) {
      try {
        const catmullRomResult = bt.catmullRom(skyLine); // final catmullRom curve
        skyLines.push(catmullRomResult); // add to skyLines
      } catch (error) {
        console.error("Error processing skyLine:", skyLine, error); // error handling
      }
    }
  }
  return skyLines; // return skyLines
}

// function to add texture to soil
function addSoilTexture(soil) {
  const texturedSoil = [];
  const dashLength = soilDashLength; // dash length
  const gapLength = soilGapLength; // gap length

  for (const soilLine of soil) {
    let resampled;
    try {
      resampled = bt.resample(soilLine, 1); // resample soil line
    } catch (error) {
      console.error("Error resampling soilLine:", soilLine, error); // error handling
      continue;
    }
    
    const points = resampled[0]; // points from resampling
    let currentLine = [];
    let isDash = true; // flag for dash
    let counter = 9;

    for (let i = 0; i < points.length - 1; i++) {
      if (isDash) {
        currentLine.push(points[i]); // add point to dash
      }
      counter++;
      if ((isDash && counter >= dashLength) || (!isDash && counter >= gapLength)) { // toggle dash/gap
        if (isDash && currentLine.length > 1) {
          texturedSoil.push(bt.catmullRom(currentLine)); // create catmullRom curve
        }
        currentLine = []; // reset line
        isDash = !isDash; // toggle flag
        counter = 0;
      }
    }
    if (isDash && currentLine.length > 1) {
      texturedSoil.push(bt.catmullRom(currentLine)); // final catmullRom curve
    }
  }
  return texturedSoil; // return textured soil
}

// create broken sky lines using the random seed
const skyLines = createBrokenSkyLines(randomSeed);

// add texture to soil
const texturedSoil = addSoilTexture(soil);

// combine all elements, ensuring skyLines are behind the mushroom
const allElements = [...texturedSoil, ...gr, ...vanes, ...grah, ...gills, ...skyLines];

// draw everything
drawLines(allElements);
