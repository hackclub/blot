import express from 'express';

import { runCodeInner } from "../src/runCodeInner.js";
import { makeIncluded } from "../src/makeIncluded.js";

import { createNodeSerialBuffer } from "../src/haxidraw/createNodeSerialBuffer.js";
import { runMachineHelper } from "../src/runMachineHelper.js";

async function runSync(code) {

  const { globalScope, turtles, logs, docDimensions } = makeIncluded();

  await runCodeInner(code, globalScope, "../dist");

  return {
    turtles,
    docDimensions,
  }
}

const app = express();
const port = process.env.PORT || 3000;

app.post("upload", async (req, res) => {
  try {
    const { code } = req.body;

    const { turtles, docDimensions } = await runSync(`
      drawLines([
        [
          [0, 0], [100, 100]
        ]
      ])
`)


  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// --- TEST ---

const { turtles, docDimensions } = await runSync(`
    drawLines([
      [
        [0, 0], [100, 100]
      ]
    ])
`)

console.log(turtles);

/*

const comsBuffer = await createNodeSerialBuffer(port);
const haxidraw = await createHaxidraw(comsBuffer);
let machineRunning = false;

machineRunning = true;
await runMachineHelper(haxidraw, turtles);
machineRunning = false;

*/


