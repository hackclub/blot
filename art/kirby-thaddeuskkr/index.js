/*
@title: Kirby
@author: thaddeuskkr
@snapshot: prev-sketch-1.png
*/

/* CONFIGURABLES STARTS HERE */
const upperSeed = 644014930; // seed for random placement of upper limbs / hands
const lowerSeed = 813323463; // seed for random placement of lower limbs / legs

const fill = true; // include color (colors customisable below)
const outlineColor = 'black'; // only applies if fill is set to false, changes the stroke color

const randomColors = false; // fun option - don't do this
let randomColorSeed = 23890677; // seed for random color generation

const handColor = randomColors ? randomColor() : '#ffb9c6'; // the color of both upper limbs / hands
const legColor = randomColors ? randomColor() : '#d40636'; // the color of both lower limbs / legs
const cheekColor = randomColors ? randomColor() : '#eb7591'; // the color of kirby's cheeks (ovals on the left and right of its mouth)
const bodyColor = randomColors ? randomColor() : 'pink'; // the color of kirby's body (the biggest circle)
const eyeOuterColor = randomColors ? randomColor() : 'black'; // the color of the outer part of its eye
const eyeInnerColor = randomColors ? randomColor() : 'white'; // the color of the inner part of its eye (what we know as eyeballs)
const smileColor = randomColors ? randomColor() : 'black'; // the color of kirby's smile (what we know as lips)
/* CONFIGURABLES ENDS HERE */

const t = new bt.Turtle();
const leftEye = new bt.Turtle();
const rightEye = new bt.Turtle();
const leftEyeInner = new bt.Turtle();
const rightEyeInner = new bt.Turtle();
const smile = new bt.Turtle();
const leftCheek = new bt.Turtle();
const rightCheek = new bt.Turtle();
const leftLeg = new bt.Turtle();
const rightLeg = new bt.Turtle();
const leftHand = new bt.Turtle();
const rightHand = new bt.Turtle();

// equation for our circle: (x-50)**2 + (y-0)**2 = 50**2
t.left(90);
t.arc(360, 50);

bt.setRandSeed(lowerSeed);
const leftLegX = bt.randInRange(70, 90);
const leftLegY = Math.sqrt(2500 - (leftLegX - 50) ** 2);
console.log(`Coordinates for left leg with seed ${lowerSeed}: -${leftLegX}, -${leftLegY}`);
leftLeg.jump([-leftLegX, -leftLegY]);
leftLeg.setAngle(180);
leftLeg.arc(360, 15);
drawLines(bt.cover(bt.rotate(bt.scale(leftLeg.lines(), [1.3, 2.1]), -determineBottomAngleOfRotation(-leftLegX, -leftLegY) + 5), t.lines()), {
    fill: fill ? legColor : undefined,
    stroke: fill ? legColor : outlineColor
});

const rightLegX = bt.randInRange(10, 30);
const rightLegY = Math.sqrt(2500 - (rightLegX - 50) ** 2);
console.log(`Coordinates for right leg with seed ${lowerSeed}: -${rightLegX}, -${rightLegY}`);
rightLeg.jump([-rightLegX, -rightLegY]);
rightLeg.setAngle(180);
rightLeg.arc(360, 15);
drawLines(bt.cover(bt.rotate(bt.scale(rightLeg.lines(), [1.3, 2.1]), determineBottomAngleOfRotation(-rightLegX, -rightLegY) - 5), t.lines()), {
    fill: fill ? legColor : undefined,
    stroke: fill ? legColor : outlineColor
});

bt.setRandSeed(upperSeed);
const leftHandX = bt.randInRange(70, 99);
const leftHandY = -Math.sqrt(2500 - (leftHandX - 50) ** 2);
console.log(`Coordinates for left hand with seed ${upperSeed}: -${leftHandX}, ${-leftHandY}`);
leftHand.jump([-leftHandX, -leftHandY]);
leftHand.setAngle(90);
leftHand.arc(360, 15);
drawLines(bt.cover(bt.rotate(bt.scale(leftHand.lines(), [1.3, 1.5]), determineTopAngleOfRotation(-leftHandX, -leftHandY)), t.lines()), {
    fill: fill ? handColor : undefined,
    stroke: fill ? handColor : outlineColor
});

