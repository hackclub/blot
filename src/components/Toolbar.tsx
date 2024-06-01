import { useEffect } from 'preact/hooks'
import download from '../download.ts'
import runCode from '../run.ts'
import { defaultProgram } from '../defaultProgram.js'
import { patchStore, getStore } from '../state.ts'
import { loadCodeFromString } from '../loadCodeFromString.ts'
import styles from './Toolbar.module.css'
import Button from '../ui/Button.tsx'
// import CheckmarkIcon from "../ui/CheckmarkIcon.tsx";
// import PlugIcon from '../ui/PlugIcon.tsx'
import BrightnessContrastIcon from '../ui/BrightnessContrastIcon.tsx'
import SettingsIcon from '../ui/SettingsIcon.tsx'
import KeyboardIcon from '../ui/KeyboardIcon.tsx'
import GitHubIcon from '../ui/GitHubIcon.tsx'
import { saveFile } from '../saveFile.ts'
// import * as prettier from 'prettier'
import js_beautify from 'js-beautify'
import { createShareLink } from "../createShareLink.js";
import { toolkit as tk } from "../drawingToolkit/toolkit.js";

const menuItemClasses = `
  relative
  cursor-pointer
  h-full
  flex
  items-center
  p-2
  hover:bg-white
  hover:bg-opacity-10
`;

const dropdownContainer = `
  group 
  flex 
  items-center 
  relative 
  h-full 
  cursor-pointer 
  p-2 
  hover:bg-white 
  hover:bg-opacity-10
`

const dropdownClasses =`
  hidden
  group-hover:flex
  flex-col
  absolute
  top-full
  bg-[var(--primary)]
  w-max
  z-[99999]
  rounded-b-lg
`;

export default function Toolbar() {
  const { connected, needsSaving, machineRunning, loginName } = getStore()

  return (
    <div class={styles.root}>
      <div class="flex items-center h-full">
        <h1 class={styles.heading}>
          <a href="/">
            {/*<BorpheusIcon style="width: 30px;" />*/}
            <img src="/assets/borpheus.svg" style="width: 30px; translate: 3px -3px;" />
            <span style="font-weight: 700;">lot</span>
          </a>
        </h1>
        <RunButton />
        <div class={dropdownContainer}>
          {needsSaving ? 'File*' : "File"}
          <div class={dropdownClasses + " left-0"}>
            <div class={menuItemClasses} onClick={() => patchStore({ saveToCloudModalOpen: true })}>
              Save to cloud (ctrl/cmd+s)
            </div>
            <div class={menuItemClasses} onClick={() => patchStore({ cloudFilesModalOpen: true })}>
              Open from cloud
            </div>
            <div class={menuItemClasses} onClick={() => loadCodeFromString(defaultProgram)}>
              New
            </div>
            <div class={menuItemClasses} onClick={() => saveFile(getCode())}>
              Save to disk
            </div>
            <div class={menuItemClasses} onClick={openFromDisk}>
              Open from disk
            </div>
            <div class={menuItemClasses} onClick={() => createShareLink(getCode())}>
              Create share link
            </div>
          </div>

        </div>
        <div class={menuItemClasses} onClick={tidyCode}>
          Tidy code
        </div>
       {/* <div class={menuItemClasses} onClick={animateLines}>
          animate
        </div>*/}
        <div class={dropdownContainer}>
          <div>Download</div>
          <div class={dropdownClasses + " left-0"}>
            <DownloadButton />
            <DownloadSVG />
            <DownloadPNG />
          </div>
        </div>
      </div>

      <div class="flex items-center h-full">
        <div class="text-sm text-gray-300 px-3 translate-y-[1px] underline cursor-pointer" is-login-modal onClick={loginClick}>
          {loginName === "" ? "log in to save" : "logged in as: " + loginName}
        </div>
        <div class={dropdownContainer}>
          Machine control
          <div class={dropdownClasses + " right-0"}>
            <div class="p-2 hover:bg-white hover:bg-opacity-10" data-evt-connectTrigger>
              {connected ? 'Disconnect from' : 'Connect to'} machine
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-machineTrigger>
              {machineRunning ? 'Stop' : 'Run'} machine
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-penUp>
              Pen up
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-penDown>
              Pen down
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-motorsOn>
              Motors on
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-motorsOff>
              Motors off
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-moveTowardsOrigin>
              Move towards origin
            </div>

            <div class={`${connected ? '' : 'hidden'} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-setOrigin>
              Set origin
            </div>

            {/* <div class={`${connected ? "" : "hidden"} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-goToOrigin>
              go to origin
            </div>*/}

            {/* <div class={`${connected ? "" : "hidden"} p-2 hover:bg-white hover:bg-opacity-10`} data-evt-homeMachine>
              home machine
            </div>*/}
          </div>
        </div>
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
    <Button class="relative" variant="ghost" onClick={() => runCode()}>
      Run (shift+enter)
      { getStore().codeRunning  && 
        <div class="absolute mx-auto bottom-0 left-0 right-0 text-xs text-gray-300">
            running...
        </div>
      }
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
      class={menuItemClasses}
      onClick={() => download('project.js', getCode())}>
      js
    </div>
  )
}

