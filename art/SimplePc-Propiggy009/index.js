/*
@title: Simple Pc
@author: SashtivelV 
@snapshot: The finished product as thumbnail
*/

const width = 150;
const height = 80;

setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();


//start PC
t.jump([10, 65])


//top casing
t.left(90);

t.right(120);
t.forward(20);

t.left(50);
t.forward(12);

t.left(130);
t.forward(20);

t.left(50);
t.forward(12);
t.left(70)

//wall casing
t.jump([10, 65])
t.forward(40);

t.jump([27.3, 55])
t.forward(40);

t.jump([38.6, 59.1])
t.forward(40);

//bottom casing

t.up()
t.right(120);
t.forward(20);

t.left(50);
t.forward(12);

t.down()
t.left(130);
t.forward(20);

t.left(50);
t.forward(12);
t.left(70)

// computer screen
t.jump([43,58])

t.right(70)
t.forward(40);

t.right(110)
t.forward(25);

t.right(70)
t.forward(40);

t.right(110)
t.forward(25);

//computer screen the back part
t.jump([42,59])

t.right(70)
t.forward(40);

t.up()
t.right(110)
t.forward(25);

t.right(70)
t.forward(40);

t.down()
t.right(110)
t.forward(25);
t.right(127)
//connecters
t.jump([41.4,34.2])
t.forward(2);

t.jump([41,60])
t.forward(2);

t.jump([78.9,73.0])
t.forward(2)

//screen stands
t.jump([57,38])
t.right(52)
t.forward(8);

t.jump([66,41])
t.forward(8);

t.jump([69,33])
t.right(103)
t.forward(15)
t.right(240)
t.forward(10)
t.left(102)
t.forward(13)



//keyboard
t.jump([49,15])

t.right(5)
t.forward(50)
t.right(54)
t.forward(20)
t.right(124)
t.forward(53)
t.right(65)
t.forward(20)

//keys
t.jump([52.6,14.4])
t.right(117)

//I dont know loops so thats a lot of lines:(
//go to line 290 to end
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()

t.jump([55.7,12.5])

t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()

t.jump([59.5,10.9])

t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()
t.forward(2)
t.up()
t.forward(2)
t.down()

t.jump([67.7,10.4])
t.right(14)
t.arc(28, 58)

//mouse
t.jump([117.1,38.7])
t.right(273)
t.arc(56, 11)

t.jump([120.7,42.0])
t.right(57)
t.arc(56, 11)

t.goTo([107.4,42.9])
t.jump([120.7,42])
t.goTo([116.8,38.7])
t.goTo([107.4,42.9])

t.jump([114.7,43.7])
t.right(32)
t.arc(29, 10)

//speakers
//left speaker
t.jump([48,20])
t.right(13)
t.forward(8) 
t.right(97)    
t.forward(11)
t.right(141)
t.forward(6)
t.forward(7)
t.right(120)
t.right(148)

t.jump([44.4,32.3])
t.forward(7.5) 

t.jump([48.1,20])
t.forward(8) 

t.left(90)
t.forward(12.6) 

//right speaker
t.jump([80.1,31.1])
t.right(-60)
t.forward(8) 
t.right(97)    
t.forward(11)
t.right(141)
t.forward(13)
t.right(120)
t.right(148)

t.jump([75.7,42.9])
t.forward(7.5) 

t.jump([80.3,31])
t.forward(8) 

t.left(90)
t.forward(12.8) 

// add turtle to final lines
bt.join(finalLines, t.lines());

// draw it
drawLines(finalLines);