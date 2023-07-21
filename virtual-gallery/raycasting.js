
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
      x: state.playerX*CELL_SIZE,
      y: state.playerY*CELL_SIZE,
      angle: toRadians(state.angle-90),
      speed: 0,
    }
  }

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
      row.forEach((cell, x) => 
      {
        context.fillStyle = '#000000';
        context.fillRect(
          posX + x * cellSize,
          posY + y * cellSize,
          cellSize,
          cellSize
        );
        if (cell) {
          context.fillStyle = "#3355ff";
        } else {
          context.fillStyle ="#dddddd";
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
      x: (nextX / CELL_SIZE) + (state.lastX),
      y: (nextY / CELL_SIZE) - (state.lastY),
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
      x: (nextX / CELL_SIZE) + (state.lastX),
      y: (nextY / CELL_SIZE) - (state.lastY),
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
    return Math.pow(1.06, (distance - 40)) - 1
  }

  function hash(x, y) {
    return Math.abs((Math.floor(x + y)) % images.length);
  }


  // Once there's an API for user images, it should be pretty easy to request and cache new images once their hash comes up.
  // This is just a placeholder for now
const image1 = new Image();
image1.src = 'https://assets.hackclub.com/icon-rounded.png';

const image2 = new Image();
image2.src = 'https://assets.hackclub.com/hack-club-bank-light.png';

const image3 = new Image();
image3.src = 'https://assets.hackclub.com/hack-club-bank-dark.png';

let images = [image1, image2, image3]


/*var fogCanvas = document.createElement('canvas'), ctx = fogCanvas.getContext('2d'), grd = ctx.createLinearGradient(0, (SCREEN_HEIGHT/2) + 20, 0, (SCREEN_HEIGHT/2) + 50);
fogCanvas.width = 700;
fogCanvas.height = 700;
grd.addColorStop(1,"rgba(50,50,50,0)");
grd.addColorStop(0,"black");
*/
  function renderScene(rays) {
    const player = getPlayer();

    for (let y = 0; y < SCREEN_HEIGHT; y++) {
      let brightness = 4*((y-20) - SCREEN_HEIGHT*0.5)
      context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      context.fillRect(
        1,
        y,
        SCREEN_WIDTH,
        1
      );
    }
    rays.forEach((ray, i) => {
      const distance = fixFishEye(ray.distance, ray.angle, player.angle);
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
      );*/
      //context.fillStyle = ray.vertical ? COLORS.wallDark : COLORS.wall;
      //context.fillStyle = `rgba(${[0, 100, 200][hashed]}, 255, 255, 255)`
      //context.fillRect(i, SCREEN_HEIGHT / 2 - wallHeight / 2, 1, wallHeight);

      let brightness = ray.vertical ? 100 : 150
      context.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
      context.fillRect( i, 0, 1, SCREEN_HEIGHT / 2 + wallHeight / 2);

      context.drawImage(images[hashed],
        (ray.vertical ? hitposY : hitposX) * 512, 0, 1, 512,
        i, (SCREEN_HEIGHT / 2) - (wallHeight / 2), 1, wallHeight);

       // context.fillStyle = COLORS.floor;
       //context.fillRect(i, SCREEN_HEIGHT / 2 + wallHeight / 2, 1, SCREEN_HEIGHT);

      context.fillStyle = `rgba(0, 0, 0, ${distance/60})`;      
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
  }

  function gameLoop() {
    clearScreen();
    const rays = getRays();
    renderScene(rays);
    renderMinimap(0, 0, 1, rays);
  }

  setInterval(gameLoop, TICK);

}

export function reshapeArray(arr, width) {
  let result = [];
  for(let i = 0; i < arr.length; i += width) {
      result.push(arr.slice(i, i + width));
  }
  return result;
}