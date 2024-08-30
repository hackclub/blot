/*
@title: Blot²
@author: Mohid
@snapshot: snapshot1.png
*/
let finalLines = []
let predrawpreskew = ''
// How to make the blot draw using your own code:
// 1. Your drawing MUST be 125x125
// 2. There should be a variable called 'finalLines' which contains all the lines which
//    make up your drawing
// 3. drawLines() should only be called once in your whole code
// 4. Replace the line 'drawLines(finalLines)' with 'predrawpreskew = finalLines'
// 5. Make sure finalLines is not preceded by 'const' or 'let' as it has already
//    been initialised above.
// 6. I recommend minifying your code using a site such as hack.club/441cnc
// 7. Paste your minified code here:







const x = 31
const y = 44

const transform = [
  [101.15-x,83.6-y],
  [128.07-x,114-y],
  [125-x,125-y],
  [51-x,88-y],
]

let xmove, ymove;

if (predrawpreskew === '') {
  xmove = 82;
  ymove = 54;
} else {
  let itemIndex = predrawpreskew.length - 1;
  xmove = predrawpreskew[itemIndex][predrawpreskew[itemIndex].length - 1][0];
  ymove = predrawpreskew[itemIndex][predrawpreskew[itemIndex].length - 1][1];
}

// drawLines(predrawpreskew)
// const drawer = [
//   predrawpreskew[predrawpreskew.length-item][predrawpreskew[predrawpreskew.length-item].length-item],
//   [0,0]
// ]
// console.log(predrawpreskew[predrawpreskew.length-item][predrawpreskew[predrawpreskew.length-item].length-item])
// drawLines([drawer])


function mapValue(value, min, max) {
    value = Math.max(0, Math.min(125, value));
    
    return min + (max - min) * (value / 125);
}

const xslide = 93 - mapValue(xmove, 2.8, 74.8);

const yslide = mapValue(ymove, -89.7, 70);


const pagewidth = 125;
const pageheight = 125;
setDocDimensions(pagewidth, pageheight);

finalLines = [];

// Scroll to the bottom and paste your blot code under the comment!

function withinBounds(value, min, max) {
    if (value === 'x' || value < min || value > max) {
        return Math.random() * (max - min) + min;
    }
    return value;
}


const posx = 81;
const posy = 89;

function ellipse(left, right, top, bottom, numPoints = 100) {
  const x_center = (left + right) / 2;
  const y_center = (top + bottom) / 2;
  const r_x = (right - left) / 2;
  const r_y = (top - bottom) / 2;

  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const theta = (i / numPoints) * 2 * Math.PI;
    const x = x_center + r_x * Math.cos(theta);
    const y = y_center + r_y * Math.sin(theta);
    points.push([x, y]);
  }

  return points;
}

const LSfrontSquare = [
  [posx - 50, posy - 2],
  [posx - 50, posy + 8],
  [posx - 42, posy + 7],
  [posx - 42, posy - 3],
  [posx - 50, posy - 2],
];
const LSbackSquare = bt.copy(LSfrontSquare);
bt.translate([LSbackSquare], [5, 5]);
const LSconnectingLines = [
  [posx - 50, posy + 8],
  [posx - 45, posy + 13],
  [posx - 37, posy + 12],
  [posx - 37, posy + 2],
  [posx - 42, posy - 3],
  [posx - 42, posy + 7],
  [posx - 37, posy + 12],
  [posx - 45, posy + 13],
  [posx - 50, posy + 8],
];

const LSrotor = [
  [posx - 44.5, posy + 15],
  [posx - 44.5, posy + 10],
  [posx - 43.5, posy + 10],
  [posx - 43.5, posy + 15],
  [posx - 44.5, posy + 15],
];
finalLines.push(LSrotor);

const LSstand = [
  [posx - 42, posy + 7],
  [posx - 45, posy - 11],
  [posx - 42.5, posy - 11],
  [posx - 40, posy - 9],
  [posx - 38.6, posy - 3],
  [posx - 33, posy + 3],
  [posx - 37, posy + 8.5],
  [posx - 39, posy + 6.5],
  [posx - 42, posy + 7],
  [posx - 45, posy - 11],
  [posx - 42.5, posy - 11],
  [posx - 39, posy + 6.5],
];

