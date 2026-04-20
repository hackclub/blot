/*
@title: Geometric Harmony
@author: NAYAN ACHARYA
@snapshot: geometric_harmony1.png
*/

// Canvas configuration
const width = 400;
const height = 400;

// Art configuration
const CONFIG = {
    // Adjusted values for better physical drawing
    layers: 5,                    // Reduced layers for clearer lines
    baseRadius: 35,              // Increased base radius for better visibility
    basePoints: 6,               // Reduced points for cleaner pattern
    rotationFactor: Math.PI/12,  // Adjusted rotation for more spacing
    spokeDensity: 8,             // Reduced density for clearer lines
    petalDensity: 12,            // Reduced density for smoother curves
    circleResolution: 0.05,      // Increased resolution for fewer points
    
    // Adjusted pattern factors for better physical drawing
    spokeLength: 0.6,            // Increased spoke length
    petalInnerRadius: 0.65,      // Adjusted for better spacing
    petalOuterRadius: 0.85,      // Adjusted for better spacing
    circleRadius: 0.8,           // Slightly reduced for cleaner circles
    innerRadiusFactor: 0.25,     // Reduced for less dense patterns
    offsetSize: 0.15,            // Increased for more visible offsets
    
    // Final pattern adjustments
    finalOffsetSize: 1.5,        // Reduced for cleaner outlines
    alternateRotation: 30        // Adjusted for better layer variation
};

setDocDimensions(width, height);

function createUniqueLayer(radius, points, rotation) {
    const lines = [];
    const centerX = width/2;
    const centerY = height/2;
    
    const basePattern = [];
    for (let i = 0; i < points; i++) {
        const angle1 = (i / points) * Math.PI * 2 + rotation;
        const angle2 = ((i + 1) / points) * Math.PI * 2 + rotation;
        
        const spoke = bt.catmullRom([
            [centerX, centerY],
            [centerX + Math.cos(angle1) * radius * CONFIG.spokeLength, 
             centerY + Math.sin(angle1) * radius * CONFIG.spokeLength],
            [centerX + Math.cos(angle1) * radius, 
             centerY + Math.sin(angle1) * radius]
        ], CONFIG.spokeDensity);
        basePattern.push(spoke);
        
        const petal = bt.catmullRom([
            [centerX + Math.cos(angle1) * radius * CONFIG.petalInnerRadius,
             centerY + Math.sin(angle1) * radius * CONFIG.petalInnerRadius],
            [centerX + Math.cos((angle1 + angle2)/2) * radius * CONFIG.petalOuterRadius,
             centerY + Math.sin((angle1 + angle2)/2) * radius * CONFIG.petalOuterRadius],
            [centerX + Math.cos(angle2) * radius * CONFIG.petalInnerRadius,
             centerY + Math.sin(angle2) * radius * CONFIG.petalInnerRadius]
        ], CONFIG.petalDensity);
        basePattern.push(petal);
    }

    const innerRadius = radius * CONFIG.innerRadiusFactor;
    const decorative = bt.offset(basePattern, innerRadius * CONFIG.offsetSize, {
        joinType: 'round',
        endType: 'round'
    });
    
    lines.push(...basePattern);
    lines.push(...decorative);
    
    const circle = [];
    for (let t = 0; t <= 1; t += CONFIG.circleResolution) {
        const angle = t * Math.PI * 2;
        circle.push([
            centerX + Math.cos(angle) * radius * CONFIG.circleRadius,
            centerY + Math.sin(angle) * radius * CONFIG.circleRadius
        ]);
    }
    lines.push(circle);

    return lines;
}

const uniqueArt = [];
for (let layer = 1; layer <= CONFIG.layers; layer++) {
    const radius = layer * CONFIG.baseRadius;
    const points = layer * CONFIG.basePoints;
    const rotation = layer * CONFIG.rotationFactor;
    const layerLines = createUniqueLayer(radius, points, rotation);
    
    if (layer % 2 === 0) {
        bt.rotate(layerLines, CONFIG.alternateRotation);
    }
    
    uniqueArt.push(...layerLines);
}

const finalPattern = bt.offset(uniqueArt, CONFIG.finalOffsetSize, {
    joinType: 'round',
    endType: 'round'
});
uniqueArt.push(...finalPattern);

drawLines(uniqueArt);