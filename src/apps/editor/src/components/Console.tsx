import { useEffect, useRef } from "preact/hooks";
import { patchStore, useStore } from "../lib/state.ts"
import styles from "./Console.module.css";
import cx from "classnames";
import Button from "../ui/Button.tsx";
import TrashCanIcon from "../ui/TrashCanIcon.tsx";
import { dispatchJumpTo } from "../lib/codemirror/state.js";

export default function Console() {
    const { console } = useStore(["console"]);
    const lines = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!lines.current) return;

        lines.current.scrollTop = lines.current.scrollHeight;
    }, [console]);

    if(console.length === 0) return null;

    return (
        <div class={styles.root}>
            <div class={styles.header}>
                <span>console</span>
                <Button class={styles.clearButton} variant="ghost" icon aria-label="clear" onClick={() => patchStore({ console: [] })}><TrashCanIcon /></Button>
            </div>
            <div class={styles.lines} ref={lines}>
                {console.map(({ type, time, values, pos }, index) => (
                    <div class={cx(styles.line, type === "warn" ? styles.tWarn : type === "error" && styles.tError)} key={`${time},${index}`}>
                        <div class={styles.time}>{new Date(time).toLocaleTimeString()}</div>
                        <div class={styles.values}>
                            {values.map((value, i) => (
                                <div key={i}>
                                    {typeof value === "string" ? value : JSON.stringify(value)}
                                </div>
                            ))}
                        </div>
                        {pos && (
                            <button class={styles.pos} onClick={() => {
                                dispatchJumpTo(pos);
                            }}>
                                :{pos.line}:{pos.column}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}