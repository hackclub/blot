import MobileUnsupported from '../components/MobileUnsupported.astro'
import Editor from '../components/editor/Editor'
import { render as preactRender } from 'preact'

interface RenderOptions {
  hard: boolean | undefined
}

export function render(options: RenderOptions | undefined) {
  const root = document.querySelector('main')

  if (window.innerWidth < 767.98) preactRender(<MobileUnsupported />, root)
  window.addEventListener('resize', event => {
    if (window.innerWidth < 767.98) preactRender(<MobileUnsupported />, root)
  })

  if (options?.hard)
    preactRender(
      <Editor
        toolkit={window.getToolkit()}
        loggedIn={window.getLoggedIn()}
        source={window.getSrc()}
        guide={window.getGuide()}
      />,
      root
    )
  else
    window.requestAnimationFrame(() => {
      preactRender(
        <Editor
          toolkit={window.getToolkit()}
          loggedIn={window.getLoggedIn()}
          source={window.getSrc()}
          guide={window.getGuide()}
        />,
        root
      )
    })
}
