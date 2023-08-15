import type { CodePosition } from "../state.js";
import { EditorView, keymap, ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit } from "@codemirror/language";
import { getStore } from "../state.js";
import { EditorState, Transaction } from "@codemirror/state";
import { manualChangeSinceLiveUpdate } from "./liveUpdate.js";
import { dispatchEditorChange } from "../events.js";
import { themeExtension } from "./cmTheme.js";
import { vimModeExtension } from "./cmVimMode.js";
import { numberScrubbingPlugin } from "./numberScrubbing.js";
import { errorIndicatorPlugin } from "./errorIndicator.js";
import { widgetsPlugin } from "./widgets.js";
import { createEvent } from "niue";

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
            if (v.transactions.find(t => t.annotation(Transaction.userEvent) !== undefined)) manualChangeSinceLiveUpdate.value = true;
            dispatchEditorChange();
        }
    }),
    themeExtension(),
    vimModeExtension(),
    numberScrubbingPlugin,
    errorIndicatorPlugin(),
    widgetsPlugin
];

export const createCMState = (content: string) =>
    EditorState.create({ extensions: cmExtensions, doc: content });

export const deserializeCMState = (state: any) =>
    EditorState.fromJSON(state, { extensions: cmExtensions });

export const [useOnJumpTo, dispatchJumpTo] = createEvent<CodePosition>();

export const viewJumpTo = (pos: CodePosition, view: EditorView) => {
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
};