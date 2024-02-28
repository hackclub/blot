/*
@title: Lindenmayer Systems (Fractals)
@author: Reva
@snapshot: dragoncurve.png
*/

//Levy C Curve
var axiom = "A";
let ruleA = "AAF"
let ruleF = "F"

var startLength = 16;
var theta = 90;

/*
//curve 2
var axiom = "F";
let ruleA = "-F+AA++A+F--F-A"
let ruleF = "F+A++A-F--FF-A+"

var startLength = 4;
var theta = 60;
*/

/*
//branches
var axiom = "F";
let ruleA = "A"
let ruleF = "F[+F]F"

var startLength = 77;
let n = 10;
var theta = 360/n;
*/


/*
//Koch curve
var axiom = "F";
let ruleA = "A"
let ruleF = "F+F--F+F"

var startLength = 77;
var theta = 53;
*/

/*
//curve
var axiom = "F";
let ruleA = "-F+AA++A+F--F-A"
let ruleF = "F+A++A-F--FF-A+"

var startLength = 4;
var theta = 60;
*/


/*
//Bush L-system (in progress)
var axiom = "++++F"
let ruleF = "FF-[-F+F+F]+[+F-F-F]"
var startLength = 5;
let n = 16;
var theta = 360/n;
*/

var production = axiom;
var drawLength = startLength;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();

var prod = production
let generations = 3;
for (let i = 0; i < generations; i++) {
  production = iterate(production);
}


const t1 = render(t, production);
t.join(t1);
drawTurtles([t]);


//apply substitution rules to create new iteration of production string
function iterate(production) {
  let Newproduction = "";
  var length = production.length;
  for (let i = 0; i < length; ++i) {
    let step = production.charAt(i);
    if (step === 'F') {
      Newproduction = Newproduction + ruleF;
    } else if (step === 'A') {
      Newproduction = Newproduction + ruleA;
    }
    else{
      Newproduction = Newproduction + step;
    }
  }
  drawLength = drawLength * 0.743
  return Newproduction;
}


//convert production string to a turtle graphic
function render(t, prod) {
  t.jump([width/2, height/2])
  var saved = t.position;

  for (let i = 0; i < prod.length; ++i) {
    var step = prod.charAt(i);
    if (step == 'A') {
      t.forward(drawLength);
  }
    else if (step == "F"){
      t.forward(drawLength);
    }
    else if (step == "+"){
      theta = Math.abs(theta);
      t.left(theta)
    }
    else if (step == "-"){
      theta = -Math.abs(theta);
      t.left(theta)
    }
    else if (step == "["){
     saved = t.position;
    }
    else if (step == "]"){
      t.jump(saved);
    }
  }
  return t;
}


