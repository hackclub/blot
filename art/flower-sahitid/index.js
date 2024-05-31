/*
@title: flower
@author: sahitid
@snapshot: 1.png
*/

const t = new bt.Turtle();

function drawPetal() {
  t.forward(18);
  t.arc(186, 10);
  t.forward(25);
  t.arc(180, 10);  
}

function drawFlower() {
  t.jump([50,50]); 
  for (let i = 0; i < 8; i++) {
    drawPetal();
    t.right(360 / 7);
  }
}

function drawStem() {
  t.jump([50, 50]); 
  for (let i = 0; i < 3; i++) {
    t.goTo([50 - i * 3, 45]);
    t.up();
    t.goTo([50 - i * 3, 0]);
    t.down();
  }
}

t.jump([0, 0]);

drawFlower();
drawStem();
drawLines(t.lines());
