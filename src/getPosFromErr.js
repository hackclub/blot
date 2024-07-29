Error.stackTraceLimit = Infinity;
Error.prepareStackTrace = (_err, stack) => stack;

// Error.stack is an unstandardized string, so we use
// a regex based on the format of the stack trace, as
// seen in the source code of the JavaScript engines
// SpiderMonkey (Firefox): https://searchfox.org/mozilla-central/rev/87630817796aae3cbceb369a1b642da3e4741745/js/src/vm/SavedStacks.cpp#1007-1022
// JavaScriptCore (Safari): https://github.com/WebKit/WebKit/blob/f087a1892ee65f63fc511d500f59c8ecd31b7e0b/Source/JavaScriptCore/runtime/StackFrame.cpp#L152-L164

const frameRegex = /^ *(?:(?<async>.*?)\*)?(?<func>.*?)@(?<source>.*?)(?::(?<line>\d+):(?<column>\d+))?$/

export const traceFormat = (function () {
  const stack = (0, eval)('new Error()').stack

  if (Array.isArray(stack)) {
    return 'V8'
  }

  const matches = stack.trim().split('\n').map(l => l.match(frameRegex))
  if (!matches.every(m => m)) {
    console.error("Unable to parse this browser's stack trace:", stack)
    return 'unknown'
  }
  
  const topHasLineNumber = matches[0].groups.line !== undefined
  if (topHasLineNumber) {
    return 'SpiderMonkey'
  } else {
    return 'JavaScriptCore'
  }
})()

export function getPosFromErr(err) {
  try {
    if (!(err instanceof Error)) {
      // Cannot get the position from a non-error
      return { line: 0, column: 0 }
    }

    const stack = err.stack

    if (Array.isArray(stack)) {
      // V8 (Chrome)-specific internal stack representation
      // https://v8.dev/docs/stack-trace-api
      // Frames with isEval() are within user code, the
      // topmost one is the error location
      const frame = stack.find(f => f.isEval())
      console.log(frame, frame.getLineNumber(), frame.getColumnNumber())
      return { line: frame.getLineNumber() - 3, column: frame.getColumnNumber() - 1 }
    }

    const lines = stack.trim().split('\n')

    const frameMatches = lines.map(l => l.match(frameRegex))
    if (frameMatches.every(m => m)) {
      // The regex matched all lines, so it is probably correct

      // This frame is the one constructed by us, an AsyncFunction
      // always has the name of "anonymous" and our hack for Safari
      // uses a function named "__blotUserCodeFunction"
      const ourFrame = frameMatches.findLast(m => (
        // SpiderMonkey
        (m.groups.func === 'anonymous' && m.groups.source.endsWith(' > AsyncFunction')) ||
        // JavaScriptCore
        (m.groups.func === '__blotUserCodeFunction' && m.groups.source.startsWith('data:'))
      ))

      if (!ourFrame) {
        // No frame that we recognize
        return { line: 0, column: 0 }
      }

      // All frames with the same source are part of the user's code
      const entry = frameMatches.find(m => m.groups.source === ourFrame.groups.source)

      // Used the importScripts trick, so we need to offset the line differently
      const usedImportScripts = ourFrame.groups.func === '__blotUserCodeFunction'

      return {
        line: Number(entry.groups.line) - (usedImportScripts ? 2 : 3),
        column: Number(entry.groups.column) - 1
      }
    }

    console.error('Unable to parse stack trace:', stack)
    return { line: 0, column: 0 }
  } catch (e) {
    // An error in the error handler?!
    // that's embarassing.
    console.log('Unable to catch error position:', e)
    return { line: 0, column: 0 }
  }
}
