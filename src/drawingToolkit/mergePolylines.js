export function mergePolylines(polylines) {
  let merged = true;

  while (merged) {
    merged = false;

    for (let i = 0; i < polylines.length; i++) {
      for (let j = i + 1; j < polylines.length; j++) {
        const polylineA = polylines[i];
        const polylineB = polylines[j];

        // Check if the end of A matches the start of B
        if (polylineA[polylineA.length - 1] === polylineB[0]) {
          polylines[i] = polylineA.concat(polylineB.slice(1));
          polylines.splice(j, 1);
          merged = true;
          break;
        }
        // Check if the end of B matches the start of A
        else if (polylineB[polylineB.length - 1] === polylineA[0]) {
          polylines[i] = polylineB.concat(polylineA.slice(1));
          polylines.splice(j, 1);
          merged = true;
          break;
        }
        // Check if the start of A matches the start of B (reverse B)
        else if (polylineA[0] === polylineB[0]) {
          polylines[i] = polylineB.slice(1).reverse().concat(polylineA);
          polylines.splice(j, 1);
          merged = true;
          break;
        }
        // Check if the end of A matches the end of B (reverse B)
        else if (polylineA[polylineA.length - 1] === polylineB[polylineB.length - 1]) {
          polylines[i] = polylineA.concat(polylineB.slice(0, polylineB.length - 1).reverse());
          polylines.splice(j, 1);
          merged = true;
          break;
        }
      }
      if (merged) break;
    }
  }

  return polylines;
}
