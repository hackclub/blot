function trigger(e) {
  return e.composedPath()[0]
}

function matchesTrigger(e, selectorString) {
  return trigger(e).matches(selectorString)
}

// create on listener
export function createListener(target) {
  return (eventName, selectorString, event, ops = {}) => {
    // focus doesn't work with this, focus doesn't bubble, need focusin
    target.addEventListener(
      eventName,
      e => {
        if (selectorString === '' || matchesTrigger(e, selectorString)) event(e)
      },
      ops
    )
  }
}
