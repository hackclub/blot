/*
@title: Cyber Circuit Core
@author: Dodava
@tags: ['technology', 'generative', 'circuit', 'geometry']
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const finalLines = [];
const cx = width / 2;
const cy = height / 2;

// 1. Central Energy Octagons
const coreLayers = 6;
for (let i = 1; i <= coreLayers; i++) {
  const radius = i * 4.5;
  const sides = 8;
  const poly = [];
  for (let s = 0; s <= sides; s++) {
    const angle = (s / sides) * Math.PI * 2 + (i % 2 === 0 ? Math.PI / 8 : 0);
    poly.push([
      cx + Math.cos(angle) * radius,
      cy + Math.sin(angle) * radius
    ]);
  }
  finalLines.push(poly);
}

// 2. Microchip Center Box
const chipSize = 14;
const hChip = chipSize / 2;
finalLines.push([
  [cx - hChip, cy - hChip],
  [cx + hChip, cy - hChip],
  [cx + hChip, cy + hChip],
  [cx - hChip, cy + hChip],
  [cx - hChip, cy - hChip]
]);

// Inner Chip Diamond
finalLines.push([
  [cx, cy - hChip + 2],
  [cx + hChip - 2, cy],
  [cx, cy + hChip - 2],
  [cx - hChip + 2, cy],
  [cx, cy - hChip + 2]
]);

// 3. Circuit Traces with Terminal Nodes
const numTraces = 24;
for (let i = 0; i < numTraces; i++) {
  const baseAngle = (i / numTraces) * Math.PI * 2;
  const startDist = 30;
  
  let x = cx + Math.cos(baseAngle) * startDist;
  let y = cy + Math.sin(baseAngle) * startDist;
  
  const trace = [[x, y]];
  
  const midDist = startDist + 12;
  x = cx + Math.cos(baseAngle) * midDist;
  y = cy + Math.sin(baseAngle) * midDist;
  trace.push([x, y]);
  
  const turnDirection = (i % 2 === 0) ? 1 : -1;
  const turnAngle = baseAngle + (Math.PI / 4) * turnDirection;
  
  x = x + Math.cos(turnAngle) * 8;
  y = y + Math.sin(turnAngle) * 8;
  trace.push([x, y]);
  
  const endX = cx + Math.cos(baseAngle) * 52;
  const endY = cy + Math.sin(baseAngle) * 52;
  trace.push([endX, endY]);
  
  finalLines.push(trace);
  
  // Connection Terminal Pad
  const padRadius = 1.2;
  const pad = [];
  for (let p = 0; p <= 6; p++) {
    const pa = (p / 6) * Math.PI * 2;
    pad.push([
      endX + Math.cos(pa) * padRadius,
      endY + Math.sin(pa) * padRadius
    ]);
  }
  finalLines.push(pad);
}

// 4. Outer Cyber Border Frame
const pad1 = 5;
const chamfer = 8;
finalLines.push([
  [pad1 + chamfer, pad1],
  [width - pad1 - chamfer, pad1],
  [width - pad1, pad1 + chamfer],
  [width - pad1, height - pad1 - chamfer],
  [width - pad1 - chamfer, height - pad1],
  [pad1 + chamfer, height - pad1],
  [pad1, height - pad1 - chamfer],
  [pad1, pad1 + chamfer],
  [pad1 + chamfer, pad1]
]);

const pad2 = 8;
finalLines.push([
  [pad2 + chamfer, pad2],
  [width - pad2 - chamfer, pad2],
  [width - pad2, pad2 + chamfer],
  [width - pad2, height - pad2 - chamfer],
  [width - pad2 - chamfer, height - pad2],
  [pad2 + chamfer, height - pad2],
  [pad2, height - pad2 - chamfer],
  [pad2, pad2 + chamfer],
  [pad2 + chamfer, pad2]
]);

drawLines(finalLines);
