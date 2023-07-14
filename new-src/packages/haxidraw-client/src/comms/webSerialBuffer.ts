export class WebSerialBuffer {
    #buffer: number[] = [];
    #port: SerialPort;
    #baudRate: number;

    constructor(port: SerialPort, baudRate: number = 115200) {
        this.#port = port;
        this.#baudRate = baudRate;
    }

    async init() {
        console.log("wsb opening port");
        await this.#port.open({ baudRate: this.#baudRate });
        console.log("wsb stuff buffer");
        await this.stuffBuffer();
    }

    async stuffBuffer() {
        while(this.#port.readable) {
            console.log("port is readable");
            const reader = this.#port.readable.getReader();
            try {
                let value: Uint8Array | undefined, done: boolean;
                do {
                    console.log("trying to read,,,,");
                    ({ value, done } = await reader.read());
                    console.log({ value, done });
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
    console.log("creating web serial buffer");
    const buffer = new WebSerialBuffer(port, baudRate);
    console.log("initing buffer");
    await buffer.init();
    console.log("buffer inited");
    return buffer;
}