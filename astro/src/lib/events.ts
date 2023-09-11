function createEvent() {
  const events = []

  const dispatchEvent = () => {
    events.forEach(e => {
      e()
    })
  }

  const listenToEvent = fn => {
    events.push(fn)
  }

  return [listenToEvent, dispatchEvent]
}

// used for auto backup, dispatched on every change to editor content
export const [useOnEditorChange, dispatchEditorChange] = createEvent<void>()
