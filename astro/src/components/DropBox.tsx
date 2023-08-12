import { useEffect } from "preact/hooks";
import { getStore, loadCodeFromString } from "../lib/state.ts";

export default function DropBox() {

    useEffect(() => {
      // Make sure the ref is defined
      addDragDrop();
    }, []);  // Empty dependency array means this effect runs once after initial render


    // const styles = `
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     background: lightblue;
    //     opacity: .8;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //     border: 3px dashed grey;
    //     left: 0px;
    //     top: 0px;
    // `

    return <>
        <style>{`
            .drop {
                position: absolute;
                width: 100%;
                height: 100%;
                background: lightblue;
                opacity: .8;
                align-items: center;
                justify-content: center;
                border: 3px dashed grey;
                left: 0px;
                top: 0px;
                display: flex;
            }

            .hidden {
                display: none;
            }
        `}</style>
        <div class="drop hidden droparea">
            Drop an SVG or JS file.
        </div>
    </>
}

function addDragDrop() {

  const droparea: HTMLElement | null = document.querySelector(".droparea");

  window.addEventListener("drop", function(evt) {  
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

    reader.onloadend = event => {
        let text = reader.result;

        if (extension === "js") {
          loadCodeFromString(text);
        } else if (extension === "svg") {
          text = text.replaceAll("\n", "");

          const newLines = 
          `const importedSVG = new Turtle().fromSVG(String.raw\`${text}\`);\n`

          view.dispatch({
            changes: { from: 0, insert: newLines }
          });
        } else {
          throw Error("Unknown extension:" + extension);
        }
    }

    pauseEvent(evt);
  });

  window.addEventListener("dragover", function(evt) {
    droparea.classList.remove("hidden");   
    pauseEvent(evt);
  });

  ["mouseout"].forEach(trigger => window.addEventListener(trigger, function(evt) {
    droparea.classList.add("hidden");   
  }));
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble=true;
  e.returnValue=false;
  return false;
}



