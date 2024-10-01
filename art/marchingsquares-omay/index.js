/*
@title: Marching Squares
@author: Leonard (Omay)
@snapshot: squares
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

let res = 2;
let layers = 6;

let noiseScale = 0.05;
bt.setRandSeed(1);

let map = [];
let lines = [];

function getScenario(vA, vB, vC, vD, switchPoint) {
  return (vA > switchPoint ? 1 : 0) +
         (vB > switchPoint ? 2 : 0) +
         (vC > switchPoint ? 4 : 0) +
         (vD > switchPoint ? 8 : 0);
}

function interpolate(valueA, valueB, pointA, pointB) {
  let t = (0 - valueA) / (valueB - valueA);
  t = Math.max(0, Math.min(1, t));
  return [(1 - t) * pointA[0] + t * pointB[0], (1 - t) * pointA[1] + t * pointB[1]];
}
function simpInterpolate(pointA, pointB) {
  return [(pointA[0] + pointB[0]) * 0.5, (pointA[1] + pointB[1]) * 0.5];
}

for (let i = 0; i < width / res; i++) {
  map.push([]);
  for (let j = 0; j < height / res; j++) {
    map[i].push(bt.noise([i * noiseScale, j * noiseScale]));
  }
}

for (let layer = 0; layer < 1; layer += 1 / (layers + 1)) {
  for (let i = 0; i < map.length - 1; i++) {
    for (let j = 0; j < map[i].length - 1; j++) {
      let valueA = map[i][j];
      let valueB = map[i + 1][j];
      let valueC = map[i][j + 1];
      let valueD = map[i + 1][j + 1];
  
      let point1 = [i * res, j * res];
      let point2 = [i * res + res, j * res];
      let point3 = [i * res, j * res + res];
      let point4 = [i * res + res, j * res + res];
  
      let pointA = interpolate(valueA, valueB, point1, point2)
      let pointB = interpolate(valueA, valueC, point1, point3)
      let pointC = interpolate(valueB, valueD, point2, point4)
      let pointD = interpolate(valueC, valueD, point3, point4)
  
      // let pointA = simpInterpolate(point1, point2)
      // let pointB = simpInterpolate(point1, point3)
      // let pointC = simpInterpolate(point2, point4)
      // let pointD = simpInterpolate(point3, point4)
      switch (getScenario(valueA, valueB, valueC, valueD, layer)) {
        case 0:
        case 15:
          break;
        case 1:
        case 14:
          lines.push([pointA, pointB])
          break;
        case 2:
        case 13:
          lines.push([pointA, pointC])
          break;
        case 3:
        case 12:
          lines.push([pointB, pointC])
          break;
        case 4:
        case 11:
          lines.push([pointB, pointD])
          break;
        case 5:
        case 10:
          lines.push([pointA, pointD])
          break;
        case 6:
        case 9:
          lines.push([pointA, pointC])
          lines.push([pointB, pointD])
          break;
        case 7:
        case 8:
          lines.push([pointC, pointD])
          break;
        default:
          console.error("invalid value")
      }
    }
  }
}

drawLines(lines)