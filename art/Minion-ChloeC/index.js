/*
@title: Minion
@author: Chloe
@snapshot: snapshot0.png
*/

// welcome to bot!
const t = new bt.Turtle();
const height = 500;
const width = 500;
const len = 180;
const r = 100;
const glasses = 40;
const band = 20;
const clothes = 100;
const strap = 50;
const arm = 60;
const flower = false;
const hat = false;

setDocDimensions(height,width);


//head and body
t.jump([100, 100])

t.right(270)

t.arc(180, r)
t.forward(len - 60)
t.forward(60);
t.arc(180,r)

t.jump([100,100])
t.right(180)
t.forward(len)

drawLines(t.lines(), { fill: "yellow" });

// glasses
t.jump([5, 80])
t.arc(360, glasses)
t.jump([8,80])
t.arc(360,glasses - 5)

t.jump([-80,80])
t.arc(360, glasses)
t.jump([-78,80])
t.arc(360,glasses - 5)

//glasses straps
t.jump([100,100])
t.right(90)
t.forward(band)

t.jump([100,60])
t.forward(band)

t.jump([-100,100])
t.right(180)
t.forward(band + 5)

t.jump([-100,60])
t.forward(band + 5)

// overalls
t.jump([50, -30])
t.right(90)
t.forward(clothes / 3)
t.right(90)
t.forward(clothes)
t.right(90)
t.forward(clothes / 3)

// left strap
t.jump([50, -30])
t.right(90)
t.forward(strap)
t.right(90)
t.forward(strap / 5)
t.right(90)
t.forward(strap)

// right strap
t.jump([-50, -30])
t.forward(strap)
t.right(270)
t.forward(strap / 5)
t.right(270)
t.forward(strap)

//mouth
t.jump([-45, 20])
t.right(90)
t.arc(180, 50)
t.right(270)
t.forward(100)

//arms
t.jump([100,10])
t.right(120)
t.forward(arm)
t.jump([100,-30])
t.forward(arm + 60)
t.arc(360,20)

t.jump([-130,100])
t.right(120)
t.forward(arm)
t.jump([-100,-10])
t.right(180)
t.forward(arm + 60)
t.right(180)
t.arc(360,20)

if (flower)
{
  for(let i = 1;i<=10;i++)
  {
  t.jump([100,130+ (i *2)])
  t.arc(280,20)

  }  
}
else if (hat)
{
  t.jump([10,270])
  t.forward(100)
  t.jump([-20,270])
  t.right(60)
  t.forward(110)

  for(let i = 1;i<=10;i++)
  {
    t.jump([10,270+ (i *2)])
    t.arc(280,20)

  }
}
drawLines(t.lines());