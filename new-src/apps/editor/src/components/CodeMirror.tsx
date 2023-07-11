import { EditorView, basicSetup } from "codemirror"
import { keymap, ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "preact/hooks";
import cx from "classnames";
import styles from "./CodeMirror.module.css";
import { getStore, useStore } from "../lib/state.ts";
import { dispatchEditorChange } from "../lib/events.ts";

// this is a terrible hack but strange bugs are about this one
//@ts-expect-error
const autocompleteRemoved = basicSetup.filter((_, i) => ![11, 12].includes(i));

export function getCode() {
  return (document.querySelector(".cm-editor") as (Element & {
    view: EditorView
  }) | undefined)?.view.state.doc.toString();
}

const theme = EditorView.theme({
  ".cm-content": {
    fontFamily: "var(--font-mono)",
    fontSize: "14px"
  }
})

const cmExtensions = [
  autocompleteRemoved,
  javascript(),
  keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
  indentUnit.of("  "),
  theme,
  EditorView.updateListener.of((v: ViewUpdate) => {
    const { code } = getStore();
    code.cmState = v.state;
    if(v.docChanged) {
      code.content = v.state.doc.toString();
      dispatchEditorChange();
    }
  })
];

export const createCMState = (content: string) => EditorState.create({ extensions: cmExtensions, doc: content });

export const deserializeCMState = (state: any) => EditorState.fromJSON(state, { extensions: cmExtensions });


export default function CodeMirror({ className }: { className?: string }) {
  const [view, setView] = useState<EditorView>();
  const { code: codeState } = useStore(["code"]);

  const updateCMState = useCallback(() => {
    if(!view) return;
    view.setState(codeState.cmState);
  }, [view, codeState]);

  useEffect(updateCMState, [view, codeState]);

  const editorRef = useCallback((node: HTMLDivElement | null) => {
    if(!node) return;

    const view = new EditorView({
      parent: node
    });

    //@ts-expect-error
    node.children[0]["view"] = view;
    setView(view);
  }, []);

  return <div class={cx(styles.cmWrapper, className)} ref={editorRef} />;
}