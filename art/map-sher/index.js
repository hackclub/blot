/*
@title: map
@author: Sher
@snapshot: snapshot1.png
*/

const width = 1000;
const height = 600;
setDocDimensions(width, height);

// Function to generate a pseudo-random number based on date and time
const pseudoRandom = (seed) => {
    return Math.abs(Math.sin(seed) * 10000 % 1);
};

// Function to generate procedural coordinates
const generateCoordinates = (numPoints, seed, xRange, yRange) => {
    const coordinates = [];
    let angle = 0;
    const angleIncrement = (2 * Math.PI) / numPoints;

    for (let i = 0; i < numPoints; i++) {
        const x = xRange * pseudoRandom(seed + i) * Math.cos(angle);
        const y = yRange * pseudoRandom(seed + i) * Math.sin(angle);
        coordinates.push([x, y]);
        angle += angleIncrement;
    }

    return coordinates;
};

// Function to create continents
const createContinent = (numPoints, seed, xRange, yRange, offsetX, offsetY) => {
    const points = generateCoordinates(numPoints, seed, xRange, yRange);
    return points.map(([x, y]) => [x + offsetX, y + offsetY]).concat([null]);
};

// Generate varying world map using current date and time as seed
const dateSeed = new Date().getTime();
const worldMap = [
    ...createContinent(8, dateSeed, 70, 50, -100, 40), // North America
    ...createContinent(8, dateSeed + 1000, 50, 70, -60, -20), // South America
    ...createContinent(6, dateSeed + 2000, 30, 20, 20, 55), // Europe
    ...createContinent(10, dateSeed + 3000, 40, 60, 20, 0), // Africa
    ...createContinent(12, dateSeed + 4000, 90, 70, 50, 30), // Asia
    ...createContinent(8, dateSeed + 5000, 30, 20, 130, -20) // Australia
];

const scaleAndTranslate = (coords, scale, offsetX, offsetY) => {
    return coords.map(([x, y]) => [
        x * scale + offsetX,
        y * scale + offsetY
    ]);
};

const scale = 3;
const offsetX = width / 2;
const offsetY = height / 2;

const convertToBezierCurves = (points) => {
    const curves = [];
    for (let i = 0; i < points.length - 1; i++) {
        const midPoint = [(points[i][0] + points[i + 1][0]) / 2, (points[i][1] + points[i + 1][1]) / 2];
        curves.push([points[i], midPoint, points[i + 1]]);
    }
    if (points.length > 2) {
        const lastMidPoint = [(points[points.length - 1][0] + points[0][0]) / 2, (points[points.length - 1][1] + points[0][1]) / 2];
        curves.push([points[points.length - 1], lastMidPoint, points[0]]);
    }
    return curves;
};

// Function to segment world map coordinates by continent
const segmentWorldMap = (worldMap) => {
    const segments = [];
    let currentSegment = [];
    for (const point of worldMap) {
        if (point === null) {
            if (currentSegment.length > 0) {
                segments.push(currentSegment);
                currentSegment = [];
            }
        } else {
            currentSegment.push(point);
        }
    }
    if (currentSegment.length > 0) {
        segments.push(currentSegment);
    }
    return segments;
};

const segmentedWorldMap = segmentWorldMap(worldMap);

const scaledSegmentedWorldMap = segmentedWorldMap.map(segment => scaleAndTranslate(segment, scale, offsetX, offsetY));

const worldMapCurves = scaledSegmentedWorldMap.map(segment => convertToBezierCurves(segment));

const drawBezierCurves = (curves, style) => {
    curves.forEach(curve => {
        drawLines([[curve[0], curve[1]], [curve[1], curve[2]]], style);
    });
};

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8F33', '#33FFF5'];
worldMapCurves.forEach((continentCurves, index) => {
    drawBezierCurves(continentCurves, { stroke: colors[index % colors.length], strokeWidth: 2 });
});
