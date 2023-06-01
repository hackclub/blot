// Import the necessary Three.js classes
import { 
  Scene, 
  PerspectiveCamera, 
  WebGLRenderer, 
  BoxGeometry, 
  MeshBasicMaterial, 
  PointLight, 
  MeshStandardMaterial,
  Mesh,
  Vector3
} from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';


// Define the size of the maze
const MAZE_SIZE = 10;
const delta = 0.1;
const player = {
  x: -1,
  y: -1,
  z: 0,
  width: 0.5,
  depth: 0.5,
  height: 0.5
};



// Create a scene
const scene = new Scene();

const geometry = new BoxGeometry(player.width, player.depth, player.height);
// Change to MeshStandardMaterial
const material = new MeshStandardMaterial({ color: 0xFFA500 });
const cube = new Mesh(geometry, material);
cube.position.set(player.x, player.y, player.z);
scene.add(cube);

// Create a camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(player.x, player.y, MAZE_SIZE);

// Create a light
const light = new PointLight(0xffffff, 1, 0);
light.position.set(MAZE_SIZE / 2, MAZE_SIZE / 2, MAZE_SIZE / 2);
scene.add(light);

// Create a WebGL renderer
const renderer = new WebGLRenderer();
const renderTarget = document.querySelector(".render-target");
const bb = renderTarget.getBoundingClientRect();
renderer.setSize(bb.width, bb.height);
renderTarget.appendChild(renderer.domElement);


// Create a 2D array to represent the maze
let maze = new Array(MAZE_SIZE).fill(false).map(() => new Array(MAZE_SIZE).fill(false));

// Randomly fill the maze with walls
for (let i = 0; i < MAZE_SIZE; i++) {
  for (let j = 0; j < MAZE_SIZE; j++) {
    if (Math.random() < 0.3) { // 30% chance of a wall
      maze[i][j] = true;
    }
  }
}

// Create a cube for each wall
for (let i = 0; i < MAZE_SIZE; i++) {
  for (let j = 0; j < MAZE_SIZE; j++) {
    if (maze[i][j]) {
      const geometry = new BoxGeometry(1, 1, 1);
      // Change to MeshStandardMaterial
      const material = new MeshStandardMaterial({ color: 0x00ff00 });
      const cube = new Mesh(geometry, material);
      cube.position.set(i, j, 0);
      scene.add(cube);
    }
  }
}

// Listen for keydown event
document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      player.y += .1;
      break;
    case 'KeyA':
      player.x -= .1;
      break;
    case 'KeyS':
      player.y -= .1;
      break;
    case 'KeyD':
      player.x += .1;
      break;
  }
}, false);

window.addEventListener("resize", onWindowResize());
    

function onWindowResize() {
  const bb = renderTarget.getBoundingClientRect();

  camera.aspect = bb.width / bb.height;
  camera.updateProjectionMatrix();
  renderer.setSize(bb.width, bb.height);
}

// Update camera and controls each frame
function animate() {

  requestAnimationFrame(animate);

  // Move the camera
  // controls.moveRight(-velocity.x * delta);
  // controls.moveForward(-velocity.z * delta);

  // controls.update();
  cube.position.set(player.x, player.y, player.z);
  camera.position.set(player.x, player.y, MAZE_SIZE);

  renderer.render(scene, camera);
}

animate();

function cubesIntersect(cube1, cube2) {
    // Calculate the half widths, depths, and heights
    const halfWidth1 = cube1.width / 2;
    const halfDepth1 = cube1.depth / 2;
    const halfHeight1 = cube1.height / 2;

    const halfWidth2 = cube2.width / 2;
    const halfDepth2 = cube2.depth / 2;
    const halfHeight2 = cube2.height / 2;

    // Check for intersection
    if (Math.abs(cube1.x - cube2.x) < (halfWidth1 + halfWidth2) &&
        Math.abs(cube1.y - cube2.y) < (halfHeight1 + halfHeight2) &&
        Math.abs(cube1.z - cube2.z) < (halfDepth1 + halfDepth2)) {
        return true;
    }

    return false;
}




const maze2D = document.querySelector(".maze-2d");
const ctx = maze2D.getContext("2d");

const w = maze2D.width;
const h = maze2D.width;

const width = 7;
const height = 7;

const mazeData = new Array(width*height)
  .fill(0)
  .map(cell => {
    return Math.random() < .6 ? 1 : 0;
  });

const halfWidth = (width-1)/2;
const i = get1DIndex(width, halfWidth, halfWidth);
mazeData[i] = 0;

let orientation = "north";

const xWidth = w/width;
const yWidth = h/height;

drawMaze(mazeData);

function drawMaze(maze) {
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
  const angle = {
    "north": 0,
    "east": 270,
    "south": 180,
    "west": 90,
  }[orientation];
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

function randomVector(length, prob = 0.5) {
  return new Array(length)
    .fill(0)
    .map(cell => {
      return Math.random() < prob ? 1 : 0;
    });
}

window.addEventListener("keydown", e => {
  const halfWidth = (width-1)/2;
  switch (event.code) {
    case 'KeyI':
      {
        const i = get1DIndex(width, halfWidth, halfWidth-1);
        const fill = mazeData[i];
        if (fill === 1) return;
        insertRow(mazeData, width, 0, randomVector(width));
        removeRow(mazeData, width, width);
      }
      break;
    case 'KeyJ':
      {
        const i = get1DIndex(width, halfWidth-1, halfWidth);
        const fill = mazeData[i];
        if (fill === 1) return;
        insertColumn(mazeData, height, 0, randomVector(height));
        removeColumn(mazeData, width+1, width);
      }
      break;
    case 'KeyK':
      {
        const i = get1DIndex(width, halfWidth, halfWidth+1);
        const fill = mazeData[i];
        if (fill === 1) return;
        insertRow(mazeData, width, width, randomVector(width));
        removeRow(mazeData, width, 0);
      }
      break;
    case 'KeyL':
      {
        const i = get1DIndex(width, halfWidth+1, halfWidth);
        const fill = mazeData[i];
        if (fill === 1) return;
        insertColumn(mazeData, width, width, randomVector(width));
        removeColumn(mazeData, width+1, 0);
      }
      break;
    case 'KeyW':
      {
        orientation = "north";
      }
      break;
    case 'KeyA':
      {
        orientation = "east";
      }
      break;
    case 'KeyS':
      {
        orientation = "south";
      }
      break;
    case 'KeyD':
      {
        orientation = "west";
      }
      break;
  }

  drawMaze(mazeData);
})

function get1DIndex(width, x, y) {
  return y * width + x;
}















