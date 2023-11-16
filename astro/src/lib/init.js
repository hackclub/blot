<<<<<<< HEAD
import { patchStore, getStore } from './state'
import { render } from './render'
import { addBezierControl } from './events/addBezierControl'
import { addMachineControl } from './events/addMachineControl'
=======
import { patchStore, getStore } from './state.ts'
import { render } from './render.tsx'

import { addBezierControl } from './events/addBezierControl.js'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'
import { addSrcURLParam } from './events/addSrcURLParam.js'
import { addNumberScrubbing } from './events/addNumberScrubbing.ts'
import { saveFile } from "./saveFile.ts";
import { useOnEditorChange } from "./events.ts";

>>>>>>> 6158dc609ed916990626f6b9e726c95d8ee6cdf9

export function init() {
  render({ hard: true })

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  addBezierControl()
  addMachineControl()
  addNumberScrubbing()

  // Get settings from localStorage
  const theme = localStorage.getItem('colorTheme') ?? 'light'

  patchStore({
    theme,
    vimMode: localStorage.getItem('vimMode') === 'true'
  })

  document.body.dataset.theme = theme
}
