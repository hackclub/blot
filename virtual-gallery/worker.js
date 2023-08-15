import { Turtle } from "../interface/drawing-functions/Turtle.js";
import { noise } from "../interface/drawing-functions/noise.js";
import {
  rand,
  setRandSeed,
  randInRange,
  randIntInRange,
} from "../interface/drawing-functions/rand.js";
import { bezierEasing } from "../interface/drawing-functions/bezierEasing.js";
import {
  isPointInPolyline,
  inside,
} from "../interface/drawing-functions/isPointInPolyline.js";

import * as acorn from "https://esm.sh/acorn@8.8.1";

let intervals = [];
let timeouts = [];
let loops = [];

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
  bezierEasing,
  isPointInPolyline,
  inside,
  lerp(start, end, t) {
    return (1 - t) * start + t * end;
  },
};

function runCode(code, state) {
  const ast = acorn.parse(code, { ecmaVersion: "latest" });
  const topScopeInserts = [];

  ast.body.forEach((statement) => {
    const { type } = statement;

    if (type === "VariableDeclaration") {
      statement.declarations.forEach((x) => {
        topScopeInserts.push(x.id.name);
      });
    }

    if (type === "FunctionDeclaration") {
      topScopeInserts.push(statement.id.name);
    }
  });

  topScopeInserts.forEach((name) => {
    code += `\n;topScope["${name}"] = ${name};`;
  });

  intervals.forEach(clearInterval);
  timeouts.forEach(clearTimeout);

  loops.forEach((x, i) => {
    loops[i] = false;
  });

  const patchedInterval = (callback, time, ...args) => {
    const interval = setInterval(callback, time, ...args);
    intervals.push(interval);
    return interval;
  };

  const patchedTimeout = (callback, time, ...args) => {
    const timeout = setTimeout(callback, time, ...args);
    timeouts.push(timeout);
    return timeout;
  };

  const loop = (fn, minterval = 0) => {
    let n = loops.length;
    loops.push(true);
    while (loops[n]) {
      const date = new Date();
      const start = date.getTime();
      fn();
      const elapsed = date.getTime() - start;
      if (elapsed < minterval) delay(minterval - elapsed);
    }
  };

  let _log = console.log;
  let _warn = console.warn;
  let _error = console.error;

  state.turtles = [];

  const haxidraw = state.haxidraw;

  const clear = () => {
    state.turtles = [];
  };
  const topScope = { haxidraw, clear };

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
    console: {
      log: (...args) => {
        _log(...args);
        state.logs.push(...args);
      },
      warn: (...args) => {
        _warn(...args);
        state.logs.push(...args);
      },
      error: (...args) => {
        _error(...args);
        state.logs.push(...args);
      },
    },
  };

  const names = Object.keys(args);
  const values = Object.values(args);

  const AsyncFunction = async function () {}.constructor;
  const f = new AsyncFunction(...names, code);

  f(...values);

  state.topScope = topScope;

  return state.turtles;
}

onmessage = (e) => {
  let state = JSON.parse(e.data.state);
  let code = runCode(e.data.code, state);
  postMessage({ turtles: code, x: e.data.x, y: e.data.y });
};
