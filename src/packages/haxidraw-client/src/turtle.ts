import { flattenSVG } from "./flatten-svg/index";
import { displace } from "./drawingFns/displace";
import { resample } from "./drawingFns/resample";
import { interpolatePolylines } from "./drawingFns/interpolatePolylines";
import { getAngle } from "./drawingFns/getAngle";
import { getNormal } from "./drawingFns/getNormal";
import { trimPolylines } from "./drawingFns/trimPolylines";
import { filterBreakPolylines } from "./drawingFns/filterBreakPolylines";
import { mergePolylines } from "./drawingFns/mergePolylines";
import type { Point, Polyline } from "./types";

export class Turtle {
    drawing: boolean;
    location: Point;
    angle: number;
    path: Polyline[];

    constructor(start: Point = [0, 0]) {
        this.drawing = true;
        this.location = [...start];
        this.angle = 0;
        this.path = [[start]];
    }

    up() {
        if (!this.drawing) return this;
        this.drawing = false;
        this.path.push([[...this.location]]);
        return this;
    }

    down() {
        this.drawing = true;
        return this;
    }

    goto([x, y]: Point) {
        const lastPath = this.path.at(-1)!;
        if (this.drawing) {
            const [lastX, lastY] = this.location;
            const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
            if (dist < 0.0001) return this;
            lastPath.push([x, y]);
        } else {
            if (lastPath.length === 1) lastPath[0] = [x, y];
        }

        this.location = [x, y];

        return this;
    }

    forward(distance: number) {
        const last = this.location;
        const a = (this.angle / 180) * Math.PI;
        const x = last[0] + distance * Math.cos(a);
        const y = last[1] + distance * Math.sin(a);

        this.goto([x, y]);

        return this;
    }

    arc(angle: number, radius: number) {
        const theta = Math.abs(angle);

        const length = ((radius * theta) / 180) * Math.PI;

        const ogAngle = this.angle;
        const thetaStep = 1;
        const steps = theta / thetaStep;
        const distanceStep = length / steps;

        for (let i = 0; i < steps; i++) {
            if (angle >= 0) this.right(thetaStep);
            else this.left(thetaStep);

            this.forward(distanceStep);
        }

        this.setAngle(ogAngle - angle);

        return this;
    }

    setAngle(theta: number) {
        this.angle = theta;

        return this;
    }

    right(theta: number) {
        this.angle -= theta;

        return this;
    }

    left(theta: number) {
        this.angle += theta;

        return this;
    }

    translate(to: Point, origin: Point) {
        this.location = translate(this.location, to, origin);

        iteratePath(this, (pt) => translate(pt, to, origin));
        return this;
    }

    rotate(angle: number, origin: Point) {
        if (!origin) origin = this.cc;

        this.location = rotate(this.location, angle, origin);

        iteratePath(this, (pt) => rotate(pt, angle, origin));
        return this;
    }

    scale(factor: number, origin: Point) {
        if (!origin) origin = this.cc;

        this.location = scale(this.location, factor, origin);

        iteratePath(this, (pt) => scale(pt, factor, origin));
        return this;
    }

    displace(fn: Parameters<typeof displace>[1]) {
        this.path.forEach((pl) => displace(pl, fn));

        return this;
    }

    iteratePath(fn: Parameters<typeof iteratePath>[1]) {
        iteratePath(this, fn);
        return this;
    }

    originate() {
        this.translate([0, 0], this.cc);
        return this;
    }

