import { useEffect, useState } from 'preact/hooks'
import download from '../../lib/client/download'
import runCode from '../../lib/run'
import defaultProgram from '../../lib/examples/defaultProgram'
import { patchStore, getStore } from '../../lib/state/state'
import { loadCodeFromString } from '../../lib/client/loadCodeFromString'
import styles from './Toolbar.module.scss'
import Button from '../../ui/editor/Button'
import {
  connect,
  disconnect,
  runMachine,
  tryAutoConnect
} from '../../lib/client/machine'
import BrightnessContrastIcon from '../../ui/icons/BrightnessContrastIcon'
import SettingsIcon from '../../ui/icons/SettingsIcon'
import KeyboardIcon from '../../ui/icons/KeyboardIcon'
import GitHubIcon from '../../ui/icons/GitHubIcon'
import { persist } from '../../db/auth-helper'
import { generateName } from '../../lib/utils/words'

export function searchParams(query) {
  return new URL(window.location.href).searchParams.get(query)
}

export default function Toolbar({ persistenceState }) {
  const { connected } = getStore()

  const [hidden, setHidden] = useState(true)

  return (
    <nav id="navbar">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
        <div>
          <h1 style={{ paddingRight: 0 }}>
            <a href="/">blot</a>
          </h1>
        </div>
        <div class="navbar-links no-gap">
          <RunButton />
          <NewButton persistenceState={persistenceState} />
          <OpenButton persistenceState={persistenceState} />
          <div
            style={{
              position: 'relative',
              cursor: 'default',
              width: 'min-width'
            }}
            onMouseEnter={() => setHidden(false)}
            onMouseLeave={() => setHidden(true)}>
            <Button variant="ghost">download</Button>
            <div
              style={{
                display: hidden ? 'none' : '',
                position: 'absolute',
                background: 'var(--primary)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 9999,
                width: '100%',
                top: '100%',
                padding: '5px'
              }}>
              <DownloadButton />
              <DownloadSVG />
              <DownloadPNG />
            </div>
          </div>
          {persistenceState !== undefined && (
            <Button variant="ghost">
              {persistenceState.value.cloudSaveState.toLowerCase()}
            </Button>
          )}
        </div>
      </div>
      {persistenceState !== undefined ? (
        <div
          class="navbar-links no-gap"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          }}>
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
                event.target.setAttribute('size', event.target.value.length + 1)
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
        </div>
      ) : null}
      <div
        class="navbar-links no-gap"
        style={{ display: 'flex', alignItems: 'center' }}>
        <MachineControls />
        <GitHubLink />
        <SettingsButton />
        {searchParams('guide') || searchParams('src') ? (
          <RemixLink persistenceState={persistenceState} />
        ) : persistenceState !== undefined ? (
          <ShareLink persistenceState={persistenceState} />
        ) : (
          <SaveToEmail />
        )}
      </div>
    </nav>
  )
}

export function SaveToEmail() {
  const [hidden, setHidden] = useState(true)

  return (
    <div>
      <Button variant="ghost" onClick={() => setHidden(false)}></Button>
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
                  partialSessionEmail: email
                })
              })
                .then(res => res.json())
                .then(json => {
                  console.log(json)
                })
                .catch(err => console.log(err))
            }
          }}>
          <input placeholder="Save" name="email" type="text" />
          <Button variant="ghost" type="submit">
            save
          </Button>
        </form>
      </div>
    </div>
  )
}

export function SaveStatus({ persistenceState }) {
  useEffect(() => {
    console.log('useEffect', persistenceState)
  }, [persistenceState])
  return <Button variant="ghost">save</Button>
}

export function ShareLink({ persistenceState }) {
  const [hidden, setHidden] = useState(true)
  const [snapshotId, setSnapshotId] = useState('')

  return (
    <div
      style={{
        position: 'relative',
        cursor: 'default',
        width: 'min-width'
      }}>
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
          left: 0,
          right: '100vw',
          minWidth: '200px'
        }}>
        https://blot.hackclub.com/editor/snapshot/{snapshotId}
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
                }
                res.json()
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
                .then(json => {
                  console.log(json)
                })
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

export function GitHubLink() {
  return (
    <Button variant="ghost">
      <a
        style={{ all: 'unset' }}
        href="https://github.com/hackclub/blot/tree/main"
        rel="noreferrer"
        target="_blank">
        <div style={{ transform: 'translate(0, 3.5px)' }}>
          <GitHubIcon className={styles.icon} />
        </div>
      </a>
    </Button>
  )
}

export function RunButton() {
  // Keyboard shortcut - shift + enter
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
    <Button class="navbar-button" variant="ghost" onClick={() => runCode()}>
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
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
        }

        const paths = turtles.map(turtleToPath)

        const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
                  docDimensions.width
                } ${docDimensions.height}" width="${
                  docDimensions.width
                }mm" height="${docDimensions.height}mm">
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
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`
        }

        const paths = turtles.map(turtleToPath)

        const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
                  docDimensions.width
                } ${docDimensions.height}" width="${
                  docDimensions.width
                }mm" height="${docDimensions.height}mm">
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

function OpenButton({ persistenceState }) {
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

export function MachineControls() {
  const { inst, running } = getStore()

  useEffect(() => {
    tryAutoConnect()
  }, [])

  return (
    <div>
      {inst ? (
        <>
          <Button variant="ghost" onClick={disconnect}>
            <span>disconnect</span>
          </Button>
          <div class={styles.separator} />
          <Button variant="ghost" loading={running} onClick={runMachine}>
            run machine
          </Button>
        </>
      ) : (
        <Button variant="ghost" onClick={connect}>
          <span>connect to machine</span>
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
          <div style={{ transform: 'translate(0, 3.5px)' }}>
            <SettingsIcon className={styles.icon} />
          </div>
        </a>
      </Button>
      <div
        style={{
          'display': hidden ? 'none' : '',
          'position': 'absolute',
          'right': '100px',
          'background': 'var(--primary)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
          'z-index': 9999,
          'padding': '5px',
          'border-radius': '5px'
        }}>
        <Button
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
        </Button>
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
