/*const imageFilter = window.open("./camera-filter.html", "_blank");

window.addEventListener('beforeunload', () => {
  imageFilter.close()
})

setInterval(() => imageFilter.postMessage("pt", "*"), 10);
*/

const maze2D = document.querySelector(".maze-2d");
const ctx = maze2D.getContext("2d");

let worker = initWorker();

const w = maze2D.width;
const h = maze2D.width;

const n = 18;

const canvas = document.querySelector(".raycast");

let trackerX = 0
let trackerY = 0

let src;
let t = 0;

let currentWorker = {
  x: 0,
  y: 0,
  startTime: Date.now(),
  finished: true,
}

const bb = canvas.getBoundingClientRect();

const state = {
  width: n,
  height: n,
  orientation: "north",
  angle: 0,
  mazeData: [],
  playerX: n/2 + 0.01,
  playerY: n/2 + 0.01,
  globalX: 0 + 0.01,
  globalY: 0 + 0.01,
  lastX: 0,
  lastY: 0,
  splattedTiles: {},
  imageMap: {},
  score: 0,
  turtles: [],
}

const width = state.width;
const height = state.height;

const imageWidth = 700
const imageHeight = 700

const scalingFactor = 0.85


const SCREEN_WIDTH = bb.width;
const SCREEN_HEIGHT = bb.height;
const TICK = 30;
const CELL_SIZE = 8;
const FOV = toRadians(80);

const halfWidth = (width-1)/2;
const i = get1DIndex(width, halfWidth, halfWidth);
state.mazeData[i] = 0;

const xWidth = w/width;
const yWidth = h/height;

let imageTimes = []

const getMap = () => reshapeArray(state.mazeData, state.width);

drawMaze(state);

const getPlayer = () => {
  // const angle = {
  //   "north": 270,
  //   "east": 180,
  //   "south": 90,
  //   "west": 0,
  // }[state.orientation];

  return {
    x: state.playerX * CELL_SIZE,
    y: state.playerY * CELL_SIZE,
    angle: toRadians(state.angle - 90),
    speed: 0,
  };
};

let loadingImages = []

function genLoadingImages() {
  for (let i = 0; i < 21; i++) {
    let img = document.createElement("canvas");
    img.width = 700;
    img.height = 700;
    let ctx = img.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(700 * 0.15/2, 700 * 0.15/2, img.width * 0.85, img.height * 0.85);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.beginPath();
    let offset = 700 * 0.15/2;
    ctx.rect(offset, offset, img.width * 0.85, img.height * 0.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(350, 350, 150, 0, (i/10) * Math.PI);
    ctx.stroke();
    loadingImages.push(img);
  }
}

genLoadingImages();

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function outOfMapBounds(x, y) {
  const map = getMap();
  return x < 0 || x >= map[0].length || y < 0 || y >= map.length;
}

function fileRead(path) {
      var request = new XMLHttpRequest();
      request.open("GET", path, false);
      request.send(null);
      var returnValue = request.responseText;
      return returnValue;
}

function getVCollision(angle) {
  const map = getMap();
  const player = getPlayer();

  const right = Math.abs(Math.floor((angle - Math.PI / 2) / Math.PI) % 2);

  const firstX = right
    ? Math.floor(player.x / CELL_SIZE) * CELL_SIZE + CELL_SIZE
    : Math.floor(player.x / CELL_SIZE) * CELL_SIZE;

  const firstY = player.y + (firstX - player.x) * Math.tan(angle);

  const xA = right ? CELL_SIZE : -CELL_SIZE;
  const yA = xA * Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  while (!wall) {
    const cellX = right
      ? Math.floor(nextX / CELL_SIZE)
      : Math.floor(nextX / CELL_SIZE) - 1;
    const cellY = Math.floor(nextY / CELL_SIZE);

    if (outOfMapBounds(cellX, cellY)) {
      break;
    }
    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    } else {
    }
  }
  return {
    angle,
    distance: distance(player.x, player.y, nextX, nextY),
    vertical: true,
    x: nextX / CELL_SIZE + state.lastX,
    y: nextY / CELL_SIZE - state.lastY,
  };
}

