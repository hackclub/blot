import type { ComponentChildren } from "preact";
import { useEffect } from "preact/hooks";
import styles from "./Dropdown.module.css";

export default function Dropdown({ open, onClose, children }: {
    open: boolean;
    onClose: () => void;
    children: ComponentChildren;
}) {
    useEffect(() => {
        if (!open) return;
        // make it so when you click anywhere else the dialog closes
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement;
            if (!target.closest(`.${styles.root}`)) {
                onClose();
            }
        }

        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [open]);

    return open ? (
        <div class={styles.root}>
            {children}
        </div>
    ) : null;
}