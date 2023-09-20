import { patchStore } from './state.ts'

import { addBezierControl } from './events/addBezierControl.js'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'
import { addSrcURLParam } from './events/addSrcURLParam.js'

export function init() {
  console.log('init')

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  addLoadBackup()
  // load src if present after default loading behavior
  addSrcURLParam()

  addBezierControl()
  addMachineControl()

  // get settings from localStorage

  const theme = localStorage.getItem('colorTheme') ?? 'light'

  // window.matchMedia('(prefers-color-scheme: dark)')
  //   ? "dark"
  //   : "light";

  patchStore({
    theme,
    vimMode: localStorage.getItem('vimMode') === 'true'
  })

  document.body.dataset.theme = theme
}
