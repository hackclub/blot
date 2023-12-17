// welcome to blot!

const width = 120;
const height = 120;

setDocDimensions(width, height);

const n = createTurtle();
const num = 36
const s = 6
const l = 10



function doom(sides, length, index) {
  const t = createTurtle()
  
  
  for (let i=0; i<sides; i++) {
    for (let j=0; j<sides-1; j++) {
        t.forward(length)
        t.rotate(360/sides)
    }
    t.forward(length)
    t.rotate(360-360/sides)
    t.forward(length)
  }
  t.translate([width / 2, height / 2], t.cc)
  t.rotate((360/num)*index)


  return t
}
const radius = 2
n.arc(360,radius)
let prev = randInRange(0, 0.5)
n.jump([-radius, -radius])
n.left(90)
n.forward(-height/2)
n.jump([radius, -radius])
n.forward(-height/2)
n.translate([width / 2, height / 2  + radius ], n.ct)

n
  .resample(0.16)
  .iteratePath((pt, tValue) => {
    const [x, y] = pt
    pt[0] +=  Math.sin(y * prev)
    prev += noise(y*0.1)*0.001 + randInRange(-0.002, 0.002)
    return pt
  })




for (let i=0; i<num; i++) {
  n.join(doom(s,l, i))

}

drawTurtles([
    n
]);