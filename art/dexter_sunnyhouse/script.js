const width = 120;
const height = 120;

setDocDimensions(width, height);

const housewidth = 2 * width / 4;
const househeight = 2 * height / 4;
const roofheight = househeight / 3;
const doorwidth = housewidth / 3.5;
const doorheight = househeight / 2.3;
const letterboxheight = doorheight / 10;
const letterboxwidth = doorwidth / 1.8;
const windowwidth = housewidth / 4.5;
const windowheight = househeight / 4.5;
const upperwindowheight = househeight / 4;
const upperwindowwidth = housewidth / 4;

function drawLine(startpointx, startpointy, endpointx, endpointy) {
  const turtle = new Turtle;
  turtle.jump([startpointx, startpointy]);
  turtle.goTo([endpointx, endpointy]);
  drawTurtles([turtle]);
}

function drawArc(centreX, centreY, radius, angle) {
  const turtle = new Turtle;
  turtle.jump([centreX, centreY]);
  turtle.arc(90, radius);
  turtle.rotate(270, [centreX, centreY]);
  drawTurtles([turtle]);
}

//draws the box outline for the house
drawLine((width / 2) - (housewidth / 2), (height / 2) - (househeight / 2), (width / 2) + (housewidth / 2), (height / 2) - (househeight / 2));
drawLine((width / 2) - (housewidth / 2), (height / 2) - (househeight / 2), (width / 2) - (housewidth / 2), (height / 2) + (househeight / 2));
drawLine((width / 2) + (housewidth / 2), (height / 2) - (househeight / 2), (width / 2) + (housewidth / 2), (height / 2) + (househeight / 2));
drawLine((width / 2) - (housewidth / 2), (height / 2) + (househeight / 2), (width / 2) + (housewidth / 2), (height / 2) + (househeight / 2));

//draws the outline for the roof
drawLine((width / 2) - (housewidth / 2), (height / 2) + (househeight / 2), (width / 2), (height / 2) + (househeight / 2) + roofheight);
drawLine((width / 2), (height / 2) + (househeight / 2) + roofheight, (width / 2) + (housewidth / 2), (height / 2) + (househeight / 2));

//draws the infill for the roof
drawLine((width / 2) - (housewidth / 4), (height / 2) + (househeight / 2) + (roofheight / 2), (width / 2) + (housewidth / 3.5), (height / 2) + (househeight / 2));
drawLine((width / 2) - (housewidth / 2.67), (height / 2) + (househeight / 2) + (roofheight / 4), (width / 2) + (housewidth / 6.45), (height / 2) + (househeight / 2));
drawLine((width / 2) - (housewidth / 6.35), (height / 2) + (househeight / 1.55) + (roofheight / 4), (width / 2) + (housewidth / 2.35), (height / 2) + (househeight / 2));
drawLine((width / 2) + (housewidth / 4), (height / 2) + (househeight / 2) + (roofheight / 2), (width / 2) - (housewidth / 3.5), (height / 2) + (househeight / 2));
drawLine((width / 2) + (housewidth / 2.67), (height / 2) + (househeight / 2) + (roofheight / 4), (width / 2) - (housewidth / 6.45), (height / 2) + (househeight / 2));
drawLine((width / 2) + (housewidth / 6.35), (height / 2) + (househeight / 1.55) + (roofheight / 4), (width / 2) - (housewidth / 2.35), (height / 2) + (househeight / 2));

//draws the door outline
drawLine((width / 2) - (doorwidth / 2), (height / 2) - (househeight / 2), (width / 2) - (doorwidth / 2), height / 2 - (househeight / 2 - doorheight));
drawLine((width / 2) + (doorwidth / 2), (height / 2) - (househeight / 2), (width / 2) + (doorwidth / 2), height / 2 - (househeight / 2 - doorheight));
drawLine((width / 2) - (doorwidth / 2), (height / 2) - (househeight / 2 - doorheight), (width / 2) + (doorwidth / 2), height / 2 - (househeight / 2 - doorheight));

//draws the mailbox opening on the door
drawLine((width / 2) - (letterboxwidth / 2), (househeight / 2) - (househeight / 2 - doorheight) + doorheight / 2, (width / 2) + (letterboxwidth / 2), (househeight / 2) - (househeight / 2 - doorheight) + doorheight / 2);
drawLine((width / 2) - (letterboxwidth / 2), (househeight / 2) + (househeight / 2 - doorheight) + doorheight / 3.5, (width / 2) + (letterboxwidth / 2), (househeight / 2) + (househeight / 2 - doorheight) + doorheight / 3.5);
drawLine((width / 2) - (letterboxwidth / 2), (househeight / 2) + (househeight / 2 - doorheight) + doorheight / 3.5, (width / 2) - (letterboxwidth / 2), (househeight / 2) - (househeight / 2 - doorheight) + doorheight / 2);
drawLine((width / 2) + (letterboxwidth / 2), (househeight / 2) + (househeight / 2 - doorheight) + doorheight / 3.5, (width / 2) + (letterboxwidth / 2), (househeight / 2) - (househeight / 2 - doorheight) + doorheight / 2);