const rightHandX = bt.randInRange(1, 30);
const rightHandY = -Math.sqrt(2500 - (rightHandX - 50) ** 2);
console.log(`Coordinates for right hand with seed ${upperSeed}: -${rightHandX}, ${-rightHandY}`);
rightHand.jump([-rightHandX, -rightHandY]);
rightHand.setAngle(270);
rightHand.arc(360, 15);
drawLines(bt.cover(bt.rotate(bt.scale(rightHand.lines(), [1.3, 1.5]), -determineTopAngleOfRotation(-rightHandX, -rightHandY)), t.lines()), {
    fill: fill ? handColor : undefined,
    stroke: fill ? handColor : outlineColor
});

drawLines(t.lines(), { fill: fill ? bodyColor : undefined, stroke: fill ? bodyColor : outlineColor });

leftEye.jump([-62.5, 8]);
leftEye.arc(360, 8);
drawLines(bt.scale(leftEye.lines(), [0.74, 1.83]), { fill: fill ? eyeOuterColor : undefined, stroke: fill ? eyeOuterColor : outlineColor });
leftEyeInner.jump([-62.5, 14.0]);
leftEyeInner.arc(360, 8);
drawLines(bt.scale(leftEyeInner.lines(), [0.43, 0.87]), { fill: fill ? eyeInnerColor : undefined, stroke: fill ? eyeInnerColor : outlineColor });

rightEye.jump([-37.5, 8]);
rightEye.arc(360, 8);
drawLines(bt.scale(rightEye.lines(), [0.74, 1.83]), { fill: fill ? eyeOuterColor : undefined, stroke: fill ? eyeOuterColor : outlineColor });
rightEyeInner.jump([-37.5, 14.0]);
rightEyeInner.arc(360, 8);
drawLines(bt.scale(rightEyeInner.lines(), [0.43, 0.87]), { fill: fill ? eyeInnerColor : undefined, stroke: fill ? eyeInnerColor : outlineColor });

smile.jump([-56.75, -4]);
smile.right(39);
smile.arc(80, 10);
drawLines(bt.scale(smile.lines(), [1.0, 1]), { width: fill ? 4 : 1, stroke: fill ? smileColor : outlineColor });

leftCheek.jump([-78, -10]);
leftCheek.arc(360, 8);
drawLines(bt.scale(leftCheek.lines(), [1.0, 0.36]), { fill: fill ? cheekColor : undefined, stroke: fill ? cheekColor : outlineColor });

rightCheek.jump([-22, -10]);
rightCheek.arc(360, 8);
drawLines(bt.scale(rightCheek.lines(), [1.0, 0.36]), { fill: fill ? cheekColor : undefined, stroke: fill ? cheekColor : outlineColor });

function determineBottomAngleOfRotation(x, y) {
    const distanceFromBottomPoint = Math.sqrt((-50 - x) ** 2 + (-50 - y) ** 2);
    const cosDistance = (50 ** 2 + 50 ** 2 - distanceFromBottomPoint ** 2) / (2 * 50 * 50);
    const angleRadians = Math.acos(cosDistance);
    const angleDegrees = (angleRadians * 180) / Math.PI;
    return angleDegrees;
}

function determineTopAngleOfRotation(x, y) {
    const distanceFromTopPoint = Math.sqrt((-50 - x) ** 2 + (50 - y) ** 2);
    const cosDistance = (50 ** 2 + 50 ** 2 - distanceFromTopPoint ** 2) / (2 * 50 * 50);
    const angleRadians = Math.acos(cosDistance);
    const angleDegrees = (angleRadians * 180) / Math.PI;
    return angleDegrees;
}

function randomColor() {
    bt.setRandSeed(randomColorSeed);
    const randomColor = Math.floor(bt.rand() * 16777215).toString(16);
    randomColorSeed *= 2;
    return `#${randomColor}`;
}
