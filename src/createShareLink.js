import { patchStore, getStore } from "./state.ts";
import { post } from "./post.js";

export async function createShareLink(content) {
  const { loginName, sessionKey } = getStore();

  if (loginName === "") {
    alert("Log in to create share links.");
    return;
  }

  const [ res, err] = await post("/create-share-link", { 
    sessionKey,
    email: loginName,
    content: content,
  });

  const link = `${window.location.href}?shareId=${res.id}`;

  customAlert(`
    <div>Share the file at:</div>
    <br/>
    <div style="font-size: .75rem;">
      <a href="${link}" target="_blank" style="color: blue;">${link}</a>
    </div>
    <br/>
    <div>Share links last for 1 week.</div>
  `)

  return res.id;
}

function customAlert(html) {

  const el = document.createElement("div");
  const style = `
    z-index: 999999999999;
    width: 550px;
    min-height: 100px;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0%);
    background: #f4f4f4;
    border-radius: 10px;
    border: 1px solid black;
    padding: 8px;
  `

  el.innerHTML = `
    <div style="${style}">
      <div>${html}</div>

      <span style="width: 100%; display: flex;">
        <button class="mx-auto my-1 text-white p-2 rounded cursor-pointer bg-gray-700 hover:bg-gray-500">
          close
        </button>
      </span>
    </div>
  `

  el.querySelector("button").addEventListener("click", () => {
    el.remove();
  })

  document.body.append(el);
}