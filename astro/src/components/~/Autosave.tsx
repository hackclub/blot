import { useOnEditorChange } from '../../lib/events/events'
import type { PersistenceState } from '../../lib/state/persist'
import { getStore } from '../../lib/state/state'
import { debounce } from 'throttle-debounce'
import { Signal, useSignalEffect } from '@preact/signals'

export default function EditorAutosave({ persistenceState }) {
  useOnEditorChange(() => {
    console.log(persistenceState)
  })

  return null
}
