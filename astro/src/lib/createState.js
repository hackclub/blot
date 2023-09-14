import { render } from "./render.tsx";

export function createState(stateObj) {

  const getState = () => stateObj;
  
  const patchState = newState => {
    for (const k in newState) {
      stateObj[k] = newState[k];
    }

    // re-render
    render();
  }

  return [ patchState, getState ]
}