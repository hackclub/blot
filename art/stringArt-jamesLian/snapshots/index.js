/*
@title: StringArt
@author: James Lian
@snapshot: stringart-IU-highresolution.png
*/

// insert your own image URL here! Images that work best typically include high-contrast portraits
var imageURL = "https://media.themoviedb.org/t/p/w500/jPsLqiYGSofU4s6BjrxnefMfabb.jpg";
var image;

const size = 300;
const scale = 0.99; // decimal between 0.99 and 0.01 - defines frame of circle

// play around with these variables and the image variable
var pins = 280; 
// number of 'strings'
var numLines = 1800; 
// number between 255 and 1, decrease for an even higher contrast, clearer (and generally darker) image
var stringArtContrast = 30;

setDocDimensions(size, size);

var finalLines = [];
var lines = new Map();
var linesToPins = new Map();
var linesToDraw;

function getGrayscaleArray(imgURL, width, callback) {
  const xhr = new XMLHttpRequest();
  const url = `https://string-art-image-service.vercel.app/api/grayscale?url=${encodeURIComponent(imgURL)}&width=${width}`;

  xhr.open('GET', url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        callback(null, response.grayscaleArray);
      } else {
        callback(new Error(`Error: ${xhr.status}`));
      }
    }
  };
  xhr.send();
}

getGrayscaleArray(imageURL, size, function (err, grayscaleArray) {
  if (err) {
    console.error('Error:', err);
  } else {
    image = grayscaleArray;
    console.log(image);
    init()
  }
});



/* Drawing the circle */
function circle(steps, proportion) {
  let points = [];
  // radius
  let r = size/2;
  for (let i = 0; i < steps; i++) {
    let radians = (i / steps) * (2 * Math.PI) + (Math.PI); // start drawing from the bottom
    let x = r + (r*proportion) * Math.sin(radians);
    let y = r + (r*proportion) * Math.cos(radians);
    points.push([x, y]);
  }
  // completing the circle
  points.push([r + (r*proportion) * Math.sin(Math.PI), r + (r*proportion) * Math.cos(Math.PI)]);

  return points
}

// convert a point inside the circle to an image pixel in the image variable
function coordToImagePixel(x, y) {
  let imageX = ((x * scale) / (size * scale)) * (image[0].length);
  let imageY = (image.length - ((y * scale) / (size * scale)) * (image.length));
  return [imageX, imageY];
}

function returnDiagonals(pinIndex) {

  let startingPin = (pinIndex + 2) % pins;
  let endingPin = (pinIndex + pins - 1) % pins;

  // if startingPin > endingPin, add pins to endingPin, else add nothing
  endingPin += (startingPin > endingPin) ? pins : 0

  let pointDiagonals = new Map();

  let r = size / 2
  for (let i = startingPin; i < endingPin; i++) {
    let radians = ((i % pins) / pins) * (2 * Math.PI) + (Math.PI); // start drawing from the bottom
    let x = r + (r*scale) * Math.sin(radians);
    let y = r + (r*scale) * Math.cos(radians);
    pointDiagonals.set([x, y], i % pins);
  }

  return pointDiagonals;
}

function checkLines() {
  // ex. lines.set([x, y], sumOfPixelValues)

  // diagonals of a polygon: n(n-3)/2
  let i = 0;
  let r = size / 2
  let currPin = 0;
  while (i < numLines) {
    let radians = (currPin / pins) * (2 * Math.PI) + (Math.PI); // start drawing from the bottom
    let x = r + (r*scale) * Math.sin(radians);
    let y = r + (r*scale) * Math.cos(radians);

    // returns array of points
    let diagonals = returnDiagonals(currPin)

    // find the darkest path for the current pin
    lines = new Map;
    linesToPins = new Map;
    for (let [diagonal, iPin] of diagonals) {      
      let coord1 = coordToImagePixel(x, y);
      let coord2 = coordToImagePixel(diagonal[0], diagonal[1]);

      let sumPixelValues = 0;
      let pixelsPassed = 0;

      // Bresenham's line algorithm
      let dX = coord2[0] - coord1[0];
      let dY = coord2[1] - coord1[1];
      let d = Math.max(Math.abs(dX), Math.abs(dY))
      for (let j=0; j <= d; j++) {
        let passedX = Math.round(coord1[0] + (j * dX / d));
        let passedY = Math.round(coord1[1] + (j * dY / d));

        sumPixelValues += image[passedY][passedX];
        pixelsPassed++;
      }
      lines.set([[x, y], diagonal], sumPixelValues / pixelsPassed);
      linesToPins.set([[x, y], diagonal], iPin);
    }

    const sortedLines = Array.from(lines).sort((a, b) => a[1]-b[1]);
    finalLines.push(sortedLines[0][0]);

    // the image data where the line is passed through is deleted to prevent 'bunching', where too many lines are drawn in a dark area of the image
    let coord1 = coordToImagePixel(sortedLines[0][0][0][0], sortedLines[0][0][0][1]);
    let coord2 = coordToImagePixel(sortedLines[0][0][1][0], sortedLines[0][0][1][1]);

    // Bresenham's line algorithm
    let dX = coord2[0] - coord1[0];
    let dY = coord2[1] - coord1[1];
    let d = Math.max(Math.abs(dX), Math.abs(dY))
    for (let j=0; j <= d; j++) {
      let passedX = Math.round(coord1[0] + (j * dX / d));
      let passedY = Math.round(coord1[1] + (j * dY / d));

      if (image[passedY][passedX] + stringArtContrast > 255) {
        image[passedY][passedX] = 255;
      }
      else {
        image[passedY][passedX] += stringArtContrast;
      }
    }

    // selecting the next pin to start from
    for (let [iLine, iPin] of linesToPins) {
      if (iLine.toString() == sortedLines[0][0].toString()) {
        currPin = iPin;
      }
    }

    i++;
  }
}

function init() {
  // draw a circle - frame for string art
  var polyline = [bt.catmullRom(circle(32, scale))];
  drawLines(polyline);

  // crop the image to size if it is too long
  if (image.length > size) {
    let difference = image.length - size;
    for (let q = 0; q < Math.floor(difference/2); q++) {
      image.shift()
    }
    for (let w = 0; w < Math.ceil(difference/2); w++) {
      image.pop()
    }
  }
  // crop the image to size if it is too wide
  else if (image.length < size) {
    let difference = size - image.length;
    for (let q = 0; q < Math.floor(difference/2); q++) {
      for (let z = 0; z < image.length; z++) {
        image[z].shift()
      }
    }
    for (let w = 0; w < Math.ceil(difference/2); w++) {
      for (let x = 0; x < image.length; x++) {
        image[x].pop()
      }
    }
  }

  checkLines();
  drawLines(finalLines, {width: 0.8});
}