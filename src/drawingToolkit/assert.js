/*
Type strings:
- number
- point: [x, y]
- polyline: point[]
- polylines: polyline[]
- numberArray: [x, y, z]
- function
- boolean
- undefined
- string

You can append a "?" to any type to make it optional,
but optional arguments must be at the end of your type
list. An array of strings allows for multiple types.

special:
- any (function accepts any type) (use this for options
  objects)
- unknown (function given unexpected type)
- emptyArray (function given an empty array, which
  satisfies both polyline and polylines)
*/
function getType(value) {
  if (typeof value === "number") return "number";
  if (Array.isArray(value)) {
    if (value.length === 0) return "emptyArray";
    if (value.length === 2 && value.every(v => typeof v === "number")) return "point";

    // Check that the contents of the array match the types specified
    const checkArray = (arr, types) => {
      if (arr.length <= 10) {
        // Check every value
        return arr.every(v => types.includes(getType(v)));
      } else {
        // First, last, and spot check, for efficiency
        return (
          types.includes(getType(arr[0])) &&
          types.includes(getType(arr[arr.length - 1])) &&
          types.includes(getType(arr[Math.floor(arr.length / 2)]))
        );
      }
    }
    if (checkArray(value, ["point"])) return "polyline";
    if (checkArray(value, ["polyline", "emptyArray"])) return "polylines";
    if (checkArray(value, ["number"])) return "numberArray";
  }
  if (typeof value === "function") return "function";
  if (typeof value === "boolean") return "boolean";
  if (value === undefined) return "undefined";
  if (typeof value === "string") return "string";
  return "unknown";
}

const typeStrings = {
  number: "a number",
  point: "a point",
  polyline: "a single polyline",
  polylines: "an array of polylines",
  emptyArray: "an empty array",
  numberArray: "an array of numbers",
  function: "a function",
  boolean: "a boolean",
  undefined: "undefined",
  unknown: "an unknown type",
  string: "a string",
  any: "any type"
}
function getTypeString(type) {
  if (typeof type === "string" && type.endsWith("?")) {
    return `${getTypeString(type.replace(/\?$/, ""))} (optional)`;
  }
  if (Array.isArray(type)) {
    return type.map(getTypeString).join(" or ");
  }
  if (type in typeStrings) {
    return typeStrings[type];
  }
  console.warn(`No name for type ${type}`);
  return String(type);
}

function typeMatches(type, expected) {
  if (Array.isArray(expected)) {
    return expected.some(t => typeMatches(type, t));
  }
  if (expected.endsWith("?") && type === "undefined") return true;

  const expectedType = expected.replace(/\?$/, "");
  if (expectedType === "any") return true;
  if (
    type === "emptyArray" &&
    ["polyline", "polylines"].includes(expectedType)
  ) return true;
  if (
    type === "point" &&
    expectedType === "numberArray"
  ) return true;

  return type === expectedType;
}

/**
 * @typedef {'number' | 'point' | 'polyline' | 'polylines' | 'numberArray' | 'function' | 'boolean' | 'undefined' | 'string' | 'any'} ExpectedTypeString
 * @typedef {ExpectedTypeString | ExpectedTypeString[]} ExpectedType
 * 
 * @param {any[]} args
 * @param {ExpectedType[]} expected
 * @param {string} name
 */
export function assertArgs(args, expected, name) {
  const maxExpectedCount = expected.length;
  const minExpectedCount = expected.filter(e => (
    !(typeof e === "string" && e.endsWith("?"))
  )).length;

  if (
    args.length < minExpectedCount || args.length > maxExpectedCount
  ) {
    const expectedCountString = minExpectedCount === maxExpectedCount
      ? `${minExpectedCount} argument${minExpectedCount !== 1 ? "s" : ""}`
      : `${minExpectedCount} to ${maxExpectedCount} arguments`;
    throw new Error(`${name} expects ${expectedCountString}, but got ${args.length}`)
  }

  for (let i = 0; i < expected.length; i++) {
    const arg = args[i];
    const expectedType = expected[i];
    const argType = getType(arg);
    const matches = typeMatches(argType, expectedType);
    if (!matches) {
      console.warn(`Expected type ${expectedType}, but got ${argType}`);
      throw new Error(
        `${name} expects argument ${i + 1} to be ${getTypeString(expectedType)}, but got ${getTypeString(argType)}`
      );
    }
  }
}
