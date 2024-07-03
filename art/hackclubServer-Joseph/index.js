/*
@title: hackclubServer
@author: Joseph Dang
@snapshot: snapshots/1.png
*/
const width = 125;
const height = 120;
const linesss = 55;
const finalLines = [];
const size = 5;
const warn = 10;
setDocDimensions(width, height);

const t = new bt.Turtle();


// server
t.jump([10, 65])

//top and bottom pannel
t.left(447);

t.right(118);
t.forward(19);
t.forward(0);
t.right(0);

t.left(49);
t.forward(2);

t.left(-358);
t.forward(-1);

t.left(0);
t.forward(57);
t.left(69)

//pannels
t.jump([10, 65])
t.forward(31);

t.jump([26.5, 55])
t.forward(39);

t.jump([38.6, 59.6])
t.forward(36.5);

t.jump([80.2, 74.6])
t.forward(29);

t.jump([54.9, 75.5])
t.forward(26);

t.left(98);
t.forward(45);

t.left(167);
t.forward(17);

t.left(375);
t.forward(54);

t.left(534);
t.forward(28);

t.jump([10.4, 65])

t.left(190)
t.forward(46)

t.jump([54.9, 76])

t.left(343)
t.forward(26)


function fan(x, y) {
  t.jump([x, y])
  t.arc(708, 5)
  for (let i = -106; i < -2; i++) {
    t.jump([x + -0.1, y + 5])
    t.arc(47, 6)
    t.right(122.71)
  }
}

function fan2(x, y) {
  t.jump([x, y])
  t.arc(709, 5)
  for (let i = -106; i < -2; i++) {
    t.jump([x + -2.6, y + 4])
    t.arc(47, 6)
    t.right(122.74)
  }
}

fan(19, 69)
fan2(22, 82)
//power button
t.jump([24, 61])
t.right(382)
t.arc(379, 2)
t.jump([57, 49])
t.right(66)
t.left(26)


t.jump([102, 20]);

t.left(521)
t.forward(51);

t.left(-92)
t.forward(33);

t.left(271)
t.forward(51);

t.right(91)
t.forward(32);





//hack club logo!

t.jump([70, 20]);
t.left(1);
t.forward(13);
t.right(270);
t.forward(13);
t.left(92);
t.forward(13);

t.jump([45, 76]);
t.left(-2);
t.forward(13);

t.jump([45, 82]);
t.left(-77);
t.forward(5);
t.right(102);
t.forward(5);
t.forward(-12);

t.jump([58, 79]);
t.left(-1);
t.forward(-12);
t.left(454);
t.forward(5);

t.jump([58, 79]);
t.left(-1);
t.forward(5)


const randomNumber = Math.ceil(Math.random() * 3)
if (randomNumber === 1) {
  //bios screen


  t.jump([54, 42]);


  t.forward(size)
  t.left(122)
  t.forward(size)
  t.left(120)
  t.forward(size)

  t.jump([61, 47]);
  t.forward(size)
  t.left(116)
  t.forward(size)
  t.left(123)
  t.forward(size)

  t.jump([61, 46]);
  t.forward(size)
  t.left(116)
  t.forward(size)
  t.left(123)
  t.forward(size)


  t.jump([53.8, 37.8])
  t.right(3)
  t.forward(14)
  t.right(90)
  t.up()
  t.forward(4)
  t.right(90)
  t.down()
  t.forward(14)


  t.jump([82.6, 26.4])
  t.right(-1)
  t.forward(29)
  t.right(90)
  t.up()
  t.forward(4)
  t.right(90)
  t.down()
  t.forward(29)
}
if (randomNumber == 2) {
  t.jump([75, 31])
  t.right(375)
  t.arc(385, 4)
  t.jump([70, 32])
  t.right(360)
  t.arc(360, 2)
  t.jump([79, 28])
  t.right(360)
  t.arc(360, 2)
  t.jump([79, 38])
  t.right(360)
  t.arc(360, 2)
  t.jump([58, 50])
  t.right(103)
  t.forward(8)
  t.right(-91)
  t.forward(3)
  t.left(89)
  t.forward(8)
  t.jump([63, 50])
  t.right(180)
  t.forward(8)
  t.right(-113)
  t.forward(3)
  t.right(-68)
  t.forward(5)
  t.right(-52)
  t.forward(3)
}
if (randomNumber == 3) {
  t.jump([57.0, 28.9])
  t.right(16)
  t.arc(37, 36)
  t.jump([75.0, 33.0])
  t.right(218)
  t.arc(32, 39)
  t.jump([78.0, 28.5])
  t.right(218)
  t.arc(32, 39)
  t.jump([75.6, 33.4])
  t.right(384)
  t.arc(32, 39)




  t.jump([71, 39]);
  t.left(-19)
  t.forward(warn)
  t.left(120)
  t.forward(warn)
  t.left(122)
  t.forward(warn)
  t.jump([76, 46])
  t.left(28)
  t.forward(4)
  t.jump([76, 46])
  t.left(2)
  t.forward(4)
  t.jump([76, 46])
  t.left(1)
  t.forward(4)
  t.jump([75.3, 40.5])
  t.left(5)
  t.arc(376, .9)

  t.jump([24.0, 107.2])
  t.right(399)
  t.arc(32, 10)
  t.jump([24.0, 107.2])
  t.right(552)
  t.arc(32, 10)

  t.jump([30.9, 107.2])
  t.right(399)
  t.arc(32, 10)
  t.jump([30.9, 107.2])
  t.right(565)
  t.arc(32, 10)



  t.jump([39.8, 108.4])
  t.right(399)
  t.arc(36, 11)
  t.jump([40.0, 107.2])
  t.right(565)
  t.arc(32, 10)

  t.jump([50.1, 108.2])
  t.right(399)
  t.arc(36, 10)
  t.jump([50.0, 108.5])
  t.right(565)
  t.arc(32, 10)
}





bt.join(finalLines, t.lines());



// draw it
drawLines(finalLines);
