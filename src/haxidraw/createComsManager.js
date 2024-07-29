import * as cobs from './cobs.js'

const TERMINATOR = 0x0a

export async function createComsManager(buffer) {

  const msgHandlers = {}
  const msgPromises = {}
  let msgCount = 0

  setInterval(() => {
    let msg = []
    while (buffer.available()) {
      const byte = buffer.read()
      msg.push(byte)

      // console.log(msg);

      if (byte === TERMINATOR) {
        // using cobs

        // what's msg structure
        // length msg 1 | msg ... | length payload 1 | payload ... | promiseIndex 1

        // ADD THIS TO DECODE WITH COBS
        // msg = cobs.decode(msg);

        const data = unpack(msg)

        if (data.msg === 'ack') {
          const resolver = msgPromises[data.msgCount]
          resolver(data.payload)
          console.log('resolved', data)
        } else if (data.msg in msgHandlers) {
          msgHandlers[data.msg](data.payload)
          const ackBuffer = pack('ack', new Uint8Array(0), data.msgCount)
          const encodedAck = cobs.encode(ackBuffer)
          buffer.write(encodedAck)
        } else {
          const msgString = String.fromCharCode.apply(null, msg)
          console.log('unknown msg:', { msg, msgString })
        }

        msg = []
      }
    }
  }, 0)

  function on(msg, func) {
    msgHandlers[msg] = func
  }

  function send(msg, payload = []) {
    let packedMsg = pack(msg, payload, msgCount)
    packedMsg = cobs.encode(packedMsg)

    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log('No response received for msg:', msgCount)
        resolve()
      }, 5000)
      msgPromises[msgCount] = () => {
        clearTimeout(timeout)
        resolve()
      }
    })

    console.log('sending', {
      msg,
      payload,
      msgCount,
      packedMsg,
      decoded: cobs.decode(packedMsg),
      unpacked: unpack(cobs.decode(packedMsg))
    })

    buffer.write(packedMsg)

    msgCount = (msgCount + 1) % 9

    return promise
  }

  async function close() {
    await buffer.close()

    return
  }

  return {
    on,
    send,
    close
  }
}

function pack(msg, payload, msgCount) {
  // const length = 1+msg.length+1+payload.length+1;
  const buffer = []

  if (msg.length > 255) console.error('msg too long')
  buffer.push(msg.length)
  msg.split('').forEach(char => buffer.push(char.charCodeAt(0)))
  if (payload.length > 255) console.error('payload too long')
  buffer.push(payload.length)
  payload.forEach(byte => buffer.push(byte))
  buffer.push(msgCount)
  // buffer.push(TERMINATOR);

  return new Uint8Array(buffer)
}

function unpack(bytes) {
  // skip the length byte
  let i = 0
  const msgLength = bytes[i++]
  const msgBytes = []
  while (i < 1 + msgLength) {
    msgBytes.push(bytes[i])

    i++
  }

  const payloadLength = bytes[i++]
  const payloadBytes = []
  while (i < 1 + msgLength + 1 + payloadLength) {
    payloadBytes.push(bytes[i])

    i++
  }

  const msgCount = bytes[i++]

  const msgString = String.fromCharCode.apply(null, msgBytes)

  return {
    msg: msgString,
    payload: payloadBytes,
    msgCount
  }
}
