import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../state.ts";
import { loadCodeFromString } from "../loadCodeFromString.ts";

export default function() {
  const { files, loginName } = getStore();

  const closeModal = () => patchStore({ cloudFilesModalOpen: false });
  if (loginName === "") {
    closeModal();
    alert("Log in to open files in the cloud.");
  }
  const [selectedFile, setSelectedFile] = useState(-1);
  const selectFile = i => {
    setSelectedFile(i);
  }

  const openFile = () => {
    if (selectedFile < 0) return;
    
    const file = files[selectedFile];

    loadCodeFromString(file.content);
    closeModal();
  }
  const { theme } = getStore()
  let css = "bg-[var(--primary)]"
  let css2 = "bg-gray-100"
  let css3 = "bg-grey-200"
  let css4 = "bg-white"
  if(theme == "dark"){
    css = "bg-[var(--primary-dark)]"
    css2 = "bg-[var(--primary-dark-grey)] text-white"
    css3 = "bg-[var(--primary-dark-dark-grey)] text-white"
    css4 = "bg-black"
  }

  return <>
    <div class={"absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md \n" + css4}>
      <div class={" p-3 text-white overflow \n"+ css}>
        <div class="flex justify-between">
          Open a file from the cloud
          <span class="cursor-pointer hover:text-red-500" onClick={closeModal}>x</span>
        </div>
      </div>

      <div class={"width-[90%] border-2 border-stone-400 h-[20rem] rounded mx-4 mt-4 overflow-auto \n" + css2}>
        {sortFilesByTime(files).map((file, i) => <>
          <div class={`${i%2 === 1 && selectedFile !== i ? css3 : ""} ${selectedFile === i ?  "text-white\n" + css : ""} px-2 py-1` + " " + `flex flex-row justify-between`} onClick={e => selectFile(i)}>
            <div>{file.name ? file.name : "anon"}</div>
            <div class="text-gray-400">
              {formatTimestamp(file.created_at)}
            </div>
          </div>
        </>)}
      </div>

      <pre class={"width-[90%] border-2 border-stone-400 h-[8rem] rounded mx-4 mt-4 p-1 overflow-auto font-mono \n"+css2}>
        {files[selectedFile] ? files[selectedFile].content : ""}
      </pre>

      <div class={`w-full flex p-2 items-center justify-center flex-row`}>
        <button class="m-3 p-2 w-40 text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded" onClick={openFile}>
          open
        </button>
      </div>
    </div>
  </>
}

function sortFilesByTime(files) {
  const sortedFiles = files
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return sortedFiles;
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}