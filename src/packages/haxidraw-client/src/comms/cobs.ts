export function encode(buf: Uint8Array | number[]) {
    const dest: number[] = [0];
    // vfpt starts @ 1,
    let code_ptr = 0;
    let code = 0x01;

    function finish(incllast?: boolean) {
        dest[code_ptr] = code;
        code_ptr = dest.length;
        incllast && dest.push(0x00);
        code = 0x01;
    }

    for (let i = 0; i < buf.length; i++) {
        if (buf[i] == 0) {
            finish();
        } else {
            dest.push(buf[i]);
            code += 1;
            if (code == 0xff) {
                finish();
            }
        }
    }
    finish(false);

    // close w/ zero
    dest.push(0x00);

    // return Uint8Array.from(dest);
    return dest;
}

// COBS decode, tailing zero, that was used to delineate this buffer,
// is assumed to already be chopped, thus the end is the end

export function decode(buf: Uint8Array | number[]) {
    const dest: number[] = [];
    for (let i = 0; i < buf.length; ) {
        const code = buf[i++];
        for (let j = 1; j < code; j++) {
            dest.push(buf[i++]);
        }
        if (code < 0xff && i < buf.length) {
            dest.push(0);
        }
    }

    // return Uint8Array.from(dest);
    return dest;
}