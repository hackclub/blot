import { render } from "lit-html";
import { createListener } from "./createListener.js";
import { view } from "./view.js";
import { svgViewer } from "./view.js";
import { runCode, runMachineHelper } from "./runCode.js";
import { runCommand } from "./runCommand.js";
import { addCaching } from "./addCaching.js";
import { addDropUpload } from "./addDropUpload.js";
import { addNumberDragging } from "./addNumberDragging.js";
import { downloadText } from "./download.js";

import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";

import { createHaxidraw } from "./haxidraw/createHaxidraw.js";

var ctx;
var gl;
var gpu;
var canvas;
var boundRect;
var resRatioX;
var resRatioY;
var glEnabled = false;
var gpuEnabled = false;

// WebGPU stuff
var shaders, device, commandEncoder, renderPipeline, renderPassDescriptor, vertexBuffer, vertices, vertexBuffers, passEncoder;

export function init(state) {
  const r = () => {
    render(view(state), document.body);
    renderCanvas(state);
  };

  const execute = () => {
    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => r());
  }

  state.execute = execute;
  state.render = r;
  r();
  
  const root = document.querySelector(".root");
  canvas = document.getElementById("view");
  
  // gpu = canvas.getContext("webgpu") 

//   if (gpu === null) {
//   gl = null//canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
//   if (gl === null) {
//     console.log("Canvas initialized");
//     ctx = canvas.getContext("2d");
//     ctx.imageSmoothingEnabled = false;
//   } else {
//     state.panX -= canvas.width/2;
//     state.panY += canvas.height/2;
//     console.log("WebGL initialized");
//     glEnabled = true;
//     initGl();
//   }
// } else {
//   state.panX -= canvas.width/2;
//   state.panY -= canvas.height/2;
//   initGpu();
//   gpuEnabled = true;
//   renderGpu(state);
//   console.log("WebGPU initialized");
// }

    console.log("Canvas initialized");
    ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
  boundRect = canvas.getBoundingClientRect();
  resRatioX = canvas.width / canvas.offsetWidth;
  resRatioY = canvas.height / canvas.offsetHeight;

  //const panZoom = addPanZoom(root.querySelector("svg"));

  //panZoom.setScaleXY({
  //  x: [-5, 5],
  //  y: [-5, 5]
  //});

  const editorContainer = document.querySelector(".dictionary");

  const extensions = [
    basicSetup, 
    javascript(),
    keymap.of([indentWithTab]),
    indentUnit.of("  ")
  ]

  const editor = new EditorView({
    extensions,
    parent: editorContainer
  })

  state.codemirror = editor;

  addCaching(state);
  addDropUpload(root, state);
  addNumberDragging(root, state);

  canvas.addEventListener("wheel", e => {
    e.preventDefault();
    state.scaleX *= 1 + (-e.deltaY * 0.0001);
    state.scaleY *= 1 + (-e.deltaY * 0.0001);
    console.log(resRatioX, resRatioY)
    if (glEnabled || gpuEnabled) {
      state.panX += (state.mouseX * resRatioX - state.panX - canvas.width/2) * (e.deltaY * 0.0001);
      state.panY += (state.mouseY * resRatioY - state.panY - canvas.height/2) * (e.deltaY * 0.0001);
    } else {
      state.panX += (state.mouseX * resRatioY - state.panX) * (e.deltaY * 0.0001);
      state.panY += (state.mouseY * resRatioX - state.panY) * (e.deltaY * 0.0001);
    }
    // renderCanvas(state)
  })

  canvas.addEventListener('mouseup', () => state.drag = false);
  canvas.addEventListener('mousedown', () => state.drag = true);

  canvas.addEventListener("mousemove", e => {
    e.preventDefault();
    state.mouseX = Math.floor((e.clientX - boundRect.left));
    state.mouseY = Math.floor((e.clientY - boundRect.top));
    if (!state.drag) return;
    state.panX += e.movementX * ((glEnabled | gpuEnabled) ? resRatioX : resRatioX);
    state.panY += e.movementY * ((glEnabled | gpuEnabled) ? resRatioY : resRatioY);
    // renderCanvas(state)
  })

  window.addEventListener("resize", () => {
    boundRect = canvas.getBoundingClientRect();
    resRatioX = canvas.width / canvas.offsetWidth;
    resRatioY = canvas.height / canvas.offsetHeight;
  }
);

  root.addEventListener("keydown", e => {
    const isEnter = e.keyCode === 13;
    const activeEl = document.activeElement;
    const isCmd = activeEl.matches(".line-input");
    if (isCmd && isEnter) {
      const cmd = activeEl.innerText;
      runCommand(cmd, state).then(() => r());
      activeEl.innerText = "";
      e.preventDefault();
    };

    if (e.keyCode === 13 && e.shiftKey) {
      const code = editor.state.doc.toString();   
      runCode(code, state).then(() => r());
      e.preventDefault();
    }

    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      const code = editor.state.doc.toString();
      downloadText(`${state.filename}.js`, code);
      // renderCanvas(state)
    }
  })

  const listener = createListener(root);

  /* <button class="set-origin-trigger">set origin</button> */

  // listener("click", ".set-origin-trigger", () => {
  //   if (!machine) return;
  //   machine.setPosition([0, 0]); 
  // });

  listener("click", ".run-trigger", () => {
    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => r());
    // renderCanvas(state);
  });


  listener("click", ".run-machine-trigger", () => {
    const runMachine = () => runMachineHelper(state, [state.scaleX, state.scaleY]);

    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => {
      r();
      if (!state.haxidraw) {
        console.log("not connected");
        return;
      }
      runMachine();
    });
  });

  listener("click", ".connect-trigger", async () => {
    if (!navigator.serial) {
      alert(
        "🚨 Your browser doesn't seem to support the Web Serial API, which is required for the Haxidraw editor to connect to the machine. Chrome Version 89 or above is the recommended browser."
      ) 
    }
    if (!state.haxidraw) { // connect
      navigator.serial
        .requestPort({ filters: [] })
        .then(async (port) => {
          console.log("connecting");
          state.haxidraw = await createHaxidraw(port);


          state.haxidraw.goTo = async (x, y) => {
            await state.haxidraw.goTo(x*scaleX, y*scaleY);
            state.turtlePos = [x, y];
          } 

          console.log(state.haxidraw);
          r();
        })
        .catch((e) => {
          // The user didn't select a port.
        }); 
    } else { // disconnect
      console.log("disconnecting");
      await state.haxidraw.port.close();
      state.haxidraw = null;
      state.turtlePos = [0, 0];
      // renderCanvas(state);
      r();
    }

  });

  listener("click", ".save-trigger", () => {
    const code = editor.state.doc.toString();
    downloadText(`${state.filename}.js`, code);
  });

 
  listener("click", ".filename-trigger", () => {
    let newName = prompt("Please provide a new filename.", state.filename);
    // if (newName !== null) newName = newName.replaceAll(/\s/g, "-");
    if (newName !== "" && newName !== null) {
      state.filename = newName;
      localStorage.setItem('filename', newName);
    }
    r();
  });

  listener("click", ".export-trigger", () => {
    document.body.insertAdjacentHTML("beforeend", `${svgViewer(state, resRatioX, resRatioY)}`);
    let svg = document.getElementsByClassName("svg-viewer")[0];
    const svgString = new XMLSerializer().serializeToString(svg);
    downloadText(`${state.filename}.svg`,svgString);
    svg.remove();
  });


  automaticallyConnect(state);


  const search = window.location.search;
  const run = new URLSearchParams(search).get("run");
  if (run === "true") {
    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => r());
  }

}

