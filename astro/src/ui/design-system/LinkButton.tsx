import type { HTMLAttributes } from 'astro/types'
import type { ComponentChild, JSX } from 'preact'

interface LinkButtonProps {
  class?: string | undefined
  style?: JSX.CSSProperties
  disabled?: boolean
  children?: ComponentChild
  role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
  onClick?: () => void
}

export default function LinkButton(props: LinkButtonProps) {
  return (
    <span
      class={`${props.class ?? ''}`}
      role={props.role ?? 'button'}
      disabled={!!props.disabled}
      onClick={() => props.onClick?.()}
      style={props.style ?? {}}>
      {props.children}
    </span>
  )
}
