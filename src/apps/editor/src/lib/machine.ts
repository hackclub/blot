import { Point, createHaxidraw } from "haxidraw-client";
import { getStore, patchStore } from "./state.ts";
import { sleep } from "./run.ts";

export async function connect() {
    if(getStore().inst) throw new Error("Already connected to an instance");
    const port = await navigator.serial.requestPort();
    const inst = await createHaxidraw(port);

    patchStore({
        inst
    });
}

export async function disconnect() {
    if(!getStore().inst) throw new Error("Not connected to an instance");
    const { inst } = getStore();
    inst!.close();
    patchStore({
        inst: null
    });
}

export async function tryAutoConnect() {
    const p = (await navigator.serial.getPorts()).find(p => p.getInfo().usbVendorId === 11914);
    if(!p) return;
    patchStore({
        inst: await createHaxidraw(p)
    });
}

export async function runMachine(scaleX: number = 1, scaleY: number = 1) {
    patchStore({ running: true });
    try {
        const { inst, turtles } = getStore();
        if(!inst) throw new Error("Not connected to an instance");

        const goToScaled = async (...[x, y]: Point) => await inst.goTo(x * scaleX, y * scaleY);

        await inst.servo(1000);
        await sleep(200);

        const polylines = turtles.map(t => t.path).flat();
        for(const polyline of polylines) {
            const [p0, p1] = polyline;
            await inst.servo(1000);
            await sleep(200);
            await goToScaled(...p0);

            await inst.servo(1700);
            await sleep(100);
            await goToScaled(...p1);
        }

        await inst.servo(1000);
        await sleep(200);
        await inst.goTo(0, 0);
    } finally {
        patchStore({ running: false });
    }
}