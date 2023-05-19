import * as acorn from 'acorn';
import { Turtle } from "./Turtle.js";

let intervals = [];
let timeouts = [];
let loops = [];  

export async function runCode(code, state) {

  const ast = acorn.parse(code, { ecmaVersion: "latest" });

  const topScopeInserts = [];

  ast.body.forEach(statement => {
    const { type } = statement;

    if (type === "VariableDeclaration") {
      statement.declarations.forEach(x => {
        topScopeInserts.push(x.id.name);
      })
    }

    if (type === "FunctionDeclaration") {
      topScopeInserts.push(statement.id.name);
    }

  })

  topScopeInserts.forEach(name => {
    code += `\n;topScope["${name}"] = ${name};`
  });

  intervals.forEach(clearInterval);
  timeouts.forEach(clearTimeout);

  loops.forEach((x, i) => { loops[i] = false });

  const patchedInterval = (callback, time, ...args) => {
    const interval = setInterval(callback, time, ...args);
    intervals.push(interval);
    return interval;
  }

  const patchedTimeout = (callback, time, ...args) => {
    const timeout = setTimeout(callback, time, ...args);
    timeouts.push(timeout);
    return timeout;
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const loop = async (fn, minterval = 0) => {
    let n = loops.length;
    loops.push(true);
    while (loops[n]) {
      const date = new Date();
      const start = date.getTime();
      await fn();
      const elapsed = (date.getTime()) - start;
      if (elapsed < minterval) await delay(minterval - elapsed);
    }
  }

  let _log = console.log;
  let _warn = console.warn;
  let _error = console.error;

  state.turtles = [];

  const haxidraw = {
    penUp: async () => {
      await state.haxidraw.servo(-90);
    },
    penDown: async () => {
      await state.haxidraw.servo(90);
    },
    goTo: async (x, y) => {
      await state.haxidraw.moveTo(x, y);
    },
    setStepsPerUnit: async (spu) => { // need to implement this
      await state.haxidraw.setStepsPerUnit(spu);
    }
  }

  const runMachine = () => runMachineHelper(state, [state.scaleX, state.scaleY]);
  const clear = () => {
    state.turtles = [];
  }
  // TODO: these should always be available, even if I haven't run main program
  const topScope = { haxidraw, runMachine, clear };

  const args = {
    Turtle,
    drawTurtles: (...turtles) => {
      state.turtles.push(...turtles);
    },
    ...topScope,
    topScope,
    setInterval: patchedInterval,
    setTimeout: patchedTimeout,
    loop,
    delay,
    console: {
      log: (...args) => {
        _log(...args)
        state.logs.push(...args);
      },
      warn: (...args) => {
        _warn(...args)
        state.logs.push(...args);
      },
      error: (...args) => {
        _error(...args)
        state.logs.push(...args);
      }
    },
    // global: globalProxy,
    // globalThis: globalProxy,
    // window: globalProxy
    // document: null,
    // window: null,
    // eval: null,
    // global: null,
    // globalThis: null,
  }

  const names = Object.keys(args);
  const values = Object.values(args);

  const AsyncFunction = (async function () { }).constructor;
  const f = new AsyncFunction(...names, code);

  f(...values);

  state.topScope = topScope;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runMachineHelper(state, [scaleX, scaleY]) {
  const polylines = state.turtles.map(x => x.path).flat();
  for (const polyline of polylines) {
    console.log("pl", polyline);
    for (let i = 0; i < polyline.length; i++) { 
      const {x, y} = polyline[i];
      // if (i === 0) await state.haxidraw.servo(-90);
      // else if (i === 1) await state.haxidraw.servo(90);
      console.log("moveTo", x, y);
      await state.haxidraw.moveTo(x*scaleX, y*scaleY);
      await delay(2000);
    }

  }

  // await state.haxidraw.servo(-90);
}
