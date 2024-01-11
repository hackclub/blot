import Button from '../ui/Button.tsx'
import { useSendLoginCode, useUser } from '@hackclub/hackend-client'
import styles from './AccountIndicator.module.css'
import Dialog from '../ui/Dialog.tsx'
import { useState } from 'preact/hooks'
import TextField from '../ui/TextField.tsx'

export default function AccountIndicator() {
  const token = useUser();
  const [loginState, setLoginState] = useState<false | true | string>(false);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const  { status: sendCodeStatus, error: sendCodeError, mutateAsync: sendCodeMutate }  = useSendLoginCode();

  if (!token) {
    return <div className={styles.root}>
      <Button variant={"ghost"} onClick={() => setLoginState(true)}>
        <span className={styles.highlighted}>
          log in to save your work!
        </span>
      </Button>
      <Dialog
        show={loginState !== false}
        title="Login"
        close={() => setLoginState(false)}
        actions={loginState === true ? (
          <Button onClick={async () => {
            const res = await sendCodeMutate(loginEmail);
            setLoginState(res);
          }}>Send code</Button>
        ) : (
          <></>
        )}
      >
        <TextField placeholder="borpheus@hackclub.com" type="email" label="Email" value={loginEmail} onChange={setLoginEmail} />
      </Dialog>
    </div>
  }

  return (
    <Button variant="ghost">
      <span>saving to {token.email}</span>
    </Button>
  )
}