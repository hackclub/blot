import { createListener } from '../createListener.js'
import { BezierEditor } from '../components/BezierEditor.tsx'
import { getStore } from '../state.ts'
import runCode from '../run.ts'
import { render } from 'preact'

export function addBezierControl() {
  const listen = createListener(document.body)

  const { view } = getStore()

  let realEl = null

  listen('mousedown', '', e => {
    if (realEl === null) return
    if (e.target.closest('[data-bezier-editor]')) return

    realEl.remove()
    realEl = null
  })

  listen('mousedown', '[data-beziereasing]', e => {
    if (realEl !== null) realEl.remove()

    const { startIndex, endIndex, argsString, argsStart, argsEnd } =
      e.target.dataset

    let parsedJSON
    try {
      const parseAttempt = argsString
        .replaceAll(/[\[\]\s]/g, '')
        .split(',')
        .map(Number)

      if (parseAttempt.some(x => isNaN(x))) throw new Error()

      const [yStart, p0x, p0y, p1x, p1y, yEnd] = parseAttempt

      parsedJSON = [yStart, [p0x, p0y], [p1x, p1y], yEnd]
    } catch (err) {
      console.log(err)
      parsedJSON = [0, [0.5, 0.5], [0.5, 0.5], 0]
    }

    const bezierInitialValue = {
      yStart: parsedJSON[0],
      p0: parsedJSON[1],
      p1: parsedJSON[2],
      yEnd: parsedJSON[3]
    }

    let end = Number(argsEnd)
    const bezierOnChange = value => {
      const str = `${value.yStart.toFixed(3)}, [${value.p0
        .map(x => x.toFixed(3))
        .join(',')}], [${value.p1
        .map(x => x.toFixed(3))
        .join(',')}], ${value.yEnd.toFixed(3)}`
      view.dispatch({
        changes: {
          from: argsStart,
          to: end,
          insert: str
        }
      })

      // run code
      runCode()

      end = Number(argsStart) + str.length
    }

    realEl = jsxToDOM(
      <BezierEditor
        initialValue={bezierInitialValue}
        onChange={bezierOnChange}></BezierEditor>
    )

    positionElementUnderneath(realEl, e.target)
  })

  let draggedElement = null
  let svg = null
  let container = null

  listen('mousedown', '.bez-handle', e => {
    draggedElement = e.target
    svg = draggedElement.ownerSVGElement
    container = draggedElement.closest('.bez-ctrl')
  })

  listen('mousemove', '.bez-ctrl, .bez-ctrl *', e => {
    if (draggedElement === null || svg === null) return

    let pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY

    // Transform the point from screen coordinates to SVG coordinates
    let svgP = pt.matrixTransform(svg.getScreenCTM().inverse())

    let x = svgP.x
    let y = svgP.y

    x = Math.max(x, 0)
    x = Math.min(x, 1)
    y = Math.max(y, -1)
    y = Math.min(y, 1)

    if (draggedElement.classList.contains('start')) {
      container.pointRef.yStartView = y
      container.change()
    }

    if (draggedElement.classList.contains('end')) {
      container.pointRef.yEndView = y
      container.change()
    }

    if (draggedElement.classList.contains('h0')) {
      container.pointRef.p0xView = x
      container.pointRef.p0yView = y
      container.change()
    }

    if (draggedElement.classList.contains('h1')) {
      container.pointRef.p1xView = x
      container.pointRef.p1yView = y
      container.change()
    }

    e.preventDefault()
    e.stopPropagation()
  })

  listen('mouseup', '', () => {
    draggedElement = null
    svg = null
    container = null
  })
}

function positionElementUnderneath(el1, el2) {
  if (!el1 || !el2) return

  document.body.appendChild(el1)

  const positionElement = () => {
    const rect = el2.getBoundingClientRect()

    el1.style.position = 'absolute'
    el1.style.top = `${rect.bottom + window.scrollY}px`
    el1.style.left = `${rect.left + window.scrollX}px`
  }

  positionElement() // Initial position

  document.addEventListener('scroll', positionElement, true)
  window.addEventListener('resize', positionElement)

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (!document.contains(el1) || !document.contains(el2)) {
        document.removeEventListener('scroll', positionElement, true)
        window.removeEventListener('resize', positionElement)
        observer.disconnect()
      }
    })
  })

  observer.observe(document.body, { childList: true, subtree: true })
}

function jsxToDOM(jsx) {
  const container = document.createElement('div')
  render(jsx, container)
  return container.firstChild
}
