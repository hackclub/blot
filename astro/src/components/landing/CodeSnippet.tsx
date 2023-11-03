import { useCallback, useState } from 'preact/hooks'
import { type EditorView } from 'codemirror'
import { useCMTheme } from '../../lib/codemirror/cmTheme'
import styles from '../editor/CodeMirror.module.scss'
import { createCMState } from '../../lib/codemirror/state'

export default function CodeSnippet({ code }) {
  const [view, setView] = useState<EditorView>()

  useCMTheme(view)

  const editorRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const view = new EditorView({
      state: createCMState(code),
      parent: node
    })

    // @ts-expect-error
    node.view = view

    node.children[0]['view'] = view

    setView(view)
  }, [])

  return (
    <div class={styles.root}>
      <style jsx>{`
        .CodeMirror {
          font-size: 18px;
        }
      `}</style>
      <div class={[styles.cmWrapper, 'cm-editor'].join(' ')} ref={editorRef} />
    </div>
  )
}
