const t = new Turtle()
drawTurtles(t)
const time = 106

const resX = 5.16
const resY = 0.52
const heightScale = 40.9
const noiseScale = 0.3
const seaLevel = 16.6
const waveScale =  noiseScale * 27.55 * Math.sin(time * 0.1)
const waveHeight = 0.16
const distanceFalloff = 4

const globalScale = 1

const cameraX = 25.34
const dx = 1/(resX * 10)
const dy = 1/(resY * 10)

let maxHeights = Array(Math.floor(10/dx)).fill(0)

function softmax(x, y) {
    const pow = 3
    return Math.log(Math.pow(pow, x) + Math.pow(pow, y)) / Math.log(pow)
}

function softmin(x, y) {
    const pow = 3
    return -Math.log(Math.pow(pow, -x) + Math.pow(pow, y)) / Math.log(pow)
}

function genHeight(x, y) {
  let height = (
    noise(
      [
        (x * noiseScale + cameraX),
         Math.pow(y, 1.4)* noiseScale
      ]
    ) * heightScale
  ) / (y+distanceFalloff)
  height = Math.max(
    height, 
    (seaLevel + 
     (waveHeight * Math.sin(x * waveScale + Math.cos(y*25.0)))
    ) / (y+4)
  )
  //height *= softmin(y, 1.0)
  return height
}

function go(x, y) {
  t.goto([(x) * globalScale, (y - 9) * globalScale])
}

function drawTree(x, y, size) {
  size = size * rand() + (size/2)
  t.down()
  go(x, y)
  go(x, y+size)
  t.up()
  go(x, y)
  t.down()
}

function drawLandscape() {
 for (let y = 0; y < +15; y += dy) {
   for (let x = 0; x < 10; x += dx) {
      let height = (4 * genHeight(x, y) / 6.56)
      if (x > 0) {t.down()} else {t.up()}
      if ((height + y/2) >= maxHeights[Math.floor(x / dx)]) {
        if (Math.random() > +0.62 && (height * (y + distanceFalloff) > +12.53)) {
          drawTree(x, height + y/2, 0.96 / (y+5.9))
        }
        go(x, y/2 + height)
        maxHeights[Math.floor(x / dx)] = (height + (y/2))
      } else {
        t.up()
        go(x, y/2 + height)
      }
      }
   
  t.up()
  go(0, 0)
  }
}

drawLandscape()