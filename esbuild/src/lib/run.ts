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
