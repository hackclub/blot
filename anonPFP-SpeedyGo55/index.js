/*
@title: anonPFP
@author: SpeedyGo55
@snapshot: snapshot1.png
*/
const width = 125;
const height = 125;
const resolution = 0.5;
const randSeed = 123456722;
bt.setRandSeed(randSeed);
setDocDimensions(width, height);

function draw() {
  let eye1 = new bt.Turtle();
  let eye2 = new bt.Turtle();
  let head = new bt.Turtle();
  let body = new bt.Turtle();
  let points = new bt.Turtle();

  body.jump([12.5,0]);
  body.forward(100);
  body.left(90);
  body.arc(180,50);

  head.jump([width/2,40]);
  head.arc(360,30);

  let coveredBody = bt.cover(body.path, head.path);

  eye1.jump([(width/2)-15,70]);
  eye1.arc(360,5);

  eye2.jump([(width/2)+15,70]);
  eye2.arc(360,5);
  
  drawLines(coveredBody);
  drawLines(head.path);
  drawLines(eye1.path);
  drawLines(eye2.path);

  for (let x = 0; x<=width; x+=resolution) {
    for (let y = 0; y<=height; y+=resolution){
      if (bt.pointInside(head.path, [x,y]) && !bt.pointInside(eye1.path, [x,y]) && !bt.pointInside(eye2.path, [x,y])){
        if (bt.noise([x, y]) >= 0.5) {
          points.jump([x,y]);
          points.arc(360, 0.5);
        }          
      }
    }
  }
  drawLines(bt.simplify(points.path));
}

draw();