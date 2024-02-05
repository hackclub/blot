import { useState } from 'preact/hooks'
import Button from '../ui/Button.tsx'
import Dialog from '../ui/Dialog.tsx'

export default function CompatWarning() {
  const [show, setShow] = useState(false)

  return (
    <Dialog
      show={show}
      title="Incompatible browser"
      actions={<Button onClick={() => setShow(false)}>Continue</Button>}
      close={() => setShow(false)}>
      Your browser doesn't seem to support the Web Serial API, which is required
      for the editor to be able to connect to hardware. You can still use the
      site to write code, but for full functionality, use Chrome or Edge version
      89 or above.
    </Dialog>
  )
}
