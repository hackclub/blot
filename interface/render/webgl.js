
function initGl() {
  gl.viewport(0, 0, canvas.width, canvas.height);
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, `
  #version 100
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position.x, position.y, 0.0, 1.0);
  }
`);
  gl.compileShader(vertexShader);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader,`
  #version 100
  void main() {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
  `);
  gl.compileShader(fragmentShader);
  let program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  gl.enableVertexAttribArray(0);
  initializeAttributes();
  gl.useProgram(program);
  gl.lineWidth(1);
}

function initializeAttributes() {
  gl.enableVertexAttribArray(0);
  let buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0]), gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}

export function renderGl(state) {
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  if (state.turtles.length === 0) return;
  state.turtles.forEach(turtle => {
    let path = []
    for (const polyline of turtle.path) {
      for (let i = 0; i < polyline.length; i++) {
        let [x, y] = polyline[i];
        x = (state.panX + x * state.renderScaleX)
        y = (state.panY + y * state.renderScaleY)
        path.push((x / canvas.width), (y / canvas.height))
      }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(path), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINE_STRIP, 0, path.length / 2);
  })
}