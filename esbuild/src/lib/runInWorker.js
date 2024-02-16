// import { makeIncluded } from "./makeIncluded.js";
// import { runCodeInner } from "./runCodeInner.js"

self.onmessage = (e) => {
    // const { action, code } = e.data;

    console.log(e);
    self.postMessage({ result: "received" });

    // if (action === 'runCode') {
    //     try {
    //       const { globalScope, turtles, logs, docDimensions } = makeIncluded();

    //       console.log("running worker");
    //       await runCodeInner(code, globalScope);
    
    //       self.postMessage({
    //         turtles,
    //         turtlePos: turtles.at(-1)?.position ?? [0, 0],
    //         docDimensions,
    //         console: [
    //           ...getStore().console,
    //           ...logs
    //         ]
    //       });
    //     } catch (err) {
    //       console.error(err);
    //       const error = {
    //         pos: getPosFromErr(err), // Implement or adjust this function
    //         code: code,
    //         name: err.name,
    //         message: err.message
    //       };
    
    //       self.postMessage({ error });
    //     }
    // }
}