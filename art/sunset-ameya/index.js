// important consts

const WIDTH = 125; 
const HEIGHT = 125;
const WINDOWSIZE = 3; // width and height of building windows
const WINDOWGAP = WINDOWSIZE / 3
const HORIZON = 45; // holds the y-val of the horizon
const SUNRAD = 36;
const RAYNUM = 12

const leftArcEnd = (WIDTH - (SUNRAD * 2)) / 2;
const rightArcEnd = leftArcEnd + (SUNRAD * 2);

// functions

function SDFCircle(pt, x, y, radius) {
  let ptVal = 0; // holds the SDF value of the point, will be returned at end of fn

  const ptX = pt[0];
  const ptY = pt[1];

  const length = Math.sqrt( ((ptX - x)**2) + ((ptY - y)**2) )

  ptVal = length - radius;

  return ptVal
}

function SDFRect(pt, x, y, width, height) {// basic implementation
  let ptVal = 0;
  
  const ptX = pt[0];
  const ptY = pt[1];

  const maxX = width + x;
  const maxY = height + y;

  if (( (ptX > x) && (ptX < maxX) ) && ( (ptY > y) && (ptY < maxY) )) {
    ptVal = 0;
  }
  else {
    ptVal = 1;
  }


  // const distX = () => {
  //   if (ptX < x) {
  //     return x - ptX;
  //   }
  //   else if (ptX > (width + x)) {
  //     return ((width + x) - ptX);
  //   }
  //   else {
  //     return 0;
  //   }
  // }

  // const distY = () => {
  //   if (ptY < y) {
  //     return y - ptY;
  //   }
  //   else if (ptY > (height + y)) {
  //     return ((height + y) - ptY);
  //   }
  //   else {
  //     return 0;
  //   }
  // }

  // const length = Math.sqrt( ((Math.max(distX, 0))**2) + ((Math.max(distY, 0))**2) )

  // const length = Math.sqrt( distX**2 + distY**2 );
  
  // ptVal = length;
    
  // const rectWidth = ptX - x - (width / 2);
  // const rectHeight = ptY - y - (height / 2);

  // const innerDist = Math.min(Math.max(rectWidth, rectHeight), 0);
  // const outerDist = Math.sqrt( (Math.max(rectWidth, 0))**2 + (Math.max(rectHeight, 0))**2 );

  // ptVal = innerDist + outerDist;

  return ptVal;
}

function pointCoord(angle, radius, x = 0, y = 0) { // returns the coords of a point provided a radius and an angle to subtend around a circle of that radius
  return [
    (Math.cos(angle) * radius) - radius + x,
    (Math.sin(angle) * radius) + y
  ];
};

function arc(angle, radius, x, y, points = 250) { // arc generation but good and precise
  const arc = createTurtle();
  const angleRad = angle * (Math.PI / 180);

  arc.jump([x,y]);

  let arcAngle = 0;

  for (let i = 1; i <= points; i++) {
    arcAngle += angleRad / points;    
    arc.goTo(pointCoord(arcAngle, radius, x, y));
  };
  
  arc.translate(
    [WIDTH / 2, HEIGHT / 2],
    [-radius, 0]
  );

  return arc
};

function building(x, y, width, height) {
  let tempBuilding = createTurtle();
  tempBuilding.jump([x, y]);
  tempBuilding.setAngle(90);

  tempBuilding.forward(height);
  tempBuilding.right(90);
  tempBuilding.forward(width);
  tempBuilding.right(90);
  tempBuilding.forward(height);

  let windows = createTurtle();

  for (let tempX = x; tempX < x + width - (2 * WINDOWSIZE); tempX += (WINDOWGAP + WINDOWSIZE)) { 
    // generates windows in a grid, the loop settings iterate the position of each window
    for (let tempY = y + 10; tempY < y + height - (2 * WINDOWSIZE); tempY += (WINDOWGAP + WINDOWSIZE)) {
      windows.jump([tempX, tempY]);
      windows.setAngle(90)
      
      for (let i = 0; i < 4; i++) { // draws the square for the window
        windows.forward(WINDOWSIZE);
        windows.right(90);
      }

      // TODO: may add shine on the windows using random numbers
      
    }
  }

  windows.translate( // centers the windows on the building
    tempBuilding.cc,
    windows.cc
  )

  tempBuilding.join(windows)
  
  return tempBuilding
}

