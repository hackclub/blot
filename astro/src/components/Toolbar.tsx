import { useEffect, useState } from 'preact/hooks'
import download from '../lib/download.ts'
import runCode from '../lib/run.ts'
import defaultProgram from '../lib/examples/defaultProgram.js'
import { patchStore, getStore } from '../lib/state.ts'
import { loadCodeFromString } from '../lib/loadCodeFromString.ts'
import Button from '../ui/Button.tsx'
import {
  connect,
  disconnect,
  runMachine,
  tryAutoConnect
} from '../lib/machine.ts'
import SettingsIcon from '../ui/SettingsIcon.tsx'
import KeyboardIcon from '../ui/KeyboardIcon.tsx'
import GitHubIcon from '../ui/GitHubIcon.tsx'
import { persist } from '../db/auth-helper.ts'
import { generateName } from '../lib/utils/words.ts'
import styles from './Toolbar.module.css'
import { createMask } from '../lib/getBitmap.js'
import js_beautify from 'js-beautify'
import { searchParams } from '../lib/utils/url.ts'

export default function Toolbar({ persistenceState }) {
  const { connected, needsSaving, view } = getStore()

  const [hidden, setHidden] = useState(true)

  return (
    <div class={styles.root}>
      <div class="flex items-center h-full">
        <h1 class={styles.heading}>
          <a href="/">
            <img src="/blot.svg" style="width: 30px" />
            <span style="font-weight: 700;">blot</span>
          </a>
        </h1>
        <RunButton />
        {/* {<div
          class="relative cursor-pointer w-max h-full flex items-center p-1 hover:bg-white hover:bg-opacity-10"
          onClick={() => saveFile(getCode())}>
          {needsSaving ? 'save* (ctrl/cmd+s)' : 'save (ctrl/cmd+s)'}
        </div>} */}
        <NewButton persistenceState={persistenceState} />
        <OpenButton />
        <div
          class="relative cursor-pointer w-max h-full flex items-center p-1 hover:bg-white hover:bg-opacity-10"
          onClick={() => {
            const ogCode = getCode()
            const formatted = formatCode(ogCode)
            view.dispatch({
              changes: {
                from: 0,
                to: ogCode.length,
                insert: formatted
              }
            })
          }}>
          tidy code
        </div>
        <div
          class="relative cursor-default w-max h-full flex items-center p-1"
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}>
          <div>download</div>
          <div
            class={[
              hidden ? 'hidden' : '',
              'border border-white border-opacity-10',
              'bg-[--primary] absolute z-50 top-full p-1 rounded-md'
            ].join(' ')}>
            <DownloadButton />
            <DownloadSVG />
            <DownloadPNG />
            <div
              class="w-max p-1 rounded hover:bg-white hover:bg-opacity-10"
              onClick={e => {
                const { turtles } = getStore()
                const { isVisible } = createMask()

                turtles.forEach(turtle => {
                  turtle.resample(0.01).iteratePath(([x, y], t) => {
                    const visible = isVisible(x, y)

                    if (!visible) return 'BREAK'
                  })

                  turtle.style.fill = 'none'
                })

                patchStore({ turtles })
              }}>
              cull hidden lines
            </div>
          </div>
        </div>
        {persistenceState !== undefined &&
          persistenceState.value.kind !== 'SHARED' && (
            <Button variant="ghost" disabled>
              {persistenceState.value.cloudSaveState.toLowerCase()}
            </Button>
          )}
      </div>
      {persistenceState !== undefined ? (
        <div class="flex items-center">
          {persistenceState.value.kind === 'SHARED' ? (
            <input
              className={styles.nameInput}
              disabled
              value={persistenceState.value.name}
            />
          ) : (
            <form
              onSubmit={event => {
                event.preventDefault()
                const name =
                  event.target.name?.value || persistenceState.value.art.name
                fetch('/api/art/rename', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    artId: persistenceState.value.art.id,
                    newName: name
                  })
                }).catch(err => console.error(err))
              }}>
              <input
                autoComplete="off"
                name="name"
                class={styles.nameInput}
                type="text"
                value={persistenceState.value.art.name}
                onChange={event => {
                  event.target.setAttribute(
                    'size',
                    event.target.value.length + 1
                  )
                }}
                onBlur={event => {
                  // POST onBlur
                  event.preventDefault()
                  const name =
                    event.target.value || persistenceState.value.art.name
                  fetch('/api/art/rename', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      artId: persistenceState.value.art.id,
                      newName: name
                    })
                  }).catch(err => console.error(err))
                }}
              />
            </form>
          )}
        </div>
      ) : null}
      <div class="flex items-center">
        <Button variant="ghost" class="connect-trigger">
          {connected ? 'disconnect from' : 'connect to'} machine
        </Button>
        {connected && (
          <Button variant="ghost" class="run-machine-trigger">
            run machine
          </Button>
        )}
        <GitHubLink />
        <SettingsButton />
        {searchParams('guide') ||
        searchParams('src') ||
        (persistenceState !== undefined &&
          persistenceState?.value.kind === 'SHARED') ? (
          <RemixLink persistenceState={persistenceState} />
        ) : persistenceState !== undefined ? (
          <ShareLink persistenceState={persistenceState} />
        ) : (
          <SaveToEmail />
        )}
      </div>
    </div>
  )
}

