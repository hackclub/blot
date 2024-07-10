/*
@title: Distorted Earth
@author: Tony Pu
@snapshot: Earth1.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

// Function to create a continent shape
function createContinent(centerX, centerY, size, roughness) {
  const polyline = [];
  const numPoints = 12; 

  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * (2 * Math.PI);
    const radius = size * (1 + roughness * (Math.random() - 0.5));
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    polyline.push([x, y]);
  }

  return polyline;
}

// Function to create ocean waves
function createOcean(centerX, centerY, size) {
  const polyline = [];
  const numPoints = 25; // Increase the number of points for more detail

  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * (2 * Math.PI);
    const radius = size * (1 + 0.1 * Math.sin(5 * angle));
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    polyline.push([x, y]);
  }

  return polyline;
}

// Function to create stars
function createStar(x, y, size) {
  return [
    [x - size, y - size],
    [x + size, y - size],
    [x + size, y + size],
    [x - size, y + size],
    [x - size, y - size]
  ];
}

// Create multiple stars
const stars = [];
for (let i = 0; i < 20; i++) {
  const starX = Math.random() * width;
  const starY = Math.random() * height;
  const starSize = 0.5 + Math.random() * 0.5;
  stars.push(createStar(starX, starY, starSize));
}

const centerX = width / 2;
const centerY = height / 2;
const continentSize = 20;
const oceanSize = 45;

const continents = [
  createContinent(centerX - 20, centerY - 20, continentSize, 0.2),
  createContinent(centerX + 30, centerY - 10, continentSize, 0.3),
  createContinent(centerX - 15, centerY + 25, continentSize, 0.4)
];

const oceans = [
  createOcean(centerX, centerY, oceanSize),
  createOcean(centerX + 25, centerY + 25, oceanSize * 0.7)
];

const bg = [
  [0, 0],
  [0, height],
  [width, height],
  [width, 0],
  [0, 0]
];

// Draw background (space)
drawLines([bg], { fill: "black" });

// Draw stars
drawLines(stars, { fill: "white" });

// Draw oceans
drawLines(oceans, { fill: "blue" });

// Draw continents
drawLines(continents, { fill: "green" });