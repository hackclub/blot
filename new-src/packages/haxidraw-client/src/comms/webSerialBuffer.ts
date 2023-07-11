export class WebSerialBuffer {
    #buffer: number[] = [];
    #port: SerialPort;
    #baudRate: number;

    constructor(port: SerialPort, baudRate: number = 115200) {
        this.#port = port;
        this.#baudRate = baudRate;
    }

    async init() {
        await this.#port.open({ baudRate: this.#baudRate });
        await this.stuffBuffer();
    }

    async stuffBuffer() {
        while(this.#port.readable) {
            const reader = this.#port.readable.getReader();
            try {
                let value: Uint8Array | undefined, done: boolean;
                do {
                    ({ value, done } = await reader.read());
                    if(value) value.forEach(v => this.#buffer.push(v));
                } while(!done);
            } finally {
                reader.releaseLock();
            }
        }
    }

    async write(msg: Uint8Array) {
        const writer = this.#port.writable?.getWriter();
        if(!writer) throw new Error("Port is not writable");
        try {
            await writer.write(msg);
        } finally {
            writer.releaseLock();
        }
    }

    read() { return this.#buffer.shift(); }
    available() { return this.#buffer.length; }
    async close() { await this.#port.close(); }
}

export async function createWebSerialBuffer(port: SerialPort, baudRate?: number) {
    const buffer = new WebSerialBuffer(port, baudRate);
    await buffer.init();
    return buffer;
}