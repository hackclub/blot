/*
@title: Jack in the Box
@author: Dylan
@snapshot: Jack in the Box
*/

const { Turtle, rand, randInRange, randIntInRange } = blotToolkit;
const t = new Turtle();
const finalLines = [];

setDocDimensions(125, 125);

function randomColor() {
    const r = Math.floor(rand() * 256);
    const g = Math.floor(rand() * 256);
    const b = Math.floor(rand() * 256);
    return `rgb(${r},${g},${b})`;
}

function bluecolor() {
    return "rgb(0, 0, 255";
}

function orangeColor() {
    return "rgb(255, 165, 0)";
}

function redColor() {
    return "rgb(184, 15, 10)";
}

function grayColor() {
    return "rgb(189, 181, 181)";
}

const circleRadius = randInRange(4, 9);

const additionalCircleRadius = 37;

const centerX = 98 / 2;
const centerY = 125 / 2;
const width = 80;
const height = 30

const smileOffsetY = -9;

t.up()
  .goTo([centerX - 15, centerY])
  .down()
  .arc(360, circleRadius);

t.up()
  .goTo([centerX + 15, centerY])
  .down()
  .arc(360, circleRadius);

t.up()
  .goTo([centerX + 1, centerY + -45])
  .down()
  .arc(360, additionalCircleRadius);



function drawSquare(corner1, corner2, corner3, corner4) {
    const t = new Turtle();

    t.up().goTo(corner1).down();

    t.goTo(corner2)
     .goTo(corner3)
     .goTo(corner4)
     .goTo(corner1);

    let squareLines = t.lines();

    squareLines = bt.translate(squareLines, translation);

    const centerX = (corner1[0] + corner3[0]) / 2;
    const centerY = (corner1[1] + corner3[1]) / 2;
    squareLines = bt.rotate(squareLines, rotation, [centerX + translation[0], centerY + translation[1]]);

    drawLines([squareLines[0]], { stroke: "orangeColor", width: -2, fill: orangeColor() });
}

const corner1 = [37, 30];
const corner2 = [48, 30];
const corner3 = [55, 40];
const corner4 = [30, 40];
const translation = [-23, 50];
const rotation = 39;


drawSquare(corner1, corner2, corner3, corner4, translation, rotation);

let triangleVertices = [
  [centerX - 20, centerY - 40],
  [centerX + 20, centerY - 40],
  [centerX, centerY + 20]
];

const moveX = -36;
const moveY = 50;

triangleVertices = triangleVertices.map(vertex => 
  [vertex[0] + moveX, vertex[1] + moveY]
);

const triangleCenter = [
  (triangleVertices[0][0] + triangleVertices[1][0] + triangleVertices[2][0]) / 3,
  (triangleVertices[0][1] + triangleVertices[1][1] + triangleVertices[2][1]) / 3
];

const scaleFactor = bt.randInRange(0.4, 0.55);

triangleVertices = triangleVertices.map(vertex => 
  [(vertex[0] - triangleCenter[0]) * scaleFactor + triangleCenter[0], 
   (vertex[1] - triangleCenter[1]) * scaleFactor + triangleCenter[1]]
);

const rotationAngle = 39;

function rotatePoint(cx, cy, x, y, angle) {
  const radians = (Math.PI / 180) * angle;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) - (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
  return [nx, ny];
}

const scaledTriangleCenter = [
  (triangleVertices[0][0] + triangleVertices[1][0] + triangleVertices[2][0]) / 3,
  (triangleVertices[0][1] + triangleVertices[1][1] + triangleVertices[2][1]) / 3
];

const rotatedTriangleVertices = triangleVertices.map(vertex => 
  rotatePoint(scaledTriangleCenter[0], scaledTriangleCenter[1], vertex[0], vertex[1], rotationAngle)
);

t.up()
  .goTo(rotatedTriangleVertices[0])
  .down();

