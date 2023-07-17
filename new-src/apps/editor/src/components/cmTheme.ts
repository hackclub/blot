import { Compartment } from "@codemirror/state";
import { basicDark } from "cm6-theme-basic-dark";
import type { EditorView } from "codemirror";
import { useEffect } from "preact/hooks";
import { Theme, theme, useColorTheme } from "../ui/colorTheme.ts";

const getCMThemeExtension = (theme: Theme) => theme === Theme.Dark ? basicDark : [];

const themeCompartment = new Compartment();
export const themeExtension = () => themeCompartment.of(getCMThemeExtension(theme));

export function useCMTheme(view: EditorView | undefined) {
    const theme = useColorTheme();

    useEffect(() => {
        // update cm theme by adding or removing the extension
        if(!view) return;
        view.dispatch({
            effects: themeCompartment.reconfigure(getCMThemeExtension(theme))
        });
    }, [theme]);
}