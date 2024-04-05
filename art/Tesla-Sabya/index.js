/*
@title: Tesla
@author: Sabyasachi
@snapshot: 1.png
*/
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

const rim1 = () => {

  frameTurtle.up().jump([39, 16]).down()
  const width = 98;
  const height = 36;
  const center = [width / 2, height / 2];
  const radius = width / 4.5;
  const lines = bt.randIntInRange(8, 16); // # vertical lines
  const spirals = bt.randIntInRange(3, 8); // # horizontal lines

  // drawing the vertical lines
  for (let i = 0; i < lines; i++) {
    const angle = (360 / lines) * i;
    frameTurtle.jump(center);
    frameTurtle.setAngle(angle);
    frameTurtle.forward(radius);
    frameTurtle.jump(center);
  }

  for (let s = 1; s < spirals; s++) {
    for (let i = 0; i < lines; i++) {
      const angle = (360 / lines) * i;
      const nextAngle = (360 / lines) * ((i + 6) % lines);
      //random spacing between horizontal lines
      const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
      const sp = pointCircle(center, randomSpacing, angle);
      const ep = pointCircle(center, randomSpacing, nextAngle);
      frameTurtle.jump(sp);
      //drawing lines connecting the points
      frameTurtle.setAngle(angleTowards(sp, ep));
      frameTurtle.forward(distance(sp, ep));
    }
  }


  //coords of a point on the circumference of a circle
  function pointCircle(center, radius, angleDegrees) {
    const angleRadians = (Math.PI / 180) * angleDegrees;
    return [
      center[0] + radius * Math.cos(angleRadians),
      center[1] + radius * Math.sin(angleRadians)
    ];
  }

  //angle formula
  function angleTowards(from, to) {
    const x = to[0] - from[0];
    const y = to[1] - from[1];
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  //distance formula
  function distance(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    return Math.sqrt(dx * dx + dy * dy);
  }


  frameTurtle.up().jump([241, 16]).down()
  // drawing the vertical lines
  for (let i = 0; i < lines; i++) {
    const angle = (360 / lines) * i;
    frameTurtle.jump(center);
    frameTurtle.setAngle(angle);
    frameTurtle.forward(radius);
    frameTurtle.jump(center);
  }

  for (let s = 1; s < spirals; s++) {
    for (let i = 0; i < lines; i++) {
      const angle = (360 / lines) * i;
      const nextAngle = (360 / lines) * ((i + 6) % lines);
      //random spacing between horizontal lines
      const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
      const sp = pointCircle(center, randomSpacing, angle);
      const ep = pointCircle(center, randomSpacing, nextAngle);
      frameTurtle.jump(sp);
      //drawing lines connecting the points
      frameTurtle.setAngle(angleTowards(sp, ep));
      frameTurtle.forward(distance(sp, ep));
    }
  }


  //coords of a point on the circumference of a circle
  function pointCircle(center, radius, angleDegrees) {
    const angleRadians = (Math.PI / 180) * angleDegrees;
    return [
      center[0] + radius * Math.cos(angleRadians),
      center[1] + radius * Math.sin(angleRadians)
    ];
  }

  //angle formula
  function angleTowards(from, to) {
    const x = to[0] - from[0];
    const y = to[1] - from[1];
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  //distance formula
  function distance(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

}



const rim2 = () => {

  frameTurtle.up().jump([66, 16]).down()
  const width = 480;
  const height = 36;
  const center = [width / 2, height / 2];
  const radius = width / 19.8;
  const lines = bt.randIntInRange(8, 16); // # vertical lines
  const spirals = bt.randIntInRange(3, 8); // # horizontal lines

  // drawing the vertical lines
  for (let i = 0; i < lines; i++) {
    const angle = (360 / lines) * i;
    frameTurtle.jump(center);
    frameTurtle.setAngle(angle);
    frameTurtle.forward(radius);
    frameTurtle.jump(center);
  }

  for (let s = 1; s < spirals; s++) {
    for (let i = 0; i < lines; i++) {
      const angle = (360 / lines) * i;
      const nextAngle = (360 / lines) * ((i + 6) % lines);
      //random spacing between horizontal lines
      const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
      const sp = pointCircle(center, randomSpacing, angle);
      const ep = pointCircle(center, randomSpacing, nextAngle);
      frameTurtle.jump(sp);
      //drawing lines connecting the points
      frameTurtle.setAngle(angleTowards(sp, ep));
      frameTurtle.forward(distance(sp, ep));
    }
  }


  //coords of a point on the circumference of a circle
  function pointCircle(center, radius, angleDegrees) {
    const angleRadians = (Math.PI / 180) * angleDegrees;
    return [
      center[0] + radius * Math.cos(angleRadians),
      center[1] + radius * Math.sin(angleRadians)
    ];
  }

  //angle formula
  function angleTowards(from, to) {
    const x = to[0] - from[0];
    const y = to[1] - from[1];
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  //distance formula
  function distance(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    return Math.sqrt(dx * dx + dy * dy);
  }


  frameTurtle.up().jump([241, 16]).down()
  // drawing the vertical lines
  for (let i = 0; i < lines; i++) {
    const angle = (360 / lines) * i;
    frameTurtle.jump(center);
    frameTurtle.setAngle(angle);
    frameTurtle.forward(radius);
    frameTurtle.jump(center);
  }

  for (let s = 1; s < spirals; s++) {
    for (let i = 0; i < lines; i++) {
      const angle = (360 / lines) * i;
      const nextAngle = (360 / lines) * ((i + 6) % lines);
      //random spacing between horizontal lines
      const randomSpacing = s * (radius / spirals) + bt.randInRange(-5, 5);
      const sp = pointCircle(center, randomSpacing, angle);
      const ep = pointCircle(center, randomSpacing, nextAngle);
      frameTurtle.jump(sp);
      //drawing lines connecting the points
      frameTurtle.setAngle(angleTowards(sp, ep));
      frameTurtle.forward(distance(sp, ep));
    }
  }


  //coords of a point on the circumference of a circle
  function pointCircle(center, radius, angleDegrees) {
    const angleRadians = (Math.PI / 180) * angleDegrees;
    return [
      center[0] + radius * Math.cos(angleRadians),
      center[1] + radius * Math.sin(angleRadians)
    ];
  }

  //angle formula
  function angleTowards(from, to) {
    const x = to[0] - from[0];
    const y = to[1] - from[1];
    return Math.atan2(y, x) * (180 / Math.PI);
  }

  //distance formula
  function distance(from, to) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

}
rim1();
rim2();

  drawLines(frameTurtle.lines());
};


// assuming x and y are defined earlier


createCybertruckFrame();
