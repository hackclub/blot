/*
@title: MoonlitRoad
@author: Ben
@snapshot: 1
*/

//Editable Values

//Doc Size
const width = 125;
const height = 125;

//Horizon
const Horizon_Height = 39 //units from bottom
const Horizon_Curve = 22
const Horizon_Random = [15, -1] //min, max

//Stars
const Number_of_Stars = 16
const Star_Min_Distance = 11
const Star_Size = [1, 0.6]//min, max
const Star_Points_Number = [3,13]//min, max

//Road
const Road_Start = 95 //units from left
const Road_End = 95 // units from left
const Road_Width_Start = 26
const Road_Width_End = 9

//Moon
const Moon_Radius = 10
const Moon_Position = [106,106]
const Moon_Type = "crescent" // "full": new/full moon phase, "crescent": gibbous/crescent , "quarter": first/last quarter

//Farm
const Farm_Size = [100, 100]

// Grass Parameters
const Grass_Density = 137;
const Grass_Length = [2, 5];
const Grass_Width = [0.1, 0.3];
const Grass_Variation = 15;

//---------------------------------------------------------------------------------------------//

//SetDocDimensions
setDocDimensions(width, height);

//Make Horizon
var RandomCurve = Horizon_Curve + bt.randInRange(Horizon_Random[0], Horizon_Random[1]);

var PeakCenter = (width / 2) + bt.randInRange(Horizon_Random[0], Horizon_Random[1]);

var PeakHeight = (Horizon_Height + 10) + bt.randInRange(Horizon_Random[0] * -1, Horizon_Random[1] + 10);

var HorizonCurve = bt.catmullRom([
  [0, Horizon_Height],
  [RandomCurve, Horizon_Height + 10],
  [PeakCenter, PeakHeight],
  [width, Horizon_Height]
])

// Make Road
function getHorizonYAtX(x, horizonCurve) {
    for (let i = 0; i < horizonCurve.length - 1; i++) {
        var x1 = horizonCurve[i][0];
        var y1 = horizonCurve[i][1];
        var x2 = horizonCurve[i + 1][0];
        var y2 = horizonCurve[i + 1][1];

        if (x1 <= x && x <= x2) {
            var t = (x - x1) / (x2 - x1);
            return y1 + t * (y2 - y1);
        }
    }
    return null;
}

var HorizonYAtEnd = getHorizonYAtX(Road_End, HorizonCurve);
var RoadCurveLeft = bt.catmullRom([
  [Road_Start, 0], 
  [Road_Start - 10, HorizonYAtEnd - 20],
  [Road_End + 10, HorizonYAtEnd - 10],
  [Road_End, HorizonYAtEnd]
]);

var HorizonYAtEnd_1 = getHorizonYAtX(Road_End + Road_Width_End, HorizonCurve);
var RoadCurveRight = bt.catmullRom([
  [Road_Start + Road_Width_Start, 0],
  [Road_Start + Road_Width_Start - 10, HorizonYAtEnd_1 - 20],
  [Road_End + Road_Width_End + 10, HorizonYAtEnd_1 - 10],
  [Road_End + Road_Width_End, HorizonYAtEnd_1]
]);

var HorizonYAtEnd_2 = getHorizonYAtX(Road_End + (Road_Width_End/2), HorizonCurve);
var RoadMiddleCurve = bt.catmullRom([
  [Road_Start + Road_Width_Start / 2, 0],
  [Road_Start + Road_Width_Start / 2 - 10, HorizonYAtEnd_1 - 20],
  [Road_End + Road_Width_End / 2 + 10, HorizonYAtEnd_1 - 10],
  [Road_End + Road_Width_End / 2, HorizonYAtEnd_1]
]);

