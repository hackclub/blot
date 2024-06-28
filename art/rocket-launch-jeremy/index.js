/*
@title: Rocket Launch
@author: Jeremy
@snapshot: 0.png
*/


// bt.setRandSeed(1)



////////// Imports
const random = bt.rand
// () => (x: number, y: number) => number
const { createNoise2D } = simplexNoise()


////////// Initialization
const width = 125
const height = 125
setDocDimensions(width, height)
const finalLines = []



////////// Main
const floorHeight = rr(0, 15)
const floorPolyline = [[0, floorHeight], [width, floorHeight]]
// finalLines.push(floorPolyline)

const groundGenerator = createNoise2D()
const groundLine = bt.iteratePoints(
  bt.resample(structuredClone([floorPolyline]), 1),
  current => {
    const shift = noise(groundGenerator, current, 40) * 3 + 5
    return [current[0], current[1] + shift]
  }
)[0]
const groundBox = [
  ...groundLine,
  [width, 0],
  [0, 0],
  [0, groundLine[0][1]],
]

finalLines.push(groundBox)


const floorPoint = [rr(80, 100), floorHeight]
// finalLines.push(circle(floorPoint, 1))


const outsideScreen = (
  [x, y],
  bufferLeft = 0,
  bufferTop = bufferLeft,
  bufferRight = bufferLeft,
  bufferBottom = bufferTop
) => (
  x <= bufferLeft ||
  x >= width - bufferRight ||
  y <= bufferBottom ||
  y >= height - bufferTop
)

const pathResolution = 3
const targetPathLength = rr(70, 120) * pathResolution
const targetPathHeight = rr(70, 90)

const pathTurtle = new bt.Turtle()
const calculateAngle = () => 90 + Math.pow(pathTurtle.position[1] * Math.sqrt(90) / targetPathHeight, 2)
pathTurtle.jump(floorPoint)
pathTurtle.angle = calculateAngle()

for (let i = 0; i < targetPathLength; i++) {
  if (outsideScreen(pathTurtle.position, 30, 0, 0, 0)) break
  pathTurtle.forward(1 / pathResolution)
  const newAngle = calculateAngle()
  pathTurtle.angle = newAngle
}
const path = pathTurtle.lines()[0]

const rocketPoint = pathTurtle.position
const rocketAltitude = rocketPoint[1] - floorHeight
const rocketAngle = atan2(
  path[path.length - 1][0] - path[path.length - 2][0],
  path[path.length - 1][1] - path[path.length - 2][1]
)

// finalLines.push(path)
// finalLines.push(circle(rocketPoint, 1))

const rocketSize = rr(19, 26)
const rocket = falcon9(rocketPoint, rocketSize, rocketAngle)
finalLines.push(...rocket)


function makeCloudLine(
  path,
  isLeft,
  [spreadGenerator, directionalShiftGenerator, driftGenerator]
) {
  let lastPoint
  const cloudLine = bt.iteratePoints(structuredClone([path]), (current, time) => {
    const previous = lastPoint
    lastPoint = current
    if (!previous) return 'BREAK'

    const altitude = current[1] - floorHeight
    
    // 1 at floor, 0 at top
    const altitudeFactor = 1 - altitude / rocketAltitude
    const falloffStrength = 10
    const sharpAltitudeFactor = 1 - 1 / (falloffStrength * altitudeFactor + 1)
    
    const angle = atan2(current[0] - previous[0], current[1] - previous[1])
    const shiftAngle = isLeft ? norm(angle + 90) : norm(angle - 90)

    const shiftRandomSpread = noise(spreadGenerator, current, 15) * 7 + 8
    const shiftSpreadFactor = shiftRandomSpread * altitudeFactor
    
    const shiftRandomDirection = (noise(directionalShiftGenerator, current, 30) - 0.7) * 20
    const shiftDirectionFactor = shiftRandomDirection * sharpAltitudeFactor
    
    const shiftDistance = shiftSpreadFactor + (isLeft ? shiftDirectionFactor : -shiftDirectionFactor)// + shiftGapFactor
    const shift = [
      cos(shiftAngle) * shiftDistance,
      sin(shiftAngle) * shiftDistance,
    ]

    const driftRandomFactor = (noise(driftGenerator, current, 40) - 0.6) * 6
    const drift = driftRandomFactor * altitudeFactor * 0
    
    const result = [
      current[0] + shift[0] + drift,
      current[1] + shift[1],
    ]
  
    if (outsideScreen(result)) return 'BREAK'
    
    return result
  })

  return cloudLine
}

