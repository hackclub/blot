import { getStore, patchStore } from './state.ts'
import { parse } from 'acorn'
import { getPosFromErr } from "./getPosFromErr.js";
import { runCodeInner } from "./runCodeInner.js"
import { makeIncluded } from "./makeIncluded.js";
import RunWorker from './run.worker.js';

let worker = null;

function getCode() {
  const { view } = getStore()
  const code = view.state.doc.toString()

  return code
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function runCode() {
  // if (worker) {
    // so you can see some intermediate steps, may be better way to do this
    // await sleep(400);
  // }

  const { runCodeInWorker } = getStore();

  const code = getCode();

  // this prevents me from using await top-level
  if (!astValid()) return;

  patchStore(
    {
      console: [],
      error: null
    },
    false
  )

  try {
    if (!runCodeInWorker) await runSync();
    else runAsync();
  
  } catch (err) {
    console.error(err)
    const error = {
      pos: getPosFromErr(err),
      code: getCode(),
      name: err.name,
      message: err.message
    }

    patchStore({ error })
  }

  function astValid() {
    try {
      const ast = parse(code, { sourceType: 'module' });

      return true;
    } catch (err) {
      console.log(err)

      const sliceAt = err.message.indexOf('(') - 1
      err.message
      const error = {
        pos: err.loc,
        code: getCode(),
        name: err.name,
        message: err.message.slice(0, sliceAt)
      }

      patchStore({ error })

      return false;
    }
  }

  async function runSync() {
    const { globalScope, turtles, logs, docDimensions } = makeIncluded();

    await runCodeInner(code, globalScope, window.location.origin);

    patchStore({
      turtles,
      turtlePos: turtles.at(-1)?.position ?? [0, 0],
      docDimensions,
      console: [
        ...getStore().console,
        ...logs
      ]
    }); 
  }

  function runAsync() {

    if (getStore().codeRunning) {
      cancelWorker();
    }

    if (worker === null) {
      worker = RunWorker();
    }
    
    worker.postMessage({ action: "runCode", code, basePath: window.location.origin });
    patchStore({ codeRunning: true });

    worker.onmessage = ({ data }) => {
      if (data.type === "ERR") {
        patchStore({ error: data.error });
        cancelWorker();
        return;
      }

      const { turtles, docDimensions, logs } = data;
      patchStore({
        turtles,
        turtlePos: [0, 0],
        docDimensions,
        console: [
          ...getStore().console,
          ...logs
        ]
      });

      patchStore({ codeRunning: false });
    };

    function cancelWorker() {
      if (!worker) return;
      worker.terminate();
      worker = null;
      patchStore({ codeRunning: false });
    }
  }
}
