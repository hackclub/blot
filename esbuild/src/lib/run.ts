import { getStore, patchStore } from './state.ts'
import { parse } from 'acorn'
import { getPosFromErr } from "./getPosFromErr.js";
import { runCodeInner } from "./runCodeInner.js"
import { makeIncluded } from "./makeIncluded.js";

function getCode() {
  const { view } = getStore()
  const code = view.state.doc.toString()

  return code
}

export default async function runCode() {
  const code = getCode();

  // this prevents me from using await top-level
  try {
    const ast = parse(code, { sourceType: 'module' });
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

    return
  }

  patchStore(
    {
      console: [],
      error: null
    },
    false
  )

  try {
    const { globalScope, turtles, logs, docDimensions } = makeIncluded();

    await runCodeInner(code, globalScope);

    patchStore({
      turtles,
      turtlePos: turtles.at(-1)?.position ?? [0, 0],
      docDimensions,
      console: [
        ...getStore().console,
        ...logs
      ]
    });
    
    // runCodeWorker();
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
}

function runCodeWorker() {
  const code = getCode();
  const worker = createWorker();
  // const worker = new Worker('./runWorker.js', { type: "module" });

  console.log(worker);


  worker.onmessage = (e) => {
    console.log("result", e);
    // const { error, turtles, logs, docDimensions } = e.data;
    // console.log("got message", error);
    // if (error) {
    //   console.error(error);
    //   patchStore({ error });
    // } else {
    //   patchStore({
    //     turtles,
    //     turtlePos: turtles.at(-1)?.position ?? [0, 0],
    //     docDimensions,
    //     console: [
    //       ...getStore().console,
    //       ...logs
    //     ]
    //   });
    // }
  };

  worker.postMessage("test");

  worker.onerror = (error) => {
    console.error(error);
  };

  return worker;
}

function createWorker() {
    // Step 1: Worker code as a string
  const workerCode = `
  self.onmessage = function(e) {
    console.log('Message received in worker:', e.data);
    // Process the message...
    const result = e.data * 2; // Example operation
    self.postMessage(result);
  };
  `;

  // Step 2: Create a Blob from the string
  const blob = new Blob([workerCode], { type: 'application/javascript' });

  // Step 3: Create a URL for the Blob
  const workerUrl = URL.createObjectURL(blob);

  // Step 4: Instantiate the WebWorker with the Blob URL
  const worker = new Worker(workerUrl);

  // Important: Revoke the Blob URL after creating the worker to free up resources
  URL.revokeObjectURL(workerUrl);

  return worker;
}