const LSmount = [
  [posx - 41, posy + 8],
  [posx - 38, posy + 11],
  [posx - 29, posy + 10.2],
  [posx - 29, posy + 0.7],
  [posx - 32, posy - 3],
  [posx - 41, posy - 2],
  [posx - 41, posy + 8],
  [posx - 32, posy + 7],
  [posx - 32, posy - 3],
  [posx - 32, posy + 7],
  [posx - 29, posy + 10.2],
  [posx - 32, posy + 7],
];

finalLines.push(
  ...bt.cover(
    bt.cover(bt.cover([LSconnectingLines], bt.cover([LSbackSquare], [LSfrontSquare])), [LSstand]),
    [LSmount]
  )
);

finalLines.push(
  ...bt.cover(bt.cover(bt.cover([LSconnectingLines], [LSstand]), [LSmount]), [LSmount])
);


const xrail = [
  [posx + 22, posy + 1.4],
  [posx - 30, posy + 7],
  [posx - 31.2, posy + 6],
  [posx + 20, posy + 0.4],
  [posx - 31.2, posy + 6],
  [posx - 31.2, posy + 4],
  [posx + 20, posy - 1.4],
  [posx - 31.2, posy + 4],
  [posx - 31.2, posy + 3],
  [posx + 20, posy - 2.4],
  [posx - 31.2, posy + 3],
  [posx - 31.2, posy + 1],
  [posx + 20, posy - 4.4],
  [posx + 20, posy + 0.4],
  [posx + 21, posy + 1.4],
];

console.log([posx + 40, posy + 1.4])
console.log([posx - 30, posy + 7])

const RSmount = [
  [posx + 22.5, posy + 4.2],
  [posx + 19.5, posy + 0.5],
  [posx + 19.5, posy - 6.7],
  [posx + 25, posy - 7.3],
  [posx + 28, posy + 3.6],
  [posx + 22.5, posy + 4.2],
  [posx + 19.5, posy + 0.5],
  [posx + 25.5, posy - 0.2],
];

const RSstand = [
  [posx + 24.7, posy - 1.2],
  [posx + 21, posy - 20],
  [posx + 24, posy - 20],
  [posx + 27.7, posy - 1.4],
  [posx + 27.7, posy - 10.8],
  [posx + 24, posy - 20],
  [posx + 27.7, posy - 10.8],
  [posx + 37.2, posy - 11.8],
  [posx + 37.7, posy - 2.5],
  [posx + 39.7, posy + 3.7],
  [posx + 27.6, posy + 4.9],
  [posx + 24.7, posy - 1.2],
  [posx + 37.7, posy - 2.5],
];

const RSrotor = [
  [posx + 33.5, posy + 7],
  [posx + 33.5, posy + 2],
  [posx + 32.5, posy + 2],
  [posx + 32.5, posy + 7],
  [posx + 33.5, posy + 7],
];
finalLines.push(RSrotor);
finalLines.push(RSstand);






const xStart = xrail[0][0];
const yStart = xrail[0][1];
const xEnd = xrail[1][0];
const yEnd = xrail[1][1];

const xPos = xStart + (xEnd - xStart) * (xslide / 100);
const yPos = yStart + (yEnd - yStart) * (xslide / 100);

const yRailGradient = (22.5 - 3.8) / (-10.2 + 26.9);

const yslideXOffset = (16.7) * (yslide / 100);
const yslideYOffset = yRailGradient * yslideXOffset;

