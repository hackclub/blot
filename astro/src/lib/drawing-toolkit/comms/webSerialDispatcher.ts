export class WebSerialDispatcher {
  #port: SerialPort
  #baudRate: number
  #handler: (msg: Uint8Array) => any
  #reader: ReadableStreamDefaultReader<Uint8Array> | null = null
  #keepReading = true
  #loopPromise: Promise<void> | null = null

  constructor(
    port: SerialPort,
    handler: (msg: Uint8Array) => any,
    baudRate: number = 115200
  ) {
    this.#port = port
    this.#baudRate = baudRate
    this.#handler = handler
  }

  async init() {
    await this.#port.open({ baudRate: this.#baudRate })

    this.#loopPromise = this.#loop()
  }

  async #loop() {
    while (this.#port.readable && this.#keepReading) {
      this.#reader = this.#port.readable.getReader()
      console.log('reader lock')
      try {
        let value: Uint8Array | undefined, done: boolean
        do {
          ;({ value, done } = await this.#reader.read())
          console.log(done)
          if (value) this.#handler(value)
        } while (!done)
      } finally {
        this.#reader.releaseLock()
        console.log('reader unlock')
      }
    }
  }

  async write(msg: Uint8Array) {
    const writer = this.#port.writable?.getWriter()
    console.log('writer lock')
    if (!writer) throw new Error('Port is not writable')
    try {
      await writer.write(msg)
    } finally {
      writer.releaseLock()
      console.log('writer unlock')
    }
  }

  async close() {
    this.#keepReading = false
    this.#reader?.cancel()
    await this.#loopPromise
    await this.#port.close()
  }
}

export async function createWebSerialDispatcher(
  port: SerialPort,
  handler: (msg: Uint8Array) => any,
  baudRate?: number
) {
  const buffer = new WebSerialDispatcher(port, handler, baudRate)
  await buffer.init()
  return buffer
}
