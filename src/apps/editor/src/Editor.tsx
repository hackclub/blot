import AutoBackup from "./components/AutoBackup.tsx";
import CompatWarning from "./components/CompatWarning.tsx";
import Preview from "./components/Preview.tsx";
import Toolbar from "./components/Toolbar.tsx";
import InnerEditor from "./components/Editor.tsx";
import styles from "./Editor.module.css";
import Error from "./components/Error.tsx";
import Console from "./components/Console.tsx";
import GlobalStateDebugger from "./components/GlobalStateDebugger.tsx";
import DropBox from "./components/DropBox.tsx";
import BezierEditor from "./components/BezierEditor.js";

export default function Editor() {
    return (
        <>
            <AutoBackup /> {/* doesn't render anything */}
            <GlobalStateDebugger />
            <div class={styles.root}>
                <Toolbar />
                <div class={styles.inner}>
                    <InnerEditor className={styles.editor} />
                    <div class={styles.right}>
                        <Preview />
                        <Console />
                        <Error />
                    </div>
                </div>
                {/*<BezierEditor className={styles.bezierTest} width={200} height={200} /> /!* test *!/*/}
            </div>
            <CompatWarning />
            {/*<DropBox />*/}
        </>
    );
}
