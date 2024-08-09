/*
@title: Smoothly Running Into Chaos
@author: Isaac LeMieux
@snapshot: snapshot1.png
*/
/*
Description:
  Each pillar represents someone and when no people/pillars are touch it looks consistant and organized
  but when pillars overlap or cross paths
  they can seem very disorganized or chaotic from above even though each line is still going down its own path consistantly untill its end
*/


//user editable variable:
const linesPerSide = 4




const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];


function bottomPillar(x, y, thickness, point){
  finalLines.push([[x, 0],[x, y]])
  finalLines.push(bt.nurbs([[x, y], [x + (thickness/2), y + point], [x + thickness, y]]))
  finalLines.push([[x + thickness, 0],[x + thickness, y]])

  //fill in lines
  for (var i = 0; i < y; i++){
    finalLines.push([[x, i], [x + thickness, i + 1]])
  }


}

function topPillar(x, y, thickness, point){
  finalLines.push([[x, height],[x, y]])
  finalLines.push(bt.nurbs([[x, y], [x + (thickness/2), y - point], [x + thickness, y]]))
  finalLines.push([[x + thickness, height],[x + thickness, y]])
  
  for (var i = height; i > y; i--){
    finalLines.push([[x, i], [x + thickness, i - 1]])
  }
}

function leftPillar(x, y, thickness, point){
  finalLines.push([[0, y],[x, y]])
  finalLines.push(bt.nurbs([[x, y], [x + point, y - (thickness/2)], [x, y - thickness]]))
  finalLines.push([[x, y - thickness], [0, y - thickness]])

  for (var i = 0; i < x; i++){
    finalLines.push([[i, y], [i + 1, y - thickness]])
  }
}

function rightPillar(x, y, thickness, point){
  finalLines.push([[width, y],[x, y]])
  finalLines.push(bt.nurbs([[x, y], [x - point, y - (thickness/2)], [x, y - thickness]]))
  finalLines.push([[x, y - thickness], [width, y - thickness]])

  for (var i = width; i > x; i--){
    finalLines.push([[i, y], [i - 1, y - thickness]])
  }
}

/*
bottomPillar(97,78,10,7)
topPillar(83,25,8,10)
leftPillar(114,46,8,11)
rightPillar(79,65,7,6)
*/


for(var i = 0; i<linesPerSide; i++){
  bottomPillar(bt.randIntInRange(20, width-20), bt.randIntInRange(20, height-20), bt.randIntInRange(5,15), bt.randIntInRange(5,20))
  topPillar(bt.randIntInRange(20, width-20), bt.randIntInRange(20, height-20), bt.randIntInRange(5,15), bt.randIntInRange(5,20))
  leftPillar(bt.randIntInRange(20, width-20), bt.randIntInRange(20, height-20), bt.randIntInRange(5,15), bt.randIntInRange(5,20))
  rightPillar(bt.randIntInRange(20, width-20), bt.randIntInRange(20, height-20), bt.randIntInRange(5,15), bt.randIntInRange(5,20))
}


// draw it
drawLines(finalLines);