const yrail = [
  [xPos + yslideXOffset, yPos + 22.5 + yslideYOffset],
  [xPos - 16.7 + yslideXOffset, yPos + 3.8 + yslideYOffset],
  [xPos - 15.1 + yslideXOffset, yPos + 3.5 + yslideYOffset],
  [xPos + 1.6 + yslideXOffset, yPos + 22.2 + yslideYOffset],
  [xPos - 15.1 + yslideXOffset, yPos + 3.5 + yslideYOffset],
  [xPos - 12.8 + yslideXOffset, yPos + 3.2 + yslideYOffset],
  [xPos + 3.9 + yslideXOffset, yPos + 22.2 + yslideYOffset],
  [xPos - 12.8 + yslideXOffset, yPos + 3.2 + yslideYOffset],
  [xPos - 11.1 + yslideXOffset, yPos + 3.1 + yslideYOffset],
  [xPos + 5.6 + yslideXOffset, yPos + 22.4 + yslideYOffset],
  [xPos - 11.1 + yslideXOffset, yPos + 3.1 + yslideYOffset],
  [xPos - 11.1 + yslideXOffset, yPos - 1.9 + yslideYOffset],
  [xPos + 5.6 + yslideXOffset, yPos + 17.9 + yslideYOffset],
];

const yclip = [
  [xPos + 5.6 + yslideXOffset, yPos + 17.9 + yslideYOffset],
  [xPos +5.6 + yslideXOffset, yPos + 22.2 + yslideYOffset],
  [xPos + 4.9 + yslideXOffset, yPos + 21.6 + yslideYOffset],
  [xPos + -0.3 + yslideXOffset, yPos + 22.0 + yslideYOffset],
  [xPos + -0.3 + yslideXOffset, yPos + 23.2 + yslideYOffset],
  [xPos + 1.4 + yslideXOffset, yPos + 24.8 + yslideYOffset],
  [xPos + 6.4 + yslideXOffset, yPos + 24.5 + yslideYOffset],
  [xPos + 6.4 + yslideXOffset, yPos + 16.8 + yslideYOffset],
  [xPos + 5.6 + yslideXOffset, yPos + 15.7 + yslideYOffset],
  [xPos +5.6 + yslideXOffset, yPos + 22.2 + yslideYOffset],
  [xPos + 4.9 + yslideXOffset, yPos + 21.6 + yslideYOffset],
  [xPos + 4.9 + yslideXOffset, yPos + 22.8 + yslideYOffset],
  [xPos + -0.3 + yslideXOffset, yPos + 23.2 + yslideYOffset],
  [xPos + 4.9 + yslideXOffset, yPos + 22.8 + yslideYOffset],
  [xPos + 6.4 + yslideXOffset, yPos + 24.5 + yslideYOffset],
];




const ymount = [
  [xPos + -18.7 + yslideXOffset, yPos + 4.0 + yslideYOffset],
  [xPos + -11.0 + yslideXOffset, yPos + 3.0 + yslideYOffset],
  [xPos + -11.0 + yslideXOffset, yPos + -10.8 + yslideYOffset],
  [xPos + -14.5 + yslideXOffset, yPos + -15.5 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + -14.5 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + 1.0 + yslideYOffset],
  [xPos + -18.7 + yslideXOffset, yPos + 4.0 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + 1.0 + yslideYOffset],
  [xPos + -14.2 + yslideXOffset, yPos + yslideYOffset],
  [xPos + -11.0 + yslideXOffset, yPos + 3.0 + yslideYOffset],
  [xPos + -14.2 + yslideXOffset, yPos + yslideYOffset],
  [xPos + -14.5 + yslideXOffset, yPos + -15.5 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + -14.5 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + 1.0 + yslideYOffset],
]

const ypenclip = [
  [xPos + -30.5 + yslideXOffset, yPos + -7.9 + yslideYOffset],
  [xPos + -13.4 + yslideXOffset, yPos + -10.7 + yslideYOffset],
  [xPos + -13.4 + yslideXOffset, yPos + -25.4 + yslideYOffset],
  [xPos + -30.5 + yslideXOffset, yPos + -22.6 + yslideYOffset],
  [xPos + -31.1 + yslideXOffset, yPos + -9.0 + yslideYOffset],
  [xPos + -30.5 + yslideXOffset, yPos + -7.9 + yslideYOffset],
  [xPos + -31.1 + yslideXOffset, yPos + -9.0 + yslideYOffset],
  [xPos + -13.8 + yslideXOffset, yPos + -11.7 + yslideYOffset],
  [xPos + -13.8 + yslideXOffset, yPos + -25.2 + yslideYOffset],
  [xPos + -13.8 + yslideXOffset, yPos + -11.7 + yslideYOffset],
  [xPos + -13.4 + yslideXOffset, yPos + -10.7 + yslideYOffset],
  [xPos + -13.4 + yslideXOffset, yPos + -25.4 + yslideYOffset],
]

