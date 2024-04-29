/*
@title: Combee (Pokémon)
@author: Sonya
@snapshot: Combee1.png
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

const eye1 = new bt.Turtle();
const eye2 = new bt.Turtle();
const eye3 = new bt.Turtle();
const eye4 = new bt.Turtle();
const eye5 = new bt.Turtle();
const eye6 = new bt.Turtle();

const mouth = new bt.Turtle();
const tongue = new bt.Turtle();

const leftAntennaLine = new bt.Turtle();
const rightAntennaLine = new bt.Turtle();

const leftAntennaBulb = new bt.Turtle();
const rightAntennaBulb = new bt.Turtle();

t.right(90);
t.jump([60, 80]);

function hexagon(length) {
  for (let i = 0; i < 6; i++) {
    t.forward(length);
    t.right(60);
  }
}

// small hexagon inside big hexagon
function onePiece(x, y) {
  hexagon(18);
  t.jump([x, y]);
  hexagon(15);
}

// eyes
eye1.jump([41, 75]);
eye1.arc(360, 2);
drawLines(
  bt.scale(eye1.lines(),
    [0.85, 1.3]), { fill: "black" });

eye2.jump([52.5, 75]);
eye2.arc(360, 2);
drawLines(
  bt.scale(eye2.lines(),
    [0.85, 1.3]), { fill: "black" });

eye3.jump([72.0, 75]);
eye3.arc(360, 2);
drawLines(
  bt.scale(eye3.lines(),
    [0.85, 1.3]), { fill: "black" });

eye4.jump([83.0, 75]);
eye4.arc(360, 2);
drawLines(
  bt.scale(eye4.lines(),
    [0.85, 1.3]), { fill: "black" });

eye5.jump([56.4, 48]);
eye5.arc(360, 2);
drawLines(
  bt.scale(eye5.lines(),
    [0.85, 1.3]), { fill: "black" });

eye6.jump([68.1, 48]);
eye6.arc(360, 2);
drawLines(
  bt.scale(eye6.lines(),
    [0.85, 1.3]), { fill: "black" });


// smile
function smile() {
  t.setAngle(305);
  t.arc(110, 6);
}

// create the body of combee
onePiece(57.5, 78.5);
t.jump([91.177, 80]);
onePiece(88.7, 78.5);
t.jump([75.6, 53]);
onePiece(73, 51.7);

// triangle
drawLines([
  [
    [56.2, 60.5],
    [62.5, 54.8],
    [68.9, 60.5],
    [62.5, 64.2]
  ],
]);

t.jump([39.5, 67]);
smile();

t.jump([70.6, 67]);
smile();

drawLines([
  [
    [57.1, 45.7],
    [67.7, 45.7],
  ]
]);

// mouth & tongue
mouth.jump([56.2, 45.0])
mouth.setAngle(288);
mouth.arc(144, 6.52);
drawLines(
  bt.scale(mouth.lines(),
    [0.85, 1.3])
);

tongue.jump([67.1, 41.9]);
tongue.setAngle(132);
tongue.arc(99, 6);
drawLines(
  bt.scale(tongue.lines(),
    [0.7, 1.46])
);

// antenna lines
leftAntennaLine.jump([51, 106]);
leftAntennaLine.setAngle(173);
leftAntennaLine.arc(88, 21);
drawLines(
  bt.scale(leftAntennaLine.lines(),
    [-0.64, 1.18])
);

rightAntennaLine.jump([95, 88]);
rightAntennaLine.setAngle(90);
rightAntennaLine.arc(88, 21);
drawLines(
  bt.scale(rightAntennaLine.lines(),
    [-0.64, 1.18])
);

// antenna bulb
const randomNum = bt.randIntInRange(1, 7);
var color = "black";

if (randomNum == 1) {
  color = "red";
} else if (randomNum == 2) {
  color = "orange";
} else if (randomNum == 3) {
  color = "yellow";
} else if (randomNum == 4) {
  color = "green";
} else if (randomNum == 5) {
  color = "blue";
} else if (randomNum == 6) {
  color = "purple";
}


leftAntennaBulb.jump([29.9, 104]);
leftAntennaBulb.arc(360, 2);
drawLines(
  bt.scale(leftAntennaBulb.lines(),
    [1.2, 1.5]), { fill: color });

rightAntennaBulb.jump([93.5, 108]);
rightAntennaBulb.arc(360, 2);
drawLines(
  bt.scale(rightAntennaBulb.lines(),
    [1.2, 1.5]), { fill: color });

// wings
const leftWing = [
  bt.nurbs([
    [31.3, 79],
    [6.4, 81.3],
    [8.1, 68],
    [31.3, 76]

  ])
];
drawLines(leftWing);

const rightWing = bt.copy(leftWing);
bt.rotate(rightWing, 180);
bt.translate(rightWing, [86.5, 4]);
drawLines(rightWing);

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);