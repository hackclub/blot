/*
@title: japan-flag
@author: arnavravinder
@snapshot: snap_1.png
*/


const width = 200;
const height = 150;
const circleRadius = 22;  

setDocDimensions(width + 50, height); 

// random the wavy lines
const waveAmplitude = bt.randInRange(2, 8);  
const waveFrequency = bt.randInRange(3, 7);  

function generateWavyLine(startX, startY, endX, endY) {
    const points = [];
    const lineLength = endX - startX || endY - startY;
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t;
        const offset = Math.sin(t * Math.PI * waveFrequency) * waveAmplitude;
        
        if (endX - startX === 0) {  
            points.push([x + offset, y]);
        } else {  
            points.push([x, y + offset]);
        }
    }
    
    return points;
}

const wavyBorder = [];
wavyBorder.push(generateWavyLine(0, 0, 0, height));  
wavyBorder.push(generateWavyLine(0, height, width, height));  
wavyBorder.push(generateWavyLine(width, height, width, 0));  
wavyBorder.push(generateWavyLine(width, 0, 0, 0));  

drawLines(wavyBorder, { stroke: "black" });  

const t = new bt.Turtle();
const centerX = width / 2;
const centerY = height / 2.05;

t.up();
t.goTo([centerX, centerY - circleRadius]);  
t.down();
t.arc(360, circleRadius * 1.25);  

drawLines(t.lines(), { stroke: "red", fill: "red" });
