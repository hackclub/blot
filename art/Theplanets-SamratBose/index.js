/*
@title: Theplanets
@author: Samrat Bose
@snapshot: Planetary Blots
*/
setDocDimensions(400, 400);

drawLines([[[200, 200], [200, 200]]]);

function planet(radius, x, y) {
  const lines = [];
  for (let i = 0; i < 360; i += 5) {
    const angle = i * Math.PI / 180;
    lines.push([
      [x + radius * Math.cos(angle), y + radius * Math.sin(angle)],
      [x + radius * 0.8 * Math.cos(angle + Math.PI / 2), y + radius * 0.8 * Math.sin(angle + Math.PI / 2)],
    ]);
  }
  return lines;
}

function stars(numStars, minRadius, maxRadius) {
  const lines = [];
  for (let i = 0; i < numStars; i++) {
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;
    const x = Math.random() * 400;
    const y = Math.random() * 400;
    lines.push([[x, y], [x, y]]); 
  }
  return lines;
}

const mercury = planet(10, 50, 50);
const venus = planet(20, 100, 100);
const earth = planet(30, 150, 30);
const mars = planet(25, 250, 150);
const jupiter = planet(70, 300, 200);
const saturn = planet(60, 100, 300);
const uranus = planet(50, 200, 350);
const neptune = planet(40, 300, 380);

const numStars = 50;
const minStarRadius = 1;
const maxStarRadius = 3;
const starBackground = stars(numStars, minStarRadius, maxStarRadius);

drawLines([...mercury, ...venus, ...earth, ...mars, ...jupiter, ...saturn, ...uranus, ...neptune, ...starBackground]);