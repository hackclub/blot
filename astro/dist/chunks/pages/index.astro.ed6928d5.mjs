import { c as createAstro, a as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, d as renderHead, f as renderComponent, e as renderSlot } from "../astro.2c740cbe.mjs";
import "html-escaper";
/* empty css                            *//* empty css                              *//* empty css                           */const $$Astro$2 = createAstro("https://haxidraw.hackclub.com");
const $$Navbar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navbar;
  return renderTemplate`

${maybeRenderHead()}<nav>
  <a href="/">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
    <span style="font-weight: 700;">blot</span>
  </a>
  <div style="font-size: 1.2rem;">
    <a href="/editor">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path><path d="m15 5 4 4"></path></svg>
      <span>editor</span>
    </a>
    <a href="/guides">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-graduation-cap"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
      <span>guides</span>
    </a>
    <a href="/gallery">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"></circle><circle cx="17.5" cy="10.5" r=".5"></circle><circle cx="8.5" cy="7.5" r=".5"></circle><circle cx="6.5" cy="12.5" r=".5"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
      <span>gallery</span>
    </a>
    <a href="/assembly">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-wrench"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>
      <span>assembly</span>
    </a>
  </div>
</nav>`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/components/Navbar.astro", void 0);
const $$Astro$1 = createAstro("https://haxidraw.hackclub.com");
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  let { title, description } = Astro2.props;
  title = `Blot | ${title}` || "Blot";
  description = description || "Blot editor!";
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="description"${addAttribute(description, "content")}>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="generator"${addAttribute(Astro2.generator, "content")}>
    <title>${title}</title>
  ${renderHead()}</head>
  <body>
    ${renderComponent($$result, "Navbar", $$Navbar, {})}
    ${renderSlot($$result, $$slots["default"])}
  </body></html>`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/layouts/Layout.astro", void 0);
const $$Astro = createAstro("https://haxidraw.hackclub.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`



${renderComponent($$result, "Layout", $$Layout, { "title": "Blot", "description": "Blot, the plotter bot from Hack Club: you code art, we send you a machine.", "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<div class="lead-section astro-J7PV25F6">
    <div class="header-section strong-header astro-J7PV25F6">
      <div class="astro-J7PV25F6">Blot, the plotter bot</div>
      <div class="astro-J7PV25F6">from <a href="https://www.hackclub.com" class="astro-J7PV25F6">Hack Club</a>.</div>
      <div class="sub-header astro-J7PV25F6">You* code art, we send you a machine.</div>
    </div>
    <div class="three-js-container astro-J7PV25F6"></div>
    <div class="disclaimer astro-J7PV25F6">
      (*Must be a 20 years old to receive a free machine.)
    </div>
  </div>
  <div class="how-to header-text astro-J7PV25F6">
    <div class="video-text astro-J7PV25F6">
      <div class="astro-J7PV25F6">
        1) Learn to make generative art with our <a href="/guides" class="astro-J7PV25F6">guides</a>
         and from the community.
      </div>
      <div class="astro-J7PV25F6">2) Make an original art piece.</div>
      <div class="astro-J7PV25F6">
        3) Submit it as a pull request to the art <a href="/gallery" class="astro-J7PV25F6">gallery</a>.
      </div>
      <div class="astro-J7PV25F6">
        4) Get parts for your Blot in the mail and <a href="/assembly" class="astro-J7PV25F6">build your own</a> machine.
      </div>
    </div>
    <div class="youtube-video-container astro-J7PV25F6">
      <iframe class="youtube-video astro-J7PV25F6" src="https://www.youtube.com/embed/yxvEO-wUz2g?si=jspPdOWhnDxh_VcR"></iframe>
    </div>
  </div>
  <div class="get-started header-text astro-J7PV25F6">
    Haven't programmed before? Don't worry you can get started here.
  </div>
` })}`;
}, "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/index.astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/haxidraw/new/astro/src/pages/index.astro";
const $$url = "";
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: "Module" }));
export {
  $$Layout as $,
  index as i
};
