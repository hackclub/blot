import { syntaxTree } from "@codemirror/language";
import type { Range } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, ViewPlugin, ViewUpdate } from "@codemirror/view";
import type { TreeCursor } from "@lezer/common";
import runCode from "../run.js";
import { nodeIsNumber } from "./utils.js";
import { createSpan, createUpdate, dispatchLiveUpdates, LiveUpdateSpan, runLiveUpdates } from "./liveUpdate.js";

function numberScrubbers(view: EditorView): DecorationSet {
    const decos: Range<Decoration>[] = [];
    for(const { from, to } of view.visibleRanges) {
        syntaxTree(view.state).iterate({
            from, to,
            enter: (cur: TreeCursor) => {
                if(nodeIsNumber(cur.node, view)) {
                    const deco = Decoration.mark({
                        tagName: "span",
                        class: "cm-number-scrubber",
                        attributes: {
                            "data-from": cur.from,
                            "data-to": cur.to
                        }
                    });
                    decos.push(deco.range(cur.from, cur.to));
                }
            }
        });
    }

    return Decoration.set(decos);
}

export const numberScrubbingPlugin = ViewPlugin.fromClass(class {
    decorations: DecorationSet;
    #dragging: boolean = false;
    get dragging() { return this.#dragging; }
    set dragging(val) {
        const old = this.#dragging;
        this.#dragging = val;
        if(!val && old) { // just ended dragging
            // rebuild
            runCode();
        }
    }
    num: number = 0;
    sigfigs: number = 0;
    updateSpan: LiveUpdateSpan | null = null;

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
                this.updateSpan = createSpan(Number(ns.dataset.from), Number(ns.dataset.to), view);
                this.dragging = true;
                const numStr = view.state.doc.sliceString(this.updateSpan.from, this.updateSpan.to).replaceAll(" ", "") /* handle numbers like `- 5` */;
                this.num = Number(numStr);
                this.sigfigs = numStr.split(".")[1]?.length ?? 0;
            }
        },
        mouseup(e, view) {
            this.dragging = false;
        },
        mousemove(e, view) {
            if(!this.dragging || !this.updateSpan) return false;

            // if we're not clicking, end dragging
            if(e.buttons === 0) {
                this.dragging = false;
                return false;
            }

            e.preventDefault();
            e.stopPropagation();

            this.num += this.sigfigs ? e.movementX * 10**(-1 * this.sigfigs) : e.movementX;
            const newValue = this.num.toFixed(this.sigfigs);

            dispatchLiveUpdates([createUpdate(this.updateSpan, newValue)], view).then(runLiveUpdates);

            return true;
        }
    }
});