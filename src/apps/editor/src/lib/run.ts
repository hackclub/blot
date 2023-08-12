// haxidraw code runtime environment

import { CodePosition, ErrorState, getStore, patchStore } from "./state.ts";
import { RollupError, rollup } from "@rollup/browser";
import { Turtle, Point } from "haxidraw-client";
import * as drawingUtils from "haxidraw-client/utils";
import { type FindPosition, SourceMapConsumer } from "source-map-js";
import { EditorState } from "@codemirror/state";

let intervals: number[] = [];
let timeouts: number[] = [];
let loops: boolean[] = [];

// https://stackoverflow.com/a/62507199
const resolvePath = (path: string) => (
    path.split("/")
        .reduce<string[]>((a, v) => {
            if(v === ".") {} // do nothing
            else if(v === "..") {
                if(a.pop() === undefined) throw new Error(`Unable to resolve path: ${path}`)
            } else a.push(v);
            return a;
        }, [])
        .join("/")
);

// not very good, but it works
const isURL = (id: string) => ["http://", "https://"].find(s => id.startsWith(s));

async function getBundle(): Promise<string> {
    const { code } = getStore();

    const build = await rollup({
        input: "/index.js",
        plugins: [
            {
                name: "fs-resolver",
                resolveId(source, importer) {
                    if(["./", "../"].find(s => source.startsWith(s))) {
                        if(importer) {
                            const s = importer.split("/");
                            s.pop();
                            importer = s.join("/");
                            return resolvePath(importer + "/" + source);
                        }
                        return resolvePath(source);
                    } else if(source.startsWith("/")) {
                        if(importer && isURL(importer)) {
                            const url = new URL(importer);
                            return resolvePath(url.origin + source);
                        }
                        return resolvePath(source);
                    } else if(isURL(source)){
                        return source;
                    }
                    return { id: source, external: true };
                },
                async load(id) {
                    if(isURL(id)) {
                        const res = await fetch(id);
                        return await res.text();
                    } else if(id === "/index.js") {
                        return code.content;
                    }
                    return null;
                }
            }
        ]
    });
    const bundle = await build.generate({
        format: "iife",
        sourcemap: "inline",
        inlineDynamicImports: true
    });
    return bundle.output[0].code;
}

const getPosFromStackLine = (line: string): CodePosition | undefined => {
    const match = line.match(/:(\d+):(\d+)(?![^\n]*:)/gm);
    if(match) {
        const groups = match[0].match(/:(\d+):(\d+)/);
        if(!groups) return;
        return { line: Number(groups[1]) - 2, column: Number(groups[2]) };
    } else return;
};

const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;
export const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const getActualFirstStackLine = (lines: string[]) => {
    let i = 0; while(!["<anonymous>", "AsyncFunction"].find(e => lines[i].includes(e))) i++;
    return i;
};

function decodeUnicodeBase64(base64: string) {
    const binString = atob(base64);
    const bytes = Uint8Array.from(binString, m => m.codePointAt(0)!);
    return new TextDecoder().decode(bytes);
}

const getSourceMapConsumer = (code: string) => {
    const sourcemap = JSON.parse(decodeUnicodeBase64(code.match(/\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,([A-Za-z0-9+\/=]+)/)![1]));
    return new SourceMapConsumer(sourcemap);    
};

type ObjectRef<T> = {
    value: T
};

// these three values are used by liveUpdate.ts
export let bundleState: ObjectRef<EditorState | null> = { value: null };
export let bundle: ObjectRef<string | null> = { value: null };
export let smc: SourceMapConsumer | null = null;

export async function build() {
    // console.log("full rebuild");
    try {
        bundle.value = await getBundle();
        bundleState.value = EditorState.create({ doc: bundle.value }); // using EditorState for change tracking
        smc = getSourceMapConsumer(bundle.value);
        return true;
    } catch(caught: any) {
        if(caught.name !== "RollupError" || !caught.cause) throw caught;
        const err = (caught as RollupError).cause as RollupError;
        if(!err || !err.loc) throw err;
        // rollup error - probably a syntax error

        patchStore({
            turtles: [],
            turtlePos: [0, 0],
            error: {
                stack: [{
                    line: err.loc.line,
                    column: err.loc.column
                }],
                code: getStore().code.content,
                name: err.name ?? caught.name,
                message: err.message.replace(/\((\d+):(\d+)(?![^\n]*:)\)/gm, "").trim()
            }
        });

        return false;
    }
}

