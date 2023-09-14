const t = new Turtle()
for (let i = 0; i < +57; i++) {
  if (i % 2 === 0) t.up()
  else t.down()
  t.forward(i / 5)
  t.right(90)
}

drawTurtles(t)

// runMachine();
