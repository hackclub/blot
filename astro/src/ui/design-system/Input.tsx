import type { Signal } from '@preact/signals'

interface InputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  id?: string
  placeholder?: string
  autoComplete?: string
  class?: string | undefined
  maxLength?: number
  bind?: Signal<string>
}

export default function Input(props: InputProps) {
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
