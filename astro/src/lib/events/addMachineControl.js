import { createBlot } from '../blot/createBlot'
import { createListener } from '../createListener.js'
import runCode from '../run.ts'
import { getStore, patchStore } from '../state.ts'

export function addMachineControl() {
  let blot

  const listener = createListener(document.body)

  listener('click', '.connect-trigger', async () => {
    if (!navigator.serial) {
      alert(
        "Your browser doesn't seem to support the Web Serial API, which is required for the Blot editor to connect to the machine. Chrome Version 89 or above is the recommended browser."
      )
    }
    if (!blot) {
      // connect
      navigator.serial
        .requestPort({ filters: [] })
        .then(async port => {
          blot = await createBlot(port)
          patchStore({ connected: true })
        })
        .catch(e => {
          // The user didn't select a port.
        })
    } else {
      // disconnect
      console.log('disconnecting')
      await blot.port.close()
      blot = null
      patchStore({ connected: false })
    }
  })

  listener('click', '.run-machine-trigger', () => {
    const { turtles } = getStore()
    const runMachine = () => runMachineHelper(blot, turtles)

    runCode().then(() => {
      if (!blot) {
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
        blot = await createBlot(port)
        patchStore({ connected: true })
      }
    })
  }

  automaticallyConnect()
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export async function runMachineHelper(blot, turtles) {
  await blot.servo(1000)
  await delay(200)
  const polylines = turtles.map(x => x.path).flat()
  for (const polyline of polylines) {
    for (let i = 0; i < polyline.length; i++) {
      const [x, y] = polyline[i]
      if (i === 0) {
        await blot.servo(1000)
        await delay(200)
      } else if (i === 1) {
        await blot.servo(1700)
        await delay(100)
      }

      await blot.goTo(x, y)
    }
  }

  await blot.servo(1000)
  await delay(200)
  await blot.goTo(0, 0)
}
