// haxidraw code runtime environment

import { CodePosition, ErrorState, getStore, patchStore } from "./state.ts";
import { RollupError, rollup } from "@rollup/browser";
import { Turtle as BaseTurtle, Point } from "haxidraw-client";
import * as drawingUtils from "haxidraw-client/utils";
import { type FindPosition, SourceMapConsumer } from "source-map-js";

let intervals: number[] = [];
let timeouts: number[] = [];
let loops: boolean[] = [];

// https://stackoverflow.com/a/62507199
// what a beautiful solution to this problem
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

export default async function runCode() {
    const turtles: Turtle[] = [];
    let turtlePos: Point = [0, 0];
    let errorState: ErrorState | null = null;

    let code: string;
    try {
        code = await getBundle();
    } catch(caught: any) {
        if(caught.name !== "RollupError" || !caught.cause) throw caught;
        const err = (caught as RollupError).cause as RollupError;
        if(!err || !err.loc) throw err;
        // rollup error - probably a syntax error

        errorState = {
            stack: [{
                line: err.loc.line,
                column: err.loc.column
            }],
            code: getStore().code.content,
            name: err.name ?? caught.name,
            message: err.message.replace(/\((\d+):(\d+)(?![^\n]*:)\)/gm, "").trim()
        };

        patchStore({
            turtles,
            turtlePos,
            error: errorState
        });
        
        return;
    }
    console.debug(code);

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

    class Turtle extends BaseTurtle {
        constructor() {
            super();
            turtles.push(this);
        }
        goto([x, y]: Point): this {
            turtlePos = [x, y];
            return super.goto([x, y]);
        }
    }

    const smc = getSourceMapConsumer(code);

    const baseLogger = (type: "log" | "error" | "warn", ...args: [any, ...any[]]) => {
        console[type](...args);
    
        // get code location
        const stackLines = new Error().stack!.split("\n");
        const mappedPos = getPosFromStackLine(stackLines[getActualFirstStackLine(stackLines)]); // zeroth is line in baselogger, first is call to baseLogger, second is call to actual log function (although getActual gets the first one from the actual eval'ed function so we don't need to worry about this)
        const pos = mappedPos && smc.originalPositionFor(mappedPos);
        
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
        console: hConsole,
        ...drawingUtils,
        lerp(start: number, end: number, t: number) {
            return (1 - t) * start + t * end;
        },
        // compat - not actually necessary
        drawTurtles: function noop() {}
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
  
    const f = new AsyncFunction(
      ...names,
      "await (async " + code.slice(1)
    );

    console.log(f, f.toString());

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
        const stackLines: string[] = err.stack.split("\n");
        let i = getActualFirstStackLine(stackLines);
        let positions: FindPosition[] = [];
        do {
            const line = stackLines[i];
            const pos = getPosFromStackLine(line);
            if(!pos) break;
            positions.push(pos);
            i++;
        } while(i < stackLines.length && [0, 1 /* iife call */, 2 /* AsyncFunction call */].map(n => stackLines[i + n]).every(l => l && l.includes("run.ts")));
        const mapped = positions.map(smc.originalPositionFor.bind(smc));
        errorState = {
            stack: mapped,
            code: getStore().code.content,
            name: err.name,
            message: err.message
        };
    }

    patchStore({
        turtles,
        turtlePos,
        error: errorState
    });
}
