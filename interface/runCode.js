import * as acorn from 'acorn';
import { Turtle } from "./drawing-functions/Turtle.js";
import { noise } from "./drawing-functions/noise.js";
import { rand, setRandSeed, randInRange, randIntInRange } from "./drawing-functions/rand.js";
import { displace } from "./drawing-functions/displace.js";
import { createCubicBez } from "./drawing-functions/createCubicBez.js";
import { makeCubicShaper } from "./drawing-functions/makeCubicShaper.js";
import { bezierEasing } from "./drawing-functions/bezierEasing.js";
import { bezierEasing as be } from "./drawing-functions/bezierEasing2.js";
import { bezierEasing as be1 } from "./drawing-functions/bezierEasing3.js";

const drawingFunctions = {
  Turtle,
  createTurtle(start = [0, 0]) {
    return new Turtle(start);
  },
  noise,
  rand,
  setRandSeed,
  randInRange, 
  randIntInRange,
  // displace,
  makeCubicShaper,
  createCubicBez,
  bezierEasing,
  be,
  be1,
  lerp(start, end, t) {
    return (1 - t) * start + t * end;
  }
  // softmax
  // softmin
}

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

  const haxidraw = state.haxidraw;

  const runMachine = () => runMachineHelper(state, [state.scaleX, state.scaleY]);
  const clear = () => {
    state.turtles = [];
  }
  // TODO: these should always be available, even if I haven't run main program
  const topScope = { haxidraw, runMachine, clear };

  const args = {
    ...drawingFunctions,
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

  await f(...values);

  state.topScope = topScope;
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function runMachineHelper(state, [scaleX, scaleY]) {
  await state.haxidraw.servo(1000);
  await delay(200);
  const polylines = state.turtles.map(x => x.path).flat();
  for (const polyline of polylines) {
    for (let i = 0; i < polyline.length; i++) { 
      const [ x, y ] = polyline[i];
      if (i === 0) {
        await state.haxidraw.servo(1000);
        await delay(200);
      } else if (i === 1) {
        await state.haxidraw.servo(1700);
        await delay(100);
      }
      
      await state.haxidraw.goTo(x*scaleX, y*scaleY);

    }

  }

  await state.haxidraw.servo(1000);
  await delay(200);
  await state.haxidraw.goTo(0, 0);
}
