/*
@title: Complex Pentagons
@author: CyberZenDev
@snapshot: snap1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

// Define the base pentagon vertices centered at (0, 0)
const basePentagon = [
    [0, -50],
    [43.30, -25],
    [26.98, 25],
    [-26.98, 25],
    [-43.30, -25],
    [0, -50]
];

// Loop for 100 nested pentagons
for (let i = 0; i < 130; i++) {
    const innerPentagon = JSON.parse(JSON.stringify(basePentagon)); 

    const scaleFactor = 1 - (bt.randIntInRange(0, 5) / 100);  
    bt.scale([innerPentagon], scaleFactor); 
    bt.rotate([innerPentagon], (i * 3.6) + bt.randIntInRange(0, 30)); 
    bt.translate([innerPentagon], [63.1, 75.6]); 

    finalLines.push(innerPentagon);
}

const sunRadius = 15; 
const sunCenter = [62.5, 62.5]; 

const sunCircle = [];
for (let angle = 0; angle < 360; angle += 10) {
    const radians = (angle * Math.PI) / 180;
    sunCircle.push([sunCenter[0] + sunRadius * Math.cos(radians), sunCenter[1] + sunRadius * Math.sin(radians)]);
}
sunCircle.push(sunCircle[0]); 

finalLines.push(sunCircle); 

drawLines(finalLines);
