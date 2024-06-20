/*
@title: euFlag
@author: opensource25
@snapshot: snapshot1.png
*/

const number_of_stars = 12
const radius = 30
const star_size = 3

const width = 150;
const height = 100;
setDocDimensions(width, height);

function create_star(x, y, size, circleAngle) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        const angle = Math.PI / 2 + (Math.PI * 2 * i / 10);
        const length = i % 2 === 0 ? size : size / 2;  // Alternate between outer and inner points
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        points.push([endX, endY]);
    }
    
    const starLines = [];
    for (let i = 0; i < points.length; i++) {
        starLines.push([points[i], points[(i + 1) % points.length]]); // Connect each point to the next
    }
    
    return bt.rotate(starLines, -circleAngle)
}

for (let i = 0; i < number_of_stars; i++){
  const angle =  360/(number_of_stars*2)*i
  const star = bt.rotate(create_star(width/2, height/2+radius, star_size, angle), angle, [width/2, height/2]);
  drawLines(star);
}
