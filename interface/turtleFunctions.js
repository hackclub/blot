export function draw(turtle, [scaleX, scaleY], limits = null) {
  if (limits) {
    panZoom.setScaleXY(limits)
  }
}

export async function runMachine(turtle, [scaleX, scaleY]) {
  for (const polyline of turtle.path) {
    for (let i = 0; i < polyline.length; i++) {
      const { x, y } = polyline[i]
      if (i === 0) await penUp()
      else if (i === 1) await penDown()

      await goTo(x * scaleX, y * scaleY)
    }
  }

  await penUp()
}
