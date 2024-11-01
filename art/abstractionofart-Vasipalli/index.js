// Set up the document dimensions
setDocDimensions(125, 125);

// Initialize random seed based on current time
bt.setRandSeed(Date.now());

// Parameters for the artwork
const NUM_LINES = 50;
const STEPS_PER_LINE = 200;
const STEP_SIZE = 0.5;
const NOISE_SCALE = 0.02;
const LINE_VARIATION = 0.3;

// Function to create a single flowing line
function createFlowLine(startX, startY) {
    const turtle = new bt.Turtle();
    turtle.jump([startX, startY]);
    turtle.down();
    
    let x = startX;
    let y = startY;
    
    for (let step = 0; step < STEPS_PER_LINE; step++) {
        // Get noise value for this position
        const noiseVal = bt.noise([x * NOISE_SCALE, y * NOISE_SCALE], { 
            octaves: 4, 
            falloff: 50 
        });
        
        // Convert noise to angle (-180 to 180 degrees)
        const angle = noiseVal * 360;
        
        // Add some randomness to make each line unique
        const randomAngle = angle + bt.randInRange(-LINE_VARIATION * 360, LINE_VARIATION * 360);
        
        // Set turtle direction and move forward
        turtle.setAngle(randomAngle);
        turtle.forward(STEP_SIZE);
        
        // Update position
        x = turtle.pos[0];
        y = turtle.pos[1];
        
        // If we've gone outside the bounds, stop this line
        if (x < 0 || x > 125 || y < 0 || y > 125) {
            break;
        }
    }
    
    return turtle.lines();
}

// Create multiple layers of lines with different characteristics
function createArtwork() {
    const allLines = [];
    
    // Create background pattern
    for (let i = 0; i < NUM_LINES; i++) {
        const startX = bt.randInRange(20, 105);
        const startY = bt.randInRange(20, 105);
        const flowLine = createFlowLine(startX, startY);
        allLines.push(...flowLine);
    }
    
    const numCircles = bt.randIntInRange(3, 7);
    for (let i = 0; i < numCircles; i++) {
        const turtle = new bt.Turtle();
        const centerX = bt.randInRange(30, 95);
        const centerY = bt.randInRange(30, 95);
        const radius = bt.randInRange(5, 15);
        
        turtle.jump([centerX + radius, centerY]);
        turtle.down();
        turtle.arc(360, radius);
        allLines.push(...turtle.lines());
    }
    
    // Add some curved accent lines
    const numAccents = bt.randIntInRange(5, 10);
    for (let i = 0; i < numAccents; i++) {
        const points = [];
        const numPoints = bt.randIntInRange(3, 5);
        
        for (let j = 0; j < numPoints; j++) {
            points.push([
                bt.randInRange(20, 105),
                bt.randInRange(20, 105)
            ]);
        }
        
        const curve = bt.catmullRom(points, 100);
        allLines.push(curve);
    }
    
    // Optional: Add some geometric elements
    if (bt.rand() > 0.5) {
        const turtle = new bt.Turtle();
        const size = bt.randInRange(20, 40);
        turtle.jump([62.5 - size/2, 62.5 - size/2]);
        turtle.down();
        
        for (let i = 0; i < 4; i++) {
            turtle.forward(size);
            turtle.right(90);
        }
        allLines.push(...turtle.lines());
    }
    
    // Apply some transformations to add variety
    allLines.forEach(line => {
        if (bt.rand() > 0.7) {
            bt.scale([line], bt.randInRange(0.8, 1.2));
        }
        if (bt.rand() > 0.8) {
            bt.rotate([line], bt.randInRange(-15, 15));
        }
    });
    
    return allLines;
}

// Generate and draw the artwork
const artwork = createArtwork();
drawLines(artwork);