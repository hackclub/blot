// boundRect = canvas.getBoundingClientRect();
// resRatioX = canvas.width / canvas.offsetWidth;
// resRatioY = canvas.height / canvas.offsetHeight;

export function addCanvasPanZoom(state) {
  // renderScaleX: 1,
  // renderScaleY: 1,
  // panX: 0,
  // panY: 0,
  // mouseX: 0,
  // mouseY: 0,

  // const canvas =

  canvas.addEventListener('wheel', e => {
    e.preventDefault()

    state.renderScaleX *= 1 + -e.deltaY * 0.0001
    state.renderScaleY *= 1 + -e.deltaY * 0.0001

    if (glEnabled || gpuEnabled) {
      state.panX +=
        (state.mouseX * resRatioX - state.panX - canvas.width / 2) *
        (e.deltaY * 0.0001)
      state.panY +=
        (state.mouseY * resRatioY - state.panY - canvas.height / 2) *
        (e.deltaY * 0.0001)
    } else {
      state.panX +=
        (state.mouseX * resRatioY - state.panX) * (e.deltaY * 0.0001)
      state.panY +=
        (state.mouseY * resRatioX - state.panY) * (e.deltaY * 0.0001)
    }
  })

  canvas.addEventListener('mouseup', () => (state.drag = false))
  canvas.addEventListener('mousedown', () => (state.drag = true))

  canvas.addEventListener('mousemove', e => {
    e.preventDefault()
    state.mouseX = Math.floor(e.clientX - boundRect.left)
    state.mouseY = Math.floor(e.clientY - boundRect.top)
    if (!state.drag) return
    state.panX += e.movementX * (glEnabled | gpuEnabled ? resRatioX : resRatioX)
    state.panY += e.movementY * (glEnabled | gpuEnabled ? resRatioY : resRatioY)
    // renderCanvas(state)
  })

  window.addEventListener('resize', () => {
    boundRect = canvas.getBoundingClientRect()
    resRatioX = canvas.width / canvas.offsetWidth
    resRatioY = canvas.height / canvas.offsetHeight
  })
}
