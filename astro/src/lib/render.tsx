import MobileUnsupported from '../components/MobileUnsupported.astro'
import Editor from '../components/editor/Editor'
import EditorAutosave from '../components/~/EditorAutosave'
import { render as preactRender } from 'preact'
import { signal } from '@preact/signals'
import type { PersistenceState } from './state/persist'

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
      <>
        <Editor
          toolkit={window.getToolkit()}
          loggedIn={window.getLoggedIn()}
          source={window.getSrc ? window.getSrc() : undefined}
          guide={window.getGuide ? window.getGuide() : undefined}
          persistenceState={
            window.getPersistenceState
              ? signal<PersistenceState>(window.getPersistenceState())
              : undefined
          }
        />
        {window.getPersistenceState != undefined && (
          <EditorAutosave
            persistenceState={signal<PersistenceState>(
              window.getPersistenceState()
            )}
          />
        )}
      </>,
      root
    )
  else
    window.requestAnimationFrame(() => {
      preactRender(
        <>
          <Editor
            toolkit={window.getToolkit()}
            loggedIn={window.getLoggedIn()}
            source={window.getSrc ? window.getSrc() : undefined}
            guide={window.getGuide ? window.getGuide() : undefined}
            persistenceState={
              window.getPersistenceState
                ? signal<PersistenceState>(window.getPersistenceState())
                : undefined
            }
          />
          {window.getPersistenceState != undefined && (
            <EditorAutosave
              persistenceState={signal<PersistenceState>(
                window.getPersistenceState()
              )}
            />
          )}
        </>,
        root
      )
    })
}
