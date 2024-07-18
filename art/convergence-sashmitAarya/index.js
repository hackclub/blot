/*
@title: Convergence
@author: Sashmit Aarya
@snapshot: screenshot1.png
*/

//Adjustable parameters
const bottomTrackWidth = 28;
const topTrackWidth = 0;
const trackHeight = 125;
const numberOfTracks = 2 * bt.randIntInRange(12, 20) + 1;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

const trackWidth1 = bottomTrackWidth + 2;
const trackWidth2 = bottomTrackWidth + 8;
const trackWidth3 = bottomTrackWidth + 12;

const angle = (180 * Math.atan2(trackHeight, bottomTrackWidth)) / Math.PI;
const length = Math.sqrt(trackHeight ** 2 + bottomTrackWidth ** 2);
t.jump([62.5 - topTrackWidth / 2 - bottomTrackWidth, 0]);
t.left(angle);
t.forward(length);
t.jump([125 - (62.5 - topTrackWidth / 2 - bottomTrackWidth), 0]);
t.left(2 * (90 - angle));
t.forward(length);

const angle1 = (180 * Math.atan2(trackHeight, trackWidth1)) / Math.PI + 0.25;
const length1 = Math.sqrt(trackHeight ** 2 + trackWidth1 ** 2);
t.jump([62.5 - topTrackWidth / 2 - trackWidth1, 0]);
t.setAngle(angle1);
t.forward(length1);
t.jump([125 - (62.5 - topTrackWidth / 2 - trackWidth1), 0]);
t.left(2 * (90 - angle1));
t.forward(length1);

const angle2 = (180 * Math.atan2(trackHeight, trackWidth2)) / Math.PI + 0.5;
const length2 = Math.sqrt(trackHeight ** 2 + trackWidth2 ** 2);
t.jump([62.5 - topTrackWidth / 2 - trackWidth2, 0]);
t.setAngle(angle2);
t.forward(length2);
t.jump([125 - (62.5 - topTrackWidth / 2 - trackWidth2), 0]);
t.left(2 * (90 - angle2));
t.forward(length2);

const track = t.lines();
const trackLeft = [track[0]];
const trackRight = [track[1]];
const iterations = numberOfTracks,
  power = Math.floor(iterations / 10);
var highRight, highLeft, lowRight, lowLeft;
var highRight1, highLeft1, lowRight1, lowLeft1;
var highRight2, highLeft2, lowRight2, lowLeft2;

const trackLeft1 = [track[4]];
const trackRight1 = [track[5]];

const angle3 = Math.atan2(trackHeight, trackWidth3) + 0.005;
const length3 = Math.sqrt(trackHeight ** 2 + trackWidth3 ** 2);
const trackLeft2 = [
  [
    [62.5 - topTrackWidth / 2 - trackWidth3, 0],
    [62.5 - topTrackWidth / 2 - 1.1 - trackWidth3 + length3 * Math.cos(angle3), 125]
  ]
];
const trackRight2 = [
  [
    [125 - (62.5 - topTrackWidth / 2 - trackWidth3), 0],
    [125 - (62.5 - topTrackWidth / 2 - 1.1 - trackWidth3) - length3 * Math.cos(angle3), 125]
  ]
];

var lowerPlankWidth = 1.5;

for (var i = 1; i < iterations; i += 2) {
  highRight = bt.getPoint(trackRight, 1 - (((i + 1) / iterations) ** power));
  highLeft = bt.getPoint(trackLeft, 1 - (((i + 1) / iterations) ** power));
  lowRight = bt.getPoint(trackRight, 1 - ((i / iterations) ** power));
  lowLeft = bt.getPoint(trackLeft, 1 - ((i / iterations) ** power));

  lowerPlankWidth = Math.sqrt((lowRight[1] - highRight[1]) / 2.4);

  t.jump(bt.getPoint(trackLeft, 1 - ((i / iterations) ** power)));
  t.setAngle(90);
  t.goTo(bt.getPoint(trackRight, 1 - ((i / iterations) ** power)));

  t.jump([highLeft[0] - 0.45, highLeft[1] - lowerPlankWidth]);
  t.setAngle(90);
  t.goTo([highRight[0] + 0.45, highRight[1] - lowerPlankWidth]);

  t.jump(bt.getPoint(trackLeft, 1 - (((i + 1) / iterations) ** power)));
  t.setAngle(90);
  t.goTo(bt.getPoint(trackRight, 1 - (((i + 1) / iterations) ** power)));

  highRight1 = bt.getPoint(trackRight1, 1 - (((i + 1) / iterations) ** power));
  highLeft1 = bt.getPoint(trackLeft1, 1 - (((i + 1) / iterations) ** power));
  lowRight1 = bt.getPoint(trackRight1, 1 - ((i / iterations) ** power));
  lowLeft1 = bt.getPoint(trackLeft1, 1 - ((i / iterations) ** power));

  highRight2 = bt.getPoint(trackRight2, 1 - (((i + 1) / iterations) ** power));
  highLeft2 = bt.getPoint(trackLeft2, 1 - (((i + 1) / iterations) ** power));
  lowRight2 = bt.getPoint(trackRight2, 1 - ((i / iterations) ** power));
  lowLeft2 = bt.getPoint(trackLeft2, 1 - ((i / iterations) ** power));

  t.jump([highRight1[0], highRight[1]]);
  t.goTo([highRight2[0], highRight[1]]);
  t.goTo([lowRight2[0], lowRight[1]]);
  t.goTo([lowRight1[0], lowRight[1]]);

  t.jump([highLeft1[0], highLeft[1]]);
  t.goTo([highLeft2[0], highLeft[1]]);
  t.goTo([lowLeft2[0], lowLeft[1]]);
  t.goTo([lowLeft1[0], lowLeft[1]]);

  t.jump([highLeft2[0], highLeft[1]]);
  t.goTo([highLeft2[0], highLeft[1] - lowerPlankWidth]);
  t.goTo([highLeft1[0] - 0.35, highLeft[1] - lowerPlankWidth]);

  t.jump([highRight2[0], highRight[1]]);
  t.goTo([highRight2[0], highRight[1] - lowerPlankWidth]);
  t.goTo([highRight1[0] + 0.35, highRight[1] - lowerPlankWidth]);
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// draw it
drawLines(finalLines);