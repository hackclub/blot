import { CodePosition, getStore } from "../state.ts";
import styles from "./Error.module.css";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
} from "@codemirror/language";
import { themeExtension, useCMTheme } from "../codemirror/cmTheme.ts";
import JumpLinkIcon from "../ui/JumpLinkIcon.tsx";
import { dispatchJumpTo } from "../codemirror/state.js";

const Snippet = ({
  pos,
  code,
  message,
}: {
  pos: CodePosition;
  code: string;
  message?: string;
}) => {
  const view = useRef<EditorView>();
  useCMTheme(view.current);

  const cmRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (node.children[0]) {
        // destroy existing view
        //@ts-expect-error
        if (node.children[0]) node.children[0]["view"].destroy();
      }

      const extensions = [
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        javascript(),
        EditorState.readOnly.of(true),
        EditorView.editable.of(false),
        EditorView.theme({
          ".cm-content": {
            padding: "0",
          },
          ".cm-line": {
            padding: "0",
          },
          ".cm-scroller": {
            fontFamily: "inherit",
            lineHeight: "inherit",
          },
          ".ͼp": {
            backgroundColor: "transparent",
          },
        }),
        themeExtension(),
      ];

      const newView = new EditorView({
        doc: code.split("\n")[pos.line - 1],
        parent: node,
        extensions,
      });

      //@ts-expect-error
      node.children[0]["view"] = newView;
      view.current = newView;
    },
    [code],
  );

  useEffect(() => {
    if (!view.current) return;
    // set the document to current line
    view.current.dispatch({
      changes: {
        from: 0,
        to: view.current.state.doc.length,
        insert: code.split("\n")[pos.line - 1],
      },
    });
  });

  return (
    <pre class={styles.snippet}>
      <div>
        <div>{pos.line}</div>
      </div>
      <code class={styles.code}>
        <div ref={cmRef} class={styles.cm} />
        {" ".repeat(pos.column)}
        <span class={styles.arrow}>↑</span>
        {message && <span class={styles.message}>{message}</span>}
      </code>
      <button
        class={styles.jumpTo}
        onClick={() => {
          dispatchJumpTo(pos);
        }}
      >
        <JumpLinkIcon />
        Jump to line
      </button>
    </pre>
  );
};

export default function Error() {
  const { error } = getStore();

  if (!error) return null;

  return (
    <div class={styles.root}>
      <span class={styles.name}>{error.name}</span>
      <Snippet pos={error.pos} code={error.code} message={error.message} />
    </div>
  );
}
