/*
@title: Rock It
@author: Eugene
@snapshot: skinny-rocket.png
*/
const width = 150;
const height = 130;

const rocketWidth = 5;

const noseconeHeight = 30;
const payloadHeight = 40;
const boosterHeight = 40;
const engineHeight = 2;
const topEngineWidth = 3;
const bottomEngineWidth = 4;
const flameHeight = 12;
const flameFirstWidth = 3;
const flameSecondWidth = 4;
const flameThirdWidth = 3;
const finWidth = 20;
const finBottomHeight = 10;
const finTopHeight = 15;
const finDepth = 2;
const finOffset = 3;
const noseconeCurveCoefficient = 20;
const payloadCurveCoefficient = 20;
const innerWindowRadius = 0;
const outerWindowRadius = 0;

const rotateDegrees = -45;
const rotatePoint = [75,65]

setDocDimensions(width, height);
const rocketHeight = noseconeHeight + payloadHeight + boosterHeight + engineHeight + flameHeight;
const leftMargin = (width-rocketWidth)/2;
const rightMargin = (width-rocketWidth)/2+rocketWidth;
const bottomMargin = (height-rocketHeight)/2;
const topMargin = (height-rocketHeight)/2+rocketHeight;

const heightWithoutNosecone = bottomMargin+payloadHeight+boosterHeight+engineHeight+flameHeight;
const leftNoseCone = [bt.nurbs([[leftMargin, heightWithoutNosecone],[leftMargin+rocketWidth/4, heightWithoutNosecone + 5*noseconeHeight/6],[leftMargin+rocketWidth/2, heightWithoutNosecone + noseconeHeight]],{steps: 100, degree: 2})];
const rightNoseCone = [bt.nurbs([[leftMargin+rocketWidth, heightWithoutNosecone],[leftMargin+3*rocketWidth/4, heightWithoutNosecone + 5*noseconeHeight/6],[leftMargin+rocketWidth/2, heightWithoutNosecone + noseconeHeight]],{steps: 100, degree: 2})];

const noseconeCurve = [bt.nurbs([[leftMargin, heightWithoutNosecone],[leftMargin+rocketWidth/2, heightWithoutNosecone + noseconeHeight/noseconeCurveCoefficient],[leftMargin+rocketWidth, heightWithoutNosecone]],{steps: 100, degree: 2})];
const leftPayload = [[leftMargin, heightWithoutNosecone], [leftMargin, heightWithoutNosecone-payloadHeight]]; 
const rightPayload = [[leftMargin + rocketWidth, heightWithoutNosecone - payloadHeight], [leftMargin + rocketWidth, heightWithoutNosecone]];

const innerWindow = [bt.nurbs([[leftMargin + rocketWidth/2, heightWithoutNosecone - payloadHeight/2+innerWindowRadius],[leftMargin+rocketWidth/2+innerWindowRadius, heightWithoutNosecone - payloadHeight/2],[leftMargin+rocketWidth/2, heightWithoutNosecone - payloadHeight/2-innerWindowRadius],[leftMargin+rocketWidth/2-innerWindowRadius, heightWithoutNosecone-payloadHeight/2],[leftMargin + rocketWidth/2, heightWithoutNosecone - payloadHeight/2+innerWindowRadius]],{steps: 100, degree: 3})];
const outerWindow = [bt.nurbs([[leftMargin + rocketWidth/2, heightWithoutNosecone - payloadHeight/2+outerWindowRadius],[leftMargin+rocketWidth/2+outerWindowRadius, heightWithoutNosecone - payloadHeight/2],[leftMargin+rocketWidth/2, heightWithoutNosecone - payloadHeight/2-outerWindowRadius],[leftMargin+rocketWidth/2-outerWindowRadius, heightWithoutNosecone-payloadHeight/2],[leftMargin + rocketWidth/2, heightWithoutNosecone - payloadHeight/2+outerWindowRadius]],{steps: 100, degree: 3})];

const heightWithoutBooster = bottomMargin+engineHeight+flameHeight;
const payloadCurve = [bt.nurbs([[leftMargin, heightWithoutBooster + boosterHeight],[leftMargin+rocketWidth/2, heightWithoutBooster + boosterHeight + payloadHeight/payloadCurveCoefficient],[leftMargin+rocketWidth, heightWithoutBooster + boosterHeight]],{steps: 100, degree: 2})];
const booster = [[leftMargin, heightWithoutBooster+boosterHeight], [leftMargin, heightWithoutBooster], [leftMargin + rocketWidth, heightWithoutBooster], [leftMargin + rocketWidth, heightWithoutBooster + boosterHeight]];

const leftFin = [[leftMargin, heightWithoutBooster+finOffset], [leftMargin-finWidth, heightWithoutBooster+finOffset], [leftMargin-finWidth, heightWithoutBooster+finBottomHeight+finOffset], [leftMargin, heightWithoutBooster+finBottomHeight+finTopHeight+finOffset]];
const rightFin = [[rightMargin, heightWithoutBooster+finOffset], [rightMargin+finWidth, heightWithoutBooster+finOffset], [rightMargin+finWidth, heightWithoutBooster+finBottomHeight+finOffset], [rightMargin, heightWithoutBooster+finBottomHeight+finTopHeight+finOffset]];
const middleFinBottomPart = [[leftMargin+rocketWidth/2-finDepth/2, heightWithoutBooster+finOffset], [leftMargin+rocketWidth/2-finDepth/2, heightWithoutBooster+finOffset+finBottomHeight], [leftMargin+rocketWidth/2+finDepth/2, heightWithoutBooster+finBottomHeight+finOffset], [leftMargin+rocketWidth/2+finDepth/2, heightWithoutBooster+finOffset],[leftMargin+rocketWidth/2-finDepth/2, heightWithoutBooster+finOffset]];
const middleFinTopPart = [[leftMargin+rocketWidth/2-finDepth/2, heightWithoutBooster+finOffset+finBottomHeight], [leftMargin+rocketWidth/2-finDepth/2, heightWithoutBooster+finOffset+finBottomHeight+finTopHeight], [leftMargin+rocketWidth/2+finDepth/2, heightWithoutBooster+finOffset+finBottomHeight+finTopHeight],[leftMargin+rocketWidth/2+finDepth/2, heightWithoutBooster+finOffset+finBottomHeight]];

