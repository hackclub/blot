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
          ${viewer(state)}
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

const drawWorkarea = state => html`
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
`

const viewer = state => html`
  <div class="svg-container">
    <svg class="svg-viewer">
      <g class="transform-group">
        <circle cx="0" cy="0" r="0.1" fill="orange"/>
        ${state.turtles.map(x => drawPath(x.path))}
        ${state.turtles.map(x => drawTurtleDirection(x))}
      </g>
    </svg>
  </div>
`


function drawPath(path) {
  let d = "";
  path.forEach(polyline => {
    polyline.forEach((pt, i) => {
      let [ x, y ] = pt;
      if (i === 0) d += `M ${x} ${y}`
      else d += `L ${x} ${y}`
    })
  })
  return svg`
    <path d="${d}" stroke="black" stroke-width="2px" fill="none" vector-effect="non-scaling-stroke"/>
  `
}

function drawTurtleDirection(turtle) {
  return false ? "" : svg`
    <polygon points="0,0 0.5,-0.5 0.5,0.5" style="fill: orange; transform-origin:.5 0; transform: translate(${turtle.location[0]}px, ${turtle.location[1]}px) scale(.25, .25) rotate(${180 + turtle.angle}deg);" />
  `
}
