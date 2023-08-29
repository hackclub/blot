import styles from './Button.module.css'
import type { ComponentChild, JSX } from 'preact'
import cx from 'classnames'

type ButtonProps = {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost'
  icon?: boolean
  class?: string | undefined
  disabled?: boolean
  loading?: boolean
  children?: ComponentChild
  role?: JSX.HTMLAttributes<HTMLButtonElement>['role']
  onClick?: () => void
} & (
  | {
      'icon': true
      'aria-label': string
    }
  | {
      icon?: false
    }
)

export default function Button(props: ButtonProps) {
  return (
    <button
      class={cx(
        styles.button,
        props.variant === 'secondary'
          ? styles.secondary
          : props.variant === 'accent'
          ? styles.accent
          : props.variant === 'ghost'
          ? styles.ghost
          : '',
        props.loading ? styles.loading : '',
        props.icon && styles.icon,
        props.class ?? ''
      )}
      role={props.role ?? 'button'}
      type={props.type ?? 'button'}
      disabled={props.disabled || props.loading}
      onClick={() => props.onClick?.()}
      {...(props.icon ? { 'aria-label': props['aria-label'] } : {})}>
      {props.children}
    </button>
  )
}
