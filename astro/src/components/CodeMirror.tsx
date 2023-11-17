import { EditorView } from 'codemirror'
import { useCallback, useEffect, useState } from 'preact/hooks'
import cx from 'classnames'
import styles from './CodeMirror.module.css'
import { patchStore, getStore } from '../lib/state.ts'
import { useCMTheme } from '../lib/codemirror/cmTheme.ts'
import { useVimMode } from '../lib/codemirror/cmVimMode.ts'
import { setErrorPos } from '../lib/codemirror/errorIndicator.ts'
import {
  createCMState,
  useOnJumpTo,
  viewJumpTo
} from '../lib/codemirror/state.js'

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
    const line = error?.pos.line
    setErrorPos(view, line ? view.state.doc.line(line).from : null)
  })

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
      <div class={[styles.cmWrapper, 'cm-editor'].join(' ')} ref={editorRef} />
    </>
  )
}
