/*
@title: PolarPlotter.js
@author: Stefan Lighezan
@snapshot: PolarPlotterSnapshot
*/

const width = 125;
const height = 125;
setDocDimensions(width, height);

const finalLines = [];

const revolutions = 2 // Modify revolutions (only affects spirals, 3.4 is limit for this screen size)

// Polar Plotter
// Cardioids (Heart Shaped Graphs) are written in the form r=a+a⋅cos(θ). Try it!
// Limacons are written in the form r=a+b⋅cos(θ), where there are two different types of limacons, (test different values of a and b)
// Roses are written in the form r=a⋅cos(b⋅θ). 
// Spirals are written in the form r = a + b ⋅ θ 

//Uncomment any of the examples below to see their graphs ->

/*
const polarEquationCardioid = "r = 30 + 30 * Math.cos(theta)";
plotPolarGraph(polarEquationCardioid);
*/

/*
const polarEquationLimacon = "r = 5 + 6 * Math.cos(theta)"
plotPolarGraph(polarEquationLimacon)
*/


const polarEquationRose = "r = 30 * Math.cos(3 * theta)";
plotPolarGraph(polarEquationRose);

const polarEquationSpiral = "r = 5 + 6 * theta"
plotPolarGraph(polarEquationSpiral)

//DO NOT TOUCH ANYTHING BELOW

function polarToCartesian(r, theta) {
  const x = r * Math.cos(theta);
  const y = r * Math.sin(theta);
  return [x, y];
}

function plotPolarGraph(equation) {
  const parts = equation.split("=");
  if (parts.length !== 2 || parts[0].trim() !== "r") {
    console.error('Invalid polar equation format. Use "r=f(theta)".');
    return;
  }

  const expression = parts[1].trim();
  const xValues = [];
  const stepSize = 0.1;

  for (let x = 0; x <= width; x += stepSize) {
    const theta = (x / width) * Math.PI * revolutions;
    const r = eval(expression);

    const [px, py] = polarToCartesian(r, theta);
    const bx = px + width / 2;
    const by = height / 2 - py;

    if (x === 0) {
      finalLines.push([[bx, by]]);
    } else {
      finalLines[finalLines.length - 1].push([bx, by]);
    }
  }

  finalLines.push([[width/2, height/2], [width, height/2]])

  drawLines(finalLines)
}


