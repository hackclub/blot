/*
@title: Bharat
@author: CodeRustyPro
@snapshot: Bharat
*/


const w = 300;
const h = 200;
const fw = 225;
const fh = 150;


const t = new bt.Turtle();

const rect = [
    [[0, 0], [fw, 0]],
    [[fw, 0], [fw, fh]],
    [[fw, fh], [0, fh]],
    [[0, fh], [0, 0]]
];
drawLines(rect);

const top = [
    [[0, fh * (2 / 3)], [fw, fh * (2 / 3)]]
];
drawLines(top);

const bottom = [
    [[0, fh * (1 / 3)], [fw, fh * (1 / 3)]]
];
drawLines(bottom);

const radius = fh / 11;
const spike = 24;
const spoke = radius * 2;
for (let i = 1; i < spoke; i++) {
    const angle = (2 * Math.PI * i) / spike;
    const s = [
        [[fw / 2, fh / 2], [fw / 2 + spike * Math.cos(angle), fh / 2 + spike * Math.sin(angle)]]
    ];
    drawLines(s);
}


