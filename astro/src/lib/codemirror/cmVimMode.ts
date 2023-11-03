import { Compartment } from '@codemirror/state'
import { getStore } from '../state/state'
import { vim } from '@replit/codemirror-vim'
import type { EditorView } from '@codemirror/view'
import { useEffect } from 'preact/hooks'

const vimModeCompartment = new Compartment()
export const vimModeExtension = () =>
  vimModeCompartment.of(getStore().vimMode() ? vim() : [])

export function useVimMode(view: EditorView | undefined | null) {
  const { vimMode } = getStore()

  useEffect(() => {
    if (!view) return
    view.dispatch({
      effects: vimModeCompartment.reconfigure(vimMode ? vim() : [])
    })
  })
}