async function automaticallyConnect(state) {
  const ports = await navigator.serial.getPorts();

  ports.forEach(async (port) => {
    const info = port.getInfo();

    if (info.usbVendorId === 11914) {
      state.haxidraw = await createHaxidraw(port);
      state.render();
    }
  })

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
        x = state.panX + x * state.scaleX
        y = state.panY + y * state.scaleY
        ctx.lineTo(x, y)
      }
      ctx.stroke()
    }
  })
}

function renderTurtleCanvas(state) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(state.panX + state.turtlePos[0] * state.scaleX, state.panY + state.turtlePos[1] * state.scaleY, 7, 0, 2 * Math.PI);
  ctx.strokeStyle = "white";
  ctx.stroke();
  ctx.strokeStyle = "black";
  ctx.fillStyle = "rgba(255, 255, 0, 1)";
  ctx.fill();
}


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
        x = (state.panX + x * state.scaleX)
        y = (state.panY + y * state.scaleY)
        path.push((x / canvas.width), (y / canvas.height))
      }
    }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(path), gl.STATIC_DRAW);
    gl.drawArrays(gl.LINE_STRIP, 0, path.length / 2);
  })
}

async function renderGpu(state) {
  commandEncoder = device.createCommandEncoder();
  const clearColor = { r: 0.9, g: 0.9, b: 0.9, a: 1.0 };

  renderPassDescriptor = {
    colorAttachments: [
      {
        clearValue: clearColor,
        loadOp: "clear",
        storeOp: "store",
        view: gpu.getCurrentTexture().createView(),
      },
    ],
  };
  passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
  passEncoder.setPipeline(renderPipeline);
  if (state.turtles.length === 0) return;
  let path = []
  state.turtles.forEach(turtle => {
    for (const polyline of turtle.path) {
      for (let i = 0; i < polyline.length; i++) {
        let [x, y] = polyline[i];
        x = (state.panX + x * state.scaleX)
        y = (state.panY + y * state.scaleY)
        path.push((2 * x / canvas.width), (-2 * y / canvas.height), 1, 1, 1, 1, 1, 1)
      }
    }

  })
  vertices = new Float32Array(path);
  vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  
  device.queue.writeBuffer(vertexBuffer, 0, vertices);
  passEncoder.setVertexBuffer(0, vertexBuffer);
  passEncoder.draw(vertices.length/8);
  passEncoder.end();
  device.queue.submit([commandEncoder.finish()]);
}

