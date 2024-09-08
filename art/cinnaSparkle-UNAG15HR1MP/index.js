/*
welcome to blot!

@title: cinnaSparkle 
@author: UNAG15HR1MP
@snapshot: cinnamonroll.png 

I wanted to create something I would love to print on a blot.
So decided to combine my love of Cinnamonroll (Sanrio)
and Sparkles! To make it more dynamic and generative I 
randomized the head and sparkles. Yay!

check out this guide to learn how to program in blot
https://blot.hackclub.com/editor?guide=start
*/

const width = 140; 
const height = 140;

setDocDimensions(width, height);

// primary drawing arrays
const cinnaHead = [];
const eyes = [];
const blushes = [];

// draw eyes
const lefteye = new bt.Turtle();
lefteye.jump([49, 70]);
lefteye.arc(360, 2);
bt.join(eyes, bt.scale(lefteye.lines(),[0.85, 1.3]));

const righteye = new bt.Turtle();
righteye.jump([70, 70]);
righteye.arc(360, 2);
bt.join(eyes, bt.scale(righteye.lines(),[0.85, 1.3]));

// draw blush
const leftblush = new bt.Turtle();
leftblush.jump([43, 62]);
leftblush.arc(360, 4);
bt.join(blushes, bt.scale(leftblush.lines(),[1.36, 0.7]));

const rightblush = new bt.Turtle();
rightblush.jump([76, 62]);
rightblush.arc(360, 4);
bt.join(blushes, bt.scale(rightblush.lines(),[1.36, 0.7]));

// draw ears
const leftEar = [
  bt.nurbs([
    [36.9, 75],
    [11.5, 81.1],
    [8.3, 49],
    [36.5, 70]
  ])
];
bt.join(cinnaHead, leftEar);

const rightEar = [
  bt.nurbs([
    [81.6, 75],
    [107.1, 84.1],
    [109.6, 58],
    [81.9, 70]
  ])
];
bt.join(cinnaHead, rightEar);

// draw smile
const leftsmile = [
  bt.nurbs([
    [59, 68], 
    [53, 66], 
    [54, 70]
  ])
];
bt.join(cinnaHead, leftsmile);

const rightsmile = [
  bt.nurbs([
    [65, 70], 
    [67, 66], 
    [59, 68]
  ])
];
bt.join(cinnaHead, rightsmile);

// draw head
const topHead = [
  bt.nurbs([
    [82, 74], 
    [60, 98], 
    [37, 74]
  ])
];
bt.join(cinnaHead, topHead);

const bottomHead = [
  bt.nurbs([
    [82, 70], 
    [92, 54], 
    [27, 54], 
    [37, 70]
  ])
];
bt.join(cinnaHead, bottomHead);

const colors = ["yellow", "lightgreen", "lightorange", "black", "red", "lightblue"];

const sparkleCount = 30;
const sparkleSize = 4;
const sparkleSpace = 0.05;
const sparkleDipSize = 0.2;

function getRandomColor() {
  return colors[bt.randIntInRange(0, colors.length - 1)];
}

// draw random sparkles
let sparkles = [];
  for (let i = 0; i < sparkleCount; i++) {
    const xCenter = (Math.random() + sparkleSpace) * width;
    const yCenter = (Math.random() + sparkleSpace) * height;
    const randomSize = Math.random() + sparkleSpace;
    const tip = sparkleSize * randomSize;
    const dip = tip * sparkleDipSize;
      
    let sparkle = [
      [xCenter + tip , yCenter],
      [xCenter + dip, yCenter + dip],
      [xCenter, yCenter + tip],
      [xCenter - dip, yCenter + dip],
      [xCenter - tip, yCenter],
      [xCenter - dip, yCenter - dip],
      [xCenter, yCenter - tip],        
      [xCenter + dip, yCenter - dip],
      [xCenter + tip, yCenter]]
    
      sparkles.push(sparkle);
    }

const headRotation = bt.randIntInRange(-30, 30);

bt.translate(cinnaHead, [width/2, height/2], bt.bounds(cinnaHead).cc)
bt.rotate(cinnaHead, headRotation);
drawLines(cinnaHead);

bt.translate(eyes, [width/2, (height/2)+1], bt.bounds(eyes).cc)
bt.rotate(eyes, headRotation);
drawLines(eyes, { fill: "lightblue" });

bt.translate(blushes, [width/2, (height/2)-4], bt.bounds(blushes).cc)
bt.rotate(blushes, headRotation);
drawLines(blushes, { fill: "pink" });

drawLines(sparkles, { fill: getRandomColor() });