/*
@title: Mountain
@author: Euan Ripper
@snapshot: snapshot0.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
const rr = bt.randInRange;
const sunSize = rr(15, 25);
//draw rays
for (let i = 0; i < 21; i++) {
  t.up();
  t.goTo([0, height])
  t.forward(sunSize + 2);
  t.down();
  t.forward(sunSize / 2);
  t.right(4.4);
}
//function for trees
function drawTree(x,y,scale){
  //const t = new bt.Turtle();
  t.up();
  t.goTo([x,y])
  t.down()
  for (let i = 0; i < 5; i++){
    t.goTo([x,y+scale])
    t.goTo([x+scale/6,y+scale*0.5])
    t.goTo([x,y+scale])
    t.goTo([x-scale/6,y+scale*0.5])
    t.goTo([x,y+scale])
    scale=scale-1
  }

  t.goTo([x,y])
  return (t)
}

//draw sun
t.up();
t.goTo([sunSize, height])
t.down();
for (let i = 0; i < 90; i++) {
  t.forward(3 * sunSize / 180);
  t.right(1)

}
//draw mountain
t.up();
var x = 0;
var y = width * rr(0.3, 0.5);
t.goTo([x, y])
t.down();
const mountains = Math.floor(rr(2, 4));
for (let i = 0; i < mountains; i++) {
  x = width / mountains * i
  for (let i = 0; i < width / (mountains * 2); i++) {
    x = x + 1
    var treeSeed=Math.floor(rr(5,20));
    if(treeSeed==9){
      t.up();
      let tree = drawTree(x,y,treeSeed);
      t.down();
      t.goTo([x,y])
    }
    y = y + rr(-1, 3)
    t.goTo([x, y])
  }
  for (let i = 0; i < width / (mountains * 2.5); i++) {
    var treeSeed=Math.floor(rr(5,20));
    if(treeSeed==9){
      t.up();
      let tree = drawTree(x,y,treeSeed);
      t.down();
      t.goTo([x,y])
    }    
    x = x + 1
    y = y + rr(-3, 1)
    t.goTo([x, y])
  }

}

//draw birds
t.up()
t.goTo([rr(sunSize*3.5,width-10),height-rr(5,sunSize)])
t.down()
t.forward(10)
t.left(45)
t.forward(5)
t.right(90)
t.forward(5)
t.left(45)
t.forward(10)



// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
//const cc = bt.bounds(finalLines).cc;
//bt.translate(finalLines, [sunSize/1.3, height-sunSize/1.3], cc);

// draw it
drawLines(finalLines);
