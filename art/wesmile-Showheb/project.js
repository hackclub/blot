/* 
@title: wesmile
@author: Showheb
@snapshots: 1.png
*/

const width = 210; 
const height = 297; 

setDocDimensions(width, height);

const drawSpirals = (numSpirals, radiusIncrement) => {
    for (let i = 0; i < numSpirals; i++) {
        const angle = (i * Math.PI) / 8;
        const radius = i * radiusIncrement;
        const x1 = (width / 2) + radius * Math.cos(angle);
        const y1 = (height / 2) + radius * Math.sin(angle);
        const x2 = (width / 2) + (radius + radiusIncrement) * Math.cos(angle + Math.PI / 8);
        const y2 = (height / 2) + (radius + radiusIncrement) * Math.sin(angle + Math.PI / 8);
        drawLines([[[x1, y1], [x2, y2]]]);
    }
};

const drawFace = (xCenter, yCenter, faceRadius, eyeOffset, eyeSize, irisSize) => {
    const faceOutline = [];
    for (let angle = 0; angle < 360; angle += 10) {
        const rad = (angle * Math.PI) / 180;
        faceOutline.push([xCenter + faceRadius * Math.cos(rad), yCenter + faceRadius * Math.sin(rad)]);
    }
    drawLines([faceOutline]);

    const drawEye = (xCenter, yCenter) => {
        const eyeOutline = [];
        const irisOutline = [];
        for (let angle = 0; angle < 360; angle += 10) {
            const rad = (angle * Math.PI) / 180;
            eyeOutline.push([xCenter + eyeSize * Math.cos(rad), yCenter + eyeSize * Math.sin(rad)]);
            irisOutline.push([xCenter + irisSize * Math.cos(rad), yCenter + irisSize * Math.sin(rad)]);
        }
        drawLines([eyeOutline, irisOutline]);
    };

    drawEye(xCenter - eyeOffset, yCenter + 4); 
    drawEye(xCenter + eyeOffset, yCenter + 4); 
};

const drawMultipleFaces = (numFaces) => {
    for (let i = 0; i < numFaces; i++) {
        const xOffset = Math.random() * (width - 20) + 10; 
        const yOffset = Math.random() * (height - 20) + 10; 
        drawFace(xOffset, yOffset, 8, 4, 2, 1); 
    }
};

const drawMoreSpirals = (numSpirals, radiusIncrement) => {
    for (let j = 0; j < 3; j++) { 
        drawSpirals(numSpirals, radiusIncrement * (1 + j * 0.1));
    }
};

drawMoreSpirals(80, 0.6); 
drawMultipleFaces(20); 

const drawEyelids = (xCenter, yCenter) => {
    const eyelidWidth = 3; 
    const eyelidHeight = 1; 

    const drawEyelid = (isUpper) => {
        const eyelid = [];
        for (let angle = isUpper ? -90 : 90; angle <= (isUpper ? 90 : 270); angle += 10) {
            const rad = (angle * Math.PI) / 180;
            eyelid.push([xCenter + eyelidWidth * Math.cos(rad), yCenter + (isUpper ? 3 + eyelidHeight : -3 - eyelidHeight) * Math.sin(rad)]);
        }
        drawLines([eyelid]);
    };

    drawEyelid(true);  
    drawEyelid(false); 
};

const drawEyelidsAroundAllFaces = () => {
    for (let i = 0; i < 20; i++) {
        const xOffset = Math.random() * (width - 20) + 10; 
        const yOffset = Math.random() * (height - 20) + 10; 
        drawEyelids(xOffset - 4, yOffset + 4); 
        drawEyelids(xOffset + 4, yOffset + 4); 
    }
};

drawEyelidsAroundAllFaces(); 

const drawMouths = () => {
    for (let i = 0; i < 20; i++) {
        const xOffset = Math.random() * (width - 20) + 10; 
        const yOffset = Math.random() * (height - 20) + 10; 
        drawLines([[[xOffset - 5, yOffset - 6], [xOffset + 5, yOffset - 6]]]); 
    }
};

drawMouths(); 