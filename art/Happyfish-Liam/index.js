/*
@title: Happy Fish
@author: Liam Boelke
@snapshot: underwater_picture
*/
const width = 125;
const height = 125;
setDocDimensions(width, height);

function flip(lines) {
  return lines.map(line => {
    if (Array.isArray(line[0])) {
      return line.map(point => [-point[0], point[1]]);
    } else {
      return [-line[0], line[1]];
    }
  });
}

// Fish generation function
function generateFish() {
  const fishScale = bt.randIntInRange(1, 100)/300 + 1 // Fish size variation
  const tailLength = bt.randIntInRange(1, 100)/16.66666667 - 3 // Tail length variation
  const fishStretch = 2
  const e = 1.5 // Eye location
  const f = bt.randIntInRange(1, 100)/40 - 1 // Fin size variation
  
  // Create fish body and features
  const fishBody = [
    // Main body curve - top
    bt.nurbs([
      [0, 0],
      [fishScale * 0.5, fishStretch * 1.2],
      [fishScale * 3, fishStretch * 0.9],
      [fishScale * 5, 0]
    ]),
    // Main body curve - bottom
    bt.nurbs([
      [0, 0],
      [fishScale * 1, fishStretch * -0.8],
      [fishScale * 3, fishStretch * -0.7],
      [fishScale * 5, 0]
    ]),
    // Tail fin
    bt.nurbs([
      [fishScale * 5, 0],
      [fishScale * 6, fishStretch * 1.5],
      [fishScale * 7, 0],
      [fishScale * 6, fishStretch * -1.5],
      [fishScale * 5, 0]
    ]),
    // Top fin
    bt.nurbs([
      [fishScale * 2, fishStretch * 0.9],
      [fishScale * 2.5, fishStretch * 2 + f],
      [fishScale * 3.5, fishStretch * 0.9]
    ]),
    // Bottom fin
    bt.nurbs([
      [fishScale * 2.5, fishStretch * -0.7],
      [fishScale * 3, fishStretch * -1.8 - f],
      [fishScale * 3.5, fishStretch * -0.7]
    ]),
    // Side fin
    bt.nurbs([
      [fishScale * 1.5, fishStretch * -0.4],
      [fishScale * 0, fishStretch * -1.2 - f/2],
      [fishScale * 1.2, fishStretch * -0.5]
    ]),
    // Eye
    [
      [e, 0.3],
      [e + 0.4, 0.2],
      [e + 0.1, 0.1],
      [e, 0.3]
    ],
    // Mouth
    bt.nurbs([
      [0.5, -0.1],
      [0.2, 0],
      [0.5, 0.1]
    ]),
    // Gills (simple curved line)
    bt.nurbs([
      [1.2, 0.5],
      [1.1, 0],
      [1.2, -0.5]
    ])
  ];
  
  // Add some decorative dots/scales for certain fish
  if (bt.randIntInRange(1, 3) > 1) {
    for (let i = 0; i < bt.randIntInRange(3, 7); i++) {
      fishBody.push([
        [fishScale * (1.5 + i*0.5), fishStretch * (bt.randIntInRange(-5, 5)/10)],
        [fishScale * (1.5 + i*0.5 + 0.1), fishStretch * (bt.randIntInRange(-5, 5)/10 + 0.1)]
      ]);
    }
  }
  
  const randomDirection = bt.randIntInRange(1, 2);
  if (randomDirection == 1) {
    return [flip(fishBody), randomDirection, fishScale, tailLength, fishStretch, e, f];
  }
  return [fishBody, randomDirection, Math.floor((fishScale-1)*300), Math.floor((tailLength+3)*16.66666667), Math.floor((f+1)*40)];
}

// Bubble generation function
function generateBubbles() {
  const bubbleCount = bt.randIntInRange(5, 15);
  const bubbles = [];
  
  for (let i = 0; i < bubbleCount; i++) {
    const bubbleSize = bt.randIntInRange(1, 5) / 2;
    const x = bt.randIntInRange(10, width - 10);
    const y = bt.randIntInRange(10, height - 10);
    
    // Create bubble circle
    const bubble = [];
    const circlePoints = 16; // Fewer points for smaller bubbles
    for (let j = 0; j <= circlePoints; j++) {
      const angle = (2 * Math.PI / circlePoints) * j;
      const bx = x + bubbleSize * Math.cos(angle);
      const by = y + bubbleSize * Math.sin(angle);
      bubble.push([bx, by]);
    }
    bubbles.push(bubble);
    
    // Add a small highlight to each bubble (small arc)
    const highlight = [];
    for (let j = 0; j <= 5; j++) {
      const angle = (Math.PI / 4) + (Math.PI / 4 / 5) * j;
      const hx = x + bubbleSize * 0.7 * Math.cos(angle);
      const hy = y + bubbleSize * 0.7 * Math.sin(angle);
      highlight.push([hx, hy]);
    }
    bubbles.push(highlight);
  }
  
  return bubbles;
}

