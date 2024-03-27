export async function runCodeInner(str, globalScope, basePath) {
  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor
  
  str = subDynamicImports(str);
  str = `"use strict"\n${str}`

  const fn = new AsyncFunction(...Object.keys(globalScope), str)

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

