

export function addCaching(state) {
  window.addEventListener("keydown", (e) => {
    const code = state.codemirror.state.doc.toString();
    window.localStorage.setItem("cache", code);
  })

  const cache = window.localStorage.getItem("cache");
  const cm = state.codemirror;
  cm.dispatch({
    changes: { from: 0, insert: cache ?? "" }
  });

  const search = window.location.search;
  const file = new URLSearchParams(search).get("file");

  if (file) {
    let file_url = file;
    if (!file.startsWith("http"))
      // file_url = isProduction
      //   ? `https://raw.githubusercontent.com/modular-things/modular-things/main/examples/${file}`
      //   : `examples/${file}`;

    fetch(file_url).then(async (res) => {
      const text = await res.text();

      const currentProg = cm.state.doc.toString();

      cm.dispatch({
        changes: { from: 0, to: currentProg.length, insert: text }
      });
    });
  }
}