// Seaweed generation function
function generateSeaweed() {
  const seaweedCount = bt.randIntInRange(3, 7);
  const seaweed = [];
  
  for (let i = 0; i < seaweedCount; i++) {
    const x = bt.randIntInRange(10, width - 10);
    const seaweedHeight = bt.randIntInRange(20, 40);
    const waviness = bt.randIntInRange(3, 8);
    
    // Create wavy seaweed
    const points = [];
    for (let j = 0; j <= seaweedHeight; j += 2) {
      const waveOffset = Math.sin(j * 0.2) * waviness;
      points.push([x + waveOffset, height - j]);
    }
    seaweed.push(bt.nurbs(points));
    
    // Add some side leaves to some seaweed
    if (bt.randIntInRange(1, 3) > 1) {
      const leaveCount = bt.randIntInRange(2, 4);
      for (let j = 0; j < leaveCount; j++) {
        const leafY = bt.randIntInRange(5, seaweedHeight - 5);
        const leafDir = bt.randIntInRange(0, 1) === 0 ? -1 : 1;
        const leafLength = bt.randIntInRange(3, 8);
        const waveOffset = Math.sin(leafY * 0.2) * waviness;
        
        const leaf = bt.nurbs([
          [x + waveOffset, height - leafY],
          [x + waveOffset + (leafLength * leafDir), height - leafY - 2],
          [x + waveOffset + (leafLength * leafDir * 0.8), height - leafY - 4],
          [x + waveOffset, height - leafY - 3]
        ]);
        seaweed.push(leaf);
      }
    }
  }
  
  return seaweed;
}

// Generate coral pieces
function generateCoral() {
  const coralCount = bt.randIntInRange(2, 5);
  const coral = [];
  
  for (let i = 0; i < coralCount; i++) {
    const x = bt.randIntInRange(10, width - 10);
    const coralHeight = bt.randIntInRange(10, 20);
    const branchCount = bt.randIntInRange(3, 6);
    
    // Create coral branches
    for (let j = 0; j < branchCount; j++) {
      const branchX = x + bt.randIntInRange(-8, 8);
      const branchHeight = bt.randIntInRange(coralHeight - 5, coralHeight + 5);
      
      // Each branch is a simple curved line
      coral.push(bt.nurbs([
        [branchX, height],
        [branchX + bt.randIntInRange(-3, 3), height - branchHeight/2],
        [branchX + bt.randIntInRange(-5, 5), height - branchHeight]
      ]));
    }
  }
  
  return coral;
}

// Add shading to give depth effect
function addShading(lines, opacity) {
  const shadedLines = [];
  for (let i = 0; i < lines.length; i++) {
    shadedLines.push(lines[i]);
    
    // Add shadow lines for some elements to create depth
    if (bt.randIntInRange(1, 3) > 1 && Array.isArray(lines[i][0])) {
      const shadowOffset = 0.7;
      const shadowLine = lines[i].map(point => 
        [point[0] + shadowOffset, point[1] + shadowOffset]
      );
      shadedLines.push(shadowLine);
    }
  }
  return shadedLines;
}

// Initialize factors for variation tracking
let factors = [];
let fishFactors = [];

// Draw sand at the bottom
const sandHeight = 15;
const sandLine = [[0, height], [width, height]];
drawLines([sandLine]);

// Add texture to sand with small dashes
for (let i = 0; i < width; i += 4) {
  const dashLength = bt.randIntInRange(1, 3);
  const dashY = height - bt.randIntInRange(1, sandHeight - 2);
  drawLines([[[i, dashY], [i + dashLength, dashY]]]);
}

// Add coral structures
const coral = generateCoral();
drawLines(coral);

// Add seaweed
const seaweed = generateSeaweed();
drawLines(addShading(seaweed, 0.5));

