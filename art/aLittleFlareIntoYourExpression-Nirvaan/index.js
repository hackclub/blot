// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();
t.goTo([10,0])

for (let i = 0; i < 10; i++) {
  t.forward(i);
// add turtle to final lines
  t.arc(0 + i*bt.randInRange(7, 9),45);
}

t.jump([0,80])

const eyes = bt.rand()
if (eyes < .34) {

  t.jump([width/2 - 80,height - 70])

  t.arc(360, 10)

  t.jump([width/2 - 20,height - 70])

  t.arc(360, 10)
} else if (eyes < .66 && eyes > .34) {

  t.jump([width/2 - 30,height - 50])
  t.setAngle(90)
  t.arc(180, 5)

  t.goTo([width/2 - 39.5,height - 60])
  
  t.arc(180, 5)

  t.goTo([width/2 - 30,height - 50])
  
  t.setAngle(90)
  t.jump([width/2 - 60,height - 50])

  t.arc(180, 5)

  t.goTo([width/2 - 69.5,height - 60])

  t.arc(180, 5)

  t.goTo([width/2 - 60,height - 50])

} else {

  t.jump([width/2 - 20,height - 50])
  t.setAngle(30)
  t.arc(180, 5)
  t.forward(10)
  t.arc(180, 5)
  t.forward(10)
  t.jump([width/2 - 32,height - 57])
  t.setAngle(290)
  t.arc(180,7)
  t.jump([width/2 - 70,height - 40])
  t.setAngle(150)
  t.arc(180, 5)
  t.forward(10)
  t.arc(180, 5)
  t.forward(10)
  t.jump([width/2 - 77,height - 50])
  t.setAngle(240)
  t.arc(180,7)
}

const mouth = bt.rand()
if (mouth < .34) {

  
  t.jump([width/2 - 80,height - 90])

  

  t.goTo([width/2 - 20,height - 90])
  
} else if (eyes < .66 && eyes > .34) {

  t.jump([width/2 - 80,height - 80])
  t.setAngle(-90)
  t.arc(180,30)

  t.goTo([width/2 - 80,height - 80])
}
 else {

  t.jump([width/2 - 20,height - 100])
  t.setAngle(90)
  t.arc(180,30)

  t.goTo([width/2 - 20,height - 100])
}

// add turtle to final lines
bt.join(finalLines, t.lines());

// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);