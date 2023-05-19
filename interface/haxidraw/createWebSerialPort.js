import { createWebSerialBuffer } from "./createWebSerialBuffer.js";
import * as cobs from "./cobs.js";

// const TERMINATOR = 0x0A;

export async function createWebSerialPort(rawPort) {
  const buffer = await createWebSerialBuffer(rawPort);

  const msgHandlers = {};
  const msgPromises = {};
  let msgCount = 0;

  setInterval(() => {
    let msg = [];
    while(buffer.available()) {
      const byte = buffer.read();
      msg.push(byte);
      
      if (byte === 0) { // using cobs

        // what's msg structure
        // length msg 1 | msg ... | length payload 1 | payload ... | promiseIndex 1
        
        console.log(msg);

        const data = unpack(msg);

        console.log(data);

        if (data.msg === "ack") {
          const resolver = msgPromises[data.msgCount];
          resolver(data.payload);
          console.log("resolved", data.msgCount);
        } else if (data.msg in msgHandlers) {
          msgHandlers[data.msg](data.payload);
          const ackBuffer = pack("ack", new Uint8Array(0), data.msgCount);
          buffer.write(ackBuffer);
        } else {
          const msgString = String.fromCharCode.apply(null, msg);
          console.log("unknown msg:", { msg, msgString });
        }

        msg = [];
      }
    }
  }, 0);

  function on(msg, func) {
    msgHandlers[msg] = func;
  }

  function send(msg, payload) {
    console.log("sending", { msg, payload, msgCount });

    const packedMsg = pack(msg, payload, msgCount);
    const promise = new Promise((resolve, reject) => {
      msgPromises[msgCount] = resolve;
    })

    msgCount = (msgCount + 1) % 255;

    buffer.write(packedMsg);

    // console.log("sending", packedMsg);

    return promise;
  }

  async function close() {
    await buffer.close();

    return;
  }

  return {
    on,
    send,
    close
  }

}

function pack(msg, payload, msgCount) {
  // const length = 1+msg.length+1+payload.length+1+1;
  const buffer = [];

  if (msg.length > 255) console.error("msg too long");
  buffer.push(msg.length);
  msg.split("").forEach(char => buffer.push(char.charCodeAt(0)));
  if (msg.length > 255) console.error("payload too long");
  buffer.push(payload.length);
  payload.forEach(byte => buffer.push(byte));
  buffer.push(msgCount);
  // buffer.push(TERMINATOR);

  // return new Uint8Array(buffer);
  return cobs.encode(buffer);
}

function unpack(bytes) {
  bytes = cobs.decode(bytes);

  // skip the length byte
  let i = 0;
  const msgLength = bytes[i++];
  const msgBytes = [];
  while (i < 1 + msgLength) {
    msgBytes.push(bytes[i]);

    i++;
  }

  const payloadLength = bytes[i++];
  const payloadBytes = [];
  while (i < 1 + msgLength + 1 + payloadLength) {
    payloadBytes.push(bytes[i]);

    i++;
  }

  const msgCount = bytes[i++];

  const msgString = String.fromCharCode.apply(null, msgBytes);

  return {
    msg: msgString,
    payload: payloadBytes,
    msgCount,
  }
}