function DownloadSVG() {
  return (
    <div
      class={menuItemClasses}
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
      class={menuItemClasses}
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
      indent_size: 2,
      "brace_style": "collapse,preserve-inline",
    }
    return js_beautify(code, options)
  } catch (error) {
    console.log(error)
    return code // return the original code if there's an error
  }
}

function SettingsButton() {
  const { theme, vimMode, loginName } = getStore()

  return (
    <div class={dropdownContainer}>
      <div>
        <a style={{ all: 'unset' }}>
          <SettingsIcon className={styles.icon} />
        </a>
      </div>
      <div class={dropdownClasses + " right-0"}>
        <div
          class={menuItemClasses}
          onClick={() => {
            patchStore({ vimMode: !vimMode })
            localStorage.setItem('vimMode', (!vimMode).toString())
          }}>
          <KeyboardIcon className={styles.icon} />
          <span class="px-2">{vimMode ? 'Disable' : 'Enable'} vim mode</span>
        </div>
        <div
          class={menuItemClasses}
          onClick={() => {
            const newTheme = theme === 'dark' ? 'light' : 'dark'
            patchStore({
              theme: newTheme
            })

            document.body.dataset.theme = newTheme

            localStorage.setItem('colorTheme', newTheme)

            

          }}>
         
          <BrightnessContrastIcon className={styles.icon} />
          <span class="px-2">Toggle Dark Mode</span>
        </div>
        
        { loginName && 
          <div class="p-2 hover:bg-white hover:bg-opacity-10" onClick={logOut}>
            Log out
          </div>
        }
      </div>
    </div>
  )
}

function logOut() {
  localStorage.setItem('session_secret_key', "");
  patchStore({ files: [], loginName: "", cloudFileId: "" });
}

function tidyCode() {
  const { view } = getStore()

  const ogCode = getCode()
  const formatted = formatCode(ogCode)
  view.dispatch({
    changes: {
      from: 0,
      to: ogCode.length,
      insert: formatted
    }
  })       
}

function openFromDisk() {
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
}

function loginClick() {
  const { loginName } = getStore();

  if (loginName === "") {
    patchStore({ loginModalOpen: true });
  } else {
    // log out or change account
  }
}

let animateState = {
  animating: false,
  ogTurtles: [],
  intervalId: null,
}

function animateLines() {

  if (animateState.animating) {
    clearInterval(animateState.intervalId);
  }

  const turtles = animateState.animating
    ? animateState.ogTurtles
    : getStore().turtles;

  animateState.animating = true;
  animateState.ogTurtles = turtles;

  // console.log({
  //   turtles,
  //   tk
  // })

  const styleMap = {};

  let plIndex = 0;
  turtles.forEach(t => {
    t.path.forEach(pl => {
      styleMap[plIndex] = t.style;
      plIndex++;
    })
  })

  const pls = turtles.map(t => t.path).flat();

  const ogPls = tk.copy(pls);

  const resampled = tk.resample(pls, 0.1);

  let totalTime = 3000; // should be determined by length of line and timePerMM
  let deltaTime = 10;

  // console.time()
  let elapsedTime = 0;
  animateState.intervalId = setInterval(() => {
    if (elapsedTime >= totalTime) {
      clearInterval(animateState.intervalId);
      animateState.animating = false;
      patchStore({
        turtles: animateState.ogTurtles
      })

      // console.timeEnd();
      return;
    }
    const turtles = mapPlsToTurtles(elapsedTime/totalTime)
    // console.log({ turtles, totalT });

    patchStore({
      turtles
    });

    elapsedTime += deltaTime;

  }, deltaTime);

  function mapPlsToTurtles(t) {
    const tempPls = tk.trim(tk.copy(resampled), 0, t);
    const tempTurtles = [];

    tempPls.forEach((pl, i) => {
      tempTurtles.push({
        path: [ pl ],
        style: styleMap[i]
      })
    }) 

    return tempTurtles;
  }
}

