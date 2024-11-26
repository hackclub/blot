/*
@title: I'm An Ant
@author: Carlos Ramírez
@snapshot: i'm_an_ant.png
*/

setDocDimensions(125, 125);


const numArms = 12;
const allLines = [];


function createSpiralArm(startAngle, scale) {
    const turtle = new bt.Turtle();
    turtle.down()
        .jump([62.5, 62.5]) 
        .setAngle(startAngle);
    
   
    for (let i = 0; i < 50; i++) {
        const step = 1 + (i * 0.15);
        const angle = 10 + bt.noise(i * 0.1) * 5;
        
        turtle.forward(step)
            .right(angle);
            
      
        if (bt.rand() < 0.1) {
            const branchTurtle = turtle.copy();
            branchTurtle.right(45)
                .forward(step * 0.7)
                .right(30)
                .forward(step * 0.5);
            allLines.push(...branchTurtle.lines());
        }
    }
    
    return turtle.lines();
}


const centerTurtle = new bt.Turtle();
centerTurtle.down()
    .jump([62.5, 62.5]);

for (let i = 0; i < 36; i++) {
    centerTurtle.forward(3)
        .right(10)
        .forward(1)
        .right(10);
}

allLines.push(...centerTurtle.lines());

for (let i = 0; i < numArms; i++) {
    const angle = (360 / numArms) * i;
    const spiralArm = createSpiralArm(angle, 1);
    allLines.push(...spiralArm);
    

    const mirroredArm = createSpiralArm(angle + (360 / numArms / 2), 0.7);
    allLines.push(...mirroredArm);
}


const decorTurtle = new bt.Turtle();
for (let i = 0; i < 8; i++) {
    const radius = 5 + i * 3;
    const numPoints = 30 + i * 5;
    decorTurtle.up()
        .jump([62.5 + radius, 62.5])
        .down();
    
    for (let j = 0; j < numPoints; j++) {
        const angle = (360 / numPoints);
        decorTurtle.right(angle)
            .forward(2 * Math.PI * radius / numPoints);
    }
}

allLines.push(...decorTurtle.lines());


drawLines(allLines);