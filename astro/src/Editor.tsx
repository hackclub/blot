import { getStore } from './lib/state.js'
import CompatWarning from './components/CompatWarning.jsx'
import Preview from './components/Preview.jsx'
import Toolbar from './components/Toolbar.jsx'
import styles from './Editor.module.scss'
import Error from './components/Error.jsx'
import Console from './components/Console.jsx'
import GlobalStateDebugger from './components/GlobalStateDebugger.jsx'
import DropBox from './components/DropBox.jsx'
import CodeMirror from './components/CodeMirror.jsx'

import { createListener } from './lib/createListener.js'
import { useEffect, useRef, useState } from 'preact/hooks'
import Help from './components/Help.jsx'
import preview from '@astrojs/node/preview.js'

export default function Editor({ tutorial }: { tutorial: any }) {
  const [width, setWidth] = useState(50);
  const [tab, setTab] = useState('workshop');

  const { theme } = getStore();

  const INIT_HELP_HEIGHT = 40
  const [helpHeight, setHelpHeight] = useState(INIT_HELP_HEIGHT)

  useEffect(() => {   
    addEditorResizing(setWidth, theme)
    addHelpResizing(setHelpHeight, editorContainer, theme)
  }, [])

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
            <Help
              toggleClose={closeHelpPane}
              helpHeight={helpHeight}
              workshop={tutorial}
            />
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
