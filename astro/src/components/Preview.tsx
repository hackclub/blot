import { useRef, useEffect, useCallback } from 'preact/hooks'
import styles from './Preview.module.css'
import { getStore, useStore } from '../lib/state.ts'
import CenterToFitIcon from '../ui/CenterToFitIcon.tsx'
import Button from '../ui/Button.tsx'
import type { Point } from '../lib/drawingToolkit/index.js'
import lineclip from '../lib/lineclip.ts'

import { createListener } from '../lib/createListener.js'

export default function Preview(props: { className?: string }) {
  const { turtles, docDimensions } = useStore(['turtles', 'docDimensions'])

  useEffect(init, [])

  useEffect(() => {
    const canvas = document.querySelector('.main-canvas')
    requestRedraw(canvas)
  }, [turtles, docDimensions])

  return (
    <div class={styles.root}>
      <canvas class={`${styles.canvas} ${props.className} main-canvas`} />
      <div class={`${styles.mousePosition} mouse-position`} />
      <Button
        class={`${styles.centerButton} center-view-trigger`}
        variant="ghost"
        icon
        aria-label="center document in view">
        <CenterToFitIcon />
      </Button>
    </div>
  )
}

function init() {
  const canvas = document.querySelector('.main-canvas')

  const bodyListener = createListener(document.body)
  const canvasListener = createListener(canvas)

  canvasListener(
    'wheel',
    '',
    (e: WheelEvent) => {
      e.preventDefault()

      const ZOOM_SPEED = 0.0005

      const { panX, panY, scale } = panZoomParams

      // const newScale = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, scale + e.deltaY * -ZOOM_SPEED));
      const newScale = scale + scale * (-e.deltaY * ZOOM_SPEED)

      const br = canvas.getBoundingClientRect()
      const fixedPoint = { x: e.clientX - br.left, y: e.clientY - br.top }
      panZoomParams.panX =
        fixedPoint.x + (newScale / scale) * (panX - fixedPoint.x)
      panZoomParams.panY =
        fixedPoint.y + (newScale / scale) * (panY - fixedPoint.y)
      panZoomParams.scale = newScale

      requestRedraw(canvas)
    },
    { passive: false }
  )

  canvasListener('mousemove', '', (e: MouseEvent) => {
    // update mousepos
    const mousePos = document.querySelector('.mouse-position') // mousePosRef.current;

    if (mousePos) {
      // convert mouse pos to virtual coords (accounting for zoom, scale)
      const { panX, panY, scale } = panZoomParams
      const br = canvas.getBoundingClientRect()
      let x = e.clientX - br.left
      x = (x - panX) / scale
      let y = e.clientY - br.top
      y = -(y - panY) / scale
      const addPadding = (s: string) => (s.startsWith('-') ? s : ' ' + s)
      mousePos.textContent = `${addPadding(x.toFixed(1))}mm, ${addPadding(
        y.toFixed(1)
      )}mm`
    }

    if (e.buttons !== 1) return
    e.preventDefault()

    panZoomParams.panX += e.movementX
    panZoomParams.panY += e.movementY

    requestRedraw(canvas)
  })

  bodyListener('click', '', e => {
    // check if contained in element with this selector string
    if (!e.target.closest('.center-view-trigger')) return

    const { docDimensions } = getStore()

    if (!canvas) return

    const br = canvas.getBoundingClientRect()
    panZoomParams.scale = Math.min(
      (br.width - 20) / docDimensions.width,
      (br.height - 20) / docDimensions.height
    )

    panZoomParams.panX =
      br.width / 2 - (docDimensions.width * panZoomParams.scale) / 2
    panZoomParams.panY =
      br.height / 2 + (docDimensions.height * panZoomParams.scale) / 2

    requestRedraw(canvas)
  })

  const resizeObserver = new ResizeObserver(entries => {
    const { width, height } = entries[0].contentRect
    dpr = window.devicePixelRatio || 1
    canvas.width = width * dpr
    canvas.height = height * dpr
    setCtxProperties() // setting width/height clears ctx state

    requestRedraw(canvas)
  })

  resizeObserver.observe(canvas)
}

// drawing function

const panZoomParams = {
  panX: 200,
  panY: 200,
  scale: 100
}

let dpr = typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1

const requestRedraw = (canvas: HTMLCanvasElement) => {
  requestAnimationFrame(() => {
    _redraw(canvas)
  })
}

let _ctx: CanvasRenderingContext2D | null = null

const setCtxProperties = () => {
  if (!_ctx) return

  _ctx!.lineWidth = 1
  _ctx!.lineJoin = 'round'
  _ctx!.lineCap = 'round'
}
const getCtx = (canvas: HTMLCanvasElement) => {
  if (!_ctx) {
    _ctx = canvas.getContext('2d')
    setCtxProperties()
  }
  return _ctx!
}

const _redraw = (canvas: HTMLCanvasElement) => {
  const {
    turtlePos,
    turtles,
    docDimensions: { width: docW, height: docH }
  } = getStore()
  if (!canvas || !turtlePos) return

  // we want to only work in virtual pixels, and just deal with device pixels in rendering
  const width = canvas.width /* / dpr*/
  const height = canvas.height /* / dpr*/

  // turtle canvas
  const ctx = getCtx(canvas)

  ctx.clearRect(0, 0, width, height)

  // DRAW TURTLE
  // ctx.beginPath();
  // ctx.arc(
  //     dpr * (panZoomParams.panX + turtlePos[0] * panZoomParams.scale),
  //     dpr * (panZoomParams.panY + (-1 * turtlePos[1]) * panZoomParams.scale),
  //     dpr * 7,
  //     0,
  //     2 * Math.PI
  // );
  // ctx.strokeStyle = "white";
  // ctx.stroke();
  // ctx.fillStyle = "#ffa500";
  // ctx.fill();

  // draw document

  ctx.strokeStyle = '#3333ee'

  ctx.strokeRect(
    dpr * panZoomParams.panX,
    dpr * panZoomParams.panY,
    dpr * docW * panZoomParams.scale,
    -dpr * docH * panZoomParams.scale
  )

  // draw turtles

  ctx.strokeStyle = 'black'

  // turtle path
  // if(turtles.length === 0) return;
  const { panX, panY, scale } = panZoomParams

  ctx.beginPath()

  for (const turtle of turtles) {
    for (const polyline of turtle.path) {
      const p = polyline.map(([x, y]) => [
        dpr * (panX + x * scale),
        -(dpr * (-panY + y * scale))
      ])
      const paths = lineclip(p as Point[], [0, 0, width, height])

      paths.forEach(p => {
        for (let i = 0; i < p.length; i++) {
          let [x, y] = p[i]
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
      })
    }
  }

  ctx.stroke()
}