const pen = [
  [xPos + -25.6 + yslideXOffset, yPos + 11.8 + yslideYOffset],
  [xPos + -24.6 + yslideXOffset, yPos + -31.9 + yslideYOffset],
  [xPos + -23.0 + yslideXOffset, yPos + -34.5 + yslideYOffset],
  [xPos + -21.5 + yslideXOffset, yPos + -31.5 + yslideYOffset],
  [xPos + -22.9 + yslideXOffset, yPos + 11.7 + yslideYOffset],
]

drawLines([ellipse(xPos + -25.6 + yslideXOffset, xPos + -22.9 + yslideXOffset, yPos + 12.3 + yslideYOffset, yPos + 11.3 + yslideYOffset)]);
finalLines.push(...bt.cover(bt.cover(bt.cover([LSfrontSquare], [LSstand]), [LSmount]), [pen]));
const yrailmount = [
  [xPos - -5.2, yPos + 8.4],
  [xPos + 5.2, yPos + 3.7],
  [xPos - 0.0, yPos + -1.5],
  [xPos - 18, yPos + 0.5],
  [xPos - 18, yPos + 4.8],
  [xPos - 11.9, yPos + 10.0],
  [xPos - -5.2, yPos + 8.4],
  [xPos - -0.1, yPos + 2.4],
  [xPos - 0.0, yPos + -1.5],
  [xPos - -0.1, yPos + 2.4],
  [xPos - 18, yPos + 4.5],
]

const bearing = []
const bottomcircle = ellipse(xPos - 6.7,xPos - 0.5, yPos + 6.2,yPos + 4.2)
const wheel = [
  [xPos - 6.7, yPos + 5.3],
  [xPos - 0.5, yPos + 5.3],
  [xPos - 0.5, yPos + 7.2],
  [xPos - 6.7, yPos + 7.2],
  [xPos - 6.7, yPos + 5.3],
]

const bearingleft = [
  [xPos - 6.7, yPos + 5.3],
  [xPos - 6.7, yPos + 7.2],
]

const bearingright = [
  [xPos - 0.5, yPos + 5.3],
  [xPos - 0.5, yPos + 7.2],
]
const topcircle = ellipse(xPos - 6.7,xPos - 0.5, yPos + 6.2,yPos + 8.2)
bearing.push(bearingleft)
bearing.push(bearingright)
bearing.push(topcircle)
bearing.push(...bt.cover([bottomcircle],[wheel]))

const bearing2 = bt.copy(bearing)
const bearing3 = bt.copy(bearing)
const bearing4 = bt.copy(bearing)

finalLines.push(...bt.cover(bt.cover([ymount],[pen]), [ypenclip]))

finalLines.push(...bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover([xrail], [RSmount]), [yrail]), [ymount]), [pen]), [yrail]), [yrailmount]), [ypenclip]));
finalLines.push(...bt.cover([RSmount], [RSstand]));

finalLines.push(...bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover([LSmount], [xrail]), [yrail]), [ymount]),[pen]), [ymount]), [ypenclip]));

finalLines.push(...bt.cover(bt.cover(bt.cover(bt.cover(bt.cover([LSstand], [LSmount]), [yrail]), [ymount]), [pen]), [ypenclip]));
finalLines.push(...bt.cover(bt.cover(bt.cover(bt.cover([yclip],[xrail]), [...bearing2]), [wheel]), bt.translate([bt.copy(wheel)], [4,6])));
finalLines.push(...bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover([yrail], [yclip]), [RSmount]), [...bearing2]), [...bearing]), [wheel]), bt.translate([bt.copy(wheel)], [4,6])), [ypenclip]));

