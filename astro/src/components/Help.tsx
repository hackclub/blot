import { compiledContent } from '../../../interface/README.md'
import styles from './Help.module.css'
import {useState} from "preact/hooks";

const html = compiledContent()

export default function Help({toggleClose, helpHeight, workshopHTML}: {toggleClose: () => void, helpHeight: number, workshopHTML: string | undefined}) {
  const closed = helpHeight <= 0
  const [tab, setTab] = useState<"workshops" | "toolkit">("toolkit")

  return <>
    <div class={styles.helpSection} style={{ height: `${helpHeight}%` }}>
      <div class={styles.helpSectionToolbar}>
        {workshopHTML &&
        <a className={styles.helpSectionTab} style={{backgroundColor: tab == "workshops" ? "rgba(var(--primary-rgb), 0.2)" : ""}} onClick={() => {
          setTab("workshops")
          if (closed) toggleClose()
        }}>Workshops</a>
        }
        <a className={styles.helpSectionTab} style={{backgroundColor: tab == "toolkit" ? "rgba(var(--primary-rgb), 0.2)" : ""}} onClick={() => {
          setTab("toolkit")
          if (closed) toggleClose()
        }}>Toolkit</a>
        <a className={styles.helpSectionTab} onClick={toggleClose}>{closed ? "Open Help" : "Close Help"}</a>
      </div>
      {tab === "toolkit" &&
      <div dangerouslySetInnerHTML={{__html: html}} class={styles.helpContent}></div>
      }

      {tab === "workshops" &&
          <div class={styles.helpContent} dangerouslySetInnerHTML={{__html: workshopHTML}}></div>
      }
    </div>
  </>
}