export function SaveToEmail() {
  const [hidden, setHidden] = useState(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (hidden) {
    } else {
      document.body.addEventListener('click', event => {
        const modal = document.getElementById('save-to-email')
        const onModal = event.composedPath().find(item => item == modal)
        if (!onModal) setHidden(true)
      })
      return () => {
        document.body.removeEventListener('click', event => {
          const modal = document.getElementById('save-to-email')
          const onModal = event.composedPath().find(item => item == modal)
          if (!onModal) setHidden(true)
        })
      }
    }
  }, [hidden])

  return (
    <div id="save-to-email">
      <Button variant="ghost" onClick={() => setHidden(false)}>
        save to email
      </Button>
      <div
        style={{
          display: hidden ? 'none' : '',
          position: 'absolute',
          right: '5px',
          background: 'var(--primary)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 9999,
          padding: '5px',
          borderRadius: '5px'
        }}>
        <form
          class="flex gap-2"
          onSubmit={event => {
            event.preventDefault()
            const email = event.target.email.value
            if (email) {
              // Pass in as partial email
              setStatus('Sending...')
              const { view } = getStore()
              const code = view.state.doc.toString()
              fetch('/api/art/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  code,
                  name: generateName(),
                  partialSessionEmail: email
                })
              })
                .then(res => res.json())
                .then(json => {
                  setStatus(`Sent email to ${email}!`)
                })
                .catch(err => console.log(err))
            }
          }}>
          <input
            class="bg-transparent px-1"
            placeholder="Email"
            name="email"
            type="text"
          />
          <Button class="!p-1 rounded-md" variant="ghost" type="submit">
            save
          </Button>
        </form>
        {status !== '' && <p class="max-w-full">{status}</p>}
      </div>
    </div>
  )
}

export function SaveStatus({ persistenceState }) {
  return <Button variant="ghost">save</Button>
}

export function ShareLink({ persistenceState, clicked }) {
  const [hidden, setHidden] = useState(true)
  const [snapshotId, setSnapshotId] = useState('')

  useEffect(() => {
    if (!hidden) {
      document.body.addEventListener('click', event => {
        const modal = document.getElementById('share-link')
        const onModal = event.composedPath().find(item => item == modal)
        if (!onModal) setHidden(true)
      })
      return () => {
        document.body.removeEventListener('click', event => {
          const modal = document.getElementById('share-link')
          const onModal = event.composedPath().find(item => item == modal)
          if (!onModal) setHidden(true)
        })
      }
    }
  }, [hidden])

  return (
    <div
      id="share-link"
      style={{ position: 'relative', cursor: 'default', width: 'min-width' }}>
      <Button
        variant="ghost"
        onClick={() => {
          fetch('/api/art/snapshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              artId: persistenceState.value.art.id
            })
          })
            .then(res => res.json())
            .then(json => {
              setSnapshotId(json.snapshotId)
              navigator.clipboard.writeText(
                `https://blot.hackclub.com/editor/snapshot/${json.snapshotId}`
              )
              setHidden(false)
            })
            .catch(err => console.log(err))
        }}>
        share
      </Button>
      <div
        style={{
          display: hidden ? 'none' : '',
          position: 'absolute',
          background: 'var(--primary)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 9999,
          width: '100%',
          top: '100%',
          padding: '5px',
          right: 0,
          minWidth: '200px'
        }}>
        <p>
          Copied to clipboard:{' '}
          <a href={`https://blot.hackclub.com/editor/snapshot/${snapshotId}`}>
            https://blot.hackclub.com/editor/snapshot/
            {snapshotId}
          </a>
        </p>
      </div>
    </div>
  )
}

