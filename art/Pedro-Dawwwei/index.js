let x1, x2, y;

// Avaliable options: upLeft, up, upRight, right, downRight, down, downLeft, left, center
const eyesPosition = 'center'; // Shift + Enter to apply changes
//------------------------------------//

switch (eyesPosition.toLowerCase()) {
  case 'upleft':
    x1 = 38.8
    x2 = 77.3
    y = 79.0
    break;
  case 'up':
    x1 = 42.9
    x2 = 81.2
    y = 79.0
    break;
  case 'upright':
    x1 = 47.0
    x2 = 85.3
    y = 79.0
    break;
  case 'right':
    x1 = 47.0
    x2 = 85.3
    y = 70.0
    break;
  case 'downright':
    x1 = 47.0
    x2 = 85.3
    y = 63.0
    break;
  case 'down':
    x1 = 42.9
    x2 = 81.2
    y = 61.0
    break;
  case 'downleft':
    x1 = 38.8
    x2 = 77.3
    y = 63.0
    break;
  case 'left':
    x1 = 38.8
    x2 = 77.3
    y = 70.0
    break;
  case 'center':
    x1 = 42.9
    x2 = 81.2
    y = 70.0
    break;
  default:
    x1 = 42.9
    x2 = 81.2
    y = 70.0
};

const width = 125;
const height = 125;
setDocDimensions(width, height);

const head = new bt.Turtle()
head.jump([103.5, 85.0])
head.setAngle(104)
head.arc(151, 42);

const body = new bt.Turtle()
body.jump([22.2, 86.0])
body.goTo([22.2, 0])
body.jump([103.4, 85.5])
body.goTo([103.4, 0]);

const eyes = new bt.Turtle()
eyes.jump([51.7, 84])
eyes.setAngle(135)
eyes.arc(94, 12)
eyes.jump([89.9, 84])
eyes.setAngle(135)
eyes.arc(94, 12)

eyes.jump([34.4, 63])
eyes.setAngle(315)
eyes.arc(94, 12)
eyes.jump([72.4, 63])
eyes.setAngle(315)
eyes.arc(94, 12)

eyes.jump([34.3, 83.7])
eyes.goTo([34.3, 63])
eyes.jump([51.6, 83.7])
eyes.goTo([51.6, 63])
eyes.jump([89.8, 83.8])
eyes.goTo([89.8, 63])
eyes.jump([72.4, 83.8])
eyes.goTo([72.4, 63]);

const ieyes = new bt.Turtle()
ieyes.jump([x1, y])
ieyes.arc(360, 3)
ieyes.jump([x2, y])
ieyes.arc(360, 3);

const eyebrows = new bt.Turtle()
eyes.jump([51.7, 95])
eyes.setAngle(135)
eyes.arc(94, 12)
eyes.jump([89.9, 95])
eyes.setAngle(135)
eyes.arc(94, 12);

const nose = new bt.Turtle()
nose.jump([57.9, 57])
nose.setAngle(218)
nose.arc(94, 9)
nose.jump([66.4, 44])
nose.setAngle(400)
nose.arc(94, 9);

const mouth = new bt.Turtle()
mouth.jump([62.4, 7])
mouth.arc(360, 13);

const tongue = new bt.Turtle()
tongue.jump([73.9, 14])
tongue.setAngle(159)
tongue.arc(96, 10);

const ears = new bt.Turtle()
ears.jump([21.6, 72])
ears.setAngle(189)
ears.arc(166, 10)
ears.jump([103.5, 53])
ears.setAngle(366)
ears.arc(166, 10);

const hair = new bt.Turtle()
hair.jump([41.8, 111])
hair.setAngle(308)
hair.arc(101, 10)
hair.jump([53.5, 108])
hair.setAngle(308)
hair.arc(115, 10)
hair.jump([69.1, 111])
hair.setAngle(308)
hair.arc(101, 10);


drawLines(head.lines());
drawLines(body.lines());
drawLines(eyes.lines());
drawLines(ieyes.lines(), { fill: "Black" });
drawLines(nose.lines());
drawLines(mouth.lines());
drawLines(tongue.lines());
drawLines(ears.lines());
drawLines(hair.lines());