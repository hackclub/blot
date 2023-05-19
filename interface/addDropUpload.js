import { createListener } from "./createListener.js";

export function addDropUpload(el, state) {
  const listener = createListener(el);

  listener("drop", "", function(evt) {    
    let dt = evt.dataTransfer;
    let files = dt.files;

    document.querySelector(".drop-modal").classList.add("hidden");   

    upload(files, state);

    pauseEvent(evt);
  });

  listener("dragover", "", function(evt) {
    document.querySelector(".drop-modal").classList.remove("hidden");   
    pauseEvent(evt);
  });

  listener("mouseleave", "", function(evt) {
    document.querySelector(".drop-modal").classList.add("hidden");   
  });
}

function upload(files, state) {
  const file = files[0];
  const fileName = file.name.split(".");
  const name = fileName[0];
  const extension = fileName[fileName.length - 1];

  var reader = new FileReader();
  reader.readAsText(file);

  reader.onloadend = event => {
    let text = reader.result;

    if (extension === "js") {
      const end = state.codemirror.state.doc.toString().length;
      state.codemirror.dispatch({
        changes: { from: 0, to: end, insert: text }
      });
    } else if (extension === "svg") {
      text = text.replaceAll("\n", "");

      const newLines = 
      `const t = new Turtle();\n`
      + `t.fromSVG(String.raw\`${text}\`);\n`

      state.codemirror.dispatch({
        changes: { from: 0, insert: newLines }
      });
    } else {
      throw Error("Unknown extension:", extension);
    }
  };
};

function pauseEvent(e) {
  if(e.stopPropagation) e.stopPropagation();
  if(e.preventDefault) e.preventDefault();
  e.cancelBubble=true;
  e.returnValue=false;
  return false;
}