const engine = [[leftMargin+(rocketWidth-topEngineWidth)/2, heightWithoutBooster], [leftMargin+(rocketWidth-bottomEngineWidth)/2, heightWithoutBooster-engineHeight], [leftMargin+(rocketWidth-bottomEngineWidth)/2+bottomEngineWidth, heightWithoutBooster-engineHeight],[leftMargin+(rocketWidth-topEngineWidth)/2+topEngineWidth, heightWithoutBooster]];

const heightWithoutEngine = bottomMargin + flameHeight;
const center = leftMargin + rocketWidth/2
const flameLeft1 = [bt.nurbs([[center - flameFirstWidth/2, heightWithoutEngine],[center - flameFirstWidth/2 - flameSecondWidth/8, heightWithoutEngine - flameHeight/6],[center - flameSecondWidth/2, heightWithoutEngine - flameHeight/3]],{steps: 100, degree: 2})];
const flameLeft2 = [bt.nurbs([[center - flameSecondWidth/2, heightWithoutEngine - flameHeight/3], [center - flameSecondWidth/2 + 0.8*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/8], [center - flameSecondWidth/2 + 0.6*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/10]],{steps: 100, degree: 2})];
const flameLeft3 = [bt.nurbs([[center - flameSecondWidth/2 + 0.6*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/10], [center-flameSecondWidth/2, heightWithoutEngine-flameHeight/3 - flameHeight/6], [center-flameThirdWidth/2, heightWithoutEngine-2*flameHeight/3]],{steps: 100, degree: 2})];
const flameLeft4 = [bt.nurbs([[center-flameThirdWidth/2, heightWithoutEngine-2*flameHeight/3], [center-flameThirdWidth/2+0.6*flameFirstWidth/5, heightWithoutEngine-2*flameHeight/3+flameHeight/8], [center-flameThirdWidth/2+0.4*flameFirstWidth/5, heightWithoutEngine - 2*flameHeight/3 + flameHeight/10]],{steps: 100, degree: 2})];
const flameLeft5 = [bt.nurbs([[center-flameThirdWidth/2+0.4*flameFirstWidth/5, heightWithoutEngine - 2*flameHeight/3 + flameHeight/10], [center-flameThirdWidth/2, heightWithoutEngine - 2*flameHeight/3], [center, heightWithoutEngine - 5.5*flameHeight/6]],{steps: 100, degree: 2})];

const flameRight1 = [bt.nurbs([[center + flameFirstWidth/2, heightWithoutEngine],[center + flameFirstWidth/2 + flameSecondWidth/8, heightWithoutEngine - flameHeight/6],[center + flameSecondWidth/2, heightWithoutEngine - flameHeight/3]],{steps: 100, degree: 2})];
const flameRight2 = [bt.nurbs([[center + flameSecondWidth/2, heightWithoutEngine - flameHeight/3], [center + flameSecondWidth/2 - 0.8*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/8], [center + flameSecondWidth/2 - 0.6*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/10]],{steps: 100, degree: 2})];
const flameRight3 = [bt.nurbs([[center + flameSecondWidth/2 - 0.6*flameFirstWidth/5, heightWithoutEngine - flameHeight/3 + flameHeight/10], [center+flameSecondWidth/2, heightWithoutEngine-flameHeight/3 - flameHeight/6], [center+flameThirdWidth/2, heightWithoutEngine-2*flameHeight/3]],{steps: 100, degree: 2})];
const flameRight4 = [bt.nurbs([[center+flameThirdWidth/2, heightWithoutEngine-2*flameHeight/3], [center+flameThirdWidth/2-0.6*flameFirstWidth/5, heightWithoutEngine-2*flameHeight/3+flameHeight/8], [center+flameThirdWidth/2-0.4*flameFirstWidth/5, heightWithoutEngine - 2*flameHeight/3 + flameHeight/10]],{steps: 100, degree: 2})];
const flameRight5 = [bt.nurbs([[center+flameThirdWidth/2-0.4*flameFirstWidth/5, heightWithoutEngine - 2*flameHeight/3 + flameHeight/10], [center+flameThirdWidth/2, heightWithoutEngine - 2*flameHeight/3], [center, heightWithoutEngine - 5.5*flameHeight/6]],{steps: 100, degree: 2})];

bt.join(leftNoseCone, rightNoseCone, noseconeCurve, payloadCurve, innerWindow, outerWindow, flameLeft1, flameLeft2, flameLeft3, flameLeft4, flameLeft5, flameRight1, flameRight2, flameRight3, flameRight4, flameRight5);
bt.rotate(leftNoseCone, rotateDegrees, rotatePoint);
bt.rotate([leftPayload, rightPayload, booster, leftFin, rightFin, middleFinBottomPart, middleFinTopPart, engine], rotateDegrees, rotatePoint);

drawLines(leftNoseCone);
drawLines([leftPayload, rightPayload, booster, leftFin, rightFin, middleFinBottomPart, middleFinTopPart, engine]);