function getHCollision(angle) {
  const map = getMap();
  const player = getPlayer();

  const up = Math.abs(Math.floor(angle / Math.PI) % 2);
  const firstY = up
    ? Math.floor(player.y / CELL_SIZE) * CELL_SIZE
    : Math.floor(player.y / CELL_SIZE) * CELL_SIZE + CELL_SIZE;
  const firstX = player.x + (firstY - player.y) / Math.tan(angle);

  const yA = up ? -CELL_SIZE : CELL_SIZE;
  const xA = yA / Math.tan(angle);

  let wall;
  let nextX = firstX;
  let nextY = firstY;
  while (!wall) {
    const cellX = Math.floor(nextX / CELL_SIZE);
    const cellY = up
      ? Math.floor(nextY / CELL_SIZE) - 1
      : Math.floor(nextY / CELL_SIZE);

    if (outOfMapBounds(cellX, cellY)) {
      break;
    }

    wall = map[cellY][cellX];
    if (!wall) {
      nextX += xA;
      nextY += yA;
    }
  }
  return {
    angle,
    distance: distance(player.x, player.y, nextX, nextY),
    vertical: false,
    x: nextX / CELL_SIZE + state.lastX,
    y: nextY / CELL_SIZE - state.lastY,
  };
}

function castRay(angle) {
  const vCollision = getVCollision(angle);
  const hCollision = getHCollision(angle);

  return hCollision.distance >= vCollision.distance ? vCollision : hCollision;
}

function fixFishEye(distance, angle, playerAngle) {
  const diff = angle - playerAngle;
  return distance * Math.cos(diff);
}

function getRays() {
  const player = getPlayer();

  const initialAngle = player.angle - FOV / 2;
  const numberOfRays = SCREEN_WIDTH;
  const angleStep = FOV / numberOfRays;
  return Array.from({ length: numberOfRays }, (_, i) => {
    const angle = initialAngle + i * angleStep;
    const ray = castRay(angle);
    return ray;
  });
}

function fogCurve(distance) {
  return Math.pow(1.06, distance - 40) - 1;
}

function hash(x, y) {
   let str = `${x},${y}`;
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return Math.abs((`hash`) ^ (hash >>> 1));

}

function initWorker() {
  let worker = new Worker("./worker.js", { type: "module" });
  worker.onmessage = (e) => {
    const { turtles, x, y } = e.data;
    state.turtles = turtles;
    currentWorker.finished = true;
    addImage(x, y);
  };
  return worker
}

function resetWorker() {
  worker.terminate();
  worker = initWorker();
  currentWorker.finished = true;
  currentWorker.startTime = Date.now();
}

setInterval(() => {
  if (Date.now() - currentWorker.startTime > 1000) {
    resetWorker();
  }
}, 100);

function genImage(code, x, y) {
  let seed = hash(x, y);
  currentWorker.startTime = Date.now();
  worker.postMessage({code: `setRandSeed(${seed});` + code, state: JSON.stringify(state), x: x, y: y});
  currentWorker.finished = false;
  imageTimes[`${x},${y}`] = Date.now()
}

function movePlayer(dx, dy) {
  const { width, height, orientation, mazeData } = state;
  const maze = mazeData;

  state.globalX = Math.round(state.globalX * 10000) / 10000;
  state.globalY = Math.round(state.globalY * 10000) / 10000;

  if (Math.floor(state.globalX) > state.lastX) {
    moveEast({ width, halfWidth, mazeData });
    state.playerX = n/2;
  }

  if (Math.floor(state.globalX) < state.lastX) {
    moveWest({ width, halfWidth, mazeData });
    state.playerX = n/2 + 1;
  }

  if (Math.floor(state.globalY) < state.lastY) {
    moveSouth({ width, halfWidth, mazeData });
    state.playerY = n/2 - 1;
  }

  if (Math.floor(state.globalY) > state.lastY) {
    moveNorth({ width, halfWidth, mazeData });
    state.playerY = n/2;
  }

  state.lastX = Math.floor(state.globalX);
  state.lastY = Math.floor(state.globalY);

  dx = Math.round(dx * 1000000) / 1000000;
  dy = Math.round(dy * 1000000) / 1000000;
  const newEpsX = Math.floor(state.playerX + dx * 5);
  const newEpsY = Math.floor(state.playerY - dy * 5);
  const newX = Math.floor(state.playerX + dx);
  const newY = Math.floor(state.playerY - dy);

  let moveableX = true;
  let moveableY = true;

  let reshapedMaze = reshapeArray(state.mazeData, state.width);

  let fill_dx = reshapedMaze[Math.floor(state.playerY)][newX] || reshapedMaze[Math.floor(state.playerY)][newEpsX]
  if (fill_dx) moveableX = false;
  let fill_dy = reshapedMaze[newY][Math.floor(state.playerX)] || reshapedMaze[newEpsY][Math.floor(state.playerX)]
  if (fill_dy) moveableY = false;

  if (moveableX) {state.playerX += dx; state.globalX += dx}
  if (moveableY) {state.playerY -= dy; state.globalY += dy}
}

