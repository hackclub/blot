// import { useState } from "preact/hooks";

export function createState(stateObj) {

  const getState = () => stateObj;
  
  const patchState = newState => {
    for (const k in newState) {
      stateObj[k] = newState[k];
    }
  }

  const useState = (keys) => {
    if (keys === undefined) return stateObj;
    
    const result = {};

    keys.forEach(k => {
      result[k] = stateObj[k];
    })

    return result;
  }

  return [useState, patchState, getState]
}