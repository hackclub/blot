export function getPosFromErr(err) {
  try {
    const match = err.stack.match(/<anonymous>:(\d+):(\d+)/);

    const pos = { line: Number(match[1]), column: Number(match[2]) }

    pos.line -= 2; // why?

    // to account for "use strict\n"
    pos.line -= 1
    pos.column -= 1

    return pos
  } catch (e) {
    // An error in the error handler?!
    // that's embarassing.
    console.log('Unable to catch error position:', e)
    return { line: 0, column: 0 }
  }
}
