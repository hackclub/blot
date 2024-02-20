var axiom = "[X]++[X]++[X]++[X]++[X]";
let ruleW = "YF++ZF----XF[-YF----WF]++";
let ruleX = "+YF--ZF[---WF--XF]+";
let ruleY = "-WF++XF[+++YF++ZF]-";
let ruleZ = "--YF++++WF[+ZF++++XF]--XF";

var startLength = 15


//var startLength = 21;
var theta = 36; //36 degrees, try TWO_PI / 6.0, ...

//var theta = randInRange(20,60)

var production = axiom;
var drawLength = startLength;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();
var prod = iterate(production);

const t1 = render(t, prod);
t.join(t1);
drawTurtles([t]);


//apply substitution rules to create new iteration of production string
function iterate(production) {
    var newProduction = "";
  
    for(let i=0; i < production.length; ++i) {
      let step = production.charAt(i);
      //if current character is 'W', replace current character
      //by corresponding rule
      if (step === 'W') {
        newProduction = newProduction + ruleW;
      }
      else if (step === 'X') {
        newProduction = newProduction + ruleX;
      }
      else if (step === 'Y') {
        newProduction = newProduction + ruleY;
      }
      else if (step === 'Z') {
        newProduction = newProduction + ruleZ;
      }
      else {
        //drop all 'F' characters, don't touch other
        //characters (i.e. '+', '-', '[', ']'
        if (step !== 'F') {
          newProduction = newProduction + step;
        }
      }
    }

    drawLength = drawLength * 0.5;
    return newProduction;
}

//convert production string to a turtle graphic
function render(t, prod) {
        var right = true;

    for(let i=0; i< prod.length; ++i) {
          t.jump([width/2, height/2])


      //production = production.substring(0, production.length-1);

      var step = prod.charAt(i);

      //'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
      if( step === 'F') {
        for(let j=0; j < 9; j++) {
          t.forward(drawLength);
          t.down(-drawLength)
          if(right){
            t.right(theta);
          }
          else{
            t.left(theta);
          }
        }
      }
      else if (step === '+') {
        right = true;
      }
      else if (step === '-') {
        right = false;
      }
      else if (step === '[') {

      }
      else if (step === ']') {
        prod = prod.substring(0, prod.length-1);

      }
    }
  return t;
  
}
