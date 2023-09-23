const t = new Turtle();

function drawLandscape() {
  
  const time = 106;
  const resX = 5.16;
  const resY = 0.52;
  const heightScale = 40.9;
  const noiseScale = 0.3;
  const seaLevel = 16.6;
  const waveScale = noiseScale * 27.55 * Math.sin(time * 0.1);
  const waveHeight = 0.16;
  const distanceFalloff = 4;
  const globalScale = 1;
  const cameraX = 25.34;
  const dx = 1 / (resX * 10);
  const dy = 1 / (resY * 10);
  
  // Initialize an array to track maximum heights
  let maxHeights = Array(Math.floor(10 / dx)).fill(0);

  // Function for computing softmax
  function softmax(x, y) {
    const pow = 3;
    return Math.log(Math.pow(pow, x) + Math.pow(pow, y)) / Math.log(pow);
  }

  // Function for computing softmin
  function softmin(x, y) {
    const pow = 3;
    return -Math.log(Math.pow(pow, -x) + Math.pow(pow, y)) / Math.log(pow);
  }

  // Function to generate height based on noise and waves
  function genHeight(x, y) {
    let height =
      (noise([x * noiseScale + cameraX, Math.pow(y, 1.4) * noiseScale]) *
        heightScale) /
      (y + distanceFalloff);
    height = Math.max(
      height,
      (seaLevel + waveHeight * Math.sin(x * waveScale + Math.cos(y * 25.0))) /
        (y + 4)
    );
    // Apply softmin if needed
    // height *= softmin(y, 1.0);
    return height;
  }

  // Function to move the turtle to a specific position
  function go(x, y) {
    t.goto([x * globalScale, (y - 9) * globalScale]);
  }

  // Function to draw a tree
  function drawTree(x, y, size) {
    size = size * Math.random() + size / 2;
    t.down();
    go(x, y);
    go(x, y + size);
    t.up();
    go(x, y);
    t.down();
  }

  // Loop through the landscape and generate terrain
  for (let y = 0; y < +15; y += dy) {
    for (let x = 0; x < 10; x += dx) {
      let height = (4 * genHeight(x, y)) / 6.56;
      if (x > 0) {
        t.down();
      } else {
        t.up();
      }
      if (height + y / 2 >= maxHeights[Math.floor(x / dx)]) {
        // Add trees with a lower probability
        if (Math.random() > +0.72 && height * (y + distanceFalloff) > +12.53) {
          drawTree(x, height + y / 2, 0.96 / (y + 5.9));
        }
        go(x, y / 2 + height);
        maxHeights[Math.floor(x / dx)] = height + y / 2;
      } else {
        t.up();
        go(x, y / 2 + height);
      }
    }
    t.up();
    go(0, 0);
  }
}

// Initialize the turtle and draw the landscape
drawTurtles(t);
drawLandscape();
