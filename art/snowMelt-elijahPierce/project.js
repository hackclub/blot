/*
@snowMelt
@elijahPierce
@snowMelt
*/
setDocDimensions(125, 125);
const penguinNose = bt.randIntInRange(5, 10)
const hatHeight = bt.randIntInRange(2, 6)
const snowManNose = bt.randIntInRange(3, 6)
var chance = bt.randIntInRange(1, 10)
const penguinPupil = new bt.Turtle()
  .jump([56, 71.5625])
  .arc(360, 2)
  .jump([68.5, 71.5625])
  .arc(360, 2)

if (1 == chance) {
  const penguin_body = new bt.Turtle()
    //head
    .jump([62.5, 50])
    .arc(360, 17)
    //eyes
    .jump([54, 73])
    .left(45)
    .forward(6)
    .right(45)
    .jump([54, 77])
    .right(45)
    .forward(6)
    .left(45)
    .jump([66, 73])
    .left(45)
    .forward(6)
    .right(45)
    .jump([66, 77])
    .right(45)
    .forward(6)
    .left(45)
    //nose
    .jump([62.5, 64])
    .left(120)
    .forward(7)
    .right(120)
    .forward(7)
    .right(120)
    .forward(7)
    .left(120)
    //fins
    .jump([47, 75])
    .left(233)
    .forward(13)
    .arc(188, 4)
    .jump([78, 61])
    .left(233)
    .left(4)
    .arc(188, 4)
    .forward(12)
    .right(312)
    //feet
    .jump([54.0625, 52])
    .arc(360, 3.75)
    .jump([70.9375, 52])
    .arc(360, 3.75)
    //ground
    .jump([0, 45])
    .right(174)
    .forward(125);
  const sun = new bt.Turtle()
    .jump([100, 105])
    .arc(360, 7)
    //lines
    .jump([107, 112])
    .forward(7)
    .jump([86, 112])
    .forward(7)
    .jump([105, 117])
    .left(45)
    .forward(7)
    .jump([89, 104])
    .forward(7)
    .right(90)
    .jump([106.5, 109])
    .forward(7)
    .right(45)
    .jump([100, 105])
    .forward(7)
    .left(45)
    .jump([89, 121])
    .forward(7)
    .right(45)
    .jump([100, 124])
    .forward(5);
  const hat = new bt.Turtle()
    //top part
    .jump([98, 46])
    .forward(4)
    .left(90)
    .forward(hatHeight)
    .left(90)
    .forward(4)
    .left(90)
    .forward(hatHeight)
    //bill
    .jump([96, 46])
    .left(90)
    .forward(8)
    .right(90)
    .forward(1)
    .right(90)
    .forward(8)
    .right(90)
    .forward(1)

  drawLines(bt.scale(hat.path, [1, 1]), { fill: "black" });
  drawLines(bt.scale(sun.path, [1, 1]));
  drawLines(bt.scale(penguin_body.path, [1, 1]));
} else {
  const igloo = new bt.Turtle()
    //big circle
    .jump([31, 45])
    .left(90)
    .arc(180, 15)
    //lines
    .jump([4, 53])
    .left(45)
    .forward(9.5)
    .jump([16, 60])
    .right(45)
    .forward(9)
    .right(45)
    .jump([28, 53])
    .forward(9.5)
  const iglooColor = new bt.Turtle()
    //little circle
    .left(90)
    .jump([22, 45])
    .arc(180, 6)
  const hat = new bt.Turtle()
    //top part
    .jump([98, 79.5])
    .forward(4)
    .left(90)
    .forward(hatHeight)
    .left(90)
    .forward(4)
    .left(90)
    .forward(hatHeight)
    //bill
    .jump([96, 79.5])
    .left(90)
    .forward(8)
    .right(90)
    .forward(1)
    .right(90)
    .forward(8)
    .right(90)
    .forward(1)
  const snowMan = new bt.Turtle()
    //circles 
    .jump([100, 45])
    .arc(360, 8)
    .jump([100, 60])
    .arc(360, 6)
    .jump([100, 71])
    .arc(360, 4)
    //arms
    .jump([105, 66])
    .left(45)
    .forward(10)
    .right(45)
    .right(45)
    .jump([88, 73.5])
    .forward(10)
    .left(45)
  const snowManColor = new bt.Turtle()
    //eyes
    .jump([98, 76.2])
    .arc(360, .5)
    .jump([102, 76.2])
    .arc(360, .5)
    //nose
    .jump([100, 75])
    .forward(snowManNose)
    .right(190)
    .forward(snowManNose)
    .left(90)
    .forward(snowManNose / 5.3)
    //buttons
    .jump([100, 69])
    .arc(360, .5)
    .jump([100, 66])
    .arc(360, .5)
    .jump([100, 63])
    .arc(360, .5);
  const snow = new bt.Turtle()
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5)
    .jump([
    bt.randIntInRange(1, 125),
    bt.randIntInRange(1, 125)
  ])
    .arc(360, .5);

  const penguin_body = new bt.Turtle()
    //head
    .jump([62.5, 50])
    .arc(360, 17)
    //eyes
    .jump([56, 71.5625])
    .arc(360, 4.3)
    .jump([68.5, 71.5625])
    .arc(360, 4.3)
    //nose
    .jump([62.5, 64])
    .left(120)
    .forward(penguinNose)
    .right(120)
    .forward(penguinNose)
    .right(120)
    .forward(penguinNose)
    .left(120)
    //fins
    .jump([47, 75])
    .left(233)
    .forward(13)
    .arc(188, 4)
    .jump([78, 61])
    .left(233)
    .left(4)
    .arc(188, 4)
    .forward(12)
    .right(312)
    //feet
    .jump([54.0625, 52])
    .arc(360, 3.75)
    .jump([70.9375, 52])
    .arc(360, 3.75)
    //ground
    .jump([0, 45])
    .right(174)
    .forward(125);




  drawLines(bt.scale(penguin_body.path, [1, 1]));
  drawLines(bt.scale(penguinPupil.path, [1, 1]), { fill: "black" });
  drawLines(bt.scale(igloo.path, [1, 1]));
  drawLines(bt.scale(iglooColor.path, [1, 1]), { fill: "black" });
  drawLines(bt.scale(snow.path, [1, 1]), { fill: "black" });
  drawLines(bt.scale(snowMan.path, [1, 1]));
  drawLines(bt.scale(hat.path, [1, 1]), { fill: "black" });
  drawLines(bt.scale(snowManColor.path, [1, 1]), { fill: "black" });
}
