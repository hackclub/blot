import { ReactNode } from 'preact/compat'
import { compiledContent } from '../../../interface/README.md'
import styles from './Help.module.scss'
import { useState } from 'preact/hooks'

const html = compiledContent()

export default function Help({
  toggleClose,
  helpHeight,
  workshop,
  slug
}: {
  toggleClose: () => void
  helpHeight: number
  workshop: any
}) {
  const closed = helpHeight <= 0
  const [tab, setTab] = useState<'workshop' | 'toolkit'>(
    workshop ? 'workshop' : 'toolkit'
  )

  return (
    <>
      <div class={styles.helpSection} style={{ height: `${helpHeight}%` }}>
        <div class={styles.helpSectionToolbar}>
          {workshop && (
            <a
              className={styles.helpSectionTab}
              style={{
                backgroundColor:
                  tab == 'workshop' ? 'rgba(var(--primary-rgb), 0.9)' : ''
              }}
              onClick={() => {
                setTab('workshop')
                if (closed) toggleClose()
              }}>
              Workshop
            </a>
          )}
          <a
            className={styles.helpSectionTab}
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
          <a className={styles.helpSectionTab} onClick={toggleClose}>
            {closed ? 'Open Help' : 'Close Help'}
          </a>
        </div>
        {tab === 'toolkit' && (
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            class={styles.helpContent}></div>
        )}
        {tab === 'workshop' && (
          <div class={styles.helpContent}>
            <h1>{workshop.frontmatter.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: workshop.content }}></div>
            <p>
              <a href={`/guide/${workshop.slug}`}>Open as full page</a>
            </p>
          </div>
        )}
      </div>
    </>
  )
}
