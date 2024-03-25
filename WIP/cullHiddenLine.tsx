function cullHiddenLines(e) {
  const { turtles } = getStore()
  const { isVisible } = createMask()

  // const newTurtle = new Turtle();
  // let lastVisible = false;

  // turtles.forEach(turtle => {
  //   turtle
  //   .resample(0.1)
  //   .path.forEach(pl => {
  //     pl.forEach((pt, i) => {
  //       const [x, y] = pt;
  //       const visible = isVisible(x, y);

  //       if (lastVisible && i > 0 && visible) newTurtle.goTo([x, y]);
  //       else newTurtle.jump([x, y]);
  //       lastVisible = visible;
  //     })
  //   })
  // })

  // newTurtle.simplify(.01);
  // newTurtle.style.fill ="none";
  // newTurtle.style.stroke = "black";

  // patchStore({
  //   turtles: [newTurtle]
  // })

  turtles.forEach(turtle => {
    turtle.resample(0.01).iteratePath(([x, y], t) => {
      const visible = isVisible(x, y)

      if (!visible) return 'BREAK'
    })

    // turtle.simplify(0.01);
    turtle.style.fill = 'none'
  })

  patchStore({ turtles })
}