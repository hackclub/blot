/*
@title: Sunburst
@author: Zany Daramola
@snapshot: sunburst1.png
*/
// Doing a sun drawing ;D

const width = 200;
const height = 200;

setDocDimensions(width, height);

const finalLines = [];

// Draw the Sun Circle (center)
const sunRadius = 40;
const centerX = 100;
const centerY = 100;

// Function to draw a circle using line segments
function drawCircle(x, y, radius, numSegments) {
  for (let i = 0; i < numSegments; i++) {
    const angle1 = (i / numSegments) * Math.PI * 2;
    const angle2 = ((i + 1) / numSegments) * Math.PI * 2;

    const x1 = x + Math.cos(angle1) * radius;
    const y1 = y + Math.sin(angle1) * radius;
    const x2 = x + Math.cos(angle2) * radius;
    const y2 = y + Math.sin(angle2) * radius;

    finalLines.push([[x1, y1], [x2, y2]]);
  }
}

// Draw the sun circle with a random number of segments (between 20 and 40 )
const numSegments = Math.floor(Math.random() * 20) + 20;
drawCircle(centerX, centerY, sunRadius, numSegments);

// Draw Sun Rays with random length and number of rays
const numRays = Math.floor(Math.random() * 10) + 8; // Random rays between 8 and 18 (or whatever you like)
const minRayLength = 30; 
const maxRayLength = 60; 

for (let i = 0; i < numRays; i++) {
  const angle = (i / numRays) * Math.PI * 2; // Convert to radians
  const x1 = centerX + Math.cos(angle) * sunRadius; // Start point at edge of the circle
  const y1 = centerY + Math.sin(angle) * sunRadius; // Start point at edge of the circle
  const rayLength = Math.random() * (maxRayLength - minRayLength) + minRayLength; // Random ray length
  const x2 = centerX + Math.cos(angle) * (sunRadius + rayLength); // End point for the ray
  const y2 = centerY + Math.sin(angle) * (sunRadius + rayLength); // End point for the ray

  finalLines.push([[x1, y1], [x2, y2]]);
}

// All finished 🎉
drawLines(finalLines);
