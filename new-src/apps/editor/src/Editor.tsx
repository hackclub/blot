import AutoBackup from "./components/AutoBackup";
import CompatWarning from "./components/CompatWarning";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import InnerEditor from "./components/Editor";
import styles from "./Editor.module.css";

export default function Editor() {
    return (
        <>
            <AutoBackup /> {/* doesn't render anything */}
            <div class={styles.root}>
                <Toolbar />
                <div class={styles.inner}>
                    <InnerEditor className={styles.editor} />
                    <Sidebar />
                </div>
            </div>
            <CompatWarning />
        </>
    );
}