t.goTo(rotatedTriangleVertices[1])
  .goTo(rotatedTriangleVertices[2])
  .goTo(rotatedTriangleVertices[0]);

let polylines = t.lines();

t.up()
 .goTo([centerX - width/2, centerY + smileOffsetY])
 .down();

const curveControlPoints2 = [
  [centerX - width/3, centerY + smileOffsetY],
  [centerX - width/bt.randInRange(3, 5), centerY + smileOffsetY - height],
  [centerX + width/bt.randInRange(3, 5), centerY + smileOffsetY - height],
  [centerX + width/3, centerY + smileOffsetY]
];

const smile = bt.nurbs(curveControlPoints2, { steps: 332, degree: 3.0 });

drawLines([smile], { stroke: "red", width: bt.randInRange(2, 14) });

function drawElement(points, options = {}) {
    const { 
        scale = [1, 1], 
        translate = [0, 0], 
        fill, 
        stroke, 
        width 
    } = options;

    const scaledTranslatedPoints = points.map(([x, y]) => [
        x * scale[0] + translate[0],
        y * scale[1] + translate[1]
    ]);

    t.up().goTo(scaledTranslatedPoints[0]).down();
    scaledTranslatedPoints.forEach(point => t.goTo(point));

    drawLines([scaledTranslatedPoints], { 
        fill, 
        stroke, 
        width: width * Math.min(scale[0], scale[1])
    });

    return scaledTranslatedPoints;
}

function drawCup(options = {}) {
    const {
        cupWidth = 65,
        cupHeight = 70,
        cupTranslate = [0, 0],
        cupColor = "blueColor",
        cupStroke = "redColor",
        cupStrokeWidth = 2
    } = options;

    const baseWidth = 105;
    const baseHeight = 81;
    const scaleX = cupWidth / baseWidth;
    const scaleY = cupHeight / baseHeight;

    const cupPoints = [
        [30, 20], [21, 90], [95, 90], [89, 20], [30, 20]
    ];

    drawElement(cupPoints, {
        scale: [scaleX, scaleY],
        translate: cupTranslate,
        fill: cupColor(),
        stroke: cupStroke,
        width: cupStrokeWidth
    });
}

function drawCherry(options = {}) {
    const {
        cherryRadius = 5,
        stemLength = 10,
        cherryPosition = [0, 0],
        cherryColor = redColor,
        stemColor = "rgb(0, 100, 0)"
    } = options;

    const cherry = new Turtle();
    cherry.up()
          .goTo([cherryPosition[0], cherryPosition[1]])
          .down()
          .arc(360, cherryRadius);

    drawLines([cherry.lines()[0]], { fill: cherryColor() });

    const stemStart = [cherryPosition[0], cherryPosition[1] + cherryRadius];
    const stemEnd = [cherryPosition[0] - stemLength / 2, cherryPosition[1] + cherryRadius + stemLength];
    const controlPoint = [cherryPosition[0] + stemLength / 2, cherryPosition[1] + cherryRadius + stemLength / 2];

    const stem = bt.nurbs([stemStart, controlPoint, stemEnd], { steps: 20, degree: 2 });

    drawLines([stem], { stroke: stemColor, width: 1 });
}

