import { useEffect } from "preact/hooks";
import download from "../lib/download";
import runCode from "../lib/run";
import { loadSerializedState, makeNewState, patchStore, serializeState, useStore } from "../lib/state";
import styles from "./Toolbar.module.css";
import Button from "../ui/Button";

export default function Toolbar() {
    return (
        <div class={styles.root}>
            <h1 class={styles.heading}>Haxidraw</h1>
            <RunButton />
            <DownloadButton />
            <NewButton />
            <OpenButton />
        </div>
    );
}

function RunButton() {
    // keyboard shortcut - shift+enter
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if(e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                runCode();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return (
        <Button onClick={() => runCode()}>run (shift+enter)</Button>
    );
}

function DownloadButton() {
    const state = useStore();
    return (
        <Button onClick={() => download("project.mtjson", JSON.stringify(serializeState(state)))}>download</Button>
    );
}

function NewButton() {
    return (
        <Button onClick={() => {
            patchStore({
                ...makeNewState()
            })
        }}>new</Button>
    )
}

function OpenButton() {
    return (
        <Button onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".mtjson";
            input.onchange = () => {
                if(input.files?.length) {
                    const file = input.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        if(typeof reader.result === "string") {
                            loadSerializedState(JSON.parse(reader.result));
                        }
                    }
                    reader.readAsText(file);
                }
            }
            input.click();
        }}>open</Button>
    );
}