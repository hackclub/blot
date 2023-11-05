import { patchStore, getStore } from '../state/state'
import { render } from '../render'
import { addBezierControl } from '../events/addBezierControl'
import { addMachineControl } from '../events/addMachineControl'
import { addLoadBackup } from '../client/addLoadBackup'

export function init() {
  render({ hard: true })

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  if (!window.getLoggedIn()) addLoadBackup()

  addBezierControl()
  addMachineControl()

  // Get settings from localStorage
  const theme = localStorage.getItem('colorTheme') ?? 'light'

  patchStore({
    theme,
    vimMode: localStorage.getItem('vimMode') === 'true'
  })

  document.body.dataset.theme = theme
}
