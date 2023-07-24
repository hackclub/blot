import { syntaxTree } from "@codemirror/language";
import type { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import type { TreeCursor, SyntaxNode } from "@lezer/common";
import runCode, { liveUpdateBundle, manualChangeSinceLiveUpdate } from "../run.js";
import type { CodePosition } from "../state.js";
import { liveUpdating } from "../../components/CodeMirror.js";

function numberScrubbers(view: EditorView): DecorationSet {
    const decos: Range<Decoration>[] = [];
    for(const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            from, to,
            enter: (cur: TreeCursor) => {
                if(cur.name === "Number") {
                    const parent: SyntaxNode = cur.node.parent;

                    const from =
                        parent.name === "UnaryExpression" &&
                        parent.firstChild.name === "ArithOp" &&
                        view.state.doc.sliceString(
                            parent.firstChild.from,
                            parent.firstChild.to
                        ) === "-"
                            ? parent.from
                            : cur.from;

                    // console.log(node, node.from, node.to, node.parent()?.name);
                    const deco = Decoration.mark({
                        tagName: "span",
                        class: "cm-number-scrubber",
                        attributes: {
                            "data-from": from,
                            "data-to": cur.to
                        }
                    });
                    decos.push(deco.range(from, cur.to));
                }
            }
        });
    }

    return Decoration.set(decos);
}

export const numberScrubbingPlugin = ViewPlugin.fromClass(class {
    decorations: DecorationSet;
    // dragging: boolean = false;
    #dragging: boolean = false;
    get dragging() { return this.#dragging; }
    set dragging(val) {
        const old = this.#dragging;
        this.#dragging = val;
        if(!val && old) {
            // rebuild
            runCode();
            liveUpdating.value = false;
        }
    }
    from: number = 0;
    to: number = 0;
    origTo: number = 0;
    num: number = 0;
    sigfigs: number = 0;
    isRunning: boolean = false;

    constructor(view: EditorView) {
        this.decorations = numberScrubbers(view);
    }

    update(update: ViewUpdate) {
        if(update.docChanged || update.viewportChanged) {
            this.decorations = numberScrubbers(update.view);
        }
    }
}, {
    decorations: v => v.decorations,
    eventHandlers: {
        mousedown(e, view) {
            const target = e.target as HTMLElement;
            const ns = target.closest<HTMLElement>(".cm-number-scrubber");
            if(ns) {
                this.from = Number(ns.dataset.from);
                this.to = Number(ns.dataset.to);
                this.origTo = this.to;
                this.dragging = true;
                const numStr = view.state.doc.sliceString(this.from, this.to).replaceAll(" ", "") /* handle numbers like `- 5` */;
                this.num = Number(numStr);
                this.sigfigs = numStr.split(".")[1]?.length ?? 0;
            }
        },
        mouseup(e, view) {
            this.dragging = false;
        },
        mousemove(e, view) {
            if(!this.dragging) return false;

            // if we're not clicking, end dragging
            if(e.buttons === 0) {
                this.dragging = false;
                return false;
            }

            e.preventDefault();
            e.stopPropagation();

            liveUpdating.value = true;

            this.num += this.sigfigs ? e.movementX * 10**(-1 * this.sigfigs) : e.movementX;
            const newValue = this.num.toFixed(this.sigfigs);

            view.dispatch({
                changes: [{
                    from: this.from,
                    to: this.to,
                    insert: newValue
                }]
            });

            if(this.to - this.from !== newValue.length) {
                this.to += newValue.length - (this.to - this.from);
            }

            if(!this.isRunning) {
                this.isRunning = true;
                liveUpdateBundle(...([this.from, this.origTo].map(offset => {
                    const cmLine = view.state.doc.lineAt(offset);
                    return {
                        line: cmLine.number,
                        column: offset - cmLine.from
                    };
                }) as [CodePosition, CodePosition]), newValue).then(async () => { await runCode(true); this.isRunning = false; });
            }

            manualChangeSinceLiveUpdate.value = false;

            return true;
        }
    }
});