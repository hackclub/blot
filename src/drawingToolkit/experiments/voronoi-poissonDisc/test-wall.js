import { Voronoi } from "./voronoi.js";
import { createPoissonDisc } from "./createPoissonDisc.js";

/*
@title: stone wall
@author: Leo McElroy


*/

const width = 125;
const height = 128;

setDocDimensions(width, height);

const r = 10;
// const grid = poissonDiscSample({ r, width: 103, height: 246 });
const grid = createPoissonDisc(r, 125, 125)
grid.forEach(pt => drawCircle(pt, r));

const diagram = voronoi(grid, {xMin: 0, xMax: 100, yMin: 0, yMax: 100 } )

let edges = [];
let cells = [];
diagram.cells.forEach(cell => {
  let newCell = [];
  cell.halfedges.forEach((x, i, arr) => {
    const edge = x.edge;

    const line = [
      [edge.va.x, edge.va.y],
      [edge.vb.x, edge.vb.y]
    ];

    newCell.push(line)
  })

  cells.push(newCell)
  
})

cells = cells.map(mergeEdgesToPolyline).filter(x => x.length !== 0);
// console.log(cells)
// cells = cells.slice(0, 2)
bt.expand(cells, -1.9);

drawLines(cells)

function dist(v0, v1) {
  return Math.sqrt((v1.x - v0.x) ** 2 + (v1.y - v0.y) ** 2);
}

function drawCircle(pt, r) {
  const t = new bt.Turtle();
  const [x, y] = pt;
  t.jump([x, y - r]);

  t.arc(360, .1);
  drawLines(t.lines())
}

// const testArc = new bt.Turtle()
// testArc.jump([0, -10]);
// testArc.arc(253, 10)
// drawLines(testArc.lines())


function voronoi(sites, boundingBox) {
  var voronoi = new Voronoi();
  var bbox = {
    xl: boundingBox.xMin, 
    xr: boundingBox.xMax, 
    yt: boundingBox.yMin, 
    yb: boundingBox.yMax
  }; // xl is x-left, xr is x-right, yt is y-top, and yb is y-bottom
  var sites = sites.map(([x, y]) => ({ x, y }))
  
  // a 'vertex' is an object exhibiting 'x' and 'y' properties. The
  // Voronoi object will add a unique 'voronoiId' property to all
  // sites. The 'voronoiId' can be used as a key to lookup the associated cell
  // in diagram.cells.
  
  var diagram = voronoi.compute(sites, bbox);

  return {
    cells: diagram.cells,
    edges: diagram.edges
  }
}

function mergeEdgesToPolyline(edges) {
    if (edges.length === 0) return [];

    let polyline = [];
    let remainingEdges = [...edges]; // Copy of the edges array
    let currentEdge = remainingEdges.pop(); // Start with the last edge

    // Start polyline with the first edge
    polyline = [...currentEdge];

    // Continue until there are no remaining edges to process
    while (remainingEdges.length > 0) {
        let found = false;

        for (let i = 0; i < remainingEdges.length; i++) {
            let edge = remainingEdges[i];
            let lastPoint = polyline[polyline.length - 1];
            let firstPoint = polyline[0];

            // Check if the current edge can be connected to the end of the polyline
            if (edge[0][0] === lastPoint[0] && edge[0][1] === lastPoint[1]) {
                // Remove the first point of the edge and add the rest to the polyline
                polyline.push(edge[1]);
                remainingEdges.splice(i, 1);
                found = true;
                break;
            } else if (edge[1][0] === lastPoint[0] && edge[1][1] === lastPoint[1]) {
                // If reversed edge can be connected, reverse it and use it
                polyline.push(edge[0]);
                remainingEdges.splice(i, 1);
                found = true;
                break;
            } else if (edge[0][0] === firstPoint[0] && edge[0][1] === firstPoint[1]) {
                // Check if it can be connected to the start of the polyline
                polyline.unshift(edge[1]);
                remainingEdges.splice(i, 1);
                found = true;
                break;
            } else if (edge[1][0] === firstPoint[0] && edge[1][1] === firstPoint[1]) {
                // If reversed edge can be connected to the start, reverse it and use it
                polyline.unshift(edge[0]);
                remainingEdges.splice(i, 1);
                found = true;
                break;
            }
        }

        // If no connectable edge is found, terminate (or throw an error, depending on requirements)
        if (!found) {
            throw new Error("Cannot form a single continuous polyline from provided edges.");
        }
    }

    return polyline;
}