// Add fish at different depths
const swimLaneNumber = bt.randIntInRange(2, 4);
factors.push(swimLaneNumber);

const spacing = 25;
for (let lane = 1; lane <= swimLaneNumber; lane++) {
  const fishNumber = bt.randIntInRange(2, 5); // Number of fish in this "lane"
  factors.push(fishNumber);
  
  let y = 30 + (lane - 1) * spacing;
  
  for (let fish = 1; fish <= fishNumber; fish++) {
    let fishBody = generateFish();
    fishFactors.push([fishBody[1], fishBody[2], fishBody[3], fishBody[4]]);
    fishBody = fishBody[0];
    
    // Position fish in the scene
    bt.translate(fishBody, [width/2 + (fishNumber/2 - fish + 0.5) * spacing, y], bt.bounds(fishBody).cc);
    
    // Make fish at different depths slightly different sizes for perspective
    const depthScale = 0.4 + (lane * 0.2); // Deeper fish are slightly larger
    bt.scale(fishBody, depthScale);
    
    // Draw fish with depth-based shading
    drawLines(addShading(fishBody, 0.7));
  }
}

// Add bubbles throughout the scene
const bubbles = generateBubbles();
drawLines(bubbles);

// Add subtle water current lines
for (let i = 0; i < 5; i++) {
  const y = bt.randIntInRange(10, height - sandHeight - 10);
  const lineLength = bt.randIntInRange(20, 40);
  const startX = bt.randIntInRange(5, width - lineLength - 5);
  
  const currentLine = bt.nurbs([
    [startX, y],
    [startX + lineLength/3, y + bt.randIntInRange(-3, 3)],
    [startX + lineLength*2/3, y + bt.randIntInRange(-4, 4)],
    [startX + lineLength, y]
  ]);
  
  drawLines([currentLine]);
}

// Sun rays coming from above (fixed with enough points for NURBS)
if (bt.randIntInRange(1, 3) > 1) {
  const rayCount = bt.randIntInRange(3, 7);
  const rays = [];
  
  for (let i = 0; i < rayCount; i++) {
    const startX = bt.randIntInRange(10, width - 10);
    const rayLength = bt.randIntInRange(30, 70);
    
    // Use simple lines instead of NURBS for rays
    rays.push([
      [startX, 0],
      [startX + bt.randIntInRange(-10, 10), rayLength/3],
      [startX + bt.randIntInRange(-15, 15), rayLength*2/3],
      [startX + bt.randIntInRange(-20, 20), rayLength]
    ]);
  }
  
  drawLines(rays);
}

factors.push(fishFactors);

// Piece number generation 
function factorsToCode(factors) {
    const ranges = [
        { min: 2, max: 4 },      // swimLaneNumber
        { min: 2, max: 5 },      // fishNumber per lane
        { min: 2, max: 5 },      // more fishNumber
        { min: 2, max: 5 },      // more fishNumber
        { min: 2, max: 5 },      // more fishNumber
        { min: 1, max: 2 },      // randomDirection
        { min: 1, max: 100 },    // fishScale
        { min: 1, max: 100 },    // tailLength
        { min: 1, max: 100 }     // fin size variation
    ];
    
    const totalPossibilities = ranges.reduce((acc, range) =>
        acc * (range.max - range.min + 1), 1);
    
    let code = 0;
    let multiplier = 1;
    
    for (let i = 0; i < 1; i++) {
        code += (factors[i] - ranges[i].min) * multiplier;
        multiplier *= (ranges[i].max - ranges[i].min + 1);
    }
    
    const laneCount = factors[0];
    for (let i = 0; i < laneCount; i++) {
        code += (factors[1 + i] - ranges[1].min) * multiplier;
        multiplier *= (ranges[1].max - ranges[1].min + 1);
    }
    
    const fishArrays = factors[factors.length - 1];
    const totalFish = factors.slice(1, 1 + laneCount).reduce((sum, num) => sum + num, 0);
    
    for (let i = 0; i < totalFish; i++) {
        for (let j = 0; j < 4; j++) {
            code += (fishArrays[i][j] - ranges[5 + j].min) * multiplier;
            multiplier *= (ranges[5 + j].max - ranges[5 + j].min + 1);
        }
    }
    
    // Ensure the code is within the valid range
    return code % totalPossibilities;
}

console.log(factorsToCode(factors));