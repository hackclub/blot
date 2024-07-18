const width = 300;
const height = 300;
setDocDimensions(width, height);

function createCircle(radius, segments, centerX, centerY) {
    const path = [];
    const angleStep = (2 * Math.PI) / segments;

    for (let i = 0; i <= segments; i++) {
        const angle = i * angleStep;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        path.push([x, y]);
    }

    return path;
}

function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    const path = [];

    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        path.push([x, y]);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        path.push([x, y]);
        rot += step;
    }
    path.push([cx, cy - outerRadius]);
    return path;
}

const radius = 100;
const segments = 100;
const centerX = width / 2;
const centerY = height / 2;

const circlePath = createCircle(radius, segments, centerX, centerY);
drawLines([circlePath], { stroke: 'orange', fill: 'orange' });

const reflection1 = createCircle(20, 50, centerX - 30, centerY - 50);
drawLines([reflection1], { fill: 'rgba(255, 255, 255, 0.8)', stroke: 'rgba(255, 255, 255, 0.8)' });

const reflection2 = createCircle(10, 50, centerX + 50, centerY + 40);
drawLines([reflection2], { fill: 'rgba(255, 255, 255, 0.5)', stroke: 'rgba(255, 255, 255, 0.5)' });

const stars = [oneStar, twoStars, threeStars, fourStars, fiveStars, sixStars, sevenStars]

//////////////////////////////////////////////////////// One Star ///////////////////////////////////////////////
function oneStar(){
    const starPath = drawStar(centerX, centerY, 5, 12, 6);
    return [starPath]
}



//////////////////////////////////////////////////////// Two Stars ///////////////////////////////////////////////
function twoStars(){
    const starPath1 = drawStar(centerX - 27, centerY, 5, 12, 6);
    const starPath2 = drawStar(centerX + 27, centerY, 5, 12, 6);
    return [starPath1, starPath2]
}

//////////////////////////////////////////////////////// Three Stars ///////////////////////////////////////////////
function threeStars(){
const starPath1 = drawStar(centerX - 15, centerY - 23 , 5, 12, 6);
const starPath2 = drawStar(centerX -15, centerY+ 25, 5, 12, 6);
const starPath3 = drawStar(centerX + 32, centerY - 0, 5, 12, 6);
    return [starPath1, starPath2, starPath3];
}


//////////////////////////////////////////////////////// Four Stars ///////////////////////////////////////////////
function fourStars(){
const fourStarPath1 = drawStar(centerX - 15, centerY - 20, 5, 12, 6);
const fourStarPath2 = drawStar(centerX + 25, centerY - 20, 5, 12, 6);
const fourStarPath3 = drawStar(centerX - 25, centerY + 20, 5, 12, 6);
const fourStarPath4 = drawStar(centerX + 15, centerY + 20, 5, 12, 6);
    return [fourStarPath1, fourStarPath2, fourStarPath3, fourStarPath4];
}


//////////////////////////////////////////////////////// Five Stars ///////////////////////////////////////////////
function fiveStars(){
    const fiveStarPath1 = drawStar(centerX - 20, centerY - 25, 5, 12, 6);
const fiveStarPath2 = drawStar(centerX + 30, centerY - 25, 5, 12, 6);
const fiveStarPath3 = drawStar(centerX - 30, centerY + 25, 5, 12, 6);
const fiveStarPath4 = drawStar(centerX + 20, centerY + 25, 5, 12, 6);
const fiveStarPath5 = drawStar(centerX , centerY, 5, 12, 6);
    return [fiveStarPath1, fiveStarPath2, fiveStarPath3, fiveStarPath4, fiveStarPath5];
}


//////////////////////////////////////////////////////// Six Stars ///////////////////////////////////////////////
function sixStars(){
    const sixStarPath1 = drawStar(centerX - 12, centerY - 25, 5, 12, 6);
const sixStarPath2 = drawStar(centerX + 18, centerY - 25, 5, 12, 6);
const sixStarPath3 = drawStar(centerX - 12, centerY + 25, 5, 12, 6);
const sixStarPath4 = drawStar(centerX + 18, centerY + 25, 5, 12, 6);
const sixStarPath5 = drawStar(centerX - 30, centerY, 5, 12, 6);
const sixStarPath6 = drawStar(centerX + 30, centerY, 5, 12, 6);
    return [sixStarPath1, sixStarPath2, sixStarPath3, sixStarPath4, sixStarPath5, sixStarPath6];
}


//////////////////////////////////////////////////////// Seven Stars ///////////////////////////////////////////////
function sevenStars(){
    const sevenStarPath1 = drawStar(centerX - 15, centerY - 28, 5, 12, 6);
    const sevenStarPath2 = drawStar(centerX + 21, centerY - 28, 5, 12, 6);
    const sevenStarPath3 = drawStar(centerX - 15, centerY + 28, 5, 12, 6);
    const sevenStarPath4 = drawStar(centerX + 21, centerY + 28, 5, 12, 6);
    const sevenStarPath5 = drawStar(centerX - 33, centerY, 5, 12, 6);
    const sevenStarPath6 = drawStar(centerX + 33, centerY, 5, 12, 6);
    const sevenStarPath7 = drawStar(centerX , centerY, 5, 12, 6);
    return [sevenStarPath1, sevenStarPath2, sevenStarPath3, sevenStarPath4, sevenStarPath5, sevenStarPath6, sevenStarPath7];
}

function randomNo() {
  return Math.floor(Math.random() * 7) ;
}

drawLines(stars[randomNo()](), { fill: 'red' });

