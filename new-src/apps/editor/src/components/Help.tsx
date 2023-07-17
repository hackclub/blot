import { compiledContent } from "./HelpContents.md";
import styles from "./Help.module.css";

const html = compiledContent();

export default function Help() {
    return (
        <div class={styles.root} dangerouslySetInnerHTML={{ __html: html }} />
    )
}