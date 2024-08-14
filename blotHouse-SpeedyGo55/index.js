/*
@title: blotHouse
@author: SpeedyGo55
@snapshot: snapshot1.png
*/
const width = 125;
const height = 125;
const randSeed = 1719;

bt.setRandSeed(randSeed)

setDocDimensions(width, height);

let t = new bt.Turtle()

var start = 20 + 20 * (bt.rand())

var house_height = 30 + 20 * bt.rand()

var house_width = Math.sqrt((Math.pow(125 / 4, 2) * 2))

var house_start = (125 / 2) - (house_width / 2)

var door_distance = (house_width - 10) * bt.rand() + 10

var door_height = (house_height - 25) * bt.rand() + 20

let radius = 20 * bt.rand()

let cnt_rays = bt.randIntInRange(3, 10)

let ray_length = 10 * bt.rand()

var lines = [];

for (let i = 0; i <= width; i += 0.1) {
  lines.push([i, start + 20 * bt.noise(i * bt.rand(), { octaves: 8 })])
}
drawLines([lines])

t.jump([house_start, start + 20 * bt.noise(house_start)])
t.left(90)
t.forward(house_height)
t.right(45)
t.forward(125 / 4)
t.right(90)
t.forward(125 / 4)
t.right(45)
t.right(90)
t.forward(house_width)
t.left(180)
t.forward(house_width)
t.right(90)
t.forward(house_height)
t.right(90)
t.up()
t.forward(door_distance)
t.right(90)
t.down()
t.forward(door_height)
t.right(90)
t.forward(10)
t.right(90)
t.forward(door_height / 2)
t.right(90)
t.forward(2)
t.right(180)
t.forward(2)
t.right(90)
t.forward(door_height / 2)


drawLines(t.lines())

t = new bt.Turtle()

t.jump([0, 125 - radius])
for (let i = 1; i < cnt_rays; i++) {
  t.arc(90 / cnt_rays, radius)
  t.right(90)
  t.forward(ray_length)
  t.right(180)
  t.forward(ray_length)
  t.right(90)
}
t.arc(90 / cnt_rays, radius)

drawLines(t.lines())