import { render } from './render.tsx'

export function createStore(stateObj) {
  // const state = addGettersSetters(stateObj);
  const state = stateObj

  const getStore = () => {
    return state
  }

  const patchStore = (newState, refreshRender = true) => {
    for (const k in newState) {
      if (!(k in state)) {
        console.log('unknown key in patchState', k)
        return
      }

      state[k] = newState[k]
    }

    if (refreshRender) render()
  }

  const addToStore = (key, value) => {
    if (key in state) {
      console.log("already has state:", key);
      return
    }

    state[key] = value;
  }

  return { patchStore, getStore, addToStore }
}

function addGettersSetters(inputObj) {
  const outputObj = {}

  for (let key in inputObj) {
    if (inputObj.hasOwnProperty(key)) {
      Object.defineProperty(outputObj, key, {
        get: function () {
          return inputObj[key]
        },
        set: function (value) {
          inputObj[key] = value
          return value
        },
        enumerable: true // This ensures the property shows up during enumeration, like in for...in loops.
      })
    }
  }

  return outputObj
}
