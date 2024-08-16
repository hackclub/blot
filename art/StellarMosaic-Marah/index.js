/*
@title: Stellar Mosaic
@author: Marah 
@snapshot: Stellar Mosaic
*/

const rows = 2; // number of rows
const cols = 2; // number of columns
const spacing = 75; // Distance between stars

function drawLine(x1, y1, x2, y2) {
  const linePath = [
    bt.nurbs([
      [x1, y1],
      [x2, y2],
      [x2, y2]
    ])
  ];
  return linePath;
}

function drawComplexStar(cx, cy, spikes, outerRadius, innerRadius, layers) {
  const step = Math.PI / spikes;
  const paths = [];

  for (let l = 0; l < layers; l++) {
    const path = [];
    const radius = outerRadius - l * (outerRadius - innerRadius) / (layers - 1);

    for (let i = 0; i < 2 * spikes; i++) {
      const rad = i % 2 === 0 ? radius : radius * 0.5;
      const x = cx + Math.cos(i * step) * rad;
      const y = cy + Math.sin(i * step) * rad;
      path.push([x, y]);
    }
    path.push(path[0]); // Close

    const starPath = [];
    for (let i = 0; i < path.length - 1; i++) {
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];
      const line = drawLine(x1, y1, x2, y2);
      starPath.push(...line);
    }

    applyTransformations(starPath, l * 10, [0, 0]);
    paths.push(starPath);
  }

  return paths;
}

function applyTransformations(shapePath, rotationAngle, translation) {
  bt.rotate(shapePath, rotationAngle);
  bt.translate(shapePath, translation);
}

function createstuff(rows, cols, spacing) {
  const stars = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = col * spacing;
      const cy = row * spacing;

      // Generate random properties for each star
      const spikes = bt.randIntInRange(5,12); // Random spikes between 5 and 12
      const outerRadius = bt.randIntInRange(20, 50); // Random outer radius between 20 and 50
      const innerRadius = outerRadius * 0.5; // Inner radius is half of the outer radius
      const layers = bt.randIntInRange(2, 4); // Random layers between 2 and 4
      const rotationAngle =bt.randIntInRange(0, 360); // Random rotation angle between 0 and 360 degrees

      const star = drawComplexStar(cx, cy, spikes, outerRadius, innerRadius, layers);
      star.forEach(path => applyTransformations(path, rotationAngle, [0, 0]));
      stars.push(star.flat());
    }
  }

  return stars;
}

const galaxyStars = createstuff(rows, cols, spacing);
galaxyStars.forEach(path => drawLines(path));
