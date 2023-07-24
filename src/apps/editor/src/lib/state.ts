import type { EditorState } from "@codemirror/state";
import { createState } from "niue";
import { createCMState, deserializeCMState } from "../components/CodeMirror.tsx";
import { type Haxidraw, Turtle, type Point } from "haxidraw-client";
import type { EditorView } from "@codemirror/view";

export type CodeState = {
    content: string,
    cmState: EditorState
};

export type SerializedCodeState = {
    content: string,
    cmState: any
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
    docDimensions: {
        width: number,
        height: number
    },
    running: boolean,
    view: EditorView | null
};

type SerializedTurtle = {
    [k in keyof Turtle]: Turtle[k]
};

export type SerializedGlobalState = {
    code: SerializedCodeState,
    console: ConsoleMessage[],
    error: ErrorState | null,
    turtles: SerializedTurtle[],
    turtlePos: Point | null
};

const newState: Omit<GlobalState, "code"> = {
    inst: null,
    turtles: [],
    turtlePos: null,
    error: null,
    console: [],
    running: false,
    docDimensions: {
        width: 10,
        height: 20,
    },
    view: null
};

export const makeNewState = (): GlobalState => {    
    const initialContent = `// welcome to haxidraw!

const t = createTurtle();

for(let i = 0; i < 72; i++) {
    t.forward(5);
    t.left(85);
}

drawTurtles(t);`;

    return {
        code: {
            content: initialContent,
            cmState: createCMState(initialContent)
        },
        ...newState
    };
};

export const serializeState = (state: GlobalState): SerializedGlobalState => {
    return {
        code: {
            content: state.code.content,
            cmState: state.code.cmState.toJSON()
        },
        error: state.error,
        console: state.console,
        turtles: state.turtles,
        turtlePos: state.turtlePos
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

const deserializeState = (state: SerializedGlobalState): GlobalState => ({
    ...newState,
    ...state,
    code: {
        content: state.code.content,
        cmState: deserializeCMState(state.code.cmState)
    },
    turtles: state.turtles?.map(t => {
        t = { ...t };
        Object.setPrototypeOf(t, Turtle.prototype);
        return t;
    }) ?? []
});

const backup = typeof window !== "undefined" && localStorage.getItem("backup");

export const [useStore, patchStore, getStore] = createState<GlobalState>(backup ? deserializeState(JSON.parse(backup)) : makeNewState());
