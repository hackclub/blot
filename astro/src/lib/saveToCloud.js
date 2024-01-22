import { patchStore, getStore } from './state.ts'


export function saveToCloud(code) {
  console.log(code);

  // if not logged in then ask to log in

  // if logged in then open save menu with files

  patchStore({ needsSaving: false })

}