import { useState, useCallback } from 'preact/hooks'

function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0
  return (...args: Parameters<T>) => {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    return func(...args)
  }
}

export default function EditorDemo() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })

  const onMouseMove = useCallback(
    throttle(e => {
      console.log(e)
      const img = e.currentTarget
      const box = img.getBoundingClientRect()
      const x = e.clientX - box.left
      const y = e.clientY - box.top
      const centerX = box.width / 2
      const centerY = box.height / 2
      const rotateX = (y - centerY) / 100
      const rotateY = (centerX - x) / 100

      setRotate({ x: rotateX, y: rotateY })
    }, 100),
    []
  )

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
  }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: 'all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s'
      }}>
      <img
        style={{
          borderRadius: '7px',
          border: '1px solid #cbd5e1',
          boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)'
        }}
        src="/landing/editor.png"
      />
    </div>
  )
}
