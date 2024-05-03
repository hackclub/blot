/*
@title: Snaky-Snake
@author: V_Conery
@snapshot: Snap1
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const rir = bt.randIntInRange

const ttx = rir(20, 30)
const tty = (8)

const cp1x = rir(50, 60)
const cp1y = rir(10, 20)

const ap1x = rir(70, 80)
const ap1y = rir(20, 30)

const cp2x = rir(90, 100)
const cp2y = rir(40, 50)

const ap2x = rir(70, 80)
const ap2y = rir(51, 59)

const cp3x = rir(50, 60)
const cp3y = rir(60, 70)

const ap3x = rir(40, 30)
const ap3y = rir(65, 65)

const cp4x = rir(15, 25)
const cp4y = rir(70, 80)

const ap4x = rir(25, 35)
const ap4y = rir(90, 100)

const cp5x = rir(50, 60)
const cp5y = rir(110, 120)

const ap5x = rir(70, 80)
const ap5y = rir(101, 110)

const cp6x = rir(80, 95)
const cp6y = rir(80, 90)


const cl1 = bt.nurbs([
  [ttx, tty], 
  [cp1x, cp1y],
  [ap1x, ap1y],
  [cp2x, cp2y],
  [cp3x, cp3y],
  [cp4x, cp4y],
  [ap4x, ap4y],
  [cp5x, cp5y],
  [ap5x, ap5y],
  [cp6x, cp6y]], {steps: 1000, degree: 5}
)

const cl2 = bt.nurbs([
  [cp6x - 2, cp6y],
  [ap5x - 2, ap5y - 2],
  [cp5x, cp5y - 3],
  [ap4x + 2, ap4y - 2],
  [cp4x + 5, cp4y],
  [cp3x, cp3y + 8],
  [cp2x + 5, cp2y],
  [ap1x + 5, ap1y - 3],
  [cp1x, cp1y - 3],
  [ttx, tty]], {steps: 1000, degree: 5}
)

const face2 = bt.catmullRom([
  [cp6x - 2, cp6y],
  [cp6x + 1.0, cp6y - 10.2],
  [cp6x + 15, cp6y - 15],
  [cp6x - -9.3, cp6y - 2.4],
  [cp6x, cp6y]], 100)

const face1 = new bt.Turtle()
  .up()
  .goTo([cp6x, cp6y])
  .right(0)
  .arc(-90, 15)
  .down()
  .left(45)
  .forward(10)
  .left(45)
  .forward(5)
  .left(180)
  .forward(5)
  .left(90)
  .forward(5)
  .left(180)
  .forward(5)
  .left(-315)
  .forward(10)
  .left(135)
  .left(-84)
  .up()
  .arc(-90, 15)
  .goTo([cp6x - 2, cp6y])
  .left(220)
  .forward(10)
  .down()
  .arc(360, 1)

const base = bt.resample([[[0, 0], [125, 0]]], 1)

const cl1base = bt.resample([cl1], 1)

const back = []
for (let i = 0; i < base[0].length; i++) {
  const parity = i > base[0].length/2 ? 0 : 0
  const [x, y] = base[0][i]
  back.push(bt.catmullRom(
    [[x, y], 
     [x + parity * -3, y + 125]]))
}

const ws = [[[10, 10], [115, 10], [115, 115], [10, 115], [10, 10]]]

const snake = [cl2, face2, cl1]

const snake2 = bt.merge(snake) 

const back2 = [...back]

bt.cover(back2, ws)

drawLines([face2])
drawLines(back2)
drawLines(face1.lines())
drawLines([cl1])
drawLines([cl2])