function drawWhippedCream(options = {}) {
    const {
        baseWidth = 60,
        baseHeight = 40,
        basePosition = [83 - 10, 2 - 20],
        creamColor = grayColor,
        centerRadius = 20,
        numCircles = bt.randIntInRange(30, 40),
        rotation = 0
    } = options;

    const centerX = basePosition[0] + baseWidth / 2;
    const centerY = basePosition[1] + baseHeight / 2;

    const baseTurtle = new Turtle();
    baseTurtle.up().goTo([centerX, centerY - centerRadius * 0.2]).down();
    baseTurtle.arc(360, centerRadius * 1.2);
    drawLines(baseTurtle.lines(), { fill: creamColor(), stroke: creamColor() });

    const centerTurtle = new Turtle();
    centerTurtle.up().goTo([centerX, centerY]).down();
    centerTurtle.arc(360, centerRadius);
    const rotatedCircle = bt.rotate(centerTurtle.lines(), rotation, [centerX, centerY]);
    drawLines(rotatedCircle, { fill: creamColor(), stroke: creamColor() });

    for (let i = 0; i < numCircles; i++) {
        const angle = bt.randInRange(0, Math.PI * 2);
        const distance = bt.randInRange(centerRadius * 0.3, centerRadius * 1.1);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        const radius = bt.randInRange(centerRadius * 0.3, centerRadius * 0.7);

        const t = new Turtle();
        t.up().goTo([x, y]).down();
        t.arc(360, radius);

        drawLines(t.lines(), { fill: creamColor(), stroke: creamColor() });
    }

    for (let i = 0; i < 15; i++) {
        const angle = bt.randInRange(0, Math.PI * 2);
        const distance = bt.randInRange(centerRadius * 0.5, centerRadius * 1.2);
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance + centerRadius * 0.3;
        const radius = bt.randInRange(centerRadius * 0.1, centerRadius * 0.4);

        const t = new Turtle();
        t.up().goTo([x, y]).down();
        t.arc(360, radius);

        drawLines(t.lines(), { fill: creamColor(), stroke: creamColor() });
    }
}

