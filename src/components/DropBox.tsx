import { useEffect } from "preact/hooks";
import { getStore } from "../state.ts";
import { loadCodeFromString } from "../loadCodeFromString.ts";

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

        const newLines = `const importedSVG = svgToPolylines(String.raw\`${text}\`);\n`;

        view.dispatch({
          changes: { from: 0, insert: newLines },
        });
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
