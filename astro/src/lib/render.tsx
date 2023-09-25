import Editor from '../components/Editor.tsx'
import { render as preactRender } from 'preact'

export function render(tutorial = null) {
  const root = document.querySelector('main')

  preactRender(<Editor />, root)
}
