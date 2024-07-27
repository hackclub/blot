export function createPoissonDisc(radius, width, height, samplesPerIteration = 30) {
  const k = samplesPerIteration; // Number of attempts before rejection
  const cellSize = radius / Math.sqrt(2);
  const gridWidth = Math.ceil(width / cellSize);
  const gridHeight = Math.ceil(height / cellSize);
  const grid = new Array(gridWidth * gridHeight).fill(null);
  const activeList = [];
  const result = [];

  // Helper function to get the grid index
  function gridIndex(x, y) {
    return Math.floor(x / cellSize) + Math.floor(y / cellSize) * gridWidth;
  }

  // Add a sample
  function addSample(x, y) {
    const sample = [x, y];
    activeList.push(sample);
    result.push(sample);
    grid[gridIndex(x, y)] = sample;
  }

  // Start with a random point in the domain
  addSample(Math.random() * width, Math.random() * height);

  while (activeList.length) {
    const i = Math.floor(Math.random() * activeList.length);
    const sample = activeList[i];
    let found = false;

    for (let s = 0; s < k; ++s) {
      const angle = Math.random() * 2 * Math.PI;
      const r = Math.random() * radius + radius;
      const x = sample[0] + r * Math.cos(angle);
      const y = sample[1] + r * Math.sin(angle);

      if (0 <= x && x < width && 0 <= y && y < height) {
        const gi = gridIndex(x, y);
        let tooClose = false;

        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const ii = gi + dx + dy * gridWidth;
            if (ii >= 0 && ii < grid.length && grid[ii]) {
              const [nx, ny] = grid[ii];
              if (Math.sqrt((nx - x) ** 2 + (ny - y) ** 2) < radius) {
                tooClose = true;
                break;
              }
            }
          }
          if (tooClose) break;
        }

        if (!tooClose) {
          addSample(x, y);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      activeList.splice(i, 1); // Remove from active list if no valid samples found
    }
  }

  return result;
}