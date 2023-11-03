import { EditorView, GutterMarker, lineNumberMarkers } from '@codemirror/view'
import { RangeSet, StateEffect, StateField } from '@codemirror/state'

const errorTheme = EditorView.baseTheme({
  '& .cm-errorLine': {
    position: 'relative'
  },
  '& .cm-errorLink::before': {
    content: '""',
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    borderTopRightRadius: '0.25rem',
    borderBottomRightRadius: '0.25rem'
  },
  '& .cm-errorLine.cm-activeLineGutter::before': {
    zIndex: 1
  }
})

const errorEffect = StateEffect.define<{ pos: number | null }>({
  map: (val, mapping) => ({
    pos: val.pos === null ? null : mapping.mapPos(val.pos)
  })
})

const errorMarker = new (class extends GutterMarker {
  elementClass = 'cm-errorLine'
})()

const errorState = StateField.define<RangeSet<GutterMarker>>({
  create() {
    return RangeSet.empty
  },
  update(set, transaction) {
    set = set.map(transaction.changes)
    for (const e of transaction.effects) {
      if (e.is(errorEffect)) {
        set =
          e.value.pos === null
            ? RangeSet.empty
            : RangeSet.of([errorMarker.range(e.value.pos)])
      }
    }
    return set
  }
})

export const setErrorPos = (view: EditorView, pos: number | null) =>
  view.dispatch({ effects: errorEffect.of({ pos }) })

export const errorIndicatorPlugin = () => [
  errorTheme,
  errorState,
  lineNumberMarkers.from(errorState)
]
