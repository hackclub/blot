import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view";
import type { Range } from "@codemirror/state";
import { h, type ComponentType, render } from "preact";
import { syntaxTree } from "@codemirror/language";
import type { SyntaxNode, TreeCursor } from "@lezer/common";
import ThreeDCurveManualIcon from "../../ui/3DCurveManualIcon.tsx";
import styles from "./widgets.module.css";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { createEvent } from "niue";
import BezierEditor, { BezierPoints } from "../../components/BezierEditor.tsx";
import { nodeIsNumber } from "./utils.js";
import Button from "../../ui/Button.js";
import CloseIcon from "../../ui/CloseIcon.js";
import type { LiveUpdateSpan } from "./liveUpdate.js";
import { createSpan, createUpdate, dispatchLiveUpdates, runLiveUpdates } from "./liveUpdate.js";

const makeWidget = <T extends {}>(component: ComponentType<{ view: EditorView, props: T }>, eq?: (a: T, b: T) => boolean) =>
    class extends WidgetType {
        props: T;
        id: number

        constructor(props: T) {
            super();
            this.props = props;
            this.id = Math.random()
        }

        override eq(other: this) {
            if(eq) return eq(this.props, other.props);

            for (const key in this.props) {
                if (this.props[key] !== other.props[key]) return false;
            }
            return true;
        }

        // override ignoreEvent() {
        // }

        toDOM(view: EditorView): HTMLElement {
            const container = document.createElement("span");
            console.log("render", (this.props as unknown as BezierProps).yStart.from, this.id);
            render(h(component, { props: this.props, view }), container);
            return container;
        }

        override updateDOM(container: HTMLElement, view: EditorView) {
            console.log("dom update!", (this.props as unknown as BezierProps).yStart.from, this.id);
            render(h(component, { props: this.props, view }), container);
            return true;
        }
    };


type DocRange = {
    from: number,
    to: number
};
type BezierProps = {
    yStart: DocRange,
    p0: [DocRange, DocRange],
    p1: [DocRange, DocRange],
    yEnd: DocRange
};

enum PopupSide {
    Top,
    Bottom
}

const [useOnCloseBezierWidget, dispatchCloseBezierWidget] = createEvent<null>();

const trimZerosFromEnd = (str: string) => str.replace(/\.?0+$/, "");

const bezierWidget = makeWidget<BezierProps>(({ view, props }) => {
    const [popupSide, setPopupSide] = useState<PopupSide | null>(null);
    const liveUpdateSpans = useMemo<LiveUpdateSpan[]>(() => Object.values(props).flat().map(node => createSpan(node.from, node.to, view)), []);

    useEffect(() => {
        // just update the to/from props of the span - on rebuild the spans will be invalidated
        Object.values(props).flat().forEach((node, i) => {
            liveUpdateSpans[i].from = node.from;
            liveUpdateSpans[i].to = node.to;
        });
    }, [props]);

    useOnCloseBezierWidget(() => {
        setPopupSide(null);
    }, []);

    const bezierOnChange = useCallback((value: BezierPoints) => {
        const vf = Object.values(value).flat();
        dispatchLiveUpdates(vf.map((v, i) => createUpdate(liveUpdateSpans[i], trimZerosFromEnd(v.toFixed(3)))), view).then(runLiveUpdates);
    }, []);

    const bezierInitialValue = useMemo<BezierPoints>(() => {
        const nodeToVal = (n: SyntaxNode) => Number(view.state.sliceDoc(n.from, n.to));
        return {
            yStart: nodeToVal(props.yStart),
            p0: [nodeToVal(props.p0[0]), nodeToVal(props.p0[1])],
            p1: [nodeToVal(props.p1[0]), nodeToVal(props.p1[1])],
            yEnd: nodeToVal(props.yEnd)
        };
    }, []);

    return (
        <span className={styles.bezierWidget}>
            {popupSide !== null && (
                <div className={styles.bezierWidgetPopup} style={{
                    top: popupSide === PopupSide.Top ? "0" : "100%",
                }}>
                    <BezierEditor initialValue={bezierInitialValue} onChange={bezierOnChange}>
                        <div class={styles.bezierWidgetHeader}>
                            <h3>edit bezier</h3>
                            <Button variant="ghost" icon aria-label="close" onClick={() => setPopupSide(null)}>
                                <CloseIcon />
                            </Button>
                        </div>
                    </BezierEditor>
                </div>
            )}
            <button className={styles.bezierWidgetBtn} onClick={e => {
                if(popupSide !== null) {
                    setPopupSide(null);
                    return;
                }
                dispatchCloseBezierWidget(null); // close all bezier widgets that are open
                // position the popup above the button if button is below the middle of the screen and vice versa
                const buttonRect = e.currentTarget.getBoundingClientRect();
                setPopupSide(buttonRect.top > window.innerHeight / 2 ? PopupSide.Top : PopupSide.Bottom);
            }}>
                <ThreeDCurveManualIcon />
                bezierEasing
            </button>
        </span>
    )
}, (a, b) => {
    return a.yStart.from === b.yStart.from &&
        a.p0[0].from === b.p0[0].from &&
        a.p0[1].from === b.p0[1].from &&
        a.p1[0].from === b.p1[0].from &&
        a.p1[1].from === b.p1[1].from &&
        a.yEnd.from === b.yEnd.from;
});