    fromSVG(svgString: string) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, "image/svg+xml");
        const svg = doc.querySelector("svg")!;
        const pls = flattenSVG(svg, { maxError: 0.001 });

        pls.forEach((pl) => {
            this.up();
            pl.points.forEach((pt, i) => {
                this.goto([pt[0], pt[1]]);
                if (i === 0) this.down();
            });
        });

        return this;
    }

    join(...turtles: Turtle[]) {
        turtles.forEach((t) => {
            this.path.push(...t.path);
        });

        return this;
    }

    merge(threshold = 0.01) {
        this.path = mergePolylines(this.path, threshold);

        return this;
    }

    copy() {
        const newPath = JSON.parse(JSON.stringify(this.path));
        const t = new Turtle();
        t.path = newPath;
        return t;
    }

    resample(resolution: number) {
        this.path.forEach((pl) => {
            const newPl = resample(pl, resolution);
            while (pl.length > 0) pl.pop();

            while (newPl.length > 0) {
                pl.push(newPl.shift()!);
            }
        });

        return this;
    }

    interpolate(t: number) {
        return interpolatePolylines(this.path, t);
    }

    getAngle(t: number) {
        return getAngle(this.path, t);
    }

    getNormal(t: number) {
        return getNormal(this.path, t);
    }

    trim(t0: number, t1: number) {
        trimPolylines(this.path, t0, t1);
        return this;
    }

    warp(fn: Turtle | ((t: number) => number), baseAngle: number | ((n: number) => number) | null = null) {
        // TODO: if baseAngle is undefined then normal, if fn, pass normal, if number use number

        if (fn instanceof Turtle) {
            const ogTurtle = fn;
            fn = (t: number) => ogTurtle.interpolate(t)[1];
        }

        const tValues = tValuesForPoints(this.path);

        const newPts: Point[] = [];

        tValues.forEach((t, i) => {
            const pt = this.path.flat()[i];

            let angle = baseAngle ?? this.getAngle(t);
            if (typeof angle === "function") {
                angle = angle(this.getAngle(t));
            } else if (typeof angle === "number") {
                angle = angle;
            }

            // const normal = this.getNormal(t);

            const y = (fn as (t: number) => number)(t);

            // const newPt = displacePointAlongNormal(pt, normal, y);
            // newPts.push(newPt);

            const newPoint = rotate([0, y], angle);

            newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
        });

        this.path.flat().forEach((pt, i, arr) => {
            pt[0] = newPts[i][0];
            pt[1] = newPts[i][1];
        });

        return this;
    }

    extrema() {
        return extrema(this.path.flat());
    }

    get width() {
        const { xMin, xMax } = this.extrema();

        return xMax - xMin;
    }

    get height() {
        const { yMin, yMax } = this.extrema();

        return yMax - yMin;
    }

    get length() {
        return getTotalLength(this.path);
    }

    get start(): Point {
        if(!this.path.at(0)) throw new Error("Path is empty, so there is no start point");
        const pt = this.path.at(0)!.at(0)!;

        return [pt[0], pt[1]];
    }

    get end(): Point {
        if(!this.path.at(-1)) throw new Error("Path is empty, so there is no end point");
        const pt = this.path.at(-1)!.at(-1)!;

        return [pt[0], pt[1]];
    }

    get lt(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMin, yMax];
    }

    get lc(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMin, (yMax + yMin) / 2];
    }

    get lb(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMin, yMin];
    }

    get ct(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [(xMax + xMin) / 2, yMax];
    }

    get cc(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [(xMax + xMin) / 2, (yMax + yMin) / 2];
    }

    get cb(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [(xMax + xMin) / 2, yMin];
    }

    get rt(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMax, yMax];
    }

    get rc(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMax, (yMax + yMin) / 2];
    }

    get rb(): Point {
        const { xMin, xMax, yMin, yMax } = this.extrema();

        return [xMax, yMin];
    }
}

