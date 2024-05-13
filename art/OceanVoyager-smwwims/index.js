/*
@title: Ocean Voyager
@author: @smwwims
@snapshot: 0.png
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const waveResolution = 0.05;
const waveAmplitude = 7;
const waveHeight = 30;
const shipSize = 50;
const sunSize = 30;
const sunOrientation = "left";


// sinus wave
let x = 0;
const wave = [];
while (x <= width) {
    for (let radiant = 0.0; radiant <= 2.0; radiant += waveResolution) {
        const y = Math.round(Math.sin(radiant * Math.PI) * waveAmplitude) + waveHeight;
        wave.push([x, y]);
        x += 1;
        if (x > width) break;
    }
}

// ship
const ship = new bt.Turtle();
ship.forward(shipSize);
ship.left(70.62);
ship.forward(shipSize * 0.625);
ship.left(90);
ship.forward(shipSize * 0.75);
ship.left(40);
ship.forward(shipSize * 0.75);
ship.left(90);
ship.goTo([0, 0]);
ship.left(-200.61);
ship.goTo([shipSize * 0.5, 0]);
ship.forward(shipSize * 0.8375);
ship.jump([0, shipSize * 0.65]);
ship.forward(shipSize * 0.375);
ship.right(90);
ship.forward(shipSize);
ship.right(90);
ship.forward(shipSize * 0.3625);
ship.jump([shipSize * 0.375, shipSize * 1.025]);
ship.left(180);
ship.forward(shipSize * 0.375);
ship.right(90);
ship.forward(shipSize * 0.25);
ship.right(90);
ship.forward(shipSize * 0.375);
ship.jump([shipSize * 0.125, shipSize * 0.4375]);
ship.arc(360, shipSize * 0.0625);
ship.jump([shipSize * 0.75, shipSize * 0.4375]);
ship.arc(360, shipSize * 0.0625);
const shipPath = ship.path;
bt.translate(shipPath, [width/2, waveHeight + shipSize * 0.5], bt.bounds(shipPath).cc);

// sun
const sun = new bt.Turtle();
if (sunOrientation == "right") {
  sun.jump([width - sunSize, height]);
  sun.left(270);
  sun.arc(90, sunSize);
} else {
  sun.jump([0, height - sunSize]);
  sun.arc(90, sunSize);
}
const sunPath = sun.path;

// draw it
drawLines([wave]);
drawLines(shipPath);
drawLines(sunPath);