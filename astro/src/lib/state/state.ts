import { createState } from './createState.js'
import { type Blot, Turtle, type Point } from '../drawing-toolkit/index'
import type { EditorView } from '@codemirror/view'

// state types

export type CodePosition = {
  line: number
  column: number
}

export type ErrorState = {
  stack: CodePosition[]
  code: string
  name: string
  message: string
}

export type ConsoleMessage = {
  values: [any, ...any[]]
  type: 'log' | 'error' | 'warn'
  time: number
  pos?: CodePosition
}

export type GlobalState = {
  inst: Blot | null
  connected: boolean
  turtles: Turtle[]
  turtlePos: Point | null
  error: ErrorState | null
  console: ConsoleMessage[]
  docDimensions: {
    width: number
    height: number
  }
  running: boolean
  view: EditorView | null
  theme: 'light' | 'dark'
  vimMode: boolean
  fileHandle: any
}

// Setting/initializing state
const newState: Omit<GlobalState, 'code'> = {
  inst: null,
  connected: false,
  turtles: [],
  turtlePos: null,
  error: null,
  console: [],
  running: false,
  docDimensions: {
    width: 125,
    height: 125
  },
  view: null,
  theme: 'light',
  vimMode: false,
  fileHandle: null
}

export const makeNewState = (): GlobalState => {
  return {
    ...newState
  }
}

export const [patchStore, getStore] = createState<GlobalState>(makeNewState())
