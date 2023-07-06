// WebGPU stuff
var shaders, device, commandEncoder, renderPipeline, renderPassDescriptor, vertexBuffer, vertices, vertexBuffers, passEncoder;

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
        x = (state.panX + x * state.renderScaleX)
        y = (state.panY + y * state.renderScaleY)
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