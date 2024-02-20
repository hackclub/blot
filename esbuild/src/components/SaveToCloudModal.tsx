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

  return (
    <div class="absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md bg-white">
      <div class="bg-[var(--primary)] p-3 text-white overflow">
        <div class="flex justify-between">
          Save new file or overwrite existing file
          <span class="cursor-pointer hover:text-red-500" onClick={closeModal}>x</span>
        </div>
      </div>
      <div class="width-[80%] border-2 border-stone-400 h-[20rem] bg-gray-100 rounded mx-4 mt-4 overflow-auto">
        {files.map((file, i) => <>
          <div class={`${i%2 === 1 && selectedFile !== i ? "bg-gray-200" : ""} ${selectedFile === i ? "bg-[var(--primary)] text-white" : ""} px-2 py-1`} onClick={e => selectFile(i)}>
            {file.name ? file.name : "anon"}
          </div>
        </>)}
      </div>
      <div class={`w-full flex p-2 items-center justify-between flex-row`}>
        <input id="file-name" class="m-2 p-2 w-[60%] border-2 border-stone-400 rounded" disabled={selectedFile >= 0} placeholder={selectedFile < 0 ? "write file name here" : files[selectedFile].name} />
        <button class="m-3 p-2 w-40 text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded" onClick={onSave}>
          {selectedFile < 0 ? "save new file" : "overwrite file"}
        </button>
      </div>
    </div>
  )
}