const foreground = [groundBox, ...rocket]

const generators = Array.from({ length: 3 }).map(() => createNoise2D())
const leftClouds = makeCloudLine(path, true, generators)
const rightClouds = makeCloudLine(path, false, generators)
bt.cover(leftClouds, foreground)
bt.cover(rightClouds, foreground)
finalLines.push(...leftClouds)
finalLines.push(...rightClouds)

// const flockCenter = [90, 100]
const flockCenter = [rr(80, 100), rr(90, 110)]
const birdCount = rr(15, 25)
const birdSpacing = rr(4, 5)
const flockRadius = rr(25, 35)
const flockPoints = []
birdPointGenerator: for (let i = 0; flockPoints.length < birdCount && i < 200; i++) {
  const direction = rr(0, 360)
  const radius = Math.pow(30, -random()) * flockRadius
  const point = [
    flockCenter[0] + cos(direction) * radius,
    flockCenter[1] + sin(direction) * radius
  ]

  if (outsideScreen(point, birdSpacing)) continue
  
  for (const otherPoint of flockPoints) {
    const dist = distance(point, otherPoint)
    if (dist < birdSpacing) continue birdPointGenerator
  }

  flockPoints.push(point)
}

const wingAngle = 18
const wingDegrees = 125


function makeBird(position, angle = 90, size = 1) {
  const turtle = new bt.Turtle()
  turtle.jump(position)
  turtle.angle = angle
  turtle.right(wingAngle)
  turtle.arc(-wingDegrees, size)

  turtle.jump(position)
  turtle.angle = angle
  turtle.left(wingAngle)
  turtle.arc(wingDegrees, size)

  return turtle.lines()
}

const birds = []
const birdTiltGenerator = createNoise2D()
for (const point of flockPoints) {
  const angle = 113 - noise(birdTiltGenerator, point, 25) * 50 + rr(-5, 5)
  const size = rr(0.8, 1.4)
  const bird = makeBird(point, angle, size)
  birds.push(...bird)
}

bt.cover(birds, finalLines)
finalLines.push(...birds)


drawLines(finalLines)


