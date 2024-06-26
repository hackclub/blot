/*
@title: Minion
@author: Celloii Nehc
@snapshot: snapshot0
*/

// welcome to bot!

const t = new bt.Turtle();

//head and body
t.jump([100, 100])
t.right(270)

t.arc(180, 100)
t.forward(180)
t.arc(180,100)

t.jump([100,100])
t.right(180)
t.forward(180)


// glasses
t.jump([5, 80])
t.arc(360, 40)
t.jump([8,80])
t.arc(360,35)

t.jump([-80,80])
t.arc(360, 40)
t.jump([-78,80])
t.arc(360,35)

//glasses straps
t.jump([100,100])
t.right(90)
t.forward(20)

t.jump([100,60])
t.forward(20)

t.jump([-100,100])
t.right(180)
t.forward(25)

t.jump([-100,60])
t.forward(25)

// overalls
t.jump([50, -30])
t.right(90)
t.forward(100)
t.right(90)
t.forward(100)
t.right(90)
t.forward(100)

// left strap
t.jump([50, -30])
t.right(90)
t.forward(50)
t.right(90)
t.forward(10)
t.right(90)
t.forward(50)

// right strap
t.jump([-50, -30])
t.forward(50)
t.right(270)
t.forward(10)
t.right(270)
t.forward(50)

//mouth
t.jump([-45, 20])
t.right(90)
t.arc(180, 50)
t.right(270)
t.forward(100)

//arms
t.jump([100,10])
t.right(120)
t.forward(60)
t.jump([100,-30])
t.forward(120)
t.arc(360,20)

t.jump([-130,100])
t.right(120)
t.forward(70)
t.jump([-100,-10])
t.right(180)
t.forward(120)
t.right(180)
t.arc(360,20)

// //random flower
// for(let i = 1;i<=10;i++)
// {
//   t.jump([100,130+ (i *2)])
//   t.arc(280,20)
  
// }

// //random hat
// t.jump([10,270])
// t.forward(100)
// t.jump([-20,270])
// t.right(60)
// t.forward(110)

// for(let i = 1;i<=10;i++)
// {
//   t.jump([10,270+ (i *2)])
//   t.arc(280,20)
  
// }


drawLines(t.lines());