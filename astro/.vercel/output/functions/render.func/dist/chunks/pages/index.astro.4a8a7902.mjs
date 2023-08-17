import { c as createAstro, a as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from "../astro.ddd8ab85.mjs";
import { $ as $$Layout } from "./_slug_.astro.b84621a5.mjs";
/* empty css                           */import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
import "html-escaper";
/* empty css                            *//* empty css                            */const $$Astro = createAstro("https://editor.haxidraw.hackclub.com");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "class": "astro-J7PV25F6" }, { "default": ($$result2) => renderTemplate`
  

  ${maybeRenderHead()}<canvas id="canvas" class="astro-J7PV25F6"></canvas>

  

  <div class="banner astro-J7PV25F6">
    <div class="banner-upper astro-J7PV25F6">
      <div class="blot-title astro-J7PV25F6">Blot, a plotter bot from Hack Club</div>
    </div>

    <div class="banner-lower astro-J7PV25F6">
      <img class="blot-bot astro-J7PV25F6" style="min-width: 60%" src="/blot-bot-clear.png">
      <div class="banner-text astro-J7PV25F6">
        <div class="astro-J7PV25F6">
          Blot is a <a href="youshipweship.com" class="astro-J7PV25F6">"You Ship, We Ship"</a> project
          from Hack Club. It's both a robot and an art project.
        </div>

        <br class="astro-J7PV25F6">

        <div class="astro-J7PV25F6">
          We're creating an <a href="3dmaze" class="astro-J7PV25F6">art gallery</a>. It's an endlessly
          explorable space filled with <a href="2dgallery" class="astro-J7PV25F6">your art programs</a>. When you <a href="howtosubmit" class="astro-J7PV25F6">submit your art</a> to the gallery
          we will send you a <a href="resourcesonmachine" class="astro-J7PV25F6">drawing machine</a> to
          turn that art into a real physical piece.
        </div>

        <br class="astro-J7PV25F6">

        <div class="astro-J7PV25F6">
          Together we'll practice the art of programming, dive into digital
          fabrication, and <a href="linktomuseumexhibit" class="astro-J7PV25F6">build something amazing together</a>.
        </div>
      </div>
    </div>
  </div>
` })}`;
}, "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/index.astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/index.astro";
const $$url = "";
export {
  $$Index as default,
  $$file as file,
  $$url as url
};
