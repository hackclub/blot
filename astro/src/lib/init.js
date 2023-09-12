import { getStore, useStore, patchStore } from './state.ts'

import { defaultProgram } from './defaultProgram.js'

import { addBezierControl } from './events/addBezierControl.js'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'

export function init() {
  console.log('init')

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  addLoadBackup()
  addBezierControl()
  addMachineControl()
}
