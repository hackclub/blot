import { useSignalEffect } from '@preact/signals'
import { useAuthHelper } from '../../db/auth-helper.ts'
import type { Session } from '../../db/account.ts'
import Input from '../../ui/login/Input.tsx'
import LinkButton from '../../ui/login/LinkButton.tsx'
import Button from '../../ui/Button.tsx'
import styles from './LoginModal.module.css'

interface LoginProps {
  session: SessionInfo | null
  to: string
  email: string
}

export default function LoginModal({ email, to }: LoginProps) {
  const auth = useAuthHelper('EMAIL_ENTRY', email)
  useSignalEffect(() => {
    if (auth.stage.value === 'LOGGED_IN') window.location.replace(to)
  })

  return (
    <div className={styles.modal}>
      <form
        className={styles.form}
        onSubmit={event => {
          event.preventDefault()
          if (auth.stage.value === 'EMAIL') auth.submitEmail()
          else if (auth.stage.value === 'CODE') auth.submitCode()
        }}>
        {auth.stage.value === 'EMAIL' ? (
          <>
            <p>
              Please enter your email address below. We'll send you a code to
              access all your art.
            </p>
            <div>
              <Input
                type="email"
                id="email"
                autoComplete="email"
                placeholder="orpheus@hackclub.com"
                bind={auth.email}
              />
              <Button
                type="submit"
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
                  style={{ color: 'var(--primary)', cursor: 'pointer' }}
                  onClick={() => auth.wrongEmail()}
                  disabled={auth.isLoading.value}>
                  Go back
                </LinkButton>
              </span>
            </p>
            <div>
              <Input
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
                type="submit"
                disabled={!auth.codeValid.value}
                loading={auth.isLoading.value}>
                Finish logging in
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
