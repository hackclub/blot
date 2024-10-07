const width = 125;
const height = 125;
setDocDimensions(width, height);

function drawPoint(x, y, darkness=0) {
  const line = []
  const size = 1
  if (darkness == 0) {return}

  if (darkness >= 1) {
    line.push([[x, y], [x+size, y+size]]);
  }
  if (darkness >= 2) {
    line.push([[x, y], [x+size, y]]);
    line.push([[x, y], [x, y+size]]);
    line.push([[x, y+size], [x+size, y+size]]);
    line.push([[x+size, y], [x+size, y+size]]);
  }
  if (darkness >= 3) {
    line.push([[x, y+size], [x+size, y]]);
  }
  if (darkness >= 4) {
    line.push([[x+(size/2), y+size], [x+size/2, y]])
    line.push([[x, y+(size/2)], [x+size, y+(size/2)]])
  }
  if (darkness >= 5) {
    line.push([[x+(size/4), y+size], [x+size/4, y]])
    line.push([[x+3*(size/4), y+size], [x+3*size/4, y]])
  }
  if (darkness >= 6) {
    line.push([[x, y+(size/4)], [x+size, y+(size/4)]])
    line.push([[x, y+3*(size/4)], [x+size, y+3*(size/4)]])
  }
  drawLines(line)
}

function generateBox(x, y, width, height, darkness) {
  let points = []
  for (let i=0; i<height; i++) {
    for (let j=0; j<width; j++) {
      points.push([x+j, y+i, darkness])
    }
  }
  return points
}

function drawBox(x, y, width, height, darkness) {
  for (let point of generateBox(x, y, width, height, darkness)) {
    drawPoint(point[0], point[1], point[2])
  }
}

function rotatePoints(points, degrees, originX, originY) {
  let rad = degrees * (Math.PI / 180)
  let cost = Math.cos(rad)
  let sint = Math.sin(rad)
  return points.map(([x, y, d]) => {
      const translatedX = x - originX
      const translatedY = y - originY
      
      const xn = translatedX * cost - translatedY * sint
      const yn = translatedX * sint + translatedY * cost
      return [xn+originX, yn+originY, d];
  })
}


function randint(min, max) {
  return Math.round(bt.randInRange(min, max))
}

// background
let layers = 5
for (let i=0; i<layers; i++) {
  for (let j=0; j<height/layers; j++) {
    for (let col=0; col<width; col++) {
      let rnd = randint(0, 1)
      if ((j <= layers) && i != 0) {
        drawPoint(col, i*(height/layers)+j, (rnd == 0) ? i : i+1)
      } else if ((j >= height/layers-5) && i != layers-1) {
        drawPoint(col, i*(height/layers)+j, (rnd == 0) ? i+2 : i+1)
      } else {
        drawPoint(col, i*(height/layers)+j, i+1)
      }
    }
  }
}

let stemLength1 = randint(8, 12)
let stemHeight1 = randint(20, 25)
drawBox(width/2, 0, stemLength1, stemHeight1, 5)

// stem2
let stemLength2 = randint(stemLength1-4, stemLength1-2)
let stemHeight2 = randint(20, 25)
let stem2Angle = randint(-30, 30)
let stem2 = generateBox(width/2+(stemLength1-stemLength2)/2, stemHeight1, stemLength2, stemHeight2, 5)
stem2 = rotatePoints(stem2, stem2Angle, width/2+(stemLength2/2), stemHeight1+(stemHeight2/2))
for (let point of stem2) {
  drawPoint(point[0]-(stem2Angle/10), point[1]-4, point[2])
}

// stem3
let stemLength3 = stemLength2-2
let stemHeight3 = randint(22, 25)
let stem3Angle = (stem2Angle < 0) ? randint(stem2Angle-20, stem2Angle-10) : randint(stem2Angle+10, stem2Angle+20)
let stem3 = generateBox(width/2+(stemLength2-stemLength3)/2, stemHeight2+stemHeight1, stemLength3, stemHeight3, 5)
stem3 = rotatePoints(stem3, stem3Angle, width/2+(stemLength3/2), stemHeight2+(stemHeight3/2))
for (let point of stem3) {
  drawPoint(point[0]+(stem3Angle/40), point[1]-4, point[2])
}

// leafs
for (let angleSet of [[0, -50], [200, 250]]) {
  for (let i=0; i<5; i++) {
    let leafLength = randint(30, 50)
    let leafHeight = 1
    let leafAngle = randint(angleSet[0], angleSet[1])
    let leaf = generateBox(width/2, stemHeight3+stemHeight2+stemHeight1, leafLength, leafHeight, 5)
    leaf = rotatePoints(leaf, leafAngle, width/2+(leafLength/2), stemHeight3+(leafHeight/2))
    let offsetX = leaf[0][0]-stem3[stem3.length-1][0] + stemLength3/2
    let offsetY = leaf[0][1]-stem3[stem3.length-1][1] + 2
    for (let point of leaf) {
      if (point[0]-offsetX <= width-5) {
        drawPoint(point[0]-offsetX, point[1]-offsetY, point[2])
      }
    }
  }

}






