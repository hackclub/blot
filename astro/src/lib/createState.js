import { render } from "./render.tsx";

export function createState(stateObj) {

  // const state = addGettersSetters(stateObj);
  const state = stateObj;

  const getState = () => {
    return state;
  }
  
  const patchState = (newState, refreshRender = true) => {

    for (const k in newState) {
      if (!(k in state)) {
        console.log("unknown key in patchState", k);
        return;
      }

      state[k] = newState[k];
    }

    if (refreshRender) render();
  }

  return [ patchState, getState ]
}



function addGettersSetters(inputObj) {
  const outputObj = {};

  for (let key in inputObj) {
    if (inputObj.hasOwnProperty(key)) {
      Object.defineProperty(outputObj, key, {
        get: function() {
          return inputObj[key];
        },
        set: function(value) {
          inputObj[key] = value;
          return value;
        },
        enumerable: true  // This ensures the property shows up during enumeration, like in for...in loops.
      });
    }
  }

  return outputObj;
}