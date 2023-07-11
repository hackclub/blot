import AutoBackup from "./components/AutoBackup.tsx";
import CompatWarning from "./components/CompatWarning.tsx";
import Preview from "./components/Preview.tsx";
import Toolbar from "./components/Toolbar.tsx";
import InnerEditor from "./components/Editor.tsx";
import styles from "./Editor.module.css";

export default function Editor() {
    return (
        <>
            <AutoBackup /> {/* doesn't render anything */}
            <div class={styles.root}>
                <Toolbar />
                <div class={styles.inner}>
                    <InnerEditor className={styles.editor} />
                    <Preview className={styles.preview} />
                </div>
            </div>
            <CompatWarning />
        </>
    );
}
