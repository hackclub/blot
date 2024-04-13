/*
@title: Satellite
@author: James Ma
@snapshot: Use_this_one
*/

const width = 100;
const height = 100;

setDocDimensions(width, height);

const frameRate = 2000 //higher = more precise simulation
const simTime = 1374 //raise if simulation is incomplete
let clock = 0

const blackHolePos = [80, 80]
const blackHoleGrav = 120
const starPos = [20, 20]
const starGrav = 10
let satellitePos = [20, 60]
let satelliteVel = [0.5, 1]

function calculateAcc(pos, grav) {
  const dist = Math.pow(Math.pow(satellitePos[0] - pos[0], 2) + Math.pow(satellitePos[1] - pos[1], 2), 0.5)
  const force = grav / Math.pow(dist, 2) //change this if you want to see a biblically accurate angel
  return [(pos[0] - satellitePos[0]) / dist * force, (pos[1] - satellitePos[1]) / dist * force]
}

function incrementSimulation() {
  clock += 1 / frameRate
  satellitePos[0] += satelliteVel[0] / frameRate
  satellitePos[1] += satelliteVel[1] / frameRate
  const blackHoleAcc = calculateAcc(blackHolePos, blackHoleGrav)
  const starAcc = calculateAcc(starPos, starGrav)
  satelliteVel[0] += blackHoleAcc[0] / frameRate
  satelliteVel[1] += blackHoleAcc[1] / frameRate
  satelliteVel[0] += starAcc[0] / frameRate
  satelliteVel[1] += starAcc[1] / frameRate
}

function withinBounds() {
  return (satellitePos[0] > -1) && (satellitePos[1] > -1) && (satellitePos[0] < width) && (satellitePos[1] < height)
}

let trajectory = []

while ((clock < simTime) && withinBounds()) {
  trajectory.push(satellitePos.slice())
  incrementSimulation()
}

let blackHoleDrawing = []

for (let i = 0; i < 2; i += 0.001) {
  blackHoleDrawing.push([i * Math.cos(100 * i) + blackHolePos[0], i * Math.sin(100 * i) + blackHolePos[1]])
}

let starDrawing = []

for (let i = 0; i < 2; i += 0.001) {
  starDrawing.push([Math.cos(Math.PI * i) + starPos[0], Math.sin(Math.PI * i) + starPos[1]])
}

drawLines([starDrawing, blackHoleDrawing, trajectory]);