const penclip = [
  [xPos + -27.4 + yslideXOffset, yPos + -9.58 + yslideYOffset],
  [xPos + -30.3 + yslideXOffset, yPos + -12.8 + yslideYOffset],
  [xPos + -30.3 + yslideXOffset, yPos + -23.8 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + -25.8 + yslideYOffset],
  [xPos + -18.8 + yslideXOffset, yPos + -21.9 + yslideYOffset],
  [xPos + -18.8 + yslideXOffset, yPos + -10.92 + yslideYOffset],
  [xPos + -20.6 + yslideXOffset, yPos + -10.64 + yslideYOffset],
  [xPos + -22.3 + yslideXOffset, yPos + -12.8 + yslideYOffset],
  [xPos + -27.4 + yslideXOffset, yPos + -12.0 + yslideYOffset],
  [xPos + -25.4 + yslideXOffset, yPos + -9.88 + yslideYOffset],
  [xPos + -27.4 + yslideXOffset, yPos + -9.58 + yslideYOffset],
  [xPos + -30.3 + yslideXOffset, yPos + -12.8 + yslideYOffset],
  [xPos + -22.3 + yslideXOffset, yPos + -14.3 + yslideYOffset],
  [xPos + -22.2 + yslideXOffset, yPos + -25.8 + yslideYOffset],
  [xPos + -22.3 + yslideXOffset, yPos + -14.3 + yslideYOffset],
  [xPos + -18.8 + yslideXOffset, yPos + -10.92+ yslideYOffset],
  [xPos + -22.3 + yslideXOffset, yPos + -14.3 + yslideYOffset],
  [xPos + -30.3 + yslideXOffset, yPos + -12.8 + yslideYOffset],

]

finalLines.push(penclip)
finalLines.push(...bt.cover(bt.cover([ypenclip],[pen]), [penclip]))
finalLines.push(...bt.cover([pen], [penclip]))

const belt = [
  [posx - 45, posy + 15],
  [posx + 35, posy + 6],
  [posx + 35, posy + 4],
  [posx - 45, posy + 13],
  [posx - 45, posy + 15],
]


finalLines.push(...bt.cover(bt.cover(bt.cover([belt],[yrail]),[yrailmount]), [pen]))

drawLines(bt.cover(bt.translate(bearing,[0,0.5]), [ymount]))
drawLines(bt.cover(bt.translate(bearing2,[4,6]), [ymount]))
drawLines(bt.cover(bt.cover(bt.cover(bt.translate(bearing3,[-5,7]), [yrail]), [yclip]), [ymount]))
drawLines(bt.cover(bt.cover(bt.cover(bt.cover(bt.translate(bearing4,[-10,2]), [yrail]), [pen]), [ypenclip]), [ymount]))
finalLines.push(...bt.cover(bt.cover(bt.cover([yrailmount],[yrail]), [pen]), [ymount]), [...bearing4])



let paper = [[[0, 0], [0, 125], [125, 125], [125, 0], [0, 0]]];

finalLines.push(...skew(paper))

drawLines(finalLines)



function skew(polyline) {
  const iterated = bt.iteratePoints(polyline, (pt, t) => {
    const [x, y] = pt;
    const skewXAmount = x*(transform[3][0]-transform[0][0]) + y*(transform[1][0]-transform[0][0])
    const skewYAmount = x*(transform[3][1]-transform[0][1]) + y*(transform[1][1]-transform[0][1])
    return [skewXAmount/125, skewYAmount/125];
  });
  console.log(typeof [...iterated]);
  return bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.scale(bt.translate(...[iterated], transform[0]), 1), [pen]), [penclip]), [ypenclip]), [ymount]), [yrail]), [xrail]), [RSmount])
}

function onlyskewANDclip(polyline) {
  const iterated = bt.iteratePoints(polyline, (pt, t) => {
    const [x, y] = pt;
    const skewXAmount = (y - 64) * 1.10;
    const skewYAmount = (x - 56) * -0.249;
    return [x + skewXAmount, y + skewYAmount];
  });
  console.log(typeof [iterated]);
  return bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.cover(bt.translate(bt.scale([iterated], 1), [1,8]), [pen]), [penclip]), [ypenclip]), [ymount]), [yrail]), [xrail]), [RSmount])
}




paper = [[[0, 0], [0, 125], [125, 125], [125, 0], [0, 0]]];
if (predrawpreskew != '') {
  drawLines(skew(predrawpreskew))
}
drawLines(paper)
