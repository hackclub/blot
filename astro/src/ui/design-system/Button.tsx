import type { ComponentChild, JSX } from 'preact'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  class?: string | undefined
  disabled?: boolean
  loading?: boolean
  children?: ComponentChild
  role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
  onClick?: () => void
}

export default function Button(props: ButtonProps) {
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
