import {
  html,
  svg,
  render,
} from "lit-html";

export function view(state) {
  return html`
    <div class="root">
      ${menuBar(state)}

      <div class="content">
        <div class="dictionary"></div>

        <div class="right-panel">
          ${svgViewer(state)}
          ${commandLine(state)}
        </div>
      </div>

      <div class="drop-modal hidden">
        Upload js or svg files.
      </div>
    </div>
  `
}

const menuBar = state => html`
  <div class="menu-bar">
    <div class="center filename-trigger" style="color: white;">${state.filename}</div>
    <button class="run-trigger">run code</button>
    <button class="connect-trigger">${state.haxidraw ? "disconnect" : "connect"}</button>
    <button class="save-trigger">save</button>
    <button class="export-trigger">export svg</button>
    <button class="run-machine-trigger">run machine</button>
    <button class="examples-trigger">examples</button>
  </div>
`

const commandLine = state => html`
  <div class="command-line">
    ${state.logs.map(log => html`<div class="log">${log}</div>`)}
    <div class="command-entry">
      <span style="padding-right: 5px">\>\>\></span>
      <span 
        class="line-input"
        spellcheck="false" 
        contenteditable="true"></span>
    </div>
  </div>
`

/*const drawWorkarea = state => html`
  <rect 
    width=${state.machineWidth} 
    height=${state.machineHeight} 
    x="0" 
    y="0"
    fill="none"
    stroke="grey"
    stroke-width="3"
    vector-effect="non-scaling-stroke"
    style="scale: ${state.scaleX} ${state.scaleY};"/>
`*/

export function svgViewer (state, resRatioX, resRatioY) {
  return html`
    <div class="svg-container">
      <svg class="svg-viewer" style = "transform:scale(1, -1)">
        <g class="transform-group">
          <circle fill="orange" r="0.3" cx="0" cy="0"/>
          ${state.turtles.map(x => drawPath(x.path, state, resRatioX, resRatioY))}
          ${state.turtles.map(x => drawTurtleDirection(x))}
        </g>
      </svg>
    </div>
  `
}

const viewer = () => html`
  <canvas width="1200" height="900" id="view"></canvas>
  `


function drawPath(path, state, resRatioX, resRatioY) {
  let d = "";
  path.forEach(polyline => {
    polyline.forEach((pt, i) => {
      let [ x, y ] = pt;

      // if (i === 0) d += `M ${state.panX + x * state.renderScaleX } ${state.panY + y * state.renderScaleY}`
      // else d += `L ${state.panX + x * state.renderScaleX } ${state.panY + y * state.renderScaleY}`

      if (i === 0) d += `M ${x} ${y}`;
      else d += `L ${x} ${y}`;
    })
  })

  return svg`
    <path d="${d}" stroke="black" stroke-width="2px" fill="none" vector-effect="non-scaling-stroke"/>
  `
}

function drawTurtleDirection(turtle) {
  return true ? "" : html`
    <polygon points="0,0 0.5,-0.5 0.5,0.5" style="fill: orange; transform-origin:.5 0; transform: translate(${turtle.location[0]}px, ${turtle.location[1]}px) scale(.25, .25) rotate(${180 + turtle.angle}deg);" />
  `
}