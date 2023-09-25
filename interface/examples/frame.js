const frame = createTurtle()

for (let i = 0; i < 2; i++) {
  frame.forward(127)
  frame.right(90)
  frame.forward(127)
  frame.right(90)
}

drawTurtles(frame)
