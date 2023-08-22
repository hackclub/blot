import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, d as renderHead, e as renderSlot, f as createCollectionToGlobResultMap, g as createGetCollection, h as createGetEntry, i as renderComponent, m as maybeRenderHead } from "../astro.ddd8ab85.mjs";
/* empty css                            *//* empty css                            */const $$Astro$1 = createAstro("https://editor.haxidraw.hackclub.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="description" content="Haxidraw editor!">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title}</title>
    
  ${renderHead()}</head>
  <body>
    <main>
      <div class="toolbar">
        <div class="blot">
          <a href="/" class="nostyle">
            <i class="fa-solid fa-splotch" style="padding-right: 10px"></i>
             Blot
          </a>
        </div>
        <div class="toolbar-right">
          <a class="toolbar-item" href="/editor">
            <i class="fa-solid fa-pen-nib" style="padding-right: .5rem"></i>
             editor
          </a>
          <a class="toolbar-item" href="/workshops">
            <i class="fa-solid fa-laptop-file" style="padding-right: .5rem"></i>
             workshops
          </a>

          <a class="toolbar-item" href="/gallery">
            <i class="fa-solid fa-palette" style="padding-right: .5rem"></i>
             gallery
          </a>

          <a class="toolbar-item" href="https://haxidraw.hackclub.dev">
            <i class="fa-solid fa-arrows-to-dot" style="padding-right: .5rem"></i>
             assembly
          </a>
        </div>
      </div>
      ${renderSlot($$result, $$slots["default"])}
      <footer class="footer">
        <a class="toolbar-item footer-item" href="https://hackclub.com">
          <img src="/hackclub.png" style="height: 51%;
    padding-right: 7px;
    filter: grayscale(1) contrast(200%);">
           Hack Club
        </a>
        <a class="toolbar-item footer-item" href="https://github.com/hackclub/haxidraw/tree/main">
          <i class="fa-brands fa-github" style="padding-right: .5rem"></i>
           GitHub
        </a>
      </footer>
    </main>
  </body></html>`;
}, "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/layouts/Layout.astro", void 0);
const contentDir = "/src/content/";
const contentEntryGlob = /* @__PURE__ */ Object.assign({
  "/src/content/workshops/10PRINT.md": () => import("../10PRINT.814479bf.mjs"),
  "/src/content/workshops/10PRINT2.md": () => import("../10PRINT2.31530e27.mjs"),
  "/src/content/workshops/cubic_disarray.md": () => import("../cubic_disarray.c0659e9f.mjs"),
  "/src/content/workshops/eca.md": () => import("../eca.32ec33a7.mjs"),
  "/src/content/workshops/joydivision.md": () => import("../joydivision.67632fc2.mjs"),
  "/src/content/workshops/landscape.md": () => import("../landscape.4bdc65ff.mjs"),
  "/src/content/workshops/leaf.md": () => import("../leaf.cfd745dd.mjs"),
  "/src/content/workshops/mesh.md": () => import("../mesh.a795261a.mjs"),
  "/src/content/workshops/raymarching.md": () => import("../raymarching.ae24c896.mjs"),
  "/src/content/workshops/roots.md": () => import("../roots.182fd411.mjs"),
  "/src/content/workshops/square-disarray.md": () => import("../square-disarray.cac8a68b.mjs")
});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: contentEntryGlob,
  contentDir
});
const dataEntryGlob = /* @__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
  globResult: dataEntryGlob,
  contentDir
});
const collectionToEntryMap = createCollectionToGlobResultMap({
  globResult: { ...contentEntryGlob, ...dataEntryGlob },
  contentDir
});
let lookupMap = {};
lookupMap = { "workshops": { "type": "content", "entries": { "10print": "/src/content/workshops/10PRINT.md", "10print2": "/src/content/workshops/10PRINT2.md", "eca": "/src/content/workshops/eca.md", "joydivision": "/src/content/workshops/joydivision.md", "landscape": "/src/content/workshops/landscape.md", "leaf": "/src/content/workshops/leaf.md", "cubic_disarray": "/src/content/workshops/cubic_disarray.md", "mesh": "/src/content/workshops/mesh.md", "roots": "/src/content/workshops/roots.md", "raymarching": "/src/content/workshops/raymarching.md", "square-disarray": "/src/content/workshops/square-disarray.md" } } };
function createGlobLookup(glob) {
  return async (collection, lookupId) => {
    const filePath = lookupMap[collection]?.entries[lookupId];
    if (!filePath)
      return void 0;
    return glob[collection][filePath];
  };
}
const renderEntryGlob = /* @__PURE__ */ Object.assign({
  "/src/content/workshops/10PRINT.md": () => import("../10PRINT.d2118de1.mjs"),
  "/src/content/workshops/10PRINT2.md": () => import("../10PRINT2.fca8169a.mjs"),
  "/src/content/workshops/cubic_disarray.md": () => import("../cubic_disarray.5c9f2207.mjs"),
  "/src/content/workshops/eca.md": () => import("../eca.367df399.mjs"),
  "/src/content/workshops/joydivision.md": () => import("../joydivision.a6b24725.mjs"),
  "/src/content/workshops/landscape.md": () => import("../landscape.30d54600.mjs"),
  "/src/content/workshops/leaf.md": () => import("../leaf.0ac15625.mjs"),
  "/src/content/workshops/mesh.md": () => import("../mesh.7c65a171.mjs"),
  "/src/content/workshops/raymarching.md": () => import("../raymarching.7cbba74d.mjs"),
  "/src/content/workshops/roots.md": () => import("../roots.745ec90c.mjs"),
  "/src/content/workshops/square-disarray.md": () => import("../square-disarray.299d80ef.mjs")
});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
  globResult: renderEntryGlob,
  contentDir
});
const getCollection = createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap)
});
const getEntry = createGetEntry({
  getEntryImport: createGlobLookup(collectionToEntryMap),
  getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap)
});
const $$Astro = createAstro("https://editor.haxidraw.hackclub.com");
async function getStaticPaths() {
  const workshops = await getCollection("workshops", ({ data }) => data);
  return workshops.map((workshop) => ({
    params: { slug: workshop.slug }
  }));
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const data = await getEntry("workshops", slug);
  const rendered = await data.render();
  const Content = rendered.Content;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
    

    ${maybeRenderHead()}<div class="container">
        <div class="markdown">
            <p><a href="/workshops">&larr; Other workshops</a></p>
            ${renderComponent($$result2, "Content", Content, {})}
        </div>
    </div>
` })}`;
}, "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshop/[slug].astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshop/[slug].astro";
const $$url = "/workshop/[slug]";
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
export {
  $$Layout as $,
  _slug_ as _,
  getCollection as g
};
