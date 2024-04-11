/*
@title: Pizza Maker
@author: eminentquasar34
@snapshot: perfectpizza.png
*/

const width = 125;
const height = 125;

const num_of_pepperonis = 0;
const num_of_mushrooms = 5;
const num_of_peppers = 5;
const num_of_pineapples = 0;
const num_of_olives = 3;
// Go to bottom of file after changing these values

setDocDimensions(width, height);

const drawBase = () => {
  const p = new bt.Turtle()
  for (let i = 0; i < 183; i++) p.forward(0.2).right(2)
  p.up().left(90).forward(0.5).right(90).down()
  for (let i = 0; i < 183; i++) p.forward(0.215).right(2)
  return p.lines()
}

const createRandCoordinates = () => {
  const x = bt.randIntInRange(33, 78)
  const y = bt.randIntInRange(59 - Math.sqrt(Math.pow(35, 2) - Math.pow((62.5 - x), 2)), 47 + Math.sqrt(Math.pow(35, 2) - Math.pow((62.5 - x), 2)))
  return [x, y]
}


const drawMushroom = () => {
  const curve = bt.catmullRom([[15, 1.5], [14.5, 4], [13.5, 8], [11, 7], [10, 7], [9, 9.5], [14.5, 12.5], [20, 9.5], [20, 7.5], [19, 7.5], [17, 7.5], [17.5, 1.5], [16.5, 1.5], [15, 1.5]])
  bt.translate([curve], createRandCoordinates())
  bt.rotate([curve], bt.randIntInRange(0, 360))
  return [curve]
}

const drawPepperoni = () => {
  const p = new bt.Turtle()
  p.up().goTo(createRandCoordinates()).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawPineapple = () => {
  const p = new bt.Turtle()
  p.up().goTo(createRandCoordinates()).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawOlive = () => {
  const p = new bt.Turtle()
  p.up().goTo(createRandCoordinates()).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(90).forward(2).down()
  p.forward(3)
  p.up().right(180).forward(1.5).left(90).forward(1.5).right(180).down()
  p.forward(3)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  return p.lines()
}

const drawPepper = () => {
  const p = new bt.Turtle()
  p.up().goTo(createRandCoordinates()).down()
  for (let i = 0; i < 138; i++) p.forward(0.1).right(2)
  p.left(123)
  for (let i = 0; i < 109; i++) p.forward(0.1).right(2)
  p.left(157)
  for (let i = 0; i < 123; i++) p.forward(0.1).right(2)
  p.left(139)
  for (let i = 0; i < 126; i++) p.forward(0.1).right(2)
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
  p.up().goTo([40, 85]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([57, 93]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([73, 44]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([91, 67]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([61, 37]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([53, 47]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([74, 67]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  
  // pineapple
  p.up().goTo([28, 64]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([86, 48]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([44, 24]).down()
  p.forward(1.1).left(60)
  p.forward(7.0).left(120)
  p.forward(5.4).left(96)
  p.forward(6.07).left(65)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))

  // pepper
  p.up().goTo([75, 49]).down()
  for (let i = 0; i < 138; i++) p.forward(0.1).right(2)
  p.left(123)
  for (let i = 0; i < 109; i++) p.forward(0.1).right(2)
  p.left(157)
  for (let i = 0; i < 123; i++) p.forward(0.1).right(2)
  p.left(139)
  for (let i = 0; i < 126; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([54, 76]).down()
  for (let i = 0; i < 138; i++) p.forward(0.1).right(2)
  p.left(123)
  for (let i = 0; i < 109; i++) p.forward(0.1).right(2)
  p.left(157)
  for (let i = 0; i < 123; i++) p.forward(0.1).right(2)
  p.left(139)
  for (let i = 0; i < 126; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([38, 36]).down()
  for (let i = 0; i < 138; i++) p.forward(0.1).right(2)
  p.left(123)
  for (let i = 0; i < 109; i++) p.forward(0.1).right(2)
  p.left(157)
  for (let i = 0; i < 123; i++) p.forward(0.1).right(2)
  p.left(139)
  for (let i = 0; i < 126; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([73, 25]).down()
  for (let i = 0; i < 138; i++) p.forward(0.1).right(2)
  p.left(123)
  for (let i = 0; i < 109; i++) p.forward(0.1).right(2)
  p.left(157)
  for (let i = 0; i < 123; i++) p.forward(0.1).right(2)
  p.left(139)
  for (let i = 0; i < 126; i++) p.forward(0.1).right(2)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))

  // olives (few because i don't like olives)
  p.up().goTo([83, 73]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(90).forward(2).down()
  p.forward(3)
  p.up().right(180).forward(1.5).left(90).forward(1.5).right(180).down()
  p.forward(3)
  bt.rotate(p.lines(), bt.randIntInRange(0, 360))
  p.up().goTo([30, 51]).down()
  for (let i = 0; i < 183; i++) p.forward(0.1).right(2)
  p.up().right(90).forward(2).down()
  p.forward(3)
  p.up().right(180).forward(1.5).left(90).forward(1.5).right(180).down()
  p.forward(3)
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

// drawToppings()
const randomPizza = () => {
  for (let i = 0; i < num_of_pepperonis; i++) {
    drawLines(drawPepperoni())
  }
  
  for (let i = 0; i < num_of_peppers; i++) {
    drawLines(drawPepper())
  }
  
  for (let i = 0; i < num_of_olives; i++) {
    drawLines(drawOlive())
  }
  
  for (let i = 0; i < num_of_pineapples; i++) {
    drawLines(drawPineapple())
  }
  
  for (let i = 0; i < num_of_mushrooms; i++) {
    drawLines(drawMushroom())
  }
}

// Comment out the perfectPizza() line and uncomment the randomPizza() line

drawLines(perfectPizza())

// randomPizza()