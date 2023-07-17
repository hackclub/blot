import { useEffect } from "preact/hooks";
import { useStore, serializeState, getStore } from "../lib/state.ts";
import { useOnEditorChange } from "../lib/events.ts";

function backup() {
    const backup = serializeState(getStore());
    localStorage.setItem("backup", JSON.stringify(backup));
}

export default function AutoBackup() {
    useStore();

    useOnEditorChange(backup, []);
    useEffect(backup);

    return null;
}