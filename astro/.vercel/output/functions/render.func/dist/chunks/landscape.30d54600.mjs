async function getMod() {
  return import("./landscape.3e383ec8.mjs");
}
const collectedLinks = "@@ASTRO-LINKS@@";
const collectedStyles = "@@ASTRO-STYLES@@";
const collectedScripts = "@@ASTRO-SCRIPTS@@";
const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };
export {
  defaultMod as default
};
