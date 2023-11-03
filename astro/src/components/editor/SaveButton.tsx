import { Signal, useComputed, useSignal } from '@preact/signals'
import { persist } from '../../db/auth-helper'
import { isValidEmail } from '../../db/email'
import type { PersistenceState } from '../../lib/state/persist'
import Input from '../../ui/design-system/Input'

interface SavePromptProps {
  kind: 'email' | 'instant'
  onClose: () => void
}

export default function SavePrompt(props: SavePromptProps) {
  return (
    <form
      onSubmit={async event => {
        event.preventDefault()
      }}>
      <p>
        Enter your email to save your work, we'll send you a link for later:
      </p>
      <Input
        type="email"
        autoComplete="email"
        placeholder="orpheus@hackclub.com"
        bind={email}
      />
      <button>Save</button>
    </form>
  )
}
