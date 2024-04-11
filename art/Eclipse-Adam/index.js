/*
@title: Eclipse
@author: Adam Mokdad
@snapshot: snapshot1.png
*/

// My first ever javascript code, pretty horribly organised and optimized, but it looks kinda nice :)
/* PLANS:
  improving already existing code, mainly better circle intersection finding code
  adding special effects when close to 100% totality
  option for annular eclipses (controllable size ratio)
*/

const width = 120;
const height = 120;

setDocDimensions(width, height);

let sunPoints = [];
let moonPoints = [];
let sunOffset = [60, 60];
let moonOffset = [68, 54];
let pointsCount = 80 // Quality

for (let i = 0; i <= pointsCount; i++) {
  sunPoints.push([sunOffset[0] + 30 * Math.cos(2 * Math.PI * i / pointsCount), sunOffset[1] + 30 * Math.sin(2 * Math.PI * i / pointsCount)]);
  moonPoints.push([moonOffset[0] + 30 * Math.cos(2 * Math.PI * i / pointsCount), moonOffset[1] + 30 * Math.sin(2 * Math.PI * i / pointsCount)]);
}

let vertex1 = [0, 0];
let vertex2 = [0, 0];
let vertex1error = 9999;
let vertex2error = 9999;
let p1 = [0,0];
let p2 = [0,0];
let t1 = 0
let t2 = 0
let goodt1sun = [0,0];
let goodt1moon = [0,0];
let goodt2sun = [0,0];
let goodt2moon = [0,0];
let distance = 0;
for (let i = 0; i < 50000; i++) { // Horible algorithm to find the two points where the two circles intersect. But it works ¯\_(ツ)_/¯ (very badly) Something like gradient descent (or some completely different algorithm to find the intersections of two circles) would work better
  t1 = bt.rand()
  t2 = bt.rand()
  
  p1 = bt.getPoint([sunPoints], t1);
  p2 = bt.getPoint([moonPoints], t2);
  distance = ((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2)
  if (p1[1] > 60) { // Assuming one vertex will be above y=2 (center of the sun) and the other vertex will be below. This is not always the case and will yield a bad result.
    if (distance < vertex1error){
      vertex1error = distance;
      vertex1 = p1;
      goodt1sun = t1;
      goodt1moon = t2;
    }
  }
  else {
    if (distance < vertex2error) {
      vertex2error = distance;
      vertex2 = p2;
      goodt2sun = t1;
      goodt2moon = t2;
    }
  }
}

let sunFirstPointIndex = Math.ceil(goodt1sun*sunPoints.length)
let sunLastPointIndex = Math.floor(goodt2sun*sunPoints.length)
let moonFirstPointIndex = Math.floor(goodt2moon*moonPoints.length)
let moonLastPointIndex = Math.ceil(goodt1moon*moonPoints.length)

let eclipsedSunPoints = [];
eclipsedSunPoints.push(vertex1);
for (let i = sunFirstPointIndex; i <= sunLastPointIndex; i++) {
  eclipsedSunPoints.push(sunPoints[i]);
}
eclipsedSunPoints.push(vertex2);
for (let i = moonFirstPointIndex; i >= moonLastPointIndex; i--) {
  eclipsedSunPoints.push(moonPoints[i]);
}

drawLines([eclipsedSunPoints],"fill");




