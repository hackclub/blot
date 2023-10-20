import { getStore } from '../../lib/state'
import CodeMirror from '../CodeMirror'
import styles from '../Editor.module.scss'

export default function Editor() {
  const { theme } = getStore()

  return (
    <>
      <CodeMirror />
    </>
  )
}
