import { makeIncluded } from "./makeIncluded.js";
import { runCodeInner } from "./runCodeInner.js";
import { getPosFromErr } from "./getPosFromErr.js";

onmessage = async (e) => {
  const { action, code, basePath } = e.data;

  if (action === 'runCode') {
      try {
        let { globalScope, turtles, logs, docDimensions } = makeIncluded();
        
        await runCodeInner(code, globalScope, basePath);
        
        logs = logs.map(JSON.stringify);

        self.postMessage({
          type: "OK",
          turtles,
          docDimensions,
          logs
        });

      } catch (err) {

        const error = {
          pos: getPosFromErr(err),
          code: code,
          name: err.name,
          message: err.message
        };
  
        self.postMessage({ 
          type: "ERR",
          error 
        });
      }
  }
}
