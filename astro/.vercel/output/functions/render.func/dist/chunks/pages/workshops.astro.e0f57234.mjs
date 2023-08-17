import { c as createAstro, a as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, b as addAttribute, u as unescapeHTML } from "../astro.ddd8ab85.mjs";
import { g as getCollection, $ as $$Layout } from "./_slug_.astro.b84621a5.mjs";
import { marked } from "marked";
/* empty css                               */import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
import "html-escaper";
/* empty css                            *//* empty css                            */const $$Astro = createAstro("https://editor.haxidraw.hackclub.com");
const $$Workshops = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Workshops;
  const workshops = await getCollection("workshops", ({ data }) => data);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate`
  

  ${maybeRenderHead()}<div class="container">
    <h1>Workshops</h1>
    <p>Don't see one? Make your <a href="/editor">own</a>!</p>
    <div class="gallery">
        ${workshops.map((workshop, idx) => renderTemplate`<div class="card">
          <a${addAttribute(`/workshop/${workshop.slug}`, "href")}>

              <img${addAttribute(workshop.data.thumbnail, "src")}>
              <div class="content">
                <h2>${workshop.data.title}</h2>
                <div>${unescapeHTML(marked.parse(workshop.data.description))}</div>
              </div>
          </a>

          </div>`)}
    </div>
  </div>
` })}`;
}, "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshops.astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/workshops.astro";
const $$url = "/workshops";
export {
  $$Workshops as default,
  $$file as file,
  $$url as url
};
