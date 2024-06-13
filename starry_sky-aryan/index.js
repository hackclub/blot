/*
@title: Starry Sky
@author: Aryan Yadav
@snapshot: image.png
*/

// Set the document dimensions
setDocDimensions(125, 125);

// Function to create a black rectangle
function createBlackRectangle() {
  const rectanglePolyline = [
    [0, 0],
    [125, 0],
    [125, 125],
    [0, 125],
    [0, 0]
  ];
  drawLines([rectanglePolyline], { stroke: 'black', fill: 'black', width: 125 });
}

// Draw the black rectangle
createBlackRectangle();

// Function to create art
function createArt(seed) {
  // Parameters for variations
  const numStars = 250;
  const linesPerStar = 12;
  const maxStarSize = 1;
  bt.setRandSeed(seed);

  const centerX = 62.5;
  const centerY = 62.5;

  let allPolylines = [];

  // Generate stars
  for (let i = 0; i < numStars; i++) {
    let starPolylines = [];
    const starX = bt.randInRange(0, 125);
    const starY = bt.randInRange(0, 125);
    const starSize = bt.randInRange(0.1, maxStarSize);

    // Draw radiating lines for each star
    for (let j = 0; j < linesPerStar; j++) {
      const angle = (360 / linesPerStar) * j;
      starPolylines.push([
        [starX, starY],
        [starX + starSize * Math.cos((Math.PI / 180) * angle), starY + starSize * Math.sin((Math.PI / 180) * angle)]
      ]);
    }

    allPolylines = allPolylines.concat(starPolylines);
  }

  // Draw the generated path with white stars on a black background
  drawLines(allPolylines, { stroke: 'white', width: 0.5 });
}

// Generate multiple versions
createArt(125); // Snapshot 1