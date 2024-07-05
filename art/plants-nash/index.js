const width = 200;
const height = 200;

setDocDimensions(width, height);
bt.setRandSeed(1);

const rules = {
	Y: [
		"YFX[+Y][-Y]".split(""),
		"YFX[+Y][-Y]".split(""),
		"YFX[-Y]".split(""),
		"YFX[+Y]".split(""),
	],
	X: [
		"X[-FFF][+FFF]FX".split(""),
		"X[+FFF]FX".split(""),
		"X[-FFF]FX".split(""),
	],
};

const angle = 35;
const savedPositions = [];
const savedAngles = [];

const lines = [];

const normalizedPoint = (point) => [point[0] * width, point[1] * height];
const normalizedLine = (line) => line.map(normalizedPoint);
const pythagorean = (a, b) => Math.sqrt(a ** 2 + b ** 2);

for (let i = 1; i < 10; i += 1) {
	let instructions = "YYY".split("");
	for (let depth = 0; depth < 5; depth++) {
		instructions = instructions.flatMap((instruction) => {
			return (
				rules[instruction]?.[
					// Math.trunc(Math.random() * rules[instruction]?.length)
                    bt.randIntInRange(0, rules[instruction]?.length - 1)
				] ?? instruction
			);
		});
	}

	const turtle = new bt.Turtle()
		.jump(normalizedPoint([i / 10, bt.randInRange(0, 0.2)]))
		.setAngle(90);
	for (const instruction of instructions) {
		if (instruction === "F") turtle.forward(bt.randInRange(0.5, 1));
		else if (instruction === "+")
			turtle.left(bt.randInRange(angle - 20, angle + 10));
		else if (instruction === "-")
			turtle.right(bt.randInRange(angle - 20, angle + 10));
		else if (instruction === "[") {
			savedPositions.push(turtle.pos);
			savedAngles.push(turtle.angle);
		} else if (instruction === "]") {
			turtle.jump(savedPositions.pop());
			turtle.angle = savedAngles.pop();
		}
	}

	lines.push(...turtle.path);
}

function makeStar() {
	const star = [];
	const starlines = 24;

	for (let i = 0; i < starlines; i++) {
		star.push(
			normalizedLine([
				[0.5, 0.5],
				[0.5, bt.randInRange(0.7, 0.8)],
			])
		);

		bt.rotate(star, 360 / starlines, [0.5 * width, 0.5 * height]);
	}

	return star;
}

const starcount = 3;
const star5count = 3;

const starLocations = [];
const genStarLocation = () => {
	let x, y;
	do {
		x = bt.randInRange(0.1, 0.9) * width;
		y = bt.randInRange(0.6, 0.9) * height;
	} while (
		starLocations.find((loc) => pythagorean(loc[0] - x, loc[1] - y) < 20)
	);
	starLocations.push([x, y]);
	return [x, y];
};

for (let i = 0; i < starcount; i++) {
	const newStar = makeStar();
	bt.scale(newStar, bt.randInRange(0.1, 0.3));
	bt.translate(newStar, genStarLocation(), [0.5 * width, 0.5 * height]);
	lines.push(...newStar);
}

const TAU = 2 * Math.PI;
function make5PointStar(r) {
	const star = Array(6)
		.fill()
		.map((_, i) => {
			const a = (TAU * i) / 5 + TAU / 4;
			const randA = bt.randInRange(0, TAU);
			const randR = bt.randInRange(0, 1);
			return [
				r * Math.cos(a) + randR * Math.cos(randA),
				r * Math.sin(a) + randR * Math.sin(randA),
			];
		});

	bt.translate([star], genStarLocation());
	return star.map((_, i, arr) => arr[(i * 2) % 5]);
}

for (let i = 0; i < star5count; i++)
	lines.push(make5PointStar(bt.randInRange(3, 6)));

drawLines(lines);