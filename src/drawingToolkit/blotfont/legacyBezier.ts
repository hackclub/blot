
import { rotatePt } from "../affineTransformations"
import { Turtle } from "../Turtle"
import { Point } from "./funcs"
import { getAngleAtT } from "../getAngleAtT"

// Ported from Leo's compatability code for the old API

const calculateBezierPoint = (t: number, p0: Point, p1: Point, p2: Point, p3: Point): Point => {
    let u = 1 - t
    let tt = t * t
    let uu = u * u
    let uuu = uu * u
    let ttt = tt * t

    let p = [uuu * p0[0], uuu * p0[1]] // u^3 * p0
    p[0] += 3 * uu * t * p1[0] // 3u^2t * p1
    p[1] += 3 * uu * t * p1[1]
    p[0] += 3 * u * tt * p2[0] // 3ut^2 * p2
    p[1] += 3 * u * tt * p2[1]
    p[0] += ttt * p3[0] // t^3 * p3
    p[1] += ttt * p3[1]

    return p as Point
}

const findTForGivenX = (xTarget: number, p0: Point, p1: Point, p2: Point, p3: Point): number => {
    let tolerance = 0.00001
    let t = 0.5 // Start with approximate solution
    let iterations = 0

    while (iterations < 1000) {
        // Max iterations to prevent infinite loop
        let p = calculateBezierPoint(t, p0, p1, p2, p3)
        let difference = p[0] - xTarget
        if (Math.abs(difference) < tolerance) {
            return t
        } else {
            t = t - difference / 2 // Approximate a new t value
        }
        iterations++
    }
    return t // Return the approximate t value
}

const getYForX = (x: number, p0: Point, p1: Point, p2: Point, p3: Point): number => {
    let t = findTForGivenX(x, p0, p1, p2, p3)
    let p = calculateBezierPoint(t, p0, p1, p2, p3)
    return p[1]
}

const tValuesForPoints = (polylines: number[][][]): Array<Point> => {
    let totalLength = 0;
    let lengths: any = [];
    let tValues: any = [];
    let segmentLength = 0;
    for (let i = 0; i < polylines.length; i++) {
        let polyline2 = polylines[i];
        for (let j = 0; j < polyline2.length; j++) {
            if (j > 0) {
                let dx = polyline2[j][0] - polyline2[j - 1][0];
                let dy = polyline2[j][1] - polyline2[j - 1][1];
                segmentLength = Math.sqrt(dx * dx + dy * dy);
                totalLength += segmentLength;
            }
            lengths.push(segmentLength);
        }
    }
    let accumulatedLength = 0;
    for (let i = 0; i < lengths.length; i++) {
        accumulatedLength += lengths[i];
        tValues.push(accumulatedLength / totalLength);
    }
    return tValues;
};

export const bezierEasing = (initial: number, p0: Point, p1: Point, final: number) => {
    return (x) =>
        getYForX(
            x,
            [0, initial],
            [Math.min(Math.max(0, p0[0]), 1), p0[1]],
            [Math.min(Math.max(0, p1[0]), 1), p1[1]],
            [1, final]
        )
}

export const warp = (turtle: Turtle, fn: any, baseAngle = null) => {
    const tValues = tValuesForPoints(turtle.path);
    const newPts: Array<Point> = [];
    tValues.forEach((t, i) => {
        const pt = turtle.path.flat()[i];
        let angle: any = baseAngle ?? getAngleAtT(turtle.path, t);
        if (typeof angle === "function") {
            angle = angle(getAngleAtT(turtle.path, t));
        } else if (typeof angle === "number") {
            angle = angle;
        }
        const y = fn(t);
        const newPoint = rotatePt([0, y], angle);
        newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
    });
    turtle.path.flat().forEach((pt, i, arr) => {
        pt[0] = newPts[i][0];
        pt[1] = newPts[i][1];
    });
    return turtle


}