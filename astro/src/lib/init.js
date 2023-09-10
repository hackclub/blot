import { useOnEditorChange } from './events.ts'
import { getStore, useStore } from './state.ts'

import { addBezierControl } from './events/addBezierControl.js'
import { addMachineControl } from './events/addMachineControl.js'

export function init() {
  console.log('init')

  useOnEditorChange(backup)
  addBezierControl()
  addMachineControl()
}

function backup() {
  const { view } = getStore()

  const code = view.state.doc.toString()
  localStorage.setItem('cache', code)
}
