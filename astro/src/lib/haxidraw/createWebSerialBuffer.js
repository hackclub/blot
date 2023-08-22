export async function createWebSerialBuffer(port, baudrate = 115200) {
  const buffer = []

  await port.open({ baudRate: baudrate })

  let reader = null
  let writer = null

  async function stuffBuffer() {
    try {
      while (port.readable) {
        reader = port.readable.getReader()

        while (true) {
          const { value, done } = await reader.read()

          if (value) {
            for (let i = 0; i < value.length; i++) {
              buffer.push(value[i])
            }
          }

          if (done) {
            reader.releaseLock()
            reader = null
            break
          }
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      // await port.close();
    }
  }

  stuffBuffer()

  async function write(msg) {
    writer = port.writable.getWriter()
    await writer.write(msg)
    writer.releaseLock()
    writer = null
  }

  return {
    write,
    read: () => (buffer.length > 0 ? buffer.shift() : null),
    available: () => buffer.length > 0,
    close: async () => {
      if (reader) {
        reader.releaseLock()
      }

      if (writer) {
        writer.releaseLock()
      }

      await port.close()

      return
    }
  }
}