//draws the outline of the windows on the door
drawLine(width / 2 - doorwidth / 3, height / 2 - doorheight / 4, width / 2 + doorwidth / 3, height / 2 - doorheight / 4);
drawLine(width / 2, height / 2 - doorheight / 4, width / 2, height / 2 - doorheight / 2.1);
drawLine(width / 2 - doorwidth / 3, height / 2 - doorheight / 2.1, width / 2 + doorwidth / 3, height / 2 - doorheight / 2.1);
drawLine(width / 2 - doorwidth / 3, height / 2 - doorheight / 4, width / 2 - doorwidth / 3, height / 2 - doorheight / 2.1);
drawLine(width / 2 + doorwidth / 3, height / 2 - doorheight / 4, width / 2 + doorwidth / 3, height / 2 - doorheight / 2.1);

//draws the infill on the doors windows
drawLine(width / 2 + doorwidth / 3, height / 2 - doorheight / 4, width / 2, height / 2 - doorheight / 2.1);
drawLine(width / 2 - doorwidth / 3, height / 2 - doorheight / 4, width / 2, height / 2 - doorheight / 2.1);
drawLine(width / 2 + doorwidth / 3, height / 2 - doorheight / 2.1, width / 2, height / 2 - doorheight / 4);
drawLine(width / 2 - doorwidth / 3, height / 2 - doorheight / 2.1, width / 2, height / 2 - doorheight / 4);

//draws the bottom left window
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 - doorheight / 4, (width / 2 - housewidth / 2) + 5 * windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 - housewidth / 2) + 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 - housewidth / 2) + windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 - housewidth / 2) + 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 - housewidth / 2) + 5 * windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 - housewidth / 2) + 5 * windowwidth / 6.5, height / 2 - doorheight / 4 - windowheight, (width / 2 - housewidth / 2) + 5 * windowwidth / 6.5, height / 2 - doorheight / 4);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 - doorheight / 4 - windowheight / 2, (width / 2 - housewidth / 2) + 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight / 2);

//draws the bottom right window
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 - doorheight / 4, (width / 2 + housewidth / 2) - 5 * windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 + housewidth / 2) - 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 + housewidth / 2) - windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 + housewidth / 2) - 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight, (width / 2 + housewidth / 2) - 5 * windowwidth / 4, height / 2 - doorheight / 4);
drawLine((width / 2 + housewidth / 2) - 5 * windowwidth / 6.5, height / 2 - doorheight / 4 - windowheight, (width / 2 + housewidth / 2) - 5 * windowwidth / 6.5, height / 2 - doorheight / 4);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 - doorheight / 4 - windowheight / 2, (width / 2 + housewidth / 2) - 5 * windowwidth / 4, height / 2 - doorheight / 4 - windowheight / 2);

//draws the top left window
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 + doorheight / 6, (width / 2 - housewidth / 2) + 5 * upperwindowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 - housewidth / 2) + 5 * upperwindowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 - housewidth / 2) + windowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 - housewidth / 2) + 5 * upperwindowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 - housewidth / 2) + 5 * upperwindowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 - housewidth / 2) + 5 * upperwindowwidth / 6.8, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 - housewidth / 2) + 5 * upperwindowwidth / 6.8, height / 2 + doorheight / 6);
drawLine((width / 2 - housewidth / 2) + windowwidth / 4, height / 2 + doorheight / 5 + windowheight / 2, (width / 2 - housewidth / 2) + 5 * upperwindowwidth / 4, height / 2 + doorheight / 5 + windowheight / 2);

//draws the top right window
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 + doorheight / 6, (width / 2 + housewidth / 2) - 5 * upperwindowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 + housewidth / 2) - 5 * upperwindowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 + housewidth / 2) - windowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 + housewidth / 2) - 5 * upperwindowwidth / 4, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 + housewidth / 2) - 5 * upperwindowwidth / 4, height / 2 + doorheight / 6);
drawLine((width / 2 + housewidth / 2) - 5 * upperwindowwidth / 6.8, height / 2 + doorheight / 6 + upperwindowheight, (width / 2 + housewidth / 2) - 5 * upperwindowwidth / 6.8, height / 2 + doorheight / 6);
drawLine((width / 2 + housewidth / 2) - windowwidth / 4, height / 2 + doorheight / 5 + windowheight / 2, (width / 2 + housewidth / 2) - 5 * upperwindowwidth / 4, height / 2 + doorheight / 5 + windowheight / 2);

//draws the sun in the top right corner
const sunRadius = Math.sqrt(width * height) / 4;
drawArc(width - sunRadius, height, sunRadius, 90);

//draws the pathway from the door
drawLine((width / 2) - (doorwidth / 2), height / 2 - househeight / 2, (width / 2 - housewidth / 2) + windowwidth / 1.5, 0);
drawLine((width / 2) + (doorwidth / 2), height / 2 - househeight / 2, (width / 2 + housewidth / 2) - windowwidth / 1.5, 0);
