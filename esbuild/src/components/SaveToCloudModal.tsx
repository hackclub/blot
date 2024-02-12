import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../lib/state.ts";
import { post } from "../lib/post.js";

export default function() {
  const { files } = getStore();

  const closeModal = () => patchStore({ saveToCloudModalOpen: false });

  const [selectedFile, setSelectedFile] = useState(-1);
  const selectFile = i => {
    if (i === selectedFile) i = -1;

    setSelectedFile(i);
  }

  const onSave = () => {
    // check that name is unique
    // should do this when typing and select file if name matches
    // or just send file id

    console.log(files[selectedFile]);

    // set cloudFileId to selected file id
    // if no selected file id then wait till file is generated and set to the new one

    // const [ res, err] = await post("/save-file", { 
    //   sessionKey,
    //   file: getCode(),
    //   name: name 
    //   fileId: selectedFile < 0 ? null : files[selectedFile].id
    // });
  }

  return <>
    <div class="absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md bg-white">
      <div class="bg-[var(--primary)] p-3 text-white overflow">
        <div class="flex justify-between">
          Save new file or overwrite existing file
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
      <div class={`w-full flex p-2 items-center justify-between flex-row`}>
        <input class="m-2 p-2 w-[60%] border-2 border-stone-400 rounded" disabled={selectedFile >= 0} placeholder={selectedFile < 0 ? "write file name here" : files[selectedFile].name} />
        <button class="m-3 p-2 w-40 text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded" onClick={onSave}>
          save
        </button>
      </div>
    </div>
  </>
}