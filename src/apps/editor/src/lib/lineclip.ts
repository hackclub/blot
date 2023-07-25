// taken from https://github.com/mapbox/lineclip, copied into here to add types/modified slightly

// Cohen-Sutherland line clippign algorithm, adapted to efficiently
// handle polylines rather than just segments

import type { Point } from "haxidraw-client";

type BBox = [number, number, number, number];

/**
 * @param points an array of [x, y] points
 * @param bbox a bounding box as [xmin, ymin, xmax, ymax]
 * @returns an array of clipped lines
 */
export default function lineclip(points: Point[], bbox: BBox) {
    let len = points.length,
        codeA = bitCode(points[0], bbox),
        part: Point[] = [],
        i: number,
        a: Point,
        b: Point,
        codeB: number,
        lastCode: number;

    const result: Point[][] = [];

    for (i = 1; i < len; i++) {
        a = points[i - 1];
        b = points[i];
        codeB = lastCode = bitCode(b, bbox);

        while (true) {
            if (!(codeA | codeB)) {
                // accept
                part.push(a);

                if (codeB !== lastCode) {
                    // segment went outside
                    part.push(b);

                    if (i < len - 1) {
                        // start a new line
                        result.push(part);
                        part = [];
                    }
                } else if (i === len - 1) {
                    part.push(b);
                }
                break;
            } else if (codeA & codeB) {
                // trivial reject
                break;
            } else if (codeA) {
                // a outside, intersect with clip edge
                a = intersect(a, b, codeA, bbox)!;
                codeA = bitCode(a, bbox);
            } else {
                // b outside
                b = intersect(a, b, codeB, bbox)!;
                codeB = bitCode(b, bbox);
            }
        }

        codeA = lastCode;
    }

    if (part.length) result.push(part);

    return result;
}

// intersect a segment against one of the 4 lines that make up the bbox

function intersect(a: Point, b: Point, edge: number, bbox: BBox): Point | null {
    return edge & 8
        ? [a[0] + ((b[0] - a[0]) * (bbox[3] - a[1])) / (b[1] - a[1]), bbox[3]] // top
        : edge & 4
        ? [a[0] + ((b[0] - a[0]) * (bbox[1] - a[1])) / (b[1] - a[1]), bbox[1]] // bottom
        : edge & 2
        ? [bbox[2], a[1] + ((b[1] - a[1]) * (bbox[2] - a[0])) / (b[0] - a[0])] // right
        : edge & 1
        ? [bbox[0], a[1] + ((b[1] - a[1]) * (bbox[0] - a[0])) / (b[0] - a[0])]
        : null; // left
}

// bit code reflects the point position relative to the bbox:

//         left  mid  right
//    top  1001  1000  1010
//    mid  0001  0000  0010
// bottom  0101  0100  0110

function bitCode(p: Point, bbox: BBox) {
    let code = 0;

    if (p[0] < bbox[0]) code |= 1; // left
    else if (p[0] > bbox[2]) code |= 2; // right

    if (p[1] < bbox[1]) code |= 4; // bottom
    else if (p[1] > bbox[3]) code |= 8; // top

    return code;
}
