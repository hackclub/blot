import styles from './TextField.module.css'
import cx from 'classnames'

type TextFieldProps = {
  label: string,
  value: string,
  onChange: (value: string) => void,
  type?: string,
  placeholder?: string,
  disabled?: boolean,
  required?: boolean,
  className?: string
}

export default function TextField(props: TextFieldProps) {
  return (
    <label class={cx(styles.label, props.className)}>
      {props.label}
      <input
        class={styles.input}
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        value={props.value}
        disabled={props.disabled}
        required={props.required}
        onChange={e => props.onChange((e.target as HTMLInputElement).value)}
      />
    </label>
  )
}