import {
  Decoration,
  DecorationSet,
  EditorView,
  ViewPlugin,
  ViewUpdate,
  WidgetType
} from '@codemirror/view'
import type { Range } from '@codemirror/state'
import { h, type ComponentType, render } from 'preact'
import { syntaxTree } from '@codemirror/language'
import type { SyntaxNode, TreeCursor } from '@lezer/common'
import styles from './widgets.module.css'
import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import { createEvent } from 'niue'
import { nodeIsNumber } from './utils.js'
import Button from '../../ui/Button.js'
import type { LiveUpdateSpan } from './liveUpdate.js'
import {
  createSpan,
  createUpdate,
  dispatchLiveUpdates,
  runLiveUpdates
} from './liveUpdate.js'

import ThreeDCurveManualIcon from '../../ui/ThreeDCurveManualIcon.tsx'
import CloseIcon from '../../ui/CloseIcon.tsx'

// import BezierEditor, { BezierPoints } from "../../components/BezierEditor.tsx";


// const bezStyle = css`
//     .bez-ctrl {
//       background: white;
//       transform: scale(1, -1);
//       border: 1px solid black;
//       border-radius: 3px;
//     }

// `

const drawGrid = ({ xMin, xMax, xStep, yMin, yMax, yStep }) => {
  const xLines = [];
  for (let i = xMin; i <= xMax; i += xStep) {
    xLines.push(<line x1={i} y1={yMin} x2={i} y2={yMax} />)
  }

  const yLines = [];
  for (let i = yMin; i <= yMax; i += yStep) {
    yLines.push(<line x1={xMin} y1={i} x2={xMax} y2={i} />)
  }


  return <>
    <g stroke="lightgray" stroke-width="0.005">
      {xLines}
    </g>

    <g stroke="lightgray" stroke-width="0.005">
      {yLines}
    </g>

  </>
}

type BezierPoints = any;
const BezierEditor = ({ initialValue, onChange }) => {
    console.log(initialValue, onChange);

    const { 
        yStart, 
        p0, 
        p1, 
        yEnd 
    } = initialValue;

    const [ p0x, p0y ] = p0;
    const [ p1x, p1y ] = p1;


    return (
    <div>

      <div 
          style="
              display: flex; 
              align-items: center; 
              justify-content: center; 
              flex-direction: column; 
              flex-direction:column;
              background: lightgrey;
              border: 2px solid black;
              border-radius: 5px;
              padding: 5px;">
            <svg 
                style="
                    background: white;
                    transform: scale(1, -1);
                    border: 1px solid black;
                    border-radius: 3px;
                "
                class="bez-ctrl" width="250" height="250" viewBox="0.05 -1.05 1.1 2.1" xmlns="http://www.w3.org/2000/svg">
                {drawGrid({
                  xMin: 0,
                  xMax: 1,
                  xStep: 0.1,
                  yMin: -1,
                  yMax: 1,
                  yStep: 0.1,
                })}
                <path d={`M0,${yStart} C ${p0x},${p0y} ${p1x},${p1y} 1,${yEnd}`} stroke-width=".05px" stroke="black" fill="none"/>
                <line x1="0" y1={`${yStart}`} x2={`${p0x}`} y2={`${p0y}`} stroke="black" stroke-width="0.01" stroke-dasharray="0.02,0.02" />
                <line x1="1" y1={`${yEnd}`} x2={`${p1x}`} y2={`${p1y}`} stroke="black" stroke-width="0.01" stroke-dasharray="0.02,0.02" />

                <circle class="bez-handle" cx="0" cy={`${yStart}`} r=".05" fill="red"/>
                <circle class="bez-handle" cx={`${p0x}`} cy={`${p0y}`} r=".05" fill="red"/>
                <circle class="bez-handle"  cx={`${p1x}`} cy={`${p1y}`} r=".05" fill="red"/>
                <circle class="bez-handle"  cx="1" cy={`${yEnd}`} r=".05" fill="red"/>
            </svg>

            start: {yStart.toFixed(2)},
            handle0: [{p0x.toFixed(1)},{p0y.toFixed(1)}],
            handle1: [{p1x.toFixed(1)},{p1y.toFixed(1)}],
            end: {yEnd.toFixed(2)}
            <div>scale: x</div>
            <input type="range" min="0" max="20" step="0.01"/>
        </div>
    </div>
    )
}

const makeWidget = <T extends {}>(
  component: ComponentType<{ view: EditorView; props: T }>,
  eq?: (a: T, b: T) => boolean
) =>
  class extends WidgetType {
    props: T
    id: number

    constructor(props: T) {
      super()
      this.props = props
      this.id = Math.random()
    }

    override eq(other: this) {
      if (eq) return eq(this.props, other.props)

      for (const key in this.props) {
        if (this.props[key] !== other.props[key]) return false
      }
      return true
    }

    // override ignoreEvent() {
    // }

    toDOM(view: EditorView): HTMLElement {
      const container = document.createElement('span')
      console.log(
        'render',
        (this.props as unknown as BezierProps).yStart.from,
        this.id
      )
      render(h(component, { props: this.props, view }), container)
      return container
    }

    override updateDOM(container: HTMLElement, view: EditorView) {
      console.log(
        'dom update!',
        (this.props as unknown as BezierProps).yStart.from,
        this.id
      )
      render(h(component, { props: this.props, view }), container)
      return true
    }
  }

type DocRange = {
  from: number
  to: number
}
type BezierProps = {
  yStart: DocRange
  p0: [DocRange, DocRange]
  p1: [DocRange, DocRange]
  yEnd: DocRange
}

enum PopupSide {
  Top,
  Bottom
}

