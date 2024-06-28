/*
@title: Maze Generator
@author: Isaac Wu
@snapshot: snapshot0.png
*/

const w = 25;
const h = 25;

setDocDimensions(w*10+20, h*10+20);

// Using Kruskal's Algorithm with Disjoint Sets
class disjSet {
  constructor(arr) {
    this.ranks = new Array(arr.length);
    this.reps = new Array(arr.length);
    arr.forEach((c) => {
      // Each element is the rep of its set
      this.reps[c.i] = c;
    });
  }

  find(e) {
    if(this.reps[e.i] !== e) {
      // If element isn't its own rep, find them, set shortcut
      this.reps[e.i] = this.find(this.reps[e.i]);
    }
    return this.reps[e.i];
  }

  union(a, b) {
    let aRep = this.find(a), bRep = this.find(b);

    // If they have the same rep, they are in the same set
    if(aRep === bRep) { return; }

    if(this.ranks[aRep.i] < this.ranks[bRep.i]) {
      this.reps[aRep.i] = bRep;
    } else if(this.ranks[aRep.i] > this.ranks[bRep.i]) {
      this.reps[bRep.i] = aRep;
    } else {
      this.reps[bRep.i] = aRep;
      this.ranks[aRep]++;
    }
  }
}

const cell = function(x, y, i) {
  return {
    x: x,
    y: y,
    // Is wall there?
    n: true,
    e: true,
    s: true,
    w: true,
    // Index for disjSet
    i: i
  };
};

const edge = function(ax, ay, bx, by, ad, bd) {
  return {
    ax: ax,
    ay: ay,
    bx: bx,
    by: by,
    // Direction
    ad: ad,
    bd: bd
  };
};

let cells = [];
let edges = [];

for(let y = 0; y < h; y++) {
  for(let x = 0; x < w; x++) {
    cells[y*w+x] = cell(x, y, y*w+x);
    // Only need to go one direction
    if(x > 0) { edges.push(edge(x, y, x-1, y, "w", "e")); }
    if(y > 0) { edges.push(edge(x, y, x, y-1, "s", "n")); }
  }
}

const set = new disjSet(cells);
while(edges.length > 0) {
  // Grab random edge
  let i = bt.randIntInRange(0, edges.length-1), e = edges[i];
  let a = cells[e.ay*w+e.ax], b = cells[e.by*w+e.bx];
  if(set.find(a) !== set.find(b)) {
    // If disjoint, remove wall
    a[e.ad] = false;
    b[e.bd] = false;
    set.union(a, b);
  }
  edges.splice(i, 1);
}

// Entrance, exit
cells[(h-1)*w].w = false;
cells[w-1].e = false;

// Draw walls
const t = new bt.Turtle();
cells.forEach((c) => {
  if(c.n) {
    t.jump([c.x*10+10, c.y*10+20]);
    t.goTo([c.x*10+20, c.y*10+20]);
  }
  if(c.e) {
    t.jump([c.x*10+20, c.y*10+20]);
    t.goTo([c.x*10+20, c.y*10+10]);
  }
  if(c.s) {
    t.jump([c.x*10+20, c.y*10+10]);
    t.goTo([c.x*10+10, c.y*10+10]);
  }
  if(c.w) {
    t.jump([c.x*10+10, c.y*10+10]);
    t.goTo([c.x*10+10, c.y*10+20]);
  }
});

drawLines(t.lines());

const arrows = [[
    [2, (h*10+20)-14],
    [6, (h*10+20)-14],
    [6, (h*10+20)-11],
    [10, (h*10+20)-15],
    [6, (h*10+20)-19],
    [6, (h*10+20)-16],
    [2, (h*10+20)-16],
    [2, (h*10+20)-14]
  ], [
    [(w*10+20)-10, 14],
    [(w*10+20)-6, 14],
    [(w*10+20)-6, 11],
    [(w*10+20)-2, 15],
    [(w*10+20)-6, 19],
    [(w*10+20)-6, 16],
    [(w*10+20)-10, 16],
    [(w*10+20)-10, 14]
  ]
];

drawLines(arrows, { fill: "black" });