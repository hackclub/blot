export async function createNodeSerialBuffer(port, baudrate = 115200) {
  const buffer = []

  return {
    write,
    read: () => (buffer.length > 0 ? buffer.shift() : null),
    available: () => buffer.length > 0,
    close: async () => {

    }
}