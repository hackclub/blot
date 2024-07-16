/*
@title: watermelon
@author: Bhavya Dhariwal
@snapshot: melonmelon.png
*/

setDocDimensions(800, 400);

// Function to draw a semicircle upside down
function drawFlippedSemicircle() {
    const centerX = 400; 
    const centerY = 200; 
    const largeRadius = 150; 
    const smallRadius = 125; 

    // Draw the larger semicircular arc (upside down)
    const largeArcPoints = [];
    const numPoints = 50; 
    for (let i = 0; i <= numPoints; i++) {
        const angle = Math.PI * i / numPoints; 
        const x = centerX + largeRadius * Math.cos(angle);
        const y = centerY - largeRadius * Math.sin(angle);
        largeArcPoints.push([x, y]);
    }
    drawLines([largeArcPoints]);

    // Connect the endpoints of the larger arc to form the larger semicircle (upside down)
    const largeSemicirclePoints = [
        [centerX - largeRadius, centerY],
        [centerX + largeRadius, centerY]
    ];
    drawLines([largeSemicirclePoints]);

    // Draw the smaller semicircular arc (upside down)
    const smallArcPoints = [];
    const numinPoints = 50; 
    for (let i = 0; i <= numPoints; i++) {
        const angle = Math.PI * i / numPoints; 
        const x = centerX + smallRadius * Math.cos(angle);
        const y = centerY - smallRadius * Math.sin(angle); 
        smallArcPoints.push([x, y]);
    }
    drawLines([smallArcPoints]);

    // Connect the endpoints of the smaller arc to form the smaller semicircle (upside down)
    const smallSemicirclePoints = [
        [centerX - smallRadius, centerY],
        [centerX + smallRadius, centerY]
    ];
    drawLines([smallSemicirclePoints]);

  // Draw tiny circles scattered inside the smaller semicircle
    const numCircles = 15;
    for (let i = 0; i < numCircles; i++) {
        // random positions within the bounds of the smaller semicircle
        const angle = Math.random() * Math.PI; 
        const radius = Math.sqrt(Math.random()) * smallRadius; 
        const x = centerX + radius * Math.cos(angle);
        const y = centerY - radius * Math.sin(angle); 
        drawCircle(x, y, 5); 
    }
}

// Function to draw a circle
function drawCircle(x, y, radius) {
    // Since we don't have a built-in circle drawing function, we can approximate it using polylines
    const circlePoints = [];
    const numPoints = 50; 
    for (let i = 0; i <= numPoints; i++) {
        const angle = (Math.PI * 2 * i) / numPoints;
        const xPos = x + radius * Math.cos(angle);
        const yPos = y - radius * Math.sin(angle); 
        circlePoints.push([xPos, yPos]);
    }
    drawLines([circlePoints]);
}

// Draw the flipped semicircle with tiny circles inside
drawFlippedSemicircle();