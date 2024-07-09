const width = 200;
const height = 200;

setDocDimensions(width, height);

function drawPanda() {
  const lines = [];

  // Head
  const headRadius = 40;
  const headCenter = [100, 140];
  lines.push(...circle(headCenter, headRadius));

  // Body
  const bodyRadius = 50;
  const bodyCenter = [100, 53];
  lines.push(...circle(bodyCenter, bodyRadius));

  // Left Ear
  const earRadius = 15;
  const earLeftCenter = [75, 175];
  lines.push(...circle(earLeftCenter, earRadius));

  // Right Ear
  const earRightCenter = [125, 175];
  lines.push(...circle(earRightCenter, earRadius));

  // Inner Left Ear
  const innerEarLeft = [
    [[70, 175], [75, 170]],
    [[75, 170], [80, 175]]
  ];
  lines.push(...innerEarLeft);

  // Inner Right Ear
  const innerEarRight = [
    [[120, 175], [125, 170]],
    [[125, 170], [130, 175]]
  ];
  lines.push(...innerEarRight);

  // Eyes
  const eyeRadius = 7;
  const eyeLeftCenter = [85, 145];
  const eyeRightCenter = [115, 145];
  lines.push(...circle(eyeLeftCenter, eyeRadius));
  lines.push(...circle(eyeRightCenter, eyeRadius));

  // Pupils
  const pupilRadius = 3;
  const pupilLeftCenter = [87, 145];
  const pupilRightCenter = [113, 145];
  lines.push(...circle(pupilLeftCenter, pupilRadius));
  lines.push(...circle(pupilRightCenter, pupilRadius));

  // Nose
  const noseRadius = 5;
  const noseCenter = [100, 130];
  lines.push(...circle(noseCenter, noseRadius));

  // Mouth
  const mouthLeft = [[95, 120], [105, 120]];
  lines.push(mouthLeft);

  // Hands (Paws)
  const pawRadius = 15;
  const pawLeftCenter = [66, 60];
  const pawRightCenter = [135, 60];
  lines.push(...circle(pawLeftCenter, pawRadius));
  lines.push(...circle(pawRightCenter, pawRadius));

  // Fingers (optional detail)
  const fingerLength = 8;
  const fingerSpread = 5;

  // Left hand fingers
  lines.push([[63, 60], [63 - fingerLength, 60]]);
  lines.push([[63, 60], [63, 60 - fingerSpread]]);
  lines.push([[63, 60], [63, 60 + fingerSpread]]);

  // Right hand fingers
  lines.push([[137, 60], [137 + fingerLength, 60]]);
  lines.push([[137, 60], [137, 60 - fingerSpread]]);
  lines.push([[137, 60], [137, 60 + fingerSpread]]);

  // Add slight shading for depth
  const shadingLines = [
    [[93, 135], [95, 133]],
    [[105, 133], [107, 135]]
  ];
  lines.push(...shadingLines);

  drawLines(lines);
}

function circle(center, radius) {
  const [cx, cy] = center;
  const segments = 60; // Increased for smoother circle
  const angleStep = (2 * Math.PI) / segments;
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const angle = i * angleStep;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push([x, y]);
  }

  const lines = [];
  for (let i = 0; i < points.length - 1; i++) {
    lines.push([points[i], points[i + 1]]);
  }

  return lines;
}

drawPanda();
