import { useEffect } from 'preact/hooks'
import { getStore } from '../lib/state.ts'

export default function GlobalStateDebugger() {
  const state = getStore();

  useEffect(() => {
    //@ts-expect-error
    globalThis['_globalState'] = state
  })

  return null
}
