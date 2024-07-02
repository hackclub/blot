import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../state.ts";
import { post } from "../post.js";
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

  return <>
    <div class="absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-[40rem] shadow-lg rounded-md bg-white">
      <div class="bg-[var(--primary)] p-3 text-white overflow">
        <div class="flex justify-between">
          Open a file from the cloud
          <span class="cursor-pointer hover:text-red-500" onClick={closeModal}>x</span>
        </div>
      </div>

      <div class="width-[90%] border-2 border-stone-400 h-[20rem] bg-gray-100 rounded mx-4 mt-4 overflow-auto">
        {sortFilesByTime(files).map((file, i) => <>
          <div class={`${i%2 === 1 && selectedFile !== i ? "bg-gray-200" : ""} ${selectedFile === i ? "bg-[var(--primary)] text-white" : ""} px-2 py-1` + " " + `flex flex-row justify-between`} onClick={e => selectFile(i)}>
            <div>{file.name ? file.name : "anon"}</div>
            <div class="flex content-center">
              <div class="text-gray-400">
                {formatTimestamp(file.created_at)}
              </div>
              <div class="px-2 cursor-pointer hover:text-red-500" style="translate: 5px -2px;" onClick={e => deleteFile(e, file)}>x</div>
            </div>
          </div>
        </>)}
      </div>

      <pre class="width-[90%] border-2 border-stone-400 h-[8rem] bg-gray-100 rounded mx-4 mt-4 p-1 overflow-auto font-mono">
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

async function deleteFile(event, file) {
  
  const confirmedDelete = confirm("Are you sure you want to delete this file?")
  if (confirmedDelete === false) return;
  

  const { loginName, files } = getStore();
  const sessionKey = localStorage.getItem('session_secret_key');

  console.log(file);

  const [ res, err ] = await post("delete-file", { 
    sessionKey,
    email: loginName,
    fileId: file.id
  });

  if (err) {
    console.log(err);
    return;
  }

  // assume successful
  const updatedFiles = files.filter(x => x.id !== file.id);
  patchStore({ files: updatedFiles }); 
}

function sortFilesByTime(files) {
  const sortedFiles = files
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return sortedFiles;
}

function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
}