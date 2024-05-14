import { useEffect } from "preact/hooks";
import { getStore } from "../state.ts";
import { loadCodeFromString } from "../loadCodeFromString.ts";
import { toolkit as tk } from "../drawingToolkit/toolkit.js";

export default function DropBox() {
  useEffect(() => {
    // Make sure the ref is defined
    addDragDrop();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <div
      class="
      drop 
      droparea 
      
      hidden
      w-full
      h-full 
      absolute 
      bg-blue-200
      bg-opacity-80 
      flex 
      items-center 
      justify-center 
      border-4
      border-dashed
      border-gray-800
      left-0 
      top-0 
      z-50"
    >
      Drop an SVG or JS file.
    </div>
  );
}

function addDragDrop() {
  const droparea: HTMLElement | null = document.querySelector(".droparea");

  window.addEventListener("drop", function (evt) {
    const { view } = getStore();

    let dt = evt.dataTransfer;

    if (dt === null || droparea === null) return;

    let files = dt.files;

    droparea.classList.add("hidden");

    const file = files[0];
    const fileName = file.name.split(".");
    const name = fileName[0];
    const extension = fileName[fileName.length - 1];

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (event) => {
      let text = reader.result;

      if (extension === "js") {
        loadCodeFromString(text);
      } else if (extension === "svg") {
        text = text.replaceAll("\n", "");

        const polylines = JSON.stringify(tk.svgToPolylines(text));

        customAlert(polylines);

        // const newLines = `const importedSVG = ${polylines};\n`;

        // view.dispatch({
        //   changes: { from: 0, insert: newLines },
        // });
      } else {
        throw Error("Unknown extension:" + extension);
      }
    };

    pauseEvent(evt);
  });

  window.addEventListener("dragover", function (evt) {
    droparea.classList.remove("hidden");
    pauseEvent(evt);
  });
  ["mouseout"].forEach((trigger) =>
    window.addEventListener(trigger, function (evt) {
      droparea.classList.add("hidden");
    }),
  );
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

function customAlert(polylines) {

  const el = document.createElement("div");
  const style = `
    z-index: 999999999999;
    width: 550px;
    min-height: 100px;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0%);
    background: #f4f4f4;
    border-radius: 10px;
    border: 1px solid black;
    padding: 8px;
  `

  const polylinesStyle = `
    overflow-x: auto;
    background: #e2e2e2;
    border-radius: 5px;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    padding: .25rem;
  `

  el.innerHTML = `
    <div style="${style}">
      <div>
        <div>Here are the polylines of your SVG. Copy and paste it into the editor.</div>
        <pre style="${polylinesStyle}">${polylines}</pre>
      </div>

      <span style="width: 100%; display: flex;">
        <button class="mx-auto my-1 text-white p-2 rounded cursor-pointer bg-gray-700 hover:bg-gray-500">
          close
        </button>
      </span>
    </div>
  `

  el.querySelector("button").addEventListener("click", () => {
    el.remove();
  })

  document.body.append(el);
}
