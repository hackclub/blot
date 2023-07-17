import { createEvent, useRerender } from "niue";

export enum Theme {
    Light,
    Dark
}

const [useOnThemeChange, dispatchThemeChange] = createEvent<void>();

export let theme: Theme = typeof window === "undefined"
    ? Theme.Light
    : Number(localStorage.getItem("colorTheme")) ?? window.matchMedia("(prefers-color-scheme: dark)") ? Theme.Dark : Theme.Light;

const updateBodyTheme = () => { document.body.dataset.theme = Theme[theme] };

if(typeof window !== "undefined") {
    updateBodyTheme();
}

export function useColorTheme() {
    const rerender = useRerender();
    useOnThemeChange(rerender, []);
    return theme;
}

export function setColorTheme(newTheme: Theme) {
    if(theme !== newTheme) {
        theme = newTheme;
        dispatchThemeChange();
        // store to localstorage
        localStorage.setItem("colorTheme", newTheme.toString());
        updateBodyTheme();
    }
}
