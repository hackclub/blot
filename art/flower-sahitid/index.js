const t = createTurtle();

function drawPetal() {
  t.forward(10);
  t.arc(180, 10);
  t.forward(25);
  t.arc(180, 10);
}

function drawFlower() {
  t.jump([50,50]); 
  for (let i = 0; i < 7; i++) {
    drawPetal();
    t.right(360 / 7);
  }
}

function drawStem() {
  t.jump([50,50]); 
  t.down();
  t.goTo([50,0]); 
}

t.jump([0, 0]);

drawFlower();
drawStem();
drawTurtles([t]);

