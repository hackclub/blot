const t = new Turtle()
for (let i = 0; i < +452; i++) {
  t.goto(i / 10, Math.sin(i * 0.26))
}

t.translate([0, 3])

drawTurtles(t)
