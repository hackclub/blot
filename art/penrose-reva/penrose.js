var axiom = "[X]++[X]++[X]++[X]++[X]";
let ruleW = "YF++ZF----XF[-YF----WF]++";
let ruleX = "+YF--ZF[---WF--XF]+";
let ruleY = "-WF++XF[+++YF++ZF]-";
let ruleZ = "--YF++++WF[+ZF++++XF]--XF";

var drawLength = 6;

var theta = 36; //36 degrees, try TWO_PI / 6.0, ...
//var theta = randInRange(20,60)

var production = axiom;

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
        newProduction = newProduction.substring(0,i) + ruleW + newProduction.substring(i);
      }
      else if (step === 'X') {
        newProduction = newProduction.substring(0,i) + ruleX + newProduction.substring(i);
      }
      else if (step === 'Y') {
        newProduction = newProduction.substring(0,i) + ruleY + newProduction.substring(i);
      }
      else if (step === 'Z') {
        newProduction = newProduction.substring(0,i) + ruleZ + newProduction.substring(i);
      }
    }
    return newProduction;
}


function render(t, prod) {
    for(let i=0; i< prod.length; ++i) {
          t.jump([width/2, height/2])
      if( prod.charAt(i) === 'F') {
        for(let j=0; j < 9; j++) {
          t.right(theta);
          t.forward(drawLength);
          t.down(-drawLength)
        }
      }
    }
  return t;
}
