import { useCallback, useEffect, useMemo } from 'preact/hooks'
import styles from './Dialog.module.css'
import cx from 'classnames'
import type { VNode } from 'preact'

type DialogProps = {
  title: string
  className?: string
  children: React.ReactNode
  show: boolean
  actions: VNode
  close: () => void
}

export default function Dialog({
  show,
  className,
  title,
  children,
  actions,
  close
}: DialogProps) {
  const id = useMemo(() => `_${Date.now()}`, [])

  const keyHandler = useCallback(() => {
    close()
  }, [])

  useEffect(() => {
    if (show) {
      window.addEventListener('keydown', keyHandler)
    } else {
      window.removeEventListener('keydown', keyHandler)
    }
    return () => {
      window.removeEventListener('keydown', keyHandler)
    }
  })

  return show ? (
    <div
      class={cx(styles.root, className)}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          close()
        }
      }}
      onClickCapture={e => {
        if (e.target === e.currentTarget) {
          close()
        }
      }}>
      <div
        role="dialog"
        aria-labelledby={id + '-label'}
        aria-describedby={id + '-desc'}
        class={styles.box}>
        <h2 id={id + '-label'}>{title}</h2>
        <p id={id + '-desc'}>{children}</p>
        <div class={styles.actions}>{actions}</div>
      </div>
    </div>
  ) : null
}
