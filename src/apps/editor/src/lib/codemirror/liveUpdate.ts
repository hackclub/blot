// responsible for "live update" mechanism of editor
// (updating bundle based on transaction changes to the editor's code without rebuilding the entire bundle)
// this should only be used for things that don't get transpiled (for instance, number/string literals)

import type { EditorState } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import { codePositionToOffset, rangeToCodePositions } from "./utils.js";
import runCode, { build, bundle, bundleState, smc } from "../run.js";

export const manualChangeSinceLiveUpdate = {
    value: true
};

export type LiveUpdateSpan = {
    from: number,
    to: number,
    bundleFrom: number,
    bundleTo: number,
    bundleState?: WeakRef<EditorState> // keep track of associated state, so if it's invalidated we can recalc the bundle pos
};

export type LiveUpdate = {
    span: LiveUpdateSpan,
    update: string;
};

const updateSpanBundlePos = (span: LiveUpdateSpan, view: EditorView) => {
    if(!smc || !bundleState.value) {
        span.bundleState = undefined;
        return;
    }
    [span.bundleFrom, span.bundleTo] = rangeToCodePositions(span.from, span.to, view)
        .map(p => ({ ...p, source: "index.js" }))
        .map(p => smc!.generatedPositionFor(p))
        .map(p => codePositionToOffset(p, bundleState.value!));

    span.bundleState = new WeakRef(bundleState.value!);
};

// create a data structure to track a span in the code and the corresponding span in the bundle
export const createSpan = (from: number, to: number, view: EditorView): LiveUpdateSpan => {
    const s: LiveUpdateSpan = {
        from, to
    } as LiveUpdateSpan;
    updateSpanBundlePos(s, view);
    return s;
};

// create an object representing an update to the span (replacing the text in the span with the new value)
export const createUpdate = (span: LiveUpdateSpan, update: string) => ({
    span,
    update
});

// apply a set of update objects to the editor view and the bundle
export async function dispatchLiveUpdates(updates: LiveUpdate[], view: EditorView) {
    const viewTr = view.state.update({
        changes: updates.map(u => ({
            from: u.span.from,
            to: u.span.to,
            insert: u.update
        }))
    });
    view.dispatch(viewTr);
    updates.forEach(u => {
        u.span.from = viewTr.changes.mapPos(u.span.from, 1); // attach to character to the right of the pos
        u.span.to = viewTr.changes.mapPos(u.span.to, -1);
    });

    if(manualChangeSinceLiveUpdate.value || !bundleState.value) { await build(); return; }
    console.log("attempting live update");

    updates.forEach(u => u.span.bundleState?.deref() !== bundleState.value && updateSpanBundlePos(u.span, view));
    const bundleTr = bundleState.value.update({
        changes: updates.map(u => ({
            from: u.span.bundleFrom,
            to: u.span.bundleTo,
            insert: u.update
        }))
    });
    bundleState.value = bundleTr.state;
    updates.forEach(u => {
        u.span.bundleFrom = bundleTr.changes.mapPos(u.span.bundleFrom, 1);
        u.span.bundleTo = bundleTr.changes.mapPos(u.span.bundleTo, -1);
    });

    bundle.value = bundleState.value.doc.toString();

    manualChangeSinceLiveUpdate.value = false;
}

let isRunning = false;

// run the code without rebundling (also does debouncing, so this can be directly called after dispatching an update)
export async function runLiveUpdates() {
    if(!isRunning) {
        isRunning = true;
        runCode(true).then(() => {
            isRunning = false;
        });
    }
}
