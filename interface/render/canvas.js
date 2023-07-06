
var ctx;
// var gl;
// var gpu;
// var canvas;
// var boundRect;
// var resRatioX;
// var resRatioY;
// var glEnabled = false;
// var gpuEnabled = false;

export function initCanvas(state) {
  console.log("Canvas initialized");
  ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = false;
}

export function renderCanvas(state) {
  if (!ctx) return;
  // if (glEnabled) return renderGl(state);
  // if (gpuEnabled) return renderGpu(state);

  renderTurtleCanvas(state);
  if (state.turtles.length === 0) return;
  state.turtles.forEach(turtle => {
    for (const polyline of turtle.path) {
      ctx.beginPath();
      for (let i = 0; i < polyline.length; i++) {
        let [x, y] = polyline[i];
        x = state.panX + x * state.renderScaleX
        y = -state.panY + y * state.renderScaleY
        ctx.lineTo(x, -y)
      }
      ctx.stroke()
    }
  })
}

function renderTurtleCanvas(state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(state.panX + state.turtlePos[0] * state.renderScaleX, state.panY + state.turtlePos[1] * state.renderScaleY, 7, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(150, 255, 0, 1)";
  ctx.fill();
}
