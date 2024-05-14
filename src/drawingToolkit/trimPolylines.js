function interpolatePolyline(polyline, startDistance, endDistance) {
    let accumulatedLength = 0;
    let started = false;
    const trimmedPolyline = [];

    for (let i = 0; i < polyline.length - 1; i++) {
        const pointA = polyline[i];
        const pointB = polyline[i + 1];
        const segmentLength = distance(pointA, pointB);

        if (!started && accumulatedLength + segmentLength >= startDistance) {
            const ratio = (startDistance - accumulatedLength) / segmentLength;
            const startPoint = interpolate(pointA, pointB, ratio);
            trimmedPolyline.push(startPoint);
            started = true;
        }

        if (started) {
            if (accumulatedLength + segmentLength > endDistance) {
                const ratio = (endDistance - accumulatedLength) / segmentLength;
                const endPoint = interpolate(pointA, pointB, ratio);
                trimmedPolyline.push(endPoint);
                break;
            } else {
                if (accumulatedLength >= startDistance) {
                    trimmedPolyline.push(pointA);
                }
            }
        }

        accumulatedLength += segmentLength;
    }

    return trimmedPolyline;
}

export function trimPolylines(polylines, startT, endT) {
    const totalLength = calculateTotalLength(polylines);
    const startLength = totalLength * Math.max(0, Math.min(1, startT));
    const endLength = totalLength * Math.max(0, Math.min(1, endT));

    let currentLength = 0;
    const trimmedPolylines = [];

    for (const polyline of polylines) {
        const remainingLength = totalLength - currentLength;
        if (startLength > currentLength + remainingLength || endLength <= currentLength) {
            currentLength += calculateTotalLength([polyline]);
            continue;
        }

        const localStart = Math.max(0, startLength - currentLength);
        const localEnd = Math.min(calculateTotalLength([polyline]), endLength - currentLength);
        const trimmedPolyline = interpolatePolyline(polyline, localStart, localEnd);

        if (trimmedPolyline.length > 0) {
            trimmedPolylines.push(trimmedPolyline);
        }

        currentLength += calculateTotalLength([polyline]);
        if (currentLength >= endLength) break;
    }

    while (polylines.length) polylines.pop();

    trimmedPolylines.forEach(pl => polylines.push(pl));

    return trimmedPolylines;
}

function calculateTotalLength(polylines) {
    let length = 0;
    for (const polyline of polylines) {
        for (let i = 0; i < polyline.length - 1; i++) {
            length += distance(polyline[i], polyline[i + 1]);
        }
    }
    return length;
}

function distance(pointA, pointB) {
    return Math.sqrt((pointB[0] - pointA[0]) ** 2 + (pointB[1] - pointA[1]) ** 2);
}

function interpolate(pointA, pointB, ratio) {
    return [
        pointA[0] + (pointB[0] - pointA[0]) * ratio,
        pointA[1] + (pointB[1] - pointA[1]) * ratio
    ];
}