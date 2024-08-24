/*
@title: Colorful heart
@author: MohammedMMc
@snapshot: 1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

/**
 * Get a random HEX color
 * @returns {String}
 */
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[bt.randIntInRange(0, letters.length)];
  }
  return color;
}

/**
 * Creates a heart and returns the heart lines
 * @returns {Number[][]}
 */
function createHeart(cx, cy, size, depth) {
  const heart = [];
  const step = Math.PI / 180;

  for (let angle = 0; angle < Math.PI * 2; angle += step) {
    const x = cx + size * 16 * Math.sin(angle) ** 3;
    const y = cy + size * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
    heart.push([x, y + depth]);
  }

  return heart;
}

// Draw the hearts
for (let i = 0; i < 12; i++) { // Hearts count is set to 12
  const size = 0.8 - (i * 0.05); // makes the size smaller by i * 5%
  const heart = createHeart(width / 2, (height / 2 + 0.05 * height) - i * 2, size * 4.5, i * 2);
  drawLines([heart], { fill: getRandomColor() });
}
