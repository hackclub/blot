import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead, b as addAttribute } from "./astro.2c740cbe.mjs";
import "html-escaper";
import { $ as $$Layout } from "./pages/index.astro.ed6928d5.mjs";
/* empty css                             *//* empty css                            *//* empty css                           *//* empty css                           */const $$Astro$3 = createAstro("https://haxidraw.hackclub.com");
const prerender$3 = true;
const $$Assembly = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Assembly;
  const assembly2 = (await Astro2.glob(/* @__PURE__ */ Object.assign({ "../ASSEMBLY.md": () => import("./ASSEMBLY.a2272ac7.mjs") }), () => "/../ASSEMBLY.md"))[0];
  console.log(assembly2);
  const { Content } = assembly2;
  const headings = assembly2.getHeadings();
  return renderTemplate`

${renderComponent($$result, "Layout", $$Layout, { "title": "Assembly", "description": "Learn how to assemble your Blot machine!" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<section id="container">
    <div class="toc">
      ${headings.map((heading, idx) => {
    let prevDepth = idx > 0 ? headings[idx - 1].depth : Infinity;
    switch (heading.depth) {
      case 1:
        return renderTemplate`<h1>
                  <a${addAttribute(`#${heading.slug}`, "href")}>${heading.text}</a>
                </h1>`;
      case 2:
        return renderTemplate`<h2>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 2 ? "4px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h2>`;
      case 3:
        return renderTemplate`<h3>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "5px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h3>`;
      case 4:
        return renderTemplate`<h4>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "6px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h4>`;
      case 5:
        return renderTemplate`<h5>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "7px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h5>`;
      case 6:
        return renderTemplate`<h6>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "8px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h6>`;
    }
  })}
    </div>
    <div class="prose">
      <heaader>
        <h1>Assembly</h1>
      </heaader>
      <article>
        ${renderComponent($$result2, "Content", Content, {})}
        <p>
          <a${addAttribute(`https://github.com/hackclub/haxidraw/edit/main/ASSEMBLY.md`, "href")} target="_blank">Update/make a grammar fix
          </a>
        </p>
      </article>
    </div>
  </section>
` })}`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/assembly.astro", void 0);
const $$file$3 = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/assembly.astro";
const $$url$3 = "/assembly";
const assembly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Assembly,
  file: $$file$3,
  prerender: prerender$3,
  url: $$url$3
}, Symbol.toStringTag, { value: "Module" }));
const slug = (file) => file.replace(".md", "").slice(file.lastIndexOf("/") + 1);
var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro("https://haxidraw.hackclub.com");
const prerender$2 = true;
const $$Gallery = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Gallery;
  const list = (await Astro2.glob(/* @__PURE__ */ Object.assign({ "../art/list.json": () => import("./list.acf15678.mjs") }), () => "/../art/list.json"))[0].default;
  let art = {};
  list.map((folder) => {
    folder.snapshots.map((snapshot) => {
      art[snapshot] = { folder: folder.directory, source: folder.source };
    });
  });
  const images = (await Astro2.glob(/* @__PURE__ */ Object.assign({ "../art/eca-henry/snapshots/eca1.png": () => import("./eca1.a6249525.mjs"), "../art/eca-henry/snapshots/eca2.png": () => import("./eca2.d7f94f1a.mjs"), "../art/eca-henry/snapshots/eca3.png": () => import("./eca3.e966ad35.mjs"), "../art/eca-henry/snapshots/eca4.png": () => import("./eca4.c0df7380.mjs"), "../art/hilbert_golf-henry/snapshots/hilbert_golf.png": () => import("./hilbert_golf.3461ce6b.mjs"), "../art/landscape-henry/snapshots/landscape.png": () => import("./landscape.a030df79.mjs"), "../art/leaf-leo/snapshots/leaf.png": () => import("./leaf.9c547c4e.mjs"), "../art/raymarching-henry/snapshots/raymarching1.png": () => import("./raymarching1.f7b48cb9.mjs"), "../art/roots-kai/snapshots/roots.png": () => import("./roots.6bc96e70.mjs"), "../art/square-disarray-leo/snapshots/0.png": () => import("./0.1e4b3ebc.mjs"), "../art/tidal-flats-leo/snapshots/tidalFlats.png": () => import("./tidalFlats.578c844a.mjs"), "../art/tree-leo/snapshots/tree.png": () => import("./tree.6810552d.mjs") }), () => "/../art/*/snapshots/*")).map(
    (img) => img.default
  );
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script src="/masonry.min.js" type="module"><\/script>\n\n\n\n\n\n', ""])), renderComponent($$result, "Layout", $$Layout, { "title": "Gallery", "description": "A gallery of various art pieces created by Hack Clubbers." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div id="container">
    <div id="gallery">
      <div class="framed" id="content">
        <h1${addAttribute({ marginBottom: 0 }, "style")}>Gallery</h1>
        <p${addAttribute({ marginTop: 0 }, "style")}>
          A gallery of various art pieces created by Hack Clubbers, with an
          interactive gallery mode built in!
        </p>
      </div>
      ${images.map((img) => {
    return renderTemplate`<div class="frame">
              <div class="border">
                <a${addAttribute(`/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/${art[slug(img)].folder}/${art[slug(img)].source}`, "href")}>
                  <img class="thumbnail"${addAttribute(img.directory, "alt")}${addAttribute(img, "src")}>
                </a>
              </div>
            </div>`;
  })}
    </div>
  </div>
