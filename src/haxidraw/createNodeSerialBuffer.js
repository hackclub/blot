export async function createNodeSerialBuffer(port) {
  let buffer = []
  port.open()
  port.on('data', (data) => {
    for (let i=0; i<data.length; i++) {
      buffer.push(data[i])
    }
  })

  return {
    write: msg => port.write(msg),
    read: () => (buffer.length > 0 ? buffer.shift() : null),
    available: () => buffer.length > 0,
    close: () => port.close()
  }
}
