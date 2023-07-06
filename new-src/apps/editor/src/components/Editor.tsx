import CodeMirror from "./CodeMirror";
import cx from "classnames";
import styles from "./Editor.module.css";

export default function Editor(props: { className?: string }) {
    return (
        <div class={cx(styles.root, props.className)}>
            <CodeMirror className={styles.cm} />
        </div>
    )
}
