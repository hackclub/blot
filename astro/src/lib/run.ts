import { Turtle, Point } from './drawingToolkit/index.js'
import * as drawingUtils from './drawingToolkit/utils.js'
import { CodePosition, ErrorState, getStore, patchStore } from './state.ts'
import { parse } from 'acorn'
import { useEffect } from 'preact/hooks'
function getCode() {
  const { view } = getStore()
  const code = view.state.doc.toString()

  return code
}


const baseLogger = (type: 'log' | 'error' | 'warn', ...args: [any, ...any]) => {
  console[type](...args)

  // get code location
  const pos = getPosFromErr(new Error())

  patchStore(
    {
      console: [
        ...getStore().console,
        {
          type,
          pos,
          time: Number(new Date()),
          values: args
        }
      ]
    },
    false
  )
}

const hConsole = {
  log: (...args: [any, ...any[]]) => baseLogger('log', ...args),
  error: (...args: [any, ...any[]]) => baseLogger('error', ...args),
  warn: (...args: [any, ...any[]]) => baseLogger('warn', ...args)
}

let DETECTED_RANDOM_USAGE = false
const patchedRandom = (() => {
  if (!DETECTED_RANDOM_USAGE) {
    hConsole.warn(`Math.random() called! This could cause issues if done unintentionally.
    https://github.com/hackclub/blot/issues/161`)
    DETECTED_RANDOM_USAGE = true
  }
  return Math.__proto__.unpatchedRandom()
})
Math.__proto__.unpatchedRandom = Math.random
Math.random = patchedRandom

let DETECTED_PRINT_USAGE = false
const PrintWarning = (() => {
  if (!DETECTED_PRINT_USAGE) {
    hConsole.error(`print() called! Print activates a print page dialouge! If
      you wish to log to the console, please use console.log!
    `)
    DETECTED_PRINT_USAGE = true
   
  }
  
})
print = PrintWarning

let intervals: number[] = []
let timeouts: number[] = []
const patchedInterval = (
  callback: (...args: any[]) => void,
  time: number,
  ...args: any[]
) => {
  const interval = window.setInterval(callback, time, ...args)
  intervals.push(interval)
  return interval
}

const patchedTimeout = (
  callback: (...args: any[]) => void,
  time: number,
  ...args: any[]
) => {
  const timeout = window.setTimeout(callback, time, ...args)
  timeouts.push(timeout)
  return timeout
}

// inject items into global scope, or replace existing properties with our own
let turtles = []


// useEffect(() => {
 
//  theme = getStore().theme
// })

const customGlobal = {
  
  setTimeout: patchedTimeout,
  setInterval: patchedInterval,
  // drawing functions
  Turtle,
  createTurtle: (pt: Point) => new Turtle(pt),
  console: hConsole,
  ...drawingUtils,
  lerp(start: number, end: number, t: number) {
    return (1 - t) * start + t * end
  },
  drawTurtles: (turtlesToDraw: Turtle[], style = {}) => {
    turtlesToDraw.forEach(t => {
      const temp = t.copy()
      if (style.fill === undefined) style.fill = 'none'
      if (style.stroke === undefined ) style.stroke = 'black'
  
   
      temp.style = style
      turtles.push(temp)
    })
  },
  setDocDimensions(w: number, h: number) {
    patchStore(
      {
        docDimensions: {
          width: w,
          height: h
        }
      },
      false
    )
  }
}

const globalProxy = new Proxy(window, {
  get: (w, prop) =>
    //@ts-ignore
    prop in customGlobal ? customGlobal[prop] : w[prop].bind(w)
})

const args = {
  ...customGlobal,
  global: globalProxy,
  globalThis: globalProxy,
  window: globalProxy
}

export default async function runCode() {
  const code = getCode()

  try {
    const ast = parse(code, { sourceType: 'module' })
  } catch (err) {
    console.log(err)

    const sliceAt = err.message.indexOf('(') - 1
    err.message
    const error = {
      pos: err.loc,
      code: getCode(),
      name: err.name,
      message: err.message.slice(0, sliceAt)
    }

    patchStore({ error })

    return
  }

  try {
    await runCodeInner(code, args)
  } catch (err) {
    console.log(err)
    const error = {
      pos: getPosFromErr(err),
      code: getCode(),
      name: err.name,
      message: err.message
    }

    patchStore({ error })
  }
}

async function runCodeInner(str, globalScope) {
  intervals.forEach(clearInterval)
  timeouts.forEach(clearTimeout)
  intervals = []
  timeouts = []
  turtles = []

  patchStore(
    {
      console: [],
      error: null
    },
    false
  )

  const regex = /^\s*import\s+([\w*{},\s]+)\s+from\s+(['"`])(.*?)\2\s*;?/gm
  let match

  while ((match = regex.exec(str))) {
    const variables = match[1].trim()
    const modulePath = match[3]

    const dynamicImport = `const ${variables} = (await import('${modulePath}')).default;`

    str = str.replace(match[0], dynamicImport)
  }

  const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor

  str = `"use strict"\n${str}`

  const fn = new AsyncFunction(...Object.keys(globalScope), str)

  await fn(...Object.values(globalScope)).catch(err => {
    console.log('about to throw error')
    throw err
  })

  patchStore({
    turtles,
    turtlePos: turtles.at(-1)?.position ?? [0, 0]
  })
}

function getPosFromErr(err) {
  try {
    const match = err.stack.match(/<anonymous>:(\d+):(\d+)/)

    const pos = { line: Number(match[1]) - 2, column: Number(match[2]) }

    // to account for "use strict\n"
    pos.line -= 1
    pos.column -= 1

    return pos
  } catch (e) {
    // An error in the error handler?!
    // that's embarassing.
    console.log('Unable to catch error position:', e)
    return { line: 1, column: 1 }
  }
}
