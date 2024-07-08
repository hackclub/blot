/*
@title: Generative House
@author: Jakob
@snapshot: house_snapshot_2
*/

const width = 125;
const height = 125;

const houseWidth = 55;  // Width of the house
const roofHeight = 25;  // Height of the roof
const windowSpacing = 15;  // Spacing between windows

setDocDimensions(width, height);

const finalLines = [];

drawLines([
    // House base
    [[0, 5], [width, 5]],
    [[(width - houseWidth) / 2, 5], [(width - houseWidth) / 2, roofHeight]],
    [[(width + houseWidth) / 2, 5], [(width + houseWidth) / 2, roofHeight]],
    [[(width - houseWidth) / 2, roofHeight], [(width + houseWidth) / 2, roofHeight]],

    // Roof
    [[(width - houseWidth) / 2, roofHeight], [width / 2, roofHeight + roofHeight]],
    [[(width + houseWidth) / 2, roofHeight], [width / 2, roofHeight + roofHeight]],

    // Door
    [[(width - houseWidth) / 2 + 5, 5], [(width - houseWidth) / 2 + 5, 20]],
    [[(width - houseWidth) / 2 + 5, 20], [(width - houseWidth) / 2 + 15, 20]],
    [[(width - houseWidth) / 2 + 15, 20], [(width - houseWidth) / 2 + 15, 5]],

    // Windows
    // Window 1
    [[(width - houseWidth) / 2 + 20, 10], [(width - houseWidth) / 2 + 20, 20]],
    [[(width - houseWidth) / 2 + 20, 20], [(width - houseWidth) / 2 + 30, 20]],
    [[(width - houseWidth) / 2 + 30, 20], [(width - houseWidth) / 2 + 30, 10]],
    [[(width - houseWidth) / 2 + 30, 10], [(width - houseWidth) / 2 + 20, 10]],

    // Window 2
    [[(width - houseWidth) / 2 + 35, 10], [(width - houseWidth) / 2 + 35, 20]],
    [[(width - houseWidth) / 2 + 35, 20], [(width - houseWidth) / 2 + 50, 20]],
    [[(width - houseWidth) / 2 + 50, 20], [(width - houseWidth) / 2 + 50, 10]],
    [[(width - houseWidth) / 2 + 50, 10], [(width - houseWidth) / 2 + 35, 10]],

    // Chimney
    [[(width / 2) + 10, roofHeight + roofHeight - 9], [(width / 2) + 10, roofHeight + roofHeight]],
    [[(width / 2) + 10, roofHeight + roofHeight], [(width / 2) + 15, roofHeight + roofHeight]],
    [[(width / 2) + 15, roofHeight + roofHeight], [(width / 2) + 15, roofHeight + roofHeight - 14]],
]);

drawLines(finalLines);