export function RemixLink({ persistenceState }) {
  const [hidden, setHidden] = useState(true)

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          if (persistenceState && persistenceState.value?.session?.session.full)
            persist(persistenceState)
          else {
            // Create a new persistenceState
            const { view } = getStore()
            const code = view.state.doc.toString()
            fetch('/api/art/new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                code,
                name: generateName(),
                tutorialName: window.getGuide ? searchParams('guide') : null
              })
            })
              .then(res => {
                if (!res.ok) {
                  // 401 Unauthorized - save to email instead by opening modal
                  setHidden(false)
                  return
                }
                return res.json()
              })
              .then(json => {
                const { art } = json
                window.history.replaceState(null, '', `/~/${art.id}`)
                window.location.reload()
              })
          }
        }}>
        remix to save edits
      </Button>
      <div
        style={{
          display: hidden ? 'none' : '',
          position: 'absolute',
          right: '5px',
          background: 'var(--primary)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 9999,
          padding: '5px',
          borderRadius: '5px'
        }}>
        <form
          onSubmit={event => {
            event.preventDefault()
            const email = event.target.email.value
            if (email) {
              // Pass in as partial email
              const { view } = getStore()
              const code = view.state.doc.toString()
              fetch('/api/art/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  code,
                  name: generateName(),
                  tutorialName: window.getGuide ? searchParams('guide') : null,
                  partialSessionEmail: email
                })
              })
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.log(err))
            }
          }}>
          <input placeholder="Remix" name="email" type="text" />
          <Button variant="ghost" type="submit">
            remix
          </Button>
        </form>
      </div>
    </div>
  )
}

function GitHubLink() {
  return (
    <Button variant="ghost">
      <a
        style={{ all: 'unset' }}
        href="https://github.com/hackclub/blot/tree/main"
        rel="noreferrer"
        target="_blank">
        <GitHubIcon className={styles.icon} />
      </a>
    </Button>
  )
}

function RunButton() {
  // keyboard shortcut - shift+enter
  useEffect(() => {
    async function handleKeyDown(e: KeyboardEvent) {
      if (e.shiftKey && e.key === 'Enter') {
        e.preventDefault()
        e.stopPropagation()
        await runCode()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <Button variant="ghost" onClick={() => runCode()}>
      run (shift+enter)
    </Button>
  )
}

function getCode() {
  const { view } = getStore()

  const code = view.state.doc.toString()

  return code
}

function DownloadButton() {
  return (
    <div
      class={styles.dropdownEntry}
      onClick={() => download('project.js', getCode())}>
      js
    </div>
  )
}

function NewButton({ persistenceState }) {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (persistenceState) {
          // Check save state of persistenceState
          window.location.href = '/~/new'
        } else loadCodeFromString(defaultProgram)
      }}>
      new
    </Button>
  )
}

function DownloadSVG() {
  return (
    <div
      class={styles.dropdownEntry}
      onClick={() => {
        const { turtles, docDimensions } = getStore()

        const turtleToPathData = t => {
          let d = ''

          t.path.forEach(pl =>
            pl.forEach((pt, i) => {
              const [x, y] = pt
              if (i === 0) d += `M ${x} ${y}`
              else d += `L ${x} ${y}`
            })
          )

          return d
        }

        const turtleToPath = t => {
          const d = turtleToPathData(t)

          return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="${t.style.stroke}" 
                    fill="${t.style.fill}" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
        }

        const paths = turtles.map(turtleToPath)

        const svg = `
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" 
                  width="${docDimensions.width}mm" 
                  height="${docDimensions.height}mm"
                  style="transform: scale(1, -1)">
                    ${paths.join('\n')}
                </svg>
            `
        download('anon.svg', svg)
      }}>
      svg
    </div>
  )
}

