/*
@title: hackclub french fries
@author: xiexiedev
@snapshot: 0.png
*/

const width = 120
const height = 120

setDocDimensions(width, height)

const shapes = [];

function createContainer(translate = [0, 0], rotate = 0) {
  const t = new bt.Turtle()

  t.right(158)
  t.arc(-40, 13.6)

  t.right(263)
  t.forward(15)

  t.right(248)
  t.arc(-20, 41)


  t.right(253)
  t.forward(15)

  bt.translate(t.path, translate)
  bt.rotate(t.path, rotate)

  return t
}

function createh() {
  const t = new bt.Turtle()
  t.forward(1.05)
  t.right(90)
  t.forward(2.0)

  t.right(340)
  t.forward(0.5)
  t.right(-20)
  t.forward(0.80)
  t.right(-50)
  t.forward(0.30)
  t.right(-60)
  t.forward(0.60)
  t.right(-30)
  t.forward(2.5645)

  t.right(90)
  t.forward(1.05)
  t.right(90)
  t.forward(3.50)
  t.right(26)
  t.arc(-101, 1.6)
  t.right(-127)
  t.forward(2.5)
  t.right(110)
  t.forward(1.065)
  t.right(70)
  t.forward(6.200)

  bt.translate(t.path, [0, 0], [6.300, 5])
  bt.scale(t.path, 1.20)
  return t
}

function createFries(i) {
  const t = new bt.Turtle()

  const randl = (bt.randInRange(0.4, 1.25))
 

  t.right(90)
  t.forward(randl * 6)

  t.right(45)
  t.forward(0.3)
  t.right(45)
  t.forward(1*bt.randInRange(0.70,1))
  t.right(45)
  t.forward(0.3)
  t.right(45)
  t.forward(randl * 6)

  for(let j=0;j<12;j++){
    const line = new bt.Turtle();
    line.right(90)
    line.forward(randl*6+0.1);
    const path = line.path;
    bt.translate(path, [0,0],[0.1*j+0.15,0]);
    bt.resample(path, 0.01)
    bt.iteratePoints(path, pt => {
      return Math.random() < (0.87) ? 'BREAK' : pt
    })
    bt.join(t.path, path)
    
    
  }
 
  var minur = 0
  if (4 - i > 0) minur = 4 - i
  else minur = i - 4
  bt.translate(t.path, [0, 0], [10.5, 14.2 + minur * 0.1])
  return t
}

for (let j = 0; j < 6; j++) {
  const t = createFries(j + 1)
  bt.translate(t.path, [2 * j + 1.0, 0])
  bt.rotate(t.path, bt.randInRange(-1, 1) * 6 * 2.2)

  bt.join(shapes, t.path)
}


const t = createContainer()

bt.join(shapes, t.path)
bt.join(shapes, createh().path)

bt.scale(shapes, [1, -1])
bt.translate(shapes, [width / 2, height / 2], bt.bounds(shapes).cc)
bt.scale(shapes, 3.25)

drawLines(shapes)
