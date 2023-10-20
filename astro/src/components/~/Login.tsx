import { useSignalEffect, Signal } from '@preact/signals'
import { useAuthHelper } from '../../lib/db/auth-helper.ts'
import type { SessionInfo } from '../../lib/db/account.ts'
import Input from './Input.tsx'
import Button from './Button.tsx'
import LinkButton from './LinkButton.tsx'

interface LoginProps {
  session: SessionInfo | null
  to: string
  email: string
}

export default function Login({ email, to }: LoginProps) {
  const auth = useAuthHelper('EMAIL_ENTRY', email)
  useSignalEffect(() => {
    if (auth.stage.value === 'LOGGED_IN') window.location.replace(to)
  })

  return (
    <>
      <form
        onSubmit={event => {
          event.preventDefault()
          if (auth.stage.value === 'EMAIL') auth.submitEmail()
          else if (auth.stage.value === 'CODE') auth.submitCode()
        }}>
        <h1>Log In to Blot</h1>
        {auth.stage.value === 'EMAIL' ? (
          <>
            <p>
              Please enter your email address below. We'll send you a code to
              access all your art.
            </p>
            <div class="input-wrapper">
              <Input
                class="input"
                type="email"
                id="email"
                autoComplete="email"
                placeholder="orpheus@hackclub.com"
                bind={auth.email}
              />
              <Button
                type="submit"
                class="button"
                disabled={!auth.emailValid.value}
                loading={auth.isLoading.value}>
                Send code
              </Button>
            </div>
          </>
        ) : (
          <>
            <p>
              Please enter the auth code we just emailed to you at {auth.email}.{' '}
              <span>
                Wrong email?{' '}
                <LinkButton
                  class="link-button"
                  onClick={() => auth.wrongEmail()}
                  disabled={auth.isLoading.value}>
                  Go back
                </LinkButton>
              </span>
            </p>
            <div class="input-wrapper">
              <Input
                class="input"
                id="code"
                type="text"
                maxLength={6}
                placeholder="123456"
                bind={auth.code}
              />
              {auth.state.value === 'CODE_INCORRECT' && (
                <p>Incorrect login code.</p>
              )}
              <Button
                class="button"
                type="submit"
                disabled={!auth.codeValid.value}
                loading={auth.isLoading.value}>
                Finish logging in
              </Button>
            </div>
          </>
        )}
      </form>
    </>
  )
}