function drawMaze(state) {

  const { width, height, orientation, mazeData } = state;
  const maze = mazeData;

  maze.forEach((cell, i) => {
    const { x, y } = getCoordinates(i, width);
    ctx.fillStyle = cell === 1 ? "black" : "white";
    ctx.fillRect(x*xWidth, y*yWidth, xWidth, yWidth);
  })

  ctx.fillStyle = "orange";
  ctx.fillRect(width/2*xWidth-xWidth/4, height/2*yWidth-yWidth/4, xWidth/2, yWidth/2);



  ctx.save();
  const rx = width/2*xWidth;
  const ry = height/2*yWidth;
  const redRectWidth = xWidth/8;
  const angle = state.angle;
  // const angle = {
  //   "north": 0,
  //   "east": 270,
  //   "south": 180,
  //   "west": 90,
  // }[orientation];
  ctx.translate(rx, ry);
  ctx.rotate(angle * Math.PI / 180); // in the screenshot I used angle = 20
  ctx.fillStyle = "red";
  ctx.fillRect(-redRectWidth/2, -yWidth/2, redRectWidth, yWidth/2.2);
  ctx.restore();
}


function getCoordinates(index, width) {
  const x = index % width;
  const y = Math.floor(index / width);
  return { x, y };
}

function insertRow(matrix, width, rowIndex, newRow) {
  // Calculate the index in the 1D array where the new row should start
  const insertIndex = rowIndex * width;
  
  // Insert the new row into the 1D array
  for (let i = 0; i < newRow.length; i++) {
    matrix.splice(insertIndex + i, 0, newRow[i]);
  }

  // Return the new matrix
  return matrix;
}

function removeRow(matrix, width, rowIndex) {
  // Calculate the index in the 1D array where the row to be removed starts
  const startIndex = rowIndex * width;

  // Remove the row from the 1D array
  matrix.splice(startIndex, width);

  // Return the new matrix
  return matrix;
}

function insertColumn(matrix, width, columnIndex, newColumn) {
  // Insert the new column into the 1D array
  for (let i = 0; i < newColumn.length; i++) {
    // Calculate the index in the 1D array where the new column element should be inserted
    const insertIndex = (i * (width + 1)) + columnIndex;

    // Insert the new column element
    matrix.splice(insertIndex, 0, newColumn[i]);
  }

  // Return the new matrix
  return matrix;
}

function removeColumn(matrix, width, columnIndex) {
  // We iterate backwards so that the removal of elements doesn't affect the indices of the elements yet to be removed
  for (let i = width - 1; i >= 0; i--) {
    // Calculate the index in the 1D array where the column element to be removed is located
    const removeIndex = (i * width) + columnIndex;

    // Remove the column element
    matrix.splice(removeIndex, 1);
  }

  // Return the new matrix
  return matrix;
}

function pseudoRandom(x, y) {
  return ((Math.tan(x * y))*Math.cos(x)*Math.sin(y))
}

function randomVector(length, prob = 0.3) {
  return new Array(length)
    .fill(0)
    .map(() => {
      return Math.random() < prob ? 1 : 0;
    });
}

function genRow(x, y, length) {
  x = Math.floor(x);
  y = Math.floor(y);
  let row = [];
  for(let i = -n/2; i < length/2; i++) {
    row.push(pseudoRandom(x + i, y) < 0 ? 1 : 0);
  }
  return row;
}