export default async function runCode(cached: boolean = false) {
    const turtles: Turtle[] = [];
    let errorState: ErrorState | null = null;

    if(!cached && !(await build())) return;
    // console.debug(bundle);

    intervals.forEach(clearInterval);
    timeouts.forEach(clearTimeout);
    loops.forEach((_, i) => {
        loops[i] = false;
    });

    const patchedInterval = (callback: (...args: any[]) => void, time: number, ...args: any[]) => {
        const interval = window.setInterval(callback, time, ...args);
        intervals.push(interval);
        return interval;
    };

    const patchedTimeout = (callback: (...args: any[]) => void, time: number, ...args: any[]) => {
        const timeout = window.setTimeout(callback, time, ...args);
        timeouts.push(timeout);
        return timeout;
    };

    const loop = async (fn: (...args: any) => any, minterval = 0) => {
        let n = loops.length;
        loops.push(true);
        while (loops[n]) {
            const date = new Date();
            const start = date.getTime();
            await fn();
            const elapsed = date.getTime() - start;
            if (elapsed < minterval) await sleep(minterval - elapsed);
        }
    };

    const baseLogger = (type: "log" | "error" | "warn", ...args: [any, ...any[]]) => {
        console[type](...args);
    
        // get code location
        const stackLines = new Error().stack!.split("\n");
        const mappedPos = getPosFromStackLine(stackLines[getActualFirstStackLine(stackLines)]); // zeroth is line in baselogger, first is call to baseLogger, second is call to actual log function (although getActual gets the first one from the actual eval'ed function so we don't need to worry about this)
        const pos = mappedPos && smc!.originalPositionFor(mappedPos);

        patchStore({
            console: [
                ...getStore().console,
                {
                    type,
                    pos,
                    time: Number(new Date()),
                    values: args
                }
            ]
        });
    };
    
    const hConsole = {
        log: (...args: [any, ...any[]]) => baseLogger("log", ...args),
        error: (...args: [any, ...any[]]) => baseLogger("error", ...args),
        warn: (...args: [any, ...any[]]) => baseLogger("warn", ...args)
    };    

    // inject items into global scope, or replace existing properties with our own
    const customGlobal = {
        setTimeout: patchedTimeout,
        setInterval: patchedInterval,
        loop,
        sleep,
        // drawing functions
        Turtle,
        createTurtle: (pt: Point) => new Turtle(pt),
        console: hConsole,
        ...drawingUtils,
        lerp(start: number, end: number, t: number) {
            return (1 - t) * start + t * end;
        },
        drawTurtles: (...turtlesToDraw: Turtle[]) => {
            turtlesToDraw.forEach(t => turtles.push(t));
        },
        setDocDimensions(w: number, h: number) {
            patchStore({
                docDimensions: {
                    width: w,
                    height: h
                }
            })
        }
    };

    const globalProxy = new Proxy(window, {
        get: (w, prop) => (
            //@ts-ignore
            prop in customGlobal ? customGlobal[prop] : w[prop].bind(w)
        )
    });
  
    const args = {
      ...customGlobal,
      global: globalProxy,
      globalThis: globalProxy,
      window: globalProxy
    }
  
    const names = Object.keys(args);
    const values = Object.values(args);

    let f;

    try {
        f = new AsyncFunction(
            ...names,
            "await (async " + bundle.value!.slice(1)
        );
    } catch(err) {
        // normally this would have been caught by rollup's syntax checking
        // probably an issue happened during live update, and the syntax became invalid
        debugger;
        throw err;
    }

    // console.log(f, f.toString());

    patchStore({
        console: []
    });

    try {
        await f(
            ...values
        );
    } catch(err: any) {
        // extract actual position from sourcemap
        // stack trace parsing time
        const stackLines: string[] = err.stack?.split("\n") ?? [];
        let i = stackLines.length === 0 ? 0 : getActualFirstStackLine(stackLines);
        let positions: FindPosition[] = [];
        while(i < stackLines.length && [0, 1 /* iife call */].map(n => stackLines[i + n]).every(l => l && (l.includes("AsyncFunction") || l.includes("eval at ")))) {
            const line = stackLines[i];
            const pos = getPosFromStackLine(line);
            if(!pos) break;
            positions.push(pos);
            i++;
        }
        const mapPosition = (position: FindPosition) => {
            const mapped = smc!.originalPositionFor(position);
            if(mapped.line === null) {
                // sometimes it fails to map for some reason, try incrementing the column
                console.warn("failed to map source position, incrementing column as workaround");
                return smc!.originalPositionFor({ ...position, column: position.column + 1 });
            }
            return mapped;
        }
        const mapped = positions.map(mapPosition);
        errorState = {
            stack: mapped,
            code: getStore().code.content,
            name: err.name,
            message: err.message
        };
    }

    patchStore({
        turtles,
        turtlePos: turtles.at(-1)?.position ?? [0, 0],
        error: errorState
    });
}
