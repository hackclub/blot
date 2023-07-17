import { WebSerialDispatcher, createWebSerialDispatcher } from "./webSerialDispatcher";
import * as cobs from "./cobs";
import { C, I, _, pipe } from "../pipe";

const TERMINATOR = 0x0A;

type MsgHandler = (payload: number[]) => void;

interface HXSerialPort {
    on: (msg: string, func: MsgHandler) => void;
    send: (msg: string, payload: Uint8Array) => Promise<void>;
    close: () => Promise<void>;
}

export class WebSerialPort implements HXSerialPort {
    #dispatcher: WebSerialDispatcher = null!;
    #msgHandlers: Record<string, MsgHandler> = {};
    #msgResolves: Record<string, (payload: number[]) => void> = {};
    #msgCount = 0;

    constructor() {}

    async init(rawPort: SerialPort) {
        let msg: number[] = [];
        this.#dispatcher = await createWebSerialDispatcher(rawPort, async data => {
            for(const byte of data) {
                msg.push(byte);

                if(byte === TERMINATOR) {
                    const data = unpack(msg);

                    if(data.msg === "ack") {
                        this.#msgResolves[data.msgCount](data.payload);
                    } else if(data.msg in this.#msgHandlers) {
                        this.#msgHandlers[data.msg](data.payload);
                        // await this.#dispatcher.write(Uint8Array.from(cobs.encode(pack("ack", new Uint8Array(0), data.msgCount))));
                        await pipe(
                            I(pack("ack", new Uint8Array(0), data.msgCount)),
                            cobs.encode,
                            d => Uint8Array.from(d),
                            d => this.#dispatcher.write(d)
                        )();
                    } else {
                        console.warn("Unknown message", data.msg);
                    }

                    msg = [];
                }
            }
        });
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

        this.#dispatcher.write(Uint8Array.from(packedMsg));
        this.#msgCount = (this.#msgCount + 1) % 9;

        return promise;
    }

    async close() {
        await this.#dispatcher.close();
    }
}

function pack(msg: string, payload: Uint8Array | number[], msgCount: number) {
    const buffer: number[] = [];

    if(msg.length > 255) throw new Error("Message too long");
    buffer.push(msg.length);
    msg.split("").forEach(char => buffer.push(char.charCodeAt(0)));
    if(payload.length > 255) throw new Error("Payload too long");
    buffer.push(payload.length);
    payload.forEach(byte => buffer.push(byte));
    buffer.push(msgCount);

    // return new Uint8Array(buffer);
    return buffer;
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
    const port = new WebSerialPort();
    await port.init(rawPort);
    return port;
}