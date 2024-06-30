/*
@title: DontLookattheSun
@author: Benjamin
@snapshot: 0.png
*/

setDocDimensions(800, 600);
const eye = new bt.Turtle()
const t = new bt.Turtle()

// Parameters
const numCircles = 12
const circleSlope = 25
const circleSpread = 25
const circleSize = 2


for(let k=1; k<2; k++) {
  for(let j=1; j<3;j++) {
    for(let i=0; i<numCircles;i++) {
      eye.jump([407-circleSpread*i,circleSlope*i])
      eye.arc(k*360,i*circleSize*j)
    }
  }
}

for(let k=1; k<2; k++) {
  for(let j=1; j<3;j++) {
    for(let i=0; i<numCircles;i++) {
      eye.jump([394+circleSpread*i,circleSlope*i])
      eye.arc(k*360,i*circleSize*j)
    }
  }
}

t.jump([250,350])
t.goTo([400,600])

t.jump([300,300])
t.goTo([400,600])

t.jump([350,220])
t.goTo([400,600])

t.jump([400,220])
t.goTo([400,600])

t.jump([450,220])
t.goTo([400,600])

t.jump([500,300])
t.goTo([400,600])

t.jump([550,350])
t.goTo([400,600])


t.jump([400,502])
t.arc(360,49)

drawLines(eye.lines(), {stroke: "green", width: 2})
drawLines(t.lines(), { fill: "red", stroke: "red", width: 4})