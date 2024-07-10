import { patchStore, getStore, addToStore } from './state.ts'
import { render } from './render.tsx'

import runCode from './run.ts'

import { addBezierControl } from './events/addBezierControl.jsx'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'
import { addSrcURLParam } from './events/addSrcURLParam.js'
import { addNumberScrubbing } from './events/addNumberScrubbing.ts'
import { saveFile } from './saveFile.ts'
import { useOnEditorChange } from './events.ts'
import { post } from './post.js'

import { loadCodeFromString } from './loadCodeFromString.js'
import { removeQueryParam } from './removeQueryParam.js'

export function init() {
  console.log('init')

  render(true)

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  checkCurrentUser();

  addLoadBackup()
  // load src if present after default loading behavior
  addSrcURLParam()
  addShareIdURLParam();

  addBezierControl()
  addMachineControl()
  addNumberScrubbing()

  window.addEventListener('keydown', e => {
    if (
      (event.ctrlKey || event.metaKey) &&
      (event.key === 's' || event.key === 'S')
    ) {
      e.preventDefault()

      // if logged in save to cloud
      console.log("save to cloud")
      // else log in

    }
  })

  window.addEventListener('keydown', e => {
    if (
      (event.shiftKey) &&
      (event.ctrlKey || event.metaKey) &&
      (event.key === 's' || event.key === 'S')
    ) {
      e.preventDefault()

      const { fileHandle, view } = getStore()
      const code = view.state.doc.toString()

      if (fileHandle === null) {
        saveFile(code)
      } else {
        saveFile(code, { fileHandle })
      }
    }
  })

  window.addEventListener("beforeunload", e => {

    if (getStore().needsSaving) {
    
      e.preventDefault();
      e.returnValue = '';
    }

  })

  useOnEditorChange(() => {
    patchStore({ needsSaving: true })
  })

  // get settings from localStorage

  const theme = localStorage.getItem('colorTheme') ?? 'light'

  // window.matchMedia('(prefers-color-scheme: dark)')
  //   ? "dark"
  //   : "light";

  patchStore({
    theme,
    vimMode: localStorage.getItem('vimMode') === 'true'
  })

  document.body.dataset.theme = theme

  setTimeout(() => {
    runCode();
  }, 500)
} 

export async function checkCurrentUser() {
  const sessionKey = localStorage.getItem('session_secret_key');
  console.log(sessionKey);
  if (!sessionKey) return;

 
  patchStore({ sessionKey });

  const [ res, signInError ] = await post("/check-signed-in", { 
    sessionKey 
  });

  if (signInError) return;

  patchStore({ loginName: res.email })

  const [ json, filesErr ] = await post('/get-files', { 
    sessionKey 
  });

  if (filesErr) return;


  patchStore({ 
    files: json.files
  });



}

async function addShareIdURLParam() {
  const currentUrl = new URL(window.location.href)

  const shareId = currentUrl.searchParams.get('shareId')


  if (!shareId) return

  try {
    const response = await fetch(`/read-share-link?id=${shareId}`)
    const content = await response.text()

    loadCodeFromString(content)

    removeQueryParam('shareId')
  } catch (error) {
    console.error('Error fetching content:', error)
  }
}
