// import { dispatch } from "../dispatch.js";
import { createListener } from './createListener.js'

const isDigit = ch => /[0-9]/i.test(ch) || ch === '.'

export function addNumberDragging(el, state) {
  const listener = createListener(el)

  let dragged = false
  let num, pos_start, pos_end, sigFigs, usePrecision, selectedText

  let pos_sign = null
  let is_sum = false
  let is_neg = false

  listener('mousedown', '.ͼd', e => {
    const cm = state.codemirror
    console.log(cm)

    const s = cm.state
    const doc = s.doc
    const pos = s.selection.main.head
    const at = doc.lineAt(pos)

    let { from, to, text } = doc.lineAt(pos)
    let start = pos,
      end = pos
    // console.log("start", start, text[start - from - 1], "end", end, text[end - from]);
    while (start > from && isDigit(text[start - from - 1], true)) start--
    while (end < to && isDigit(text[end - from])) end++

    let ch
    if (start > from) {
      let start_sign = start
      while (start_sign > from) {
        start_sign--
        ch = text[start_sign - from]
        if (ch === ' ') {
          continue
        } else if (ch === '+') {
          pos_sign = start_sign
        } else if (ch === '-') {
          pos_sign = start_sign
          is_neg = true
        } else if (['(', '[', ',', '/', '*', ';', '{', '=', ':'].includes(ch)) {
          break
        } else {
          is_sum = true
          break
        }
      }
    }

    selectedText = text.slice(start - from, end - from)

    num = Number(selectedText)

    if (is_neg) {
      num = -num
    }
    dragged = true
    pos_start = start
    pos_end = end
    usePrecision = selectedText.includes('.')
    sigFigs = selectedText.includes('.') ? selectedText.split('.')[1].length : 1
  })

  listener('mousemove', '', e => {
    if (!dragged) return
    const cm = state.codemirror

    let newValue

    let textLength = selectedText.length

    const sign = 0 > e.movementX ? 1 : -1
    // console.log(sign, e.movementX);
    if (usePrecision) {
      let rounded = Math.round(num * 10 ** sigFigs)
      let newNum = rounded + e.movementX
      newNum = Math.round(newNum) / 10 ** sigFigs

      num = newNum
      newValue = `${Math.abs(num).toFixed(sigFigs)}`
    } else {
      num += e.movementX
      newValue = `${Math.abs(num)}`
    }

    if (is_sum) {
      if (pos_sign == null) {
        newValue = (num < 0 ? '-' : '+') + newValue
      }
      cm.dispatch({
        changes: {
          from: pos_start,
          to: pos_start + textLength,
          insert: newValue
        }
      })
      if (pos_sign != null) {
        cm.dispatch({
          changes: {
            from: pos_sign,
            to: pos_sign + 1,
            insert: num < 0 ? '-' : '+'
          }
        })
      }
    } else {
      if (pos_sign != null) {
        if (num < 0) {
          cm.dispatch({
            changes: {
              from: pos_start,
              to: pos_start + textLength,
              insert: newValue
            }
          })
          cm.dispatch({
            changes: {
              from: pos_sign,
              to: pos_sign + 1,
              insert: '-'
            }
          })
        } else {
          cm.dispatch({
            changes: {
              from: pos_sign,
              to: pos_start + textLength,
              insert: newValue
            }
          })
          pos_start = pos_sign
          pos_sign = null
        }
      } else {
        if (num < 0) {
          newValue = '-' + newValue
        }
        cm.dispatch({
          changes: {
            from: pos_start,
            to: pos_start + textLength,
            insert: newValue
          }
        })
      }
    }

    selectedText = newValue

    state.execute()
    pauseEvent(e)
  })

  listener('mouseup', '', e => {
    dragged = false
    pos_sign = null
    is_sum = false
    is_neg = false
  })
}

function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation()
  if (e.preventDefault) e.preventDefault()
  e.cancelBubble = true
  e.returnValue = false
  return false
}
