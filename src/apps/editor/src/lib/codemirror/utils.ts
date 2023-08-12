import type { EditorView } from "@codemirror/view";
import type { CodePosition } from "../state.js";
import type { SyntaxNode } from "@lezer/common";
import type { EditorState } from "@codemirror/state";

export const rangeToCodePositions = (from: number, to: number, view: EditorView): [CodePosition, CodePosition] => [from, to].map(offset => offsetToCodePosition(offset, view)) as [CodePosition, CodePosition];

export const offsetToCodePosition = (offset: number, view: EditorView): CodePosition => {
    const cmLine = view.state.doc.lineAt(offset);
    return {
        line: cmLine.number,
        column: offset - cmLine.from
    };
};

export const codePositionToOffset = (pos: CodePosition, state: EditorState) => state.doc.line(pos.line).from + pos.column;

export const nodeIsNumber = (node: SyntaxNode, view: EditorView): boolean => {
    if(node.name === "Number" && node.parent.name !== "UnaryExpression") return true;
    if(node.name === "UnaryExpression") {
        const a = node.getChild("ArithOp");
        return a && view.state.doc.sliceString(a.from, a.to) === "-";
    }
    return false;
};