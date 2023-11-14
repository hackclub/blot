import { ViewPlugin, Decoration } from "@codemirror/view"
import { RangeSetBuilder } from "@codemirror/state"
import { syntaxTree } from "@codemirror/language"
import { nodeIsNumber } from './utils.ts'

// TODO: make this a widget so I can insert stuff into it's dom

const CALLNAME_BUTTONS = [
  "bezierEasing"
]

function decorate(view) {
  let builder = new RangeSetBuilder()

  const seenCall = new Set();

  for (let {from, to} of view.visibleRanges) {
    const tree = syntaxTree(view.state);
    const enter = (cur) => {


      if (nodeIsNumber(cur.node, view)) {
        const deco = Decoration.mark({
          tagName: 'span',
          class: 'hover:outline outline-1 cursor-ew-resize',
          attributes: {
            'data-from': cur.from,
            'data-to': cur.to,
            'data-number-scrubber': ""
          }
        })

        builder.add(cur.from, cur.to, deco);
      }

      if (cur.name == "CallExpression") {

        const fullRange = {
          from: cur.from,
          to: cur.to
        }

        const fullString = view
          .state
          .doc
          .sliceString(fullRange.from, fullRange.to);

        const regex = /^([_$a-zA-Z][_$a-zA-Z0-9]*)\s*\(([\s\S]*?)\)/;

        const match = fullString.match(regex);
        const callname = match ? match[1] : "";
        const argsString = match ? match[2] : "";

        CALLNAME_BUTTONS.forEach(cb => {
          
          if (cb !== callname) return;
          if (argsString.length === "") return;
          if (seenCall.has(fullRange.from)) return;

          seenCall.add(fullRange.from);

          const pathMark = Decoration.mark({ 
            attributes: {
              "data-start-index": fullRange.from,
              "data-end-index": fullRange.to,
              "data-args-string": argsString,
              "data-args-start": fullRange.from + fullString.indexOf("(") + 1,
              "data-args-end": fullRange.from + fullString.indexOf("(") + argsString.length,
              [`data-${callname}`]: ""
            },
            class: `bg-[--primary] text-white rounded px-1 cursor-pointer` 
          });

          builder.add(fullRange.from, fullRange.from+callname.length, pathMark);
        })

      }
    }

    const iterateOps = {
      from, 
      to,
      enter
    }

    tree.iterate(iterateOps);
  }

  return builder.finish()
}

export const widgetButtons = ViewPlugin.fromClass(class {
  constructor(view) {
    this.decorations = decorate(view);
    this.initialized = false;
  }

  update(update) {
    if (update.docChanged || update.viewportChanged || this.initialized === false) {
      this.decorations = decorate(update.view);
      this.initialized = true;
    }
  }
}, {
  decorations: v => v.decorations
})