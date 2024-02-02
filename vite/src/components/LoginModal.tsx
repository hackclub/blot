import { useEffect, useState } from 'preact/hooks'

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

/*
  POSSIBLE_STATES = "NEED_EMAIL" 
         | "SENDING_CODE" 
         | "NEED_CODE" 
         | "LOGGED-IN" 
         | "ERROR"
*/

export default function LoginModal() {

  const [ hidden, setHidden ] = useState(false);
  const [ isError, setError ] = useState(false);
  const [ msg, setMsg ] = useState("");
  const [ inputValue, setInputValue ] = useState("leo@hackclub.com");
  const [ codeSent, setCodeSent ] = useState(false);
  const [ headerText, setHeaderText ] = useState("Enter your email to log in.");
  const [ loggedIn, setLoggedIn ] = useState(false);

  const reset = () => {
    setError(false);
    setMsg("");
    setInputValue("");
    setCodeSent(false);
    setHeaderText("Enter your email to log in.");
    setLoggedIn(false);
  }

  const logout = () => {
    console.log("log out");
    reset();
  }

  useEffect(() => {
    document.addEventListener("click", e => {
      const clickedInModal = e.composedPath().some(el => el.matches && el.hasAttribute("is-login-modal"));
      
      if (!clickedInModal) {
        setHidden(true);
        reset();
      }
    })
  }, []);

  let email = "";
  const sendCode = async () => {
    const emailIsValid = isValidEmail(inputValue);

    if (!emailIsValid) {
      setError(true);
      setMsg("Please enter a valid email.")
    } else {

      // TODO: SEND CODE

      setMsg("sending code...");

      let res;

      try {
        res = await fetch('/api/sendCode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: inputValue })
        })
      } catch (err) {

      }
      
      if (res.ok) {
        email = inputValue;
        setMsg("")
        setInputValue("");
        setHeaderText("Enter the log in code you received.");
        setCodeSent(true);
      } else {
        console.error(res);
        setError(true);
        setMsg("unknown error occurred");
      }
    }
  }

  const submitCode = async () => {

    let res;
    try {
      res = await fetch('/api/submitCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, code: inputValue })
      });
    } catch (err) {

    }


    if (res.ok) {
      setHeaderText("Logged in!");
      setMsg("");
      setCodeSent(false);
      setInputValue("");
      setLoggedIn(true);
    } else {
      setHeaderText("Enter the log in code you received.");
      setMsg("Wrong log in code.");
      setError(true);
      console.error(await res.text());
    }
  }

  return <>
    <div is-login-modal class={`${hidden ? "hidden" : ""} absolute top-20 z-[9999999] left-[50%] overflow-hidden translate-x-[-50%] border-black w-96 shadow-lg rounded-md bg-white`}>
      <div class="bg-[var(--primary)] p-3 text-white overflow">
        {headerText}
        {codeSent &&
            <div class="text-gray-200 text-sm pt-2">
              Wrong email? 
              <span 
                class="underline pl-2 cursor-pointer"
                onClick={reset}>
                Go back.
                </span>
            </div>
          }

        {loggedIn &&
          <div class="text-gray-200 text-sm pt-2">
            <span 
              class="underline cursor-pointer"
              onClick={logout}>
              Log out.
              </span>
          </div>
        }
      </div>
      <div class={`${loggedIn ? "hidden" : ""} w-full flex p-2 items-center justify-center flex-col`}>
        <input 
          value={inputValue}
          onInput={e => {
            setError(false);
            setMsg("");
            setInputValue(e.target.value);
          }} 
          class="p-1 w-[70%] border" />

        <button 
          onClick={!codeSent ? sendCode : submitCode} 
          class="m-3 p-2 w-[50%] text-center cursor-pointer bg-gray-700 hover:bg-gray-500 text-white rounded">
          {!codeSent ? "send code" : "submit code"}
        </button>

        <div class={`${isError ? "text-red-500" : ""}`}>{msg}</div>

      </div>
    </div>
  </>
}


