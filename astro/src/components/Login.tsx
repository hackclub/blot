import { useSignalEffect, Signal } from '@preact/signals'
import { useAuthHelper } from '../lib/db/auth-helper.ts'
import type { SessionInfo } from '../lib/db/account.ts'
import type { ComponentChild, JSX } from 'preact'

interface LoginProps {
  session: SessionInfo | null
  to: string
  email: string
}

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  id?: string
  placeholder?: string
  autoComplete?: string
  class?: string | undefined
  maxLength?: number
  bind?: Signal<string>
}

export function Input(props: InputProps) {
  return (
    <input
      id={props.id ?? ''}
      class={`${props.class ?? ''}`}
      type={props.type ?? 'text'}
      {...(props.bind
        ? {
            value: props.bind,
            onInput: event => {
              if (props.bind) props.bind.value = event.currentTarget.value
            }
          }
        : {})}
      autoComplete={props.autoComplete ?? 'off'}
      placeholder={props.placeholder ?? ''}
      maxLength={props.maxLength ?? Number.MAX_SAFE_INTEGER}
    />
  )
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  class?: string | undefined
  disabled?: boolean
  loading?: boolean
  children?: ComponentChild
  role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
  onClick?: () => void
}

export function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.class} ?? ""`}
      role={props.role ?? 'button'}
      type={props.type ?? 'button'}
      disabled={!!props.disabled || !!props.loading}
      onClick={() => props.onClick?.()}>
      {props.children}
    </button>
  )
}

interface LinkButtonProps {
  class?: string | undefined
  disabled?: boolean
  children?: ComponentChild
  role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
  onClick?: () => void
}

export function LinkButton(props: LinkButtonProps) {
  return (
    <span
      class={`${props.class ?? ''}`}
      role={props.role ?? 'button'}
      disabled={!!props.disabled}
      onClick={() => props.onClick?.()}>
      {props.children}
    </span>
  )
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
            <label for="email">Email:</label>
            <Input
              type="email"
              id="email"
              autoComplete="email"
              placeholder="orpheus@hackclub.com"
              bind={auth.email}
            />
            <Button
              disabled={!auth.emailValid.value}
              loading={auth.isLoading.value}>
              Send code
            </Button>
          </>
        ) : (
          <>
            <p>
              Please enter the auth code we just emailed to you at {auth.email}.{' '}
              <span>
                Wrong email?{' '}
                <LinkButton
                  onClick={() => auth.wrongEmail()}
                  disabled={auth.isLoading.value}>
                  Go back
                </LinkButton>
              </span>
            </p>
            <label for="code">Code:</label>
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
          </>
        )}
      </form>
    </>
  )
}
