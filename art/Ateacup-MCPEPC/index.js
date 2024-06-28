/*
@title: A teacup
@author: Jaehyeon Park <me@mcpepc.com> (https://www.mcpepc.com/)
@snapshot: 0.svg
*/

/* global bt, drawLines, setDocDimensions */

const width = 125;
const height = 125;
const heightScale = bt.randInRange(0.1, 0.5);
const cupHeight = bt.randInRange(30, 70);
const coasterSidesNumber = bt.randIntInRange(3, 10);
const smokesNumber = bt.randIntInRange(0, 25);

const widthCenter = width / 2;
const smokeMaxWidthHalf =
	smokesNumber === 0 ? 0 : Math.min(widthCenter / smokesNumber - 1, 20);

setDocDimensions(width, height);

const cupBottomTurtle = new bt.Turtle();
cupBottomTurtle.left(180);
const cupBottomRadius = bt.randInRange(0.1, 2);
cupBottomTurtle.arc(180, cupBottomRadius);
const cupBottomWidth = bt.randInRange(10, 30);
cupBottomTurtle.forward(cupBottomWidth);
cupBottomTurtle.arc(180, cupBottomRadius);
const cup = cupBottomTurtle.lines();

const cupRightSide = [
	bt.catmullRom([
		[0, 0],
		[9, cupHeight * 0.1],
		[17, cupHeight * 0.4],
		[20, cupHeight * 0.8],
		[19, cupHeight],
	]),
];
const cupLeftSide = bt.copy(cupRightSide);
bt.scale(cupLeftSide, [-1, 1], [0, 0]);
bt.join(cup, cupLeftSide);
bt.translate(cupRightSide, [cupBottomWidth, 0]);
bt.join(cup, cupRightSide);

const cupRimTurtle = new bt.Turtle();
cupRimTurtle.arc(360, (38 + cupBottomWidth) / 2);
const cupRim = cupRimTurtle.lines();
bt.scale(cupRim, [1, heightScale]);
bt.translate(cupRim, [-19, cupHeight], bt.bounds(cupRim).lc);
bt.join(cup, cupRim);

bt.translate(
	cup,
	[widthCenter, 20],
	[cupBottomWidth / 2, cupBottomRadius * -2]
);

const cupHandle = [
	bt.catmullRom([
		[-9, -11],
		[0, -11],
		[8, -10],
		[10, -6],
		[10, 6],
		[8, 10],
		[0, 11],
		[-5, 11],
	]),
];
bt.scale(cupHandle, cupHeight / 30);
const cupHandleInner = bt.copy(cupHandle);
bt.scale(cupHandleInner, [0.8, 0.7], bt.bounds(cupHandle).lc);
bt.join(cupHandle, cupHandleInner);
bt.translate(cupHandle, bt.bounds(cup).rc);
bt.cover(cupHandle, cup);
for (let i = 0; i < cupHandle.length; i++) {
	if (cupHandle[i].length < 200) {
		cupHandle.splice(i, 1);
		i--;
	}
}

bt.join(cup, cupHandle);

const coasterTurtle = new bt.Turtle();
coasterTurtle.right(180 / coasterSidesNumber);
for (let i = 0; i < coasterSidesNumber; i++) {
	coasterTurtle.forward(200 / coasterSidesNumber);
	coasterTurtle.left(360 / coasterSidesNumber);
}

const coaster = coasterTurtle.lines();
bt.scale(coaster, [1, heightScale]);
bt.translate(coaster, [widthCenter, 20], bt.bounds(coaster).cc);
bt.cover(coaster, cup);
if (coaster.length === 3) {
	coaster.splice(1, 1);
}

bt.join(cup, coaster);

drawLines(cup);

const smokes = [];
const smokeRandomWidth = () =>
	bt.randInRange(-smokeMaxWidthHalf, smokeMaxWidthHalf);
for (let i = 0; i < smokesNumber; i++) {
	const smokeHeight = bt.randInRange(15, 25);
	const smokeStopHeight = smokeHeight / 2;
	const smoke = [
		bt.catmullRom([
			[smokeRandomWidth(), 0],
			[smokeRandomWidth(), bt.randInRange(0, smokeStopHeight - 0.5)],
			[smokeRandomWidth(), bt.randInRange(smokeStopHeight + 0.5, smokeHeight)],
			[smokeRandomWidth(), smokeHeight],
		]),
	];
	const smokeBounds = bt.bounds(smoke);
	bt.translate(
		smoke,
		[
			(width / smokesNumber) * (i + 0.5),
			bt.randInRange(bt.bounds(cup).ct[1] + 1, height - smokeBounds.height - 1),
		],
		smokeBounds.cb
	);
	drawLines(smoke, { width: bt.randInRange(1, 2) });
}

drawLines(smokes);
