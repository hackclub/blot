import { type CodePosition } from '../state/state'
import { EditorView, keymap, ViewUpdate } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { basicSetup } from 'codemirror'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { EditorState, Transaction } from '@codemirror/state'
import { manualChangeSinceLiveUpdate } from './liveUpdate'
import { dispatchEditorChange } from '../events/events'
import { themeExtension } from './cmTheme'
import { vimModeExtension } from './cmVimMode'
import { numberScrubbingPlugin } from './numberScrubbing'
import { errorIndicatorPlugin } from './errorIndicator'
import { widgetsPlugin } from './widgets'
import { createEvent } from '../events/events'

// This is terrible hack but strange bugs are about this one
// @ts-expect-error
const autocompleteRemoved = basicSetup.filter((_, i) => ![11, 12].includes(i))

const theme = EditorView.theme({
  '.cm-content': {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-0)'
  },
  '.cm-gutter': {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-0)'
  }
})

const cmExtensions = [
  autocompleteRemoved,
  javascript(),
  keymap.of([indentWithTab]),
  indentUnit.of('  '),
  theme,
  EditorView.updateListener.of((v: ViewUpdate) => {
    if (v.docChanged) {
      if (
        v.transactions.find(
          t => t.annotation(Transaction.userEvent) !== undefined
        )
      )
        manualChangeSinceLiveUpdate.value = true
      dispatchEditorChange()
    }
  }),
  themeExtension(),
  vimModeExtension(),
  numberScrubbingPlugin,
  errorIndicatorPlugin(),
  widgetsPlugin
]

export const createCMState = (doc = '') =>
  EditorState.create({ extensions: cmExtensions, doc })

export const [useOnJumpTo, dispatchJumpTo] = createEvent<CodePosition>()

export const viewJumpTo = (pos: CodePosition, view: EditorView) => {
  const offset = view.state.doc.line(pos.line).from + pos.column
  view.dispatch({
    selection: {
      anchor: offset,
      head: offset
    },
    effects: EditorView.scrollIntoView(offset, {
      y: 'center'
    })
  })
  // Focus the editor
  view.focus()
}
