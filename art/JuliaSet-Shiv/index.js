/*
@title: Julia Set
@author: Shiv Gupta
@snapshot: un_tweaked.png
*/
const width = 125;
const height = 125;
const maxIterations = 100;
const zoom = 1;
const moveX = 0;
const moveY = 0;
const cRe = -0.7; // Real part of c
const cIm = 0.28; // Imaginary part of c

setDocDimensions(width, height);

let polylines = [];

function getColor(iter) {
    const hue = (iter * 360) / maxIterations;
    return `hsl(${hue}, 100%, 50%)`;
}

for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
        let zx = 1.5 * (x - width / 2) / (0.5 * zoom * width) + moveX;
        let zy = (y - height / 2) / (0.5 * zoom * height) + moveY;
        let i = maxIterations;
        while (zx * zx + zy * zy < 4 && i > 0) {
            const tmp = zx * zx - zy * zy + cRe;
            zy = 2.0 * zx * zy + cIm;
            zx = tmp;
            i--;
        }

        const color = getColor(i);
        if (i !== 0) {
            polylines.push([[x, y], [x + 1, y + 1]]);
        }
    }
}
drawLines(polylines, { stroke: 'black', width: 1 });

