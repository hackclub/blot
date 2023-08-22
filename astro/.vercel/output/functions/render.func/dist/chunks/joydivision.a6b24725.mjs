async function getMod() {
  return import("./joydivision.8670fafe.mjs");
}
const collectedLinks = "@@ASTRO-LINKS@@";
const collectedStyles = "@@ASTRO-STYLES@@";
const collectedScripts = "@@ASTRO-SCRIPTS@@";
const defaultMod = { __astroPropagation: true, getMod, collectedLinks, collectedStyles, collectedScripts };
export {
  defaultMod as default
};
