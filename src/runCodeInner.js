import { traceFormat } from "./getPosFromErr.js"
const AsyncFunction = async function () {}.constructor

function createFunction(str, globalKeys) {
  const useAsyncFunction = traceFormat === 'JavaScriptCore'
  if (useAsyncFunction) {
    return new AsyncFunction(...globalKeys, str)
  } else {
    // stupid hack for Safari
    // build a Data URL from the code and use importScripts
    // this is needed to get line numbers for errors
    const code =
      `globalThis.__blotUserCodeFunction = (async function __blotUserCodeFunction(${globalKeys.join(", ")}) {\n${str}\n})`
    const dataURL = `data:text/javascript;base64,${btoa(code)}`
    importScripts(dataURL)
    return globalThis.__blotUserCodeFunction
  }
}

export async function runCodeInner(str, globalScope, basePath) {  
  str = subDynamicImports(str);
  str = `"use strict"\n${str}`

  const fn = createFunction(str, Object.keys(globalScope))

  await fn(...Object.values(globalScope)).catch(err => {
    throw err
  })

  function subDynamicImports(str) {
    // const regex = /import\s+([\w*{},\s]+)\s+from\s+(['"`])(.*?)\2\s*;?/gm
    const regex = /import\s+([\s\S]+?)\s+from\s+"([\s\S]+?)"/gm
    let match

    while ((match = regex.exec(str))) {
      const variables = match[1];
      let modulePath = match[2];

      if (modulePath.startsWith("/")) modulePath = `${basePath}${modulePath}`;

      const dynamicImport = `const ${variables.replaceAll("as", ":")} = await (async () => { let temp = await import('${modulePath}'); return temp.default ? temp.default : temp; })();`

      str = str.replace(match[0], dynamicImport);
    }

    return str;
  }
}

