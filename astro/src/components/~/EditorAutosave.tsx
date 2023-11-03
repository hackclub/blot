import { useOnEditorChange } from '../../lib/events'
import type { PersistenceState } from '../../lib/state/persist'
import { getStore } from '../../lib/state/state'
import { debounce } from 'throttle-debounce'
import { Signal, useSignalEffect } from '@preact/signals'

let lastSavePromise = Promise.resolve()
let saveQueueSize = 0
export const saveArt = debounce(
  800,
  (persistenceState: Signal<PersistenceState>, code: string) => {
    const doSave = async () => {
      let isError = false
      try {
        const art =
          persistenceState.value.kind === 'PERSISTED' &&
          persistenceState.value.art !== 'LOADING'
            ? persistenceState.value.art
            : null
        const res = await fetch('/api/art/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            artId: art?.id,
            tutorialName: art?.tutorialName,
            tutorialIndex: art?.tutorialIndex
          })
        })
        if (!res.ok) throw new Error(`Error saving game: ${await res.text()}`)
      } catch (error) {
        console.error(error)
        isError = true
      }

      saveQueueSize--
      if (saveQueueSize === 0 && persistenceState.value.kind === 'PERSISTED')
        persistenceState.value = {
          ...persistenceState.value,
          cloudSaveState: isError ? 'ERROR' : 'SAVED'
        }
    }

    saveQueueSize++
    lastSavePromise = (lastSavePromise ?? Promise.resolve()).then(doSave)
  }
)

export default function EditorAutosave({ persistenceState }) {
  useOnEditorChange(() => {
    persistenceState.value = {
      ...persistenceState.value,
      stale: true
    }
    if (persistenceState.value.kind === 'PERSISTED') {
      persistenceState.value = {
        ...persistenceState.value,
        cloudSaveState: 'SAVING'
      }
      const { view } = getStore()
      saveArt(persistenceState, view.state.doc.toString())
    }

    if (persistenceState.value.kind === 'IN_MEMORY') {
      // Save in memory!
    }
  })

  // Warn before leave
  useSignalEffect(() => {
    let needsWarning = false
    if (['SHARED', 'IN_MEMORY'].includes(persistenceState.value.kind)) {
      needsWarning = persistenceState.value.stale
    } else if (
      persistenceState.value.kind === 'PERSISTED' &&
      persistenceState.value.stale &&
      persistenceState.value.art !== 'LOADING'
    ) {
      needsWarning = persistenceState.value.cloudSaveState !== 'SAVED'
    }

    if (needsWarning) {
      const onBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault()
        event.returnValue = ''
        return ''
      }
      window.addEventListener('beforeunload', onBeforeUnload)
      return () => window.removeEventListener('beforeunload', onBeforeUnload)
    } else return () => {}
  })

  return null
}
