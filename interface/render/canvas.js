

export function initCanvas(state) {
  const canvas = document.querySelector(".canvas-viewer");

  const panZoomParams = addPanZoom(canvas);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;

  panZoomParams.ctx = ctx;
  panZoomParams.canvas = canvas;

  const r = () => {
    renderCanvas(state, panZoomParams);
    requestAnimationFrame(r);
  };

  requestAnimationFrame(r);
}

export function renderCanvas(state, panZoomParams) {

  renderTurtleCanvas(state, panZoomParams);

  if (state.turtles.length === 0) return;

  const { ctx } = panZoomParams;

  state.turtles.forEach(turtle => {
    for (const polyline of turtle.path) {
      ctx.beginPath();
      for (let i = 0; i < polyline.length; i++) {
        let [x, y] = polyline[i];
        x = panZoomParams.panX + x * panZoomParams.renderScaleX
        y = -panZoomParams.panY + y * panZoomParams.renderScaleY
        ctx.lineTo(x, -y)
      }
      ctx.stroke()
    }
  })
}

function renderTurtleCanvas(state, panZoomParams) {
  const { ctx, canvas } = panZoomParams;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(
    panZoomParams.panX + state.turtlePos[0] * panZoomParams.renderScaleX, 
    panZoomParams.panY + state.turtlePos[1] * panZoomParams.renderScaleY, 
    7, 
    0, 
    2 * Math.PI
  );
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(150, 255, 0, 1)";
  ctx.fill();
}

export function addPanZoom(canvas) {

  const panZoomParams = {
    renderScaleX: 1,
    renderScaleY: 1,
    panX: 0,
    panY: 0,
    mouseX: 0,
    mouseY: 0,
  }

  let boundRect = canvas.getBoundingClientRect();
  let resRatioX = canvas.width / canvas.offsetWidth;
  let resRatioY = canvas.height / canvas.offsetHeight;

  let drag = false;

  canvas.addEventListener("wheel", e => {
    e.preventDefault();

    panZoomParams.renderScaleX *= 1 + (-e.deltaY * 0.0005);
    panZoomParams.renderScaleY *= 1 + (-e.deltaY * 0.0005);


    panZoomParams.panX += (panZoomParams.mouseX * resRatioY - panZoomParams.panX) * (e.deltaY * 0.0001);
    panZoomParams.panY += (panZoomParams.mouseY * resRatioX - panZoomParams.panY) * (e.deltaY * 0.0001);
  })

  canvas.addEventListener('mousedown', () => {
    drag = true;
  });

  canvas.addEventListener('mouseup', () => {
    drag = false;
  });


  canvas.addEventListener("mousemove", e => {
    e.preventDefault();
    panZoomParams.mouseX = Math.floor((e.clientX - boundRect.left));
    panZoomParams.mouseY = Math.floor((e.clientY - boundRect.top));
    if (!drag) return;
    panZoomParams.panX += e.movementX * resRatioX;
    panZoomParams.panY += e.movementY * resRatioY;
  })

  window.addEventListener("resize", () => {
    boundRect = canvas.getBoundingClientRect();
    resRatioX = canvas.width / canvas.offsetWidth;
    resRatioY = canvas.height / canvas.offsetHeight;
  });

  return panZoomParams;
}
