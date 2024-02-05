import { patchStore, getStore } from './state.ts'
import { render } from './render.tsx'

import { addBezierControl } from './events/addBezierControl.jsx'
import { addMachineControl } from './events/addMachineControl.js'
import { addLoadBackup } from './events/addLoadBackup.js'
import { addSrcURLParam } from './events/addSrcURLParam.js'
import { addNumberScrubbing } from './events/addNumberScrubbing.ts'
import { saveFile } from './saveFile.ts'
import { useOnEditorChange } from './events.ts'

export function init() {
  console.log('init')

  render(true)

  const cm = document.querySelector('.cm-editor')
  const view = cm.view
  patchStore({ view })

  // TODO
  // checkCurrentUser();

  addLoadBackup()
  // load src if present after default loading behavior
  addSrcURLParam()

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
}


async function checkCurrentUser() {
  sessionStorage.setItem('session_secret_key', "00000");

  const sessionKey = sessionStorage.getItem('session_secret_key');

  if (sessionKey) {
    patchStore({ sessionKey });

    const loginEmail = await fetch("/api/currentUser", {
      headers: { 
        'Content-Type': 'application/json',
        "Authentication": sessionKey
      },
    }).then(res => res.json());

    console.log(loginEmail);
  } else {

  }

}
