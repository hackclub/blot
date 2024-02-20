import { toolkit } from "./drawingToolkit/toolkit.js";
import { Turtle } from './drawingToolkit/Turtle.js'
import { getPosFromErr } from "./getPosFromErr.js";

let intervals = [];
let timeouts = [];

export function makeIncluded() {
    intervals.forEach(clearInterval)
    timeouts.forEach(clearTimeout)

    let turtles = [];
    let logs = [];
    let docDimensions = { width: 0, height: 0 }

    const baseLogger = (type, ...args) => {
        console[type](...args)
        
        // get code location
        const pos = getPosFromErr(new Error())
        
        logs.push({
            type,
            pos,
            time: Number(new Date()),
            values: args
        });
    }
        
    const patchedConsole = {
        log: (...args) => baseLogger('log', ...args),
        error: (...args) => baseLogger('error', ...args),
        warn: (...args) => baseLogger('warn', ...args)
    }
    
    const patchedInterval = (callback, time, ...args) => {
        const interval = window.setInterval(callback, time, ...args)
        intervals.push(interval)
        return interval
    }
    
    const patchedTimeout = (callback, time, ...args) => {
        const timeout = window.setTimeout(callback, time, ...args);
        timeouts.push(timeout);
        return timeout;
    }
    
    const customGlobal = {
        setTimeout: patchedTimeout,
        setInterval: patchedInterval,
        console: patchedConsole,
        
        setDocDimensions(w, h) {
            docDimensions.width = w;
            docDimensions.height = h;
        },
        drawPolylines: (polylines = [], style = {}) => {
            if (polylines.length === 0) return;
        
            const temp = {};
            temp.path = JSON.parse(JSON.stringify(polylines));
            if (style.fill === undefined) style.fill = 'none';
            if (style.stroke === undefined) style.stroke = 'black';
            if (style.width === undefined) style.width = 1;
            temp.style = style;
            turtles.push(temp);
        },
        
        toolkit,
        
        // createTurtle: (pt: Point) => new Turtle(pt),
        // Turtle,
        // ...drawingUtils,
        // lerp(start: number, end: number, t: number) {
        //   return (1 - t) * start + t * end
        // },
        // drawTurtles: (turtlesToDraw: Turtle[], style = {}) => {
        //   turtlesToDraw.forEach(t => {
        //     const temp = t.copy()
        //     if (style.fill === undefined) style.fill = 'none'
        //     if (style.stroke === undefined) style.stroke = 'black'
        //     if (style.width === undefined) style.width = 1
        //     temp.style = style
        //     turtles.push(temp)
        //   })
        // },
    }
    
    // const globalProxy = new Proxy(window, {
    //     get: (w, prop) =>
    //         prop in customGlobal ? customGlobal[prop] : w[prop].bind(w)
    //     }
    // )
        
    const args = {
        ...customGlobal,
        // global: globalProxy,
        // globalThis: globalProxy,
        // window: globalProxy
    }

    return {
        globalScope: args,
        turtles,
        logs,
        docDimensions
    }
}
