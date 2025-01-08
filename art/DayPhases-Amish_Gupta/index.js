/*
@title: Day, Sunset & Night Scene
@author: Amish Gupta
@snapshot: Dusk.png
*/


// Set canvas dimensions
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Function to draw the sky with dynamic background colors
function drawSky(sunY) {
    let backgroundColor;

    // Determine background color based on sun position
    if (sunY > 60) {
        backgroundColor = "#87CEEB"; // Day sky
    } else if (sunY <= 60 && sunY > 40) {
        backgroundColor = "#FFD580"; // Evening sky
    } else {
        backgroundColor = "#001f3f"; // Night sky
    }

    // Draw the sky with the determined color
    drawLines([[[0, 0], [width, 0], [width, height], [0, height], [0, 0]]], { fill: backgroundColor });

    return backgroundColor;
}

// Function to draw the sun
function drawSun(y, radius) {
    if (y > 40) { // Only draw the sun if it's above the threshold
        const sunColor = "#FFA500"; // Orange sun
        const sun = new bt.Turtle();
        sun.jump([width / 2, y]);
        sun.arc(360, radius);
        drawLines(sun.lines(), { stroke: "#FFA500", fill: sunColor, width: 1 });
    }
}

// Function to draw the moon with crescent shape and proper position
function drawMoon(visible) {
    if (visible) { // Only draw the moon if it should be visible
        const moonColor = "#FFFFFF"; // White moon
        const moonX = bt.randIntInRange(50, 115); // Random x-position (above mountains)
        const moonY = bt.randIntInRange(90, 100); // Random y-position (above mountains)

        const moon = new bt.Turtle();
        moon.jump([moonX, moonY]);
        moon.arc(360, 8); // Full moon outline
        drawLines(moon.lines(), { stroke: "#FFFFFF", fill: moonColor, width: 1 });

        // Add shadow to create crescent effect 
        const shadow = new bt.Turtle();
        shadow.jump([moonX - 4, moonY]); // Shift slightly for crescent shadow
        shadow.arc(360, 13); 
        drawLines(shadow.lines(), { stroke: "#001f3f", fill: "#001f3f", width: 1 });
    }
}

// Function to draw a silhouette of higher mountains
function drawMountains() {
    const mountain1 = bt.catmullRom([[0, 40], [30, 90], [60, 50], [90, 100], [125, 40]]);
    const mountain2 = bt.catmullRom([[0, 30], [40, 80], [70, 40], [110, 90], [125, 30]]);
    drawLines([mountain1], { stroke: "#000000", fill: "#2F4F4F", width: 2 });
    drawLines([mountain2], { stroke: "#000000", fill: "#4B4B4B", width: 2 });
}

// Function to generate random points for the river path
function generateRandomRiverPath(yOffset = 0) {
    const points = [];
    const segments = 6; // Number of river segments

    for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        const y = 22 + bt.randInRange(-3, 3) + yOffset; // Add randomness and offset for width
        points.push([x, y]);
    }

    return points;
}

// Function to draw the wide dynamic river
function drawRiver() {
    const riverPath = bt.catmullRom(generateRandomRiverPath());
    drawLines([riverPath], { stroke: "#1E90FF", fill: "#4682B4", width: 6 }); // Distinct river color
}

// Function to draw dense grass near the river
function drawDenseGrass() {
    const grassColor = "#228B22"; // Grass green color
    const grassPatchWidth = 2; // Width of each grass patch

    for (let i = 0; i < 100; i++) { // Increased grass density
        const x = bt.randIntInRange(0, width); // Random x-position for grass
        const y = bt.randInRange(5, 15); // Random y-position near the river

        const grass = new bt.Turtle();
        grass.jump([x, y]);
        grass.setAngle(75);
        grass.arc(30, grassPatchWidth); // Left blade
        grass.jump([x, y]);
        grass.setAngle(105);
        grass.arc(30, grassPatchWidth); // Right blade

        drawLines(grass.lines(), { stroke: grassColor, width: 0.5 });
    }
}

// Function to draw clouds above the mountains
function drawClouds(count, night) {
    for (let i = 0; i < count; i++) {
        const cloudX = bt.randIntInRange(10, 115); // Random x-position
        const cloudY = bt.randIntInRange(90, 120); // Random y-position (above the mountains)
        const cloudColor = night ? "#A9A9A9" : "#FFFFFF"; // Gray clouds at night, white otherwise

        const cloud = new bt.Turtle();
        cloud.jump([cloudX, cloudY]);
        cloud.arc(360, 4); // Central circle
        cloud.jump([cloudX - 5, cloudY - 2]);
        cloud.arc(360, 3); // Left circle
        cloud.jump([cloudX + 5, cloudY - 2]);
        cloud.arc(360, 3); // Right circle

        drawLines(cloud.lines(), { stroke: cloudColor, fill: cloudColor, width: 1 }); // Cloud color
    }
}

// Function to draw birds in "V" shape
function drawBirds(count) {
    for (let i = 0; i < count; i++) {
        const birdX = bt.randIntInRange(10, 115); // Random x-position
        const birdY = bt.randIntInRange(80, 120); // Random y-position

        const bird = new bt.Turtle();
        bird.jump([birdX, birdY]);
        bird.arc(-30, 5); // Left wing
        bird.jump([birdX, birdY]);
        bird.arc(30, 5); // Right wing

        drawLines(bird.lines(), { stroke: "#000000", width: 1 }); // Black bird
    }
}

// Function to draw stars
function drawStars(count) {
    for (let i = 0; i < count; i++) {
        const starX = bt.randIntInRange(0, width);
        const starY = bt.randInRange(60, height); // Stars appear in the upper part of the sky

        const star = new bt.Turtle();
        star.jump([starX, starY]);
        star.arc(360, 0.5); // Small star

        drawLines(star.lines(), { stroke: "#FFFFFF", fill: "#FFFFFF", width: 0.5 }); // White star
    }
}

// Function to simulate the sunset
function simulateSunset() {
    const frames = 1; // Number of frames for the animation
    const sunRadius = 12; // Radius of the sun

    // Randomize which time of day to simulate (equal chance for day, evening, night)
    const timeOfDay = bt.randIntInRange(1, 3);
    let sunY;

    if (timeOfDay === 1) {
        sunY = bt.randIntInRange(70, 100); // Day sky range
    } else if (timeOfDay === 2) {
        sunY = bt.randIntInRange(50, 70); // Evening sky range
    } else {
        sunY = bt.randIntInRange(30, 50); // Night sky range
    }

    // Clear the canvas and draw each frame
    const backgroundColor = drawSky(sunY); // Sky changes dynamically based on sun position

    if (backgroundColor === "#001f3f") {
        // Draw stars and moon when the sky is night
        drawStars(bt.randIntInRange(5, 10)); // Random count of stars
        drawMoon(true); // Moon visible at night
        drawClouds(bt.randIntInRange(2, 3), true); // Gray clouds at night
    } else {
        drawMoon(false); // Hide moon during the day and evening
        drawSun(sunY, sunRadius); // Draw the moving sun
        drawBirds(bt.randIntInRange(3, 5)); // Random count of birds when not night
        drawClouds(bt.randIntInRange(2, 3), false); // White clouds during the day
    }

    drawMountains(); 
    drawRiver(); 
    drawDenseGrass();
}

// Run the simulation
simulateSunset();