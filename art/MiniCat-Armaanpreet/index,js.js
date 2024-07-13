/*
@title: MiniCat
@author: Armaanpreet Singh
@snapshot: snapshot.png
*/

const width = 200;
const height = 200;

setDocDimensions(width, height);

function drawCat() {
  const lines = [];
  
  // Random number generator within a range
  function randInRange(min, max) {
    return min + Math.random() * (max - min);
  }

  // Head
  const headRadius = randInRange(30, 50);
  const headCenter = [width / 2, height - headRadius - randInRange(10, 20)];
  lines.push(...circle(headCenter, headRadius));

  // Body
  const bodyRadius = randInRange(45, 60);
  const bodyCenter = [width / 2, headCenter[1] - headRadius - bodyRadius / 2];
  lines.push(...circle(bodyCenter, bodyRadius));

  // Ears
  const earRadius = randInRange(10, 20);
  const earLeftCenter = [headCenter[0] - headRadius + earRadius, headCenter[1] + headRadius - earRadius];
  const earRightCenter = [headCenter[0] + headRadius - earRadius, headCenter[1] + headRadius - earRadius];
  lines.push(...circle(earLeftCenter, earRadius));
  lines.push(...circle(earRightCenter, earRadius));

  // Inner Ears
  const innerEarLeft = [
    [earLeftCenter[0] - earRadius / 2, earLeftCenter[1]],
    [earLeftCenter[0], earLeftCenter[1] - earRadius / 2],
    [earLeftCenter[0] + earRadius / 2, earLeftCenter[1]]
  ];
  const innerEarRight = [
    [earRightCenter[0] - earRadius / 2, earRightCenter[1]],
    [earRightCenter[0], earRightCenter[1] - earRadius / 2],
    [earRightCenter[0] + earRadius / 2, earRightCenter[1]]
  ];
  lines.push(innerEarLeft);
  lines.push(innerEarRight);

  // Eyes
  const eyeRadius = randInRange(5, 10);
  const eyeLeftCenter = [headCenter[0] - headRadius / 3, headCenter[1] - eyeRadius];
  const eyeRightCenter = [headCenter[0] + headRadius / 3, headCenter[1] - eyeRadius];
  lines.push(...circle(eyeLeftCenter, eyeRadius));
  lines.push(...circle(eyeRightCenter, eyeRadius));

  // Pupils
  const pupilRadius = eyeRadius / 2;
  const pupilLeftCenter = [eyeLeftCenter[0] + randInRange(-2, 2), eyeLeftCenter[1] + randInRange(-2, 2)];
  const pupilRightCenter = [eyeRightCenter[0] + randInRange(-2, 2), eyeRightCenter[1] + randInRange(-2, 2)];
  lines.push(...circle(pupilLeftCenter, pupilRadius));
  lines.push(...circle(pupilRightCenter, pupilRadius));

  // Nose
  const noseRadius = 5;
  const noseCenter = [headCenter[0], headCenter[1] - headRadius / 2];
  lines.push(...circle(noseCenter, noseRadius));

  // Mouth
  const mouth = [
    [noseCenter[0] - 5, noseCenter[1] - 5],
    [noseCenter[0], noseCenter[1] - 10],
    [noseCenter[0] + 5, noseCenter[1] - 5]
  ];
  lines.push(mouth);

  // Whiskers
  const whiskerLength = randInRange(10, 20);
  for (let i = 0; i < 3; i++) {
    lines.push([[noseCenter[0] - noseRadius, noseCenter[1] - i * 5], [noseCenter[0] - noseRadius - whiskerLength, noseCenter[1] - i * 5]]);
    lines.push([[noseCenter[0] + noseRadius, noseCenter[1] - i * 5], [noseCenter[0] + noseRadius + whiskerLength, noseCenter[1] - i * 5]]);
  }

  // Paws
  const pawRadius = randInRange(10, 20);
  const pawLeftCenter = [bodyCenter[0] - bodyRadius / 2, bodyCenter[1] - bodyRadius / 2];
  const pawRightCenter = [bodyCenter[0] + bodyRadius / 2, bodyCenter[1] - bodyRadius / 2];
  lines.push(...circle(pawLeftCenter, pawRadius));
  lines.push(...circle(pawRightCenter, pawRadius));

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

drawCat();
