import { createListener } from '../createListener.js'
import { getStore } from '../state.js'
import runCode from '../run.ts'

export function addNumberScrubbing() {
  const listen = createListener(document.body)

  const { view } = getStore()

  let dragging = false
  let number = 0
  let sigFigs = 0
  let from = 0
  let to = 0

  listen('mousedown', '', e => {
    const el = e.target.closest('[data-number-scrubber]')
    if (el === null) return

    dragging = true

    from = Number(el.dataset.from)
    to = Number(el.dataset.to)

    const numStr = view.state.doc.sliceString(from, to).replaceAll(' ', '')

    number = Number(numStr)
    sigFigs = numStr.split('.')[1]?.length ?? 0
  })

  listen('mousemove', '', e => {
    if (dragging === false) return
    if (e.buttons === 0) {
      dragging = false
      return
    }

    e.preventDefault()
    e.stopPropagation()

    document.body.style.cursor = 'ew-resize'

    number += sigFigs ? e.movementX * 10 ** (-1 * sigFigs) : e.movementX
    const newValue = number.toFixed(sigFigs)

    view.dispatch({
      changes: {
        from,
        to,
        insert: newValue
      }
    })

    to = from + newValue.length

    runCode()
  })

  listen('mouseup', '', e => {
    dragging = false
    document.body.style.cursor = 'default'
  })
}