function drawFaceLogo(options = {}) {
    const {
        scale = 0.2,
        translate = [0, 0]
    } = options;

    const logoT = new Turtle();
    const logoCenterX = 98 / 2;
    const logoCenterY = 125 / 2;


    function transformCoord(x, y) {
        return [
            x * scale + translate[0],
            y * scale + translate[1]
        ];
    }

    const logoCircleRadius = randInRange(4, 9) * scale;
    const [leftEyeX, leftEyeY] = transformCoord(logoCenterX - 15, logoCenterY);
    const [rightEyeX, rightEyeY] = transformCoord(logoCenterX + 15, logoCenterY);

    logoT.up().goTo([leftEyeX, leftEyeY]).down().arc(360, logoCircleRadius);
    logoT.up().goTo([rightEyeX, rightEyeY]).down().arc(360, logoCircleRadius);

    const logoAdditionalCircleRadius = 37 * scale;
    const [additionalCircleX, additionalCircleY] = transformCoord(logoCenterX + 1, logoCenterY - 45);
    logoT.up().goTo([additionalCircleX, additionalCircleY]).down().arc(360, logoAdditionalCircleRadius);

    const logoCorner1 = transformCoord(37, 30);
    const logoCorner2 = transformCoord(48, 30);
    const logoCorner3 = transformCoord(55, 40);
    const logoCorner4 = transformCoord(30, 40);

    const squareTranslation = [-22 * scale, 50 * scale];
    const squareRotation = 39;

    let squareVertices = [logoCorner1, logoCorner2, logoCorner3, logoCorner4];

    squareVertices = squareVertices.map(vertex => [
        vertex[0] + squareTranslation[0],
        vertex[1] + squareTranslation[1]
    ]);

    const squareCenter = [
        (squareVertices[0][0] + squareVertices[2][0]) / 2,
        (squareVertices[0][1] + squareVertices[2][1]) / 2
    ];

    squareVertices = squareVertices.map(vertex => 
        rotatePoint(squareCenter[0], squareCenter[1], vertex[0], vertex[1], squareRotation)
    );

    logoT.up().goTo(squareVertices[0]).down()
        .goTo(squareVertices[1])
        .goTo(squareVertices[2])
        .goTo(squareVertices[3])
        .goTo(squareVertices[0]);

    let logoTriangleVertices = [
        transformCoord(centerX - 20, centerY - 40),
        transformCoord(centerX + 20, centerY - 40),
        transformCoord(centerX, centerY + 20)
    ];

    const triangleMoveX = -42 * scale;
    const triangleMoveY = 56 * scale;

    logoTriangleVertices = logoTriangleVertices.map(vertex => 
        [vertex[0] + triangleMoveX, vertex[1] + triangleMoveY]
    );

    const logoTriangleCenter = [
        (logoTriangleVertices[0][0] + logoTriangleVertices[1][0] + logoTriangleVertices[2][0]) / 3,
        (logoTriangleVertices[0][1] + logoTriangleVertices[1][1] + logoTriangleVertices[2][1]) / 3
    ];

    const triangleScaleFactor = bt.randInRange(0.7, 0.80);
    logoTriangleVertices = logoTriangleVertices.map(vertex => 
        [(vertex[0] - logoTriangleCenter[0]) * triangleScaleFactor + logoTriangleCenter[0], 
         (vertex[1] - logoTriangleCenter[1]) * triangleScaleFactor + logoTriangleCenter[1]]
    );

    const logoTriangleRotation = 39;
    logoTriangleVertices = logoTriangleVertices.map(vertex => 
        rotatePoint(logoTriangleCenter[0], logoTriangleCenter[1], vertex[0], vertex[1], logoTriangleRotation)
    );

    logoT.up().goTo(logoTriangleVertices[0]).down()
        .goTo(logoTriangleVertices[1])
        .goTo(logoTriangleVertices[2])
        .goTo(logoTriangleVertices[0]);

    const logoWidth = 135 * scale;
    const logoHeight = 69 * scale;
    const logoSmileOffsetY = -54 * scale;
    const [smileStartX, smileStartY] = transformCoord(logoCenterX - logoWidth/2, logoCenterY + logoSmileOffsetY);

    logoT.up().goTo([smileStartX, smileStartY]).down();

    const logoCurveControlPoints = [
        transformCoord(logoCenterX - logoWidth/3, logoCenterY + logoSmileOffsetY),
        transformCoord(logoCenterX - logoWidth/bt.randInRange(3, 5), logoCenterY + logoSmileOffsetY - logoHeight),
        transformCoord(logoCenterX + logoWidth/bt.randInRange(3, 5), logoCenterY + logoSmileOffsetY - logoHeight),
        transformCoord(logoCenterX + logoWidth/3, logoCenterY + logoSmileOffsetY)
    ];

    const logoSmile = bt.nurbs(logoCurveControlPoints, { steps: 332, degree: 3.0 });

    const logoLines = logoT.lines();
    drawLines([logoLines[0]], { fill: bluecolor() });
    drawLines([logoLines[1]], { fill: bluecolor() });
    drawLines([logoLines[2]]);
    drawLines([logoLines[3]], { fill: orangeColor() });
    drawLines([logoLines[4]], { fill: orangeColor() });
    drawLines([logoSmile], { stroke: "red", width: bt.randInRange(2, 14) * scale });
}

