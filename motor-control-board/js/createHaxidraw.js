import { createWebSerialBuffer } from "./createWebSerialBuffer.js";
import { floatsToBytes, uint16ToBytes } from "./converters.js";

export async function createHaxidraw(rawPort) {
  const port = await createWebSerialBuffer(rawPort);

  async function moveTo(x, y) {
    const bytes = floatsToBytes([ x, y ]);
    
    const msg = new Uint8Array(10);

    msg[0] = 0x00;
    bytes.forEach((byte, i) => {
      msg[i + 1] = byte;
    })
    msg[bytes.length + 1] = 0x0A;

    await port.write(msg);
  }

  async function setAccel(val) {
    const msg = new Uint8Array(6);
    const bytes = floatsToBytes([ val ]);
    
    msg[0] = 0x01;
    bytes.forEach((byte, i) => {
      msg[i + 1] = byte;
    })
    msg[bytes.length + 1] = 0x0A;

    await port.write(msg);
  }

  async function setMaxSpeed(val) {
    const msg = new Uint8Array(6);
    const bytes = floatsToBytes([ val ]);
    
    msg[0] = 0x02;
    bytes.forEach((byte, i) => {
      msg[i + 1] = byte;
    })
    msg[bytes.length + 1] = 0x0A;

    await port.write(msg);
  }

  async function servo(microseconds) {
    const msg = new Uint8Array(4);
    const bytes = uint16ToBytes([ microseconds ]);

    msg[0] = 0x03;
    bytes.forEach((byte, i) => {
      msg[i + 1] = byte;
    })
    msg[bytes.length + 1] = 0x0A;
    
    await port.write(msg);
  }

  return {
    port,
    moveTo,
    setAccel,
    setMaxSpeed,
    servo
  }
}

