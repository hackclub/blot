import { createState } from "niue";

export enum Theme {
    Light,
    Dark
}

type Settings = {
    theme: Theme,
    vimMode: boolean
};

const getSettingsFromLS = (): Settings => typeof window === "undefined" ? {
    theme: Theme.Light,
    vimMode: false
} : {
    theme: Number(localStorage.getItem("colorTheme")) ?? window.matchMedia("(prefers-color-scheme: dark)") ? Theme.Dark : Theme.Light,
    vimMode: localStorage.getItem("vimMode") === "true"
};

const updateBodyTheme = (theme: Theme) => { document.body.dataset.theme = Theme[theme] };

const settingsStore = createState<Settings>(getSettingsFromLS());

export const [useSettings, , getSettings] = settingsStore;

if(typeof window !== "undefined") {
    updateBodyTheme(getSettings().theme);
}

const [, _patchSettings] = settingsStore;

export const patchSettings = (...args: Parameters<typeof _patchSettings>) => {
    const oldTheme = getSettings().theme;
    _patchSettings(...args);
    // update ls
    const settings = getSettings();
    if(settings.theme !== oldTheme) {
        updateBodyTheme(settings.theme);
    }
    localStorage.setItem("colorTheme", settings.theme.toString());
    localStorage.setItem("vimMode", settings.vimMode.toString());
};