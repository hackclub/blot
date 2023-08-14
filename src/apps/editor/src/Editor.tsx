import AutoBackup from "./components/AutoBackup.tsx";
import CompatWarning from "./components/CompatWarning.tsx";
import Preview from "./components/Preview.tsx";
import Toolbar from "./components/Toolbar.tsx";
import styles from "./Editor.module.css";
import Error from "./components/Error.tsx";
import Console from "./components/Console.tsx";
import GlobalStateDebugger from "./components/GlobalStateDebugger.tsx";
import DropBox from "./components/DropBox.tsx";
import CodeMirror from "./components/CodeMirror.tsx";

import { createListener } from "./lib/createListener.js";
import { useEffect, useState } from "preact/hooks";
import { init } from "./lib/init.js";

export default function Editor() {

    const [ width, setWidth ] = useState(50); 

    useEffect(() => { 
        init();
        addBarResizing(setWidth);
    }, []);

    return (
        <>
            <AutoBackup /> {/* doesn't render anything */}
            <GlobalStateDebugger />
            <div class={styles.root}>
                <Toolbar />
                <div class={styles.inner}>
                    <div style={{ width: `${width}%` }}>
                        <CodeMirror/>
                    </div>
                    <div class={`${styles.vertBar} resize-trigger`} style={{ left: `${width}%`}}></div>
                    <div class={styles.right} style={{ width: `${100-width}%` }}>
                        <Preview />
                        <Console />
                        <Error />
                    </div>
                </div>
            </div>
            <CompatWarning />
            <DropBox />
        </>
    );
}

function addBarResizing(setWidth) {
    const listen = createListener(document.body);

    let clicked = false;
    let bar : HTMLDivElement | null = null;

    listen("mousedown", ".resize-trigger", (e) => {
        clicked = true;
        bar = e.target;

        if (bar === null) return;

        bar.style.width = "8px";
        bar.style.background = "black";
    });

    listen("mousemove", "", (e) => {
        if (clicked) {
            e.preventDefault();
            let percent = e.clientX / window.innerWidth * 100;
            percent = Math.min(percent, 100);
            percent = Math.max(percent, 0);

            setWidth(percent);
        }
    });

    listen("mouseup", "", () => {

        if (bar !== null) {
            bar.style.width = "";
            bar.style.background = "";
        }


        clicked = false;
        bar = null;

    });

    document.addEventListener("mouseleave", () => {
        
        if (bar !== null) {
            bar.style.width = "";
            bar.style.background = "";
        }


        clicked = false;
        bar = null;
    })
}


















