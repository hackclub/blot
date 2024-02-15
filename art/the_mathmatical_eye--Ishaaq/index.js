// The Mathmatical Eye, By Ishaaq Ollite

const t = createTurtle();

function drawEllipses() {
  const numEllipses = 1000;
  for (let k = 1; k <= numEllipses; k++) {

    const A = Math.sin((60 * Math.PI * k) / numEllipses) * Math.cos((60 * Math.PI * k) / numEllipses);
    const B = Math.cos((60 * Math.PI * k) / numEllipses) * Math.cos((52 * Math.PI * k) / numEllipses);
    const C = 60 - (1 / 7) * Math.pow(Math.sin((60 * Math.PI * k) / numEllipses), 60); // 60 is the radius of the circle
    const angleIncrement = (2 * Math.PI) / 100;
    const ellipsePoints = [];
    
    for (let i = 0; i < 100; i++) {
      const angle = i * angleIncrement;
      const radius = C * Math.sqrt(1 / ((Math.cos(angle) / A) ** 2 + (Math.sin(angle) / B) ** 2));
      const x = radius * Math.cos(angle) + 60; // + 60 to center the image
      const y = radius * Math.sin(angle) + 60; // + 60 to center the image
      ellipsePoints.push([x, y]);
    }

    // Draw ellipse
    t.up();
    t.goTo(ellipsePoints[0]);
    t.down();
    ellipsePoints.forEach(point => t.goTo(point));
    t.goTo(ellipsePoints[0]); // go back to the start (Thanks "Oskar Pav")
  }
  // Render the turtles
  drawTurtles([t]);
}

drawEllipses();