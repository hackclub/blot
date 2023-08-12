import { useEffect, useState } from "preact/hooks";
import download from "../lib/download.ts";
import runCode from "../lib/run.ts";
import { loadCodeFromString, makeNewState, patchStore, useStore, getStore } from "../lib/state.ts";
import styles from "./Toolbar.module.css";
import Button from "../ui/Button.tsx";
import cx from "classnames";
// import CheckmarkIcon from "../ui/CheckmarkIcon.tsx";
import PlugIcon from "../ui/PlugIcon.tsx";
import { connect, disconnect, runMachine, tryAutoConnect } from "../lib/machine.ts";
import BrightnessContrastIcon from "../ui/BrightnessContrastIcon.tsx";
import { Theme, patchSettings, useSettings } from "../lib/settings.ts";
import SettingsIcon from "../ui/SettingsIcon.tsx";
import KeyboardIcon from "../ui/KeyboardIcon.tsx";

export default function Toolbar() {
    const { connected } = useStore(["connected"]);

    const [hidden, setHidden] = useState(true);

    return (
        <div class={styles.root}>
            <h1 class={styles.heading}>Haxidraw</h1>
            <RunButton />
            <NewButton />
            <OpenButton />
            <div 
                style={{
                    position: "relative"
                }}
                onMouseEnter={() => setHidden(false)}
                onMouseLeave={() => setHidden(true)}>
                <div>download</div>
                <div style={{
                    display: hidden ? "" : "",
                    position: "absolute"
                }}>
                    <DownloadButton />
                    <DownloadSVG />
                    <DownloadPNG />
                </div>
            </div>

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
    return (
        <Button variant="ghost" onClick={() => download("project.js", state.code.content)}>download js</Button>
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
            const { turtles, docDimensions } = getStore();

            const turtleToPathData = t => {
                let d = "";

                t.path.forEach(pl => pl.forEach((pt, i) => {
                    const [ x, y ] = pt;
                    if (i === 0) d += `M ${x} ${y}`;
                    else d += `L ${x} ${y}`
                }))

                return d;
            }

            const turtleToPath = t => {
                const d = turtleToPathData(t);

                return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
            }

            const paths = turtles.map(turtleToPath);
            
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" width="${docDimensions.width}mm" height="${docDimensions.height}mm">
                    ${paths.join("\n")}
                </svg>
            `
            download("anon.svg", svg);
        }}>download svg</Button>
    );
}

function DownloadPNG() {
    return (
        <Button variant="ghost" onClick={() => {
            const { turtles, docDimensions } = getStore();

            const turtleToPathData = t => {
                let d = "";

                t.path.forEach(pl => pl.forEach((pt, i) => {
                    const [ x, y ] = pt;
                    if (i === 0) d += `M ${x} ${y}`;
                    else d += `L ${x} ${y}`
                }))

                return d;
            }

            const turtleToPath = t => {
                const d = turtleToPathData(t);

                return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
            }

            const paths = turtles.map(turtleToPath);
            
            const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" width="${docDimensions.width}mm" height="${docDimensions.height}mm">
                    ${paths.join("\n")}
                </svg>
            `

            // Create a new Image element
            const img = new Image();
            img.onload = function () {
              // Create a temporary canvas
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              
              // Draw the image on the canvas
              const context = canvas.getContext('2d');
              context.drawImage(img, 0, 0);
              
              // Convert canvas to PNG data URL
              const pngDataUrl = canvas.toDataURL('image/png');
              
              // Create a download link
              const downloadLink = document.createElement('a');
              downloadLink.href = pngDataUrl;
              downloadLink.download = 'image.png';
              downloadLink.textContent = 'Download PNG';
              
              // Simulate a click on the download link
              downloadLink.click();
            };

            // Convert SVG to data URL
            const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);

            // Set the Image source to the SVG data URL
            img.src = svgDataUrl;
        }}>download png</Button>
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

    useEffect(() => {
        if(!dropdownOpen) return;  
        // make it so when you click anywhere else the dialog closes
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if(!target.closest(`.${styles.settingsWrapper}`)) {
                setDropdownOpen(false);
            }
        }

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [dropdownOpen]);

    return (
        <div class={styles.settingsWrapper}>
            <Button variant="ghost" icon aria-label="show settings menu" aria-expanded={dropdownOpen} onClick={() => {
                setDropdownOpen(!dropdownOpen);

            }}>
                <SettingsIcon />
            </Button>
            {dropdownOpen && (
                <div class={styles.settingsDropdown}>
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
                </div>
            )}
        </div>
    )
}