/*
@title: Pizza Maker
@author: eminentquasar34
@snapshot: perfectpizza.png
*/

const width = 125;
const height = 125;

// ------------------------------------ EDITABLE, only 1-12, then go to bottom of file for more instructions

const amount_of_toppings = 12

// ------------------------------------


const p = new bt.Turtle();
// Go to bottom of file after changing these values

setDocDimensions(width, height);

const drawBase = () => {
  const f = new bt.Turtle()
  for (let i = 0; i < 183; i++) f.forward(0.2).right(2)
  f.up().left(90).forward(0.5).right(90).down()
  for (let i = 0; i < 183; i++) f.forward(0.215).right(2)
  return f.lines()
}

const createRandCoordinates = () => {
  const x = bt.randIntInRange(33, 78)
  const y = bt.randIntInRange(59 - Math.sqrt(Math.pow(35, 2) - Math.pow((62.5 - x), 2)), 47 + Math.sqrt(Math.pow(35, 2) - Math.pow((62.5 - x), 2)))
  return [x, y]
}




const drawMushroom = () => {
  // p.up().goTo().down()
  p.forward(3)
  p.left(90).forward(3)
  for (let i = 0; i < 82; i++) p.forward(0.052).right(2.5)
  p.left(74).forward(0.5).left(90)
  for (let i = 0; i < 40; i++) p.forward(0.213).left(2.9)
  for (let i = 0; i < 26; i++) p.forward(0.234).left(1.3)
  for (let i = 0; i < 40; i++) p.forward(0.206).left(3.1)
  p.left(74).forward(0.5).left(90)
  for (let i = 0; i < 82; i++) p.forward(0.066).right(2.5)
  p.left(-4).forward(3.9)
  return p.lines()

  
}

