export function trimPolylines(polylines, t1, t2) {
    t1 = Math.min(1, t1);
    t1 = Math.max(0, t1);
    t2 = Math.min(1, t2);
    t2 = Math.max(0, t2);

    let totalLength = getTotalLength(polylines);
    let targetLength1 = totalLength * t1;
    let targetLength2 = totalLength * t2;

    let accumulatedLength = 0;
    let startIndex, endIndex, startPolylineIndex, endPolylineIndex;

    // Find the start and end indices
    for (let i = 0; i < polylines.length; i++) {
        let polyline = polylines[i];
        for (let j = 1; j < polyline.length; j++) {
            let dx = polyline[j][0] - polyline[j - 1][0];
            let dy = polyline[j][1] - polyline[j - 1][1];
            let segmentLength = Math.sqrt(dx * dx + dy * dy);

            if (!startIndex && accumulatedLength + segmentLength >= targetLength1) {
                startIndex = j;
                startPolylineIndex = i;
            }

            if (!endIndex && accumulatedLength + segmentLength >= targetLength2) {
                endIndex = j;
                endPolylineIndex = i;
                break;
            }

            accumulatedLength += segmentLength;
        }
    }

    // Modify the polylines array
    if (endPolylineIndex != undefined) {
        polylines.splice(endPolylineIndex + 1);
        polylines[endPolylineIndex].splice(endIndex + 1);
    }
    polylines.splice(0, startPolylineIndex);
    polylines[0].splice(0, startIndex - 1);
}

function getTotalLength(polylines) {
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