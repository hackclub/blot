import { WebSerialBuffer, createWebSerialBuffer } from "./webSerialBuffer";
import * as cobs from "./cobs";

const TERMINATOR = 0x0A;

type MsgHandler = (payload: number[]) => void;

interface HXSerialPort {
    on: (msg: string, func: MsgHandler) => void;
    send: (msg: string, payload: Uint8Array) => Promise<void>;
    close: () => Promise<void>;
}

export class WebSerialPort implements HXSerialPort {
    #buffer: WebSerialBuffer = null!;
    #msgHandlers: Record<string, MsgHandler> = {};
    #msgResolves: Record<string, (payload: number[]) => void> = {};
    #msgCount = 0;
    #loopInterval: number = null!;

    constructor() {}

    async init(rawPort: SerialPort) {
        console.log("initing web serial port");
        this.#buffer = await createWebSerialBuffer(rawPort);

        this.#loopInterval = window.setTimeout(() => this.#loop(), 0);
    }

    async #loop() {
        console.log("loop run");
        let msg: number[] = [];
        while(this.#buffer.available()) {
            const byte = this.#buffer.read()!;
            msg.push(byte);

            if(byte === TERMINATOR) {
                const data = unpack(msg);

                if(data.msg === "ack") {
                    this.#msgResolves[data.msgCount](data.payload);
                } else if(data.msg in this.#msgHandlers) {
                    this.#msgHandlers[data.msg](data.payload);
                    this.#buffer.write(cobs.encode(pack("ack", new Uint8Array(0), data.msgCount)));
                } else {
                    console.warn("Unknown message", data.msg);
                }

                msg = [];
            }
        }

        this.#loopInterval = window.setTimeout(() => this.#loop(), 0);
    }

    on(msg: string, func: MsgHandler) {
        this.#msgHandlers[msg] = func;
    }

    send(msg: string, payload: Uint8Array) {
        const packedMsg = cobs.encode(pack(msg, payload, this.#msgCount));

        const promise = new Promise<void>((res) => {
            const timeout = setTimeout(() => {
                console.warn("No response received for msg", msg);
                res();
            }, 5000);
            this.#msgResolves[this.#msgCount] = () => {
                clearTimeout(timeout);
                res();
            }
        });

        this.#buffer.write(packedMsg);
        this.#msgCount = (this.#msgCount + 1) % 9;

        return promise;
    }

    async close() {
        window.clearInterval(this.#loopInterval);
        await this.#buffer.close();
    }
}

function pack(msg: string, payload: Uint8Array, msgCount: number) {
    const buffer: number[] = [];

    if(msg.length > 255) throw new Error("Message too long");
    buffer.push(msg.length);
    msg.split("").forEach(char => buffer.push(char.charCodeAt(0)));
    if(payload.length > 255) throw new Error("Payload too long");
    buffer.push(payload.length);
    payload.forEach(byte => buffer.push(byte));
    buffer.push(msgCount);

    return new Uint8Array(buffer);
}

function unpack(bytes: number[]) {
    let i = 0;
    // skip length byte
    const msgLength = bytes[i++];
    const msgBytes = bytes.slice(i, i + msgLength);
    i += msgLength;
    const payloadLength = bytes[i++];
    const payloadBytes = bytes.slice(i, i + payloadLength);
    const msgCount = bytes[i++];
    const msgString = String.fromCharCode.apply(null, msgBytes);

    return {
        msg: msgString,
        payload: payloadBytes,
        msgCount
    };
}

export async function createWebSerialPort(rawPort: SerialPort) {
    console.log("wsb creating wsp");
    const port = new WebSerialPort();
    console.log("wsb initing wsp");
    await port.init(rawPort);
    return port;
}