const getNodeChildren = (node: SyntaxNode): SyntaxNode[] => {
    const c: SyntaxNode[] = [];
    if(!node.firstChild) return c;
    c.push(node = node.firstChild);
    while(node.nextSibling) {
        c.push(node = node.nextSibling);
    }
    return c;
}

function widgets(view: EditorView): DecorationSet {
    const decos: Range<Decoration>[] = [];
    for(const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            from, to,
            enter(cur: TreeCursor) {
                if(cur.name !== "CallExpression") return;
                let fnVar = cur.node.getChild("VariableName");
                if(fnVar === null) fnVar = cur.node.getChild("MemberExpression").getChild("PropertyName");
                if(fnVar === null) return;
                const fnName = view.state.doc.sliceString(fnVar.from, fnVar.to);
                if(fnName !== "bezierEasing") return;
                const args = getNodeChildren(cur.node.getChild("ArgList")).filter(n => !["(", ")", ","].includes(n.name));
                const props = {} as BezierProps;
                // check for valid calls with only literal values
                if(args.length !== 4) return;

                props.yStart = args[0];
                if(!nodeIsNumber(props.yStart, view)) return;

                const p0Arr = args[1];
                if(p0Arr.name !== "ArrayExpression") return;

                const p0ArrChildren = getNodeChildren(p0Arr);
                if(p0ArrChildren.length !== 5) return;
                props.p0 = [p0ArrChildren[1], p0ArrChildren[3]];
                if(props.p0.find(n => !nodeIsNumber(n, view))) return;

                const p1Arr = args[2];
                if(p1Arr.name !== "ArrayExpression") return;

                const p1ArrChildren = getNodeChildren(p1Arr);
                if(p1ArrChildren.length !== 5) return;
                props.p1 = [p1ArrChildren[1], p1ArrChildren[3]];
                if(props.p1.find(n => !nodeIsNumber(n, view))) return;

                props.yEnd = args[3];
                if(!nodeIsNumber(props.yEnd, view)) return;

                const deco = Decoration.replace({
                    widget: new bezierWidget(props)
                });

                decos.push(deco.range(fnVar.from, fnVar.to));
            }
        })
    }
    return Decoration.set(decos);
}

export const widgetsPlugin = ViewPlugin.fromClass(class {
    decorations: DecorationSet;

    constructor(view: EditorView) {
        this.decorations = widgets(view);
    }

    update(update: ViewUpdate) {
        if(update.docChanged || update.viewportChanged) {
            this.decorations = widgets(update.view);
        }
    }
}, {
    decorations: v => v.decorations
});