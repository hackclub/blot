import { floatsToBytes, intsToBytes } from './comms/converters'
import { WebSerialPort, createWebSerialPort } from './comms/webSerialPort'
import type { Point } from './types.ts'

export class Haxidraw {
  port: WebSerialPort = null!
  rawPort: SerialPort = null!

  constructor() {}

  async init(rawPort: SerialPort) {
    this.port = await createWebSerialPort(rawPort)
    this.rawPort = rawPort
  }

  async servo(angle: number) {
    await this.port.send('servo', intsToBytes([angle]))
  }

  async goTo(...point: Point) {
    await this.port.send('go', floatsToBytes(point))
  }

  close() {
    return this.port.close()
  }
}

export async function createHaxidraw(rawPort: SerialPort) {
  const haxidraw = new Haxidraw()
  await haxidraw.init(rawPort)
  return haxidraw
}
