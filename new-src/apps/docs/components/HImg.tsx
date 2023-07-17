import Image, { type StaticImageData } from "next/image";
import { useCallback, useState, useRef, useEffect, KeyboardEvent } from "react";
import styles from "./HImg.module.css";

export default function HImg({ className, thumbWidth, ...imgProps }: Omit<React.ComponentProps<typeof Image>, "src"> & { src: StaticImageData, thumbWidth?: number }) {
    const [open, setOpen] = useState(false);
    const [exiting, setExiting] = useState(false);

    const keyHandler = useCallback(((e: KeyboardEvent) => {
        if (e.key === "Escape") close();
    }) as unknown as typeof window["onkeydown"], []); // ?????

    const close = useCallback(() => {
        window.removeEventListener("keydown", keyHandler);
        setExiting(true);
        setTimeout(() => {
            setOpen(false);
            setExiting(false);
        }, 210);
    }, []);

    const openOverlay = useCallback(() => {
        setOpen(true);
        window.addEventListener("keydown", keyHandler);
    }, []);

    return (
        <>
            <Image placeholder="blur" {...imgProps} onClick={openOverlay} className={styles.thumb + (className ? " " + className : "")} style={{
                //@ts-ignore
                "--thumb-width": (thumbWidth ?? 500) + "px"
            }} />
            {open && (
                <div className={styles.overlay + (exiting ? " " + styles.exiting : "")} onClick={close} style={{
                    //@ts-ignore
                    "--aspect-ratio": imgProps.src.width / imgProps.src.height // can't set width of next/image directly
                }}>
                        <Image placeholder="blur" {...imgProps} fill={true} />
                </div>
            )}
        </>
    )
}