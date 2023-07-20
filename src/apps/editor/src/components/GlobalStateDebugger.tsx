import { useEffect } from "preact/hooks";
import { useStore } from "../lib/state.ts";

export default function GlobalStateDebugger() {
    const state = useStore();

    useEffect(() => {
        //@ts-expect-error
        globalThis["_globalState"] = state;
    }, [state]);

    return null;
}