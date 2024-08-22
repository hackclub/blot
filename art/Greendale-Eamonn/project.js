/*
@title: Greendale
@author: Eamonn
@snapshot: greendaleSnapshot.png
*/





// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

let spin = false // set to false to not let the idea cross path spin/ set to true to let them spin
let buildings = true // set to false to remove the background

const width = 125;
const height = 125;

setDocDimensions(width, height);
drawLines([
    [[7, 0], [28, 119]],
   [[10, 0], [31, 119]],
   [[27, 119], [31, 119]],
  [[27, 119], [3, 0]],
   [[7, 0], [3, 0]],
     [[6, 0], [10, 0]],
])




const ideas1 = ([
   [[65, 68.5], [67.8, 91.4]],
     [[68, 67.9], [70.7, 90.9]],
   [[66, 91.6], [72.2, 90.8]],
    [[66, 91.6], [69.6, 93.5]],
     [[72, 90.8], [69.6, 93.5]],
    [[63.5, 68.9], [69.3, 67.7]],
   [[65.9, 66.3], [69.3, 67.7]],
  [[65.9, 66.3], [63.5, 68.9]],
  ])

 if (spin === false ){
const r_ideas1 = bt.rotate(ideas1,-361)
 } else if (spin === true){
   const r_ideas1 = bt.rotate(ideas1,bt.randInRange(-360,360))
 }
drawLines(ideas1)
const ideas = [
    [[65, 68.5], [67.8, 91.4]],
     [[68, 67.9], [70.7, 90.9]],
   [[66, 91.6], [72.2, 90.8]],
    [[66, 91.6], [69.6, 93.5]],
     [[72, 90.8], [69.6, 93.5]],
    [[63.5, 68.9], [69.3, 67.7]],
   [[65.9, 66.3], [69.3, 67.7]],
  [[65.9, 66.3], [63.5, 68.9]],
  ]

 
 if (spin === false){
const r_ideas = bt.rotate(ideas,-232)
 } else if (spin === true){
   const r_ideas = bt.rotate(ideas,bt.randInRange(-360,360))
 }

drawLines(ideas)

const ideas2 = [
    [[65, 68.5], [67.8, 91.4]],
     [[68, 67.9], [70.7, 90.9]],
   [[66, 91.6], [72.2, 90.8]],
    [[66, 91.6], [69.6, 93.5]],
     [[72, 90.8], [69.6, 93.5]],
    [[63.5, 68.9], [69.3, 67.7]],
   [[65.9, 66.3], [69.3, 67.7]],
  [[65.9, 66.3], [63.5, 68.9]],
  ]

 if (spin === false){
const r_ideas2 = bt.rotate(ideas2,-125)
 } else if (spin === true){
   const r_ideas2 = bt.rotate(ideas2,bt.randInRange(-360,360))
 }
drawLines(ideas2)
// store final lines here
const finalLines = [];
const s = 50;



const name1 = [
   [[44,108 ], [40,108 ]],
    [[40,103 ], [40,108 ]],
   [[40,103 ], [44,103 ]],
    [[44,105 ], [44,103 ]],
   [[42,105 ], [44,105 ]],
  ]

drawLines(name1)

const name2 = [
   [[48,108 ], [48,102.5 ]],
  [[48,108 ], [51,107.9 ]],
   [[51,106 ], [51,107.9 ]],
     [[51,106 ], [48,104.4 ]],
    [[51,103 ], [48,104.5 ]],
  ]

drawLines(name2)
const name3 = [
   [[54,108 ], [54,102.1 ]],
  [[57,102 ], [54,102.2 ]],
    [[57,105 ], [54,104.7 ]],
   [[57,108 ], [54,107.8 ]],
  ]

drawLines(name3)
const name4 = [
   [[60,102 ], [60,108.3 ]],
   [[63,108.5 ], [60,108.3 ]],
   [[63,105.2 ], [60,105.1 ]],
    [[63,102.0 ], [60,102.0 ]],
  ]