function drawFriesBox(options = {}) {
    const {
        corner1 = [0, 0],
        corner2 = [0, 40],
        corner3 = [30, 40],
        corner4 = [30, 0],
        boxTranslate = [0, 0],
        boxColor = redColor,
        fryColor = "rgb(255, 165, 0)",
        rows = 5,
        friesPerRow = 4,
        fryOffset = 0,
        firstFryRotation = 0,
        lastFryRotation = 0
    } = options;

    function drawFlatRectangle(x, y, width, height) {
        const t = new Turtle();
        t.up().goTo([x, y]);
        t.down()
         .forward(width)
         .left(90)
         .forward(height)
         .left(90)
         .forward(width)
         .left(90)
         .forward(height);
        return t.lines()[0];
    }

    const boxWidth = Math.max(corner1[0], corner2[0], corner3[0], corner4[0]) - 
                     Math.min(corner1[0], corner2[0], corner3[0], corner4[0]);
    const boxHeight = Math.max(corner1[1], corner2[1], corner3[1], corner4[1]) - 
                      Math.min(corner1[1], corner2[1], corner3[1], corner4[1]);

    const fryWidth = boxWidth / (friesPerRow * 1.2);
    const fryHeight = boxHeight * 0.7;
    const horizontalGap = (boxWidth - fryWidth * friesPerRow) / (friesPerRow + 1);
    const verticalGap = boxHeight * 0.05;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < friesPerRow; col++) {
            const fryX = boxTranslate[0] + horizontalGap + (fryWidth + horizontalGap) * col;
            const fryY = boxTranslate[1] + fryOffset + verticalGap + (boxHeight - fryHeight) / (rows - 1) * row;

            let fryAngle = randInRange(-5, 5);

            if (col === 0) {
                fryAngle += firstFryRotation;
            } else if (col === friesPerRow - 1) {
                fryAngle += lastFryRotation;
            }

            const fryScale = randInRange(0.9, 1.1);
            const fryWidthScaled = fryWidth * fryScale;
            const fryHeightScaled = fryHeight * fryScale;
            fryAngle += randInRange(-5, 5);

            const fryPoints = drawFlatRectangle(fryX, fryY, fryWidthScaled, fryHeightScaled);

            const rotatedFryPoints = fryPoints.map(point => 
                rotatePoint(fryX + fryWidthScaled / 2, fryY + fryHeightScaled / 2, point[0], point[1], fryAngle)
            );

            drawLines([rotatedFryPoints], { fill: fryColor, stroke: "black", width: 1 });

            const dotRadius = 0.05;
            const dotColor = "rgba(255, 255, 255, 0.7)";
            for (let i = 0; i < 50; i++) {
                const dotX = fryX + randInRange(0, fryWidthScaled);
                const dotY = fryY + randInRange(0, fryHeightScaled);
                const dotTurtle = new Turtle();
                dotTurtle.up().goTo([dotX, dotY]).down().arc(360, dotRadius);
                drawLines([dotTurtle.lines()[0]], { fill: dotColor });
            }
        }
    }

    const boxPoints = [corner1, corner2, corner3, corner4, corner1];

    drawElement(boxPoints, {
        translate: boxTranslate,
        fill: boxColor(),
        stroke: "black",
        width: 2
    });
}

function handleClick() {
    const randomChoice = rand();
    if (randomChoice < 0.5) {
        drawWhippedCream({
            baseWidth: 102,
            baseHeight: 59,
            basePosition: [64 - 10, 46 - 20],
            creamColor: grayColor,
            centerRadius: 10,
            rotation: 162
        });
        drawCherry({
            cherryRadius: bt.randIntInRange(4, 7),
            stemLength: bt.randIntInRange(8, 15),
            cherryPosition: [84 + 36 / 2, 2 + 68 + 2],
            cherryColor: redColor,
            stemColor: "rgb(0, 100, 0)"
        });
        drawCup({
            cupWidth: 39,
            cupHeight: 49,
            cupTranslate: [83, 2],
            cupColor: redColor
        });
        drawFaceLogo({
            scale: 0.2,
            translate: [95, 28]
        });
    } else {
        drawFriesBox({
            corner1: [5, 0],
            corner2: [0, 40],
            corner3: [30, 41],
            corner4: [25, 0],
            boxTranslate: [89, 18],
            rows: 5,
            friesPerRow: 5,
            fryOffset: 20,
            firstFryRotation: 12,
            lastFryRotation: -13
        });
        drawFaceLogo({
            scale: 0.2,
            translate: [95, 28]
        });
    }
}

handleClick();

drawLines([polylines[0]], { fill: bluecolor() });
drawLines([polylines[1]], { fill: bluecolor() });
drawLines([polylines[2]]);
drawLines([polylines[3]], { fill: orangeColor() });
drawLines([polylines[4]], { fill: grayColor() });
