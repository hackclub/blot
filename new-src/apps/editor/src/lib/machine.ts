import { createHaxidraw } from "haxidraw-client";
import { getStore, patchStore } from "./state.ts";

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