` }));
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/gallery.astro", void 0);
const $$file$2 = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/gallery.astro";
const $$url$2 = "/gallery";
const gallery = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Gallery,
  file: $$file$2,
  prerender: prerender$2,
  url: $$url$2
}, Symbol.toStringTag, { value: "Module" }));
var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro("https://haxidraw.hackclub.com");
const prerender$1 = true;
const $$Guides = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Guides;
  const workshops = await Astro2.glob(/* @__PURE__ */ Object.assign({ "../guides/10PRINT.md": () => import("./10PRINT.0b5b2cbd.mjs"), "../guides/10PRINT2.md": () => import("./10PRINT2.1799135f.mjs"), "../guides/cubic_disarray.md": () => import("./cubic_disarray.b847e88c.mjs"), "../guides/eca.md": () => import("./eca.f6a41b6d.mjs"), "../guides/joydivision.md": () => import("./joydivision.fd20329a.mjs"), "../guides/landscape.md": () => import("./landscape.e6d6240e.mjs"), "../guides/leaf.md": () => import("./leaf.58085b6c.mjs"), "../guides/mesh.md": () => import("./mesh.90ad879c.mjs"), "../guides/raymarching.md": () => import("./raymarching.ce3ae146.mjs"), "../guides/roots.md": () => import("./roots.31c944ec.mjs"), "../guides/square-disarray.md": () => import("./square-disarray.480d94a9.mjs") }), () => "/../guides/*.md");
  return renderTemplate(_a || (_a = __template(['<script src="/masonry.min.js" type="module"><\/script>\n\n\n\n\n\n', ""])), renderComponent($$result, "Layout", $$Layout, { "title": "Guides", "description": "A gallery of various guides created by Hack Clubbers." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div id="container">
    <div id="gallery">
      <div class="framed" id="content">
        <h1${addAttribute({ marginBottom: 0 }, "style")}>Gallery</h1>
        <p${addAttribute({ marginTop: 0 }, "style")}>
          A gallery of various art pieces created by Hack Clubbers, with an
          interactive gallery mode built in!
        </p>
      </div>
      ${workshops.sort(
    (a, b) => a.frontmatter.pinned ? -1 : b.frontmatter.pinned ? 1 : 0
  ).map((workshop) => renderTemplate`<a class="frame"${addAttribute(`/guide/${slug(workshop.file)}`, "href")}>
              <div class="border">
                <img class="thumbnail"${addAttribute(workshop.frontmatter.thumbnail, "src")}>
                <div class="prose">
                  <h2${addAttribute({ marginBottom: 0 }, "style")}>
                    ${workshop.frontmatter.title}
                  </h2>
                </div>
              </div>
            </a>`)}
    </div>
  </div>
` }));
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/guides.astro", void 0);
const $$file$1 = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/guides.astro";
const $$url$1 = "/guides";
const guides = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Guides,
  file: $$file$1,
  prerender: prerender$1,
  url: $$url$1
}, Symbol.toStringTag, { value: "Module" }));
const $$Astro = createAstro("https://haxidraw.hackclub.com");
const Astro = $$Astro;
const prerender = true;
async function getStaticPaths() {
  const workshops = await Astro.glob(/* @__PURE__ */ Object.assign({ "../guides/10PRINT.md": () => import("./10PRINT.0b5b2cbd.mjs"), "../guides/10PRINT2.md": () => import("./10PRINT2.1799135f.mjs"), "../guides/cubic_disarray.md": () => import("./cubic_disarray.b847e88c.mjs"), "../guides/eca.md": () => import("./eca.f6a41b6d.mjs"), "../guides/joydivision.md": () => import("./joydivision.fd20329a.mjs"), "../guides/landscape.md": () => import("./landscape.e6d6240e.mjs"), "../guides/leaf.md": () => import("./leaf.58085b6c.mjs"), "../guides/mesh.md": () => import("./mesh.90ad879c.mjs"), "../guides/raymarching.md": () => import("./raymarching.ce3ae146.mjs"), "../guides/roots.md": () => import("./roots.31c944ec.mjs"), "../guides/square-disarray.md": () => import("./square-disarray.480d94a9.mjs") }), () => "/../guides/*.md");
  return workshops.map((workshop) => {
    return { params: { slug: slug(workshop.file) } };
  });
}
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug: route } = Astro2.params;
  const workshops = await Astro2.glob(/* @__PURE__ */ Object.assign({ "../guides/10PRINT.md": () => import("./10PRINT.0b5b2cbd.mjs"), "../guides/10PRINT2.md": () => import("./10PRINT2.1799135f.mjs"), "../guides/cubic_disarray.md": () => import("./cubic_disarray.b847e88c.mjs"), "../guides/eca.md": () => import("./eca.f6a41b6d.mjs"), "../guides/joydivision.md": () => import("./joydivision.fd20329a.mjs"), "../guides/landscape.md": () => import("./landscape.e6d6240e.mjs"), "../guides/leaf.md": () => import("./leaf.58085b6c.mjs"), "../guides/mesh.md": () => import("./mesh.90ad879c.mjs"), "../guides/raymarching.md": () => import("./raymarching.ce3ae146.mjs"), "../guides/roots.md": () => import("./roots.31c944ec.mjs"), "../guides/square-disarray.md": () => import("./square-disarray.480d94a9.mjs") }), () => "/../guides/*md");
  const workshop = workshops.find((workshop2) => slug(workshop2.file) === route);
  if (!workshop)
    return Astro2.redirect("/404");
  const { Content } = workshop;
  const headings = await workshop.getHeadings();
  const { title, thumbnail, contributors } = workshop.frontmatter;
  return renderTemplate`

${renderComponent($$result, "Layout", $$Layout, { "title": `Guide: ${title}` }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<section id="container">
    <div class="toc">
      ${headings.map((heading, idx) => {
    let prevDepth = idx > 0 ? headings[idx - 1].depth : Infinity;
    switch (heading.depth) {
      case 1:
        return renderTemplate`<h1>
                  <a${addAttribute(`#${heading.slug}`, "href")}>${heading.text}</a>
                </h1>`;
      case 2:
        return renderTemplate`<h2>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 2 ? "4px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h2>`;
      case 3:
        return renderTemplate`<h3>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "5px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h3>`;
      case 4:
        return renderTemplate`<h4>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "6px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h4>`;
      case 5:
        return renderTemplate`<h5>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "7px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h5>`;
      case 6:
        return renderTemplate`<h6>
                  <a${addAttribute(`#${heading.slug}`, "href")}${addAttribute({ marginLeft: prevDepth < 3 ? "8px" : "" }, "style")}>
                    ${heading.text}
                  </a>
                </h6>`;
    }
  })}
      <p id="cta">
        <a${addAttribute(`/editor?tutorial=${route}`, "href")}>Open in editor</a>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" x2="21" y1="14" y2="3"></line></svg>
      </p>
    </div>
    <div class="prose">
      <div id="back">
        <p>
          <a href="/guides">&larr; Back to all guides</a>
        </p>
      </div>
      <header>
        <h1>${title}</h1>
      </header>
      <article>
        ${renderComponent($$result2, "Content", Content, {})}
        <p>
          <a${addAttribute(`https://github.com/hackclub/haxidraw/edit/main/guides/${route}.md`, "href")} target="_blank">Update/make a grammar fix
          </a>
        </p>
      </article>
    </div>
  </section>
` })}`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/guide/[slug].astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/guide/[slug].astro";
const $$url = "/guide/[slug]";
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  getStaticPaths,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
export {
  _slug_ as _,
  assembly as a,
  guides as b,
  gallery as g
};
