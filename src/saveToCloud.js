import { patchStore, getStore } from './state.ts'


export async function saveToCloud({ content, name }) {
  const { loginName } = getStore();
  const sessionKey = sessionStorage.getItem('session_secret_key');

  if (loginName === "") {
    patchStore({ loginModalOpen: true });
    return;
  }

  // send loginName and sessionKey to server
  // check if logged in

  const res = await fetch("/save-file", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        sessionKey,
        email: loginName,
        file: content,
        name: name 
      })
    }).then(res => res.json());

  // if not logged in then ask to log in


  // if logged in then open save menu with files


  patchStore({ needsSaving: false })

}