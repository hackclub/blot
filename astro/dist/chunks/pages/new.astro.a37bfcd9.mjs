import { c as createAstro, a as createComponent, r as renderTemplate, f as renderComponent, m as maybeRenderHead } from "../astro.2c740cbe.mjs";
import "html-escaper";
import { $ as $$Layout } from "./index.astro.ed6928d5.mjs";
import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
/* empty css                            *//* empty css                              *//* empty css                           */const $$Astro = createAstro("https://haxidraw.hackclub.com");
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$New;
  return renderTemplate`

${renderComponent($$result, "Layout", $$Layout, { "title": "Blot", "description": "Blot, the plotter bot from Hack Club: you code art, we send you a machine." }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div < Layout></div>
` })}`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/new.astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/new.astro";
const $$url = "/new";
export {
  $$New as default,
  $$file as file,
  $$url as url
};
