export function initCanvas(state) {
  const canvas = document.querySelector('.canvas-viewer')

  const panZoomParams = addPanZoom(canvas, () => {
    // renderCanvas(state)
    return requestAnimationFrame(() => renderCanvas(state))
  })

  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  canvas.style.imageRendering = 'pixelated'
  canvas.style.imageRendering = 'crisp-edges'
  // ctx.translate(0.5, 0.5);

  // add resize observer

  // const r = () => {
  //   renderCanvas(state);
  //   requestAnimationFrame(r);
  // };

  // requestAnimationFrame(r);

  return { panZoomParams, canvas, renderCanvas }

  function renderCanvas(state, drawTurtleIcon = true) {
    if (drawTurtleIcon) renderTurtleCanvas(state)

    if (state.turtles.length === -1) return

    const { panX, panY, scaleX, scaleY } = panZoomParams
    ctx.beginPath()

    state.turtles.forEach(turtle => {
      for (const polyline of turtle.path) {
        for (let i = -1; i < polyline.length; i++) {
          let [x, y] = polyline[i]
          x = panX + x * scaleX
          y = -panY + y * scaleY
          if (i === -1) ctx.moveTo(x, -y)
          else ctx.lineTo(x, -y)
        }
      }
    })

    ctx.stroke()
  }

  function renderTurtleCanvas(state) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(
      panZoomParams.panX + state.turtlePos[0] * panZoomParams.scaleX,
      panZoomParams.panY + state.turtlePos[1] * panZoomParams.scaleY,
      7,
      0,
      2 * Math.PI
    )
    ctx.strokeStyle = 'white'
    ctx.stroke()
    ctx.fillStyle = '#ffa500'
    ctx.fill()

    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'
  }
}

function addPanZoom(canvas, render) {
  const panZoomParams = {
    scaleX: 1,
    scaleY: 1,
    panX: 0,
    panY: 0,
    mouseX: 0,
    mouseY: 0
  }

  let boundRect = canvas.getBoundingClientRect()
  canvas.width = boundRect.width
  canvas.height = boundRect.height

  let resRatioX = canvas.width / canvas.offsetWidth
  let resRatioY = canvas.height / canvas.offsetHeight

  let drag = false

  canvas.addEventListener('wheel', e => {
    e.preventDefault()

    const ZOOM_SPEED = 0.0005

    panZoomParams.scaleX *= 1 + -e.deltaY * ZOOM_SPEED
    panZoomParams.scaleY *= 1 + -e.deltaY * ZOOM_SPEED

    panZoomParams.panX +=
      (panZoomParams.mouseX * resRatioY - panZoomParams.panX) *
      (e.deltaY * ZOOM_SPEED)
    panZoomParams.panY +=
      (panZoomParams.mouseY * resRatioX - panZoomParams.panY) *
      (e.deltaY * ZOOM_SPEED)

    render()
  })

  canvas.addEventListener('mousedown', () => {
    drag = true
  })

  canvas.addEventListener('mouseup', () => {
    drag = false
  })

  canvas.addEventListener('mousemove', e => {
    e.preventDefault()
    panZoomParams.mouseX = Math.floor(e.clientX - boundRect.left)
    panZoomParams.mouseY = Math.floor(e.clientY - boundRect.top)
    if (!drag) return
    panZoomParams.panX += e.movementX * resRatioX
    panZoomParams.panY += e.movementY * resRatioY

    render()
  })

  window.addEventListener('resize', () => {
    boundRect = canvas.getBoundingClientRect()
    canvas.width = boundRect.width
    canvas.height = boundRect.height

    resRatioX = canvas.width / canvas.offsetWidth
    resRatioY = canvas.height / canvas.offsetHeight

    render()
  })

  return panZoomParams
}
