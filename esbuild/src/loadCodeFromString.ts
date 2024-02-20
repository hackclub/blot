import { getStore } from './state.ts'

export function loadCodeFromString(code: string) {
  const { view } = getStore()
  const current = view.state.doc.toString()

  const changes = {
    from: 0,
    to: current.length,
    insert: code
  }

  view.dispatch({ changes })
}