const drawTomato = (x) => {
  // p.up().goTo(x).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawPineapple = (x) => {
  // p.up().goTo([x]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawOlive = (x) => {
  // const p = new bt.Turtle()
  // p.up().goTo(x).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(57).forward(2.0).down()
  for (let i = 0; i < 183; i++) p.forward(0.04).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawPepper = (x) => {
  // p.up().goTo([x]).down()
  const randRotate = bt.randIntInRange(0, 360)
  for (let i = 0; i < 99; i++) p.forward(0.1).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.1).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.1).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.1).right(2)
  p.up().left(39).forward(1).right(90).forward(1).left(180).down()
  for (let i = 0; i < 95; i++) p.forward(0.06).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.06).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.06).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.06).right(2)
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawOnion = (x) => {
  // p.up().goTo(x).down()
  for (let i = 0; i < 75; i++) p.forward(0.24).right(2)
  p.right(85).forward(1).right(78)
  for (let i = 0; i < 60; i++) p.forward(0.23).left(2)
  p.right(85).forward(1)
  
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawToppings = () => { // NOT USED
  const toppingType = [drawMushroom(), drawPepperoni(), drawPineapple(), drawOlive(), drawPepper()]
  const numberOfToppings = bt.randIntInRange(8, 20)
  const p = new bt.Turtle()
  p.jump([width/2, height/2])
  let polyline = []
  for (let i = 0; i <= numberOfToppings; i++) {
    let topping = bt.randIntInRange(0, 5)
    console.log("here!" + i)
    drawLines(toppingType[topping])
  }

}
const isInPizzaBase = (x, y) => { // NOT USED
  const Xdistance = Math.abs(width/2 - x)
  const Ydistance = Math.abs(width/2 - y)
  if (Math.sqrt(Math.pow(Xdistance, 2) + Math.pow(Ydistance, y)) <= 60) {
    return true;
  } else {
    return false;
}
}

const perfectPizza = () => {
  // made by copying topping code and changing random coordinates into self-chosen coordinates
  const p = new bt.Turtle()

  // pepperoni
  p.up().goTo([40, 65]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([57, 88]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([73, 55]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([97, 58]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([61, 28]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([53, 47]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([63, 66]).down()
  for (let i = 0; i < 88; i++) p.forward(0.15).right(2)
  p.right(90).forward(8.6).up().right(180).forward(1).down().left(90)
  for (let i = 0; i < 91; i++) p.forward(0.115).right(2)
  p.up().right(90).forward(3).right(146).forward(0.7).down()
  p.forward(1)
  p.up().right(180).forward(1.7).right(138).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(2.2).right(132).forward(0.7).down()
  p.forward(1.5)
  p.up().right(180).forward(1.7).right(136).forward(0.7).down()
  p.forward(1)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  
  // pineapple
  p.up().goTo([29, 64]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([94, 52]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([48, 30]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))

  // pepper
  p.up().goTo([75, 49]).down()
  for (let i = 0; i < 99; i++) p.forward(0.1).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.1).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.1).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.1).right(2)
  p.up().left(39).forward(1).right(90).forward(1).left(180).down()
  for (let i = 0; i < 95; i++) p.forward(0.06).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.06).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.06).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.06).right(2)
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([54, 76]).down()
  for (let i = 0; i < 99; i++) p.forward(0.1).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.1).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.1).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.1).right(2)
  p.up().left(39).forward(1).right(90).forward(1).left(180).down()
  for (let i = 0; i < 95; i++) p.forward(0.06).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.06).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.06).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.06).right(2)
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([43, 37]).down()
  for (let i = 0; i < 99; i++) p.forward(0.1).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.1).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.1).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.1).right(2)
  p.up().left(39).forward(1).right(90).forward(1).left(180).down()
  for (let i = 0; i < 95; i++) p.forward(0.06).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.06).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.06).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.06).right(2)
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  
  p.up().goTo([71, 33]).down()
  for (let i = 0; i < 99; i++) p.forward(0.1).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.1).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.1).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.1).right(2)
  p.up().left(39).forward(1).right(90).forward(1).left(180).down()
  for (let i = 0; i < 95; i++) p.forward(0.06).right(2)
  p.left(93)
  for (let i = 0; i < 92; i++) p.forward(0.06).right(2)
  p.left(106)
  for (let i = 0; i < 100; i++) p.forward(0.06).right(2)
  p.left(120)
  for (let i = 0; i < 115; i++) p.forward(0.06).right(2)
  
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))

  // olives (few because i don't like olives)
  p.up().goTo([83, 73]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(57).forward(2.0).down()
  for (let i = 0; i < 183; i++) p.forward(0.04).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([30, 51]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(57).forward(2.0).down()
  for (let i = 0; i < 183; i++) p.forward(0.04).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))

  // mushrooms
  const curve = bt.catmullRom([[15, 1.5], [14.5, 4], [13.5, 8], [11, 7], [10, 7], [9, 9.5], [14.5, 12.5], [20, 9.5], [20, 7.5], [19, 7.5], [17, 7.5], [17.5, 1.5], [16.5, 1.5], [15, 1.5]])
  bt.translate([curve], [40, 51])
  bt.rotate([curve], bt.randIntInRange(0, 360))
  const curve2 = bt.catmullRom([[15, 1.5], [14.5, 4], [13.5, 8], [11, 7], [10, 7], [9, 9.5], [14.5, 12.5], [20, 9.5], [20, 7.5], [19, 7.5], [17, 7.5], [17.5, 1.5], [16.5, 1.5], [15, 1.5]])
  bt.translate([curve2], [59, 73])
  bt.rotate([curve2], bt.randIntInRange(0, 360))
  const curve3 = bt.catmullRom([[15, 1.5], [14.5, 4], [13.5, 8], [11, 7], [10, 7], [9, 9.5], [14.5, 12.5], [20, 9.5], [20, 7.5], [19, 7.5], [17, 7.5], [17.5, 1.5], [16.5, 1.5], [15, 1.5]])
  bt.translate([curve3], [72, 29])
  bt.rotate([curve3], bt.randIntInRange(0, 360))
  drawLines([curve])
  drawLines([curve2])
  drawLines([curve3])
  
  return p.lines()
  
}



drawLines(bt.translate(bt.scale(drawBase(), [7, 7]), [width/2, height/2]))



  
const randomPizza = (num_of_toppings) => {
  const coords = [[35, 71], [67, 24], [47, 34], [67, 83] ,[88, 72] ,[62, 40] ,[86, 41], [34, 49], [51, 83], [63, 65], [72, 58], [48, 60]]
  
  let polylines = p.lines()
  let rand = 0
  const toppings = ["mushroom", "tomato", "pineapple", "olive", "pepper"]
  for (let i = 0; i < num_of_toppings; i ++) {
    rand = bt.randIntInRange(0, 4)
    console.log(toppings[rand] + " " + coords[i])
    switch (rand) {
      case 0:
        p.up().goTo((coords[i])).down()
        drawMushroom()
        break;
      case 1:
        p.up().goTo((coords[i])).down()
        drawTomato()
        break;
      case 2:
        p.up().goTo((coords[i])).down()
        drawPineapple()
        break;
      case 3:
        p.up().goTo((coords[i])).down()
        drawOlive()
        break;
      case 4:
        p.up().goTo((coords[i])).down()
        drawPepper()
        break;
    }
    
  }

  return p.lines()
  
}


// Comment out the perfectPizza() line and uncomment the randomPizza() line

drawLines(perfectPizza())

// drawLines(randomPizza())
