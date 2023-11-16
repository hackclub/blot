import type { CodePosition } from '../state.js'
import { EditorView, keymap, ViewUpdate } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { basicSetup } from 'codemirror'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { patchStore } from '../state.js'
import { EditorState, Transaction } from '@codemirror/state'
import { dispatchEditorChange } from '../events.js'
import { themeExtension } from './cmTheme.js'
import { vimModeExtension } from './cmVimMode.js'
import { errorIndicatorPlugin } from './errorIndicator.js'
import { createEvent } from '../events.ts'
import { widgetButtons } from "./widgetButtons.ts";

// this is a terrible hack but strange bugs are about this one
//@ts-expect-error

const autocompleteRemoved = basicSetup.filter((_, i) => ![11, 12].includes(i))

const theme = EditorView.theme({
  '.cm-content': {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-0)',
  },
  '.cm-gutter': {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-0)',
  }
})

const cmExtensions = [
  autocompleteRemoved,
  javascript(),
  keymap.of([indentWithTab]), // TODO: We should put a note about Esc+Tab for accessibility somewhere.
  indentUnit.of('  '),
  theme,
  EditorView.updateListener.of((v: ViewUpdate) => {
    if (v.docChanged) {
      dispatchEditorChange()
    }
  }),
  themeExtension(),
  vimModeExtension(),
  errorIndicatorPlugin(),
  widgetButtons
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
  // focus the editor
  view.focus()
}