function iteratePath(turtle: Turtle, fn: (pt: Point, t: number) => Point | "REMOVE" | "BREAK" | void) {
    const path = turtle.path;
    const toRemove = new Set();
    const toBreak = new Set();

    const tValues = tValuesForPoints(path);

    let ptIndex = 0;

    let newPts: Record<number, Point> = {};
    for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < path[i].length; j++) {
            const pt = path[i][j];

            const newPt = fn(pt, tValues[ptIndex]);

            if (newPt === "BREAK") {
                toBreak.add(`${i},${j}`);
            } else if (newPt === "REMOVE") {
                toRemove.add(`${i},${j}`);
            } else if (Array.isArray(newPt)) {
                // const [ newX, newY ] = newPt;
                // path[i][j] = [ newX, newY ];
                newPts[ptIndex] = newPt;
            }

            ptIndex++;
        }
    }

    path.flat().forEach((pt, i) => {
        if (i in newPts) {
            pt[0] = newPts[i][0];
            pt[1] = newPts[i][1];
        }
    });

    filterBreakPolylines(
        path,
        (i, j, arr) => toRemove.has(`${i},${j}`),
        (i, j, arr) => toBreak.has(`${i},${j}`)
    );

    turtle.path = path.filter((pl) => pl.length > 1);

    return turtle;
}

function translate(pt: Point, [x, y]: Point, origin: Point = [0, 0]): Point {
    return [pt[0] + x - origin[0], pt[1] + y - origin[1]];
}

function rotate(pt: Point, angle: number, origin: Point = [0, 0]): Point {
    let delta = (angle / 180) * Math.PI;

    let hereX = pt[0] - origin[0];
    let hereY = pt[1] - origin[1];

    let newPoint: Point = [
        hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
        hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
    ];

    return newPoint;
}

function scale(pt: Point, factor: Point | number, origin: Point): Point {
    if (typeof factor === "number") factor = [factor, factor];
    const [xFactor, yFactor] = factor;
    const [x, y] = origin;
    const newPoint: Point = [
        (pt[0] - x) * xFactor + x,
        (pt[1] - y) * yFactor + y
    ];

    return newPoint;
}

function extrema(pts: Point[]) {
    let xMin = Number.POSITIVE_INFINITY;
    let xMax = Number.NEGATIVE_INFINITY;
    let yMin = Number.POSITIVE_INFINITY;
    let yMax = Number.NEGATIVE_INFINITY;

    pts.forEach((p) => {
        const [x, y] = p;

        if (xMin > x) xMin = x;
        if (xMax < x) xMax = x;
        if (yMin > y) yMin = y;
        if (yMax < y) yMax = y;
    });

    return {
        xMin,
        xMax,
        yMin,
        yMax
    };
}

function tValuesForPoints(polylines: Polyline[]) {
    let totalLength = 0;
    let lengths = [];
    let tValues = [0];

    for (let i = 0; i < polylines.length; i++) {
        let polyline = polylines[i];
        for (let j = 1; j < polyline.length; j++) {
            let dx = polyline[j][0] - polyline[j - 1][0];
            let dy = polyline[j][1] - polyline[j - 1][1];
            let segmentLength = Math.sqrt(dx * dx + dy * dy);
            totalLength += segmentLength;
            lengths.push(segmentLength);
        }
    }

    let accumulatedLength = 0;
    for (let i = 0; i < lengths.length; i++) {
        accumulatedLength += lengths[i];
        tValues.push(accumulatedLength / totalLength);
    }

    return tValues;
}

function getTotalLength(polylines: Polyline[]) {
    let totalLength = 0;
    for (let i = 0; i < polylines.length; i++) {
        let polyline = polylines[i];
        for (let j = 1; j < polyline.length; j++) {
            let dx = polyline[j][0] - polyline[j - 1][0];
            let dy = polyline[j][1] - polyline[j - 1][1];
            totalLength += Math.sqrt(dx * dx + dy * dy);
        }
    }
    return totalLength;
}

function displacePointAlongNormal([px, py]: Point, normal: Point, magnitude: number): Point {
    // Scale the normal by the magnitude
    let dx = normal[0] * magnitude;
    let dy = normal[1] * magnitude;

    // Translate the point by the scaled normal
    let newPx = px + dx;
    let newPy = py + dy;

    return [newPx, newPy];
}
