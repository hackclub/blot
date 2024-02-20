// import { makeIncluded } from "./makeIncluded.js";
// import { runCodeInner } from "./runCodeInner.js"

self.onmessage = (e) => {
    // const { action, code } = e.data;

    console.log(e);
    self.postMessage({ result: "received" });

    if (action === 'runCode') {
        try {
          const { globalScope, turtles, logs, docDimensions } = makeIncluded();

          console.log("running worker");
          await runCodeInner(code, globalScope);
    
          self.postMessage({
            turtles,
            turtlePos: turtles.at(-1)?.position ?? [0, 0],
            docDimensions,
            console: [
              ...getStore().console,
              ...logs
            ]
          });
        } catch (err) {
          console.error(err);
          const error = {
            pos: getPosFromErr(err), // Implement or adjust this function
            code: code,
            name: err.name,
            message: err.message
          };
    
          self.postMessage({ error });
        }
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