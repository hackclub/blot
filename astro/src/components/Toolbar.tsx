import { useEffect, useState } from 'preact/hooks'
import download from '../lib/download.ts'
import runCode from '../lib/run.ts'
import { defaultProgram } from '../lib/defaultProgram.js'
import { patchStore, getStore } from '../lib/state.ts'
import { loadCodeFromString } from '../lib/loadCodeFromString.ts'
import styles from './Toolbar.module.css'
import Button from '../ui/Button.tsx'
import cx from 'classnames'
// import CheckmarkIcon from "../ui/CheckmarkIcon.tsx";
import PlugIcon from '../ui/PlugIcon.tsx'
import {
  connect,
  disconnect,
  runMachine,
  tryAutoConnect
} from '../lib/machine.ts'
import BrightnessContrastIcon from '../ui/BrightnessContrastIcon.tsx'
import SettingsIcon from '../ui/SettingsIcon.tsx'
import KeyboardIcon from '../ui/KeyboardIcon.tsx'
import GitHubIcon from '../ui/GitHubIcon.tsx'
import BorpheusIcon from '../ui/BorpheusIcon.tsx'
import { saveFile } from '../lib/saveFile.ts'
import * as prettier from 'prettier'
import js_beautify from 'js-beautify'
import { createMask } from '../lib/getBitmap.js'
import { Turtle } from '../lib/drawingToolkit/index.js'

export default function Toolbar() {
  const { connected, needsSaving, view, machineRunning } = getStore()

  const [hidden, setHidden] = useState(true)

  return (
    <div class={styles.root}>
      <div class="flex items-center h-full">
        <h1 class={styles.heading}>
          <a href="/">
            {/*<BorpheusIcon style="width: 30px;" />*/}
            <img src="/borpheus.svg" style="width: 30px; translate: 3px -3px;" />
            <span style="font-weight: 700;">lot</span>
          </a>
        </h1>
        <RunButton />
        <div
          class="relative cursor-pointer w-max h-full flex items-center p-1 hover:bg-white hover:bg-opacity-10"
          onClick={() => saveFile(getCode())}>
          {needsSaving ? 'save* (ctrl/cmd+s)' : 'save (ctrl/cmd+s)'}
        </div>
        <NewButton />
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

                // const newTurtle = new Turtle();
                // let lastVisible = false;

                // turtles.forEach(turtle => {
                //   turtle
                //   .resample(0.1)
                //   .path.forEach(pl => {
                //     pl.forEach((pt, i) => {
                //       const [x, y] = pt;
                //       const visible = isVisible(x, y);

                //       if (lastVisible && i > 0 && visible) newTurtle.goTo([x, y]);
                //       else newTurtle.jump([x, y]);
                //       lastVisible = visible;
                //     })
                //   })
                // })

                // newTurtle.simplify(.01);
                // newTurtle.style.fill ="none";
                // newTurtle.style.stroke = "black";

                // patchStore({
                //   turtles: [newTurtle]
                // })

                turtles.forEach(turtle => {
                  turtle.resample(0.01).iteratePath(([x, y], t) => {
                    const visible = isVisible(x, y)

                    if (!visible) return 'BREAK'
                  })

                  // turtle.simplify(0.01);
                  turtle.style.fill = 'none'
                })

                patchStore({ turtles })
              }}>
              cull hidden lines
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center h-full">
        <div class="group flex items-center relative h-full cursor-pointer p-1">
          machine control
          <div class="hidden group-hover:flex flex-col absolute top-full right-0 bg-[var(--primary)] w-max z-[99999]">
            <div
              class="p-2 hover:bg-white hover:bg-opacity-10"
              data-evt-connectTrigger>
              {connected ? 'disconnect from' : 'connect to'} machine
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-machineTrigger>
              {machineRunning ? 'stop' : 'run'} machine
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-penUp>
              pen up
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-penDown>
              pen down
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-motorsOn>
              motors on
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-motorsOff>
              motors off
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-moveTowardsOrigin>
              move towards origin
            </div>

            <div
              class={`${
                connected ? '' : 'hidden'
              } p-2 hover:bg-white hover:bg-opacity-10`}
              data-evt-setOrigin>
              set origin
            </div>

            {/* <div class={`${connected ? "" : "hidden"} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-goToOrigin>
              go to origin
            </div>*/}

            {/* <div class={`${connected ? "" : "hidden"} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-homeMachine>
              home machine
            </div>*/}
          </div>
        </div>
        {/*<MachineControls />*/}
        <GitHubLink />
        <SettingsButton />
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

function NewButton() {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        loadCodeFromString(defaultProgram)
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
                    stroke-width="${t.style.width}" 
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
                    stroke-width="${t.style.width}" 
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
