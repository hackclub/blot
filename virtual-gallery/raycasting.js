/*
import { Turtle } from "../interface/drawing-functions/Turtle.js";
import { noise } from "../interface/drawing-functions/noise.js";
import { rand, setRandSeed, randInRange, randIntInRange } from "../interface/drawing-functions/rand.js";
import { bezierEasing } from "../interface/drawing-functions/bezierEasing.js";
import { isPointInPolyline, inside } from "../interface/drawing-functions/isPointInPolyline.js";


export function raycastMap(state, el) {
  const getMap = () => reshapeArray(state.mazeData, state.width);
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

  const bb = el.getBoundingClientRect();

  const SCREEN_WIDTH = bb.width;
  const SCREEN_HEIGHT = bb.height;
  const TICK = 30;
  const CELL_SIZE = 8;
  const FOV = toRadians(80);

  const COLORS = {
    floor: "#b5b5b5", // "#ff6361"
    ceiling: "#ffffff", // "#012975",
    wall: "#013aa6", // "#58508d"
    wallDark: "#063389", // "#003f5c"
    rays: "#ffa600",
  };

  const canvas = el;
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
    // return Math.abs(Math.floor(x + y) % images.length);
    return Math.abs(Math.floor(3 * Math.floor(x) + 5 * Math.floor(y)) % images.length)
  }

  function getDist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - y1) ** 2 + (x2 - y2) ** 2);
  }

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
          console.log("test")
          x = x * 5000;
          y = -y * 5000 - 500;
          if (i === -1) ctx.moveTo(x, -y);
          else ctx.lineTo(x, -y);
        }
      }
    })
    //ctx.stroke();
    return [cvs, ctx]
  }



const drawingFunctions = {
  Turtle,
  createTurtle(start = [0, 0]) {
    return new Turtle(start);
  },
  noise,
  rand,
  setRandSeed,
  randInRange, 
  randIntInRange,
  bezierEasing,
  isPointInPolyline,
  inside,
  lerp(start, end, t) {
    return (1 - t) * start + t * end;
  }
}

let intervals = [];
let timeouts = [];
let loops = [];  

function runCode(code, state) {
  const ast = acorn.parse(code, { ecmaVersion: "latest" });
  const topScopeInserts = [];

  ast.body.forEach(statement => {
    const { type } = statement;

    if (type === "VariableDeclaration") {
      statement.declarations.forEach(x => {
        topScopeInserts.push(x.id.name);
      })
    }

    if (type === "FunctionDeclaration") {
      topScopeInserts.push(statement.id.name);
    }

  })

  topScopeInserts.forEach(name => {
    code += `\n;topScope["${name}"] = ${name};`
  });

  intervals.forEach(clearInterval);
  timeouts.forEach(clearTimeout);

  loops.forEach((x, i) => { loops[i] = false });

  const patchedInterval = (callback, time, ...args) => {
    const interval = setInterval(callback, time, ...args);
    intervals.push(interval);
    return interval;
  }

  const patchedTimeout = (callback, time, ...args) => {
    const timeout = setTimeout(callback, time, ...args);
    timeouts.push(timeout);
    return timeout;
  }


  const loop = (fn, minterval = 0) => {
    let n = loops.length;
    loops.push(true);
    while (loops[n]) {
      const date = new Date();
      const start = date.getTime();
      fn();
      const elapsed = (date.getTime()) - start;
      if (elapsed < minterval) delay(minterval - elapsed);
    }
  }

  let _log = console.log;
  let _warn = console.warn;
  let _error = console.error;

  state.turtles = [];

  const haxidraw = state.haxidraw;

  const clear = () => {
    state.turtles = [];
  }
  const topScope = { haxidraw, clear };

  const args = {
    ...drawingFunctions,
    drawTurtles: (...turtles) => {
      state.turtles.push(...turtles);
    },
    ...topScope,
    topScope,
    setInterval: patchedInterval,
    setTimeout: patchedTimeout,
    loop,
    console: {
      log: (...args) => {
        _log(...args)
        state.logs.push(...args);
      },
      warn: (...args) => {
        _warn(...args)
        state.logs.push(...args);
      },
      error: (...args) => {
        _error(...args)
        state.logs.push(...args);
      }
    },
  }

  const names = Object.keys(args);
  const values = Object.values(args);

  const AsyncFunction = (async function () { }).constructor;
  const f = new AsyncFunction(...names, code);

  f(...values);

  state.topScope = topScope;
}

  function genImage(code, img, imgCtx, seed) {
    runCode(`setRandSeed(${seed});` + code, state)
    return renderCanvas(state.turtles, img, imgCtx)
  }

  function addImage(source, images, i) {
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
          genImage(source, img, imgCtx, i);
          imageCanvasCtx.drawImage(img, dx, dy, img.width, img.height)
          imageCanvasCtx.lineWidth = 5
          imageCanvasCtx.strokeRect(dx, dy, img.width, img.height)

          images.push(imageCanvas)
  }

  const imageWidth = 700
  const imageHeight = 700
  const scalingFactor = 0.85

  let imageNames = [];
  let images = [];
  fetch("./gallery/README.md")
    .then((response) => response.text())
    .then((text) => {
      const lines = text.split("\n");
      imageNames = lines
        .filter((line) => line.includes(".js"))
      for (let i = 0; i < imageNames.length; i++) {
        const src = fileRead(`./gallery/${imageNames[i]}`)
        addImage(src, images, i)
      }
    });
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

  /*var fogCanvas = document.createElement('canvas'), ctx = fogCanvas.getContext('2d'), grd = ctx.createLinearGradient(0, (SCREEN_HEIGHT/2) + 20, 0, (SCREEN_HEIGHT/2) + 50);
fogCanvas.width = 700;
fogCanvas.height = 700;
grd.addColorStop(1,"rgba(50,50,50,0)");
grd.addColorStop(0,"black");

  

  let last = null
  let fps = 0
  let count = 0


  function renderScene(rays) {
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
      const distance = fixFishEye(ray.distance, ray.angle, player.angle);
      let tomatoes = state.splattedTiles[`${Math.floor(ray.x)},${Math.floor(ray.y)}`] ?? []
      //console.log([Math.floor(ray.x), Math.floor(ray.y)]+"")
      const hashed = hash(ray.x, ray.y);

      const hitposX = ray.x - Math.floor(ray.x);
      const hitposY = ray.y - Math.floor(ray.y);

      const wallHeight = ((CELL_SIZE * 5) / distance) * 100;
      context.fillStyle = COLORS.floor;
      /*context.fillRect(
        i,
        0,
        1,
        SCREEN_HEIGHT
      );
      //context.fillStyle = ray.vertical ? COLORS.wallDark : COLORS.wall;
      //context.fillStyle = `rgba(${[0, 100, 200][hashed]}, 255, 255, 255)`
      //context.fillRect(i, SCREEN_HEIGHT / 2 - wallHeight / 2, 1, wallHeight);

      let brightness = ray.vertical ? 100 : 150;
      context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      context.fillRect(i, 0, 1, SCREEN_HEIGHT / 2 + wallHeight / 2);
      const selectedImg = images[hashed];
      if (selectedImg) {
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
      }

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
      );

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
