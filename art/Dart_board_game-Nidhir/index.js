const width = 125;
const height = 125;

setDocDimensions(width, height);
//start of code
const finalLines = [];
//variables for darts
const a = bt.randIntInRange(10, 110);
const b = bt.randIntInRange(10, 110);
const c = bt.randIntInRange(10, 110);
const d = bt.randIntInRange(10, 110);
const e = bt.randIntInRange(10,110);
const f = bt.randIntInRange(10, 110);
const g = bt.randIntInRange(10, 110);
const h = bt.randIntInRange(10, 110);
//dart board
const circle = new bt.Turtle()
  .jump([63, 2])
.arc(360,60)
drawLines(circle.lines())
const circle2= new bt.Turtle()
  .jump([63, 12])
.arc(360,50)
drawLines(circle2.lines())
const darkcircle = new bt.Turtle()
.jump([63, 24])
.arc(360,39)
drawLines(darkcircle.lines())
const bullseye = new bt.Turtle()
.jump([63, 41])
.arc(360,21)
drawLines(bullseye.lines())
//dart's
const dart = new bt.Turtle()
.jump([a,b])
.arc(360,5)
drawLines(dart.lines(),{fill:"black",stroke:"black",width:"3"})
const dart2 = new bt.Turtle()
.jump([c,d])
.arc(360,5)
drawLines(dart2.lines(),{fill:"black",stroke:"black",width:"3"})
const dart3 = new bt.Turtle()
.jump([e,f])
.arc(360,5)
drawLines(dart3.lines(),{fill:"black",stroke:"black",width:"3"})
const dart4 = new bt.Turtle()
.jump([g,h])
.arc(360,5)
drawLines(dart4.lines(),{fill:"black",stroke:"black",width:"3"})
//each grid part
drawLines([[[75,100],[50,100]],[[91,90],[35,90]],[[28,80],[98,80]],[[25,70],[101,70]],[[24,60],[102,60]],[[26,50],[100,50]],[[94,40],[32,40]],[[84,30],[42,30]],[[75,79],[75,45]],[[65,83],[65,42]],[[45,72],[45,52]],[[55,82],[55,43]]])