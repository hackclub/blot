type Settings = {
  theme: Theme
  vimMode: boolean
}

const getSettingsFromLS = (): Settings =>
  typeof window === 'undefined'
    ? {
        theme: Theme.Light,
        vimMode: false
      }
    : {
        theme:
          Number(localStorage.getItem('colorTheme')) ??
          window.matchMedia('(prefers-color-scheme: dark)')
            ? Theme.Dark
            : Theme.Light,
        vimMode: localStorage.getItem('vimMode') === 'true'
      }

const updateBodyTheme = (theme: Theme) => {
  document.body.dataset.theme = Theme[theme]
}

if (typeof window !== 'undefined') {
  updateBodyTheme(getSettings().theme)
}

export const patchSettings = () => {
  const oldTheme = getSettings().theme

  const settings = getSettings()
  if (settings.theme !== oldTheme) {
    updateBodyTheme(settings.theme)
  }

  localStorage.setItem('colorTheme', settings.theme.toString())
  localStorage.setItem('vimMode', settings.vimMode.toString())
}
