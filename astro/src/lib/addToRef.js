import { useEffect, useRef } from 'preact/hooks'

export function addToRef(obj) {
  const ref = useRef(null)
  useEffect(() => {
    if (!ref.current) return

    for (const key in obj) {
      const value = obj[key]
      ref.current[key] = value
    }
  }, [])

  return ref
}
