import { initMachineControl } from './machineControl.js'

import { useOnEditorChange } from './events.ts'
import { getStore, useStore } from './state.ts'

export function init() {
  console.log('init')
  initMachineControl()

  useOnEditorChange(backup);
}


function backup() {
  const { view } = getStore()

  const code = view.state.doc.toString()
  localStorage.setItem('cache', code)
}