////////// Functions
///// Math
function toRad(d) { return d * Math.PI / 180 }
function toDeg(d) { return d * 180 / Math.PI }
function cos(d) { return Math.cos(toRad(d)) }
function sin(d) { return Math.sin(toRad(d)) }
function atan2(x, y) {
  return norm(Math.atan2(y, x) * 180 / Math.PI)
}
function norm(angle) {
  angle %= 360
  if (angle < 0) angle += 360
  return angle
}
function remapRange(fromMin, fromMax, toMin, toMax, from) {
  const fromSize = fromMax - fromMin
  const toSize = toMax - toMin

  // normalized to the range 0 to 1
  const normalized = (from - fromMin) / fromSize

  const to = (normalized * toSize) + toMin
  return to
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

///// Randomness
function rr(min, max) {
  return min + random() * (max - min)
}
/** max is exclusive */
function randomInt(min, max) {
  return Math.floor(rr(min, max))
}
function pickRandom(...array) {
  if (array.length === 1) array = array[0]
  const index = randomInt(0, array.length)
  return array[index]
}
// const generator = createNoise2D(random)
// mostly 0.5 to 0.8 but can be 0 to 1
function noise(generator, point, zoom = 1) {
  const zoomed = point.map(n => n / zoom)
  return generator(...zoomed) * 0.5 + 0.5
}

///// Polylines
function circle([centerX, centerY], radius, increment = 1) {
  const startPoint = [centerX + radius, centerY]
  const points = [startPoint]
  for (let dir = increment; dir < 360; dir += increment) {
    points.push([
      cos(dir) * radius + centerX,
      sin(dir) * radius + centerY,
    ])
  }
  points.push(startPoint)
  return points
}
function distance([ax, ay], [bx, by]) {
  return ((ax - bx) ** 2 + (ay - by) ** 2) ** 0.5
}


////////// Data
function falcon9(position = [0, 0], length = height, direction = 90, nozzleSize = 5.32) {
  const svg = [[[4.51,70.41],[23.16,70.41]],[[4.51,70.41],[4.51,308.85]],[[4.51,70.41],[1.01,63.99],[0.87,61.12],[0.87,28.88],[0.89,25.88],[0.94,25.36],[0.99,24.83],[1.04,24.30],[1.09,23.77],[1.15,23.24],[1.21,22.71],[1.27,22.18],[1.34,21.65],[1.41,21.12],[1.49,20.59],[1.57,20.06],[1.67,19.53],[1.76,19.00],[1.86,18.47],[1.97,17.94],[2.09,17.42],[2.21,16.89],[2.34,16.37],[2.48,15.85],[2.62,15.34],[2.77,14.83],[2.94,14.32],[3.11,13.82],[3.29,13.32],[3.47,12.82],[3.67,12.32],[3.87,11.84],[4.09,11.36],[4.32,10.88],[4.55,10.41],[4.79,9.95],[5.05,9.49],[5.31,9.03],[5.58,8.58],[5.86,8.13],[6.16,7.69],[6.45,7.25],[6.75,6.81],[7.07,6.38],[7.40,5.95],[7.73,5.52],[8.07,5.09],[8.42,4.67],[8.78,4.25],[9.14,3.83],[9.52,3.42],[9.90,3.00],[10.30,2.60],[10.70,2.23],[11.13,1.90],[11.57,1.60],[12.04,1.36],[12.52,1.17],[13.04,1.06],[13.58,0.99],[14.14,0.99],[14.68,1.06],[15.19,1.17],[15.69,1.36],[16.15,1.60],[16.59,1.90],[17.01,2.23],[17.42,2.60],[17.82,3.00],[18.20,3.40],[18.58,3.82],[18.94,4.24],[19.30,4.66],[19.65,5.08],[19.99,5.50],[20.32,5.93],[20.65,6.36],[20.96,6.80],[21.26,7.23],[21.56,7.67],[21.86,8.12],[22.14,8.57],[22.41,9.02],[22.67,9.47],[22.92,9.93],[23.17,10.40],[23.40,10.87],[23.63,11.34],[23.85,11.83],[24.05,12.31],[24.25,12.81],[24.44,13.30],[24.62,13.80],[24.79,14.30],[24.95,14.81],[25.11,15.32],[25.25,15.84],[25.39,16.36],[25.52,16.88],[25.65,17.40],[25.76,17.93],[25.87,18.45],[25.97,18.98],[26.07,19.51],[26.15,20.04],[26.23,20.57],[26.31,21.10],[26.38,21.63],[26.44,22.16],[26.50,22.69],[26.55,23.22],[26.60,23.75],[26.65,24.28],[26.70,24.82],[26.74,25.35],[26.79,25.88],[26.79,61.12],[26.67,64.00],[23.17,70.42]],[[23.17,70.42],[23.17,308.86]],[[4.51,116.80],[23.16,116.80]],[[6.51,366.20],[6.34,366.51],[6.17,366.83],[6.01,367.14],[5.86,367.47],[5.71,367.79],[5.57,368.12],[5.44,368.45],[5.31,368.78],[5.20,369.11],[5.08,369.45],[4.98,369.79],[4.88,370.13],[4.79,370.48],[4.71,370.82],[4.63,371.17],[4.56,371.52],[23.16,371.52],[23.09,371.17],[23.01,370.82],[22.92,370.48],[22.83,370.13],[22.73,369.79],[22.62,369.45],[22.50,369.11],[22.38,368.78],[22.25,368.44],[22.12,368.12],[21.97,367.79],[21.82,367.46],[21.67,367.14],[21.51,366.83],[21.34,366.51],[21.16,366.20]],[[4.51,152.50],[23.16,152.50]],[[22.39,366.20],[22.45,366.12],[22.50,366.04],[22.55,365.96],[22.58,365.92],[22.60,365.88],[22.62,365.83],[22.63,365.79],[22.65,365.74],[22.66,365.70],[22.67,365.65],[22.67,365.61],[22.67,365.56],[22.67,365.52],[22.72,365.43],[22.78,365.35],[22.82,365.26],[22.87,365.17],[22.91,365.08],[22.95,364.99],[22.98,364.89],[23.02,364.80],[23.05,364.70],[23.07,364.61],[23.09,364.51],[23.11,364.41],[23.13,364.31],[23.14,364.21],[23.15,364.11],[23.16,364.01],[23.16,362.82],[24.02,362.34],[24.08,362.30],[24.15,362.26],[24.21,362.22],[24.26,362.18],[24.38,362.11],[24.43,362.07],[24.48,362.03],[24.53,361.99],[24.58,361.95],[24.63,361.90],[24.67,361.86],[24.72,361.82],[24.76,361.78],[24.80,361.74],[24.84,361.69],[24.87,361.65],[24.94,361.56],[25.01,361.48],[25.07,361.38],[25.12,361.30],[25.17,361.20],[25.22,361.11],[25.26,361.02],[25.30,360.92],[25.34,360.84],[25.37,360.74],[25.42,360.55],[25.45,360.46],[25.49,360.27],[25.51,360.18],[25.51,360.13],[25.52,360.11],[25.52,359.92],[24.02,314.84],[24.00,314.39],[24.00,314.33],[23.99,314.28],[23.97,314.19],[23.96,314.10],[23.94,314.01],[23.93,313.93],[23.91,313.84],[23.90,313.76],[23.88,313.68],[23.87,313.60],[23.85,313.52],[23.84,313.45],[23.81,313.30],[23.78,313.15],[23.75,313.01],[23.71,312.87],[23.68,312.74],[23.64,312.60],[23.60,312.46],[23.57,312.33],[23.52,312.19],[23.48,312.05],[23.44,311.90],[23.39,311.76],[23.34,311.61],[23.31,311.53],[23.28,311.46],[23.26,311.42],[23.24,311.27],[23.20,311.11],[23.17,310.94],[23.12,310.77],[23.08,310.61],[23.03,310.44],[22.97,310.27],[22.92,310.11],[22.85,309.94],[22.79,309.77],[22.73,309.60],[22.66,309.43],[22.59,309.25],[22.51,309.08],[22.44,308.91],[22.36,308.75],[22.29,308.58],[22.21,308.43],[22.14,308.27],[22.06,308.13],[21.99,307.99],[21.91,307.86],[21.84,307.75],[21.77,307.64],[21.70,307.54],[21.63,307.44],[21.56,307.36],[21.49,307.29],[21.43,307.22],[21.36,307.16],[21.30,307.10],[21.24,307.06],[21.17,307.02],[21.11,306.98],[21.05,306.95],[20.99,306.93],[20.93,306.92],[20.87,306.91],[20.69,306.91],[20.64,306.93],[20.58,306.94],[20.53,306.97],[20.47,307.00],[20.42,307.04],[20.36,307.09],[20.31,307.14],[20.26,307.20],[20.21,307.27],[20.16,307.34],[20.11,307.42],[20.06,307.52],[20.01,307.62],[19.96,307.72],[19.92,307.85],[19.87,307.98],[19.83,308.13],[19.78,308.28],[19.74,308.46],[19.69,308.64],[19.65,308.85],[19.61,309.08],[19.57,309.35],[19.53,309.63],[19.49,309.96],[19.45,310.32],[19.41,310.72],[19.38,311.16],[19.34,311.65],[19.34,311.96],[19.31,314.47],[19.31,314.72],[19.01,317.30],[14.08,359.27],[13.84,361.10],[13.60,359.27],[8.66,317.31],[8.36,314.72],[8.36,314.47],[8.34,311.97],[8.34,311.65],[8.30,311.16],[8.26,310.72],[8.22,310.32],[8.18,309.96],[8.14,309.64],[8.10,309.34],[8.06,309.08],[8.02,308.85],[7.98,308.65],[7.94,308.45],[7.89,308.28],[7.85,308.13],[7.80,307.98],[7.75,307.85],[7.71,307.73],[7.66,307.62],[7.61,307.52],[7.57,307.42],[7.51,307.34],[7.47,307.27],[7.41,307.20],[7.36,307.14],[7.31,307.09],[7.26,307.04],[7.20,307.00],[7.15,306.97],[7.09,306.94],[7.04,306.93],[6.98,306.91],[6.74,306.91],[6.68,306.93],[6.62,306.95],[6.56,306.98],[6.50,307.02],[6.44,307.06],[6.38,307.11],[6.31,307.16],[6.25,307.22],[6.18,307.28],[6.11,307.36],[6.05,307.44],[5.98,307.54],[5.91,307.64],[5.83,307.74],[5.76,307.87],[5.69,307.99],[5.61,308.13],[5.54,308.27],[5.46,308.43],[5.39,308.58],[5.31,308.75],[5.23,308.91],[5.16,309.08],[5.09,309.25],[5.02,309.43],[4.95,309.60],[4.88,309.77],[4.82,309.94],[4.76,310.11],[4.70,310.27],[4.65,310.44],[4.60,310.61],[4.55,310.77],[4.51,310.94],[4.47,311.11],[4.43,311.27],[4.41,311.42],[4.39,311.46],[4.37,311.53],[4.34,311.61],[4.29,311.76],[4.24,311.90],[4.19,312.05],[4.15,312.19],[4.11,312.33],[4.07,312.46],[4.03,312.60],[4.00,312.74],[3.96,312.87],[3.93,313.01],[3.90,313.15],[3.87,313.30],[3.83,313.44],[3.83,313.52],[3.81,313.60],[3.79,313.68],[3.78,313.76],[3.76,313.84],[3.75,313.93],[3.73,314.01],[3.72,314.10],[3.70,314.20],[3.69,314.28],[3.69,314.33],[3.68,314.34],[3.68,314.39],[3.66,314.84],[2.16,359.92],[2.15,360.09],[2.15,360.13],[2.17,360.18],[2.18,360.28],[2.23,360.46],[2.25,360.56],[2.31,360.74],[2.34,360.84],[2.37,360.93],[2.41,361.03],[2.45,361.11],[2.50,361.21],[2.55,361.30],[2.60,361.39],[2.66,361.48],[2.73,361.56],[2.80,361.66],[2.84,361.69],[2.88,361.74],[2.92,361.78],[2.96,361.82],[3.00,361.86],[3.05,361.90],[3.09,361.95],[3.14,361.99],[3.19,362.03],[3.24,362.07],[3.30,362.11],[3.40,362.18],[3.47,362.22],[3.53,362.26],[3.59,362.30],[3.66,362.34],[4.51,362.82],[4.51,364.01],[4.52,364.11],[4.53,364.21],[4.54,364.31],[4.56,364.41],[4.58,364.51],[4.60,364.60],[4.63,364.70],[4.66,364.79],[4.69,364.89],[4.73,364.98],[4.77,365.07],[4.81,365.16],[4.86,365.25],[4.90,365.34],[4.96,365.43],[5.01,365.51],[5.01,365.56],[5.01,365.60],[5.02,365.65],[5.02,365.70],[5.04,365.74],[5.05,365.79],[5.07,365.83],[5.09,365.88],[5.13,365.97],[5.18,366.05],[5.23,366.13],[5.28,366.21],[22.39,366.21],[22.39,366.20]]]
  bt.rotate(svg, 90)
  const bounds = bt.bounds(svg)
  bt.translate(svg, [-nozzleSize, 0], bounds.lc)
  bt.scale(svg, length / bounds.width, [0, 0])
  bt.rotate(svg, direction, [0, 0])
  bt.translate(svg, position, [0, 0])
  return svg
}


////////// Modules
function simplexNoise() {
  // npm:simplex-noise@4.0.1
  // Jonas Wagner
  // MIT license
  // https://github.com/jwagner/simplex-noise.js
  const M1=.5*(Math.sqrt(3)-1),r1=(3-Math.sqrt(3))/6,D1=1/3,Z=1/6,q1=(Math.sqrt(5)-1)/4,m=(5-Math.sqrt(5))/20,W=P=>Math.floor(P)|0,h1=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),z1=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]),l1=new Float64Array([0,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,1,0,1,1,1,0,1,-1,1,0,-1,1,1,0,-1,-1,-1,0,1,1,-1,0,1,-1,-1,0,-1,1,-1,0,-1,-1,1,1,0,1,1,1,0,-1,1,-1,0,1,1,-1,0,-1,-1,1,0,1,-1,1,0,-1,-1,-1,0,1,-1,-1,0,-1,1,1,1,0,1,1,-1,0,1,-1,1,0,1,-1,-1,0,-1,1,1,0,-1,1,-1,0,-1,-1,1,0,-1,-1,-1,0]);function b1(P=random){const t=i1(P),l=new Float64Array(t).map(a=>h1[a%12*2]),n=new Float64Array(t).map(a=>h1[a%12*2+1]);return function(f,p){let z=0,h=0,M=0;const D=(f+p)*M1,A=W(f+D),G=W(p+D),q=(A+G)*r1,S=A-q,T=G-q,d=f-S,F=p-T;let b,N;d>F?(b=1,N=0):(b=0,N=1);const U=d-b+r1,y=F-N+r1,x=d-1+2*r1,g=F-1+2*r1,j=A&255,k=G&255;let s=.5-d*d-F*F;if(s>=0){const o=j+t[k],u=l[o],w=n[o];s*=s,z=s*s*(u*d+w*F)}let c=.5-U*U-y*y;if(c>=0){const o=j+b+t[k+N],u=l[o],w=n[o];c*=c,h=c*c*(u*U+w*y)}let e=.5-x*x-g*g;if(e>=0){const o=j+1+t[k+1],u=l[o],w=n[o];e*=e,M=e*e*(u*x+w*g)}return 70*(z+h+M)}}function N1(P=random){const t=i1(P),l=new Float64Array(t).map(f=>z1[f%12*3]),n=new Float64Array(t).map(f=>z1[f%12*3+1]),a=new Float64Array(t).map(f=>z1[f%12*3+2]);return function(p,z,h){let M,D,A,G;const q=(p+z+h)*D1,S=W(p+q),T=W(z+q),d=W(h+q),F=(S+T+d)*Z,b=S-F,N=T-F,U=d-F,y=p-b,x=z-N,g=h-U;let j,k,s,c,e,o;y>=x?x>=g?(j=1,k=0,s=0,c=1,e=1,o=0):y>=g?(j=1,k=0,s=0,c=1,e=0,o=1):(j=0,k=0,s=1,c=1,e=0,o=1):x<g?(j=0,k=0,s=1,c=0,e=1,o=1):y<g?(j=0,k=1,s=0,c=0,e=1,o=1):(j=0,k=1,s=0,c=1,e=1,o=0);const u=y-j+Z,w=x-k+Z,X=g-s+Z,Y=y-c+2*Z,K=x-e+2*Z,L=g-o+2*Z,O=y-1+3*Z,Q=x-1+3*Z,R=g-1+3*Z,H=S&255,I=T&255,J=d&255;let v=.6-y*y-x*x-g*g;if(v<0)M=0;else{const i=H+t[I+t[J]];v*=v,M=v*v*(l[i]*y+n[i]*x+a[i]*g)}let B=.6-u*u-w*w-X*X;if(B<0)D=0;else{const i=H+j+t[I+k+t[J+s]];B*=B,D=B*B*(l[i]*u+n[i]*w+a[i]*X)}let C=.6-Y*Y-K*K-L*L;if(C<0)A=0;else{const i=H+c+t[I+e+t[J+o]];C*=C,A=C*C*(l[i]*Y+n[i]*K+a[i]*L)}let E=.6-O*O-Q*Q-R*R;if(E<0)G=0;else{const i=H+1+t[I+1+t[J+1]];E*=E,G=E*E*(l[i]*O+n[i]*Q+a[i]*R)}return 32*(M+D+A+G)}}function X1(P=random){const t=i1(P),l=new Float64Array(t).map(p=>l1[p%32*4]),n=new Float64Array(t).map(p=>l1[p%32*4+1]),a=new Float64Array(t).map(p=>l1[p%32*4+2]),f=new Float64Array(t).map(p=>l1[p%32*4+3]);return function(z,h,M,D){let A,G,q,S,T;const d=(z+h+M+D)*q1,F=W(z+d),b=W(h+d),N=W(M+d),U=W(D+d),y=(F+b+N+U)*m,x=F-y,g=b-y,j=N-y,k=U-y,s=z-x,c=h-g,e=M-j,o=D-k;let u=0,w=0,X=0,Y=0;s>c?u++:w++,s>e?u++:X++,s>o?u++:Y++,c>e?w++:X++,c>o?w++:Y++,e>o?X++:Y++;const K=u>=3?1:0,L=w>=3?1:0,O=X>=3?1:0,Q=Y>=3?1:0,R=u>=2?1:0,H=w>=2?1:0,I=X>=2?1:0,J=Y>=2?1:0,v=u>=1?1:0,B=w>=1?1:0,C=X>=1?1:0,E=Y>=1?1:0,i=s-K+m,a1=c-L+m,f1=e-O+m,y1=o-Q+m,m1=s-R+2*m,p1=c-H+2*m,g1=e-I+2*m,u1=o-J+2*m,w1=s-v+3*m,d1=c-B+3*m,x1=e-C+3*m,F1=o-E+3*m,j1=s-1+4*m,k1=c-1+4*m,A1=e-1+4*m,G1=o-1+4*m,V=F&255,_=b&255,$=N&255,t1=U&255;let n1=.6-s*s-c*c-e*e-o*o;if(n1<0)A=0;else{const r=V+t[_+t[$+t[t1]]];n1*=n1,A=n1*n1*(l[r]*s+n[r]*c+a[r]*e+f[r]*o)}let o1=.6-i*i-a1*a1-f1*f1-y1*y1;if(o1<0)G=0;else{const r=V+K+t[_+L+t[$+O+t[t1+Q]]];o1*=o1,G=o1*o1*(l[r]*i+n[r]*a1+a[r]*f1+f[r]*y1)}let s1=.6-m1*m1-p1*p1-g1*g1-u1*u1;if(s1<0)q=0;else{const r=V+R+t[_+H+t[$+I+t[t1+J]]];s1*=s1,q=s1*s1*(l[r]*m1+n[r]*p1+a[r]*g1+f[r]*u1)}let c1=.6-w1*w1-d1*d1-x1*x1-F1*F1;if(c1<0)S=0;else{const r=V+v+t[_+B+t[$+C+t[t1+E]]];c1*=c1,S=c1*c1*(l[r]*w1+n[r]*d1+a[r]*x1+f[r]*F1)}let e1=.6-j1*j1-k1*k1-A1*A1-G1*G1;if(e1<0)T=0;else{const r=V+1+t[_+1+t[$+1+t[t1+1]]];e1*=e1,T=e1*e1*(l[r]*j1+n[r]*k1+a[r]*A1+f[r]*G1)}return 27*(A+G+q+S+T)}}function i1(P){const t=512,l=new Uint8Array(t);for(let n=0;n<t/2;n++)l[n]=n;for(let n=0;n<t/2-1;n++){const a=n+~~(P()*(256-n)),f=l[n];l[n]=l[a],l[a]=f}for(let n=256;n<t;n++)l[n]=l[n-256];return l}return{buildPermutationTable:i1,createNoise2D:b1,createNoise3D:N1,createNoise4D:X1} // hello!    
}