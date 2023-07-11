import type { EditorState } from "@codemirror/state";
import { createState } from "niue";
import { createCMState, deserializeCMState } from "../components/CodeMirror.tsx";
import type { Haxidraw, Turtle, Point } from "haxidraw-client";

export type CodeState = {
    content: string,
    cmState: EditorState
};

export type GlobalState = {
    code: CodeState,
    inst: Haxidraw | null,
    turtles: Turtle[],
    turtlePos: Point | null
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
        turtlePos: null
    };
};

export type SerializedCodeState = {
    content: string,
    cmState: any
};

export type SerializedGlobalState = {
    code: SerializedCodeState,
    formatVersion: 0
};

export const serializeState = (state: GlobalState): SerializedGlobalState => {
    return {
        code: {
            content: state.code.content,
            cmState: state.code.cmState.toJSON()
        },
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
        turtlePos: null
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
