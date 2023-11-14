import { type Point } from '../types'

export function displace(pts: Point[], fn: (t: number) => number) {
  for (let i = 0; i < pts.length - 1; i++) {
    let [x0, y0] = pts[i]
    let [x1, y1] = pts[i + 1]
    let dx = x1 - x0
    let dy = y1 - y0
    let ex = -dy
    let ey = dx
    let d = Math.sqrt(dx * dx + dy * dy)
    ex /= d
    ey /= d
    let t = i
    let s = fn(t)
    pts[i][0] += ex * s
    pts[i][1] += ey * s
  }
}
