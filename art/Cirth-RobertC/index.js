// welcome to my tolkien rune converter!
/*v1.4
@title: CirthRunes
@author: M1racl3max  (Robert C)
@snapshot: titleShot.svg
this is extremely imperfect, as cirth is
a phonetic script, not an alphabetic script, unlike english
go to line ~316 to change scaling, string, and other parameters 
I __will__ update this at some point to use variable spacing
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const shape = (sides) => {
  const b = new bt.Turtle();
  for(let i=0; i<sides; i++) b.forward(1).left(360/sides);
  return b.lines();
};

const letter = (a) => {
  const t = new bt.Turtle();
  const letter = a.toLowerCase();
  // const letter = typeof a == "string" ? a.toLowerCase() : null;
  const angle = 57;
  const supp = 180-angle;
  const rads = Math.PI/180;
  // angle but with radians for math.sin
  const angleR = angle * rads;
  // there has to be a better way of doing this
  switch(letter){
    case 'a':
      t.forward(1.5)
        .right(supp)
        .forward(0.75)
        .right(angle)
        .forward(1.5-Math.cos(angleR)*0.75);
      break;
      
    case 'b':
      t.jump([t.pos[0],t.pos[1]+0.25]).forward(1.5)
        .right(supp)
        .forward(0.75)
        .right(angle*2)
        .forward(0.75)
        .left(angle*2)
        .forward(0.75)
        .left(angle)
        .forward(0.1);
      break;
      
    case 'c':
      t.forward(1.5)
        .up()
        .forward(-0.75)
        .down()
        .right(2*angle)
        .forward(0.75)
      break;
      
    case 'd':
      t.forward(1.5)
        .right(2*angle)
        .forward(0.75)
        .left(angle)
        .forward(0.1)
        .jump([
          t.pos[0],
          t.pos[1]+(
            Math.sin(66*rads)*0.75
            +
            Math.cos(33*rads)*0.1
          )])
        .setAngle(0)
        .right(2*angle)
        .forward(0.75)
        .left(angle)
        .forward(0.1);
      break;
      
    case 'e':
      t.forward(1.5)
        .jump([t.pos[0]-0.1,t.pos[1]])
        .right(supp)
        .forward(0.75)
        .right(angle)
        .up().forward(-1*((Math.cos(angleR)*0.75)+0.1)).down()
        .forward(1.5);
      break;
      
    case 'f':
      t.forward(1.5)
        .left(supp)
        .forward(0.75)
        .left(angle*2)
        .forward(0.75);
      break;

    case 'g':
      t.forward(1.5)
        .up().forward(-0.5).down()
        .right(45)
        .forward(0.5*Math.sqrt(2))
        .jump([t.pos[0]-0.75, t.pos[1]+0.5])
        .forward(0.75*Math.sqrt(2));
      break;

    case 'h':
      t.up().forward(1.5).down()
        .right(130)
        .forward(0.75/Math.cos(50*rads))
        .right(100)
        .forward(0.75/Math.cos(50*rads))
      break;
      
    case 'y':
    case 'i':
      t.jump([t.pos[0],t.pos[1]-0.5])
        .forward(1.5);
      break;

    case 'j':
      t.forward(1.5)
        .jump([t.pos[0]-1, t.pos[1]])
        .right(135)
        .forward(0.5*Math.sqrt(2))
        .jump([t.pos[0]+0.25,t.pos[1]+0.5])
        .forward(0.25*Math.sqrt(2));
      break;

    case 'k':
      t.forward(1.5)
        .up()
        .forward(-0.75)
        .down()
        .goTo([t.pos[0]+0.75,t.pos[1]-0.5]);
      break;

    case 'l':
      t.forward(1.5)
        .jump([t.pos[0]-1.25, t.pos[1]+0.5])
        .goTo([t.pos[0]+1,t.pos[1]-1]);
      break;

    case 'm':
      t.forward(1.5);
      for(let i = 0; i<2; i++){
        t.right(supp)
        .forward(0.375/Math.cos(angleR))
        .right(114)
        .forward(0.375/Math.cos(angleR))
        .right(supp);
      }
      break;

    case 'n':
      t.forward(1)
        .goTo([t.pos[0]+0.5, t.pos[1]-0.5])
        .jump([t.pos[0],t.pos[1]+0.5])
        .forward(-0.5)
        .goTo([t.pos[0]+0.5, t.pos[1]+0.5]);
      break;

    case 'o':
      t.jump([t.pos[0], t.pos[1]+0.25])
        .right(12)
        .forward(1.5 / Math.sin(78*rads))
        .right(156)
        .forward(1.5 / Math.sin(78*rads));
        break;
      
    case 'p':
      t.forward(1.5)
        .right(supp)
        .forward(0.75)
        .right(angle*2)
        .forward(0.75);
      break;

    case 'q':
      // technically "kw", but phonetically similar and there's not a q
      t.forward(1.5)
        .right(supp)
        .forward(0.5)
        .left(180-(2*angle))
        .forward(0.5);
      break;

    case 'r':
      t.forward(1.5)
        .right(2*angle)
        .forward(0.75)
        .left(angle)
        .forward(0.1)
        .jump([
          t.pos[0]+(
            Math.cos(66*rads)*0.75
            -
            Math.sin(33*rads)*0.1
          ),
          t.pos[1]+(
            Math.sin(66*rads)*0.75
            +
            Math.cos(33*rads)*0.1
          )])
        .setAngle(0)
        .left(2*angle)
        .forward(0.75)
        .right(angle)
        .forward(0.1);
      break;
      
    case 's':
      t.right(angle)
        .forward(0.75)
        .left(angle)
        .forward(1.5-(Math.sin(33*rads)*0.75))
        .up()
        .forward(-1*(1.5-(Math.sin(33*rads)*0.75)))
        .down()
        .right(supp)
        .forward(0.75);
      break;
      
    case 't':
      t.forward(1.5)
        .right(2*angle)
        .forward(0.75)
        .left(angle)
        .forward(0.1);
      break;

    case 'u':
      t.right(45)
        .forward(1)
        .left(90)
        .forward(0.5)
        .left(90)
        .forward(0.5)
        .left(90)
        .forward(1);
      break;
      
    case 'v':
      t.forward(1.5)
        .left(180-angle)
        .forward(0.75)
        .left(angle*2)
        .forward(0.75)
        .right(angle*2)
        .forward(0.75)
        .right(angle)
        .forward(0.1);
      break;

    case 'w':
      t.forward(1)
        .right(angle)
        .forward(0.5)
        .left(114)
        .forward(0.5)
        .left(180-2*angle)
        .forward(0.5)
        .left(114)
        .forward(0.5);
      break;

    case 'x':
      // same as q, it's technically 'kh' but phonetically close I guess? x is weird
      t.forward(1.5)
        .goTo([t.pos[0]-0.5, t.pos[1]])
        .left(angle)
        .forward(0.5/Math.cos(angleR));
      break;

      // case 'y': see i

    case 'z':
      t.right(angle)
        .forward(0.5)
        .right(supp)
        .forward(Math.sin(33*rads)*0.5)
        .jump([t.pos[0]+Math.sin(33*rads)*0.5, t.pos[1]])
        .left(angle)
        .forward(0.5)
        .jump([t.pos[0], t.pos[1]+Math.cos(33*rads)*0.5])
        .setAngle(0)
        .forward(1.5);
      break;
  }
  return t.lines();
};

const word = (str) => {
  var lastChar = 0;
  const lines = [];
  for (let i=0; i<str.length; i++){
    const newChar = letter(str.at(i));
    // console.log(str.at(i));
    // console.log(newChar);
    bt.translate(newChar, [0,-1.125*i]);
    // bt.translate(newChar, [0,-1*(bt.bounds(letter(str.at(i-1))).width+0.1)]);
    bt.join(lines, newChar);
  }
  return lines;
};

/* const alph = 'abcdefghijklmnopqrstuvwxyz';
const shape0 = letter('u');
const shape1 = letter('v');

bt.translate(shape1, [0, -1]);
bt.translate(shape2, [0, -2]);
bt.join(shape0, shape1, shape2);
bt.rotate(shape0, 90, bt.bounds(shape0).lt);
bt.scale(shape0, [10,10]);
bt.translate(shape0, [20,20]);
*/
//parameters
const string = word("Cirth translator");
const string1 = word("by miracle max")
bt.translate(string1, [-2, 0]);
bt.join(string, string1);
bt.rotate(string, 90, bt.bounds(string).lt);
bt.translate(string, [47,102]);
bt.scale(string, [5,5]);
// draw it
drawLines(string);