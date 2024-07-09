// Adjustable Variables
const ITERATIONS = 75
const NUMWALKERS = 1000
const WALKERJUMPDISTANCE = 5
const NOISESCALE = 1
const BOUNDARY = 0
const CURVE_SUBDIVISIONS = 10
const doHighest = false
const doEightDir = false
const SEED = 1238721

bt.setRandSeed(SEED);

// Document Size
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Sdf, walkers will walk on this
function sdf(x, y) {
  return bt.noise([x * NOISESCALE, y * NOISESCALE]);
}


class walker {
  // Motivation is a bias towards going to new cell positions over current ones
  constructor(location, motivation, jumpDist, highest, eightDir) {
    this.loc = location;
    this.mot = motivation;
    this.jumpDist = jumpDist
    this.points = [this.loc];
    this.walkerDone = false;
    this.highest = highest;
    this.eightDir = eightDir;
  }

  // Gets the neighbour with either the highest or lowest value, according to getHighest and eightDir (using 4 dirs or eight)
  getIdealNeighbour(getHighest, eightDir) {
    if (getHighest) {
      return this.checkNeighboursHighest(this.loc[0], this.loc[1], eightDir);
    } else {
      return this.checkNeighboursLowest(this.loc[0], this.loc[1], eightDir);
    }
  }

  // Basic check for eight neighbours, returns highest
  checkNeighboursHighest(x, y, eightNeighbours) {
    var currentHighest = -Infinity; // Initialize with negative infinity
    var idealNeighbour = null;

    // Right
    if (sdf(x + this.jumpDist, y) > currentHighest) {
      currentHighest = sdf(x + this.jumpDist, y);
      idealNeighbour = [x + this.jumpDist, y];
    }

    // Left
    if (sdf(x - this.jumpDist, y) > currentHighest) {
      currentHighest = sdf(x - this.jumpDist, y);
      idealNeighbour = [x - this.jumpDist, y];
    }

    // Top
    if (sdf(x, y + this.jumpDist) > currentHighest) {
      currentHighest = sdf(x, y + this.jumpDist);
      idealNeighbour = [x, y + this.jumpDist];
    }

    // Bottom
    if (sdf(x, y - this.jumpDist) > currentHighest) {
      currentHighest = sdf(x, y - this.jumpDist);
      idealNeighbour = [x, y - this.jumpDist];
    }
    if (eightNeighbours) {
      // Top-Right (diagonal)
      if (sdf(x + this.jumpDist, y + this.jumpDist) > currentHighest) {
        currentHighest = sdf(x + this.jumpDist, y + this.jumpDist);
        idealNeighbour = [x + this.jumpDist, y + this.jumpDist];
      }

      // Top-Left (diagonal)
      if (sdf(x - this.jumpDist, y + this.jumpDist) > currentHighest) {
        currentHighest = sdf(x - this.jumpDist, y + this.jumpDist);
        idealNeighbour = [x - this.jumpDist, y + this.jumpDist];
      }

      // Bottom-Right (diagonal)
      if (sdf(x + this.jumpDist, y - this.jumpDist) > currentHighest) {
        currentHighest = sdf(x + this.jumpDist, y - this.jumpDist);
        idealNeighbour = [x + this.jumpDist, y - this.jumpDist];
      }

      // Bottom-Left (diagonal)
      if (sdf(x - this.jumpDist, y - this.jumpDist) > currentHighest) {
        currentHighest = sdf(x - this.jumpDist, y - this.jumpDist);
        idealNeighbour = [x - this.jumpDist, y - this.jumpDist];
      }
    }
    return [currentHighest, idealNeighbour];
  }

