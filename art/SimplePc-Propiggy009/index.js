/*
@title: Simple Pc
@author: SashtivelV 
@snapshot:Snapshot3.png
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
t.jump([41.9,34.1])
t.forward(1.5);

t.jump([42,59])
t.forward(1.5);

t.jump([79.2,72.7])
t.forward(1.8)

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
//I figured out loops :)
t.jump([52.7,14.4])
t.right(118)
for (let i = 0; i < 11; i++) {
  t.forward(2)
  t.up()
  t.forward(2)
  t.down()
}
t.jump([57.0,12.7])
for (let i = 0; i < 11; i++) {
  t.forward(2)
  t.up()
  t.forward(2)
  t.down()
}
t.jump([60.6,10.7])
for (let i = 0; i < 11; i++) {
  t.forward(2)
  t.up()
  t.forward(2)
  t.down()
}


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
t.goTo([116.8,38.6])
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
t.jump([80.5,31])
t.forward(8) 
t.left(91)
t.jump([87.9,34.0])
t.forward(12.8) 

//Computer fans
function fan(x,y) {
  t.jump([x,y])
  t.arc(399,5)
  for (let i = 0; i < 25; i++) {
  t.jump([x+-4.5,y-2])
  t.arc(47,6)
  //acc device-->
  t.right(120.56)
  }
}
fan(23,42)
fan(23,31)
fan(23,53)
//on button
  t.jump([32,50])
  t.right(261)
  t.arc(300,2)
  t.jump([33,49])
  t.right(61)
  t.forward(2)
  t.left(23)
// ---screen prompts--- 1,2,3
//Iconssss
function Icon() {
  t.right(728)
  t.forward(1.5)
  t.right(80)
  t.forward(1.6)
  t.right(80)
  t.forward(1.5)
  t.right(100)
  t.forward(2.1)
  t.right(92.0)
}
function Player() {
  t.right(456)
  t.forward(5)
  t.right(105)
  t.forward(3)
  t.right(73)
  t.forward(5)
  t.right(107)
  t.forward(3)
  t.right(183)
}
const randomNumber = Math.ceil(Math.random() * 3)
  if (randomNumber === 1) {
    //Error screen
  t.jump([47.0, 53.7])
  t.arc(421,-0.1)

  t.jump([47.0, 49.6])
  t.arc(421,0.1)

  t.jump([50.3, 47.9])
  t.right(109)
  t.arc(-66,6.5)

  t.jump([47.0, 43.0])
  t.right(41)
  t.forward(29)
  t.right(90)
  t.up()
  t.forward(4)
  t.right(90)
  t.down()
  t.forward(29)
  }
//Home Screen
  if (randomNumber === 2) {
  t.jump([43.1, 35.2])
  t.right(93)
  t.forward(40.1)

  t.jump([76.0, 51.6])
  t.right(205)
  t.forward(8.2)
  t.right(80)
  t.forward(7.4)
  t.right(80)
  t.forward(8.2)
  t.right(100)
  t.forward(10.1)
  t.jump([71.4, 51.9])
  t.right(183)
  t.forward(9.0)
  t.jump([67.4, 56.1])
  t.right(90)
  t.forward(8.3)
//icons
  t.jump([45.6, 56])
  Icon()
  t.jump([45.6, 53])
  Icon()
  t.jump([45.6, 50])
  Icon()
  t.jump([45.6, 47])
  Icon()
  t.jump([45.5, 44])
  Icon()

  t.jump([48.5, 56])
  Icon()
  t.jump([48.6, 53])
  Icon()
  t.jump([48.5, 50])
  Icon()
    
}
//youtube
  if (randomNumber === 3) {
  t.jump([45.2, 57.1])
  t.right(456)
  t.forward(18.2)
  t.right(105)
  t.forward(12.3)
  t.right(73)
  t.forward(18.2)
  t.right(107)
  t.forward(12.6)
  t.right(189)

  t.jump([69.4, 63.0])
  t.right(154)
  Player()
  t.jump([69.7, 58.1])
  t.right(154)
  Player()
  t.jump([70.2, 53.5])
  t.right(154)
  Player()
  t.jump([70.5, 48.4])
  t.right(154)
  Player()

  t.jump([46.1, 41.3])
  t.right(252)
  t.forward(18.2)

  t.jump([52.7, 51.0])
  t.right(286)
  t.forward(4)
  t.right(119)
  t.forward(4)
  t.right(121)
  t.forward(4)
  t.right(130)
  }
//end
// add t to final lines
bt.join(finalLines, t.lines());

// draw it
drawLines(finalLines);
