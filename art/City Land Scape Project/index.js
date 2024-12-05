/*
@title: City Landscape
@author: Knivier
@snapshot: https://cloud-g39asdjoy-hack-club-bot.vercel.app/0image.png
*/
const width = 400;
const height = 300;
setDocDimensions(width, height);
const drawGenerativeCityscape = () => {
  const seed = bt.randIntInRange(1, 100);
  
  const buildings = [];
  const buildingWidths = [
    bt.randIntInRange(35, 45),   // First building
    bt.randIntInRange(55, 65),   // Second building
    bt.randIntInRange(75, 85),   // Third building
    bt.randIntInRange(45, 55)    // Fourth building
  ];
  const buildingHeights = [
    bt.randIntInRange(140, 160), // First building height
    bt.randIntInRange(170, 190), // Second building height
    bt.randIntInRange(110, 130), // Third building height
    bt.randIntInRange(150, 170)  // Fourth building height
  ];
  const buildingXPositions = [
    50 + bt.randIntInRange(-10, 10),   // First x position
    120 + bt.randIntInRange(-10, 10),  // Second x position
    210 + bt.randIntInRange(-10, 10),  // Third x position
    300 + bt.randIntInRange(-10, 10)   // Fourth x position
  ];
  
  for (let i = 0; i < buildingWidths.length; i++) {
    const width = buildingWidths[i];
    const height = buildingHeights[i];
    const xPos = buildingXPositions[i];
    
    buildings.push([
      [xPos, 0],
      [xPos, height],
      [xPos + width, height],
      [xPos + width, 0],
      [xPos, 0]
    ]);
    
    const windowSize = bt.randIntInRange(8, 12);
    const windowSpacingX = bt.randIntInRange(15, 25);
    const windowSpacingY = bt.randIntInRange(15, 25);
    
    for (let y = windowSpacingY; y < height - windowSize; y += windowSpacingY) {
      for (let x = xPos + windowSpacingX; x < xPos + width - windowSize; x += windowSpacingX) {
        if (bt.randIntInRange(0, 10) > 3) {
          buildings.push([
            [x, y],
            [x + windowSize, y],
            [x + windowSize, y + windowSize],
            [x, y + windowSize],
            [x, y]
          ]);
        }
      }
    }
  }
  
  const stars = [];
  const starPositions = [
    [100 + bt.randIntInRange(-10, 10), 250 + bt.randIntInRange(-10, 10)], 
    [150 + bt.randIntInRange(-10, 10), 230 + bt.randIntInRange(-10, 10)],
    [300 + bt.randIntInRange(-10, 10), 270 + bt.randIntInRange(-10, 10)],
    [350 + bt.randIntInRange(-10, 10), 220 + bt.randIntInRange(-10, 10)],
    [10 + bt.randIntInRange(-10, 10), 280 + bt.randIntInRange(-10, 10)]
  ];
  
  const starRadius = bt.randIntInRange(2, 4);
  for (let i = 0; i < starPositions.length; i++) {
    stars.push([
      [starPositions[i][0], starPositions[i][1]],
      [starPositions[i][0] + starRadius, starPositions[i][1] + starRadius],
      [starPositions[i][0] - starRadius, starPositions[i][1] + starRadius],
      [starPositions[i][0] - starRadius, starPositions[i][1] - starRadius],
      [starPositions[i][0] + starRadius, starPositions[i][1] - starRadius],
      [starPositions[i][0] + starRadius, starPositions[i][1] + starRadius]
    ]);
  }
  
  const riverCurve = bt.catmullRom([
    [0, 50 + bt.randIntInRange(-10, 10)],
    [100, 70 + bt.randIntInRange(-10, 10)],
    [200, 100 + bt.randIntInRange(-10, 10)],
    [300, 80 + bt.randIntInRange(-10, 10)],
    [width, 50 + bt.randIntInRange(-10, 10)]
  ]);
  
  const birds = [];
  const birdPaths = [
    [
      [100 + bt.randIntInRange(-10, 10), 200 + bt.randIntInRange(-10, 10)], 
      [110 + bt.randIntInRange(-10, 10), 210 + bt.randIntInRange(-10, 10)], 
      [120 + bt.randIntInRange(-10, 10), 205 + bt.randIntInRange(-10, 10)], 
      [130 + bt.randIntInRange(-10, 10), 210 + bt.randIntInRange(-10, 10)]
    ], 
    [
      [300 + bt.randIntInRange(-10, 10), 250 + bt.randIntInRange(-10, 10)], 
      [290 + bt.randIntInRange(-10, 10), 240 + bt.randIntInRange(-10, 10)], 
      [280 + bt.randIntInRange(-10, 10), 250 + bt.randIntInRange(-10, 10)], 
      [270 + bt.randIntInRange(-10, 10), 245 + bt.randIntInRange(-10, 10)]
    ],
  ];
  
  birdPaths.forEach(path => {
    const bird = new bt.Turtle();
    const birdLines = [];
    
    bird.jump(path[0]);
    path.slice(1).forEach(p => {
      bird.jump(p);
      birdLines.push(...bird.lines());
    });
    
    birds.push(birdLines);
  });
    const mountains = [];
  const mountainRanges = [
    [
      [0, 100],
      [30, 180 + bt.randIntInRange(-20, 20)],
      [60, 100]
    ],
    [
      [50, 100],
      [90, 190 + bt.randIntInRange(-20, 20)],
      [130, 100]
    ],
    [
      [130, 100],
      [170, 180 + bt.randIntInRange(-20, 20)],
      [210, 100]
    ],
    [
      [200, 100],
      [240, 190 + bt.randIntInRange(-20, 20)],
      [280, 100]
    ]
  ];
  
  mountainRanges.forEach(range => {
    mountains.push([
      range[0], range[1], range[2], range[0] 
    ]);
  });
  

  const allElements = [...mountains, ...buildings, ...stars, ...birds, riverCurve];

  drawLines(allElements);
};


drawGenerativeCityscape();