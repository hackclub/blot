javascript: (() => {
  async function request(url) {
    const a = await fetch(url);
    const b = await a.json();
    return b;
  }
  request("https://api.codetabs.com/v1/proxy?quest=http://154.53.63.206:9000/generate")
    .then(data => {
      document.querySelector("body > main > div.Editor_root > div.Editor_inner > div:nth-child(1) > div:nth-child(1) > div > div > div.cm-scroller > div.cm-content > div:nth-child(20)").innerHTML = `const graph = ${JSON.stringify(data)}`;
      document.querySelector("body > main > div.Editor_root > div.Toolbar_root > div:nth-child(1) > button").click();
    })
})();