// sun gen

let sun = createTurtle();

sun.join(arc(220, SUNRAD, 0, 10));

sun.rotate(-20, [WIDTH / 2, HEIGHT / 2])

// building gen

let buildings = createTurtle();
const maxWidth = 45;
let sdfParams = [];


for (let i = 0; i < 2; i++) {
  let x = 80 * i
  let buildingsWidth = 0;

  while (buildingsWidth < maxWidth) {
    let tempWidth = randIntInRange(6, 14);
    let tempHeight = randIntInRange(20, 49);

    if ((buildingsWidth + tempWidth) > maxWidth) {
      break;
    }

    if (leftArcEnd > x && leftArcEnd < (x + tempWidth)) {
      sun.iteratePath(pt => {
        let [x, y] = pt;
        if (x < (WIDTH / 2) && y < (HORIZON + tempHeight)) {
          return "REMOVE";
        }
        return [x, y]
      })
    }

    if (rightArcEnd > x && rightArcEnd < (x + tempWidth)) {
      sun.iteratePath(pt => {
        let [x, y] = pt;
        if (x > (WIDTH / 2) && y < (HORIZON + tempHeight)) {
          return "REMOVE";
        }
        return [x, y]
      })
    }
    
    let tempBuilding = building(x, HORIZON, tempWidth, tempHeight);
    buildings.join(tempBuilding);

    x += tempWidth;
    buildingsWidth += tempWidth

    // sdfParams.push([x, HORIZON, tempWidth, tempHeight]);
  }

  if (buildingsWidth != maxWidth) {
    const leftoverWidth = maxWidth - buildingsWidth;
    const tempHeight = randIntInRange(20, 49);
    const tempBuilding = building(x, HORIZON, leftoverWidth, randIntInRange(20,49));
    buildings.join(tempBuilding);
  }
}


// sun.resample(0.01);

// ray gen

// for (let i = 0; i < RAYNUM; i++) {
//   let angle = i * (180 / RAYNUM);
//   let draw = true; // used to tell whether to draw or whether to skip
//   let ray = createTurtle();
//   let radius = SUNRAD + 5;
//   let rayEnd = pointCoord(angle, radius, 0, 0);
//   console.log(rayEnd)

//   ray.jump(rayEnd)

//   while ((rayEnd[0] > 0 && rayEnd[0] < 125) && (rayEnd[1] < 125)) {
//     radius += randIntInRange(6, 25);
//     if (draw) {
//       ray.goTo(pointCoord(angle, radius, 0, 0));
//     }
//     else {
//       ray.jump(pointCoord(angle, radius, 0, 0));
//     }

//     draw = !draw;
//   }

//   sun.join(ray)
// }

// buildings.resample(0.01);

// for (let fn of sdfParams) {  // SDF implementation for the sun path, only uncomment once sun function is done
//   sun.iteratePath( 
//     (pt, tValue) => {
//       let x = fn[0];
//       let y = fn[1];
//       let width = fn[2];
//       let height = fn[3];

//       if (SDFRect(pt, x, y, width, height) == 0) {
//         return "REMOVE";
//       }
//     }
//   )
// }

// wave gen

let waves = createTurtle();
const waveNum = 39;
const waveSpacing = HORIZON / waveNum;

for (let i = 0; i < waveNum; i++) {
  let tempWave = createTurtle();

  tempWave.jump([0, HORIZON - (i * waveSpacing)]);
  tempWave.forward(125);
  
  waves.join(tempWave);
}
  
waves.resample(2);

waves.iteratePath(pt => {
  let [x, y] = pt;
  let scale = (HORIZON - y) * 0.5
  y += randInRange(0,1)
  y += noise([x * 0.05]) * scale
  y *= 2
  y -= 40
  

  if (y < 0 || y > HORIZON) {
    return "REMOVE";
  }
  
  return [x, y];
})

drawTurtles([buildings, sun, waves]);