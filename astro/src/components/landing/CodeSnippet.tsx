import { useCallback, useState, useEffect, useRef } from "preact/hooks";
import { EditorView } from "codemirror";
import styles from "../CodeMirror.module.css"
import {
  createCMState,
} from '../../lib/codemirror/state.js'

export default function CodeSnippet({ content }) {
    const [view, setView] = useState<EditorView>()

    useEffect(() => {
        if (view)
        view.dispatch({
          changes: { from: 0, insert: content }
        })
    }, [view])

    const editorRef = useCallback((node: HTMLDivElement | null) => {
      if (!node) return

      const view = new EditorView({
        state: createCMState(),
        parent: node
      })

      node.view = view

      //@ts-expect-error
      node.children[0]['view'] = view

      setView(view)
    }, [])

    return (
      <>
        <style jsx global>{`
          .CodeMirror {
            font-size: 18px;
          }
        `}</style>
        <div
          class={[styles.cmWrapper, 'cm-editor'].join(' ')}
          ref={editorRef}
        />
      </>
    )
}