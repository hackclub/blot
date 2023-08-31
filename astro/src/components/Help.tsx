import { compiledContent } from '../../../interface/README.md'
import styles from './Help.module.css'

const html = compiledContent()

export default function Help({close, helpHeight}: {close: () => void, helpHeight: number}) {
  const closed = helpHeight <= 0
  return <>
    <div class={styles.helpSection} style={{ height: `${helpHeight}%` }}>
      <div class={styles.helpSectionToolbar}>
        <a className={styles.helpSectionTab}>Workshops</a>
        <a className={styles.helpSectionTab}>Toolkit</a>
        <a className={styles.helpSectionTab} onClick={close}>{closed ? "Open Help" : "Close Help"}</a>
      </div>
      <div dangerouslySetInnerHTML={{__html: html}} class={styles.helpContent}></div>
    </div>
  </>
}
