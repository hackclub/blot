/*
@title: cloudyFibonacci
@author: Yohance
@snapshot: img1.png
*/
const coveringPolylines = [[[0, 0], [0, 120], [120,120], [120, 0]]];

const t = new bt.Turtle();
const width = 125;
const height = 125;
const finalLines = [];
const k = new bt.Turtle()
setDocDimensions(width, height);

const sinewave = [
    [0,0]
]
const amplitude = bt.randInRange(-5,5)
for (let i = 1; i < 360; i+=1){
  sinewave.push([i, amplitude*Math.sin(0.3*i)])
}

//makes array of fibonacci numbers
const size = [1,1]
for(let i = 0; i < 7; i++){
  size.push(size[size.length-1] + size[size.length-2])
}

//intitialize spiral array
const points = []
function make_fibonacci(){
  for (let i = 0; i < size.length; i++){
      for (let j = 0; j < 6; j++){
        if(i==0 && j==1){
          points.push(t.pos)
        }
        if(j==0 || j==2){
          points.push(t.pos)
        }
        t.forward(size[i])
        t.left(90)
        
        if (j > 4){t.up()}
      }
      t.down()
      t.right(90)
    }
  
}
make_fibonacci()
//rounds all spiral points to ints
for (let i = 0; i < points.length; i++){
  points[i][0] = Math.round(points[i][0])
  points[i][1] = Math.round(points[i][1])
}

function shell(){
  for (let i = 0; i < size.length; i++){
    k.arc(180,bt.randInRange(0.9*size[i], 1.1*size[i]))
  }
}
shell()
k.right(105)
const start_head = k.pos
for (let i = 0; i < 150; i++){
  k.left(gaussianRandom(-0.05, 0.5))
  k.forward(0.1)
}

tentacle(1)
k.forward(3)
tentacle(0.8)

k.forward(3)
function gaussianRandom(mean = 0, stdDev = 1) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
}

for ( let i = 0; i < 180; i++){
  k.left(gaussianRandom(1, 0.4))
  k.forward(0.1)
}
for (let i = 0; i < 400; i++){
  k.left(gaussianRandom(0.002, 0.5))
  k.forward(0.1)
}
k.setAngle(250)
k.arc(20,50)
k.arc(-30,10)
//const spiral  = [bt.nurbs([k.pos, [-5,-10], [-10,-20]])]


function tentacle(scale){
  k.right(90)
  k.forward(scale*10)
  k.right(30)
  k.arc(300,scale*1.5)
  k.right(91)
  k.forward(scale*8)
  k.right(90)
}

const spiral = [
  bt.nurbs(sinewave)
]
bt.translate(spiral, [-3,17])

console.log(points)
//const npoints = bt.noise(points)
//draws curve using points array
t.jump([points[0, 0], points[0,0]])
/*for (let i = 1; i < points.length; i++){
  t.goTo([points[i][0], points[i][1]])
}*/
const s = new bt.Turtle();
s.jump([bt.randInRange(16,37),bt.randInRange(103,106)])
function clouds(){
  for (let i = 1; i <16; i++){
    s.arc(180,2)
    if (i < 5){s.left(-160)}
    else if( i < 9){s.left(-150)}
    else if (i < 13){s.left(-160)}
    else{s.left(-150)}
  }
  
  const cloudLines = []
  bt.join(cloudLines, s.lines())
  //bt.translate(cloudLines, [27,106])
  bt.rotate(cloudLines, 34)
  bt.cut(cloudLines, coveringPolylines)
  drawLines(cloudLines)
}
clouds()
s.setAngle(bt.randInRange(67,81))
s.up()
s.forward(bt.randInRange(92,139))
s.down()
clouds()
s.up()
s.setAngle(bt.randInRange(60,86))
s.forward(bt.randInRange(120,150))
s.down()
clouds()

//const spiral = [bt.nurbs(points, { steps: 39, degree: 10 })]
const snailLines = []
bt.join(finalLines, t.lines())
bt.join(snailLines, k.lines())
bt.rotate(snailLines, 110)
bt.scale(snailLines, 0.5)
bt.scale(finalLines, 2)
bt.translate(snailLines, [width/2 + 26, height/2 - 52], bt.bounds(finalLines).cc)
bt.translate(finalLines, [width/2, height/2], bt.bounds(finalLines).cc)
bt.join(finalLines, spiral)

bt.cut(finalLines, coveringPolylines);

drawLines(snailLines)
drawLines(finalLines)
