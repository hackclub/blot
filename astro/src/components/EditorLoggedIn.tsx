import { getStore } from '../lib/state.js'
import { createListener } from '../lib/createListener.js'
import styles from './Editor.module.scss'
import CompatWarning from './CompatWarning.tsx'
import Preview from './Preview.jsx'
import Toolbar from './Toolbar.jsx'
import Error from './Error.tsx'
import Console from './Console.jsx'
import GlobalStateDebugger from './GlobalStateDebugger.jsx'
import DropBox from './DropBox.jsx'
import CodeMirror from './CodeMirror.tsx'
import { useEffect, useRef, useState } from 'preact/hooks'
import Help from './Help.jsx'
import type { PersistenceState } from '../lib/stateDb.ts'
import { Signal } from '@preact/signals'
import { useSignalEffect, useSignal } from '@preact/signals'
import { debounce } from 'throttle-debounce'
import defaultExampleCode from '../lib/example.ts'
import { nanoid } from 'nanoid'

interface EditorProps {
  persistenceState: Signal<PersistenceState>
  cookies: {
    outputAreaSize: number | null
    hideHelp: boolean
  }
}

const minOutputAreaSize = 360
const defaultOutputAreaSize = 400
const heightMargin = 130

export default function Editor({ persistenceState, cookies }: EditorProps) {
  const [width, setWidth] = useState(
    Math.max(minOutputAreaSize, cookies.outputAreaSize ?? defaultOutputAreaSize)
  )

  const { theme } = getStore()

  const INIT_HELP_HEIGHT = 40
  const [helpHeight, setHelpHeight] = useState(INIT_HELP_HEIGHT)

  useEffect(() => {
    addEditorResizing(setWidth, theme)
    addHelpResizing(setHelpHeight, editorContainer, theme)
    document.cookie = `outputAreaSize=${width};path=/;max-age=${
      60 * 60 * 24 * 365
    }`

    // Disable native save shortcut
    const handler = (event: KeyboardEvent) => {
      if (event.key === 's' && (event.metaKey || event.ctrlKey))
        event.preventDefault()
      window.addEventListener('keydown', handler)
      return () => window.removeEventListener('keydown', handler)
    }
  }, [])

  // Warn before leave
  useSignalEffect(() => {
    let needsWarning = false
    if (['SHARED', 'IN_MEMORY'].includes(persistenceState.value.kind))
      needsWarning = persistenceState.value.stale
    else if (
      persistenceState.value.kind === 'PERSISTED' &&
      persistenceState.value.stale &&
      persistenceState.value.art !== 'LOADING'
    )
      needsWarning = persistenceState.value.cloudSaveState !== 'SAVED'
  })

  let initialCode = ''
  if (
    persistenceState.value.kind === 'PERSISTED' &&
    persistenceState.value.art !== 'LOADING'
  )
    initialCode = persistenceState.value.art.code
  else if (persistenceState.value.kind === 'SHARED')
    initialCode = persistenceState.value.code
  else if (persistenceState.value.kind === 'IN_MEMORY')
    initialCode = localStorage.getItem('blotMemory') ?? defaultExampleCode

  useEffect(() => {
    const pageId = nanoid()
    window.addEventListener('unload', () => {
      sessionStorage.setItem(pageId, pageId)
    })
    window.addEventListener('load', () => {
      if (sessionStorage.getItem(pageId)) {
        sessionStorage.removeItem('pageId')
        window.location.reload()
      }
    })
  }, [initialCode])

  const closeHelpPane = () => {
    const closed = helpHeight <= 0

    let count = 0
    const intervalId = setInterval(() => {
      setHelpHeight(helpHeight + count)

      if (helpHeight + count >= INIT_HELP_HEIGHT && closed) {
        clearInterval(intervalId)
      }

      if (helpHeight + count <= 0 && !closed) {
        setHelpHeight(0)
        clearInterval(intervalId)
      }

      count += closed ? 1 : -1
    }, 5)
  }

  const editorContainer = useRef(null)

  return (
    <>
      <GlobalStateDebugger />
      <div class={styles.root}>
        <Toolbar />
        <div class={styles.inner} ref={editorContainer}>
          <div
            style={{
              'width': `${width}%`,
              'display': 'flex',
              'height': '100%',
              'flex-direction': 'column'
            }}>
            <div style={{ flex: 1, overflow: 'scroll' }}>
              <CodeMirror />
            </div>
            <div>
              <Console />
              <Error />
            </div>
          </div>
          <div
            class={`${styles.vertBar} resize-code-trigger`}
            style={{ left: `${width}%` }}></div>
          <div class={styles.right} style={{ width: `${100 - width}%` }}>
            <Preview />
            <div
              class={`${styles.horizBar} resize-help-trigger`}
              style={{
                top: `${100 - helpHeight}%`,
                width: `${100 - width}%`
              }}></div>
            {/* <Help toggleClose={closeHelpPane} helpHeight={helpHeight} />*/}
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
      percent = Math.min(percent, 100)
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
