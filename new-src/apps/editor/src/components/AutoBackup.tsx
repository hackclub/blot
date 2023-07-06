import { useEffect } from "preact/hooks";
import { useStore, serializeState, getStore } from "../lib/state";
import { useOnEditorChange } from "../lib/events";

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