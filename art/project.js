setDocDimensions(329, 138);

const createCybertruckFrame = () => {
  const frameTurtle = new bt.Turtle();

  // Draw the body
  frameTurtle.up().jump([-14, 67.62]).down()
    .goTo([316.5, 77.4]).jump([-7, 40.6]).left(3).forward(27).left(60).forward(17).right(62).forward(41).right(57).forward(19).left(56).forward(111).left(51).forward(30).right(52).forward(54).right(52).forward(18).left(58).forward(39);

  //Draw the door
  frameTurtle.up().jump([78.5, 25]).down()
    .goTo([75.2, 97.5]);
  frameTurtle.up().jump([132, 25]).down()
    .goTo([128.0, 112.5]);
  frameTurtle.up().jump([191, 25]).down()
    .goTo([185.9, 83.5]);
  // Draw the roof
  frameTurtle.up().jump([-21, 65]).down()
    .goTo([110, 119]).setAngle(29).arc(-41, 10).forward(118 * Math.sqrt(3)).right(87).forward(40).right(65).forward(27 * Math.sqrt(2)).right(71).forward(28).left(54).forward(37).left(54).forward(33).right(53).forward(122).right(60).forward(27).left(61).forward(33).left(61).forward(24).right(60).forward(19).right(90).goTo([-21, 65]);

  // Draw the windshield
  frameTurtle.up().jump([24, 77]).down()
    .right(70).forward(100).right(34).forward(48 * Math.sqrt(2)).right(68).forward(17).goTo([24, 77]);

  // Draw the wheels
  frameTurtle.up().jump([25, 14]).down()
    .arc(360, 25);

  frameTurtle.up().jump([213, 14]).down()
    .arc(360, 27);

  frameTurtle.up().jump([28, 14]).down()
    .arc(360, 22);
  frameTurtle.up().jump([216, 14]).down()
    .arc(360, 24);
  //Down
  frameTurtle.up().jump([2.2, 25.7]).down()
    .goTo([24.7, 20.1]).jump([74.5, 18.2]).goTo([212.6, 17.6]).jump([266.2, 21.8]).goTo([310.6, 38.05])




  frameTurtle.up().jump([40, 16]).down()
  for (let i = 0; i < 4; i++) {
    frameTurtle.forward(-117 / 6);
    frameTurtle.left(45);
    frameTurtle.forward(403 / 12);
    frameTurtle.right(180);
    frameTurtle.forward(238 / 12);
    frameTurtle.left(45);
  };

  frameTurtle.up().jump([229, 16]).down()
  for (let i = 0; i < 4; i++) {
    frameTurtle.forward(-131 / 6);
    frameTurtle.left(45);
    frameTurtle.forward(403 / 12);
    frameTurtle.right(180);
    frameTurtle.forward(224 / 12);
    frameTurtle.left(45);
  };

  drawLines(frameTurtle.lines());
};


// assuming x and y are defined earlier


createCybertruckFrame();