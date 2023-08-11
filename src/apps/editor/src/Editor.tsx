import AutoBackup from "./components/AutoBackup.tsx";
import CompatWarning from "./components/CompatWarning.tsx";
import Preview from "./components/Preview.tsx";
import Toolbar from "./components/Toolbar.tsx";
import InnerEditor from "./components/Editor.tsx";
import styles from "./Editor.module.css";
import Error from "./components/Error.tsx";
import Console from "./components/Console.tsx";
import GlobalStateDebugger from "./components/GlobalStateDebugger.tsx";
import { useEffect, useState } from "preact/hooks";

export default function Editor() {
    const [editorPercentWidth, setEditorPercentWidth] = useState(50);
    const [resizing, setResizing] = useState(false);

    useEffect(() => {
        if(!resizing) return;

        const listener = (e: MouseEvent) => {
            if(e.buttons === 0) {
                setResizing(false);
                return;
            }
            setEditorPercentWidth(e.clientX / window.innerWidth * 100);
        };

        document.addEventListener("mousemove", listener);
        document.addEventListener("mouseup", listener);

        return () => {
            document.removeEventListener("mousemove", listener);
            document.removeEventListener("mouseup", listener);
        };
    }, [resizing]);

    return (
        <>
            <AutoBackup /> {/* doesn't render anything */}
            <GlobalStateDebugger />
            <div class={styles.root}>
                <Toolbar />
                <div class={styles.inner}>
                    <style>{`.${styles.editor} { width: ${editorPercentWidth}%; }`}</style>
                    <InnerEditor className={styles.editor} />
                    <div class={styles.divider} onMouseDown={() => setResizing(true)} />
                    <div class={styles.right}>
                        <Preview />
                        <Console />
                        <Error />
                    </div>
                </div>
            </div>
            <CompatWarning />
            {/*<DropBox />*/}
        </>
    );
}