//Make Moon
function drawMoon(center, radius, offset) {
    const circleTurtle = new bt.Turtle();
    const numSteps = 360;
    const scanLines = 2 * radius;

    circleTurtle.up();
    circleTurtle.goTo([center[0] + radius, center[1]]);
    circleTurtle.down();

    const angleStep = 2 * Math.PI / numSteps;

    for (let i = 0; i < numSteps; i++) {
        const angle = i * angleStep;
        const x = center[0] + radius * Math.cos(angle);
        const y = center[1] + radius * Math.sin(angle);
        circleTurtle.goTo([x, y]);
    }
    circleTurtle.goTo([center[0] + radius, center[1]]);
    drawLines(circleTurtle.lines());

    const fillTurtle = new bt.Turtle();
    const lineStep = 1 * radius / scanLines;

    for (let y = center[1] - radius; y <= center[1] + radius; y += lineStep) {
        for (let x = center[0] - radius; x <= center[0] + radius; x += lineStep) {
            const dx1 = x - center[0];
            const dy1 = y - center[1];
            const insideFullMoon = dx1 * dx1 + dy1 * dy1 <= radius * radius;

            const dx2 = x - (center[0] + offset);
            const dy2 = y - center[1];
            const insideSecondCircle = dx2 * dx2 + dy2 * dy2 <= radius * radius;

            if (insideFullMoon && insideSecondCircle) {
                fillTurtle.up();
                fillTurtle.goTo([x, y]);
                fillTurtle.down();
                fillTurtle.goTo([x + lineStep, y])
            }
        }
    }

    drawLines(fillTurtle.lines());
}

if (Moon_Type == "crescent") {
  drawMoon(Moon_Position, Moon_Radius, bt.randInRange(-18, 18));
}

if (Moon_Type == "full") {
  var RandBool = bt.randIntInRange(0,1);

  if (RandBool == 0) {
    drawMoon(Moon_Position, Moon_Radius, 0);
  } else {
    drawMoon(Moon_Position, Moon_Radius, 100);
  }
}

if (Moon_Type == "quarter") {
  function drawQuarterMoon(center, radius, isFirstQuarter) {
    const circleTurtle = new bt.Turtle();
    const numSteps = 360;
    const scanLines = 2 * radius;
    circleTurtle.up();
    circleTurtle.goTo([center[0] + radius, center[1]]);
    circleTurtle.down();

    const angleStep = 2 * Math.PI / numSteps;

    for (let i = 0; i < numSteps; i++) {
        const angle = i * angleStep;
        const x = center[0] + radius * Math.cos(angle);
        const y = center[1] + radius * Math.sin(angle);
        circleTurtle.goTo([x, y]);
    }
    circleTurtle.goTo([center[0] + radius, center[1]]);
    drawLines(circleTurtle.lines());

    const fillTurtle = new bt.Turtle();
    const lineStep = 1 * radius / scanLines;

    for (let y = center[1] - radius; y <= center[1] + radius; y += lineStep) {
        for (let x = center[0] - radius; x <= center[0] + radius; x += lineStep) {
            const dx1 = x - center[0];
            const dy1 = y - center[1];
            const insideFullMoon = dx1 * dx1 + dy1 * dy1 <= radius * radius;

            if (insideFullMoon) {
                const halfMoonCondition = isFirstQuarter
                    ? x > center[0]
                    : x < center[0];

                if (halfMoonCondition) {
                    fillTurtle.up();
                    fillTurtle.goTo([x, y]);
                    fillTurtle.down();
                    fillTurtle.goTo([x + lineStep, y]);
                }
            }
        }
    }

    drawLines(fillTurtle.lines());
  }

  const isFirstQuarter = bt.randIntInRange(0, 1) === 0;
  drawQuarterMoon(Moon_Position, Moon_Radius, isFirstQuarter);
}

// Make random shapes
function generateShape(center, radius, numPoints, randomness) {
    let points = [];
    let angleStep = (2 * Math.PI) / numPoints;
    let maxRandomness = radius * (randomness / 100); // Adjusted randomness based on radius

    for (let i = 0; i < numPoints; i++) {
        let angle = i * angleStep;
        // Apply a controlled randomness to the radius
        let randomRadius = radius + bt.randInRange(-maxRandomness, maxRandomness);
        let x = center[0] + randomRadius * Math.cos(angle);
        let y = center[1] + randomRadius * Math.sin(angle);
        points.push([x, y]);
    }
    points.push(points[0]); // Close the shape

    return bt.catmullRom(points);
}

