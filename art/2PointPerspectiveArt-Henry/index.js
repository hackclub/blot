/*
@title: 2 Point Perspective City Skyline
@author: Henry M
@snapshot: snapshot.png
*/

//For some reason the stars do not render in the snapshots. Hopefully this still gets approved!

const width = 125;
const height = 125;
setDocDimensions(width, height);


//Edit the parameters inside any draw() call to edit boxes, or call a new draw() inside one of the line arrays to make a new box
//The star coordinate varibles too!


function draw(horizon, VPX1, VPX2, FTV1, FTV2, MPX, MPY1, MPY2) {
  const m_MP2_VP1 = (MPY2 - horizon) / (MPX - VPX1)
  const m_MP1_VP1 = (MPY1 - horizon) / (MPX - VPX1)
  const m_MP1_VP2 = (MPY1 - horizon) / (MPX - VPX2)
  const m_MP2_VP2 = (MPY2 - horizon) / (MPX - VPX2)

  const finalLines = [];

  // create a polyline
  const polyline = [
    [MPX, MPY1],
    [MPX, MPY2],
    [(1 - FTV1) * (MPX), m_MP2_VP1 * (1 - FTV1) * MPX - m_MP2_VP1 * MPX + MPY2],
    [(1 - FTV1) * (MPX), m_MP1_VP1 * (1 - FTV1) * MPX - m_MP1_VP1 * MPX + MPY1],
    [MPX, MPY1],
    [(1 + FTV2) * (MPX), m_MP1_VP2 * (1 + FTV2) * MPX - m_MP1_VP2 * MPX + MPY1],
    [(1 + FTV2) * (MPX), m_MP2_VP2 * (1 + FTV2) * MPX - m_MP2_VP2 * MPX + MPY2],
    [MPX, MPY2]
  ];

  return polyline;
}

function loss() {

  const horizon = 67
  const VP1 = 0
  const VP2 = 125

  const loss = [draw(horizon, VP1, VP2, 0.2, 0.2, 26, 67, 107),
    draw(horizon, VP1, VP2, 0.11, 0.1, 72, 67, 107),
    draw(horizon, VP1, VP2, 0.1, 0.1, 94, 67, 92),
    draw(horizon, VP1, VP2, 0.1, 0.3, 43, 10, 62),
    draw(horizon, VP1, VP2, 0.1, 0.3, 23, 10, 62),
    draw(horizon, VP1, VP2, 0.2, 0.1, 104, 26, 39),
    draw(horizon, VP1, VP2, 0.1, 0.1, 74, 11, 62),
  ]
  drawLines(loss)
}

function skyline() {
  const horizon = 0
  const vp1 = -150
  const vp2 = 225

  const star1X=81
  const star1Y=110

  const star2X=94
  const star2Y=88

  const star3X= 106
  const star3Y= 110

  const star4X= 93
  const star4Y= 120

  const star5X = 97
  const star5Y = 102
  
  const stars = [[
    [star1X, star1Y],
    [star1X+1,star1Y],
    [star1X+1, star1Y+1],
    [star1X, star1Y+1],
    [star1X,star1Y+1]
  ],
  [
    [star2X, star2Y],
    [star2X+1,star2Y],
    [star2X+1, star2Y+1],
    [star2X, star2Y+1],
    [star2X,star2Y]
  ],
  [
    [star3X, star3Y],
    [star3X+1,star3Y],
    [star3X+1, star3Y+1],
    [star3X, star3Y+1],
    [star3X,star3Y]
  ],
  [
    [star4X, star4Y],
    [star4X+1,star4Y],
    [star4X+1, star4Y+1],
    [star4X, star4Y+1],
    [star4X,star4Y]
  ],
  [
    [star5X, star5Y],
    [star5X+0.5,star5Y],
    [star5X+0.5, star5Y+0.5],
    [star5X, star5Y+0.5],
    [star5X,star5Y]
  ],
  ]             
  
  const bg = [
    [0,0],
    [0,125],
    [125, 125],
    [125, 0],
    [0,0]
  ];
  const redBuildings = [
    draw(horizon, vp1, vp2, 1, 1.3, 10, 0, 84),
    draw(horizon, vp1, vp2, 0.199, 0.1, 103, 0, 35),
  ]

  const greenBuildings = [
    draw(horizon, vp1, vp2, 0.343, 0.2, 35, 0, 57),
    draw(horizon, vp1, vp2, 0.07, 0.0333, 121, 0, 65)
  ]

  const blueBuildings = [
    draw(horizon, vp1, vp2, 0.24, 0.5, 55, 0, 109)
  ]

  drawLines([bg], {fill:"black"})
  drawLines(stars, {fill:"yellow"})
  drawLines(redBuildings, {fill: "red"})
  drawLines(greenBuildings, {fill: "green"})
  drawLines(blueBuildings, {fill: "blue"})
  
}

//loss()
skyline()