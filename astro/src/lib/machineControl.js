import { createHaxidraw } from './haxidraw/createHaxidraw.js'
import { createListener } from './createListener.js'
import runCode from '../lib/run.ts'

import { getStore, patchStore } from '../lib/state.ts'

export function initMachineControl() {
  let haxidraw

  const listener = createListener(document.body)

  listener('click', '.connect-trigger', async () => {
    if (!navigator.serial) {
      alert(
        "Your browser doesn't seem to support the Web Serial API," +
          'which is required for the Haxidraw editor to connect to the machine.' +
          'Chrome Version 89 or above is the recommended browser.'
      )
    }
    if (!haxidraw) {
      // connect
      navigator.serial
        .requestPort({ filters: [] })
        .then(async port => {
          console.log('connecting')
          haxidraw = await createHaxidraw(port)

          console.log(haxidraw)
          patchStore({ connected: true })
        })
        .catch(e => {
          // The user didn't select a port.
        })
    } else {
      // disconnect
      console.log('disconnecting')
      await haxidraw.port.close()
      haxidraw = null
      patchStore({ connected: false })
    }
  })

  listener('click', '.run-machine-trigger', () => {
    const { turtles } = getStore()
    const runMachine = () => runMachineHelper(haxidraw, turtles)

    runCode().then(() => {
      if (!haxidraw) {
        console.log('not connected')
        return
      }
      runMachine()
    })
  })

  async function automaticallyConnect() {
    const ports = await navigator.serial.getPorts()

    ports.forEach(async port => {
      const info = port.getInfo()

      if (info.usbVendorId === 11914) {
        haxidraw = await createHaxidraw(port)
        console.log(haxidraw)
        patchStore({ connected: true })
      }
    })
  }

  automaticallyConnect()
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function runMachineHelper(haxidraw, turtles) {
  await haxidraw.servo(1000)
  await delay(200)
  const polylines = turtles.map(x => x.path).flat()
  for (const polyline of polylines) {
    for (let i = 0; i < polyline.length; i++) {
      const [x, y] = polyline[i]
      if (i === 0) {
        await haxidraw.servo(1000)
        await delay(200)
      } else if (i === 1) {
        await haxidraw.servo(1700)
        await delay(100)
      }

      await haxidraw.goto(x, y)
    }
  }

  await haxidraw.servo(1000)
  await delay(200)
  await haxidraw.goto(0, 0)
}
