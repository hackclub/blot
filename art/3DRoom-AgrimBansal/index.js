/*
@title: 3D Room
@author: Agrim Bansal
@snapshot: 0.png
*/

class cuboid {
  constructor(location, length, width, height){
    this.p7 = location;
    let p7 = this.p7;
    this.p1 = [p7[0] + length, p7[1] + height, p7[2] + width];
    this.p2 = [p7[0] + length, p7[1] + height, p7[2] ];
    this.p3 = [p7[0] , p7[1] + height, p7[2] ];
    this.p4 = [p7[0] , p7[1] + height, p7[2] + width];
    this.p5 = [p7[0] + length, p7[1] , p7[2] + width];
    this.p6 = [p7[0] + length, p7[1] , p7[2] ];
    this.p8 = [p7[0] , p7[1] , p7[2] + width];
  }

  renderPointsIn2D(viewPoint){
    let points = [this.p1, this.p2, this.p3, this.p4, this.p5, this.p6, this.p7, this.p8];
    let renderedPoints = [];
  
    for(let i = 0; i < points.length; i++){
        renderedPoints[i] = renderPoint(points[i], viewPoint);
    }    
    
    this.PointsIn2D = renderedPoints;
    return this.PointsIn2D;
  }

  draw(){
    let [p1, p2, p3, p4, p5, p6, p7, p8] = this.PointsIn2D;
    let lines = [ [p1, p4, p8, p5, p1] ];
    
    if  (IsSameSideOfLine(p8, p4, p1, p7) && IsSameSideOfLine(p8, p5, p1, p7)){ 
      lines.push([p4, p3, p2, p6, p5], [p1,p2]) ;
    } 
    else if (IsSameSideOfLine(p4,p8,p5,p3) && IsSameSideOfLine(p4,p1,p5,p3)){
      lines.push([p8, p7, p6, p2, p1], [p5,p6]);
    }
    else if (IsSameSideOfLine(p1,p5,p2,p8) && IsSameSideOfLine(p1,p4,p2,p8)){
      lines.push([p5, p6, p7, p3, p4], [p8,p7]);
    }
    else if (IsSameSideOfLine(p5,p1,p6,p4) && IsSameSideOfLine(p5,p8,p6,p4)){
      lines.push([p1, p2, p3, p7, p8], [p4,p3]);
    }  
    drawLines(lines);
  }
  
}

function renderPoint(point, viewPoint){
  let [vx,vy,vz] = viewPoint;
  let [px,py,pz] = point;

  let dz = (0 - vz)/(vz - pz);
  let rx = vx + (vx - px) * dz;
  let ry = vy + (vy - py) * dz;
 
  return [rx, ry];
}

function IsSameSideOfLine(lp1, lp2, p1, p2){
  let [x1, y1] = lp1;
  let [x2, y2] = lp2;
  let [x3, y3] = p1;
  let [x4, y4] = p2;
  let a = y2 - y1;
  let b = x1 - x2;
  let c = x2*y1 - x1*y2;
  return (a*x3 + b*y3 + c) * (a*x4 + b*y4 + c) > 0;
}

const rr = bt.randInRange;
let vp = [rr(-200,425), rr(150,200), 30];
// let vp = [-50,172,30];


//Scene 
let scene = []

let wall1 = new cuboid([0,0,0], 125, 0, 125);
scene.push(wall1);

let wall2 = new cuboid([0,0,0], 125, 5, 0.1);
scene.push(wall2);

if (vp[0] < 62.5){
  let wall3 = new cuboid([125,0,0], 0.1, 5, 125);
  scene.push(wall3);
}else{
  let wall3 = new cuboid([0,0,0], 0.1, 5, 125);
  scene.push(wall3);
}

let door = new cuboid([0,0,0], 30, 0, 60);
scene.push(door);

let mat = new cuboid([35,0,1], 80, 3, 0.1);
scene.push(mat);
let mat_design1 = new cuboid([45,0,1.5], 60, 2, 0.1);
scene.push(mat_design1);
let mat_design2 = new cuboid([55,0,2], 40, 1, 0.1);
scene.push(mat_design2);


let Shelf1 = new cuboid([60,70,0], 45, 2, 3);
scene.push(Shelf1);

let Shelf2 = new cuboid([60,100,0], 45, 2, 3);
scene.push(Shelf2);

let seat = new cuboid([0,0,4], 20, 1, 20);
scene.push(seat);

let table = new cuboid([50,35,0], 75, 3, 5);
scene.push(table);


for ( let i=0; i<15; i++){
  let shelf1_book = new cuboid([60+3*i,70 + 3,0], 3, 2, 15);
  scene.push(shelf1_book);
}

for ( let i=0; i<15; i++){
  let shelf2_book = new cuboid([60+3*i,100+3,0], 3, 2, 15);
  scene.push(shelf2_book);
}

let TableBook1a = new cuboid([75,37,0.5], 7.5, 1, 2);
scene.push(TableBook1a);
let TableBook1b = new cuboid([67.5,37,0.5], 7.5, 1, 2);
scene.push(TableBook1b);

let BookStack1 = new cuboid([92.5,37,1], 25, 1, 3);
scene.push(BookStack1);
let BookStack2 = new cuboid([95,40,1], 20, 1, 3);
scene.push(BookStack2);
let BookStack3 = new cuboid([97,43,1], 15, 1, 3);
scene.push(BookStack3);

for (let i =0; i< scene.length; i++){
  scene[i].renderPointsIn2D(vp);
  scene[i].draw();
  
}
