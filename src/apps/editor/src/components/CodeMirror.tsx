import { EditorView, basicSetup } from "codemirror";
import { keymap, ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { EditorState, Transaction } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "preact/hooks";
import styles from "./CodeMirror.module.css";
import { CodePosition, getStore, patchStore, useStore } from "../lib/state.ts";
import { dispatchEditorChange } from "../lib/events.ts";
import { themeExtension, useCMTheme } from "../lib/codemirror/cmTheme.ts";
import { createEvent } from "niue";
import { useVimMode, vimModeExtension } from "../lib/codemirror/cmVimMode.ts";
import { numberScrubbingPlugin } from "../lib/codemirror/numberScrubbing.ts";
import { errorIndicatorPlugin, setErrorPos } from "../lib/codemirror/errorIndicator.js";

// this is a terrible hack but strange bugs are about this one
//@ts-expect-error
const autocompleteRemoved = basicSetup.filter((_, i) => ![11, 12].includes(i));

const theme = EditorView.theme({
    ".cm-content": {
        fontFamily: "var(--font-mono)",
        fontSize: "14px"
    }
});

const cmExtensions = [
    autocompleteRemoved,
    javascript(),
    keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
    indentUnit.of("  "),
    theme,
    EditorView.updateListener.of((v: ViewUpdate) => {
        const { code } = getStore();
        code.cmState = v.state;
        if (v.docChanged) {
            code.content = v.state.doc.toString();
            dispatchEditorChange();
        }
    }),
    themeExtension(),
    vimModeExtension(),
    numberScrubbingPlugin,
    errorIndicatorPlugin()
];

export const createCMState = (content: string) =>
    EditorState.create({ extensions: cmExtensions, doc: content });

// export const deserializeCMState = (state: any) =>
//     EditorState.fromJSON(state, { extensions: cmExtensions });

export const [useOnJumpTo, dispatchJumpTo] = createEvent<CodePosition>();

export default function CodeMirror({ className }: { className?: string }) {
    const { code: codeState, error } = useStore(["code", "error"]);
    const [view, setView] = useState<EditorView>();

    useEffect(() => {
        if (!view) return;
        view.setState(codeState.cmState);
    }, [view, codeState]);

    useEffect(() => {
      patchStore({ view });
    });

    useCMTheme(view);
    useVimMode(view);

    useOnJumpTo(
        (pos) => {
            if (!view) return;
            const offset = view.state.doc.line(pos.line).from + pos.column;
            view.dispatch({
                selection: {
                    anchor: offset,
                    head: offset
                },
                effects: EditorView.scrollIntoView(offset, {
                    y: "center"
                })
            });
            // focus the editor
            view.focus();
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
            <div class={`${styles.cmWrapper} ${className}`} ref={editorRef} />
        </>
    );
}
