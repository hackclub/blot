import { EditorView } from 'codemirror'
import { useCallback, useEffect, useState } from 'preact/hooks'
import styles from './CodeMirror.module.scss'
import { patchStore, getStore } from '../../lib/state/state'
import { useCMTheme } from '../../lib/codemirror/cmTheme'
import { useVimMode } from '../../lib/codemirror/cmVimMode'
import { setErrorPos } from '../../lib/codemirror/errorIndicator'
import { createCMState } from '../../lib/codemirror/state'

export default function CodeMirror() {
  const { error } = getStore()

  const [view, setView] = useState<EditorView>()

  patchStore({ view }, false)

  useCMTheme(view)
  useVimMode(view)

  useOnJumpTo(
    pos => {
      if (!view) return
      viewJumpTo(pos, view)
    },
    [view]
  )

  useEffect(() => {
    if (!view) return
    const line = error?.stack[0].line
    setErrorPos(view, line ? view.state.doc.line(line).from : null)
  })

  const editorRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const view = new EditorView({
      state: createCMState(),
      parent: node
    })

    node.view = view

    // @ts-expect-error
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
      <div class={[styles.cmWrapper, 'cm-editor'].join(' ')} ref={editorRef} />
    </>
  )
}
