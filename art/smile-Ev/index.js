/*
@title: Smile
@author: Ev!
@snapshot: smile1
*/

/////////////////////////////////////////////////////Setup
const width = 200;
const height = 200;
setDocDimensions(width, height);

/////////////////////////////////////////////////////Editable Values!
const numPoints = 50; // Smoothness of circle + smile
const circleRadius = 90; // size of circle
const smileRadius = 50; // size of smile
const centerX = 100; // face horizontal position
const centerY = 100; // face vertical position
const distHor = 25; //eye spacing
const distVer = 0; //eye place
const distMove = 50; //eye size

/////////////////////////////////////////////////////Eyes
const xOne = centerX - distHor
const xTwo = centerX + distHor
const yOne = centerY + distVer
const yTwo = centerY + distVer + distMove
drawLines([
    [[xOne, yOne], [xOne, yTwo]],
    [[xTwo, yOne], [xTwo, yTwo]]
])
////////////////////////////////////////////////////Circle
///////////////////////////////////////////////Right
const rightPoints = [];
for (let i = 0; i <= numPoints; i++) {
    const angle = ((numPoints / 2 - i) / numPoints) * Math.PI;
    const x = centerX + circleRadius * Math.cos(angle);
    const y = centerY - circleRadius * Math.sin(angle);
    rightPoints.push([x, y]);
}
drawLines([rightPoints]);

///////////////////////////////////////////////Left Circle
const leftPoints = [];
for (let i = 0; i <= numPoints; i++) {
    const angle = ((numPoints / 2 - i) / numPoints) * Math.PI;
    const x = centerX - circleRadius * Math.cos(angle);
    const y = centerY - circleRadius * Math.sin(angle);
    leftPoints.push([x, y]);
}
drawLines([leftPoints]);

//////////////////////////////////////////////////////Smile 
/////////////////////////////////////////////Right
const sRightPoints = [];
for (let i = 0; i <= numPoints / 2; i++) {
    const angle = ((numPoints / 2 - i) / numPoints) * Math.PI;
    const x = centerX + smileRadius * Math.cos(angle);
    const y = centerY - smileRadius * Math.sin(angle);
    sRightPoints.push([x, y]);
}
drawLines([sRightPoints]);

/////////////////////////////////////////////Left
const lRightPoints = [];
for (let i = 0; i <= numPoints / 2; i++) {
    const angle = ((numPoints / 2 - i) / numPoints) * Math.PI;
    const x = centerX - smileRadius * Math.cos(angle);
    const y = centerY - smileRadius * Math.sin(angle);
    lRightPoints.push([x, y]);
}
drawLines([lRightPoints]);