import { createWebSerialPort } from "./createWebSerialPort.js";
import { floatsToBytes, uint16ToBytes, intsToBytes } from "./converters.js";

export async function createHaxidraw(rawPort) {
  const port = await createWebSerialPort(rawPort);

  async function goto(x, y) {
    const bytes = floatsToBytes([ x, y ]);
    await port.send("go", bytes);
  }

  // async function setAccel(val) {
  //   const bytes = floatsToBytes([ val ]);    
  //   await port.send("accel", bytes);
  // }

  // async function setMaxSpeed(val) {
  //   const bytes = floatsToBytes([ val ]);
  //   await port.send("speed", bytes);
  // }

  async function servo(angle) {
    const bytes = intsToBytes([ angle ]);
    await port.send("servo", bytes);
  }

  return {
    port,
    goto,
    // setAccel,
    // setMaxSpeed,
    servo
  }
}

