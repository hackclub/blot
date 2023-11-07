import { getStore } from '../../lib/state/state'
import { createListener } from '../../lib/client/createListener'
import CompatWarning from './CompatWarning'
import Preview from './Preview'
import Error from './Error'
import Console from './Console'
import GlobalStateDebugger from './GlobalStateDebugger'
import DropBox from './DropBox'
import CodeMirror from './CodeMirror'
import Help from './Help'
import { useEffect, useRef, useState } from 'preact/hooks'
import styles from './Editor.module.scss'
import Toolbar from './Toolbar'
import { loadCodeFromString } from '../../lib/client/loadCodeFromString'
import { debounce } from 'throttle-debounce'
import { useOnEditorChange } from '../../lib/events/events'
import { backup } from '../../lib/client/addLoadBackup'

let lastSavePromise = Promise.resolve()
let saveQueueSize = 0
export const saveArt = debounce(
  800,
  (persistenceState: Signal<PersistenceState>, code: string) => {
    const doSave = async () => {
      let isError = false
      try {
        const art =
          persistenceState.value.kind === 'PERSISTED' &&
          persistenceState.value.art !== 'LOADING'
            ? persistenceState.value.art
            : null
        const res = await fetch('/api/art/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            artId: art?.id,
            tutorialName: art?.tutorialName
          })
        })
        if (!res.ok) throw new Error(`Error saving game: ${await res.text()}`)
      } catch (error) {
        console.error(error)
        isError = true
      }

      saveQueueSize--
      if (saveQueueSize === 0 && persistenceState.value.kind === 'PERSISTED')
        persistenceState.value = {
          ...persistenceState.value,
          cloudSaveState: isError ? 'ERROR' : 'SAVED'
        }
    }

    saveQueueSize++
    lastSavePromise = (lastSavePromise ?? Promise.resolve()).then(doSave)
  }
)

export default function Editor({
  guide,
  toolkit,
  source,
  loggedIn,
  persistenceState
}) {
  const editorContainer = useRef(null)

  const [width, setWidth] = useState(50)
  const [tab, setTab] = useState('workshop')
  const [status, setStatus] = useState('')

  const { theme } = getStore()

  const INIT_HELP_HEIGHT = 40
  const [helpHeight, setHelpHeight] = useState(INIT_HELP_HEIGHT)

  const closeHelpPane = () => {
    const closed = helpHeight <= 0

    let count = 0
    const intervalId = setInterval(() => {
      setHelpHeight(helpHeight + count)

      if (helpHeight + count >= INIT_HELP_HEIGHT && closed)
        clearInterval(intervalId)
      if (helpHeight + count <= 0 && !closed) {
        setHelpHeight(0)
        clearInterval(intervalId)
      }

      count += closed ? 1 : -1
    }, 5)
  }

  useEffect(() => {
    addEditorResizing(setWidth, theme)
    addHelpResizing(setHelpHeight, editorContainer, theme)
    if (source) loadCodeFromString(source)
  }, [])

  useOnEditorChange(() => {
    persistenceState.value = {
      ...persistenceState.value,
      stale: true
    }
    if (persistenceState.value.kind === 'PERSISTED') {
      persistenceState.value = {
        ...persistenceState.value,
        cloudSaveState: 'SAVING'
      }
      const { view } = getStore()
      saveArt(persistenceState, view.state.doc.toString())
    }

    if (persistenceState.value.kind === 'IN_MEMORY') {
      backup()
    }

    setStatus(persistenceState.value.cloudSaveState)
  })

  return (
    <>
      <GlobalStateDebugger />
      <div class={styles.root}>
        <Toolbar persistenceState={persistenceState} status={status} />
        <div class={styles.inner} ref={editorContainer}>
          <div
            style={{
              width: `${width}%`,
              display: 'flex',
              height: '100%',
              flexDirection: 'column'
            }}>
            <div
              class={styles.left}
              style={{
                flex: 1,
                overflowX: 'auto',
                overflowY: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '100%',
                width: '100%'
              }}>
              <CodeMirror />
              <div
                class={`${styles.horizBar} resize-help-trigger`}
                style={{
                  top: `${100 - helpHeight}%`,
                  width: `${width}%`
                }}></div>
              <Help
                toggleClose={closeHelpPane}
                helpHeight={helpHeight}
                guide={guide}
                toolkit={toolkit}
              />
              <div
                class={`${styles.vertBar} resize-code-trigger`}
                style={{ left: `${width}%` }}></div>
            </div>
            <div>
              <Console />
              <Error />
            </div>
          </div>
          <div class={styles.right} style={{ width: `${100 - width}%` }}>
            <Preview />
          </div>
        </div>
      </div>
      <CompatWarning />
      <DropBox />
    </>
  )
}

function addEditorResizing(setWidth, theme) {
  const listen = createListener(document.body)

  let clicked = false
  let bar: HTMLDivElement | null = null

  listen('mousedown', '.resize-code-trigger', e => {
    clicked = true
    bar = e.target

    if (bar === null) return

    bar.style.width = '8px'
    bar.style.background = theme === 1 ? '#404040' : '#eee'
  })

  listen('mousemove', '', e => {
    if (clicked) {
      e.preventDefault()
      let percent = (e.clientX / window.innerWidth) * 100
      percent = Math.min(percent, 100)
      percent = Math.max(percent, 0)

      setWidth(percent)
    }
  })

  listen('mouseup', '', () => {
    if (bar !== null) {
      bar.style.width = ''
      bar.style.background = ''
    }

    clicked = false
    bar = null
  })

  document.addEventListener('mouseleave', () => {
    if (bar !== null) {
      bar.style.width = ''
      bar.style.background = ''
    }

    clicked = false
    bar = null
  })
}

function addHelpResizing(setHeight, container, theme) {
  const listen = createListener(document.body)

  let clicked = false
  let bar: HTMLDivElement | null = null

  listen('mousedown', '.resize-help-trigger', e => {
    clicked = true
    bar = e.target

    if (bar === null) return

    bar.style.height = '8px'
    bar.style.background = theme === 1 ? '#404040' : '#eee'
  })

  listen('mousemove', '', e => {
    if (clicked) {
      e.preventDefault()
      let percent =
        100 -
        ((e.clientY - container.current.offsetTop) /
          container.current.offsetHeight) *
          100
      percent = Math.min(percent, 80) // Max is 80% of the screen
      percent = Math.max(percent, 0)

      setHeight(percent)
    }
  })

  listen('mouseup', '', () => {
    if (bar !== null) {
      bar.style.height = ''
      bar.style.background = ''
    }

    clicked = false
    bar = null
  })

  document.addEventListener('mouseleave', () => {
    if (bar !== null) {
      bar.style.height = ''
      bar.style.background = ''
    }

    clicked = false
    bar = null
  })
}
