const t = createTurtle();

for(let i = 0; i < 72; i++) {
    t.forward(5);
    t.left(85  + rand() * 5);
}

drawTurtles(t);