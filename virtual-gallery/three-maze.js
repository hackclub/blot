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
  Vector3,
} from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

// Define the size of the maze
const MAZE_SIZE = 10;
const delta = 0.1;
const player = {
  x: -1,
  y: -1,
  z: 0,
  width: 0.5,
  depth: 0.5,
  height: 0.5,
};

// Create a scene
const scene = new Scene();

const geometry = new BoxGeometry(player.width, player.depth, player.height);
// Change to MeshStandardMaterial
const material = new MeshStandardMaterial({ color: 0xffa500 });
const cube = new Mesh(geometry, material);
cube.position.set(player.x, player.y, player.z);
scene.add(cube);

// Create a camera
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
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
let maze = new Array(MAZE_SIZE)
  .fill(false)
  .map(() => new Array(MAZE_SIZE).fill(false));

// Randomly fill the maze with walls
for (let i = 0; i < MAZE_SIZE; i++) {
  for (let j = 0; j < MAZE_SIZE; j++) {
    if (Math.random() < 0.3) {
      // 30% chance of a wall
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
document.addEventListener(
  "keydown",
  (event) => {
    switch (event.code) {
      case "KeyW":
        player.y += 0.1;
        break;
      case "KeyA":
        player.x -= 0.1;
        break;
      case "KeyS":
        player.y -= 0.1;
        break;
      case "KeyD":
        player.x += 0.1;
        break;
    }
  },
  false
);

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
  if (
    Math.abs(cube1.x - cube2.x) < halfWidth1 + halfWidth2 &&
    Math.abs(cube1.y - cube2.y) < halfHeight1 + halfHeight2 &&
    Math.abs(cube1.z - cube2.z) < halfDepth1 + halfDepth2
  ) {
    return true;
  }

  return false;
}
