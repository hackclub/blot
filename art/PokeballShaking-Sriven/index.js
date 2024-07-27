/*
@title: Pokeball Shaking
@author: Sriven
@snapshot: caught.png
*/



//Parameters that randomize pokeball
const scaleVal = bt.randInRange(0.75,1)
const rotateVal = bt.randInRange(-30,30)
const lineCount = bt.randIntInRange(1,3)

const width = 125;
const height = 125;
setDocDimensions(width, height);


const tt = new bt.Turtle()
tt.up()
tt.goTo([width/8,height/2])
tt.down()
tt.right(90)
tt.arc(360,width * 3/8)


const acrossT = new bt.Turtle()

acrossT.up()
acrossT.goTo([width/8,height/2])

acrossT.down()
acrossT.left(17)
acrossT.arc(-18,146.6)

acrossT.left(76)
acrossT.arc(-152,13)

acrossT.left(75)
acrossT.arc(-18,75)
acrossT.up()
acrossT.goTo([width/8,height/2 - 5])
acrossT.down()
acrossT.left(37)
acrossT.arc(-18,146.6)
acrossT.left(-76)
acrossT.arc(152,13)
acrossT.left(-77)
acrossT.arc(-18,75)
acrossT.up()
acrossT.goTo([71,59])
acrossT.down()
acrossT.arc(360,8)
const ball = bt.join(acrossT.lines(),tt.lines())
bt.scale(ball,0.75*scaleVal)
bt.rotate(ball,rotateVal)
const shakeLine = bt.catmullRom([[41,20],[30,30],[24,40]])
bt.scale([shakeLine],scaleVal)

for (let i = 0; i < lineCount; i++)
  {
    drawLines([shakeLine])
    const aux = bt.copy([shakeLine])
    const mirroredShake = bt.iteratePoints(aux, (pt, t) => {
  const [x,y] = pt;
  return [width-x,y];
});
    drawLines(mirroredShake)
    bt.translate([shakeLine],[-5,-5]);
  }
drawLines(ball,{stroke: "black", width: 4})

const star = new bt.Turtle()

star.up()
star.goTo([66.6,7/8 * height])
star.down()
for (let i = 0; i < 5; i++)
  {
    star.forward(10)
    star.left(142)
    star.forward(10)
    star.left(290)
  }

//If rotation parameter has a small enough magnitude, draw stars to show that the Pokemon has been caught!
if (rotateVal < 5 && rotateVal > -5)
{
  const st = star.lines()
  bt.scale(st,0.5)
  bt.rotate(st,110)
  drawLines(st,{fill: "gold",width: 3})
  bt.translate(st,[-25,-10])
  drawLines(st,{fill: "gold",width: 3})
  bt.translate(st,[50,0])
  drawLines(st,{fill: "gold",width: 3})
}