function DownloadPNG() {
  return (
    <div
      class={styles.dropdownEntry}
      onClick={() => {
        const { turtles, docDimensions } = getStore()

        const turtleToPathData = t => {
          let d = ''

          t.path.forEach(pl =>
            pl.forEach((pt, i) => {
              const [x, y] = pt
              if (i === 0) d += `M ${x} ${y}`
              else d += `L ${x} ${y}`
            })
          )

          return d
        }

        const turtleToPath = t => {
          const d = turtleToPathData(t)

          return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="${t.style.stroke}" 
                    fill="${t.style.fill}" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
        }

        const paths = turtles.map(turtleToPath)

        const svg = `
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" 
                  width="${docDimensions.width}mm" 
                  height="${docDimensions.height}mm"
                  style="transform: scale(1, -1)">
                    ${paths.join('\n')}
                </svg>
            `

        // Create a new Image element
        const img = new Image()
        img.onload = function () {
          // Create a temporary canvas
          const canvas = document.createElement('canvas')
          canvas.width = img.width
          canvas.height = img.height

          // Draw the image on the canvas
          const context = canvas.getContext('2d')
          context.drawImage(img, 0, 0)

          // Convert canvas to PNG data URL
          const pngDataUrl = canvas.toDataURL('image/png')

          // Create a download link
          const downloadLink = document.createElement('a')
          downloadLink.href = pngDataUrl
          downloadLink.download = 'image.png'
          downloadLink.textContent = 'Download PNG'

          // Simulate a click on the download link
          downloadLink.click()
        }

        // Convert SVG to data URL
        const svgDataUrl =
          'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)

        // Set the Image source to the SVG data URL
        img.src = svgDataUrl
      }}>
      png
    </div>
  )
}

function OpenButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.js'
        input.onchange = () => {
          if (input.files?.length) {
            const file = input.files[0]
            const reader = new FileReader()
            reader.onload = () => {
              if (typeof reader.result === 'string') {
                loadCodeFromString(reader.result)
              }
            }
            reader.readAsText(file)
          }
        }
        input.click()
      }}>
      open
    </Button>
  )
}

function formatCode(code) {
  try {
    const options = {
      indent_size: 2
    }
    return js_beautify(code, options)
  } catch (error) {
    console.log(error)
    return code // return the original code if there's an error
  }
}

function MachineControls() {
  const { inst, running } = getStore()

  useEffect(() => {
    tryAutoConnect()

    // connect here, set inst
  }, [])

  return (
    <div>
      {inst ? (
        <>
          <Button variant="ghost" onClick={disconnect}>
            <PlugIcon className={cx(styles.icon, styles.connectedIcon)} />
            <span>disconnect...</span>
          </Button>
          {/* separator */}
          <div class={styles.separator} />
          <Button variant="ghost" loading={running} onClick={runMachine}>
            run machine
          </Button>
        </>
      ) : (
        <Button variant="ghost" onClick={connect}>
          <PlugIcon className={cx(styles.icon, styles.disconnectedIcon)} />
          <span>connect to machine...</span>
        </Button>
      )}
    </div>
  )
}

function SettingsButton() {
  const { theme, vimMode } = getStore()
  const [hidden, setHidden] = useState(true)

  return (
    <div
      style={{
        cursor: 'default',
        width: 'min-width'
      }}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}>
      <Button variant="ghost">
        <a style={{ all: 'unset' }}>
          <SettingsIcon className={styles.icon} />
        </a>
      </Button>
      <div
        style={{
          'display': hidden ? 'none' : '',
          'position': 'absolute',
          'right': '5px',
          'background': 'var(--primary)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'z-index': 9999,
          'padding': '5px',
          'border-radius': '5px'
        }}>
        {/*        <Button
          class={styles.dropdownEntry}
          variant="ghost"
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark'
            patchStore({
              theme: newTheme
            })

            document.body.dataset.theme = newTheme

            localStorage.setItem('colorTheme', newTheme)

            setHidden(false)
          }}>
          <BrightnessContrastIcon className={styles.icon} />
          <span>toggle theme</span>
        </Button>*/}
        <Button
          class={styles.dropdownEntry}
          variant="ghost"
          onClick={() => {
            patchStore({ vimMode: !vimMode })
            localStorage.setItem('vimMode', (!vimMode).toString())
            setHidden(false)
          }}>
          <KeyboardIcon className={styles.icon} />
          <span>{vimMode ? 'disable' : 'enable'} vim mode</span>
        </Button>
      </div>
    </div>
  )
}
