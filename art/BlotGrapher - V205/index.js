/*
Blot Grapher

Q: What is this? A: This is a WIP graphing tool.
Q: What can this do? A: This program can currently graph lines.


V 0.5
Changelog:
12/23/23 Added comments V 0.6
12/23/23 Added maxY and minY V 0.5
12/22/23 Added maxX and minX V 0.4
12/21/23 Added resolution V 0.3
12/18/23 Basic versions V 0.1 and V 0.2

*/


// welcome to blot!

const width = 125;
const height = 125;

setDocDimensions(width, height);










function drawEquation(formulaa, resolution, maxX, minX, maxY, minY) {
  const graphTurtle = createTurtle();
  // if you are exploring this code, I would advise you to start from here and go down, closing those little arrows for collapsing code as you go.
  // Sorry for the mess.

  // check if parameters is blank(or non real numbers), if so, use defaults
  if (!maxY && maxY != 0) {
    console.log("defaulting to maxY = 100")
    maxY = 100;
  }
  if (!minY && minY != 0) {
    console.log("defaulting to minY = 0")
    minY = 0;
  }
  if (!maxX && maxX != 0) {
    console.log("defaulting to maxX = 100")
    maxX = 100;
  }
  if (!minX && minX != 0) {
    console.log("defaulting to minX = 0")
    minX = 0;
  }
  // is resolution a non zero positive number?

  if (resolution <= 0 || !resolution) {
    console.log("Please use positive numbers for resolution. Resolution = " + resolution);
    console.log("resolution defaulting to 0.1")
    resolution = 0.1;
  }

  var x = minX;
  const originalX = x;




  while (x <= maxX) {

    let yActual = formulaa(x);
    var previousY = formulaa(x - resolution);


    //comment the following out if your console gets flooded
    console.log("x = " + x + ", y = " + yActual)

    if (x == originalX) { // is x the original value of x(or the minimum value?)?
      // if so, use jump not goto to not make a extra line.


      graphTurtle.jump([graphTurtle.lb[0], graphTurtle.lb[1]])
      graphTurtle.jump([originalX, yActual])

    } else {
      // is yActual not a real number or is out of the bounds(maxY,minY)
      if ((!yActual || (yActual >= maxY) || (yActual <= minY)) && yActual != 0) { //|| (yActual >=maxY) || (yActual <= minY)
        //out of bounds.
        //uncomment this if you want:
        //console.log("yActual out of bounds. yActual is: " + yActual )


      } else {
        // everything else, draw a line.

        // very messy code, figure out how to clean this up.
        // lots of conditions, probably way too many.
        if (previousY <= maxY && previousY >= minY && yActual <= maxY && yActual >= minY) {

          graphTurtle.down()
          graphTurtle.goTo([x, yActual]);
        } else {

          graphTurtle.jump([x, yActual]);
        }
      }
    }
    x += resolution // add resolution to x.


  }
  drawTurtles([
    graphTurtle
  ]);
}

// this is the format to use this program:
/*
//NOTE: The floating point decimal things will give you some drift.
//NOTE: If it is a formula that can have two y values for one x, it will probably not work properly.I'll try to fix it later

var formulaName = function(n) {
  return (n) // now, modify the returned value to something!
} 


//You can use Math(.sin and other things) tools to help.



// Draw it!

drawEquation(formulaName)
// if you don't see anything, your equation is probably in the negatives or is very large

// these names should explain them self.
drawEquation(formula,resolution,maxX,minX,maxY,minY)
*/

// draws a simple linear line.
// y = mx+b
// y = 2n + 2
var linearLine = function(n) {
  return (2 * n + 2) //Math.sin(n) +
} //v+Math.sqrt(r-Math.pow(n-v,2)))
drawEquation(linearLine);

//draws a sine wave
// y = a * sin(n+ b) or something like that, I can't remeber
// y = sin(n) + 9
var sineWave = function(n) {
  return (Math.sin(n) + 9) //Math.sin(n) +
} //v+Math.sqrt(r-Math.pow(n-v,2)))
drawEquation(sineWave);

// another sine wave, but modified slightly.
// y = sin(n) + 21
var sineWave2 = function(n) {
  // similar to sineWave1, but adds 12.
  // it looks very different because of the additional parameters called(see below).
  return sineWave(n) + 12; // lazy way :) 

}
// here is a test of the maxX, minX, maxY, and minY parameters.
// the left, right, top and bottom are cut off.
drawEquation(sineWave2, 0.1, 39, 20, 21, 20.4)

// a quadratic equation
// y = ax^2 + bx + c
var quadratic = function(n) {
  return (1 / 4 * n * n - 2 * n - 2)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(quadratic, 0.1, 100, 0, 18, 0)









// well, need to use a turtle.
