// @ts-check

import { rollup } from "@rollup/browser";


// https://stackoverflow.com/a/62507199
// /** @type function(string): string */
// const resolvePath = (path) =>
//   path
//     .split('/')
//     .reduce((a, v) => {
//       if (v === '.') {
//       } // do nothing
//       else if (v === '..') {
//         if (a.pop() === undefined)
//           throw new Error(`Unable to resolve path: ${path}`)
//       } else a.push(v)
//       return a
//     }, [])
//     .join('/')


// // not very good, but it works

// /** @type function(string): string | undefined */
// const isURL = (id) =>
//   ['http://', 'https://'].find(s => id.startsWith(s))

// /** @type function(string): Promise<string> */
// async function getBundle(src): Promise<string> {

//   const build = await rollup({
//     input: src,
//     plugins: [
//       {
//         name: 'fs-resolver',
//         resolveId(source, importer) {
//           if (['./', '../'].find(s => source.startsWith(s))) {
//             if (importer) {
//               const s = importer.split('/')
//               s.pop()
//               importer = s.join('/')
//               return resolvePath(importer + '/' + source)
//             }
//             return resolvePath(source)
//           } else if (source.startsWith('/')) {
//             if (importer && isURL(importer)) {
//               const url = new URL(importer)
//               return resolvePath(url.origin + source)
//             }
//             return resolvePath(source)
//           } else if (isURL(source)) {
//             return source
//           }
//           return { id: source, external: true }
//         },
//         async load(id) {
//           if (isURL(id)) {
//             const res = await fetch(id)
//             return await res.text()
//           } else if (id === src) {
//             return code.content
//           }
//           return null
//         }
//       }
//     ]
//   })
//   const bundle = await build.generate({
//     format: 'iife',
//     sourcemap: 'inline',
//     inlineDynamicImports: true
//   })
//   return bundle.output[0].code
// }

export async function rollupBundle(src) {e
    return await rollup({
		input: src,
		plugins: [
			{
				name: 'url-resolver',
				resolveId(source, importer) {
					if (source[0] !== '.') {
						try {
							new URL(source);
							// If it is a valid URL, return it
							return source;
						} catch {
							// Otherwise make it external
							return { id: source, external: true };
						}
					}
					return new URL(source, importer).href;
				},
				async load(id) {
					const response = await fetch(id);
					return response.text();
				}
			}
		]
	})
	.then(bundle => bundle.generate({ format: 'es' }))
	.then(({ output }) => console.log(output));
}
	