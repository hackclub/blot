import { Compartment } from '@codemirror/state'
import { basicDark } from 'cm6-theme-basic-dark'
import type { EditorView } from '@codemirror/view'
import { useEffect } from 'preact/hooks'
import { getStore } from '../state.ts'

const getCMThemeExtension = (theme: "light" | "dark") =>
  theme === "dark" ? basicDark : []

const themeCompartment = new Compartment()
export const themeExtension = () =>
  themeCompartment.of(getCMThemeExtension(getStore().theme))

export function useCMTheme(view: EditorView | undefined | null) {
  const { theme } = getStore();

  useEffect(() => {
    // update cm theme by adding or removing the extension
    if (!view) return
    view.dispatch({
      effects: themeCompartment.reconfigure(getCMThemeExtension(theme))
    })
  }, [theme])
}
