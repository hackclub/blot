import { EditorView, basicSetup } from "codemirror"
import { keymap, ViewUpdate } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { EditorState } from "@codemirror/state";
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";
import { useCallback, useEffect, useState } from "preact/hooks";
import cx from "classnames";
import styles from "./CodeMirror.module.css";
import { CodePosition, getStore, useStore, patchStore } from "../lib/state.ts";
import { dispatchEditorChange } from "../lib/events.ts";
import { themeExtension, useCMTheme } from "../lib/codemirror/cmTheme.ts";
import { createEvent } from "niue";
import { useVimMode, vimModeExtension } from "../lib/codemirror/cmVimMode.ts";
import { numberScrubbingPlugin } from "../lib/codemirror/numberScrubbing.ts";
import { manualChangeSinceLiveUpdate } from "../lib/run.js";

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
});

export const liveUpdating = {
  value: false
};

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
      if(!liveUpdating.value) manualChangeSinceLiveUpdate.value = true;
      dispatchEditorChange();
    }
  }),
  themeExtension(),
  vimModeExtension(),
  numberScrubbingPlugin
];

export const createCMState = (content: string) => EditorState.create({ extensions: cmExtensions, doc: content });

export const deserializeCMState = (state: any) => EditorState.fromJSON(state, { extensions: cmExtensions });

export const [useOnJumpTo, dispatchJumpTo] = createEvent<CodePosition>();

export default function CodeMirror({ className }: { className?: string }) {
  const { code: codeState, error, view } = useStore(["code", "error", "view"]);
  const [errorLine, setErrorLine] = useState<number | undefined>();
  const [lineDOMIndex, setLineDOMIndex] = useState<number | undefined>();
  useCMTheme(view);
  useVimMode(view);

  const updateLineDOMIndex = useCallback((errorLine: number | undefined) => {
    if(errorLine === undefined) {
      setLineDOMIndex(undefined);
      return;
    }
    // search through to find the index of line with innertext equal to the line
    const cmLineGutters = document.querySelectorAll(`.${styles.cmWrapper} .cm-lineNumbers > .cm-gutterElement`); // Get all the line gutters
    if(cmLineGutters.length === 0) {
      // cm hasn't rendered yet
      setTimeout(updateLineDOMIndex, 1, errorLine);
    }
    // Find the gutter that matches the line number and is not hidden
    for (let i = 0; i < cmLineGutters.length; i++) {
      const cmLineGutter = cmLineGutters[i] as HTMLElement;
      const innerNumber = cmLineGutter.innerText;
      const height = cmLineGutter.style.height;
      if (Number(innerNumber) === errorLine + 1 && height !== "0px") {
        setLineDOMIndex(i);
        return;
      }
    }
    setLineDOMIndex(undefined);
  }, [view, setLineDOMIndex]);

  useEffect(() => updateLineDOMIndex(errorLine), [errorLine, updateLineDOMIndex]);

  const updateCMState = useCallback(() => {
    if(!view) return;
    view.setState(codeState.cmState);
  }, [view, codeState]);

  useEffect(updateCMState, [view, codeState]);

  useOnJumpTo((pos) => {
    if(!view) return;
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
  }, [view]);

  useEffect(() => {
    if(!error) { setErrorLine(undefined); setLineDOMIndex(undefined); return; }
    const { line } = error.stack[0];
    setErrorLine(line);
  }, [error]);

  const editorRef = useCallback((node: HTMLDivElement | null) => {
    if(!node) return;

    const view = new EditorView({
      parent: node
    });

    //@ts-expect-error
    node.children[0]["view"] = view;

    patchStore({ view });
  }, []);

  useEffect(() => {
    const scrollHandler = () => {
      if(!errorLine) return;
      updateLineDOMIndex(errorLine);
    };
    const el = view?.dom.querySelector(".cm-scroller");
    if(!el) return;
    el.addEventListener("scroll", scrollHandler);
    return () => el.removeEventListener("scroll", scrollHandler);
  }, [errorLine]);

  return (
    <>
      {errorLine !== undefined && (
        <style>{`.${styles.cmWrapper} .cm-lineNumbers > .cm-gutterElement:nth-child(${lineDOMIndex})::before {
  content: "";
  background-color: rgba(255, 0, 0, 0.3);
  position: absolute;
  inset: 0;
  z-index: -1;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  /*margin-top: calc(19.6px - 1rem - 2px);
  bottom: -2px;*/
}
.${styles.cmWrapper} .cm-lineNumbers > .cm-gutterElement:nth-child(${lineDOMIndex}) {
  position: relative;
}`}</style>
      )}
      <div class={cx(styles.cmWrapper, className)} ref={editorRef} />
    </>
  );
}