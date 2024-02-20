import { createStore } from './createState.js'
import { type Haxidraw, Turtle, type Point } from './drawingToolkit/index.js'
import type { EditorView } from '@codemirror/view'

// state types

export type CodePosition = {
  line: number
  column: number
}

export type ErrorState = {
  code: string
  name: string
  message: string
  pos: CodePosition
}

export type File = {
  id: string
  name: string
}

export type ConsoleMessage = {
  values: [any, ...any[]]
  type: 'log' | 'error' | 'warn'
  time: number
  pos?: CodePosition
}

export type GlobalState = {
  inst: Haxidraw | null
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
  needsSaving: boolean
  machineRunning: boolean
  loginModalOpen: boolean,
  cloudFilesModalOpen: boolean,
  saveToCloudModalOpen: boolean,
  loginName: string
  sessionKey: string,
  files: File[],
  cloudFileId: string,
  runCodeInWorker: boolean,
  codeRunning: boolean
}

// setting/initializing state

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
  fileHandle: null,
  needsSaving: false,
  machineRunning: false,
  loginName: "",
  sessionKey: "",
  loginModalOpen: false,
  cloudFilesModalOpen: false,
  saveToCloudModalOpen: false,
  files: [],
  cloudFileId: "",
  runCodeInWorker: true,
  codeRunning: false
}

export const makeNewState = (): GlobalState => {
  return {
    ...newState
  }
}

export const { patchStore, getStore, addToStore } = createStore<GlobalState>(makeNewState())

window.STATE = getStore();
