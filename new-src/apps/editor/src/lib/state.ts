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
    console: ConsoleMessage[],
    running: boolean
};

export const makeNewState = (): GlobalState => {    
    const initialContent = `// welcome to haxidraw!

const t = new Turtle();

for(let i = 0; i < 72; i++) {
    t.forward(5);
    t.left(85);
}`

    return {
        code: {
            content: initialContent,
            cmState: createCMState(initialContent)
        },
        inst: null,
        turtles: [],
        turtlePos: null,
        error: null,
        console: [],
        running: false
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
}

export function loadCodeFromString(code: string) {
    patchStore({
        code: {
            content: code,
            cmState: createCMState(code)
        }
    });
}

const deserializeState = (state: SerializedGlobalState): GlobalState => {
    const code = deserializeCode(state.code);
    return {
        code,
        inst: null,
        turtles: [],
        turtlePos: null,
        error: state.error,
        console: [],
        running: false
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
