import { createHaxidraw } from '../haxidraw/createHaxidraw.js'
import { createWebSerialBuffer } from "../haxidraw/createWebSerialBuffer.js";
import { createListener } from '../createListener.js'
import { getStore, patchStore } from '../state.ts'
import { runMachineHelper } from '../runMachineHelper.js'

let cancelled = { ref: false };

export function addMachineControl() {
  let haxidraw

  const listener = createListener(document.body)

  listener('click', '[data-evt-connectTrigger]', async () => {
    if (!navigator.serial) {
      alert(
        "Your browser doesn't seem to support the Web Serial API, which is required for the Blot editor to connect to the machine. Chrome Version 89 or above is the recommended browser."
      )
    }
    if (!haxidraw) {
      // connect
      navigator.serial
        .requestPort({ filters: [] })
        .then(async port => {
          console.log('connecting')
          const comsBuffer = await createWebSerialBuffer(port);
          haxidraw = await createHaxidraw(comsBuffer)

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

  listener('click', '[data-evt-machineTrigger]', e => {
    const { turtles } = getStore()
    const runMachine = () => runMachineHelper(haxidraw, turtles, cancelled)

    if (!haxidraw) {
      console.log('not connected')
      return
    }

    if (e.target.innerText.toLowerCase().includes('stop')) {
      cancelled.ref = true
      patchStore({ machineRunning: false })
      console.log('cancelled')
      return
    }

    runMachine().then(() => {
      patchStore({ machineRunning: false })
      cancelled.ref = false
    })

    patchStore({ machineRunning: true })
  })

  listener('click', '[data-evt-penUp]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.servo(1000)
  })

  listener('click', '[data-evt-penDown]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.servo(1700)
  })

  listener('click', '[data-evt-motorsOn]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.port.send('motorsOn')
  })

  listener('click', '[data-evt-motorsOff]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.port.send('motorsOff')
  })

  listener('click', '[data-evt-setOrigin]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.port.send('setOrigin')
  })

  listener('click', '[data-evt-moveTowardsOrigin]', () => {
    if (!haxidraw) {
      console.log('not connected')
      return
    }

    haxidraw.port.send('moveTowardsOrigin')
  })

  async function automaticallyConnect() {
    const ports = await navigator.serial.getPorts()

    ports.forEach(async port => {
      const info = port.getInfo()

      if (info.usbVendorId === 11914) {
        const comsBuffer = await createWebSerialBuffer(port);
        haxidraw = await createHaxidraw(comsBuffer)
        console.log(haxidraw)
        patchStore({ connected: true })
      }
    })
  }

  automaticallyConnect()
}

