/*
@title: Happy 12th Birthday!
@author: Kayla
@snapshot: blotHappy12Birthday.png
*/

//ONLY AGE 12 WILL LET YOU HAVE FIRE AND SAY HBD! AT THE TOP

const width = 125;
const height = 125;
const randomX = bt.randInRange(-5,5);
const randomY = bt.randInRange(-5,5);
const randomAngle = bt.randInRange(0,360);

//change the amount of confetti here (8 works best)!!
const confettiCount = 8;
const YCoordinate = (width/confettiCount);
const age = 12;
const candleWidth = 5;

setDocDimensions(width, height);

const finalLines = [];
const confettiLines = [];
const candleLines = [];
const fireLines = [];
const happyBirthdayText = [];
bt.cover(confettiLines, candleLines);

function rect(w, h) {

  return [
    [
      [-w/2, h/2],
      [w/2, h/2],
      [w/2, -h/2],
      [-w/2, -h/2],
      [-w/2, h/2],
    ]
  ]
}


for (let p = 0; p < 6; p++) {
  for (let i = 0; i < confettiCount; i++) {
    const confetti = rect(1,3);
    bt.translate(confetti, [(width-(i*(width/confettiCount)))-(width/confettiCount)/2-randomX, YCoordinate*p+40-randomY]);
    bt.rotate(confetti, randomAngle*i);
    bt.join(confettiLines, confetti);
    bt.join(finalLines, confettiLines);
  }
}

for (let j = 0; j < age; j++) {
  const candle = rect(candleWidth,30);
  bt.translate(candle, [(width/age)+(j*width/age)-(candleWidth),15]);
  bt.join(candleLines, candle);
  bt.join(finalLines, candleLines);
}

if (age === 12) {
  for (let k = 0; k < 12; k++) {
    const fire = [[[0,6],[2,0],[0,-1],[-2,0],[0,6]]];
    bt.translate(fire, [(width/age)+(k*width/age)-(candleWidth),35]);
    bt.join(fireLines, fire);
    bt.join(finalLines, fireLines);
  }

  const hLetter = [
    [
      [0,0],
      [0,40],
      [5,40],
      [5,22.5],
      [10,22.5],
      [10,40],
      [15,40],
      [15,0],
      [10,0],
      [10,17.5],
      [5,17.5],
      [5,0],
      [0,0]
    ]
  ];

  const bLetter = [
    [
      [20,0],
      [20,40],
      [35,40],
      [35,22.5],
      [25,20],
      [35,17.5],
      [35,0],
      [20,0]
    ]
  ];

  const dLetter = [
    [
      [40,0],
      [40,40],
      [55,40],
      [55,0],
      [40,0]
    ]
  ];
  
  bt.join(happyBirthdayText, hLetter);
  bt.join(happyBirthdayText, bLetter);
  bt.join(happyBirthdayText, dLetter);
  bt.translate(happyBirthdayText, [width/2-27.5, height/2]);
  bt.join(finalLines, happyBirthdayText);
}



drawLines(finalLines);