/*
@title: Bohr Model
@author: itsmeadarsh2008
@snapshot: BohrModel1.png
*/

const { Turtle, scale, originate } = bt;

// Attention Please: I explain code like Sal Khan from Khanacademy

// Constants - Because who doesn't love constants, right?
const ATOMIC_NUMBER = 8; // Oxygen - the one that makes you breathe!
const MAX_SHELLS = 3; // Three is the magic number for shells in this party
// Set up the document dimensions - so we have a stage for our atomic circus
setDocDimensions(250, 250);

// Function to calculate the maximum electrons in a shell - the bigger the shell, the more electrons get to party!
function maxElectronsInShell(shellNumber) {
  return 2 * Math.pow(shellNumber, 2); // Because math is magical!
}

// Function to calculate the number of shells needed - we need to find out how many layers of fun we need
function calculateShells(atomicNumber) {
  let shells = [];
  let electronsLeft = atomicNumber;
  let shellNumber = 1;
  
  while (electronsLeft > 0 && shellNumber <= MAX_SHELLS) {
    const maxElectrons = maxElectronsInShell(shellNumber);
    const electronsInShell = Math.min(electronsLeft, maxElectrons);
    shells.push(electronsInShell);
    electronsLeft -= electronsInShell;
    shellNumber++;
  }

  return shells; // Shells are the cosmic layers where electrons get their groove on
}

// Function to calculate the mass number - because even atoms need to know how heavy they are
function calculateMassNumber(atomicNumber) {
  return atomicNumber === 1 ? 1 : (atomicNumber % 2 === 0 ? 2 * atomicNumber : 2 * atomicNumber + 1); // Who knew atomic math could be so dramatic?
}

// Create a new turtle for drawing - this turtle is the artist of our atomic masterpiece
const t = new Turtle();

// Function to draw a circle centered on the canvas - the foundation of our atomic universe!
function drawCircle(radius) {
  t.up().goTo([125, 125 - radius]).down(); // Turtle travels to the start point, because even turtles need directions
  t.arc(360, radius); // Draws a full circle – no half-measures here!
}

// Function to draw an electron at a specific angle on a shell - electrons love their positions!
function drawElectron(radius, angle) {
  const radians = (angle * Math.PI) / 180; // Converting angle to radians because math is quirky
  const x = 125 + radius * Math.cos(radians);
  const y = 125 + radius * Math.sin(radians);
  drawFilledCircle(3, x, y); // Draw the electron – tiny, but mighty!
}

// Function to draw a filled circle (for nucleus or particles) - make those circles nice and filled!
function drawFilledCircle(radius, x, y) {
  t.up().goTo([x, y]).down(); // Turtle moves to the spot – the art must begin!
  for (let i = 0; i < 360; i += 5) {
    t.forward(radius);
    t.forward(-radius);  // Move backward by the same distance – it's all about balance!
    t.right(5); // Turn a bit, keep the turtle on its toes
  }
}

// Function to draw a filled circle with a specific color - color adds pizzazz to our atomic creation
function drawColoredCircle(radius, x, y, color) {
  t.up().goTo([x, y]).down();
  // t.color(color); // Add color, because this is a psychedelic atomic party!
  for (let i = 0; i < 360; i += 5) {
    t.forward(radius);
    t.forward(-radius);
    t.right(5);
  }
}

// Function to draw the nucleus with protons and neutrons - the core of our atomic drama!
function drawNucleus(protonCount, neutronCount) {
  const centerX = 125;
  const centerY = 125;
  const nucleusRadius = 10;

  // Draw the black inner space of the nucleus - the dark center of our atomic theater
  drawColoredCircle(nucleusRadius, centerX, centerY, 'black');

  // Draw protons – they’re the stars of the nucleus show!
  for (let i = 0; i < protonCount; i++) {
    const angle = (i * 360) / protonCount;
    const x = centerX + nucleusRadius * Math.cos((angle * Math.PI) / 180);
    const y = centerY + nucleusRadius * Math.sin((angle * Math.PI) / 180);
    drawFilledCircle(5, x, y); // Protons, everyone’s favorite positively charged particles!
  }

  // Draw neutrons if there are any – because the show needs its supporting cast
  if (neutronCount > 0) {
    for (let i = 0; i < neutronCount; i++) {
      const angle = ((i + 0.5) * 360) / neutronCount;
      const x = centerX + nucleusRadius * Math.cos((angle * Math.PI) / 180);
      const y = centerY + nucleusRadius * Math.sin((angle * Math.PI) / 180);
      drawFilledCircle(5, x, y); // Neutrons – the quiet partners in our atomic drama
    }
  }
}

// Draw the nucleus with a specified number of protons and neutrons
const protonCount = ATOMIC_NUMBER;
const neutronCount = calculateMassNumber(ATOMIC_NUMBER) - ATOMIC_NUMBER;
drawNucleus(protonCount, neutronCount);

// Calculate shell radii and number of electrons in each shell – organizing the electron party!
const shells = calculateShells(ATOMIC_NUMBER);
const shellRadii = [40, 80, 120]; // These are the stages for our electron extravaganza

// Draw electron shells – the stages where electrons will perform their orbits
shellRadii.slice(0, shells.length).forEach((radius, index) => drawCircle(radius));

// Draw electrons on each shell – let’s put those electrons in their places
shellRadii.slice(0, shells.length).forEach((radius, index) => {
  const count = shells[index];
  const angleIncrement = 360 / count;
  for (let i = 0; i < count; i++) {
    drawElectron(radius, i * angleIncrement); // Each electron gets its own spot in the cosmic dance
  }
});

// Apply some movement to make it look hand-drawn – because even atoms like a little chaos!
const roughen = (polylines) => {
  return bt.iteratePoints(polylines, (pt) => {
    return [
      pt[0] + bt.randInRange(-0.3, 0.3),
      pt[1] + bt.randInRange(-0.3, 0.3)
    ];
  });
};

// Apply the hand-drawn effect – adding character to our atomic masterpiece
let bohrModel = roughen(t.lines());

// Draw the final result – the grand reveal of our atomic creation!
drawLines(bohrModel);
