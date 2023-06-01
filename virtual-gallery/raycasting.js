
export function raycastMap(state, el) {

  const getMap = () => reshapeArray(state.mazeData, state.width);
  const getPlayer = () => {

    const angle = {
      "north": 270,
      "east": 180,
      "south": 90,
      "west": 0,
    }[state.orientation];

    return {
      x: 3.5*CELL_SIZE,
      y: 3.5*CELL_SIZE,
      angle: toRadians(angle),
      speed: 0,
    }
  }

  const bb = el.getBoundingClientRect();

  const SCREEN_WIDTH = bb.width;
  const SCREEN_HEIGHT = bb.height;
  const TICK = 30;
  const CELL_SIZE = 16;
  const FOV = toRadians(90);

  const COLORS = {
    floor: "#d52b1e", // "#ff6361"
    ceiling: "#ffffff", // "#012975",
    wall: "#013aa6", // "#58508d"
    wallDark: "#012975", // "#003f5c"
    rays: "#ffa600",
  };

  const canvas = el;
  canvas.setAttribute("width", SCREEN_WIDTH);
  canvas.setAttribute("height", SCREEN_HEIGHT);

  const context = canvas.getContext("2d");

  function clearScreen() {
    context.fillStyle = "red";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  }

  function renderMinimap(posX = 0, posY = 0, scale, rays) {
    const map = getMap();
    const player = getPlayer();

    const cellSize = scale * CELL_SIZE;
    map.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          context.fillStyle = "grey";
          context.fillRect(
            posX + x * cellSize,
            posY + y * cellSize,
            cellSize,
            cellSize
          );
        }
      });
    });
    context.fillStyle = "blue";
    context.fillRect(
      posX + player.x * scale - 10 / 2,
      posY + player.y * scale - 10 / 2,
      10,
      10
    );

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

  function renderScene(rays) {
    const player = getPlayer();

    rays.forEach((ray, i) => {
      const distance = fixFishEye(ray.distance, ray.angle, player.angle);
      const wallHeight = ((CELL_SIZE * 5) / distance) * 277;
      context.fillStyle = ray.vertical ? COLORS.wallDark : COLORS.wall;
      context.fillRect(i, SCREEN_HEIGHT / 2 - wallHeight / 2, 1, wallHeight);
      context.fillStyle = COLORS.floor;
      context.fillRect(
        i,
        SCREEN_HEIGHT / 2 + wallHeight / 2,
        1,
        SCREEN_HEIGHT / 2 - wallHeight / 2
      );
      context.fillStyle = COLORS.ceiling;
      context.fillRect(i, 0, 1, SCREEN_HEIGHT / 2 - wallHeight / 2);
    });
  }

  function reshapeArray(arr, width) {
    let result = [];
    for(let i = 0; i < arr.length; i += width) {
        result.push(arr.slice(i, i + width));
    }
    return result;
  }

  function gameLoop() {
    clearScreen();
    const rays = getRays();
    renderScene(rays);
    renderMinimap(0, 0, 0.75, rays);
  }

  setInterval(gameLoop, TICK);

}
