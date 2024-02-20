import Editor from './components/Editor.tsx'
import { render as preactRender } from 'preact'

export function render(hard = false) {
  const root = document.querySelector('main')

  if (hard) preactRender(<Editor />, root)
  else {
    window.requestAnimationFrame(() => {
      preactRender(<Editor />, root)
    })
  }
}