  // same but flipped
  checkNeighboursLowest(x, y, eightNeighbours) {
    var currentLowest = Infinity; // Initialize with positive infinity
    var idealNeighbour = null;

    // Right
    if (sdf(x + this.jumpDist, y) < currentLowest) {
      currentLowest = sdf(x + this.jumpDist, y);
      idealNeighbour = [x + this.jumpDist, y];
    }

    // Left
    if (sdf(x - this.jumpDist, y) < currentLowest) {
      currentLowest = sdf(x - this.jumpDist, y);
      idealNeighbour = [x - this.jumpDist, y];
    }

    // Top
    if (sdf(x, y + this.jumpDist) < currentLowest) {
      currentLowest = sdf(x, y + this.jumpDist);
      idealNeighbour = [x, y + this.jumpDist];
    }

    // Bottom
    if (sdf(x, y - this.jumpDist) < currentLowest) {
      currentLowest = sdf(x, y - this.jumpDist);
      idealNeighbour = [x, y - this.jumpDist];
    }

    if (eightNeighbours) {
      // Top-Right (diagonal)
      if (sdf(x + this.jumpDist, y + this.jumpDist) < currentLowest) {
        currentLowest = sdf(x + this.jumpDist, y + this.jumpDist);
        idealNeighbour = [x + this.jumpDist, y + this.jumpDist];
      }

      // Top-Left (diagonal)
      if (sdf(x - this.jumpDist, y + this.jumpDist) < currentLowest) {
        currentLowest = sdf(x - this.jumpDist, y + this.jumpDist);
        idealNeighbour = [x - this.jumpDist, y + this.jumpDist];
      }

      // Bottom-Right (diagonal)
      if (sdf(x + this.jumpDist, y - this.jumpDist) < currentLowest) {
        currentLowest = sdf(x + this.jumpDist, y - this.jumpDist);
        idealNeighbour = [x + this.jumpDist, y - this.jumpDist];
      }

      // Bottom-Left (diagonal)
      if (sdf(x - this.jumpDist, y - this.jumpDist) < currentLowest) {
        currentLowest = sdf(x - this.jumpDist, y - this.jumpDist);
        idealNeighbour = [x - this.jumpDist, y - this.jumpDist];
      }
    }

    return [currentLowest, idealNeighbour];
  }

  // check if within canvas, bc i'm using curves high curve resolution needed to make sure they don't clip boundaries
  isInBounds(pos) {
    if (pos[0] > width - BOUNDARY) {
      return false;
    }
    if (pos[0] < BOUNDARY) {
      return false;
    }
    if (pos[1] > height - BOUNDARY) {
      return false;
    }
    if (pos[1] < BOUNDARY) {
      return false;
    } else {
      return true;
    }
  }

  walk(location) {
    // consider neighbouring cells
    var idealNeighbour, neighbourSdf;
    // check ideal neighbour
    [neighbourSdf, idealNeighbour] = this.getIdealNeighbour(this.highest, this.eightDir);

    if (!this.isInBounds(idealNeighbour)) {
      this.walkerDone = true;
    }

    if (this.highest) {
      // add motivation to the sdf, effectively increasing attractiveness
      neighbourSdf += this.mot;
      //console.log("Current sdf : " + sdf(this.loc[0], this.loc[1]) + "\n Highest Neighbour SDF : " + neighbourSdf);
      if (neighbourSdf >= sdf(this.loc[0], this.loc[1])) {
        //console.log("NEW HIGHEST NEIGHBOUR " + idealNeighbour);
        this.points.push(this.loc);
        this.loc = idealNeighbour;
      } else {
        this.walkerDone = true
      }
    } else {
      // remove motivation to the sdf, effectively increasing attractiveness
      neighbourSdf -= this.mot;
      if (neighbourSdf <= sdf(this.loc[0], this.loc[1])) {
        //console.log("NEW LOWEST NEIGHBOUR " + idealNeighbour);
        this.points.push(this.loc);
        this.loc = idealNeighbour;
      } else {
        this.walkerDone = true
      }
    }
  }
}

function main(iterations, numWalkers, walkerJumpDistance) {
  var walkers = [];
  var points = [];
  for (var i = 0; i < numWalkers; i++) {
    walkers.push(new walker([bt.randIntInRange(0, width), bt.randIntInRange(0, width)], 0.75, walkerJumpDistance, doHighest, doEightDir));
  }
  for (var iWalker in walkers) {
    //console.log("WALKER : " + walkers[iWalker])
    for (var i = 0; i < iterations; i++) {
      walkers[iWalker].walk();
      if (walkers[iWalker].walkerDone) {
        break;
      }
    }
    console.log(walkers[iWalker].points.length)
    if (walkers[iWalker].points.length > 3) {
      points.push(bt.catmullRom(walkers[iWalker].points, CURVE_SUBDIVISIONS));
    }
  }
  return points;
}

var line = main(ITERATIONS, NUMWALKERS, WALKERJUMPDISTANCE);

//console.log(line)
// draw it
drawLines(line);