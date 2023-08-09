import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate, WidgetType } from "@codemirror/view";
import type { Range } from "@codemirror/state";
import { h, type ComponentType, render } from "preact";
import { syntaxTree } from "@codemirror/language";
import type { SyntaxNode, TreeCursor } from "@lezer/common";
import ThreeDCurveManualIcon from "../../ui/3DCurveManualIcon.tsx";
import styles from "./widgets.module.css";
import { useCallback, useMemo, useState } from "preact/hooks";
import type { Point } from "haxidraw-client";
import { createEvent } from "niue";
import BezierEditor, { BezierPoints } from "../../components/BezierEditor.tsx";

const makeWidget = <T extends {}>(component: ComponentType<{ view: EditorView, props: T }>) =>
    class extends WidgetType {
        props: T;

        constructor(props: T) {
            super();
            this.props = props;
        }

        override eq(other: this) {
            for (const key in this.props) {
                if (this.props[key] !== other.props[key]) return false;
            }
            return true;
        }

        // override ignoreEvent() {
        // }

        toDOM(view: EditorView): HTMLElement {
            const container = document.createElement("span");
            render(h(component, { props: this.props, view }), container);
            return container;
        }

        override updateDOM(container: HTMLElement, view: EditorView) {
            // render(h(component, { props: this.props, view }), container);
            return true;
        }
    };

type BezierProps = {
    yStart: SyntaxNode,
    p0: [SyntaxNode, SyntaxNode],
    p1: [SyntaxNode, SyntaxNode],
    yEnd: SyntaxNode
};

enum PopupSide {
    Top,
    Bottom
}

const [useOnCloseBezierWidget, dispatchCloseBezierWidget] = createEvent<null>();

const bezierWidget = makeWidget<BezierProps>(({ view, props }) => {
    const [popupSide, setPopupSide] = useState<PopupSide | null>(null);

    useOnCloseBezierWidget(() => {
        setPopupSide(null);
    }, []);

    const bezierOnChange = useCallback((value: BezierPoints) => {
        const vf = Object.values(value).flat();
        view.dispatch({
            changes: Object.values(props).flat().map((node, i) => ({
                from: node.from,
                to: node.to,
                insert: vf[i].toString()
            }))
        });
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
                    <BezierEditor initialValue={bezierInitialValue} onChange={bezierOnChange} />
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
                const fnVar = cur.node.getChild("VariableName");
                const fnName = view.state.doc.sliceString(fnVar.from, fnVar.to);
                if(fnName !== "bezierEasing") return;
                console.log(cur.node.toString());
                const args = getNodeChildren(cur.node.getChild("ArgList")).filter(n => !["(", ")", ","].includes(n.name));
                const props = {} as BezierProps;
                // check for valid calls with only literal values
                if(args.length !== 4) return;
                props.yStart = args[0];
                if(props.yStart.name !== "Number") return;
                const p0Arr = args[1];
                if(p0Arr.name !== "ArrayExpression") return;
                const p0ArrChildren = getNodeChildren(p0Arr);
                if(p0ArrChildren.length !== 5) return;
                props.p0 = [p0ArrChildren[1], p0ArrChildren[3]];
                if(props.p0[0].name !== "Number" || props.p0[1].name !== "Number") return;
                const p1Arr = args[2];
                if(p1Arr.name !== "ArrayExpression") return;
                const p1ArrChildren = getNodeChildren(p1Arr);
                if(p1ArrChildren.length !== 5) return;
                props.p1 = [p1ArrChildren[1], p1ArrChildren[3]];
                if(props.p1[0].name !== "Number" || props.p1[1].name !== "Number") return;
                props.yEnd = args[3];
                if(props.yEnd.name !== "Number") return;

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