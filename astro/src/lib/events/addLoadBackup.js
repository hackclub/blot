import { useOnEditorChange } from '../events.ts'
import { getStore } from '../state.ts'

export function addLoadBackup() {
  const { view } = getStore()

  const backupString = localStorage.getItem('cache')

  const changes = {
    from: 0,
    insert: backupString ?? defaultProgram
  }

  view.dispatch({ changes })

  useOnEditorChange(backup)
}

function backup() {
  const { view } = getStore()

  const code = view.state.doc.toString()
  localStorage.setItem('cache', code)
}
