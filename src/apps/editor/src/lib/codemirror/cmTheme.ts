import { Compartment } from "@codemirror/state";
import { basicDark } from "cm6-theme-basic-dark";
import type { EditorView } from "@codemirror/view";
import { useEffect } from "preact/hooks";
import { Theme, getSettings, useSettings } from "../settings.ts";

const getCMThemeExtension = (theme: Theme) => theme === Theme.Dark ? basicDark : [];

const themeCompartment = new Compartment();
export const themeExtension = () => themeCompartment.of(getCMThemeExtension(getSettings().theme));

export function useCMTheme(view: EditorView | undefined) {
    const { theme } = useSettings(["theme"]);

    useEffect(() => {
        // update cm theme by adding or removing the extension
        if(!view) return;
        view.dispatch({
            effects: themeCompartment.reconfigure(getCMThemeExtension(theme))
        });
    }, [theme]);
}