/*
@title: Rubik's Cube 
@author: Aryan Yadav
@snapshot: snapshot1.png
*/

const front_scale = 1.07
const right_shift = 3
const right_rot = -75

// Set the document dimensions
setDocDimensions(125, 125);

// Function to shuffle an array randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to project 3D coordinates onto a 2D plane
function project3D(x, y, z) {
  const scale = 100 / (z + 300); // Adjusting the perspective
  return [62.5 + x * scale, 62.5 - y * scale];
}

// Function to rotate a point in 3D space
function rotate3D(x, y, z, angleX, angleY, angleZ) {
  // Rotation around X-axis
  let rad = angleX * Math.PI / 180;
  let cosa = Math.cos(rad);
  let sina = Math.sin(rad);
  let y1 = y * cosa - z * sina;
  let z1 = y * sina + z * cosa;

  // Rotation around Y-axis
  rad = angleY * Math.PI / 180;
  cosa = Math.cos(rad);
  sina = Math.sin(rad);
  let x1 = x * cosa + z1 * sina;
  z1 = -x * sina + z1 * cosa;

  // Rotation around Z-axis
  rad = angleZ * Math.PI / 180;
  cosa = Math.cos(rad);
  sina = Math.sin(rad);
  x = x1 * cosa - y1 * sina;
  y = x1 * sina + y1 * cosa;
  z = z1;

  return [x, y, z];
}

// Function to translate a point in 3D space
function translate3D(x, y, z, tx, ty, tz) {
  return [x + tx, y + ty, z + tz];
}

// Function to create a Rubik's cube
function createRubiksCube() {
  const cubeSize = 20; // Size of each mini cube
  const translationFactor = 0.575;
  const colors = shuffleArray(['red', 'green', 'blue', 'yellow', 'orange', 'white']);

  let faces = {
    front: [],
    right: [],
    top: []
  };

  // Define the front face of the Rubik's cube
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      faces.front.push({ x: (col - 1) * cubeSize, y: (1 - row) * cubeSize, z: 0, color: colors[Math.floor(Math.random() * colors.length)] });
    }
  }

  // Copy front face to right and top faces and randomize colors
  faces.right = faces.front.map(cell => ({
    ...cell,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));
  faces.top = faces.front.map(cell => ({
    ...cell,
    color: colors[Math.floor(Math.random() * colors.length)]
  }));

  let allPolylines = [];

  // Project and rotate the front face
  faces.front.forEach(cell => {
    const [x1, y1, z1] = rotate3D(cell.x - cubeSize / 2, cell.y - cubeSize / 2, cell.z, 0, 0, 0);
    const [x2, y2, z2] = rotate3D(cell.x + cubeSize / 2, cell.y - cubeSize / 2, cell.z, 0, 0, 0);
    const [x3, y3, z3] = rotate3D(cell.x + cubeSize / 2, cell.y + cubeSize / 2, cell.z, 0, 0, 0);
    const [x4, y4, z4] = rotate3D(cell.x - cubeSize / 2, cell.y + cubeSize / 2, cell.z, 0, 0, 0);
    const polyline = [
      project3D(x1*front_scale, y1*front_scale, z1*front_scale),
      project3D(x2*front_scale, y2*front_scale, z2*front_scale),
      project3D(x3*front_scale, y3*front_scale, z3*front_scale),
      project3D(x4*front_scale, y4*front_scale, z4*front_scale),
      project3D(x1*front_scale, y1*front_scale, z1*front_scale)
    ];
    allPolylines.push({ points: polyline, color: cell.color });
  });

  // Translate and rotate the right face
  faces.right.forEach(cell => {
    const [x, y, z] = translate3D(cell.x, cell.y, cell.z, cubeSize * translationFactor, 0, 0);
    const [x1, y1, z1] = rotate3D(x - cubeSize / 2, y - cubeSize / 2, z, 0, right_rot, 0);
    const [x2, y2, z2] = rotate3D(x + cubeSize / 2, y - cubeSize / 2, z, 0, right_rot, 0);
    const [x3, y3, z3] = rotate3D(x + cubeSize / 2, y + cubeSize / 2, z, 0, right_rot, 0);
    const [x4, y4, z4] = rotate3D(x - cubeSize / 2, y + cubeSize / 2, z, 0, right_rot, 0);

    const polyline = [
      project3D(x1+right_shift, y1, z1),
      project3D(x2+right_shift, y2, z2),
      project3D(x3+right_shift, y3, z3),
      project3D(x4+right_shift, y4, z4),
      project3D(x1+right_shift, y1, z1)
    ];

    // Move the right face towards the side
    const translatedPolyline = polyline.map(([px, py]) => [px + cubeSize * translationFactor+0, py]);

    allPolylines.push({ points: translatedPolyline, color: cell.color });
  });

  // Draw the generated path
  allPolylines.forEach(polyline => {
    drawLines([polyline.points], { stroke: 'black', fill: polyline.color, width: 8 });
  });
}

// Generate the Rubik's cube
createRubiksCube();