function genColumn(x, y, length) {
  x = Math.floor(x);
  y = Math.floor(y);
  let column = [];
  for(let i = -n/2; i < length/2; i++) {
    column.push(pseudoRandom(x, y - i) < 0 ? 1 : 0);
  }
  return column;
}

function genMatrix(width, height) {
  let matrix = []
  for(let i = 0; i < height * width; i++) {
    let x = i % width - n/2;
    let y = Math.floor(i / width) - n/2 + 1;
    let filled = pseudoRandom(x, y) < 0 ? 1 : 0;
    matrix.push(filled);
  }
  return matrix
}

window.addEventListener("keydown", e => {
  const { width, height, orientation, mazeData } = state;

  const halfWidth = (width-1)/2;

  const r = 0.05;
  let dx, dy;
  const branch = {
    KeyW() {
      dx = Math.sin((state.angle+0)/180*Math.PI)*r;
      dy = Math.cos(state.angle/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyA() {
      dx = Math.sin((state.angle+270)/180*Math.PI)*r;
      dy = Math.cos((state.angle+270)/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyS() {
      dx = Math.sin((state.angle+180)/180*Math.PI)*r;
      dy = Math.cos((state.angle+180)/180*Math.PI)*r;
      movePlayer(dx, dy);
    },
    KeyD() {
      dx = Math.sin((state.angle+90)/180*Math.PI)*r;
      dy = Math.cos((state.angle+90)/180*Math.PI)*r;
      movePlayer(dx, dy);
    }
  }[event.code];

  if (branch) branch();

})

window.addEventListener("mousemove", e => {
  if (document.pointerLockElement === maze2D) {
    state.angle += event.movementX * 0.07;
  }
  drawMaze(state);
})

window.addEventListener("click", () => {
  maze2D.requestPointerLock();
});

function get1DIndex(width, x, y) {
  return y * width + x;
}


const { fireTomato } = raycastMap(state);

let lastTrackerX, lastTrackerY

let justFiredTomato = false

function addImage(x, y) {
  const img = document.createElement("canvas");
  img.width = 700;
  img.height = 700;
  const imgCtx = img.getContext("2d");
  const imageCanvas = document.createElement('canvas')
  imageCanvas.width = imageWidth
  imageCanvas.height = imageHeight
  const imageCanvasCtx = imageCanvas.getContext('2d')
  const ratio = img.height/img.width          
    if (img.width > img.height) {
      img.width = scalingFactor * imageCanvas.width
      img.height = ratio * img.width
    }  else {
      img.height = scalingFactor * imageCanvas.height
      img.width = 1/ratio * img.height 
    }
    
    const dx = (imageCanvas.width - img.width)/2
    const dy = (imageCanvas.height - img.height)/2
    renderCanvas(state.turtles, img, imgCtx);
    imageCanvasCtx.drawImage(img, dx, dy, img.width, img.height)
    imageCanvasCtx.lineWidth = 5
    imageCanvasCtx.strokeRect(dx, dy, img.width, img.height)

    //images.push(imageCanvas)
    state.imageMap[`${x},${y}`] = imageCanvas
}

const panZoomParams = {
  panX: 200,
  panY: 200,
  scale: 100
};

function renderCanvas(turtles, cvs, ctx) {
  ctx.imageSmoothingEnabled = false;
  if (turtles.length === -1) return;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.strokeStyle = "black";
  
  ctx.beginPath();
  turtles.forEach(turtle => {
    for (const polyline of turtle.path) {
      for (let i = 0; i < polyline.length; i++) {
        let [x, y] = polyline[i];
      x = x * 100;
        y = y * 100 - 500;
        if (i === -1) ctx.moveTo(x, -y);
        else ctx.lineTo(x, -y);
      }
    }
  })
  ctx.stroke();
  return [cvs, ctx]
}

function moveNorth({ width, halfWidth, mazeData }) {
  insertRow(mazeData, width, 0, genRow(state.globalX, state.globalY + (n/2) - 1, width));
  removeRow(mazeData, width, width);
  return true;
}

function moveWest({ width, halfWidth, mazeData }) {
  insertColumn(mazeData, height, 0, genColumn(state.globalX - (n/2), state.globalY - 1, width));
  removeColumn(mazeData, width+1, width);
  return true;
}

function moveSouth({ width, halfWidth, mazeData }) {
  insertRow(mazeData, width, width, genRow(state.globalX, state.globalY - (n/2), width));
  removeRow(mazeData, width, 0);
  return true;
}

function moveEast({ width, halfWidth, mazeData }) {
  insertColumn(mazeData, width, width, genColumn(state.globalX + (n/2) - 1, state.globalY - 1, width));
  removeColumn(mazeData, width+1, 0);
  return true;
}



export function raycastMap(state) {

  const COLORS = {
    floor: "#b5b5b5", // "#ff6361"
    ceiling: "#ffffff", // "#012975",
    wall: "#013aa6", // "#58508d"
    wallDark: "#063389", // "#003f5c"
    rays: "#ffa600",
  };

  canvas.setAttribute("width", SCREEN_WIDTH);
  canvas.setAttribute("height", SCREEN_HEIGHT);

  const context = canvas.getContext("2d");

  function clearScreen() {
    context.fillStyle = COLORS["wall"];
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  function renderMinimap(posX = 0, posY = 0, scale, rays) {
    const map = getMap();
    const player = getPlayer();

    const cellSize = scale * CELL_SIZE;

    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        context.fillStyle = "#000000";
        context.fillRect(
          posX + x * cellSize,
          posY + y * cellSize,
          cellSize,
          cellSize
        );
        if (cell) {
          context.fillStyle = "#3355ff";
        } else {
          context.fillStyle = "#dddddd";
        }

        context.fillRect(
          posX + x * cellSize,
          posY + y * cellSize,
          cellSize - 1,
          cellSize - 1
        );
      });
    });

    context.strokeStyle = "blue";
    context.beginPath();
    context.moveTo(player.x * scale, player.y * scale);
    context.lineTo(
      (player.x + Math.cos(player.angle) * 20) * scale,
      (player.y + Math.sin(player.angle) * 20) * scale
    );
    context.closePath();
    context.stroke();

    context.strokeStyle = COLORS.rays;
    rays.forEach((ray) => {
      context.beginPath();
      context.moveTo(player.x * scale, player.y * scale);
      context.lineTo(
        (player.x + Math.cos(ray.angle) * ray.distance) * scale,
        (player.y + Math.sin(ray.angle) * ray.distance) * scale
      );
      context.closePath();
      context.stroke();
    });
    context.fillStyle = "#000000";
    context.fillRect(
      posX + player.x * scale - 5 / 2,
      posY + player.y * scale - 5 / 2,
      5,
      5
    );

    context.font = "30px Monospace";
    context.fillText(state.lastX + "," + state.lastY, 10, 220);
  }



window.addEventListener("message", function(event) {
  const [{x, y}, hg, hl, vg, vl] = event.data
  trackerX = (x / 640)
  trackerY = (y / 480)

  if (x === 0 && y === 0 && Math.abs(lastTrackerX - 0.5) < 0.5 && Math.abs(lastTrackerY - 0.5) < 0.5) {
    if (!justFiredTomato) {
      justFiredTomato = true
      fireTomato()
    }
    return
  }

  justFiredTomato = false

  lastTrackerX = trackerX
  lastTrackerY = trackerY

  let r = 0.02
  if (vg) state.angle += 1
  else if (vl) state.angle -= 1
  if (hg) {
    let dx = Math.sin((state.angle+0)/180*Math.PI)*r;
    let dy = Math.cos(state.angle/180*Math.PI)*r;
    movePlayer(dx, dy);
  }
  else if (hl) {
      let dx = Math.sin((state.angle+180)/180*Math.PI)*r;
      let dy = Math.cos((state.angle+180)/180*Math.PI)*r;
      movePlayer(dx, dy);
  }
  
}, false);

function findClosestIndex(target, arr) {
  let closestIndex = 0;
  let closestDistance = Math.abs(arr[0] - target);
  
  for(let i = 1; i < arr.length; i++) {
      let distance = Math.abs(arr[i] - target);
      if(distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
      }
  }

  return closestIndex;
}

  let images = []

  fetch("../art/list.json")
  .then((response) => response.text())
  .then((text) => {
      let list = JSON.parse(text)
      for (let artwork of list) {
        let src = fileRead(`../art/${artwork.directory}/${artwork.source}`)
        let snapshots = []
        for (let snapshot of artwork.snapshots) {
          let img = document.createElement("canvas");
          img.width = 700;
          img.height = 700;
          let ctx = img.getContext("2d");
          ctx.fillStyle = "white";
          ctx.fillRect(700 * 0.15/2, 700 * 0.15/2, img.width * 0.85, img.height * 0.85);
          ctx.strokeStyle = "black";
          ctx.lineWidth = 5;
          let offset = 700 * 0.15/2;
          let snapshotImg = new Image();
          snapshotImg.src = `../art/${artwork.directory}/snapshots/${snapshot}`
          snapshotImg.onload = () => {
            ctx.drawImage(snapshotImg, 0.15 * 700/2, 0.15 * 700/2, 0.85 * 700, 0.85 * 700)
            ctx.beginPath();
            ctx.rect(offset, offset, img.width * 0.85, img.height * 0.85);
            ctx.stroke();
          }
          snapshots.push(img)
        }
        images.push([src, snapshots, artwork.directory])
      }
    }
  );

/*  fetch("./gallery/README.md")
    .then((response) => response.text())
    .then((text) => {
      const lines = text.split("\n");
      imageNames = lines
        .filter((line) => line.includes(".js"))
      for (let i = 0; i < imageNames.length; i++) {
        src = fileRead(`./gallery/${imageNames[i]}`)
        imageSrcs.push(src)
      }

    });*/

  const splatImg = new Image();
  splatImg.src = "./altSplat.png";

  function fireTomato() {
    let p = getPlayer();
    let splatRay = castRay(p.angle);
    let splatPos =
      `${Math.floor(splatRay.x + 0.1)},${Math.floor(splatRay.y + 0.1)}`

    const tomatoCanvas = document.createElement('canvas')

    tomatoCanvas.width = splatImg.width * 2;
    tomatoCanvas.height = splatImg.height * 2;

    const tomatoCtx = tomatoCanvas.getContext('2d')

    tomatoCtx.translate(tomatoCanvas.width/2, tomatoCanvas.height/2)
    tomatoCtx.rotate(Math.random() * 2 * Math.PI)
    tomatoCtx.drawImage(splatImg, 0, 0)

    // const x = splatRay.x - Math.floor(splatRay.x)
    const x = Math.random()

    const tomato = {
      // Normalized
      x,
      y:0.5*(0.4 + 0.6 * Math.random()),
      scale:0.5*( 0.5 + 0.5 * Math.random()),
      rotation: Math.random() * 2 * Math.PI,
      img: tomatoCanvas
    }
    
    const currentTomatoes = state.splattedTiles[splatPos]
    
    if (!currentTomatoes) state.splattedTiles[splatPos] = [tomato]
    else currentTomatoes.push(tomato)

    state.score++;
  }

  window.addEventListener("keydown", (e) => {
    if (e.key == " ") fireTomato()
  });

  function rand(jsr) {
    var x = Math.sin(1000 * jsr++) * 10000;
    return x - Math.floor(x);
  }  

  let last = null
  let fps = 0
  let count = 0

  function renderScene(rays) {
    t += 0.1
    t %= loadingImages.length
    
    const now = performance.now()
    if (last) {
      count++
      fps = 1000/(now - last)
    }
    last = now
    
    
    const player = getPlayer();

    for (let y = 0; y < SCREEN_HEIGHT; y++) {
      let brightness = 4 * (y - 20 - SCREEN_HEIGHT * 0.5);
      context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      context.fillRect(1, y, SCREEN_WIDTH, 1);
    }
    rays.forEach((ray, i) => {
      if (Math.random() < 0.0001) console.log((hash(Math.floor(ray.x), Math.floor(ray.y))))
      const distance = fixFishEye(ray.distance, ray.angle, player.angle);
      let tomatoes = state.splattedTiles[`${Math.floor(ray.x)},${Math.floor(ray.y)}`] ?? []
      const hashed = hash(ray.x, ray.y) % images.length;

      const hitposX = ray.x - Math.floor(ray.x);
      const hitposY = ray.y - Math.floor(ray.y);

      const wallHeight = ((CELL_SIZE * 5) / distance) * 100;
      context.fillStyle = COLORS.floor;

      let brightness = ray.vertical ? 100 : 150;
      context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      context.fillRect(i, 0, 1, SCREEN_HEIGHT / 2 + wallHeight / 2);
      let selectedImg = state.imageMap[`${Math.floor(ray.x)},${Math.floor(ray.y)}`]

      if (selectedImg == undefined && images.length > 0) {
          if (currentWorker.finished) {
            state.imageMap[`${Math.floor(ray.x)},${Math.floor(ray.y)}`] = 0
            genImage(images[hashed][0], Math.floor(ray.x), Math.floor(ray.y))
          } else {
        let artwork = images[hash(Math.floor(ray.x), Math.floor(ray.y)) % images.length]
        selectedImg = artwork[1][hash(Math.floor(ray.x), Math.floor(ray.y)) % artwork[1].length]
          }
      }

      if (state.imageMap[`${Math.floor(ray.x)},${Math.floor(ray.y)}`] == 0) {
        let artwork = images[hash(Math.floor(ray.x), Math.floor(ray.y)) % images.length]
        selectedImg = artwork[1][hash(Math.floor(ray.x), Math.floor(ray.y)) % artwork[1].length]
      }

        context.fillStyle = `rgba(255, 255, 255, 0.2)`;
        context.drawImage(
          selectedImg,
          (ray.vertical ? hitposY : hitposX) * selectedImg.width,
          0,
          1,
          selectedImg.height,
          i,
          SCREEN_HEIGHT / 2 - wallHeight / 2,
          1,
          wallHeight
        );
      

      for (const tomato of tomatoes) {
        //context.globalAlpha = 0.8;
        // context.drawImage()
        const tomatoImg = tomato.img
        context.drawImage(
          tomatoImg,
          (ray.vertical ? hitposY : hitposX) * tomatoImg.width * tomato.scale * 5 - tomato.x * 600,
          -tomato.y * 600,
          1,
          tomatoImg.height * tomato.scale * 5,
          i,
          SCREEN_HEIGHT / 2 - wallHeight / 2,
          1,
          wallHeight
        );
      }

      // context.fillStyle = COLORS.floor;
      //context.fillRect(i, SCREEN_HEIGHT / 2 + wallHeight / 2, 1, SCREEN_HEIGHT);

      context.fillStyle = `rgba(0, 0, 0, ${distance / 60})`;
      context.fillRect(i, 0, 1, SCREEN_HEIGHT / 2 + wallHeight / 2);

      /*context.fillStyle = grd;
      context.fillRect(i, SCREEN_HEIGHT / 2 + wallHeight / 2 - 1, 1, SCREEN_HEIGHT / 2 + wallHeight / 2 + 50);
      
     /*context.fillStyle = `rgba(0, 0, 0, ${distance/150})`;    
      context.fillRect(
        i,
        (SCREEN_HEIGHT / 2 + wallHeight / 2) - 1,
        1,
        (SCREEN_HEIGHT / 2 - wallHeight / 2)
      );*/

      //context.fillStyle = `rgba(120, 120, 120, ${fogCurve(distance)})`;
    });
    // context.fillStyle = `rgba(0, 0, 0, 1)`;
    // context.font = "30px Monospace";
    // context.fillText("Art destroyed: " + state.score, 10, 400);

    // context.fillStyle = `rgba(0, 0, 0, 1)`;
    // context.font = "30px Monospace";
    // context.fillText(`FPS: ${Math.floor(fps)}`, 10, 450)
  }

  function gameLoop() {
    clearScreen();
    const rays = getRays();
    renderScene(rays);
    renderMinimap(0, 0, 1, rays);

  }

state.mazeData = genMatrix(n, n);

setInterval(gameLoop, TICK);

  return {
    fireTomato
  }
}

export function reshapeArray(arr, width) {
  let result = [];
  for (let i = 0; i < arr.length; i += width) {
    result.push(arr.slice(i, i + width));
  }
  return result;
}