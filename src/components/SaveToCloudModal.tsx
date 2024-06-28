import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../state.ts";
import { post } from "../post.js";

function getCode() {
  const { view } = getStore()
  const code = view.state.doc.toString()

  return code
}

export default function() {
  const { files, loginName, sessionKey } = getStore();

  const closeModal = () => patchStore({ saveToCloudModalOpen: false });

  if (loginName === "") {
    closeModal();
    alert("Log in to save files to the cloud.");
  }

  const [selectedFile, setSelectedFile] = useState(-1);
  const selectFile = i => {
    if (i === selectedFile) i = -1;

    setSelectedFile(i);
  }

  const onSave = async () => {
    console.log(files[selectedFile]);

    let name = selectedFile < 0 ? document.querySelector("#file-name").value : files[selectedFile].name;
    if (name === "") {
      alert("Please add name to file.");
      return;
    }

    const [ res, err] = await post("/save-file", { 
      sessionKey,
      email: loginName,
      file: getCode(),
      name,
      fileId: selectedFile < 0 ? null : files[selectedFile].id
    });

    if (err) return;

    const [ json, filesErr ] = await post('/get-files', { 
      sessionKey 
    });

    if (filesErr) return;

    console.log(res);

    patchStore({ needsSaving: false, files: json.files, cloudFileId: res.id });
    closeModal();
  }
  const { theme } = getStore()
  let css = "bg-[var(--primary)]"
  let css2 = "bg-gray-100"
  let css3 = ""
  let css4 = "bg-white"
  if(theme == "dark"){
    css = "bg-dark-mode-blue"
    css2 = "bg-dark-mode-grey text-white"
    css3 = "bg-dark-mode-grey text-white"
    css4 = "bg-black"
  }

  return (
    <div class={"absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md \n " + css4}>
      <div class= {"p-3 text-white overflow \n" + css}>
        <div class="flex justify-between">
          Save new file or overwrite existing file
          <span class="cursor-pointer hover:text-red-500" onClick={closeModal}>x</span>
        </div>
      </div>
      <div class={"width-[80%] border-2 border-stone-400 h-[20rem] rounded mx-4 mt-4 overflow-auto \n" + css2}>
        {sortFilesByTime(files).map((file, i) => <>
          <div class={`${i%2 === 1 && selectedFile !== i ? "bg-gray-200" : ""} ${selectedFile === i ? "bg-[var(--primary)] text-white" : ""} px-2 py-1` + " " + `flex flex-row justify-between`} onClick={e => selectFile(i)}>
            <div>{file.name ? file.name : "anon"}</div>
            <div class="text-gray-400">
              {formatTimestamp(file.created_at)}
            </div>
          </div>
        </>)}
      </div>
      
      <pre class= {"width-[90%] border-2 border-stone-400 h-[8rem] rounded mx-4 mt-4 p-1 overflow-auto font-mono \n" + css2}>
        {files[selectedFile] ? files[selectedFile].content : ""}
      </pre>

      <div class={`w-full flex p-2 items-center justify-between flex-row`}>
        <input id="file-name" class={"m-2 p-2 w-[60%] border-2 border-stone-400 rounded \n" + css3} disabled={selectedFile >= 0} placeholder={selectedFile < 0 ? "write file name here" : files[selectedFile].name} />
        <button class="m-3 p-2 w-40 text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded" onClick={onSave}>
          {selectedFile < 0 ? "save new file" : "overwrite file"}
        </button>
      </div>

    </div>
  )
}

function sortFilesByTime(files) {
  const sortedFiles = files
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return sortedFiles;
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}