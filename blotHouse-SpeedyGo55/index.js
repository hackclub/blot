/*
@title: blotHouse
@author: SpeedyGo55
@snapshot: snapshot1.png
*/
const width = 125;
const height = 125;
const randSeed = 2094;

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

t = new bt.Turtle()
let tree_count = bt.randIntInRange(1, 3)
for (let i = 0; i < tree_count; i++) {
  let tree_x = bt.randInRange(20,105)
  let tree_y = start + 20 * bt.noise(tree_x)

  t.jump([tree_x, tree_y])
  t.down()

  t.left(90)
  t.forward(10 + 20 * bt.rand())
  t.right(90)

  let choice = bt.randIntInRange(0, 1);
  switch (choice) {
    case 0:
      t.forward(5)
      t.right(120)
      t.forward(10)
      t.right(120)
      t.forward(10)
      t.right(120)
      t.forward(5)

      t.up()
    case 1:
      t.arc(360,5 + 10 * bt.rand())
    default:
      break;
  }
}

  drawLines(t.lines())

t = new bt.Turtle()
let cloud_x = bt.randInRange(20, 80) 
let cloud_y = bt.randInRange(95, 115) 

let cloud_radius = 5 * bt.rand() 
let cloud_length = bt.randIntInRange(3, 6)

t.jump([cloud_x, cloud_y])
t.down()

for (let i = 0; i < cloud_length; i++) {
  t.arc(360, cloud_radius)
  t.up()
  t.forward(cloud_radius)
  t.left(90)
  t.forward(bt.randInRange(-2,2))
  t.right(90)
  t.down()
}

drawLines(t.lines())
