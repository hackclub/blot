import { patchStore } from './state.ts'

import { defaultProgram } from './defaultProgram.js'

import { addBezierControl } from './events/addBezierControl.js'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'
import { addSrcURLParam } from './events/addSrcURLParam.js'

export function init() {
  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view }, false);

  addLoadBackup()
  // load src if present after default loading behavior
  addSrcURLParam()

  addBezierControl()
  addMachineControl()


  // get settings from localStorage
  // const theme = Number(localStorage.getItem('colorTheme')) ??
  //     window.matchMedia('(prefers-color-scheme: dark)')
  //       ? "dark"
  //       : "light";

  // patchStore({
  //   theme,
  //   vimMode: localStorage.getItem('vimMode') === 'true'
  // })

  // document.body.dataset.theme = theme;
}
