import { EditorView } from "codemirror";
import { useCallback, useEffect, useState } from "preact/hooks";
import cx from "classnames";
import styles from "./CodeMirror.module.css";
import { patchStore, useStore } from "../lib/state.ts";
import { useCMTheme } from "../lib/codemirror/cmTheme.ts";
import { useVimMode } from "../lib/codemirror/cmVimMode.ts";
import { setErrorPos } from "../lib/codemirror/errorIndicator.js";
import { useOnJumpTo, viewJumpTo } from "../lib/codemirror/state.js";

export default function CodeMirror() {
    const { code: codeState, error } = useStore(["code", "error"]);
    const [view, setView] = useState<EditorView>();

    useEffect(() => {
        if (!view) return;
        view.setState(codeState.cmState);
    }, [view, codeState]);

    useEffect(() => {
        patchStore({ view });
    }, [view]);

    useCMTheme(view);
    useVimMode(view);

    useOnJumpTo(
        (pos) => {
            if (!view) return;
            viewJumpTo(pos, view);
        },
        [view]
    );

    useEffect(() => {
        if(!view) return;
        const line = error?.stack[0].line;
        setErrorPos(view, line ? view.state.doc.line(line).from : null);
    }, [error]);

    const editorRef = useCallback((node: HTMLDivElement | null) => {
        if (!node) return;

        const view = new EditorView({
            parent: node
        });

        //@ts-expect-error
        node.children[0]["view"] = view;

        setView(view);
    }, []);

    return (
        <>
            <div class={styles.cmWrapper} ref={editorRef} />
        </>
    );
}