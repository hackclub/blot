/*
@title: Spiral Line Art
@author: Hayley So
@snapshot: snapshot1.png
*/
const width = 200;
const height = 200;

setDocDimensions(width, height);

const finalLines = [];

function drawSpiralStar(numLines, rotations, innerRadius, outerRadius, randomness) {
    const angleStep = (Math.PI * 2) / numLines;
    
    for (let i = 0; i < numLines; i++) {
        const startAngle = i * angleStep;
        const endAngle = startAngle + (rotations * Math.PI * 2);
        
        const line = [];
        const steps = 100;
        
        for (let j = 0; j <= steps; j++) {
            const t = j / steps;
            const angle = startAngle + (endAngle - startAngle) * t;
            const radius = innerRadius + (outerRadius - innerRadius) * t;
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
          
            line.push([x, y]);
        }
        
        finalLines.push(line);
    }
}

// Parameters
const numLines = 8;       // Number of spiral arms
const rotations = 2;       // How many times each arm rotates around the center
const innerRadius = 3;    // Starting radius of the spiral
const outerRadius = 75;    // Ending radius of the spiral
const randomness = 0;      // Amount of random displacement for each point

drawSpiralStar(numLines, rotations, innerRadius, outerRadius, randomness);

// Center the drawing
const finalLinesBounds = bt.bounds(finalLines);
bt.translate(finalLines, [width / 2, height / 2], finalLinesBounds.cc);

drawLines(finalLines);