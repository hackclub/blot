
/*
@title: Soft Fractals
@author: Ram Gupta
@snapshot: soft_fractals1.png
*/
setDocDimensions(125, 125);

const t = new bt.Turtle();

// Helper for random
function randomInt(min, max) {
  return Math.floor(bt.rand() * (max - min + 1)) + min;
}

// KMeans class for clustering points
class KMeans {
  constructor(opts) {
    // Number of cluster centroids.
    this.k = opts.k;
    // Points to cluster.
    this.data = opts.data;
    // Keeps track of which cluster centroid index each data point belongs to.
    this.assignments = [];
    // Get the extents (min,max) for the dimensions.
    this.extents = this.dataDimensionExtents();
    // Get the range of the dimensions.
    this.ranges = this.dataExtentRanges();
    // Generate random cluster centroid points.
    this.means = this.seeds();
    // Keep track of number of times centroids move.
    this.iterations = 0;
    // Perform clustering.
    this.run();
  }

  // Returns the the minimum and maximum values for each dimension in the data array.
  dataDimensionExtents() {
    let data = this.data;
    let extents = [];
    for (let i = 0; i < data.length; i++) {
      let point = data[i];
      for (let j = 0; j < point.length; j++) {
        if (!extents[j]) {
          extents[j] = {
            min: 1000,
            max: 0
          };
        }
        if (point[j] < extents[j].min) {
          extents[j].min = point[j];
        }
        if (point[j] > extents[j].max) {
          extents[j].max = point[j];
        }
      }
    }
    return extents;
  }

  // Returns the range for each extent
  dataExtentRanges() {
    let ranges = [];
    for (let i = 0; i < this.extents.length; i++) {
      ranges[i] = this.extents[i].max - this.extents[i].min;
    }
    return ranges;
  }

  // Returns an array of randomly generated cluster centroid points bounds based on the data dimension ranges.
  seeds() {
    let means = [];
    while (this.k--) {
      let mean = [];
      for (let i = 0; i < this.extents.length; i++) {
        mean[i] = this.extents[i].min + (bt.rand() * this.ranges[i]);
      }
      means.push(mean);
    }
    return means;
  }

  // Calculate Euclidean distance between each point and the cluster center.
  // Assigns each point to closest mean point.
  assignClusterToDataPoints() {
    let assignments = [];
    for (let i = 0; i < this.data.length; i++) {
      let point = this.data[i];
      let distances = [];
      for (let j = 0; j < this.means.length; j++) {
        let mean = this.means[j];
        let sum = 0;
        for (let dim = 0; dim < point.length; dim++) {
          let difference = point[dim] - mean[dim];
          difference = Math.pow(difference, 2);
          sum += difference;
        }
        distances[j] = Math.sqrt(sum);
      }
      assignments[i] = distances.indexOf(Math.min.apply(null, distances));
    }
    return assignments;
  }

  // Update the positions of the the cluster centroids (means) to the average positions of all data points that belong to that mean.
  moveMeans() {
    let sums = fillArray(this.means.length, 0);
    let counts = fillArray(this.means.length, 0);
    let moved = false;
    for (let i = 0; i < this.means.length; i++) {
      sums[i] = fillArray(this.means[i].length, 0);
    }
    for (let pointIndex = 0; pointIndex < this.assignments.length; pointIndex++) {
      let meanIndex = this.assignments[pointIndex];
      let point = this.data[pointIndex];
      let mean = this.means[meanIndex];
      counts[meanIndex]++;
      for (let dim = 0; dim < mean.length; dim++) {
        sums[meanIndex][dim] += point[dim];
      }
    }
    for (let meanIndex = 0; meanIndex < sums.length; meanIndex++) {
      if (counts[meanIndex] === 0) {
        sums[meanIndex] = this.means[meanIndex];
        for (let dim = 0; dim < this.extents.length; dim++) {
          sums[meanIndex][dim] = this.extents[dim].min + (bt.rand() * this.ranges[dim]);
        }
        continue;
      }
      for (let dim = 0; dim < sums[meanIndex].length; dim++) {
        sums[meanIndex][dim] /= counts[meanIndex];
        sums[meanIndex][dim] = Math.round(100 * sums[meanIndex][dim]) / 100;
      }
    }
    if (this.means.toString() !== sums.toString()) {
      let diff;
      moved = true;
      for (let meanIndex = 0; meanIndex < sums.length; meanIndex++) {
        for (let dim = 0; dim < sums[meanIndex].length; dim++) {
          diff = (sums[meanIndex][dim] - this.means[meanIndex][dim]);
          if (Math.abs(diff) > 0.1) {
            let stepsPerIteration = 10;
            this.means[meanIndex][dim] += diff / stepsPerIteration;
            this.means[meanIndex][dim] = Math.round(100 * this.means[meanIndex][dim]) / 100;
          } else {
            this.means[meanIndex][dim] = sums[meanIndex][dim];
          }
        }
      }
    }
    return moved;
  }

