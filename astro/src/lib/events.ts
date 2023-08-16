import { createEvent } from 'niue'

// used for auto backup, dispatched on every change to editor content
export const [useOnEditorChange, dispatchEditorChange] = createEvent<void>()
