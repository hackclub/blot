import type { EditorState } from "@codemirror/state";
import { createState } from "niue";
import { createCMState } from "./codemirror/state.ts";
import { type Haxidraw, Turtle, type Point } from "./drawingToolkit/index.js";
import type { EditorView } from "@codemirror/view";

// state types

export type CodeState = {
    content: string,
    cmState: EditorState
};

export type CodePosition = {
    line: number,
    column: number
}

export type ErrorState = {
    stack: CodePosition[],
    code: string,
    name: string,
    message: string
};

export type ConsoleMessage = {
    values: [any, ...any[]],
    type: "log" | "error" | "warn",
    time: number,
    pos?: CodePosition
};

export type GlobalState = {
    code: CodeState,
    inst: Haxidraw | null,
    connected: boolean,
    turtles: Turtle[],
    turtlePos: Point | null,
    error: ErrorState | null,
    console: ConsoleMessage[],
    docDimensions: {
        width: number,
        height: number
    },
    running: boolean,
    view: EditorView | null
};

// setting/initializing state

const newState: Omit<GlobalState, "code"> = {
    inst: null,
    connected: false,
    turtles: [],
    turtlePos: null,
    error: null,
    console: [],
    running: false,
    docDimensions: {
        width: 125,
        height: 125,
    },
    view: null
};

const defaultProgram = `
// welcome to haxidraw!

const width = 125;
const height = 125;

setDocDimensions(width, height);

const testTurtle = createTurtle();

for (let i = 0; i < 86; i++) {
    testTurtle.forward(i);
    testTurtle.left(91);
}

testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

drawTurtles(
    testTurtle
);
`.trim();

export const makeNewState = (initialContent: string = defaultProgram): GlobalState => {
    return {
        code: {
            content: initialContent,
            cmState: createCMState(initialContent)
        },
        ...newState
    };
};

export function loadCodeFromString(code: string) {
    patchStore({
        code: {
            content: code,
            cmState: createCMState(code)
        }
    });
}

const backup = localStorage.getItem("cache");

export const [useStore, patchStore, getStore] = createState<GlobalState>(
    backup ? makeNewState(backup) : makeNewState()
);











