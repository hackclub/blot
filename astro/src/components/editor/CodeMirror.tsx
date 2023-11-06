import { EditorView } from 'codemirror'
import { useCallback, useEffect, useState } from 'preact/hooks'
import styles from './CodeMirror.module.scss'
import { patchStore, getStore } from '../../lib/state/state'
import { useCMTheme } from '../../lib/codemirror/cmTheme'
import { useVimMode } from '../../lib/codemirror/cmVimMode'
import { setErrorPos } from '../../lib/codemirror/errorIndicator'
import {
  createCMState,
  useOnJumpTo,
  viewJumpTo
} from '../../lib/codemirror/state'

export default function CodeMirror({ loggedIn }) {
  const { error } = getStore()

  const [view, setView] = useState<EditorView>()
  const [changed, setChanged] = useState(false)

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
  }, [])

  const editorRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return

    const view = new EditorView({
      state: createCMState(),
      parent: node
    })

    // @ts-expect-error
    node.view = view
    node.children[0].view = view
    setView(view)
  }, [])

  useEffect(() => {
    // Add unload to warn user
    if (!loggedIn) {
      window.addEventListener('beforeunload', e => {
        e.returnValue =
          'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.'
        return 'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.'
      })

      return () => {
        window.removeEventListener('beforeunload', e => {
          e.returnValue =
            'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.'
          return 'This page is asking you to confirm that you want to leave — information you’ve entered may not be saved.'
        })
      }
    }
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
