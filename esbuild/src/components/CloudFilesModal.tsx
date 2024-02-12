import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../lib/state.ts";
import { post } from "../lib/post.js";
import { loadCodeFromString } from "../lib/loadCodeFromString.ts";

export default function() {
  const { files } = getStore();

  const closeModal = () => patchStore({ cloudFilesModalOpen: false });

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

  return <>
    <div class="absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md bg-white">
      <div class="bg-[var(--primary)] p-3 text-white overflow">
        <div class="flex justify-between">
          Open a file from the cloud
          <span class="cursor-pointer hover:text-red-500" onClick={closeModal}>x</span>
        </div>
      </div>
      <div class="width-[80%] border-2 border-stone-400 h-[20rem] bg-gray-100 rounded mx-4 mt-4">
        {files.map((file, i) => <>
          <div class={`${selectedFile === i ? "bg-[var(--primary)] text-white" : ""} px-2 py-1`} onClick={e => selectFile(i)}>
            {file.name ? file.name : "anon"}
          </div>
        </>)}
      </div>
      <div class={`w-full flex p-2 items-center justify-center flex-row`}>
        <button class="m-3 p-2 w-40 text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded" onClick={openFile}>
          open
        </button>
      </div>
    </div>
  </>
}