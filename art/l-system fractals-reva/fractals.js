/*
@title: Lindenmayer Systems (Fractals)
@author: Reva
@snapshot: dragoncurve.png
*/

//main axioms should be in A or F, other rules can be W, X, Y, Z

/*
//square
var axiom = "F+F+F+F"
let ruleF = "FF+F+F+F+FF"

var startLength = 29;
let n = 4;
var theta = 360/n;
let generations = 3;
*/

/*
//dragon curve
var axiom = "F";
let ruleA = "F-A"
let ruleF = "F+A"

var startLength = 29;
let n = 4;
var theta = 360/n;
let generations = 12;
*/

/*
//branches
var axiom = "F";
let ruleA = "A"
let ruleF = "F[+F-]F"

var startLength = 32;
let n = 10;
var theta = 360/n;
let generations = 10;
*/


/*
//Koch curve
var axiom = "F";
let ruleA = "A"
let ruleF = "F+F--F+F"

var startLength = 77;
var theta = 53;
let generations = 6;
*/


/*
//geometric curve
var axiom = "F";
let ruleA = "-F+AA++A+F--F-A"
let ruleF = "F+A++A-F--FF-A+"

var startLength = 4;
var theta = 60;
let generations = 5;
*/


/*
//bush L-system
var axiom = "++++F"
let ruleF = "FF-[-F+F+F-]+[+F-F-F+]"
var startLength = 5;
let n = 16;
var theta = 360/n;
let generations = 4;
*/


/*
//grid
var axiom = "[X] [Y]++[X] [Y]++[X] [Y]++[X] [Y]++[X] [Y]"
let ruleW = "YF++ZF—XF[-YF—WF]++"
let ruleX = "+YF--ZF[—WF--XF]+"
let ruleY = "-WF++XF[+++YF++ZF]-"
let ruleZ = "-YF++++WF[+ZF++++XF]--XF"
let ruleF = "";

var startLength = 32;
let n = 10;
var theta = 90;
let generations = 3;
*/

/*
var axiom = "[X] [Y]++[X] [Y]++[X] [Y]++[X] [Y]++[X] [Y]"
let ruleW = "YF++ZF—XF[-YF—WF-]++"
let ruleX = "+YF--ZF[—WF--XF-]+"
let ruleY = "-WF++XF[+++YF++ZF+]-"
let ruleZ = "-YF++++WF[+ZF++++XF+]--XF"
let ruleF = "";

var startLength = 30;
let n = 10;
var theta = 36;
let generations = 3;
*/

/*
//person
var axiom = "F++F++F++F"
let ruleF = "-F-FF+++F+FF-F"

var startLength = 3;
let n = 8;
var theta = 360/n;
let generations = 3;
*/

var production = axiom;
var drawLength = startLength;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();

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
    } else if (step == 'X'){
      Newproduction = Newproduction + ruleX;
    }else if (step == 'Y'){
      Newproduction = Newproduction + ruleY;
    }else if (step == 'Z'){
      Newproduction = Newproduction + ruleZ;
    }else if (step == 'W'){
      Newproduction = Newproduction + ruleW;
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

  var saved = [t.position];
  var savedtheta = [theta];

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
      saved.push(t.position);
      savedtheta.push(theta)
    }
    else if (step == "]"){
      var pos = saved.pop();
      t.jump(pos);
      var angle = savedtheta.pop();
      theta = angle;
    }
  }
  return t;
}
