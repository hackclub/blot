const t = createTurtle();

function drawScaledPattern() {
  const numPoints = randIntInRange(1,200);
  const radius = 30;
  const rotationSpeed = 2;
  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints;
    const x = 55 + radius * Math.cos(angle);
    const y = 80 + radius * Math.sin(angle);
    t.jump([x, y]);
    t.down();
    const numLines = 10;
    const lineLength = 12;
    for (let j = 0; j < numLines; j++) {
      t.forward(lineLength);
      t.right(360 / numLines);
    }
    t.up();
  }
  t.rotate(rotationSpeed, [60, 60]);
}
drawScaledPattern();
drawTurtles([t]);
