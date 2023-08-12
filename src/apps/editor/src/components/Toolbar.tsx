import { useEffect, useState } from "preact/hooks";
import download from "../lib/download.ts";
import runCode from "../lib/run.ts";
import { loadCodeFromString, makeNewState, patchStore, useStore, getStore } from "../lib/state.ts";
import styles from "./Toolbar.module.css";
import Button from "../ui/Button.tsx";
import cx from "classnames";
import PlugIcon from "../ui/PlugIcon.tsx";
import { connect, disconnect, runMachine, tryAutoConnect } from "../lib/machine.ts";
import BrightnessContrastIcon from "../ui/BrightnessContrastIcon.tsx";
import { Theme, patchSettings, useSettings } from "../lib/settings.ts";
import SettingsIcon from "../ui/SettingsIcon.tsx";
import KeyboardIcon from "../ui/KeyboardIcon.tsx";
import downloadPng from "../lib/downloadPng.js";
import Dropdown from "../ui/Dropdown.js";
import downloadSvg from "../lib/downloadSvg.js";

export default function Toolbar() {
    const { connected } = useStore(["connected"]);
    return (
        <div class={styles.root}>
            <h1 class={styles.heading}>Haxidraw</h1>
            <RunButton />
            <DownloadButton />
            <NewButton />
            <OpenButton />
            <DownloadSVG />
            <Button variant="ghost" class="connect-trigger">{connected ? "disconnect from" : "connect to"} machine</Button>
            {connected && <Button variant="ghost" class="run-machine-trigger">run machine</Button>}
            {/*<MachineControls />*/}
            <SettingsButton />
        </div>
    );
}

function RunButton() {
    // keyboard shortcut - shift+enter
    useEffect(() => {
        async function handleKeyDown(e: KeyboardEvent) {
            if(e.shiftKey && e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                await runCode();
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, []);

    return (
        <Button variant="ghost" onClick={() => runCode()}>run (shift+enter)</Button>
    );
}

function DownloadButton() {
    const state = useStore();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const s = (f: (...a: any[]) => any) => () => (f(), setDropdownOpen(false));

    return (
        <div class={styles.dropdownWrapper}>
            <Button variant="ghost" onClick={() => setDropdownOpen(v => !v)}>download</Button>
            <Dropdown open={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                <Button variant="ghost" onClick={s(() => download("project.js", state.code.content))}>download code</Button>
                <Button variant="ghost" onClick={s(downloadSvg)}>download svg</Button>
                <Button variant="ghost" onClick={s(downloadPng)}>download png</Button>
            </Dropdown>
        </div>
    );
}

function NewButton() {
    return (
        <Button variant="ghost" onClick={() => {
            patchStore({
                ...makeNewState()
            })
        }}>new</Button>
    );
}

function DownloadSVG() {
    return (
        <Button variant="ghost" onClick={() => {
        }}>download svg</Button>
    );
}

function OpenButton() {
    return (
        <Button variant="ghost" onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".js";
            input.onchange = () => {
                if(input.files?.length) {
                    const file = input.files[0];
                    const reader = new FileReader();
                    reader.onload = () => {
                        if(typeof reader.result === "string") {
                            loadCodeFromString(reader.result);
                        }
                    }
                    reader.readAsText(file);
                }
            }
            input.click();
        }}>open</Button>
    );
}

function MachineControls() {
    const { inst, running } = useStore(["inst", "running"]);

    useEffect(() => {
        tryAutoConnect();

        // connect here, set inst
    }, []);

    return (
        <div class={styles.right}>
            {inst ? (
                <>
                    <Button variant="ghost" onClick={disconnect}>
                        <PlugIcon className={cx(styles.icon, styles.connectedIcon)} />
                        <span>disconnect...</span>
                    </Button>
                    {/* separator */}
                    <div class={styles.separator} />
                    <Button variant="ghost" loading={running} onClick={runMachine}>
                        run machine
                    </Button>
                </>
            ) : (
                <Button variant="ghost" onClick={connect}>
                    <PlugIcon className={cx(styles.icon, styles.disconnectedIcon)} />
                    <span>connect to machine...</span>
                </Button>
            )}
        </div>
    );
}

function SettingsButton() {
    const { theme, vimMode } = useSettings(["theme", "vimMode"]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div class={styles.dropdownWrapper}>
            <Button variant="ghost" icon aria-label="show settings menu" aria-expanded={dropdownOpen} onClick={() => {
                setDropdownOpen(!dropdownOpen);

            }}>
                <SettingsIcon />
            </Button>
            <Dropdown open={dropdownOpen} onClose={() => setDropdownOpen(false)}>
                <Button variant="ghost" onClick={() => {
                    patchSettings({ theme: theme === Theme.Dark ? Theme.Light : Theme.Dark });
                    setDropdownOpen(false);
                }}>
                    <BrightnessContrastIcon className={styles.icon} />
                    <span>toggle theme</span>
                </Button>
                <Button variant="ghost" onClick={() => {
                    patchSettings({ vimMode: !vimMode });
                    setDropdownOpen(false);
                }}>
                    <KeyboardIcon className={styles.icon} />
                    <span>{vimMode ? "disable" : "enable"} vim mode</span>
                </Button>
            </Dropdown>
        </div>
    )
}