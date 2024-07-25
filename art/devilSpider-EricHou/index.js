/*
@title: DevilSpider
@author: Eric H.
@snapshot: 1.png
*/
const width = 220;
const height = 200;
setDocDimensions(width, height);

const lines = [];

const body = new bt.Turtle();
const bodyedge = new bt.Turtle();
body.jump([85, 75]);
body.arc(360, 30);
drawLines(body.lines(), { fill: "black" });
// gives kinda a shadow effect 
bodyedge.jump([83, 83]);
bodyedge.arc(360, 25);
drawLines(bodyedge.lines(), { fill: "gray" });

const eye1 = new bt.Turtle();
const eye2 = new bt.Turtle();
const eye12 = new bt.Turtle();
const eye22 = new bt.Turtle();
eye1.jump([73, 105]);
eye1.arc(360, 4);
drawLines(bt.scale(eye1.lines(), [2.0, 1.5]), { fill: "red" });

eye2.jump([94, 105]);
eye2.arc(360, 4);
drawLines(bt.scale(eye2.lines(), [1.8, 1.5]), { fill: "red" });

eye12.jump([65, 105]);
eye12.arc(360, 4);
drawLines(bt.scale(eye1.lines(), [1.0, 1.2]), { fill: "black" });

eye22.jump([85, 105]);
eye22.arc(360, 4);
drawLines(bt.scale(eye2.lines(), [1.0, 1.2]), { fill: "black" });

const shadow = new bt.Turtle();
shadow.jump([63, 65]);
shadow.arc(360, 3);
drawLines(bt.scale(shadow.lines(), [15.0, 1.2]), { fill: "gray" });

function drawAngledLine(x, y, angle, length, offset, direction) {
  var rad = angle * (Math.PI / 180);
// direction will mirror 
  var x1 = x + length * Math.cos(rad) * direction; 
  var y1 = y + length * Math.sin(rad);

  var x2 = x1 + length * Math.cos(rad) * direction;
  var y2 = y1 + offset;

  drawLines([
    [
      [x, y], 
      [x1, y1],
      [x2, y2]
    ]
  ]);
  drawLines([
    [
      [x, y+2], 
      [x1, y1+3],
      [x2, y2]
    ]
  ]);
}

// draw legs 
for (var i = 0; i<10; i++){
  drawAngledLine(108-2*Math.cos(i*9.0),86+5*i,-114+11*2*i,33,-54,1)
  drawAngledLine(54+-1*Math.cos(i*10.2),97+5*i,-37+7*2*i,26,-53,-1)
}

const horn1 = [
  bt.nurbs([
    [43,5],[30,-26],[6,-20],[34,-28],[26,-30],[36,-18],[42,-23],[63,36]
  ])
]
const horn2 = bt.copy(horn1);
bt.scale(horn2, [-1, 1], [width / 16, 0]);

bt.join(lines,horn1);
bt.join(lines,horn2);
bt.translate(lines, [72,158]);
drawLines(lines,{width: 3, fill:"red"});

// draw spider web
const web = new bt.Turtle();
const webCenter = [214/2-1, -18/2-2];
const radius = 68
function drawWeb(center, rings, spokes, radiusIncrement) {
  for (let i = 0; i < 0.5*rings; i++) {
  web.jump(webCenter);
  webCenter[1]+=64.2;
  web.arc(360, radius - 17*i);
  }

  for (let i = 0; i < spokes; i++) {
    web.jump(center);
    web.setAngle((361 / spokes) * i);
    web.forward(rings * radiusIncrement);
  }
  drawLines(web.lines());
}

drawWeb([82,104], 0, 6, 7);