async function initGpu() {
  if (!navigator.gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  device = await adapter.requestDevice();

  shaders = `
    struct VertexOut {
      @builtin(position) position : vec4f,
      @location(0) color : vec4f
    }

    @vertex
    fn vertex_main(@location(0) position: vec4f, @location(1) color: vec4f) -> VertexOut
    {
      var output : VertexOut;
      output.position = position;
      output.color = vec4f(0.0, 0.0, 0.0, 1.0);
      return output;
    }

    @fragment
    fn fragment_main(fragData: VertexOut) -> @location(0) vec4f
    {
      return fragData.color;
    }
    `;

    const shaderModule = device.createShaderModule({
      code: shaders,
    });
    gpu.configure({
      device: device,
      format: navigator.gpu.getPreferredCanvasFormat(),
      alphaMode: "premultiplied",
    });

    vertices =  new Float32Array([
      0.0, 0.6, 0, 1, 1, 0, 0, 1, -0.5, -0.6, 0, 1, 0, 1, 0, 1, 0.5, -0.6, 0, 1, 0,
      0, 1, 1,
    ]);

    vertexBuffer = device.createBuffer({
      size: vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    
    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    vertexBuffers = [
      {
        attributes: [
          {
            shaderLocation: 0,
            offset: 0,
            format: "float32x4",
          },
          {
            shaderLocation: 1,
            offset: 16,
            format: "float32x4",
          },
        ],
        arrayStride: 32,
        stepMode: "vertex",
      },
    ];    

    const pipelineDescriptor = {
      vertex: {
        module: shaderModule,
        entryPoint: "vertex_main",
        buffers: vertexBuffers,
      },
      fragment: {
        module: shaderModule,
        entryPoint: "fragment_main",
        targets: [
          {
            format: navigator.gpu.getPreferredCanvasFormat(),
          },
        ],
      },
      primitive: {
        topology: "line-strip",
      },
      layout: "auto",
    };

    renderPipeline = device.createRenderPipeline(pipelineDescriptor);

    commandEncoder = device.createCommandEncoder();

    const clearColor = { r: 0.9, g: 0.9, b: 0.9, a: 1.0 };

    renderPassDescriptor = {
      colorAttachments: [
        {
          clearValue: clearColor,
          loadOp: "clear",
          storeOp: "store",
          view: gpu.getCurrentTexture().createView(),
        },
      ],
    };
    passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
}