  // Run KMeans clustering algorithm
  run() {
    ++this.iterations;
    this.assignments = this.assignClusterToDataPoints();
    let meansMoved = this.moveMeans();
    if (meansMoved) {
      this.run.bind(this);
    }
  }
}

// Returns a prefilled array.
function fillArray(length, val) {
  return Array.apply(null, Array(length)).map(function() {
    return val;
  });
}

// Function to check if a point is inside bounds
function insideBounds(bounds, x, y) {
  let inside = false;
  for (let i = 0, j = bounds.length - 1; i < bounds.length; j = i++) {
    let xi = bounds[i][0],
      yi = bounds[i][1];
    let xj = bounds[j][0],
      yj = bounds[j][1];
    let intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Draw a fractal-like pattern
function drawFractal(depth = 0, bounds = [], symmetryFactor = 3) {
  let points = [];
  let maxWidth = 125;
  let minWidth = 0;
  let maxHeight = 125;
  let minHeight = 0;
  for (let i = 0; i < 500; i++) {
    let x = randomInt(minWidth, maxWidth);
    let y = randomInt(minWidth, maxHeight);
    if (depth == 0 || bounds.length == 0 || insideBounds(bounds, x, y)) {
      points.push([x, y]);
    }
  }
  const kmeans = new KMeans({
    data: points,
    k: 5
  });
  const groups = [];
  kmeans.data.forEach((point, i) => {
    let groupIndex = kmeans.assignments[i];
    groups[groupIndex] = groups[groupIndex] || [];
    groups[groupIndex].push({
      x: point[0],
      y: point[1]
    });
  });
  groups.forEach((pointGroup, index) => {
    t.up();
    const hull = makeHull(pointGroup);
    let hullSet = new Set();
    for (const point of hull) {
      hullSet.add(point);
    }
    let hullArray = Array.from(hullSet);
    let fragmentFurther = (index < 3 && (depth == 0 || bt.rand() > 0.6) && depth < 2);
    if (fragmentFurther) {
      drawFractal(depth + 1, hullArray.map(p => [p.x * symmetryFactor, p.y]), symmetryFactor);
    } else {
      hullArray.forEach(edgePoint => {
        t.goTo([edgePoint.x * symmetryFactor, edgePoint.y]);
        t.down();
      });
      t.goTo([hullArray[0].x * symmetryFactor, hullArray[0].y]);
      t.up();
    }
  });
}

// Start drawing the fractal with symmetrical factor of 1 (no symmetry)
drawFractal(0, [], 1);

// Center the fractal
bt.translate(t.path, [125 / 2, 125 / 2], bt.bounds(t.path).cc);

// Draw the fractal
drawLines(t.lines());

// Convex Hull Implementation
function makeHull(points) {
  let newPoints = points.slice();
  newPoints.sort(POINT_COMPARATOR);
  return makeHullPresorted(newPoints);
}

function makeHullPresorted(points) {
  if (points.length <= 1) return points.slice();

  let upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();

  let lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();

  if (upperHull.length == 1 && lowerHull.length == 1 && upperHull[0].x == lowerHull[0].x && upperHull[0].y == lowerHull[0].y)
    return upperHull;
  else
    return upperHull.concat(lowerHull);
}

function POINT_COMPARATOR(a, b) {
  if (a.x < b.x) return -1;
  else if (a.x > b.x) return +1;
  else if (a.y < b.y) return -1;
  else if (a.y > b.y) return +1;
  else return 0;
}