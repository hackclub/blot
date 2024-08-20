/*
@title: Retro_Tatooine
@author: Mahit-Marri
@snapshot: Retro_Tatooine
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Initial start and end points
let startPoint = [0, 40];
let endPoint = [30, 0];

// Function to draw a line between two points
function drawLine(start, end) {
    drawLines([[start, end]]);
}

// Loop
for (let i = 0; i < 20; i++) {
    drawLine(startPoint, endPoint);

    startPoint[1] -= 2;
    endPoint[0] += 5;  
}

function drawLinesRightToLeft() {

    let startPoint = [125, 40];
    let endPoint = [95, 0];

    for (let i = 0; i < 20; i++) {
        drawLine(startPoint, endPoint);

    
        startPoint[1] -= 2; 
        endPoint[0] -= 5;  
    }
}

drawLinesRightToLeft()

function makeSun(x, y, radius){
    const turtle = new bt.Turtle();
    turtle.jump([x, y - radius]);
    turtle.down();
    turtle.arc(359, radius);
    drawLines(turtle.lines());
}

makeSun(100, 100, bt.randInRange(50,10));

makeSun(50, 60, bt.randInRange(50,10));


