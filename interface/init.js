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

import { addPanZoom } from "./addPanZoom.js";

import { EditorView, basicSetup } from "codemirror"
import { keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript"
import { indentUnit } from "@codemirror/language";
import { indentWithTab } from "@codemirror/commands";

import { createHaxidraw } from "./haxidraw/createHaxidraw.js";

import { initCanvas } from "./render/canvas.js";


export function init(state) {
  render(view(state), document.body);

  const r = () => requestAnimationFrame(() => {
    render(view(state), document.body);

    if (state.renderCanvas && state.renderMethod === "canvas") state.renderCanvas(state);
  });

  const execute = () => {
    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => r());
  }

  state.execute = execute;
  state.render = r;

  state.renderCanvas = initCanvas(state).renderCanvas;
  
  const root = document.querySelector(".root");
  
  const panZoom = addPanZoom(root.querySelector("svg"));

  panZoom.setScaleXY({
   x: [-5, 5],
   y: [-5, 5]
  });

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
    }
  })

  for(let i = 0; i < state.examples.length; i++){
    let opt = document.createElement("option");
    opt.value = state.examples[i] + ".js";
    opt.innerText = state.examples[i].replace("-", " ");
    document.querySelector(".examples-trigger").appendChild(opt);
  }

  const listener = createListener(root);

  /* <button class="set-origin-trigger">set origin</button> */

  // listener("click", ".set-origin-trigger", () => {
  //   if (!machine) return;
  //   machine.setPosition([0, 0]); 
  // });

  listener("click", ".run-trigger", () => {
    const code = editor.state.doc.toString();   
    runCode(code, state).then(() => r());
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
    state.turtlePos = [0, 0];
    if (state.renderCanvas && state.renderMethod === "canvas") state.renderCanvas(state);
    if (!navigator.serial) {
      alert(
        "Your browser doesn't seem to support the Web Serial API," 
        + "which is required for the Haxidraw editor to connect to the machine." 
        + "Chrome Version 89 or above is the recommended browser."
      ) 
    }
    if (!state.haxidraw) { // connect
      navigator.serial
        .requestPort({ filters: [] })
        .then(async (port) => {
          console.log("connecting");
          state.haxidraw = await createHaxidraw(port);


          // state.haxidraw.goto = async (x, y) => {
          //   await state.haxidraw.goto(x*state.scaleX, y*state.scaleY);
          //   state.turtlePos = [x, y];
          // } 

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
      r();
    }

  });

  listener("click", ".save-trigger", () => {
    const code = editor.state.doc.toString();
    downloadText(`${state.filename}.js`, code);
  });

  listener("change", ".examples-trigger", () => {
    if(document.querySelector(".examples-trigger").value !== "none") {
      if(confirm("This will replace your current code. Are you sure you want to continue?")) {
        fetch('/examples/' + document.querySelector(".examples-trigger").value)
          .then(response => response.text())
          .then(data => {
            editor.update([editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})]);
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
          });
      }else{
        document.querySelector(".examples-trigger").value = "none";
      }
    }
  });

  listener("click", ".export-trigger", () => {
    const svg = root.querySelector("svg");
    const svgString = new XMLSerializer().serializeToString(svg);
    console.log(typeof svgString)
    const rotated = svgString.slice(0, svgString.indexOf("scale")) + "rotate(180deg)" + svgString.slice(svgString.indexOf("scale") - 1);
    downloadText(`${state.filename}.svg`, rotated);
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

    // TODO: reimplement

    // document.body.insertAdjacentHTML("beforeend", `${svgViewer(state, resRatioX, resRatioY)}`);
    // let svg = document.getElementsByClassName("svg-viewer")[0];
    // const svgString = new XMLSerializer().serializeToString(svg);
    // downloadText(`${state.filename}.svg`,svgString);
    // svg.remove();
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