drawLines(name4)
const name5 = [
   [[65,102 ], [65,108.3 ]],
     [[68,102 ], [65,108.3 ]],
    [[68,102 ], [68,108.5 ]],
 
  ]
drawLines(name5)
const name6 = [
   [[71,108.5 ], [71,101.8 ]],
       [[74,105.6 ], [71,101.8 ]],
    [[74,105.6 ], [71,108.4 ]],
  ]
drawLines(name6)
const name7 = [
   [[77.5,108.1 ], [75,101.8 ]],
    [[77.5,108.1 ], [80,101.8 ]],
    [[75.2,105.8 ], [80,104.7 ]],
  ]
drawLines(name7)
const name8 = [
   [[82.5,108.0 ], [82.5,101.8 ]],
   [[85.2,101.9 ], [82.5,101.8 ]],
  ]
drawLines(name8)
const name9 = [
   [[87.4,108.0 ], [87.4,101.8 ]],
  [[90.4,102.0 ], [87.4,101.8 ]],
    [[90.4,105.3 ], [87.4,104.8 ]],
      [[90.4,108.5 ], [87.4,108.1 ]],
  ]
drawLines(name9)


/*
const cloudB1 = [
  [[99,18 ], [63.9,17.2 ]],

  ]
drawLines(cloudB1)
*/
if (buildings === true){
const q = new bt.Turtle()
q.jump([28, 0])
q.left(90)
q.forward(46)
q.left(-90)
q.forward(37)
q.left(270)
q.forward(46)
q.left(180)
q.up()
q.forward(36)
q.down()
q.right(90)
q.forward(31)
q.right(90)
q.forward(36)
q.right(180)
q.forward(47.26)
q.jump([106.55, 88.8])
q.right(90)
q.forward(18.4)
drawLines(q.lines())


const z = new bt.Turtle()
z.jump([30, 42])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
  z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)




z.jump([30, 35])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
  z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)



z.jump([30, 28])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
  z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
drawLines(z.lines())


z.jump([30, 21])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
  z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)


z.jump([30, 14])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
  z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

q.jump([28, 0])
q.left(90)
q.forward(46)
q.left(-90)
q.forward(37)
q.left(270)
q.forward(46)
q.left(180)
q.up()
q.forward(36)
q.down()
q.right(90)
q.forward(31)
q.right(90)
q.forward(36)
q.right(180)
q.forward(47.26)
q.jump([106.55, 88.8])
q.right(90)
q.forward(18.4)
drawLines(q.lines())

//------------------------------------------

z.jump([67.5, 34])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 



z.jump([67.5, 27])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 


z.jump([67.5, 20])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

drawLines(z.lines())


z.jump([67.5, 13])
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 

//--------------------

z.jump([102.4, 86])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 



z.jump([109.2, 79])

z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 


z.jump([102.2, 72])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

drawLines(z.lines())


z.jump([102.1, 65])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 
z.jump([102.1, 58])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
 

z.jump([102.1, 51])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

z.jump([94.8, 44])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)


z.jump([94.8, 37])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

z.jump([94.8, 30])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)

z.jump([94.8, 23])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)


z.jump([94.8, 16])

z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.up()
z.forward(7)
z.down()
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)
z.forward(5)
z.right(90)


drawLines(z.lines())
}

const win = [
     [[101.8,46], [101.8,46.2]],
   [[101.8,46], [106.8,46 ]],
  [[106.9,51], [106.8,46 ]],
    [[106.9,51], [106.47,51 ]],
  ]
drawLines(win)



//drawLines([cloudT1])
const t = new bt.Turtle()

const size = 2
const angle = 7.2
t.jump([67, 64])

t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)
t.left(angle)
t.forward(size)

drawLines(t.lines())


drawLines(t.lines())
setDocDimensions(width, height)

const flag = bt.catmullRom([[19, 53],[56, 50],[85, 50], [104, 47], 
                            [108, 67],  [106, 95],[106, 102],[105, 113],[76, 109], [31, 118]])

drawLines([flag])
