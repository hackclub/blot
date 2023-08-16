import { useEffect } from 'preact/hooks'
import { useOnEditorChange } from '../lib/events.ts'
import { getStore, useStore } from '../lib/state.ts'

const backup = () => {
  const { view } = getStore()

  const code = view.state.doc.toString()
  localStorage.setItem('cache', code)
}

export default function AutoBackup() {
  useOnEditorChange(backup, [])

  return null
}
