/*
Blot Grapher
Credits:
V205 and Bright Li
Q: What is this? A: This is a WIP graphing tool.
Q: What can this do? A: This program can currently graph lines.


Commands:

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
}
V 0.5
Changelog:
1/5/24 made a drawing of pi. update readme.
12/23/23 Added comments V 0.6
12/23/23 Added maxY and minY V 0.5
12/22/23 Added maxX and minX V 0.4
12/21/23 Added resolution V 0.3
12/18/23 Basic versions V 0.1 and V 0.2


*/




const width = 150;
const height = 150;

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
// hide tags thingy:
{
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
}

var linearLine = function(n) {
  return (90) //Math.sin(n) +
} //v+Math.sqrt(r-Math.pow(n-v,2)))
drawEquation(linearLine, 1, 100, 20);
drawEquation(linearLine, 1, 100, 20);
var linearLine2 = function(n) {
  return (100) //Math.sin(n) +
} //v+Math.sqrt(r-Math.pow(n-v,2)))
drawEquation(linearLine2, 1, 100, 20, 200);


var leftTop = function(n) {
  return (-1 / 11 * Math.pow(n - 20, 2) + 100)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(leftTop, 0.1, 20, 5, 900.1)

var leftTop2 = function(n) {
  return (-1 / 20 * Math.pow(n - 20, 2) + 90)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(leftTop2, 0.1, 20, 5, 900.1)

var rightTop = function(n) {
  return (1 / 20 * Math.pow(n - 100, 2) + 100)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(rightTop, 0.1, 115, 100, 900.1)

var rightTop2 = function(n) {
  return (1 / 11 * Math.pow(n - 100, 2) + 90)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(rightTop2, 0.1, 115, 100, 900.1)

// y = ax^2 + bx + c

var bottomLeftLeft = function(n) {
  return (1 / 8 * Math.pow(n - 5, 2)+ 5)
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(bottomLeftLeft, 0.1, 100, 8.2, 90.1)


var bottomLeftRight = function(n) {
  return (1 / 8 * Math.pow(n - 15, 2))
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(bottomLeftRight, 0.1, 100, 8.2, 90.1)



// y = ax^2 + bx + c
var bottomRightLeft = function(n) {
  return (1 / 8 * Math.pow(n - 100, 2))
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(bottomRightLeft, 0.1, 100, 0, 90)



// y = ax^2 + bx + c
var bottomRightRight = function(n) {
  return (1 / 8 * Math.pow(n - 110, 2))
} //v+Math.sqrt(r-Math.pow(n-v,2)))

// a quadratic.
drawEquation(bottomRightRight, 0.1, 110, 0, 90)






// well, need to use a turtle.
