/*
@title: Waves
@author: souptik samanta
@snapshot: snapshot1.png
*/

const gu = 6;
const fm = 3;
const dw = 150;
const dh = 150;
const mi = 100;
const ss = 1;
const cs = 4;

let vf = [];
const sv = Date.now();

function mv(val, is, ie, os, oe, clamp = false) {
    let mapped = os + ((val - is) * (oe - os)) / (ie - is);
    if (clamp) mapped = Math.max(os, Math.min(mapped, oe));
    return mapped;
}

function ca(x, y) {
    const off = Math.sin(sv * 0.0001 + x * 0.1) + Math.cos(sv * 0.0001 + y * 0.1);
    return mv(off * 0.5, -1, 1, 0, Math.PI * 2);
}

function ig(w, h, angleFn) {
    setDocDimensions(w, h);
    for (let i = 0; i < w / gu; i++) {
        vf[i] = [];
        for (let j = 0; j < h / gu; j++) {
            const angle = angleFn(i * gu, j * gu);
            vf[i][j] = new Vector(fm, angle, false);
        }
    }
}

function gc() {
    for (let x = 0; x < dw; x += cs) {
        for (let y = 0; y < dh; y += cs) {
            rc(mi, ss, new Coord(x, y));
        }
    }
}

function rc(it, sd, start) {
    let pathPoints = [];
    let pos = start;

    for (let i = 0; i < it; i++) {
        const col = Math.floor(pos.x / gu);
        const row = Math.floor(pos.y / gu);

        if (row < 0 || row >= vf.length || col < 0 || col >= vf[0].length) break;

        pathPoints.push(pos.toArray());
        const angle = vf[col][row].angle;
        pos.x += sd * Math.cos(angle);
        pos.y += sd * Math.sin(angle);

        if (pos.x < 0 || pos.x >= dw || pos.y < 0 || pos.y >= dh) break;
    }

    if (pathPoints.length > 2) {
        const curve = [bt.nurbs(pathPoints, { steps: 200, degree: 2 })];
        drawLines(curve, { width: 1, stroke: "#000000" });
    }
}

class Coord {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    angleTo(other) {
        const dy = other.y - this.y;
        const dx = other.x - this.x;
        return Math.atan2(dy, dx);
    }

    toArray() {
        return [this.x, this.y];
    }
}

class Vector {
    constructor(m, a, deg = true) {
        if (deg) a *= Math.PI / 180;
        this.x = m * Math.cos(a);
        this.y = m * Math.sin(a);
        this.m = m;
        this.angle = a;
    }

    drawVector(x = 0, y = 0) {
        const lineSegment = [
            [x, y],
            [x + this.x, y + this.y]
        ];
        drawLines([lineSegment], { width: 1, stroke: "#000000" });
    }
}

class LineStyle {
    constructor(t, c) {
        this.t = t;
        this.c = c;
    }

    applyToPath(path) {
        drawLines([path], { width: this.t, stroke: this.c });
    }
}

function blp(nl, ls, ct) {
    for (let layer = 0; layer < nl; layer++) {
        const offset = layer * ls;
        for (let x = offset; x < dw; x += cs) {
            for (let y = offset; y < dh; y += cs) {
                const customPath = tlp(mi, ss, new Coord(x, y), layer, ct);
                const style = new LineStyle(layer + 1, "#000000");
                style.applyToPath(customPath);
            }
        }
    }
}

function tlp(ms, ml, startPos, layerIndex, thickness) {
    let pointPath = [];
    let curPos = startPos;

    for (let step = 0; step < ms; step++) {
        const col = Math.floor(curPos.x / gu);
        const row = Math.floor(curPos.y / gu);

        if (row < 0 || row >= vf.length || col < 0 || col >= vf[0].length) break;

        pointPath.push(curPos.toArray());
        const dirAngle = vf[col][row].angle + layerIndex * 0.01;
        curPos.x += ml * Math.cos(dirAngle);
        curPos.y += ml * Math.sin(dirAngle);

        if (curPos.x < 0 || curPos.x >= dw || curPos.y < 0 || curPos.y >= dh) break;
    }

    return pointPath;
}

function rv(seedBase) {
    for (let i = 0; i < vf.length; i++) {
        for (let j = 0; j < vf[i].length; j++) {
            const modAngle = ca(seedBase + i, seedBase + j);
            vf[i][j].angle = modAngle;
        }
    }
}

function gp(sm) {
    rv(sm);
    ig(dw, dh, ca);
    blp(3, 2, 1.5);
}

ig(dw, dh, ca);
gc();
gp(50);
