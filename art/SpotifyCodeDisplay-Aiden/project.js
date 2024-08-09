/*
@title: SpotifyCodeDisplay
@author: DominantDuck
@snapshot: spotify.png
*/


const url = "https://raw.githubusercontent.com/DominantDuck/blot/main/spotify.txt";
// const url = "https://raw.githubusercontent.com/DominantDuck/blot/main/goldschool.txt";
// const url = "https://raw.githubusercontent.com/DominantDuck/blot/main/newmusicfriday.txt";
const { Turtle, trim, merge, cut, cover, rotate, scale, translate, originate, iteratePoints, pointInside, resample, join, copy, union, difference, intersection, xor, getAngle, getPoint, getNormal, bounds, nurbs, catmullRom, rand, setRandSeed, randInRange, randIntInRange, noise } = blotToolkit;

var height,width = 0;

var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send(null);
const image = request.responseText;

const lines = image.trim().split('\n');

function getDimensions (data) {
    let heightCount, widthCount = 0;
    heightCount = lines.length;

    if (heightCount > 0) {
        widthCount = lines[0].length;
    }

    height = heightCount;
    width = widthCount;

    console.log(`h: ${height}, w: ${width}`)
}

function parseBinaryData(data) {
    let individual = [];
  
    for (let x = 0; x < height; x++) {
      individual[x] = [];
      for (let y = 0; y < width; y++) {
          individual[x][y] = lines[x].charAt(y) 
      }
    }
  return individual;
  console.log(individual)
}

function draw(arr) {
    for (let x = 0; x < height; x++) {
          for (let y = 0; y < width; y++) {
               if(arr[x][y] === "1" && y < width-1) {
                   if (arr[x][y+1] === "1") {
                     drawLines([
                          [
                            [y,height-x],
                            [(y+1),height-x]
                          ]
                      ]);
                   }
               }
          }
        }
}

getDimensions(image);


const dataArray = parseBinaryData(image);
draw(dataArray);


