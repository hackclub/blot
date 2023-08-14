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

    listen("mousedown", ".resize-trigger", () => {
        clicked = true;
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
        clicked = false;
    });

    document.addEventListener("mouseleave", () => {
        console.log("mouse leave")
        clicked = false;
    })
}


















