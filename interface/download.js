export function downloadText(filename, text) {

  // if (!text.match(/@version\s*:\s*(v[\S]+)/)) {
  //   const version = STATE.version;
  //   text = `// @version: ${version}\n${text}`;
  // }

  const blob = new Blob([text], { type: "text/plain" });

  var link = document.createElement("a"); // Or maybe get it from the current document
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link);
}