import type { EditorState } from "@codemirror/state";
import { createState } from "niue";
import { createCMState, deserializeCMState } from "../components/CodeMirror.tsx";
import type { Haxidraw, Turtle, Point } from "haxidraw-client";

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
    turtles: Turtle[],
    turtlePos: Point | null,
    error: ErrorState | null,
    console: ConsoleMessage[]
};

export const makeNewState = (): GlobalState => {    
    const initialContent = `// welcome to ~~modular things~~haxidraw!

// this is a fun little demo showing
// some of the capabilities of the editor

import { html, render as uRender } from "https://cdn.skypack.dev/uhtml/async";

const div = html\`
<div>hello, world!</div>
<button onclick=\${async () => {
    // you can use ES imports!
    const { default: confetti } = await import("https://cdn.skypack.dev/canvas-confetti");
    confetti();
}}>celebrate!</button>
\';

uRender(viewEl, div);
;`

    return {
        code: {
            content: initialContent,
            cmState: createCMState(initialContent)
        },
        inst: null,
        turtles: [],
        turtlePos: null,
        error: null,
        console: []
    };
};

export type SerializedCodeState = {
    content: string,
    cmState: any
};

export type SerializedGlobalState = {
    code: SerializedCodeState,
    error: ErrorState | null,
    formatVersion: 0
};

export const serializeState = (state: GlobalState): SerializedGlobalState => {
    return {
        code: {
            content: state.code.content,
            cmState: state.code.cmState.toJSON()
        },
        error: state.error,
        formatVersion: 0
    };
}

export function loadSerializedState(state: SerializedGlobalState) {
    patchStore(deserializeState(state));
    // dispatchCMResetState();
}

const deserializeState = (state: SerializedGlobalState): GlobalState => {
    const code = deserializeCode(state.code);
    return {
        code,
        inst: null,
        turtles: [],
        turtlePos: null,
        error: state.error,
        console: []
    };
}

function deserializeCode(serializedState: SerializedCodeState): CodeState {
    return {
        content: serializedState.content,
        cmState: deserializeCMState(serializedState.cmState)
    };
}


const backup = typeof window !== "undefined" && localStorage.getItem("backup");
const initialState = backup ? deserializeState(JSON.parse(backup)) : makeNewState();

export const [useStore, patchStore, getStore] = createState<GlobalState>({
    ...initialState
} as GlobalState);