const [useOnCloseBezierWidget, dispatchCloseBezierWidget] = createEvent<null>()

const trimZerosFromEnd = (str: string) => str.replace(/\.?0+$/, '')

const bezierWidget = makeWidget<BezierProps>(
  ({ view, props }) => {
    const [popupSide, setPopupSide] = useState<PopupSide | null>(null)
    const liveUpdateSpans = useMemo<LiveUpdateSpan[]>(
      () =>
        Object.values(props)
          .flat()
          .map(node => createSpan(node.from, node.to, view)),
      []
    )

    useEffect(() => {
      // just update the to/from props of the span - on rebuild the spans will be invalidated
      Object.values(props)
        .flat()
        .forEach((node, i) => {
          liveUpdateSpans[i].from = node.from
          liveUpdateSpans[i].to = node.to
        })
    }, [props])

    useOnCloseBezierWidget(() => {
      setPopupSide(null)
    }, [])

    const bezierOnChange = useCallback((value: BezierPoints) => {
      const vf = Object.values(value).flat()
      dispatchLiveUpdates(
        vf.map((v, i) =>
          createUpdate(liveUpdateSpans[i], trimZerosFromEnd(v.toFixed(3)))
        ),
        view
      ).then(runLiveUpdates)
    }, [])

    const bezierInitialValue = useMemo<BezierPoints>(() => {
      const nodeToVal = (n: SyntaxNode) =>
        Number(view.state.sliceDoc(n.from, n.to))
      return {
        yStart: nodeToVal(props.yStart),
        p0: [nodeToVal(props.p0[0]), nodeToVal(props.p0[1])],
        p1: [nodeToVal(props.p1[0]), nodeToVal(props.p1[1])],
        yEnd: nodeToVal(props.yEnd)
      }
    }, [])

    return (
        <span class={styles.bezierWidget}>
            {popupSide !== null && (
                <div class={styles.bezierWidgetPopup} style={{
                    top: popupSide === PopupSide.Top ? "0" : "100%",
                }}>
                    <BezierEditor initialValue={bezierInitialValue} onChange={bezierOnChange}></BezierEditor>
                </div>
            )}
            <button
              class={styles.bezierWidgetBtn}
              onClick={e => {
                if (popupSide !== null) {
                  setPopupSide(null)
                  return
                }
                dispatchCloseBezierWidget(null) // close all bezier widgets that are open
                // position the popup above the button if button is below the middle of the screen and vice versa
                const buttonRect = e.currentTarget.getBoundingClientRect()
                setPopupSide(
                  buttonRect.top > window.innerHeight / 2
                    ? PopupSide.Top
                    : PopupSide.Bottom
                )
              }}>
              <ThreeDCurveManualIcon />
              bezierEasing
            </button>
      </span>
    )
  },
  (a, b) => {
    return (
      a.yStart.from === b.yStart.from &&
      a.p0[0].from === b.p0[0].from &&
      a.p0[1].from === b.p0[1].from &&
      a.p1[0].from === b.p1[0].from &&
      a.p1[1].from === b.p1[1].from &&
      a.yEnd.from === b.yEnd.from
    )
  }
)

const getNodeChildren = (node: SyntaxNode): SyntaxNode[] => {
  const c: SyntaxNode[] = []
  if (!node.firstChild) return c
  c.push((node = node.firstChild))
  while (node.nextSibling) {
    c.push((node = node.nextSibling))
  }
  return c
}

function widgets(view: EditorView): DecorationSet {
  const decos: Range<Decoration>[] = []
  for (const { from, to } of view.visibleRanges) {
    syntaxTree(view.state).iterate({
      from,
      to,
      enter(cur: TreeCursor) {
        if (cur.name !== 'CallExpression') return
        let fnVar = cur.node.getChild('VariableName')
        if (fnVar === null)
          fnVar = cur.node.getChild('MemberExpression').getChild('PropertyName')
        if (fnVar === null) return
        const fnName = view.state.doc.sliceString(fnVar.from, fnVar.to)
        if (fnName !== 'bezierEasing') return
        const args = getNodeChildren(cur.node.getChild('ArgList')).filter(
          n => !['(', ')', ','].includes(n.name)
        )
        const props = {} as BezierProps
        // check for valid calls with only literal values
        if (args.length !== 4) return

        props.yStart = args[0]
        if (!nodeIsNumber(props.yStart, view)) return

        const p0Arr = args[1]
        if (p0Arr.name !== 'ArrayExpression') return

        const p0ArrChildren = getNodeChildren(p0Arr)
        if (p0ArrChildren.length !== 5) return
        props.p0 = [p0ArrChildren[1], p0ArrChildren[3]]
        if (props.p0.find(n => !nodeIsNumber(n, view))) return

        const p1Arr = args[2]
        if (p1Arr.name !== 'ArrayExpression') return

        const p1ArrChildren = getNodeChildren(p1Arr)
        if (p1ArrChildren.length !== 5) return
        props.p1 = [p1ArrChildren[1], p1ArrChildren[3]]
        if (props.p1.find(n => !nodeIsNumber(n, view))) return

        props.yEnd = args[3]
        if (!nodeIsNumber(props.yEnd, view)) return

        const deco = Decoration.replace({
          widget: new bezierWidget(props)
        })

        decos.push(deco.range(fnVar.from, fnVar.to))
      }
    })
  }
  return Decoration.set(decos)
}

export const widgetsPlugin = ViewPlugin.fromClass(
  class {
    decorations: DecorationSet

    constructor(view: EditorView) {
      this.decorations = widgets(view)
    }

    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = widgets(update.view)
      }
    }
  },
  {
    decorations: v => v.decorations
  }
)
