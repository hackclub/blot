import { useMemo } from "preact/hooks";
import styles from "./Dialog.module.css";
import cx from "classnames";
import { nanoid } from "nanoid";
import type { VNode } from "preact";

type DialogProps = {
    title: string,
    className?: string,
    children: React.ReactNode,
    show: boolean,
    actions: VNode
};

export default function Dialog({ show, className, title, children, actions }: DialogProps) {
    const id = useMemo(() => nanoid(), []);

    return show ? (
        <div class={cx(styles.root, className)}>
            <div role="dialog" aria-labelledby={id + "-label"} aria-describedby={id + "-desc"} class={styles.box}>
                <h2 id={id + "-label"}>{title}</h2>
                <p id={id + "-desc"}>{children}</p>
                <div class={styles.actions}>{actions}</div>
            </div>
        </div>
    ) : null;
}