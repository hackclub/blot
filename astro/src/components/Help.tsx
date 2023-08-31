import { compiledContent } from './HelpContents.md'
import styles from './Help.module.css'
import {useState} from "react"

const html = compiledContent()

export default function Help({close, helpHeight, closed}: {close: () => void, helpHeight: number, closed: boolean}) {
  return <>
    <div class={styles.helpSection} style={{ height: `${helpHeight}%` }}>
      <div class={styles.helpSectionToolbar}>
        <a className={styles.helpSectionTab}>workshop</a>
        <a className={styles.helpSectionTab}>toolkit</a>
        <a className={styles.helpSectionTab} onClick={close}>{closed ? "open" : "close"}</a>
      </div>
      <div dangerouslySetInnerHTML={{__html: html}} class={styles.helpContent}></div>
    </div>
  </>
}
