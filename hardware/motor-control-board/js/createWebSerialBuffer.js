export async function createWebSerialBuffer(port, baudrate = 115200) {

    const buffer = [];
  
    await port.open({ baudRate: baudrate });
  
    async function stuffBuffer() {
      try  {
        while (port.readable) {
          const reader = port.readable.getReader();
  
          while (true) {
            const { value, done } = await reader.read();
  
            if (value) {
              for (let i = 0; i < value.length; i++) {
                buffer.push(value[i]);
              }
            }
  
            if (done) {
              reader.releaseLock();
              break;
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        await port.close();
      }
    }
  
    stuffBuffer();
  
    async function write(msg) {
      const writer = port.writable.getWriter();
      await writer.write(msg);
      writer.releaseLock();
    }
  
    return {
      write,
      read: () => buffer.length > 0 ? buffer.shift() : null,
      available: () => buffer.length > 0,
      close() {
        // TODO: close port
      }
    }
  }  