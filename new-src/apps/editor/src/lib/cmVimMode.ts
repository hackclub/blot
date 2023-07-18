import { Compartment } from "@codemirror/state";
import { getSettings, useSettings } from "./settings.ts";
import { vim } from "@replit/codemirror-vim";
import type { EditorView } from "@codemirror/view";
import { useEffect } from "preact/hooks";

const vimModeCompartment = new Compartment();
export const vimModeExtension = () => vimModeCompartment.of(getSettings().vimMode ? vim() : []);

export function useVimMode(view: EditorView | undefined) {
    const { vimMode } = useSettings(["vimMode"]);

    useEffect(() => {
        if(!view) return;
        view.dispatch({
            effects: vimModeCompartment.reconfigure(vimMode ? vim() : [])
        });
    }, [vimMode]);
}