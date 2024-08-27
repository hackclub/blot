/*
@title: Fractals
@author: EwoudVanVooren
@snapshot: randomfractals.png
*/

const width = 125
const height = 125

setDocDimensions(width, height)

const rr = bt.randInRange

//generate a random number of iterations between 1 and 10 (iteration 9/10 takes a while to generate)
const numIterations = Math.floor(rr(1, 10))

function generateTriangle(points, iterations) {
  if (iterations === 0) {
    return [points, [points[0], points[2]]];
  }

  const [p1, p2, p3] = points;

  //find the midpoints of each side of the triangle
  const mid1 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  const mid2 = [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2];
  const mid3 = [(p3[0] + p1[0]) / 2, (p3[1] + p1[1]) / 2];

  //recursive calls to generate smaller triangles
  return [
    ...generateTriangle([p1, mid1, mid3], iterations - 1),
    ...generateTriangle([p2, mid1, mid2], iterations - 1),
    ...generateTriangle([p3, mid2, mid3], iterations - 1),
    [mid1, mid2], [mid2, mid3], [mid3, mid1]
  ];
}

//generate initial triangle, so that other triangles generate from it
const initialTriangle = [
  [width / 2, 0],
  [0, height],
  [width, height]
];

const fractalTriangles = generateTriangle(initialTriangle, numIterations);

drawLines(fractalTriangles)