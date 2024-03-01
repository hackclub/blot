// welcome to blot!

const width = 125;
const height = 125;
const midX = width/2;
const midY = height/2;

setDocDimensions(width, height);

var rotation = 0;
var buildingHeight = 15;

var leftEdgeX = -50 + rotation;
var centerEdgeX = -0;
var rightEdgeX = 10 + rotation;

var centerHeight = 40 + buildingHeight;
var leftHeight = 30 + buildingHeight;
var rightHeight = 30 + buildingHeight;

var windows = 10;
const centerWindowSeg = centerHeight / windows;

// Draw the edges
const edges = createTurtle();

function drawEdge(loc, height) {
  edges.jump([midX+loc, midY-height]);
  edges.goTo([midX+loc, midY+height]);
}

function drawPanel(edgeHeight, edgeX) {
  var windowHeightDifference = (centerHeight - edgeHeight) / windows; // Calculated height difference along perspective slope
  var windowSpacing = (centerEdgeX - edgeX) / windows                 // X-Spacing between window lines
  var windowSeg = edgeHeight / windows                                // Y-Spacing between window lines

  for (var a = 1; a < windows; a++) {
    edges.jump([midX+centerEdgeX-windowSpacing*a, midY]);
    edges.goTo([midX+centerEdgeX-windowSpacing*a, midY+edgeHeight+(windowHeightDifference*(windows-a))]);
    edges.jump([midX+centerEdgeX-windowSpacing*a, midY]);
    edges.goTo([midX+centerEdgeX-windowSpacing*a, midY-edgeHeight-(windowHeightDifference*(windows-a))]);
  }

  for (var a = 0; a < windows; a++) {
    edges.jump([midX+centerEdgeX, midY+centerHeight-(centerWindowSeg*a)]);
    edges.goTo([midX+edgeX, midY+edgeHeight-(windowSeg*a)]);
  }

  for (var a = 0; a < windows; a++) {
    edges.jump([midX+centerEdgeX, midY-centerHeight+(centerWindowSeg*a)]);
    edges.goTo([midX+edgeX, midY-edgeHeight+(windowSeg*a)]);
  }
  
  drawEdge(edgeX, edgeHeight);
}

// Draw the horizon line
edges.jump([midX+leftEdgeX, midY]);
edges.goTo([midX+rightEdgeX, midY]);

// Draw the edges
drawEdge(centerEdgeX, centerHeight);

// Left panel
drawPanel(
  leftHeight, 
  leftEdgeX 
);

// Right panel
drawPanel(
  rightHeight, 
  rightEdgeX 
);

// Draw all turtles
drawTurtles([
  edges
]);