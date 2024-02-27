var axiom = "L";
let ruleL = "LLR"
let ruleR = "R"

var startLength = 16;
var theta = 90; //36 degrees

var production = axiom;
var drawLength = startLength;

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = createTurtle();

var prod = production

let generations = randIntInRange(6,11)

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
    if (step === 'L') {
      Newproduction = Newproduction + ruleL;
    } else if (step === 'R') {
      Newproduction = Newproduction + ruleR;
    }
  }
  drawLength = drawLength * 0.74
  return Newproduction;
}


//convert production string to a turtle graphic
function render(t, prod) {
  t.jump([width/2, height/2])
  for (let i = 0; i < prod.length; ++i) {
    var step = prod.charAt(i);
    if (step == 'L') {
      t.forward(drawLength);
      t.left(theta)
  }
    else if (step == "R"){
      t.forward(drawLength);
      t.right(theta)
    }
  }
  return t;
}


