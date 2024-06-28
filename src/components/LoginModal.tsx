import { useEffect, useState } from "preact/hooks";
import { patchStore, getStore } from "../state.ts";

import { checkCurrentUser } from "../init.js";

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

export default function LoginModal() {  

  const [state, setState] = useState({
    isError: false,
    msg: "",
    inputValue: "",
    codeSent: false,
    headerText: "Enter your email to log in.",
    loggedIn: false,
  });

  const updateState = (newState) => setState((prev) => ({ ...prev, ...newState }));

  const reset = () => {
    updateState({
      isError: false,
      msg: "",
      inputValue: "",
      codeSent: false,
      headerText: "Enter your email to log in.",
      loggedIn: false,
    });
  };

  const logout = () => {
    console.log("log out");
    reset();
  };

  const handleSendOrSubmitCode = async () => {
    if (!state.codeSent) {
      await sendCode();
    } else {
      await submitCode();
    }
  };

  const sendCode = async () => {
    if (!isValidEmail(state.inputValue)) {
      updateState({ isError: true, msg: "Please enter a valid email." });
      return;
    }

    updateState({ msg: "sending code..." });

    try {
      const res = await fetch('/get-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.inputValue })
      }).then(res => res.json());

      if (res.ok) {
        updateState({
          msg: "",
          inputValue: "",
          headerText: "Enter the log in code you received.",
          codeSent: true,
        });
      } else {
        throw new Error("unknown error occurred");
      }
    } catch (error) {
      updateState({ isError: true, msg: error.message });
    }
  };

  const submitCode = async () => {
    try {
      const res = await fetch('/submit-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.inputValue, code: state.inputValue }) // Assuming email is stored or retrieved differently, adjust accordingly
      }).then(res => res.json());

      if (res.email && res.sessionKey) {
        updateState({
          headerText: "Logged in!",
          msg: "",
          codeSent: false,
          inputValue: "",
          loggedIn: true,
        });

        localStorage.setItem('session_secret_key', res.sessionKey);

        checkCurrentUser();
      } else {
        throw new Error("Wrong log in code.");
      }
    } catch (error) {
      updateState({ headerText: "Enter the log in code you received.", msg: error.message, isError: true });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendOrSubmitCode();
    }

    // if (e.key === 'Esc') {
    //   reset(); 
    //   patchStore({ loginModalOpen: false });
    // }
  };
  const { theme } = getStore()
  let css = "bg-[var(--primary)]"
  let css2 = ""
  let css3 = ""
  if(theme == "dark"){
    css = "bg-dark-mode-blue"
    css2 = "bg-dark-mode-grey"
    css3 = "text-white"
  }

  return (
    <div class={`absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-96 shadow-lg rounded-md bg-white`}>
      <div class={"p-3 text-white overflow \n " + css}>
        <div class="flex justify-between">
          <span>{state.headerText}</span>
          <span class="cursor-pointer hover:text-red-500" onClick={() => { reset(); patchStore({ loginModalOpen: false }); }}>x</span>
        </div>
        {state.codeSent && (
          <div class="text-gray-200 text-sm pt-2">
            Wrong email?
            <span class="underline pl-2 cursor-pointer" onClick={reset}>
              Go back.
            </span>
          </div>
        )}

        {false && state.loggedIn && 
          <div class="text-gray-200 text-sm pt-2">
            <span class="underline cursor-pointer" onClick={logout}>
              Log out.
            </span>
          </div>
        }
      </div>
      { !state.loggedIn &&
        <div class={"w-full flex p-2 items-center justify-center flex-col \n " + css2}>
          <input value={state.inputValue} onKeyDown={handleKeyPress} onInput={(e) => updateState({ isError: false, msg: "", inputValue: e.target.value })} class={"p-1 w-[70%] border \n" + css2 +"\n"+css3}/>
          <button onClick={handleSendOrSubmitCode} class="m-3 p-2 w-[50%] text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded">
            {state.codeSent ? "submit code" : "send code"}
          </button>
          <div class={`${state.isError ? "text-red-500" : ""}`}>{state.msg}</div>
        </div> 
      }
    </div>
  );
}
