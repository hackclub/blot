const n = 47; //max side length (any unit)

const width = n * 20;
const height = n*20;

// Set the document dimensions
setDocDimensions(width, height);


function findPythagoreanTriplets(n) {
  const triplets = [];

  for (let a = 1; a <= n; a++) {
    for (let b = a + 1; b <= n; b++) {
      const c = Math.sqrt(a * a + b * b);
      if (Number.isInteger(c) && c <= n) {
        const triplet = [a, b, c].sort((x, y) => x - y); 
        if (!triplets.some(t => t[0] === triplet[0] && t[1] === triplet[1] && t[2] === triplet[2])) {
          triplets.push(triplet);
        }
      }
    }
  }

  return triplets;
}


function drawTriangle(triplet) {

  const finalLines = [];


  const [a, b, c] = triplet;


  const pointA = [10, 10];       // Point A 
  const pointB = [10 + a * 20, 10]; // Point B, length scaled up
  const pointC = [10, 10 + b * 20]; // Point C, length scaled up 


  const line1 = [pointA, pointB]; // Line AB
  const line2 = [pointB, pointC]; // Line BC
  const line3 = [pointC, pointA]; // Line CA


  finalLines.push(line1);
  finalLines.push(line2);
  finalLines.push(line3);


  drawLines(finalLines);
}

const triplets = findPythagoreanTriplets(n);
console.log(triplets);
triplets.forEach(triplet => {
  console.log(triplet);
  drawTriangle(triplet);
});




