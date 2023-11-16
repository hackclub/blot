import styles from './Help.module.css'
import { useState } from 'preact/hooks'

export default function Help({
  toggleClose,
  helpHeight,
  guide,
  toolkit
}: {
  toggleClose: () => void
  helpHeight: number
  guide: string
  toolkit: string
}) {
  const closed = helpHeight <= 0
  const [tab, setTab] = useState<'guide' | 'toolkit'>(
    guide ? 'guide' : 'toolkit'
  )

  return (
    <>
      <div
        class={[styles.helpSection, 'help-section'].join(' ')}
        style={{ height: `${helpHeight}%` }}>
        <div class={styles.helpSectionToolbar}>
          {guide && (
            <a
              class={styles.helpSectionTab}
              style={{
                backgroundColor:
                  tab === 'guide' ? 'rgba(var(--primary-rgb), 0.9)' : ''
              }}
              onClick={() => {
                setTab('guide')
                if (closed) toggleClose()
              }}>
              Guide
            </a>
          )}
          <a
            class={styles.helpSectionTab}
            style={{
              backgroundColor:
                tab == 'toolkit' ? 'rgba(var(--primary-rgb), 0.9)' : ''
            }}
            onClick={() => {
              setTab('toolkit')
              if (closed) toggleClose()
            }}>
            Toolkit
          </a>
          <a class={styles.helpSectionTab} onClick={toggleClose}>
            {closed ? 'Open Help' : 'Close Help'}
          </a>
        </div>
        {tab === 'toolkit' && (
          <div
            class={`prose xs ${styles.helpContent}`}
            dangerouslySetInnerHTML={{ __html: toolkit }}
          />
        )}
        {tab === 'guide' && (
          <div class={`prose xs ${styles.helpContent}`}>
            <div dangerouslySetInnerHTML={{ __html: guide }} />
          </div>
        )}
      </div>
    </>
  )
}