function drawShape(center, radius, numPoints, randomness, size, position) {
    let shape = generateShape(center, radius, numPoints, randomness);
    drawLines(bt.translate(bt.scale([shape], size), position), { width: 0 });
}

// Draw Road
drawLines([RoadCurveLeft], { width: 0 });
drawLines([RoadCurveRight], { width: 0 });
drawLines([RoadMiddleCurve], { width: 0 });

// Draw Stars
var UsedStarPositions = [];

function getDistance(pos1, pos2) {
  var dx = pos1[0] - pos2[0];
  var dy = pos1[1] - pos2[1];
  return Math.sqrt(dx * dx + dy * dy);
}

for (let i = 0; i < Number_of_Stars+10; i++) {
    var validPosition = false;
    var ChosenPosition;

    while (!validPosition) {
        var ChosenX = bt.randInRange(8, width - 8);
        var ChosenY = bt.randInRange(height - 11, Horizon_Height + 22);
        ChosenPosition = [ChosenX, ChosenY];

        validPosition = true;
        for (let j = 0; j < UsedStarPositions.length; j++) {
            if (getDistance(ChosenPosition, UsedStarPositions[j]) < Star_Min_Distance) {
                validPosition = false;
                break;
            }
        }

        if (validPosition && getDistance(ChosenPosition, Moon_Position) < Moon_Radius + 15) {
            validPosition = false;
        }
    }

    UsedStarPositions.push(ChosenPosition);

    // Make Star
    const starCenter = [0, 0];
    const starRadius = 15;
    const numPoints = bt.randIntInRange(Star_Points_Number[0], Star_Points_Number[1]);

    const starturtle = new bt.Turtle();
    
    const angleStep = (2 * Math.PI) / numPoints;
    const innerRadius = starRadius / 3;
    
    starturtle.up();
    starturtle.goTo([starCenter[0] + starRadius * Math.cos(0), starCenter[1] + starRadius * Math.sin(0)]);
    starturtle.down();
    
    for (let i = 0; i < numPoints; i++) {
        let outerAngle = i * angleStep;
        let innerAngle = outerAngle + angleStep / 2;
        
        let outerX = starCenter[0] + starRadius * Math.cos(outerAngle);
        let outerY = starCenter[1] + starRadius * Math.sin(outerAngle);
        let innerX = starCenter[0] + innerRadius * Math.cos(innerAngle);
        let innerY = starCenter[1] + innerRadius * Math.sin(innerAngle);

        starturtle.goTo([outerX, outerY]);
        
        starturtle.goTo([innerX, innerY]);
    }
    
    starturtle.goTo([starCenter[0] + starRadius * Math.cos(0), starCenter[1] + starRadius * Math.sin(0)]);
    
    var star = bt.scale(starturtle.lines(), .5);
    star = bt.translate(star, ChosenPosition);
    star = bt.rotate(star, bt.randInRange(-180, 180));
    star = bt.scale(star, bt.randInRange(Star_Size[0], Star_Size[1]))
    drawLines(star);
}

//Make Grass
function getgrassDistance(x1, x2) {
    var dx = x1 - x2;
    return Math.sqrt(dx * dx);
}

function drawGrass(position, GrassLength, angle) {
    const grassTurtle = new bt.Turtle();
    grassTurtle.up();
    grassTurtle.goTo(position);
    grassTurtle.down();
    
    grassTurtle.setAngle(angle);
    grassTurtle.forward(GrassLength);
    
    drawLines(grassTurtle.lines());
}



  var badx = Road_Start + (Road_Width_Start - 8) / 2;
  var MinDistanceFromBadPoint = 21;
  
  for (let i = 0; i < (Grass_Density); i++) 
  {
    let validPosition = true;
    let ChosenPosition = [bt.randInRange(0, width - 3), bt.randInRange(3, Horizon_Height-5)];

    if (getgrassDistance(ChosenPosition[0], badx) < MinDistanceFromBadPoint) {
        validPosition = false;
    }

    if (validPosition) {
        drawGrass(ChosenPosition, 3, bt.randInRange(-40, 40));
    }
  }

// Draw Horizon
drawLines([HorizonCurve], { width: 0 });
