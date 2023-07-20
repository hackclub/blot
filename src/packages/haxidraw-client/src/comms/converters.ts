export function floatsToBytes(arr: number[]) {
    const data = new Float32Array(arr);
    const buffer = new ArrayBuffer(data.byteLength);
    new Float32Array(buffer).set(data);
    return new Uint8Array(buffer);
}

export function intsToBytes(arr: number[]) {
    const data = new Uint32Array(arr);
    const buffer = new ArrayBuffer(data.byteLength);
    new Uint32Array(buffer).set(data);
    return new Uint8Array(buffer);
}

export function uint16ToBytes(arr: number[]) {
    const data = new Uint16Array(arr);
    const buffer = new ArrayBuffer(data.byteLength);
    new Uint16Array(buffer).set(data);
    return new Uint8Array(buffer);
}
