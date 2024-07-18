import { patchStore, getStore } from "./state.ts";
import { post } from "./post.js";

export async function createShareLink(content) {
  const { loginName, sessionKey ,theme} = getStore();
  let text = 'color:blue;'
  if(theme=="dark"){
    text = ' color:#1E7898;'
  }
  if (loginName === "") {
    alert("Log in to create share links.");
    return;
  }

  const [ res, err] = await post("/create-share-link", { 
    sessionKey,
    email: loginName,
    content: content,
  });

  const url = new URL(window.location.href);
  const link = `${url.origin}${url.pathname}?shareId=${res.id}`;

  customAlert(`
  
    <div>Share the file at:</div>
    <br/>
    <div style="font-size: .75rem;">
      <a href=${link} target="_blank" style=${text}>${link}</a>
    </div>
    <br/>
    <div>Share links last for 1 week.</div>
  `)

  return res.id;
}

function customAlert(html) {
  const {theme} = getStore()
  let bg = 'background: #f4f4f4;'
  if(theme=="dark"){
    bg = 'background: var(--primary-dark-grey); color: white'
  }
  const el = document.createElement("div");
  const style = `
    z-index: 999999999999;
    width: 550px;
    min-height: 100px;
    position: absolute;
    left: 50%;
    top: 100px;
    transform: translate(-50%, 0%);
   
    border-radius: 10px;
    border: 1px solid black;
    padding: 8px;
    \n
  `+bg

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