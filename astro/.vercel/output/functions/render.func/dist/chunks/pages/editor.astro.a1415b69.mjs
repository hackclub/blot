import { _ as __astro_tag_component__, c as createAstro, a as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead } from "../astro.ddd8ab85.mjs";
import { $ as $$Layout } from "./_slug_.astro.b84621a5.mjs";
import { useEffect as useEffect$1, useState, useMemo, useCallback, useRef } from "preact/hooks";
import { useEffect, useReducer } from "preact/compat";
import { ViewPlugin, Decoration, EditorView, GutterMarker, lineNumberMarkers, WidgetType, keymap } from "@codemirror/view";
import { javascript } from "@codemirror/lang-javascript";
import { basicSetup, EditorView as EditorView$1 } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { syntaxTree, indentUnit, syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";
import { EditorState, Compartment, StateEffect, StateField, RangeSet, Transaction } from "@codemirror/state";
import { rollup } from "@rollup/browser";
import { SourceMapConsumer } from "source-map-js";
import { basicDark } from "cm6-theme-basic-dark";
import { vim } from "@replit/codemirror-vim";
import { render, h } from "preact";
import { s as styles, a as styles$1, b as styles$2, c as styles$3, d as styles$4, e as styles$5, f as styles$6, g as styles$7, h as styles$8 } from "../editor.19beca6a.4806d41b.mjs";
import cx from "classnames";
import { jsx, jsxs, Fragment } from "preact/jsx-runtime";
import { nanoid } from "nanoid";
import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
import "html-escaper";
/* empty css                            *//* empty css                            */let counter = 0;
const PREFIX = "_n";
const createEvent = () => {
  const eventName = PREFIX + counter;
  counter++;
  return [(callback, deps) => {
    useEffect(() => {
      const l = (e) => {
        callback(e.detail);
      };
      document.addEventListener(eventName, l);
      return () => {
        document.removeEventListener(eventName, l);
      };
    }, deps);
  }, (data) => {
    const e = new CustomEvent(eventName, {
      detail: data
    });
    document.dispatchEvent(e);
  }];
};
const useRerender = () => useReducer((_) => ({}), 0)[1];
const createState = (initialValue) => {
  let db = initialValue;
  let trackStore = {
    ...initialValue
  };
  const [useReceiver, emitter] = createEvent();
  return [(keys) => {
    if (keys !== null) {
      const rerender = useRerender();
      useReceiver((changed) => {
        if (!keys || changed.some((k) => keys.includes(k))) {
          rerender();
        }
      }, []);
    }
    return db;
  }, (patch, changed) => {
    if (Array.isArray(patch)) {
      changed = patch;
      patch = void 0;
    }
    if (patch) {
      for (const prop in patch) {
        db[prop] = patch[prop];
      }
    }
    changed ?? (changed = Object.entries(db).filter(([key, val]) => val !== trackStore[key]).map(([key]) => key));
    for (const prop of changed) {
      trackStore[prop] = db[prop];
    }
    emitter(changed);
  }, () => db];
};
const [useOnEditorChange, dispatchEditorChange] = createEvent();
const rangeToCodePositions = (from, to, view) => [from, to].map((offset) => offsetToCodePosition(offset, view));
const offsetToCodePosition = (offset, view) => {
  const cmLine = view.state.doc.lineAt(offset);
  return {
    line: cmLine.number,
    column: offset - cmLine.from
  };
};
const codePositionToOffset = (pos, state) => state.doc.line(pos.line).from + pos.column;
const nodeIsNumber = (node, view) => {
  if (node.name === "Number" && node.parent.name !== "UnaryExpression")
    return true;
  if (node.name === "UnaryExpression") {
    const a = node.getChild("ArithOp");
    return a && view.state.doc.sliceString(a.from, a.to) === "-";
  }
  return false;
};
// @license
const commandsMap = {
  Z: "Z",
  M: "M",
  L: "L",
  C: "C",
  Q: "Q",
  A: "A",
  H: "H",
  V: "V",
  S: "S",
  T: "T",
  z: "Z",
  m: "m",
  l: "l",
  c: "c",
  q: "q",
  a: "a",
  h: "h",
  v: "v",
  s: "s",
  t: "t"
};
const Source = function(string) {
  this._string = string;
  this._currentIndex = 0;
  this._endIndex = this._string.length;
  this._prevCommand = null;
  this._skipOptionalSpaces();
};
Source.prototype = {
  parseSegment: function() {
    var char = this._string[this._currentIndex];
    var command = commandsMap[char] ? commandsMap[char] : null;
    if (command === null) {
      if (this._prevCommand === null) {
        return null;
      }
      if ((char === "+" || char === "-" || char === "." || char >= "0" && char <= "9") && this._prevCommand !== "Z") {
        if (this._prevCommand === "M") {
          command = "L";
        } else if (this._prevCommand === "m") {
          command = "l";
        } else {
          command = this._prevCommand;
        }
      } else {
        command = null;
      }
      if (command === null) {
        return null;
      }
    } else {
      this._currentIndex += 1;
    }
    this._prevCommand = command;
    var values = null;
    var cmd = command.toUpperCase();
    if (cmd === "H" || cmd === "V") {
      values = [this._parseNumber()];
    } else if (cmd === "M" || cmd === "L" || cmd === "T") {
      values = [this._parseNumber(), this._parseNumber()];
    } else if (cmd === "S" || cmd === "Q") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "C") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "A") {
      values = [
        this._parseNumber(),
        this._parseNumber(),
        this._parseNumber(),
        this._parseArcFlag(),
        this._parseArcFlag(),
        this._parseNumber(),
        this._parseNumber()
      ];
    } else if (cmd === "Z") {
      this._skipOptionalSpaces();
      values = [];
    }
    if (values === null || values.indexOf(null) >= 0) {
      return null;
    } else {
      return { type: command, values };
    }
  },
  hasMoreData: function() {
    return this._currentIndex < this._endIndex;
  },
  peekSegmentType: function() {
    var char = this._string[this._currentIndex];
    return commandsMap[char] ? commandsMap[char] : null;
  },
  initialCommandIsMoveTo: function() {
    if (!this.hasMoreData()) {
      return true;
    }
    var command = this.peekSegmentType();
    return command === "M" || command === "m";
  },
  _isCurrentSpace: function() {
    var char = this._string[this._currentIndex];
    return char <= " " && (char === " " || char === "\n" || char === "	" || char === "\r" || char === "\f");
  },
  _skipOptionalSpaces: function() {
    while (this._currentIndex < this._endIndex && this._isCurrentSpace()) {
      this._currentIndex += 1;
    }
    return this._currentIndex < this._endIndex;
  },
  _skipOptionalSpacesOrDelimiter: function() {
    if (this._currentIndex < this._endIndex && !this._isCurrentSpace() && this._string[this._currentIndex] !== ",") {
      return false;
    }
    if (this._skipOptionalSpaces()) {
      if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ",") {
        this._currentIndex += 1;
        this._skipOptionalSpaces();
      }
    }
    return this._currentIndex < this._endIndex;
  },
  // Parse a number from an SVG path. This very closely follows genericParseNumber(...) from
  // Source/core/svg/SVGParserUtilities.cpp.
  // Spec: http://www.w3.org/TR/SVG11/single-page.html#paths-PathDataBNF
  _parseNumber: function() {
    var exponent = 0;
    var integer = 0;
    var frac = 1;
    var decimal = 0;
    var sign = 1;
    var expsign = 1;
    var startIndex = this._currentIndex;
    this._skipOptionalSpaces();
    if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "+") {
      this._currentIndex += 1;
    } else if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === "-") {
      this._currentIndex += 1;
      sign = -1;
    }
    if (this._currentIndex === this._endIndex || (this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") && this._string[this._currentIndex] !== ".") {
      return null;
    }
    var startIntPartIndex = this._currentIndex;
    while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
      this._currentIndex += 1;
    }
    if (this._currentIndex !== startIntPartIndex) {
      var scanIntPartIndex = this._currentIndex - 1;
      var multiplier = 1;
      while (scanIntPartIndex >= startIntPartIndex) {
        integer += multiplier * (this._string[scanIntPartIndex] - "0");
        scanIntPartIndex -= 1;
        multiplier *= 10;
      }
    }
    if (this._currentIndex < this._endIndex && this._string[this._currentIndex] === ".") {
      this._currentIndex += 1;
      if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
        return null;
      }
      while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
        frac *= 10;
        decimal += (this._string.charAt(this._currentIndex) - "0") / frac;
        this._currentIndex += 1;
      }
    }
    if (this._currentIndex !== startIndex && this._currentIndex + 1 < this._endIndex && (this._string[this._currentIndex] === "e" || this._string[this._currentIndex] === "E") && this._string[this._currentIndex + 1] !== "x" && this._string[this._currentIndex + 1] !== "m") {
      this._currentIndex += 1;
      if (this._string[this._currentIndex] === "+") {
        this._currentIndex += 1;
      } else if (this._string[this._currentIndex] === "-") {
        this._currentIndex += 1;
        expsign = -1;
      }
      if (this._currentIndex >= this._endIndex || this._string[this._currentIndex] < "0" || this._string[this._currentIndex] > "9") {
        return null;
      }
      while (this._currentIndex < this._endIndex && this._string[this._currentIndex] >= "0" && this._string[this._currentIndex] <= "9") {
        exponent *= 10;
        exponent += this._string[this._currentIndex] - "0";
        this._currentIndex += 1;
      }
    }
    var number = integer + decimal;
    number *= sign;
    if (exponent) {
      number *= Math.pow(10, expsign * exponent);
    }
    if (startIndex === this._currentIndex) {
      return null;
    }
    this._skipOptionalSpacesOrDelimiter();
    return number;
  },
  _parseArcFlag: function() {
    if (this._currentIndex >= this._endIndex) {
      return null;
    }
    var flag = null;
    var flagChar = this._string[this._currentIndex];
    this._currentIndex += 1;
    if (flagChar === "0") {
      flag = 0;
    } else if (flagChar === "1") {
      flag = 1;
    } else {
      return null;
    }
    this._skipOptionalSpacesOrDelimiter();
    return flag;
  }
};
const parsePathDataString = function(string) {
  if (!string || string.length === 0)
    return [];
  var source = new Source(string);
  var pathData = [];
  if (source.initialCommandIsMoveTo()) {
    while (source.hasMoreData()) {
      var pathSeg = source.parseSegment();
      if (pathSeg === null) {
        break;
      } else {
        pathData.push(pathSeg);
      }
    }
  }
  return pathData;
};
const $cachedPathData = typeof Symbol !== "undefined" ? Symbol() : "__cachedPathData";
const $cachedNormalizedPathData = typeof Symbol !== "undefined" ? Symbol() : "__cachedNormalizedPathData";
var arcToCubicCurves = function(x1, y1, x2, y2, r1, r2, angle, largeArcFlag, sweepFlag, _recursive) {
  var degToRad = function(degrees) {
    return Math.PI * degrees / 180;
  };
  var rotate2 = function(x3, y3, angleRad2) {
    var X = x3 * Math.cos(angleRad2) - y3 * Math.sin(angleRad2);
    var Y = x3 * Math.sin(angleRad2) + y3 * Math.cos(angleRad2);
    return { x: X, y: Y };
  };
  var angleRad = degToRad(angle);
  var params = [];
  var f1, f2, cx2, cy;
  if (_recursive) {
    f1 = _recursive[0];
    f2 = _recursive[1];
    cx2 = _recursive[2];
    cy = _recursive[3];
  } else {
    var p1 = rotate2(x1, y1, -angleRad);
    x1 = p1.x;
    y1 = p1.y;
    var p2 = rotate2(x2, y2, -angleRad);
    x2 = p2.x;
    y2 = p2.y;
    var x = (x1 - x2) / 2;
    var y = (y1 - y2) / 2;
    var h2 = x * x / (r1 * r1) + y * y / (r2 * r2);
    if (h2 > 1) {
      h2 = Math.sqrt(h2);
      r1 = h2 * r1;
      r2 = h2 * r2;
    }
    var sign;
    if (largeArcFlag === sweepFlag) {
      sign = -1;
    } else {
      sign = 1;
    }
    var r1Pow = r1 * r1;
    var r2Pow = r2 * r2;
    var left = r1Pow * r2Pow - r1Pow * y * y - r2Pow * x * x;
    var right = r1Pow * y * y + r2Pow * x * x;
    var k = sign * Math.sqrt(Math.abs(left / right));
    cx2 = k * r1 * y / r2 + (x1 + x2) / 2;
    cy = k * -r2 * x / r1 + (y1 + y2) / 2;
    f1 = Math.asin(parseFloat(((y1 - cy) / r2).toFixed(9)));
    f2 = Math.asin(parseFloat(((y2 - cy) / r2).toFixed(9)));
    if (x1 < cx2) {
      f1 = Math.PI - f1;
    }
    if (x2 < cx2) {
      f2 = Math.PI - f2;
    }
    if (f1 < 0) {
      f1 = Math.PI * 2 + f1;
    }
    if (f2 < 0) {
      f2 = Math.PI * 2 + f2;
    }
    if (sweepFlag && f1 > f2) {
      f1 = f1 - Math.PI * 2;
    }
    if (!sweepFlag && f2 > f1) {
      f2 = f2 - Math.PI * 2;
    }
  }
  var df = f2 - f1;
  if (Math.abs(df) > Math.PI * 120 / 180) {
    var f2old = f2;
    var x2old = x2;
    var y2old = y2;
    if (sweepFlag && f2 > f1) {
      f2 = f1 + Math.PI * 120 / 180 * 1;
    } else {
      f2 = f1 + Math.PI * 120 / 180 * -1;
    }
    x2 = cx2 + r1 * Math.cos(f2);
    y2 = cy + r2 * Math.sin(f2);
    params = arcToCubicCurves(
      x2,
      y2,
      x2old,
      y2old,
      r1,
      r2,
      angle,
      0,
      sweepFlag,
      [f2, f2old, cx2, cy]
    );
  }
  df = f2 - f1;
  var c1 = Math.cos(f1);
  var s1 = Math.sin(f1);
  var c2 = Math.cos(f2);
  var s2 = Math.sin(f2);
  var t = Math.tan(df / 4);
  var hx = 4 / 3 * r1 * t;
  var hy = 4 / 3 * r2 * t;
  var m1 = [x1, y1];
  var m2 = [x1 + hx * s1, y1 - hy * c1];
  var m3 = [x2 + hx * s2, y2 - hy * c2];
  var m4 = [x2, y2];
  m2[0] = 2 * m1[0] - m2[0];
  m2[1] = 2 * m1[1] - m2[1];
  if (_recursive) {
    return [m2, m3, m4].concat(params);
  } else {
    params = [m2, m3, m4].concat(params);
    var curves = [];
    for (var i = 0; i < params.length; i += 3) {
      var r1 = rotate2(params[i][0], params[i][1], angleRad);
      var r2 = rotate2(params[i + 1][0], params[i + 1][1], angleRad);
      var r3 = rotate2(params[i + 2][0], params[i + 2][1], angleRad);
      curves.push([r1.x, r1.y, r2.x, r2.y, r3.x, r3.y]);
    }
    return curves;
  }
};
var clonePathData = function(pathData) {
  return pathData.map(function(seg) {
    return {
      type: seg.type,
      values: Array.prototype.slice.call(seg.values)
    };
  });
};
var absolutizePathData = function(pathData) {
  var absolutizedPathData = [];
  var currentX = null;
  var currentY = null;
  var subpathX = null;
  var subpathY = null;
  pathData.forEach(function(seg) {
    var type = seg.type;
    if (type === "M") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (type === "m") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (type === "L") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "l") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "C") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x2 = seg.values[2];
      var y2 = seg.values[3];
      var x = seg.values[4];
      var y = seg.values[5];
      absolutizedPathData.push({
        type: "C",
        values: [x1, y1, x2, y2, x, y]
      });
      currentX = x;
      currentY = y;
    } else if (type === "c") {
      var x1 = currentX + seg.values[0];
      var y1 = currentY + seg.values[1];
      var x2 = currentX + seg.values[2];
      var y2 = currentY + seg.values[3];
      var x = currentX + seg.values[4];
      var y = currentY + seg.values[5];
      absolutizedPathData.push({
        type: "C",
        values: [x1, y1, x2, y2, x, y]
      });
      currentX = x;
      currentY = y;
    } else if (type === "Q") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      absolutizedPathData.push({ type: "Q", values: [x1, y1, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "q") {
      var x1 = currentX + seg.values[0];
      var y1 = currentY + seg.values[1];
      var x = currentX + seg.values[2];
      var y = currentY + seg.values[3];
      absolutizedPathData.push({ type: "Q", values: [x1, y1, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "A") {
      var x = seg.values[5];
      var y = seg.values[6];
      absolutizedPathData.push({
        type: "A",
        values: [
          seg.values[0],
          seg.values[1],
          seg.values[2],
          seg.values[3],
          seg.values[4],
          x,
          y
        ]
      });
      currentX = x;
      currentY = y;
    } else if (type === "a") {
      var x = currentX + seg.values[5];
      var y = currentY + seg.values[6];
      absolutizedPathData.push({
        type: "A",
        values: [
          seg.values[0],
          seg.values[1],
          seg.values[2],
          seg.values[3],
          seg.values[4],
          x,
          y
        ]
      });
      currentX = x;
      currentY = y;
    } else if (type === "H") {
      var x = seg.values[0];
      absolutizedPathData.push({ type: "H", values: [x] });
      currentX = x;
    } else if (type === "h") {
      var x = currentX + seg.values[0];
      absolutizedPathData.push({ type: "H", values: [x] });
      currentX = x;
    } else if (type === "V") {
      var y = seg.values[0];
      absolutizedPathData.push({ type: "V", values: [y] });
      currentY = y;
    } else if (type === "v") {
      var y = currentY + seg.values[0];
      absolutizedPathData.push({ type: "V", values: [y] });
      currentY = y;
    } else if (type === "S") {
      var x2 = seg.values[0];
      var y2 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      absolutizedPathData.push({ type: "S", values: [x2, y2, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "s") {
      var x2 = currentX + seg.values[0];
      var y2 = currentY + seg.values[1];
      var x = currentX + seg.values[2];
      var y = currentY + seg.values[3];
      absolutizedPathData.push({ type: "S", values: [x2, y2, x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "T") {
      var x = seg.values[0];
      var y = seg.values[1];
      absolutizedPathData.push({ type: "T", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "t") {
      var x = currentX + seg.values[0];
      var y = currentY + seg.values[1];
      absolutizedPathData.push({ type: "T", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (type === "Z" || type === "z") {
      absolutizedPathData.push({ type: "Z", values: [] });
      currentX = subpathX;
      currentY = subpathY;
    }
  });
  return absolutizedPathData;
};
var reducePathData = function(pathData) {
  var reducedPathData = [];
  var lastType = null;
  var lastControlX = null;
  var lastControlY = null;
  var currentX = null;
  var currentY = null;
  var subpathX = null;
  var subpathY = null;
  pathData.forEach(function(seg) {
    if (seg.type === "M") {
      var x = seg.values[0];
      var y = seg.values[1];
      reducedPathData.push({ type: "M", values: [x, y] });
      subpathX = x;
      subpathY = y;
      currentX = x;
      currentY = y;
    } else if (seg.type === "C") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x2 = seg.values[2];
      var y2 = seg.values[3];
      var x = seg.values[4];
      var y = seg.values[5];
      reducedPathData.push({ type: "C", values: [x1, y1, x2, y2, x, y] });
      lastControlX = x2;
      lastControlY = y2;
      currentX = x;
      currentY = y;
    } else if (seg.type === "L") {
      var x = seg.values[0];
      var y = seg.values[1];
      reducedPathData.push({ type: "L", values: [x, y] });
      currentX = x;
      currentY = y;
    } else if (seg.type === "H") {
      var x = seg.values[0];
      reducedPathData.push({ type: "L", values: [x, currentY] });
      currentX = x;
    } else if (seg.type === "V") {
      var y = seg.values[0];
      reducedPathData.push({ type: "L", values: [currentX, y] });
      currentY = y;
    } else if (seg.type === "S") {
      var x2 = seg.values[0];
      var y2 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      var cx1, cy1;
      if (lastType === "C" || lastType === "S") {
        cx1 = currentX + (currentX - lastControlX);
        cy1 = currentY + (currentY - lastControlY);
      } else {
        cx1 = currentX;
        cy1 = currentY;
      }
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, x2, y2, x, y]
      });
      lastControlX = x2;
      lastControlY = y2;
      currentX = x;
      currentY = y;
    } else if (seg.type === "T") {
      var x = seg.values[0];
      var y = seg.values[1];
      var x1, y1;
      if (lastType === "Q" || lastType === "T") {
        x1 = currentX + (currentX - lastControlX);
        y1 = currentY + (currentY - lastControlY);
      } else {
        x1 = currentX;
        y1 = currentY;
      }
      var cx1 = currentX + 2 * (x1 - currentX) / 3;
      var cy1 = currentY + 2 * (y1 - currentY) / 3;
      var cx2 = x + 2 * (x1 - x) / 3;
      var cy2 = y + 2 * (y1 - y) / 3;
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, cx2, cy2, x, y]
      });
      lastControlX = x1;
      lastControlY = y1;
      currentX = x;
      currentY = y;
    } else if (seg.type === "Q") {
      var x1 = seg.values[0];
      var y1 = seg.values[1];
      var x = seg.values[2];
      var y = seg.values[3];
      var cx1 = currentX + 2 * (x1 - currentX) / 3;
      var cy1 = currentY + 2 * (y1 - currentY) / 3;
      var cx2 = x + 2 * (x1 - x) / 3;
      var cy2 = y + 2 * (y1 - y) / 3;
      reducedPathData.push({
        type: "C",
        values: [cx1, cy1, cx2, cy2, x, y]
      });
      lastControlX = x1;
      lastControlY = y1;
      currentX = x;
      currentY = y;
    } else if (seg.type === "A") {
      var r1 = Math.abs(seg.values[0]);
      var r2 = Math.abs(seg.values[1]);
      var angle = seg.values[2];
      var largeArcFlag = seg.values[3];
      var sweepFlag = seg.values[4];
      var x = seg.values[5];
      var y = seg.values[6];
      if (r1 === 0 || r2 === 0) {
        reducedPathData.push({
          type: "C",
          values: [currentX, currentY, x, y, x, y]
        });
        currentX = x;
        currentY = y;
      } else {
        if (currentX !== x || currentY !== y) {
          var curves = arcToCubicCurves(
            currentX,
            currentY,
            x,
            y,
            r1,
            r2,
            angle,
            largeArcFlag,
            sweepFlag
          );
          curves.forEach(function(curve) {
            reducedPathData.push({ type: "C", values: curve });
          });
          currentX = x;
          currentY = y;
        }
      }
    } else if (seg.type === "Z") {
      reducedPathData.push(seg);
      currentX = subpathX;
      currentY = subpathY;
    }
    lastType = seg.type;
  });
  return reducedPathData;
};
const getLength = (el, key) => {
  if (key in el && "baseVal" in el[key]) {
    return el[key].baseVal.value;
  } else {
    return +el.getAttribute(key);
  }
};
const path = function(options) {
  if (options && options.normalize) {
    if (this[$cachedNormalizedPathData]) {
      return clonePathData(this[$cachedNormalizedPathData]);
    } else {
      var pathData;
      if (this[$cachedPathData]) {
        pathData = clonePathData(this[$cachedPathData]);
      } else {
        pathData = parsePathDataString(this.getAttribute("d") || "");
        this[$cachedPathData] = clonePathData(pathData);
      }
      var normalizedPathData = reducePathData(absolutizePathData(pathData));
      this[$cachedNormalizedPathData] = clonePathData(normalizedPathData);
      return normalizedPathData;
    }
  } else {
    if (this[$cachedPathData]) {
      return clonePathData(this[$cachedPathData]);
    } else {
      var pathData = parsePathDataString(this.getAttribute("d") || "");
      this[$cachedPathData] = clonePathData(pathData);
      return pathData;
    }
  }
};
const rect = function(options) {
  var x = getLength(this, "x");
  var y = getLength(this, "y");
  var width = getLength(this, "width");
  var height = getLength(this, "height");
  var rx = this.hasAttribute("rx") ? getLength(this, "rx") : getLength(this, "ry");
  var ry = this.hasAttribute("ry") ? getLength(this, "ry") : getLength(this, "rx");
  if (rx > width / 2) {
    rx = width / 2;
  }
  if (ry > height / 2) {
    ry = height / 2;
  }
  var pathData = [
    { type: "M", values: [x + rx, y] },
    { type: "H", values: [x + width - rx] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + width, y + ry] },
    { type: "V", values: [y + height - ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + width - rx, y + height] },
    { type: "H", values: [x + rx] },
    { type: "A", values: [rx, ry, 0, 0, 1, x, y + height - ry] },
    { type: "V", values: [y + ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, x + rx, y] },
    { type: "Z", values: [] }
  ];
  pathData = pathData.filter(function(s) {
    return s.type === "A" && (s.values[0] === 0 || s.values[1] === 0) ? false : true;
  });
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
const circle = function(options) {
  var cx2 = getLength(this, "cx");
  var cy = getLength(this, "cy");
  var r = getLength(this, "r");
  var pathData = [
    { type: "M", values: [cx2 + r, cy] },
    { type: "A", values: [r, r, 0, 0, 1, cx2, cy + r] },
    { type: "A", values: [r, r, 0, 0, 1, cx2 - r, cy] },
    { type: "A", values: [r, r, 0, 0, 1, cx2, cy - r] },
    { type: "A", values: [r, r, 0, 0, 1, cx2 + r, cy] },
    { type: "Z", values: [] }
  ];
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
const ellipse = function(options) {
  var cx2 = getLength(this, "cx");
  var cy = getLength(this, "cy");
  var rx = getLength(this, "rx");
  var ry = getLength(this, "ry");
  var pathData = [
    { type: "M", values: [cx2 + rx, cy] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx2, cy + ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx2 - rx, cy] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx2, cy - ry] },
    { type: "A", values: [rx, ry, 0, 0, 1, cx2 + rx, cy] },
    { type: "Z", values: [] }
  ];
  if (options && options.normalize === true) {
    pathData = reducePathData(pathData);
  }
  return pathData;
};
const line = function() {
  const x1 = getLength(this, "x1");
  const x2 = getLength(this, "x2");
  const y1 = getLength(this, "y1");
  const y2 = getLength(this, "y2");
  return [
    { type: "M", values: [x1, y1] },
    { type: "L", values: [x2, y2] }
  ];
};
const polyline = function() {
  var pathData = [];
  for (var i = 0; i < this.points.numberOfItems; i += 1) {
    var point2 = this.points.getItem(i);
    pathData.push({
      type: i === 0 ? "M" : "L",
      values: [point2.x, point2.y]
    });
  }
  return pathData;
};
const polygon = function() {
  var pathData = [];
  for (var i = 0; i < this.points.numberOfItems; i += 1) {
    var point2 = this.points.getItem(i);
    pathData.push({
      type: i === 0 ? "M" : "L",
      values: [point2.x, point2.y]
    });
  }
  pathData.push({
    type: "Z",
    values: []
  });
  return pathData;
};
const pathDataGetters = {
  circle,
  ellipse,
  path,
  polygon,
  polyline,
  line,
  rect
};
function getPathData(svgElement, options) {
  const type = svgElement.nodeName.toLowerCase();
  if (type in pathDataGetters) {
    return pathDataGetters[type].call(svgElement, options);
  } else {
    throw new Error(`Unsupported SVG element type: '${type}'`);
  }
}
function isFlatEnough([x0, y0, x1, y1, x2, y2, x3, y3], flatness) {
  const ux = 3 * x1 - 2 * x0 - x3, uy = 3 * y1 - 2 * y0 - y3, vx = 3 * x2 - 2 * x3 - x0, vy = 3 * y2 - 2 * y3 - y0;
  return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy) <= 16 * flatness * flatness;
}
function subdivide([x0, y0, x1, y1, x2, y2, x3, y3], t) {
  if (t === void 0)
    t = 0.5;
  let u = 1 - t, x4 = u * x0 + t * x1, y4 = u * y0 + t * y1, x5 = u * x1 + t * x2, y5 = u * y1 + t * y2, x6 = u * x2 + t * x3, y6 = u * y2 + t * y3, x7 = u * x4 + t * x5, y7 = u * y4 + t * y5, x8 = u * x5 + t * x6, y8 = u * y5 + t * y6, x9 = u * x7 + t * x8, y9 = u * y7 + t * y8;
  return [
    [x0, y0, x4, y4, x7, y7, x9, y9],
    // left
    [x9, y9, x8, y8, x6, y6, x3, y3]
    // right
  ];
}
function flatten(v, flatness, maxRecursion = 32) {
  const minSpan = 1 / maxRecursion;
  const parts = [];
  function computeParts(curve, t1, t2) {
    if (t2 - t1 > minSpan && !isFlatEnough(curve, flatness)) {
      const halves = subdivide(curve, 0.5);
      const tMid = (t1 + t2) / 2;
      computeParts(halves[0], t1, tMid);
      computeParts(halves[1], tMid, t2);
    } else {
      const dx = curve[6] - curve[0];
      const dy = curve[7] - curve[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 0) {
        parts.push(curve);
      }
    }
  }
  computeParts(v, 0, 1);
  return parts;
}
function* walkSvgShapes(svgEl) {
  switch (svgEl.nodeName.toLowerCase()) {
    case "svg":
    case "g":
    case "a":
      for (const child of svgEl.children) {
        yield* walkSvgShapes(child);
      }
      break;
    case "rect":
    case "circle":
    case "ellipse":
    case "path":
    case "line":
    case "polyline":
    case "polygon":
      yield svgEl;
      break;
  }
}
function getStroke(shape) {
  if (!shape)
    return void 0;
  const explicitStroke = shape.getAttribute("stroke") || shape.style.stroke;
  if (explicitStroke) {
    return explicitStroke;
  }
  if (shape === shape.ownerSVGElement || !shape.ownerSVGElement)
    return void 0;
  if (shape.parentNode) {
    return getStroke(shape.parentNode);
  }
  return void 0;
}
function getGroupId(shape) {
  if (!shape)
    return void 0;
  if (shape.id && shape.nodeName.toLowerCase() === "g") {
    return shape.id;
  }
  if (shape.parentNode) {
    return getGroupId(shape.parentNode);
  }
  return void 0;
}
function point(x, y) {
  const pt = [x, y];
  pt.x = x;
  pt.y = y;
  return pt;
}
function ang(ux, uy, vx, vy) {
  return Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy);
}
function flattenSVG(svg, options = {}) {
  const { maxError = 0.1 } = options;
  const svgPoint = svg.createSVGPoint();
  const paths = [];
  for (const shape of walkSvgShapes(svg)) {
    const ctm = shape.getCTM();
    const xf = ctm == null ? ([x, y]) => {
      return point(x, y);
    } : ([x, y]) => {
      svgPoint.x = x;
      svgPoint.y = y;
      const xfd = svgPoint.matrixTransform(ctm);
      return point(xfd.x, xfd.y);
    };
    const pathData = getPathData(shape, { normalize: true });
    let cur = null;
    let closePoint = null;
    for (const cmd of pathData) {
      if (cmd.type === "M") {
        cur = xf(cmd.values);
        closePoint = cur;
        paths.push({
          points: [cur],
          stroke: getStroke(shape),
          groupId: getGroupId(shape)
        });
      } else if (cmd.type === "L") {
        cur = xf(cmd.values);
        paths[paths.length - 1].points.push(cur);
      } else if (cmd.type === "C") {
        const [x1, y1, x2, y2, x3, y3] = cmd.values;
        if (cur === null) {
          throw new Error(`C ${cmd.values} encountered without current point`);
        }
        const [x0, y0] = cur;
        const [tx1, ty1] = xf([x1, y1]);
        const [tx2, ty2] = xf([x2, y2]);
        const [tx3, ty3] = xf([x3, y3]);
        const parts = flatten([x0, y0, tx1, ty1, tx2, ty2, tx3, ty3], maxError);
        for (const part of parts) {
          paths[paths.length - 1].points.push(point(part[6], part[7]));
        }
        cur = point(tx3, ty3);
      } else if (cmd.type === "A") {
        const [rx_, ry_, phi, fA, fS, x, y] = cmd.values;
        const { cos, sin, sqrt, acos, abs, ceil } = Math;
        if (cur === null) {
          throw new Error(`A ${cmd.values} encountered without current point`);
        }
        const mpx = (cur[0] - x) / 2, mpy = (cur[1] - y) / 2;
        const x1_ = cos(phi) * mpx + sin(phi) * mpy, y1_ = -sin(phi) * mpx + cos(phi) * mpy;
        const x1_2 = x1_ * x1_, y1_2 = y1_ * y1_;
        const L = x1_2 / (rx_ * rx_) + y1_2 / (ry_ * ry_);
        const rx = L <= 1 ? sqrt(L) * rx_ : rx_;
        const ry = L <= 1 ? sqrt(L) * ry_ : ry_;
        const rx2 = rx * rx, ry2 = ry * ry;
        let factor = (rx2 * ry2 - rx2 * y1_2 - ry2 * x1_2) / (rx2 * y1_2 + ry2 * x1_2);
        if (abs(factor) < 1e-4)
          factor = 0;
        if (factor < 0)
          throw new Error(`bad arc args ${factor}`);
        const k = (fA === fS ? -1 : 1) * sqrt(factor);
        const cx_ = k * rx * y1_ / ry, cy_ = k * -ry * x1_ / rx;
        const cx2 = cos(phi) * cx_ - sin(phi) * cy_ + (cur[0] + x) / 2, cy = sin(phi) * cx_ + cos(phi) * cy_ + (cur[1] + y) / 2;
        const t1 = ang(1, 0, (x1_ - cx_) / rx, (y1_ - cy_) / ry);
        const dt_ = ang(
          (x1_ - cx_) / rx,
          (y1_ - cy_) / ry,
          (-x1_ - cx_) / rx,
          (-y1_ - cy_) / ry
        ) % (Math.PI * 2);
        const dt = fS === 0 && dt_ > 0 ? dt_ - Math.PI * 2 : fS === 1 && dt_ < 0 ? dt_ + Math.PI * 2 : dt_;
        const n = ceil(abs(dt) / acos(1 - maxError / rx));
        for (let i = 1; i <= n; i++) {
          const theta = t1 + dt * i / n;
          const tx = cos(phi) * rx * cos(theta) - sin(phi) * ry * sin(theta) + cx2;
          const ty = sin(phi) * rx * cos(theta) + cos(phi) * ry * sin(theta) + cy;
          paths[paths.length - 1].points.push(point(tx, ty));
        }
        cur = point(x, y);
      } else if (cmd.type === "Z") {
        if (cur === null) {
          throw new Error(`Z encountered without current point`);
        }
        if (closePoint && (cur[0] !== closePoint[0] || cur[1] !== closePoint[1])) {
          paths[paths.length - 1].points.push(closePoint);
        }
      } else {
        throw Error(`Unexpected path command: "${cmd.type}" ${cmd.values}`);
      }
    }
  }
  return paths;
}
function displace(pts, fn) {
  for (let i = 0; i < pts.length - 1; i++) {
    let [x0, y0] = pts[i];
    let [x1, y1] = pts[i + 1];
    let dx = x1 - x0;
    let dy = y1 - y0;
    let ex = -dy;
    let ey = dx;
    let d = Math.sqrt(dx * dx + dy * dy);
    ex /= d;
    ey /= d;
    let t = i;
    let s = fn(t);
    pts[i][0] += ex * s;
    pts[i][1] += ey * s;
  }
}
function isect_circ_line(cx2, cy, r, x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let fx = x0 - cx2;
  let fy = y0 - cy;
  let a = dx * dx + dy * dy;
  let b = 2 * (fx * dx + fy * dy);
  let c = fx * fx + fy * fy - r * r;
  let discriminant = b * b - 4 * a * c;
  if (discriminant < 0) {
    return null;
  }
  discriminant = Math.sqrt(discriminant);
  let t0 = (-b - discriminant) / (2 * a);
  if (0 <= t0 && t0 <= 1) {
    return t0;
  }
  let t = (-b + discriminant) / (2 * a);
  if (t > 1 || t < 0) {
    return null;
  }
  return t;
}
function resample(polyline2, step) {
  if (polyline2.length < 2) {
    return polyline2.slice();
  }
  polyline2 = polyline2.slice();
  let out = [polyline2[0].slice()];
  let next = null;
  let i = 0;
  while (i < polyline2.length - 1) {
    let a = polyline2[i];
    let b = polyline2[i + 1];
    let dx = b[0] - a[0];
    let dy = b[1] - a[1];
    let d = Math.sqrt(dx * dx + dy * dy);
    if (d == 0) {
      i++;
      continue;
    }
    let n = ~~(d / step);
    let rest = n * step / d;
    let rpx = a[0] * (1 - rest) + b[0] * rest;
    let rpy = a[1] * (1 - rest) + b[1] * rest;
    for (let j = 1; j <= n; j++) {
      let t = j / n;
      let x = a[0] * (1 - t) + rpx * t;
      let y = a[1] * (1 - t) + rpy * t;
      let xy = [x, y];
      for (let k = 2; k < a.length; k++) {
        xy.push(a[k] * (1 - t) + (a[k] * (1 - rest) + b[k] * rest) * t);
      }
      out.push(xy);
    }
    next = null;
    for (let j = i + 2; j < polyline2.length; j++) {
      let b2 = polyline2[j - 1];
      let c = polyline2[j];
      if (b2[0] == c[0] && b2[1] == c[1]) {
        continue;
      }
      let t = isect_circ_line(rpx, rpy, step, b2[0], b2[1], c[0], c[1]);
      if (t == null) {
        continue;
      }
      let q = [b2[0] * (1 - t) + c[0] * t, b2[1] * (1 - t) + c[1] * t];
      for (let k = 2; k < b2.length; k++) {
        q.push(b2[k] * (1 - t) + c[k] * t);
      }
      out.push(q);
      polyline2[j - 1] = q;
      next = j - 1;
      break;
    }
    if (next == null) {
      break;
    }
    i = next;
  }
  if (out.length > 1) {
    let lx = out[out.length - 1][0];
    let ly = out[out.length - 1][1];
    let mx = polyline2[polyline2.length - 1][0];
    let my = polyline2[polyline2.length - 1][1];
    let d = Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2);
    if (d < step * 0.5) {
      out.pop();
    }
  }
  out.push(polyline2[polyline2.length - 1].slice());
  return out;
}
function interpolatePolylines(polylines, t) {
  t = Math.max(t, 0);
  t = Math.min(t, 1);
  let totalLength = 0;
  let lengths = polylines.map((polyline2) => {
    let length = 0;
    for (let i = 1; i < polyline2.length; i++) {
      let dx = polyline2[i][0] - polyline2[i - 1][0];
      let dy = polyline2[i][1] - polyline2[i - 1][1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    totalLength += length;
    return length;
  });
  let targetLength = totalLength * t;
  let accumulatedLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline2 = polylines[i];
      for (let j = 1; j < polyline2.length; j++) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        let segmentLength = Math.sqrt(dx * dx + dy * dy);
        if (targetLength <= accumulatedLength + segmentLength) {
          let segmentT = (targetLength - accumulatedLength) / segmentLength;
          let x = polyline2[j - 1][0] + dx * segmentT;
          let y = polyline2[j - 1][1] + dy * segmentT;
          return [x, y];
        }
        accumulatedLength += segmentLength;
      }
    }
    accumulatedLength += lengths[i];
  }
  let lastPolyline = polylines[polylines.length - 1];
  return lastPolyline[lastPolyline.length - 1];
}
function getAngle(polylines, t) {
  let totalLength = 0;
  let lengths = polylines.map((polyline2) => {
    let length = 0;
    for (let i = 1; i < polyline2.length; i++) {
      let dx2 = polyline2[i][0] - polyline2[i - 1][0];
      let dy2 = polyline2[i][1] - polyline2[i - 1][1];
      length += Math.sqrt(dx2 * dx2 + dy2 * dy2);
    }
    totalLength += length;
    return length;
  });
  let targetLength = totalLength * t;
  let accumulatedLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline2 = polylines[i];
      for (let j = 1; j < polyline2.length; j++) {
        let dx2 = polyline2[j][0] - polyline2[j - 1][0];
        let dy2 = polyline2[j][1] - polyline2[j - 1][1];
        let segmentLength = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (targetLength <= accumulatedLength + segmentLength) {
          let angle2 = Math.atan2(dy2, dx2);
          return angle2 * (180 / Math.PI);
        }
        accumulatedLength += segmentLength;
      }
    }
    accumulatedLength += lengths[i];
  }
  let lastPolyline = polylines[polylines.length - 1];
  let dx = lastPolyline[lastPolyline.length - 1][0] - lastPolyline[lastPolyline.length - 2][0];
  let dy = lastPolyline[lastPolyline.length - 1][1] - lastPolyline[lastPolyline.length - 2][1];
  let angle = Math.atan2(dy, dx);
  return angle * (180 / Math.PI);
}
function getNormal(polylines, t) {
  let totalLength = 0;
  let lengths = polylines.map((polyline2) => {
    let length = 0;
    for (let i = 1; i < polyline2.length; i++) {
      let dx = polyline2[i][0] - polyline2[i - 1][0];
      let dy = polyline2[i][1] - polyline2[i - 1][1];
      length += Math.sqrt(dx * dx + dy * dy);
    }
    totalLength += length;
    return length;
  });
  let targetLength = totalLength * t;
  let accumulatedLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    if (targetLength <= accumulatedLength + lengths[i]) {
      let polyline2 = polylines[i];
      for (let j = 1; j < polyline2.length; j++) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        let segmentLength = Math.sqrt(dx * dx + dy * dy);
        if (targetLength <= accumulatedLength + segmentLength) {
          let magnitude = Math.sqrt(dx * dx + dy * dy);
          let normal = [dy / magnitude, -dx / magnitude];
          return normal;
        }
        accumulatedLength += segmentLength;
      }
    }
    accumulatedLength += lengths[i];
  }
}
function trimPolylines(polylines, t1, t2) {
  t1 = Math.min(1, t1);
  t1 = Math.max(0, t1);
  t2 = Math.min(1, t2);
  t2 = Math.max(0, t2);
  let totalLength = getTotalLength$1(polylines);
  let targetLength1 = totalLength * t1;
  let targetLength2 = totalLength * t2;
  let accumulatedLength = 0;
  let startIndex, endIndex, startPolylineIndex, endPolylineIndex;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1; j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      let segmentLength = Math.sqrt(dx * dx + dy * dy);
      if (!startIndex && accumulatedLength + segmentLength >= targetLength1) {
        startIndex = j;
        startPolylineIndex = i;
      }
      if (!endIndex && accumulatedLength + segmentLength >= targetLength2) {
        endIndex = j;
        endPolylineIndex = i;
        break;
      }
      accumulatedLength += segmentLength;
    }
  }
  polylines.splice(endPolylineIndex + 1);
  polylines[endPolylineIndex].splice(endIndex + 1);
  polylines.splice(0, startPolylineIndex);
  polylines[0].splice(0, startIndex - 1);
}
function getTotalLength$1(polylines) {
  let totalLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1; j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return totalLength;
}
function filterBreakPolylines(polylines, filterFunction, breakFunction) {
  for (let i = polylines.length - 1; i >= 0; i--) {
    for (let j = polylines[i].length - 1; j >= 0; j--) {
      if (filterFunction(i, j, polylines)) {
        polylines[i].splice(j, 1);
      } else if (breakFunction(i, j, polylines)) {
        if (j === 0 || j === polylines[i].length - 1) {
          polylines[i].splice(j, 1);
        } else {
          let polyline1 = polylines[i].slice(0, j);
          let polyline2 = polylines[i].slice(j + 1);
          polylines[i] = polyline1;
          polylines.splice(i + 1, 0, polyline2);
        }
      }
    }
    if (polylines[i].length === 1) {
      polylines.splice(i, 1);
    }
  }
}
function calculateDistance(point1, point2) {
  let dx = point2[0] - point1[0];
  let dy = point2[1] - point1[1];
  return Math.sqrt(dx * dx + dy * dy);
}
function isClosed$1(polyline2, epsilon = 1e-3) {
  let start = polyline2[0];
  let end = polyline2[polyline2.length - 1];
  return Math.abs(start[0] - end[0]) < epsilon && Math.abs(start[1] - end[1]) < epsilon;
}
function mergePolylines(polylines, threshold) {
  let n = polylines.length;
  for (let i = 0; i < n - 1; i++) {
    if (isClosed$1(polylines[i]))
      continue;
    for (let j = i + 1; j < n; j++) {
      if (isClosed$1(polylines[j]))
        continue;
      let d1 = calculateDistance(
        polylines[i][polylines[i].length - 1],
        polylines[j][0]
      );
      if (d1 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j]);
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d2 = calculateDistance(
        polylines[i][polylines[i].length - 1],
        polylines[j][polylines[j].length - 1]
      );
      if (d2 <= threshold) {
        polylines[i] = polylines[i].concat(polylines[j].reverse());
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d3 = calculateDistance(polylines[i][0], polylines[j][0]);
      if (d3 <= threshold) {
        polylines[i] = polylines[j].concat(polylines[i]);
        polylines.splice(j, 1);
        n--;
        j--;
        continue;
      }
      let d4 = calculateDistance(
        polylines[i][0],
        polylines[j][polylines[j].length - 1]
      );
      if (d4 <= threshold) {
        polylines[i] = polylines[j].reverse().concat(polylines[i]);
        polylines.splice(j, 1);
        n--;
        j--;
      }
    }
  }
  return polylines;
}
class Turtle {
  constructor(start = [0, 0]) {
    this.drawing = true;
    this.position = [...start];
    this.angle = 0;
    this.path = [[[...start]]];
  }
  up() {
    if (!this.drawing)
      return this;
    this.drawing = false;
    this.path.push([[...this.position]]);
    return this;
  }
  down() {
    this.drawing = true;
    return this;
  }
  goto([x, y]) {
    const lastPath = this.path.at(-1);
    if (this.drawing) {
      const [lastX, lastY] = this.position;
      const dist = Math.sqrt((x - lastX) ** 2 + (y - lastY) ** 2);
      if (dist < 1e-4)
        return this;
      lastPath.push([x, y]);
    } else {
      if (lastPath.length === 1)
        lastPath[0] = [x, y];
    }
    this.position = [x, y];
    return this;
  }
  forward(distance) {
    const last = this.position;
    const a = this.angle / 180 * Math.PI;
    const x = last[0] + distance * Math.cos(a);
    const y = last[1] + distance * Math.sin(a);
    this.goto([x, y]);
    return this;
  }
  arc(angle, radius) {
    const theta = Math.abs(angle);
    const length = radius * theta / 180 * Math.PI;
    const ogAngle = this.angle;
    const thetaStep = 1;
    const steps = theta / thetaStep;
    const distanceStep = length / steps;
    for (let i = 0; i < steps; i++) {
      if (angle >= 0)
        this.right(thetaStep);
      else
        this.left(thetaStep);
      this.forward(distanceStep);
    }
    this.setAngle(ogAngle - angle);
    return this;
  }
  setAngle(theta) {
    this.angle = theta;
    return this;
  }
  right(theta) {
    this.angle -= theta;
    return this;
  }
  left(theta) {
    this.angle += theta;
    return this;
  }
  translate(to, origin) {
    this.position = translate(this.position, to, origin);
    iteratePath(this, (pt) => translate(pt, to, origin));
    return this;
  }
  rotate(angle, origin) {
    if (!origin)
      origin = this.cc;
    this.position = rotate(this.position, angle, origin);
    iteratePath(this, (pt) => rotate(pt, angle, origin));
    return this;
  }
  scale(factor, origin) {
    if (!origin)
      origin = this.cc;
    this.position = scale(this.position, factor, origin);
    iteratePath(this, (pt) => scale(pt, factor, origin));
    return this;
  }
  displace(fn) {
    this.path.forEach((pl) => displace(pl, fn));
    return this;
  }
  iteratePath(fn) {
    iteratePath(this, fn);
    return this;
  }
  originate() {
    this.translate([0, 0], this.cc);
    return this;
  }
  fromSVG(svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "image/svg+xml");
    const svg = doc.querySelector("svg");
    const pls = flattenSVG(svg, { maxError: 1e-3 });
    pls.forEach((pl) => {
      this.up();
      pl.points.forEach((pt, i) => {
        this.goto([pt[0], pt[1]]);
        if (i === 0)
          this.down();
      });
    });
    return this;
  }
  join(...turtles) {
    turtles.forEach((t) => {
      this.path.push(...t.path);
    });
    return this;
  }
  merge(threshold = 0.01) {
    this.path = mergePolylines(this.path, threshold);
    return this;
  }
  copy() {
    const newPath = JSON.parse(JSON.stringify(this.path));
    const t = new Turtle();
    t.path = newPath;
    return t;
  }
  resample(resolution) {
    this.path.forEach((pl) => {
      const newPl = resample(pl, resolution);
      while (pl.length > 0)
        pl.pop();
      while (newPl.length > 0) {
        pl.push(newPl.shift());
      }
    });
    return this;
  }
  interpolate(t) {
    return interpolatePolylines(this.path, t);
  }
  getAngle(t) {
    return getAngle(this.path, t);
  }
  getNormal(t) {
    return getNormal(this.path, t);
  }
  trim(t0, t1) {
    trimPolylines(this.path, t0, t1);
    return this;
  }
  warp(fn, baseAngle = null) {
    if (fn instanceof Turtle) {
      const ogTurtle = fn;
      fn = (t) => ogTurtle.interpolate(t)[1];
    }
    const tValues = tValuesForPoints(this.path);
    const newPts = [];
    tValues.forEach((t, i) => {
      const pt = this.path.flat()[i];
      let angle = baseAngle ?? this.getAngle(t);
      if (typeof angle === "function") {
        angle = angle(this.getAngle(t));
      } else if (typeof angle === "number") {
        angle = angle;
      }
      const y = fn(t);
      const newPoint = rotate([0, y], angle);
      newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
    });
    this.path.flat().forEach((pt, i, arr) => {
      pt[0] = newPts[i][0];
      pt[1] = newPts[i][1];
    });
    return this;
  }
  extrema() {
    return extrema(this.path.flat());
  }
  get width() {
    const { xMin, xMax } = this.extrema();
    return xMax - xMin;
  }
  get height() {
    const { yMin, yMax } = this.extrema();
    return yMax - yMin;
  }
  get length() {
    return getTotalLength(this.path);
  }
  get start() {
    if (!this.path.at(0))
      throw new Error("Path is empty, so there is no start point");
    const pt = this.path.at(0).at(0);
    return [pt[0], pt[1]];
  }
  get end() {
    if (!this.path.at(-1))
      throw new Error("Path is empty, so there is no end point");
    const pt = this.path.at(-1).at(-1);
    return [pt[0], pt[1]];
  }
  get lt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, yMax];
  }
  get lc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, (yMax + yMin) / 2];
  }
  get lb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMin, yMin];
  }
  get ct() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, yMax];
  }
  get cc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, (yMax + yMin) / 2];
  }
  get cb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [(xMax + xMin) / 2, yMin];
  }
  get rt() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, yMax];
  }
  get rc() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, (yMax + yMin) / 2];
  }
  get rb() {
    const { xMin, xMax, yMin, yMax } = this.extrema();
    return [xMax, yMin];
  }
}
function iteratePath(turtle, fn) {
  const path2 = turtle.path;
  const toRemove = /* @__PURE__ */ new Set();
  const toBreak = /* @__PURE__ */ new Set();
  const tValues = tValuesForPoints(path2);
  let ptIndex = 0;
  let newPts = {};
  for (let i = 0; i < path2.length; i++) {
    for (let j = 0; j < path2[i].length; j++) {
      const pt = path2[i][j];
      const newPt = fn(pt, tValues[ptIndex]);
      if (newPt === "BREAK") {
        toBreak.add(`${i},${j}`);
      } else if (newPt === "REMOVE") {
        toRemove.add(`${i},${j}`);
      } else if (Array.isArray(newPt)) {
        newPts[ptIndex] = newPt;
      }
      ptIndex++;
    }
  }
  path2.flat().forEach((pt, i) => {
    if (i in newPts) {
      pt[0] = newPts[i][0];
      pt[1] = newPts[i][1];
    }
  });
  filterBreakPolylines(
    path2,
    (i, j, arr) => toRemove.has(`${i},${j}`),
    (i, j, arr) => toBreak.has(`${i},${j}`)
  );
  turtle.path = path2.filter((pl) => pl.length > 1);
  return turtle;
}
function translate(pt, [x, y], origin = [0, 0]) {
  return [pt[0] + x - origin[0], pt[1] + y - origin[1]];
}
function rotate(pt, angle, origin = [0, 0]) {
  let delta = angle / 180 * Math.PI;
  let hereX = pt[0] - origin[0];
  let hereY = pt[1] - origin[1];
  let newPoint = [
    hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
    hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
  ];
  return newPoint;
}
function scale(pt, factor, origin) {
  if (typeof factor === "number")
    factor = [factor, factor];
  const [xFactor, yFactor] = factor;
  const [x, y] = origin;
  const newPoint = [(pt[0] - x) * xFactor + x, (pt[1] - y) * yFactor + y];
  return newPoint;
}
function extrema(pts) {
  let xMin = Number.POSITIVE_INFINITY;
  let xMax = Number.NEGATIVE_INFINITY;
  let yMin = Number.POSITIVE_INFINITY;
  let yMax = Number.NEGATIVE_INFINITY;
  pts.forEach((p) => {
    const [x, y] = p;
    if (xMin > x)
      xMin = x;
    if (xMax < x)
      xMax = x;
    if (yMin > y)
      yMin = y;
    if (yMax < y)
      yMax = y;
  });
  return {
    xMin,
    xMax,
    yMin,
    yMax
  };
}
function tValuesForPoints(polylines) {
  let totalLength = 0;
  let lengths = [];
  let tValues = [0];
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1; j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      let segmentLength = Math.sqrt(dx * dx + dy * dy);
      totalLength += segmentLength;
      lengths.push(segmentLength);
    }
  }
  let accumulatedLength = 0;
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    tValues.push(accumulatedLength / totalLength);
  }
  return tValues;
}
function getTotalLength(polylines) {
  let totalLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 1; j < polyline2.length; j++) {
      let dx = polyline2[j][0] - polyline2[j - 1][0];
      let dy = polyline2[j][1] - polyline2[j - 1][1];
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
  }
  return totalLength;
}
let jsr = 69;
function rand() {
  const max = 4294967295;
  jsr ^= jsr << 17;
  jsr ^= jsr >>> 13;
  jsr ^= jsr << 5;
  return (jsr >>> 0) / max;
}
function setRandSeed(seed) {
  jsr = seed;
}
function randInRange(min, max) {
  return rand() * (max - min) + min;
}
function randIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rand() * (max - min + 1) + min);
}
let PERLIN_YWRAPB = 4;
let PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
let PERLIN_ZWRAPB = 8;
let PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB;
let PERLIN_SIZE = 4095;
let scaled_cosine = function(i) {
  return 0.5 * (1 - Math.cos(i * Math.PI));
};
let perlin;
function noise(vector, options = {}) {
  if (typeof vector === "number")
    vector = [vector, 0, 0];
  let [x, y, z] = vector;
  y = y || 0;
  z = z || 0;
  const perlin_octaves = options?.octaves || 4;
  const perlin_amp_falloff = options?.falloff || 0.5;
  if (perlin == null) {
    perlin = Float64Array.from({ length: PERLIN_SIZE + 1 }, rand);
  }
  if (x < 0) {
    x = -x;
  }
  if (y < 0) {
    y = -y;
  }
  if (z < 0) {
    z = -z;
  }
  let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  let xf = x - xi;
  let yf = y - yi;
  let zf = z - zi;
  let rxf, ryf;
  let r = 0;
  let ampl = 0.5;
  let n1, n2, n3;
  for (let o = 0; o < perlin_octaves; o++) {
    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB);
    rxf = scaled_cosine(xf);
    ryf = scaled_cosine(yf);
    n1 = perlin[of & PERLIN_SIZE];
    n1 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n1);
    n2 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n2 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);
    of += PERLIN_ZWRAP;
    n2 = perlin[of & PERLIN_SIZE];
    n2 += rxf * (perlin[of + 1 & PERLIN_SIZE] - n2);
    n3 = perlin[of + PERLIN_YWRAP & PERLIN_SIZE];
    n3 += rxf * (perlin[of + PERLIN_YWRAP + 1 & PERLIN_SIZE] - n3);
    n2 += ryf * (n3 - n2);
    n1 += scaled_cosine(zf) * (n2 - n1);
    r += n1 * ampl;
    ampl *= perlin_amp_falloff;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    zi <<= 1;
    zf *= 2;
    if (xf >= 1) {
      xi++;
      xf--;
    }
    if (yf >= 1) {
      yi++;
      yf--;
    }
    if (zf >= 1) {
      zi++;
      zf--;
    }
  }
  return r;
}
function calculateBezierPoint(t, p0, p1, p2, p3) {
  let u = 1 - t;
  let tt = t * t;
  let uu = u * u;
  let uuu = uu * u;
  let ttt = tt * t;
  let p = [uuu * p0[0], uuu * p0[1]];
  p[0] += 3 * uu * t * p1[0];
  p[1] += 3 * uu * t * p1[1];
  p[0] += 3 * u * tt * p2[0];
  p[1] += 3 * u * tt * p2[1];
  p[0] += ttt * p3[0];
  p[1] += ttt * p3[1];
  return p;
}
function findTForGivenX(xTarget, p0, p1, p2, p3) {
  let tolerance = 1e-5;
  let t = 0.5;
  let iterations = 0;
  while (iterations < 1e3) {
    let p = calculateBezierPoint(t, p0, p1, p2, p3);
    let difference = p[0] - xTarget;
    if (Math.abs(difference) < tolerance) {
      return t;
    } else {
      t = t - difference / 2;
    }
    iterations++;
  }
  return t;
}
function getYForX(x, p0, p1, p2, p3) {
  let t = findTForGivenX(x, p0, p1, p2, p3);
  let p = calculateBezierPoint(t, p0, p1, p2, p3);
  return p[1];
}
function bezierEasing(initial, p0, p1, final) {
  return (x) => getYForX(
    x,
    [0, initial],
    [Math.min(Math.max(0, p0[0]), 1), p0[1]],
    [Math.min(Math.max(0, p1[0]), 1), p1[1]],
    [1, final]
  );
}
function isPointInPolyline(point2, polyline2) {
  if (!isClosed(polyline2)) {
    return false;
  }
  let x = point2[0], y = point2[1];
  let inside2 = false;
  for (let i = 0, j = polyline2.length - 1; i < polyline2.length; j = i++) {
    let xi = polyline2[i][0], yi = polyline2[i][1];
    let xj = polyline2[j][0], yj = polyline2[j][1];
    let intersect2 = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect2)
      inside2 = !inside2;
  }
  return inside2;
}
function inside(point2, polyline2) {
  if (!isClosed(polyline2)) {
    return false;
  }
  const x = point2[0], y = point2[1];
  let inside2 = false;
  for (let i = 0, j = polyline2.length - 1; i < polyline2.length; j = i++) {
    const xi = polyline2[i][0], yi = polyline2[i][1];
    const xj = polyline2[j][0], yj = polyline2[j][1];
    const intersect2 = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect2)
      inside2 = !inside2;
  }
  return inside2;
}
function isClosed(polyline2, epsilon = 1e-4) {
  const start = polyline2[0];
  const end = polyline2[polyline2.length - 1];
  return Math.abs(start[0] - end[0]) < epsilon && Math.abs(start[1] - end[1]) < epsilon;
}
const drawingUtils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  bezierEasing,
  inside,
  isPointInPolyline,
  noise,
  rand,
  randInRange,
  randIntInRange,
  setRandSeed
}, Symbol.toStringTag, { value: "Module" }));
let intervals = [];
let timeouts = [];
let loops = [];
const resolvePath = (path2) => path2.split("/").reduce((a, v) => {
  if (v === ".")
    ;
  else if (v === "..") {
    if (a.pop() === void 0)
      throw new Error(`Unable to resolve path: ${path2}`);
  } else
    a.push(v);
  return a;
}, []).join("/");
const isURL = (id) => ["http://", "https://"].find((s) => id.startsWith(s));
async function getBundle() {
  const { code } = getStore();
  const build2 = await rollup({
    input: "/index.js",
    plugins: [
      {
        name: "fs-resolver",
        resolveId(source, importer) {
          if (["./", "../"].find((s) => source.startsWith(s))) {
            if (importer) {
              const s = importer.split("/");
              s.pop();
              importer = s.join("/");
              return resolvePath(importer + "/" + source);
            }
            return resolvePath(source);
          } else if (source.startsWith("/")) {
            if (importer && isURL(importer)) {
              const url = new URL(importer);
              return resolvePath(url.origin + source);
            }
            return resolvePath(source);
          } else if (isURL(source)) {
            return source;
          }
          return { id: source, external: true };
        },
        async load(id) {
          if (isURL(id)) {
            const res = await fetch(id);
            return await res.text();
          } else if (id === "/index.js") {
            return code.content;
          }
          return null;
        }
      }
    ]
  });
  const bundle2 = await build2.generate({
    format: "iife",
    sourcemap: "inline",
    inlineDynamicImports: true
  });
  return bundle2.output[0].code;
}
const getPosFromStackLine = (line2) => {
  const match = line2.match(/:(\d+):(\d+)(?![^\n]*:)/gm);
  if (match) {
    const groups = match[0].match(/:(\d+):(\d+)/);
    if (!groups)
      return;
    return { line: Number(groups[1]) - 2, column: Number(groups[2]) };
  } else
    return;
};
const AsyncFunction = Object.getPrototypeOf(async function() {
}).constructor;
const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const getActualFirstStackLine = (lines) => {
  let i = 0;
  while (!["<anonymous>", "AsyncFunction"].find((e) => lines[i].includes(e)))
    i++;
  return i;
};
function decodeUnicodeBase64(base64) {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}
const getSourceMapConsumer = (code) => {
  const sourcemap = JSON.parse(
    decodeUnicodeBase64(
      code.match(
        /\/\/# sourceMappingURL=data:application\/json;charset=utf-8;base64,([A-Za-z0-9+\/=]+)/
      )[1]
    )
  );
  return new SourceMapConsumer(sourcemap);
};
let bundleState = { value: null };
let bundle = { value: null };
let smc = null;
async function build() {
  try {
    bundle.value = await getBundle();
    bundleState.value = EditorState.create({ doc: bundle.value });
    smc = getSourceMapConsumer(bundle.value);
    return true;
  } catch (caught) {
    if (caught.name !== "RollupError" || !caught.cause)
      throw caught;
    const err = caught.cause;
    if (!err || !err.loc)
      throw err;
    patchStore({
      turtles: [],
      turtlePos: [0, 0],
      error: {
        stack: [
          {
            line: err.loc.line,
            column: err.loc.column
          }
        ],
        code: getStore().code.content,
        name: err.name ?? caught.name,
        message: err.message.replace(/\((\d+):(\d+)(?![^\n]*:)\)/gm, "").trim()
      }
    });
    return false;
  }
}
async function runCode(cached = false) {
  const turtles = [];
  let errorState2 = null;
  if (!cached && !await build())
    return;
  intervals.forEach(clearInterval);
  timeouts.forEach(clearTimeout);
  loops.forEach((_, i) => {
    loops[i] = false;
  });
  const patchedInterval = (callback, time, ...args2) => {
    const interval = window.setInterval(callback, time, ...args2);
    intervals.push(interval);
    return interval;
  };
  const patchedTimeout = (callback, time, ...args2) => {
    const timeout = window.setTimeout(callback, time, ...args2);
    timeouts.push(timeout);
    return timeout;
  };
  const loop = async (fn, minterval = 0) => {
    let n = loops.length;
    loops.push(true);
    while (loops[n]) {
      const date = /* @__PURE__ */ new Date();
      const start = date.getTime();
      await fn();
      const elapsed = date.getTime() - start;
      if (elapsed < minterval)
        await sleep(minterval - elapsed);
    }
  };
  const baseLogger = (type, ...args2) => {
    console[type](...args2);
    const stackLines = new Error().stack.split("\n");
    const mappedPos = getPosFromStackLine(
      stackLines[getActualFirstStackLine(stackLines)]
    );
    const pos = mappedPos && smc.originalPositionFor(mappedPos);
    patchStore({
      console: [
        ...getStore().console,
        {
          type,
          pos,
          time: Number(/* @__PURE__ */ new Date()),
          values: args2
        }
      ]
    });
  };
  const hConsole = {
    log: (...args2) => baseLogger("log", ...args2),
    error: (...args2) => baseLogger("error", ...args2),
    warn: (...args2) => baseLogger("warn", ...args2)
  };
  const customGlobal = {
    setTimeout: patchedTimeout,
    setInterval: patchedInterval,
    loop,
    sleep,
    // drawing functions
    Turtle,
    createTurtle: (pt) => new Turtle(pt),
    console: hConsole,
    ...drawingUtils,
    lerp(start, end, t) {
      return (1 - t) * start + t * end;
    },
    drawTurtles: (...turtlesToDraw) => {
      turtlesToDraw.forEach((t) => turtles.push(t));
    },
    setDocDimensions(w, h2) {
      patchStore({
        docDimensions: {
          width: w,
          height: h2
        }
      });
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
  };
  const names = Object.keys(args);
  const values = Object.values(args);
  let f;
  try {
    f = new AsyncFunction(...names, "await (async " + bundle.value.slice(1));
  } catch (err) {
    debugger;
    throw err;
  }
  patchStore({
    console: []
  });
  try {
    await f(...values);
  } catch (err) {
    const stackLines = err.stack?.split("\n") ?? [];
    let i = stackLines.length === 0 ? 0 : getActualFirstStackLine(stackLines);
    let positions = [];
    while (i < stackLines.length && [
      0,
      1
      /* iife call */
    ].map((n) => stackLines[i + n]).every(
      (l) => l && (l.includes("AsyncFunction") || l.includes("eval at "))
    )) {
      const line2 = stackLines[i];
      const pos = getPosFromStackLine(line2);
      if (!pos)
        break;
      positions.push(pos);
      i++;
    }
    const mapPosition = (position) => {
      const mapped2 = smc.originalPositionFor(position);
      if (mapped2.line === null) {
        console.warn(
          "failed to map source position, incrementing column as workaround"
        );
        return smc.originalPositionFor({
          ...position,
          column: position.column + 1
        });
      }
      return mapped2;
    };
    const mapped = positions.map(mapPosition);
    errorState2 = {
      stack: mapped,
      code: getStore().code.content,
      name: err.name,
      message: err.message
    };
  }
  patchStore({
    turtles,
    turtlePos: turtles.at(-1)?.position ?? [0, 0],
    error: errorState2
  });
}
const manualChangeSinceLiveUpdate = {
  value: true
};
const updateSpanBundlePos = (span, view) => {
  if (!smc || !bundleState.value) {
    span.bundleState = void 0;
    return;
  }
  [span.bundleFrom, span.bundleTo] = rangeToCodePositions(
    span.from,
    span.to,
    view
  ).map((p) => ({ ...p, source: "index.js" })).map((p) => smc.generatedPositionFor(p)).map((p) => codePositionToOffset(p, bundleState.value));
  span.bundleState = new WeakRef(bundleState.value);
};
const createSpan = (from, to, view) => {
  const s = {
    from,
    to
  };
  updateSpanBundlePos(s, view);
  return s;
};
const createUpdate = (span, update) => ({
  span,
  update
});
async function dispatchLiveUpdates(updates, view) {
  const viewTr = view.state.update({
    changes: updates.map((u) => ({
      from: u.span.from,
      to: u.span.to,
      insert: u.update
    }))
  });
  view.dispatch(viewTr);
  updates.forEach((u) => {
    u.span.from = viewTr.changes.mapPos(u.span.from, 1);
    u.span.to = viewTr.changes.mapPos(u.span.to, -1);
  });
  if (manualChangeSinceLiveUpdate.value || !bundleState.value) {
    await build();
    return;
  }
  console.log("attempting live update");
  updates.forEach(
    (u) => u.span.bundleState?.deref() !== bundleState.value && updateSpanBundlePos(u.span, view)
  );
  const bundleTr = bundleState.value.update({
    changes: updates.map((u) => ({
      from: u.span.bundleFrom,
      to: u.span.bundleTo,
      insert: u.update
    }))
  });
  bundleState.value = bundleTr.state;
  updates.forEach((u) => {
    u.span.bundleFrom = bundleTr.changes.mapPos(u.span.bundleFrom, 1);
    u.span.bundleTo = bundleTr.changes.mapPos(u.span.bundleTo, -1);
  });
  bundle.value = bundleState.value.doc.toString();
  manualChangeSinceLiveUpdate.value = false;
}
let isRunning = false;
async function runLiveUpdates() {
  if (!isRunning) {
    isRunning = true;
    runCode(true).then(() => {
      isRunning = false;
    });
  }
}
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2[Theme2["Light"] = 0] = "Light";
  Theme2[Theme2["Dark"] = 1] = "Dark";
  return Theme2;
})(Theme || {});
const getSettingsFromLS = () => typeof window === "undefined" ? {
  theme: 0,
  vimMode: false
} : {
  theme: Number(localStorage.getItem("colorTheme")) ?? window.matchMedia("(prefers-color-scheme: dark)") ? 1 : 0,
  vimMode: localStorage.getItem("vimMode") === "true"
};
const updateBodyTheme = (theme2) => {
  document.body.dataset.theme = Theme[theme2];
};
const settingsStore = createState(getSettingsFromLS());
const [useSettings, , getSettings] = settingsStore;
if (typeof window !== "undefined") {
  updateBodyTheme(getSettings().theme);
}
const [, _patchSettings] = settingsStore;
const patchSettings = (...args) => {
  const oldTheme = getSettings().theme;
  _patchSettings(...args);
  const settings = getSettings();
  if (settings.theme !== oldTheme) {
    updateBodyTheme(settings.theme);
  }
  localStorage.setItem("colorTheme", settings.theme.toString());
  localStorage.setItem("vimMode", settings.vimMode.toString());
};
const getCMThemeExtension = (theme2) => theme2 === Theme.Dark ? basicDark : [];
const themeCompartment = new Compartment();
const themeExtension = () => themeCompartment.of(getCMThemeExtension(getSettings().theme));
function useCMTheme(view) {
  const { theme: theme2 } = useSettings(["theme"]);
  useEffect$1(() => {
    if (!view)
      return;
    view.dispatch({
      effects: themeCompartment.reconfigure(getCMThemeExtension(theme2))
    });
  }, [theme2]);
}
const vimModeCompartment = new Compartment();
const vimModeExtension = () => vimModeCompartment.of(getSettings().vimMode ? vim() : []);
function useVimMode(view) {
  const { vimMode } = useSettings(["vimMode"]);
  useEffect$1(() => {
    if (!view)
      return;
    view.dispatch({
      effects: vimModeCompartment.reconfigure(vimMode ? vim() : [])
    });
  }, [vimMode]);
}
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _dragging, _a;
function numberScrubbers(view) {
  const decos = [];
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter: (cur) => {
        if (nodeIsNumber(cur.node, view)) {
          const deco = Decoration.mark({
            tagName: "span",
            class: "cm-number-scrubber",
            attributes: {
              "data-from": cur.from,
              "data-to": cur.to
            }
          });
          decos.push(deco.range(cur.from, cur.to));
        }
      }
    });
  }
  return Decoration.set(decos);
}
const numberScrubbingPlugin = ViewPlugin.fromClass(
  (_a = class {
    constructor(view) {
      __privateAdd(this, _dragging, false);
      this.num = 0;
      this.sigfigs = 0;
      this.updateSpan = null;
      this.decorations = numberScrubbers(view);
    }
    get dragging() {
      return __privateGet(this, _dragging);
    }
    set dragging(val) {
      const old = __privateGet(this, _dragging);
      __privateSet(this, _dragging, val);
      if (!val && old) {
        runCode();
      }
    }
    update(update) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = numberScrubbers(update.view);
      }
    }
  }, _dragging = /* @__PURE__ */ new WeakMap(), _a),
  {
    decorations: (v) => v.decorations,
    eventHandlers: {
      mousedown(e, view) {
        const target = e.target;
        const ns = target.closest(".cm-number-scrubber");
        if (ns) {
          this.updateSpan = createSpan(
            Number(ns.dataset.from),
            Number(ns.dataset.to),
            view
          );
          this.dragging = true;
          const numStr = view.state.doc.sliceString(this.updateSpan.from, this.updateSpan.to).replaceAll(" ", "");
          this.num = Number(numStr);
          this.sigfigs = numStr.split(".")[1]?.length ?? 0;
        }
      },
      mouseup(e, view) {
        this.dragging = false;
      },
      mousemove(e, view) {
        if (!this.dragging || !this.updateSpan)
          return false;
        if (e.buttons === 0) {
          this.dragging = false;
          return false;
        }
        e.preventDefault();
        e.stopPropagation();
        this.num += this.sigfigs ? e.movementX * 10 ** (-1 * this.sigfigs) : e.movementX;
        const newValue = this.num.toFixed(this.sigfigs);
        dispatchLiveUpdates(
          [createUpdate(this.updateSpan, newValue)],
          view
        ).then(runLiveUpdates);
        return true;
      }
    }
  }
);
const errorTheme = EditorView.baseTheme({
  "& .cm-errorLine": {
    position: "relative"
  },
  "& .cm-errorLine::before": {
    content: '""',
    backgroundColor: "rgba(255, 0, 0, 0.3)",
    position: "absolute",
    inset: 0,
    zIndex: -1,
    borderTopRightRadius: "0.25rem",
    borderBottomRightRadius: "0.25rem"
  },
  "& .cm-errorLine.cm-activeLineGutter::before": {
    zIndex: 1
  }
});
const errorEffect = StateEffect.define({
  map: (val, mapping) => ({
    pos: val.pos === null ? null : mapping.mapPos(val.pos)
  })
});
const errorMarker = new class extends GutterMarker {
  constructor() {
    super(...arguments);
    this.elementClass = "cm-errorLine";
  }
}();
const errorState = StateField.define({
  create() {
    return RangeSet.empty;
  },
  update(set, transaction) {
    set = set.map(transaction.changes);
    for (const e of transaction.effects) {
      if (e.is(errorEffect)) {
        set = e.value.pos === null ? RangeSet.empty : RangeSet.of([errorMarker.range(e.value.pos)]);
      }
    }
    return set;
  }
});
const setErrorPos = (view, pos) => view.dispatch({ effects: errorEffect.of({ pos }) });
const errorIndicatorPlugin = () => [
  errorTheme,
  errorState,
  lineNumberMarkers.from(errorState)
];
function Button(props) {
  return jsx("button", {
    class: cx(styles.button, props.variant === "secondary" ? styles.secondary : props.variant === "accent" ? styles.accent : props.variant === "ghost" ? styles.ghost : "", props.loading ? styles.loading : "", props.icon && styles.icon, props.class ?? ""),
    role: props.role ?? "button",
    type: props.type ?? "button",
    disabled: props.disabled || props.loading,
    onClick: () => props.onClick?.(),
    ...props.icon ? {
      "aria-label": props["aria-label"]
    } : {},
    children: props.children
  });
}
__astro_tag_component__(Button, "@astrojs/preact");
function ThreeDCurveManualIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("path", {
      d: "M15,21a3,3,0,0,1-3,3h-.1a5,5,0,1,0,0,2H12a5,5,0,0,0,5-5ZM7,28a3,3,0,1,1,3-3A3,3,0,0,1,7,28Z"
    }), jsx("rect", {
      x: "15",
      y: "13",
      width: "2",
      height: "6"
    }), jsx("path", {
      d: "M25,2a5,5,0,0,0-4.9,4H20a5,5,0,0,0-5,5h2a3,3,0,0,1,3-3h.1A5,5,0,1,0,25,2Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,25,10Z"
    })]
  });
}
__astro_tag_component__(ThreeDCurveManualIcon, "@astrojs/preact");
function CloseIcon(props) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: jsx("polygon", {
      points: "24 9.4 22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4"
    })
  });
}
__astro_tag_component__(CloseIcon, "@astrojs/preact");
const BezierEditor = jsx("div", {
  children: "test"
});
const makeWidget = (component, eq) => class extends WidgetType {
  constructor(props) {
    super();
    this.props = props;
    this.id = Math.random();
  }
  eq(other) {
    if (eq)
      return eq(this.props, other.props);
    for (const key in this.props) {
      if (this.props[key] !== other.props[key])
        return false;
    }
    return true;
  }
  // override ignoreEvent() {
  // }
  toDOM(view) {
    const container = document.createElement("span");
    console.log("render", this.props.yStart.from, this.id);
    render(h(component, {
      props: this.props,
      view
    }), container);
    return container;
  }
  updateDOM(container, view) {
    console.log("dom update!", this.props.yStart.from, this.id);
    render(h(component, {
      props: this.props,
      view
    }), container);
    return true;
  }
};
const [useOnCloseBezierWidget, dispatchCloseBezierWidget] = createEvent();
const trimZerosFromEnd = (str) => str.replace(/\.?0+$/, "");
const bezierWidget = makeWidget(({
  view,
  props
}) => {
  const [popupSide, setPopupSide] = useState(null);
  const liveUpdateSpans = useMemo(() => Object.values(props).flat().map((node) => createSpan(node.from, node.to, view)), []);
  useEffect$1(() => {
    Object.values(props).flat().forEach((node, i) => {
      liveUpdateSpans[i].from = node.from;
      liveUpdateSpans[i].to = node.to;
    });
  }, [props]);
  useOnCloseBezierWidget(() => {
    setPopupSide(null);
  }, []);
  const bezierOnChange = useCallback((value) => {
    const vf = Object.values(value).flat();
    dispatchLiveUpdates(vf.map((v, i) => createUpdate(liveUpdateSpans[i], trimZerosFromEnd(v.toFixed(3)))), view).then(runLiveUpdates);
  }, []);
  const bezierInitialValue = useMemo(() => {
    const nodeToVal = (n) => Number(view.state.sliceDoc(n.from, n.to));
    return {
      yStart: nodeToVal(props.yStart),
      p0: [nodeToVal(props.p0[0]), nodeToVal(props.p0[1])],
      p1: [nodeToVal(props.p1[0]), nodeToVal(props.p1[1])],
      yEnd: nodeToVal(props.yEnd)
    };
  }, []);
  return jsxs("span", {
    class: styles$1.bezierWidget,
    children: [popupSide !== null && jsx("div", {
      class: styles$1.bezierWidgetPopup,
      style: {
        top: popupSide === 0 ? "0" : "100%"
      },
      children: jsx(BezierEditor, {
        initialValue: bezierInitialValue,
        onChange: bezierOnChange,
        children: jsxs("div", {
          class: styles$1.bezierWidgetHeader,
          children: [jsx("h3", {
            children: "edit bezier"
          }), jsx(Button, {
            variant: "ghost",
            icon: true,
            "aria-label": "close",
            onClick: () => setPopupSide(null),
            children: jsx(CloseIcon, {})
          })]
        })
      })
    }), jsxs("button", {
      class: styles$1.bezierWidgetBtn,
      onClick: (e) => {
        if (popupSide !== null) {
          setPopupSide(null);
          return;
        }
        dispatchCloseBezierWidget(null);
        const buttonRect = e.currentTarget.getBoundingClientRect();
        setPopupSide(
          buttonRect.top > window.innerHeight / 2 ? 0 : 1
          /* Bottom */
        );
      },
      children: [jsx(ThreeDCurveManualIcon, {}), "bezierEasing"]
    })]
  });
}, (a, b) => {
  return a.yStart.from === b.yStart.from && a.p0[0].from === b.p0[0].from && a.p0[1].from === b.p0[1].from && a.p1[0].from === b.p1[0].from && a.p1[1].from === b.p1[1].from && a.yEnd.from === b.yEnd.from;
});
const getNodeChildren = (node) => {
  const c = [];
  if (!node.firstChild)
    return c;
  c.push(node = node.firstChild);
  while (node.nextSibling) {
    c.push(node = node.nextSibling);
  }
  return c;
};
function widgets(view) {
  const decos = [];
  for (const {
    from,
    to
  } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter(cur) {
        if (cur.name !== "CallExpression")
          return;
        let fnVar = cur.node.getChild("VariableName");
        if (fnVar === null)
          fnVar = cur.node.getChild("MemberExpression").getChild("PropertyName");
        if (fnVar === null)
          return;
        const fnName = view.state.doc.sliceString(fnVar.from, fnVar.to);
        if (fnName !== "bezierEasing")
          return;
        const args = getNodeChildren(cur.node.getChild("ArgList")).filter((n) => !["(", ")", ","].includes(n.name));
        const props = {};
        if (args.length !== 4)
          return;
        props.yStart = args[0];
        if (!nodeIsNumber(props.yStart, view))
          return;
        const p0Arr = args[1];
        if (p0Arr.name !== "ArrayExpression")
          return;
        const p0ArrChildren = getNodeChildren(p0Arr);
        if (p0ArrChildren.length !== 5)
          return;
        props.p0 = [p0ArrChildren[1], p0ArrChildren[3]];
        if (props.p0.find((n) => !nodeIsNumber(n, view)))
          return;
        const p1Arr = args[2];
        if (p1Arr.name !== "ArrayExpression")
          return;
        const p1ArrChildren = getNodeChildren(p1Arr);
        if (p1ArrChildren.length !== 5)
          return;
        props.p1 = [p1ArrChildren[1], p1ArrChildren[3]];
        if (props.p1.find((n) => !nodeIsNumber(n, view)))
          return;
        props.yEnd = args[3];
        if (!nodeIsNumber(props.yEnd, view))
          return;
        const deco = Decoration.replace({
          widget: new bezierWidget(props)
        });
        decos.push(deco.range(fnVar.from, fnVar.to));
      }
    });
  }
  return Decoration.set(decos);
}
const widgetsPlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = widgets(view);
  }
  update(update) {
    if (update.docChanged || update.viewportChanged) {
      this.decorations = widgets(update.view);
    }
  }
}, {
  decorations: (v) => v.decorations
});
const autocompleteRemoved = basicSetup.filter((_, i) => ![11, 12].includes(i));
const theme = EditorView.theme({
  ".cm-content": {
    fontFamily: "var(--font-mono)",
    fontSize: "14px"
  }
});
const cmExtensions = [
  autocompleteRemoved,
  javascript(),
  keymap.of([indentWithTab]),
  // TODO: We should put a note about Esc+Tab for accessibility somewhere.
  indentUnit.of("  "),
  theme,
  EditorView.updateListener.of((v) => {
    const { code } = getStore();
    code.cmState = v.state;
    if (v.docChanged) {
      code.content = v.state.doc.toString();
      if (v.transactions.find(
        (t) => t.annotation(Transaction.userEvent) !== void 0
      ))
        manualChangeSinceLiveUpdate.value = true;
      dispatchEditorChange();
    }
  }),
  themeExtension(),
  vimModeExtension(),
  numberScrubbingPlugin,
  errorIndicatorPlugin(),
  widgetsPlugin
];
const createCMState = (content) => EditorState.create({ extensions: cmExtensions, doc: content });
const [useOnJumpTo, dispatchJumpTo] = createEvent();
const viewJumpTo = (pos, view) => {
  const offset = view.state.doc.line(pos.line).from + pos.column;
  view.dispatch({
    selection: {
      anchor: offset,
      head: offset
    },
    effects: EditorView.scrollIntoView(offset, {
      y: "center"
    })
  });
  view.focus();
};
const newState = {
  inst: null,
  connected: false,
  turtles: [],
  turtlePos: null,
  error: null,
  console: [],
  running: false,
  docDimensions: {
    width: 125,
    height: 125
  },
  view: null
};
const defaultProgram = `
// welcome to haxidraw!

const width = 125;
const height = 125;

setDocDimensions(width, height);

const testTurtle = createTurtle();

for (let i = 0; i < 86; i++) {
    testTurtle.forward(i);
    testTurtle.left(91);
}

testTurtle.translate(
  [width/2, height/2], 
  testTurtle.cc
);

drawTurtles(
    testTurtle
);
`.trim();
const makeNewState = (initialContent = defaultProgram) => {
  return {
    code: {
      content: initialContent,
      cmState: createCMState(initialContent)
    },
    ...newState
  };
};
function loadCodeFromString(code) {
  patchStore({
    code: {
      content: code,
      cmState: createCMState(code)
    }
  });
}
const backup$1 = localStorage.getItem("cache");
const [useStore, patchStore, getStore] = createState(
  backup$1 ? makeNewState(backup$1) : makeNewState()
);
const backup = () => {
  const {
    view
  } = getStore();
  const code = view.state.doc.toString();
  localStorage.setItem("cache", code);
};
function AutoBackup() {
  useOnEditorChange(backup, []);
  return null;
}
__astro_tag_component__(AutoBackup, "@astrojs/preact");
function Dialog({
  show,
  className,
  title,
  children,
  actions,
  close
}) {
  const id = useMemo(() => nanoid(), []);
  const keyHandler = useCallback(() => {
    close();
  }, []);
  useEffect$1(() => {
    if (show) {
      window.addEventListener("keydown", keyHandler);
    } else {
      window.removeEventListener("keydown", keyHandler);
    }
    return () => {
      window.removeEventListener("keydown", keyHandler);
    };
  }, [show, keyHandler]);
  return show ? jsx("div", {
    class: cx(styles$2.root, className),
    onKeyDown: (e) => {
      if (e.key === "Escape") {
        close();
      }
    },
    onClickCapture: (e) => {
      if (e.target === e.currentTarget) {
        close();
      }
    },
    children: jsxs("div", {
      role: "dialog",
      "aria-labelledby": id + "-label",
      "aria-describedby": id + "-desc",
      class: styles$2.box,
      children: [jsx("h2", {
        id: id + "-label",
        children: title
      }), jsx("p", {
        id: id + "-desc",
        children
      }), jsx("div", {
        class: styles$2.actions,
        children: actions
      })]
    })
  }) : null;
}
__astro_tag_component__(Dialog, "@astrojs/preact");
function CompatWarning() {
  const [show, setShow] = useState(false);
  useEffect$1(() => {
  }, []);
  return jsx(Dialog, {
    show,
    title: "Incompatible browser",
    actions: jsx(Button, {
      onClick: () => setShow(false),
      children: "Continue"
    }),
    close: () => setShow(false),
    children: "Your browser doesn't seem to support the Web Serial API, which is required for the editor to be able to connect to hardware. You can still use the site to write code, but for full functionality, use Chrome or Edge version 89 or above."
  });
}
__astro_tag_component__(CompatWarning, "@astrojs/preact");
function CenterToFitIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("polygon", {
      points: "8 2 2 2 2 8 4 8 4 4 8 4 8 2"
    }), jsx("polygon", {
      points: "24 2 30 2 30 8 28 8 28 4 24 4 24 2"
    }), jsx("polygon", {
      points: "8 30 2 30 2 24 4 24 4 28 8 28 8 30"
    }), jsx("polygon", {
      points: "24 30 30 30 30 24 28 24 28 28 24 28 24 30"
    }), jsx("path", {
      d: "M24,24H8a2.0023,2.0023,0,0,1-2-2V10A2.0023,2.0023,0,0,1,8,8H24a2.0023,2.0023,0,0,1,2,2V22A2.0023,2.0023,0,0,1,24,24ZM8,10V22H24V10Z"
    })]
  });
}
__astro_tag_component__(CenterToFitIcon, "@astrojs/preact");
function lineclip(points, bbox) {
  let len = points.length, codeA = bitCode(points[0], bbox), part = [], i, a, b, codeB, lastCode;
  const result = [];
  for (i = 1; i < len; i++) {
    a = points[i - 1];
    b = points[i];
    codeB = lastCode = bitCode(b, bbox);
    while (true) {
      if (!(codeA | codeB)) {
        part.push(a);
        if (codeB !== lastCode) {
          part.push(b);
          if (i < len - 1) {
            result.push(part);
            part = [];
          }
        } else if (i === len - 1) {
          part.push(b);
        }
        break;
      } else if (codeA & codeB) {
        break;
      } else if (codeA) {
        a = intersect(a, b, codeA, bbox);
        codeA = bitCode(a, bbox);
      } else {
        b = intersect(a, b, codeB, bbox);
        codeB = bitCode(b, bbox);
      }
    }
    codeA = lastCode;
  }
  if (part.length)
    result.push(part);
  return result;
}
function intersect(a, b, edge, bbox) {
  return edge & 8 ? [a[0] + (b[0] - a[0]) * (bbox[3] - a[1]) / (b[1] - a[1]), bbox[3]] : edge & 4 ? [a[0] + (b[0] - a[0]) * (bbox[1] - a[1]) / (b[1] - a[1]), bbox[1]] : edge & 2 ? [bbox[2], a[1] + (b[1] - a[1]) * (bbox[2] - a[0]) / (b[0] - a[0])] : edge & 1 ? [bbox[0], a[1] + (b[1] - a[1]) * (bbox[0] - a[0]) / (b[0] - a[0])] : null;
}
function bitCode(p, bbox) {
  let code = 0;
  if (p[0] < bbox[0])
    code |= 1;
  else if (p[0] > bbox[2])
    code |= 2;
  if (p[1] < bbox[1])
    code |= 4;
  else if (p[1] > bbox[3])
    code |= 8;
  return code;
}
function trigger(e) {
  return e.composedPath()[0];
}
function matchesTrigger(e, selectorString) {
  return trigger(e).matches(selectorString);
}
function createListener(target) {
  return (eventName, selectorString, event, ops = {}) => {
    target.addEventListener(
      eventName,
      (e) => {
        if (selectorString === "" || matchesTrigger(e, selectorString))
          event(e);
      },
      ops
    );
  };
}
function Preview(props) {
  const {
    turtles,
    docDimensions
  } = useStore(["turtles", "docDimensions"]);
  useEffect$1(init$1, []);
  useEffect$1(() => {
    const canvas = document.querySelector(".main-canvas");
    requestRedraw(canvas);
  }, [turtles, docDimensions]);
  return jsxs("div", {
    class: styles$3.root,
    children: [jsx("canvas", {
      class: `${styles$3.canvas} ${props.className} main-canvas`
    }), jsx("div", {
      class: `${styles$3.mousePosition} mouse-position`
    }), jsx(Button, {
      class: `${styles$3.centerButton} center-view-trigger`,
      variant: "ghost",
      icon: true,
      "aria-label": "center document in view",
      children: jsx(CenterToFitIcon, {})
    })]
  });
}
function init$1() {
  const canvas = document.querySelector(".main-canvas");
  const bodyListener = createListener(document.body);
  const canvasListener = createListener(canvas);
  canvasListener("wheel", "", (e) => {
    e.preventDefault();
    const ZOOM_SPEED = 5e-4;
    const {
      panX,
      panY,
      scale: scale2
    } = panZoomParams;
    const newScale = scale2 + scale2 * (-e.deltaY * ZOOM_SPEED);
    const br = canvas.getBoundingClientRect();
    const fixedPoint = {
      x: e.clientX - br.left,
      y: e.clientY - br.top
    };
    panZoomParams.panX = fixedPoint.x + newScale / scale2 * (panX - fixedPoint.x);
    panZoomParams.panY = fixedPoint.y + newScale / scale2 * (panY - fixedPoint.y);
    panZoomParams.scale = newScale;
    requestRedraw(canvas);
  }, {
    passive: false
  });
  canvasListener("mousemove", "", (e) => {
    const mousePos = document.querySelector(".mouse-position");
    if (mousePos) {
      const {
        panX,
        panY,
        scale: scale2
      } = panZoomParams;
      const br = canvas.getBoundingClientRect();
      let x = e.clientX - br.left;
      x = (x - panX) / scale2;
      let y = e.clientY - br.top;
      y = (y - panY) / scale2;
      const addPadding = (s) => s.startsWith("-") ? s : " " + s;
      mousePos.textContent = `${addPadding(x.toFixed(1))}mm, ${addPadding(y.toFixed(1))}mm`;
    }
    if (e.buttons !== 1)
      return;
    e.preventDefault();
    panZoomParams.panX += e.movementX;
    panZoomParams.panY += e.movementY;
    requestRedraw(canvas);
  });
  bodyListener("click", "", (e) => {
    if (!e.target.closest(".center-view-trigger"))
      return;
    const {
      docDimensions
    } = getStore();
    if (!canvas)
      return;
    const br = canvas.getBoundingClientRect();
    panZoomParams.scale = Math.min((br.width - 20) / docDimensions.width, (br.height - 20) / docDimensions.height);
    panZoomParams.panX = br.width / 2 - docDimensions.width * panZoomParams.scale / 2;
    panZoomParams.panY = br.height / 2 + docDimensions.height * panZoomParams.scale / 2;
    requestRedraw(canvas);
  });
  const resizeObserver = new ResizeObserver((entries) => {
    const {
      width,
      height
    } = entries[0].contentRect;
    dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    setCtxProperties();
    requestRedraw(canvas);
  });
  resizeObserver.observe(canvas);
}
const panZoomParams = {
  panX: 200,
  panY: 200,
  scale: 100
};
let dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
const requestRedraw = (canvas) => {
  requestAnimationFrame(() => {
    _redraw(canvas);
  });
};
let _ctx = null;
const setCtxProperties = () => {
  if (!_ctx)
    return;
  _ctx.lineWidth = 1;
  _ctx.lineJoin = "round";
  _ctx.lineCap = "round";
};
const getCtx = (canvas) => {
  if (!_ctx) {
    _ctx = canvas.getContext("2d");
    setCtxProperties();
  }
  return _ctx;
};
const _redraw = (canvas) => {
  const {
    turtlePos,
    turtles,
    docDimensions: {
      width: docW,
      height: docH
    }
  } = getStore();
  if (!canvas || !turtlePos)
    return;
  const width = canvas.width;
  const height = canvas.height;
  const ctx = getCtx(canvas);
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#3333ee";
  ctx.strokeRect(dpr * panZoomParams.panX, dpr * panZoomParams.panY, dpr * docW * panZoomParams.scale, -dpr * docH * panZoomParams.scale);
  ctx.strokeStyle = "black";
  const {
    panX,
    panY,
    scale: scale2
  } = panZoomParams;
  ctx.beginPath();
  for (const turtle of turtles) {
    for (const polyline2 of turtle.path) {
      const p = polyline2.map(([x, y]) => [dpr * (panX + x * scale2), -(dpr * (-panY + y * scale2))]);
      const paths = lineclip(p, [0, 0, width, height]);
      paths.forEach((p2) => {
        for (let i = 0; i < p2.length; i++) {
          let [x, y] = p2[i];
          if (i === 0)
            ctx.moveTo(x, y);
          else
            ctx.lineTo(x, y);
        }
      });
    }
  }
  ctx.stroke();
};
__astro_tag_component__(Preview, "@astrojs/preact");
function download(filename, text) {
  const blob = new Blob([text], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}`;
  link.click();
  URL.revokeObjectURL(link.href);
}
function PlugIcon(props) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: jsx("path", {
      d: "M22,8H21V2H19V8H13V2H11V8H10a2,2,0,0,0-2,2v6a8.0073,8.0073,0,0,0,7,7.9307V30h2V23.9307A8.0073,8.0073,0,0,0,24,16V10A2,2,0,0,0,22,8Zm0,8a6,6,0,0,1-12,0V10H22Z"
    })
  });
}
__astro_tag_component__(PlugIcon, "@astrojs/preact");
function BrightnessContrastIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("rect", {
      x: "15",
      y: "2",
      width: "2",
      height: "3"
    }), jsx("rect", {
      x: "27",
      y: "15",
      width: "3",
      height: "2"
    }), jsx("rect", {
      x: "15",
      y: "27",
      width: "2",
      height: "3"
    }), jsx("rect", {
      x: "2",
      y: "15",
      width: "3",
      height: "2"
    }), jsx("rect", {
      x: "6.22",
      y: "5.73",
      width: "2",
      height: "3",
      transform: "translate(-3 7.23) rotate(-45)"
    }), jsx("rect", {
      x: "23.27",
      y: "6.23",
      width: "3",
      height: "2",
      transform: "translate(2.14 19.63) rotate(-45)"
    }), jsx("rect", {
      x: "23.77",
      y: "23.27",
      width: "2",
      height: "3",
      transform: "translate(-10.26 24.77) rotate(-45)"
    }), jsx("polygon", {
      points: "5.47 25.13 7.59 23 9 24.42 6.88 26.54 5.47 25.13"
    }), jsx("path", {
      d: "M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,14a6,6,0,0,1,0-12Z"
    })]
  });
}
__astro_tag_component__(BrightnessContrastIcon, "@astrojs/preact");
function SettingsIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("path", {
      d: "M27,16.76c0-.25,0-.5,0-.76s0-.51,0-.77l1.92-1.68A2,2,0,0,0,29.3,11L26.94,7a2,2,0,0,0-1.73-1,2,2,0,0,0-.64.1l-2.43.82a11.35,11.35,0,0,0-1.31-.75l-.51-2.52a2,2,0,0,0-2-1.61H13.64a2,2,0,0,0-2,1.61l-.51,2.52a11.48,11.48,0,0,0-1.32.75L7.43,6.06A2,2,0,0,0,6.79,6,2,2,0,0,0,5.06,7L2.7,11a2,2,0,0,0,.41,2.51L5,15.24c0,.25,0,.5,0,.76s0,.51,0,.77L3.11,18.45A2,2,0,0,0,2.7,21L5.06,25a2,2,0,0,0,1.73,1,2,2,0,0,0,.64-.1l2.43-.82a11.35,11.35,0,0,0,1.31.75l.51,2.52a2,2,0,0,0,2,1.61h4.72a2,2,0,0,0,2-1.61l.51-2.52a11.48,11.48,0,0,0,1.32-.75l2.42.82a2,2,0,0,0,.64.1,2,2,0,0,0,1.73-1L29.3,21a2,2,0,0,0-.41-2.51ZM25.21,24l-3.43-1.16a8.86,8.86,0,0,1-2.71,1.57L18.36,28H13.64l-.71-3.55a9.36,9.36,0,0,1-2.7-1.57L6.79,24,4.43,20l2.72-2.4a8.9,8.9,0,0,1,0-3.13L4.43,12,6.79,8l3.43,1.16a8.86,8.86,0,0,1,2.71-1.57L13.64,4h4.72l.71,3.55a9.36,9.36,0,0,1,2.7,1.57L25.21,8,27.57,12l-2.72,2.4a8.9,8.9,0,0,1,0,3.13L27.57,20Z",
      transform: "translate(0 0)"
    }), jsx("path", {
      d: "M16,22a6,6,0,1,1,6-6A5.94,5.94,0,0,1,16,22Zm0-10a3.91,3.91,0,0,0-4,4,3.91,3.91,0,0,0,4,4,3.91,3.91,0,0,0,4-4A3.91,3.91,0,0,0,16,12Z",
      transform: "translate(0 0)"
    })]
  });
}
__astro_tag_component__(SettingsIcon, "@astrojs/preact");
function KeyboardIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("path", {
      d: "M28,26H4a2,2,0,0,1-2-2V10A2,2,0,0,1,4,8H28a2,2,0,0,1,2,2V24A2,2,0,0,1,28,26ZM4,10V24H28V10Z"
    }), jsx("rect", {
      x: "10",
      y: "20",
      width: "11",
      height: "2"
    }), jsx("rect", {
      x: "6",
      y: "12",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "10",
      y: "12",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "14",
      y: "12",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "18",
      y: "12",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "6",
      y: "20",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "6",
      y: "16",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "10",
      y: "16",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "14",
      y: "16",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "22",
      y: "12",
      width: "4",
      height: "2"
    }), jsx("rect", {
      x: "22",
      y: "16",
      width: "4",
      height: "2"
    }), jsx("rect", {
      x: "18",
      y: "16",
      width: "2",
      height: "2"
    }), jsx("rect", {
      x: "23",
      y: "20",
      width: "3",
      height: "2"
    })]
  });
}
__astro_tag_component__(KeyboardIcon, "@astrojs/preact");
function GitHubIcon(props) {
  return jsx("svg", {
    className: props.className,
    id: "icon",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    children: jsx("path", {
      class: "cls-1",
      d: "M16,2a14,14,0,0,0-4.43,27.28c.7.13,1-.3,1-.67s0-1.21,0-2.38c-3.89.84-4.71-1.88-4.71-1.88A3.71,3.71,0,0,0,6.24,22.3c-1.27-.86.1-.85.1-.85A2.94,2.94,0,0,1,8.48,22.9a3,3,0,0,0,4.08,1.16,2.93,2.93,0,0,1,.88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4,5.4,0,0,1,1.44-3.76,5,5,0,0,1,.14-3.7s1.17-.38,3.85,1.43a13.3,13.3,0,0,1,7,0c2.67-1.81,3.84-1.43,3.84-1.43a5,5,0,0,1,.14,3.7,5.4,5.4,0,0,1,1.44,3.76c0,5.38-3.27,6.56-6.39,6.91a3.33,3.33,0,0,1,.95,2.59c0,1.87,0,3.38,0,3.84s.25.81,1,.67A14,14,0,0,0,16,2Z"
    })
  });
}
__astro_tag_component__(GitHubIcon, "@astrojs/preact");
function Toolbar() {
  const {
    connected
  } = useStore(["connected"]);
  const [hidden, setHidden] = useState(true);
  return jsxs("div", {
    class: styles$4.root,
    children: [jsxs("div", {
      style: {
        "display": "flex",
        "align-items": "center"
      },
      children: [jsx("h1", {
        class: styles$4.heading,
        children: "Blot"
      }), jsx(RunButton, {}), jsx(NewButton, {}), jsx(OpenButton, {}), jsxs("div", {
        style: {
          position: "relative",
          cursor: "default",
          width: "min-width"
        },
        onMouseEnter: () => setHidden(false),
        onMouseLeave: () => setHidden(true),
        children: [jsx("div", {
          style: {
            padding: "5px"
          },
          children: "download"
        }), jsxs("div", {
          style: {
            "display": hidden ? "none" : "",
            "position": "absolute",
            "background": "var(--primary)",
            "z-index": 9999,
            "width": "100%",
            "top": "100%",
            "padding": "5px",
            "border-radius": "5px"
          },
          children: [jsx(DownloadButton, {}), jsx(DownloadSVG, {}), jsx(DownloadPNG, {})]
        })]
      })]
    }), jsxs("div", {
      style: {
        "display": "flex",
        "align-items": "center"
      },
      children: [jsxs(Button, {
        variant: "ghost",
        class: "connect-trigger",
        children: [connected ? "disconnect from" : "connect to", " machine"]
      }), connected && jsx(Button, {
        variant: "ghost",
        class: "run-machine-trigger",
        children: "run machine"
      }), jsx(GitHubLink, {}), jsx(SettingsButton, {})]
    })]
  });
}
function GitHubLink() {
  return jsx(Button, {
    variant: "ghost",
    children: jsx("a", {
      style: {
        all: "unset"
      },
      href: "https://github.com/hackclub/haxidraw/tree/main",
      target: "_blank",
      children: jsx("div", {
        style: {
          transform: "translate(0, 3.5px)"
        },
        children: jsx(GitHubIcon, {
          className: styles$4.icon
        })
      })
    })
  });
}
function RunButton() {
  useEffect$1(() => {
    async function handleKeyDown(e) {
      if (e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        await runCode();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return jsx(Button, {
    variant: "ghost",
    onClick: () => {
      alert(JSON.stringify(getStore().turtles[0]));
      runCode();
    },
    children: "run (shift+enter)"
  });
}
function DownloadButton() {
  const state = useStore();
  return jsx("div", {
    class: styles$4.dropdownEntry,
    onClick: () => download("project.js", state.code.content),
    children: "js"
  });
}
function NewButton() {
  return jsx(Button, {
    variant: "ghost",
    onClick: () => {
      patchStore({
        ...makeNewState()
      });
    },
    children: "new"
  });
}
function DownloadSVG() {
  return jsx("div", {
    class: styles$4.dropdownEntry,
    onClick: () => {
      const {
        turtles,
        docDimensions
      } = getStore();
      const turtleToPathData = (t) => {
        let d = "";
        t.path.forEach((pl) => pl.forEach((pt, i) => {
          const [x, y] = pt;
          if (i === 0)
            d += `M ${x} ${y}`;
          else
            d += `L ${x} ${y}`;
        }));
        return d;
      };
      const turtleToPath = (t) => {
        const d = turtleToPathData(t);
        return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`;
      };
      const paths = turtles.map(turtleToPath);
      const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" width="${docDimensions.width}mm" height="${docDimensions.height}mm">
                    ${paths.join("\n")}
                </svg>
            `;
      download("anon.svg", svg);
    },
    children: "svg"
  });
}
function DownloadPNG() {
  return jsx("div", {
    class: styles$4.dropdownEntry,
    onClick: () => {
      const {
        turtles,
        docDimensions
      } = getStore();
      const turtleToPathData = (t) => {
        let d = "";
        t.path.forEach((pl) => pl.forEach((pt, i) => {
          const [x, y] = pt;
          if (i === 0)
            d += `M ${x} ${y}`;
          else
            d += `L ${x} ${y}`;
        }));
        return d;
      };
      const turtleToPath = (t) => {
        const d = turtleToPathData(t);
        return `<path 
                    d="${d}" 
                    stroke-width="0.25" 
                    stroke="black" 
                    fill="none" 
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style="transform: scale(1, 1);"
                    />`;
      };
      const paths = turtles.map(turtleToPath);
      const svg = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${docDimensions.width} ${docDimensions.height}" width="${docDimensions.width}mm" height="${docDimensions.height}mm">
                    ${paths.join("\n")}
                </svg>
            `;
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        const pngDataUrl = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngDataUrl;
        downloadLink.download = "image.png";
        downloadLink.textContent = "Download PNG";
        downloadLink.click();
      };
      const svgDataUrl = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
      img.src = svgDataUrl;
    },
    children: "png"
  });
}
function OpenButton() {
  return jsx(Button, {
    variant: "ghost",
    onClick: () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".js";
      input.onchange = () => {
        if (input.files?.length) {
          const file = input.files[0];
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === "string") {
              loadCodeFromString(reader.result);
            }
          };
          reader.readAsText(file);
        }
      };
      input.click();
    },
    children: "open"
  });
}
function SettingsButton() {
  const {
    theme: theme2,
    vimMode
  } = useSettings(["theme", "vimMode"]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  useEffect$1(() => {
    if (!dropdownOpen)
      return;
    function handleClick(e) {
      const target = e.target;
      if (!target.closest(`.${styles$4.settingsWrapper}`)) {
        setDropdownOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [dropdownOpen]);
  return jsxs("div", {
    class: styles$4.settingsWrapper,
    children: [jsx(Button, {
      variant: "ghost",
      icon: true,
      "aria-label": "show settings menu",
      "aria-expanded": dropdownOpen,
      onClick: () => {
        setDropdownOpen(!dropdownOpen);
      },
      children: jsx(SettingsIcon, {})
    }), dropdownOpen && jsxs("div", {
      class: styles$4.settingsDropdown,
      children: [jsxs(Button, {
        variant: "ghost",
        onClick: () => {
          patchSettings({
            theme: theme2 === Theme.Dark ? Theme.Light : Theme.Dark
          });
          setDropdownOpen(false);
        },
        children: [jsx(BrightnessContrastIcon, {
          className: styles$4.icon
        }), jsx("span", {
          children: "toggle theme"
        })]
      }), jsxs(Button, {
        variant: "ghost",
        onClick: () => {
          patchSettings({
            vimMode: !vimMode
          });
          setDropdownOpen(false);
        },
        children: [jsx(KeyboardIcon, {
          className: styles$4.icon
        }), jsxs("span", {
          children: [vimMode ? "disable" : "enable", " vim mode"]
        })]
      })]
    })]
  });
}
__astro_tag_component__(Toolbar, "@astrojs/preact");
function JumpLinkIcon(props) {
  return jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: jsx("path", {
      d: "M13.4141,17.5859,18,22.1719V8H8V6H18a2.0024,2.0024,0,0,1,2,2V22.1719l4.5859-4.586L26,19l-7,7-7-7Z"
    })
  });
}
__astro_tag_component__(JumpLinkIcon, "@astrojs/preact");
const Snippet = ({
  pos,
  code,
  message
}) => {
  const view = useRef();
  useCMTheme(view.current);
  const cmRef = useCallback((node) => {
    if (!node)
      return;
    if (node.children[0]) {
      if (node.children[0])
        node.children[0]["view"].destroy();
    }
    const extensions = [syntaxHighlighting(defaultHighlightStyle, {
      fallback: true
    }), javascript(), EditorState.readOnly.of(true), EditorView$1.editable.of(false), EditorView$1.theme({
      ".cm-content": {
        padding: "0"
      },
      ".cm-line": {
        padding: "0"
      },
      ".cm-scroller": {
        fontFamily: "inherit",
        lineHeight: "inherit"
      },
      ".ͼp": {
        backgroundColor: "transparent"
      }
    }), themeExtension()];
    const newView = new EditorView$1({
      doc: code.split("\n")[pos.line - 1],
      parent: node,
      extensions
    });
    node.children[0]["view"] = newView;
    view.current = newView;
  }, [code]);
  useEffect$1(() => {
    if (!view.current)
      return;
    view.current.dispatch({
      changes: {
        from: 0,
        to: view.current.state.doc.length,
        insert: code.split("\n")[pos.line - 1]
      }
    });
  }, [code]);
  const hasContext = pos.line !== 1;
  const lines = code.split("\n");
  const context = hasContext ? lines[pos.line - 2].trimStart() : void 0;
  return jsxs("pre", {
    class: styles$5.snippet,
    children: [jsxs("div", {
      children: [hasContext && jsx("div", {
        children: pos.line - 1
      }), jsx("div", {
        children: pos.line
      })]
    }), jsxs("code", {
      children: [hasContext && jsxs(Fragment, {
        children: [" ".repeat(lines[pos.line - 2].length - context.length), jsx("span", {
          class: styles$5.context,
          children: context
        })]
      }), jsx("div", {
        ref: cmRef,
        class: styles$5.cm
      }), " ".repeat(pos.column), jsx("span", {
        class: styles$5.arrow,
        children: "↑"
      }), message && jsx("span", {
        class: styles$5.message,
        children: message
      })]
    }), jsxs("button", {
      class: styles$5.jumpTo,
      onClick: () => dispatchJumpTo(pos),
      children: [jsx(JumpLinkIcon, {}), "Jump to line"]
    })]
  });
};
function Error$1() {
  const {
    error
  } = useStore(["error"]);
  if (!error)
    return null;
  const l = error.stack?.[0]?.line;
  return jsxs("div", {
    class: styles$5.root,
    children: [jsx("span", {
      class: styles$5.name,
      children: error.name
    }), l !== null && l !== void 0 ? jsx(Snippet, {
      pos: error.stack[0],
      code: error.code,
      message: error.message
    }) : jsxs(Fragment, {
      children: [jsx("span", {
        children: error.message
      }), jsx("span", {
        children: "something went wrong getting the error snippet. report this as a bug on GitHub."
      })]
    }), error.stack.length > 1 && jsxs("details", {
      children: [jsx("summary", {
        class: styles$5.stackLabel,
        children: "stack trace"
      }), jsx("div", {
        class: styles$5.stack,
        children: error.stack.slice(1).map((pos, i) => jsx(Snippet, {
          pos,
          code: error.code,
          message: "in this call"
        }, i))
      })]
    })]
  });
}
__astro_tag_component__(Error$1, "@astrojs/preact");
function TrashCanIcon(props) {
  return jsxs("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 32 32",
    className: props.className,
    children: [jsx("rect", {
      x: "12",
      y: "12",
      width: "2",
      height: "12"
    }), jsx("rect", {
      x: "18",
      y: "12",
      width: "2",
      height: "12"
    }), jsx("path", {
      d: "M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"
    })]
  });
}
__astro_tag_component__(TrashCanIcon, "@astrojs/preact");
function Console() {
  const {
    console: console2
  } = useStore(["console"]);
  const lines = useRef(null);
  useEffect$1(() => {
    if (!lines.current)
      return;
    lines.current.scrollTop = lines.current.scrollHeight;
  }, [console2]);
  if (console2.length === 0)
    return null;
  return jsxs("div", {
    class: styles$6.root,
    children: [jsxs("div", {
      class: styles$6.header,
      children: [jsx("span", {
        children: "console"
      }), jsx(Button, {
        class: styles$6.clearButton,
        variant: "ghost",
        icon: true,
        "aria-label": "clear",
        onClick: () => patchStore({
          console: []
        }),
        children: jsx(TrashCanIcon, {})
      })]
    }), jsx("div", {
      class: styles$6.lines,
      ref: lines,
      children: console2.map(({
        type,
        time,
        values,
        pos
      }, index) => jsxs("div", {
        class: cx(styles$6.line, type === "warn" ? styles$6.tWarn : type === "error" && styles$6.tError),
        children: [jsx("div", {
          class: styles$6.time,
          children: new Date(time).toLocaleTimeString()
        }), jsx("div", {
          class: styles$6.values,
          children: values.map((value, i) => jsx("div", {
            children: typeof value === "string" ? value : JSON.stringify(value)
          }, i))
        }), pos && jsxs("button", {
          class: styles$6.pos,
          onClick: () => {
            dispatchJumpTo(pos);
          },
          children: [":", pos.line, ":", pos.column]
        })]
      }, `${time},${index}`))
    })]
  });
}
__astro_tag_component__(Console, "@astrojs/preact");
function GlobalStateDebugger() {
  const state = useStore();
  useEffect$1(() => {
    globalThis["_globalState"] = state;
  }, [state]);
  return null;
}
__astro_tag_component__(GlobalStateDebugger, "@astrojs/preact");
function DropBox() {
  useEffect$1(() => {
    addDragDrop();
  }, []);
  return jsxs(Fragment, {
    children: [jsx("style", {
      children: `
            .drop {
                position: absolute;
                width: 100%;
                height: 100%;
                background: lightblue;
                opacity: .8;
                align-items: center;
                justify-content: center;
                border: 3px dashed grey;
                left: 0px;
                top: 0px;
                display: flex;
            }

            .hidden {
                display: none;
            }
        `
    }), jsx("div", {
      class: "drop hidden droparea",
      children: "Drop an SVG or JS file."
    })]
  });
}
function addDragDrop() {
  const droparea = document.querySelector(".droparea");
  window.addEventListener("drop", function(evt) {
    const {
      view
    } = getStore();
    let dt = evt.dataTransfer;
    if (dt === null || droparea === null)
      return;
    let files = dt.files;
    droparea.classList.add("hidden");
    const file = files[0];
    const fileName = file.name.split(".");
    fileName[0];
    const extension = fileName[fileName.length - 1];
    var reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = (event) => {
      let text = reader.result;
      if (extension === "js") {
        loadCodeFromString(text);
      } else if (extension === "svg") {
        text = text.replaceAll("\n", "");
        const newLines = `const importedSVG = new Turtle().fromSVG(String.raw\`${text}\`);
`;
        view.dispatch({
          changes: {
            from: 0,
            insert: newLines
          }
        });
      } else {
        throw Error("Unknown extension:" + extension);
      }
    };
    pauseEvent(evt);
  });
  window.addEventListener("dragover", function(evt) {
    droparea.classList.remove("hidden");
    pauseEvent(evt);
  });
  ["mouseout"].forEach((trigger2) => window.addEventListener(trigger2, function(evt) {
    droparea.classList.add("hidden");
  }));
}
function pauseEvent(e) {
  if (e.stopPropagation)
    e.stopPropagation();
  if (e.preventDefault)
    e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}
__astro_tag_component__(DropBox, "@astrojs/preact");
function CodeMirror() {
  const {
    code: codeState,
    error
  } = useStore(["code", "error"]);
  const [view, setView] = useState();
  useEffect$1(() => {
    if (!view)
      return;
    view.setState(codeState.cmState);
  }, [view, codeState]);
  useEffect$1(() => {
    patchStore({
      view
    });
  }, [view]);
  useCMTheme(view);
  useVimMode(view);
  useOnJumpTo((pos) => {
    if (!view)
      return;
    viewJumpTo(pos, view);
  }, [view]);
  useEffect$1(() => {
    if (!view)
      return;
    const line2 = error?.stack[0].line;
    setErrorPos(view, line2 ? view.state.doc.line(line2).from : null);
  }, [error]);
  const editorRef = useCallback((node) => {
    if (!node)
      return;
    const view2 = new EditorView$1({
      parent: node
    });
    node.children[0]["view"] = view2;
    setView(view2);
  }, []);
  return jsx(Fragment, {
    children: jsx("div", {
      class: styles$7.cmWrapper,
      ref: editorRef
    })
  });
}
__astro_tag_component__(CodeMirror, "@astrojs/preact");
async function createWebSerialBuffer(port, baudrate = 115200) {
  const buffer = [];
  await port.open({ baudRate: baudrate });
  let reader = null;
  let writer = null;
  async function stuffBuffer() {
    try {
      while (port.readable) {
        reader = port.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (value) {
            for (let i = 0; i < value.length; i++) {
              buffer.push(value[i]);
            }
          }
          if (done) {
            reader.releaseLock();
            reader = null;
            break;
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
    }
  }
  stuffBuffer();
  async function write(msg) {
    writer = port.writable.getWriter();
    await writer.write(msg);
    writer.releaseLock();
    writer = null;
  }
  return {
    write,
    read: () => buffer.length > 0 ? buffer.shift() : null,
    available: () => buffer.length > 0,
    close: async () => {
      if (reader) {
        reader.releaseLock();
      }
      if (writer) {
        writer.releaseLock();
      }
      await port.close();
      return;
    }
  };
}
function encode(buf) {
  var dest = [0];
  var code_ptr = 0;
  var code = 1;
  function finish(incllast) {
    dest[code_ptr] = code;
    code_ptr = dest.length;
    incllast !== false && dest.push(0);
    code = 1;
  }
  for (var i = 0; i < buf.length; i++) {
    if (buf[i] == 0) {
      finish();
    } else {
      dest.push(buf[i]);
      code += 1;
      if (code == 255) {
        finish();
      }
    }
  }
  finish(false);
  dest.push(0);
  return Uint8Array.from(dest);
}
function decode(buf) {
  var dest = [];
  for (var i = 0; i < buf.length; ) {
    var code = buf[i++];
    for (var j = 1; j < code; j++) {
      dest.push(buf[i++]);
    }
    if (code < 255 && i < buf.length) {
      dest.push(0);
    }
  }
  return Uint8Array.from(dest);
}
const TERMINATOR = 10;
async function createWebSerialPort(rawPort) {
  const buffer = await createWebSerialBuffer(rawPort);
  const msgHandlers = {};
  const msgPromises = {};
  let msgCount = 0;
  setInterval(() => {
    let msg = [];
    while (buffer.available()) {
      const byte = buffer.read();
      msg.push(byte);
      if (byte === TERMINATOR) {
        const data = unpack(msg);
        if (data.msg === "ack") {
          const resolver = msgPromises[data.msgCount];
          resolver(data.payload);
          console.log("resolved", data);
        } else if (data.msg in msgHandlers) {
          msgHandlers[data.msg](data.payload);
          const ackBuffer = pack("ack", new Uint8Array(0), data.msgCount);
          const encodedAck = encode(ackBuffer);
          buffer.write(encodedAck);
        } else {
          const msgString = String.fromCharCode.apply(null, msg);
          console.log("unknown msg:", { msg, msgString });
        }
        msg = [];
      }
    }
  }, 0);
  function on(msg, func) {
    msgHandlers[msg] = func;
  }
  function send(msg, payload) {
    let packedMsg = pack(msg, payload, msgCount);
    packedMsg = encode(packedMsg);
    const promise = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        console.log("No response received for msg:", msgCount);
        resolve();
      }, 5e3);
      msgPromises[msgCount] = () => {
        clearTimeout(timeout);
        resolve();
      };
    });
    console.log("sending", {
      msg,
      payload,
      msgCount,
      packedMsg,
      decoded: decode(packedMsg),
      unpacked: unpack(decode(packedMsg))
    });
    buffer.write(packedMsg);
    msgCount = (msgCount + 1) % 9;
    return promise;
  }
  async function close() {
    await buffer.close();
    return;
  }
  return {
    on,
    send,
    close
  };
}
function pack(msg, payload, msgCount) {
  const buffer = [];
  if (msg.length > 255)
    console.error("msg too long");
  buffer.push(msg.length);
  msg.split("").forEach((char) => buffer.push(char.charCodeAt(0)));
  if (msg.length > 255)
    console.error("payload too long");
  buffer.push(payload.length);
  payload.forEach((byte) => buffer.push(byte));
  buffer.push(msgCount);
  return new Uint8Array(buffer);
}
function unpack(bytes) {
  let i = 0;
  const msgLength = bytes[i++];
  const msgBytes = [];
  while (i < 1 + msgLength) {
    msgBytes.push(bytes[i]);
    i++;
  }
  const payloadLength = bytes[i++];
  const payloadBytes = [];
  while (i < 1 + msgLength + 1 + payloadLength) {
    payloadBytes.push(bytes[i]);
    i++;
  }
  const msgCount = bytes[i++];
  const msgString = String.fromCharCode.apply(null, msgBytes);
  return {
    msg: msgString,
    payload: payloadBytes,
    msgCount
  };
}
function floatsToBytes(arr) {
  var data = new Float32Array(arr);
  var buffer = new ArrayBuffer(data.byteLength);
  new Float32Array(buffer).set(data);
  var byteView = new Uint8Array(buffer);
  return byteView;
}
function intsToBytes(arr) {
  var data = new Uint32Array(arr);
  var buffer = new ArrayBuffer(data.byteLength);
  new Uint32Array(buffer).set(data);
  var byteView = new Uint8Array(buffer);
  return byteView;
}
async function createHaxidraw(rawPort) {
  const port = await createWebSerialPort(rawPort);
  async function goto(x, y) {
    const bytes = floatsToBytes([x, y]);
    await port.send("go", bytes);
  }
  async function servo(angle) {
    const bytes = intsToBytes([angle]);
    await port.send("servo", bytes);
  }
  return {
    port,
    goto,
    // setAccel,
    // setMaxSpeed,
    servo
  };
}
function initMachineControl() {
  let haxidraw;
  const listener = createListener(document.body);
  listener("click", ".connect-trigger", async () => {
    if (!navigator.serial) {
      alert(
        "Your browser doesn't seem to support the Web Serial API,which is required for the Haxidraw editor to connect to the machine.Chrome Version 89 or above is the recommended browser."
      );
    }
    if (!haxidraw) {
      navigator.serial.requestPort({ filters: [] }).then(async (port) => {
        console.log("connecting");
        haxidraw = await createHaxidraw(port);
        console.log(haxidraw);
        patchStore({ connected: true });
      }).catch((e) => {
      });
    } else {
      console.log("disconnecting");
      await haxidraw.port.close();
      haxidraw = null;
      patchStore({ connected: false });
    }
  });
  listener("click", ".run-machine-trigger", () => {
    const { turtles } = getStore();
    const runMachine = () => runMachineHelper(haxidraw, turtles);
    runCode().then(() => {
      if (!haxidraw) {
        console.log("not connected");
        return;
      }
      runMachine();
    });
  });
  async function automaticallyConnect() {
    const ports = await navigator.serial.getPorts();
    ports.forEach(async (port) => {
      const info = port.getInfo();
      if (info.usbVendorId === 11914) {
        haxidraw = await createHaxidraw(port);
        console.log(haxidraw);
        patchStore({ connected: true });
      }
    });
  }
  automaticallyConnect();
}
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function runMachineHelper(haxidraw, turtles) {
  await haxidraw.servo(1e3);
  await delay(200);
  const polylines = turtles.map((x) => x.path).flat();
  for (const polyline2 of polylines) {
    for (let i = 0; i < polyline2.length; i++) {
      const [x, y] = polyline2[i];
      if (i === 0) {
        await haxidraw.servo(1e3);
        await delay(200);
      } else if (i === 1) {
        await haxidraw.servo(1700);
        await delay(100);
      }
      await haxidraw.goto(x, y);
    }
  }
  await haxidraw.servo(1e3);
  await delay(200);
  await haxidraw.goto(0, 0);
}
function init() {
  console.log("init");
  initMachineControl();
}
function Editor() {
  const [width, setWidth] = useState(50);
  useEffect$1(() => {
    init();
    addBarResizing(setWidth);
  }, []);
  return jsxs(Fragment, {
    children: [jsx(AutoBackup, {}), " ", jsx(GlobalStateDebugger, {}), jsxs("div", {
      class: styles$8.root,
      children: [jsx(Toolbar, {}), jsxs("div", {
        class: styles$8.inner,
        children: [jsx("div", {
          style: {
            width: `${width}%`
          },
          children: jsx(CodeMirror, {})
        }), jsx("div", {
          class: `${styles$8.vertBar} resize-trigger`,
          style: {
            left: `${width}%`
          }
        }), jsxs("div", {
          class: styles$8.right,
          style: {
            width: `${100 - width}%`
          },
          children: [jsx(Preview, {}), jsx(Console, {}), jsx(Error$1, {})]
        })]
      })]
    }), jsx(CompatWarning, {}), jsx(DropBox, {})]
  });
}
function addBarResizing(setWidth) {
  const listen = createListener(document.body);
  let clicked = false;
  let bar = null;
  listen("mousedown", ".resize-trigger", (e) => {
    clicked = true;
    bar = e.target;
    if (bar === null)
      return;
    bar.style.width = "8px";
    bar.style.background = "black";
  });
  listen("mousemove", "", (e) => {
    if (clicked) {
      e.preventDefault();
      let percent = e.clientX / window.innerWidth * 100;
      percent = Math.min(percent, 100);
      percent = Math.max(percent, 0);
      setWidth(percent);
    }
  });
  listen("mouseup", "", () => {
    if (bar !== null) {
      bar.style.width = "";
      bar.style.background = "";
    }
    clicked = false;
    bar = null;
  });
  document.addEventListener("mouseleave", () => {
    if (bar !== null) {
      bar.style.width = "";
      bar.style.background = "";
    }
    clicked = false;
    bar = null;
  });
}
__astro_tag_component__(Editor, "@astrojs/preact");
const $$Astro = createAstro("https://editor.haxidraw.hackclub.com");
const $$Editor = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editor;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Haxidraw" }, { "default": ($$result2) => renderTemplate`
  ${maybeRenderHead()}<main>
    ${renderComponent($$result2, "Editor", Editor, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/Editor.tsx", "client:component-export": "default" })}
  </main>
` })}`;
}, "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/editor.astro", void 0);
const $$file = "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/pages/editor.astro";
const $$url = "/editor";
export {
  $$Editor as default,
  $$file as file,
  $$url as url
};
