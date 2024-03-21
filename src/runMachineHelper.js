const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function runMachineHelper(haxidraw, turtles, cancelled=false) {
  await haxidraw.servo(1000)
  await delay(200)
  const polylines = turtles.map(x => x.path).flat()
  for (const polyline of polylines) {
    for (let i = 0; i < polyline.length; i++) {
      if (cancelled) {
        await haxidraw.servo(1000)
        await delay(200)
        await haxidraw.goTo(0, 0)
        return
      }

      const [x, y] = polyline[i]
      if (i === 0) {
        await haxidraw.servo(1000)
        await delay(200)
      } else if (i === 1) {
        await haxidraw.servo(1700)
        await delay(100)
      }

      await haxidraw.goTo(x, y)
    }
  }

  await haxidraw.servo(1000)
  await delay(200)
  await haxidraw.goTo(0, 0)
}