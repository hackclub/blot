function isect_circ_line(cx, cy, r, x0, y0, x1, y1) {
  //https://stackoverflow.com/a/1084899
  let dx = x1 - x0
  let dy = y1 - y0
  let fx = x0 - cx
  let fy = y0 - cy
  let a = dx * dx + dy * dy
  let b = 2 * (fx * dx + fy * dy)
  let c = fx * fx + fy * fy - r * r
  let discriminant = b * b - 4 * a * c
  if (discriminant < 0) {
    return null
  }
  discriminant = Math.sqrt(discriminant)
  let t0 = (-b - discriminant) / (2 * a)
  if (0 <= t0 && t0 <= 1) {
    return t0
  }
  let t = (-b + discriminant) / (2 * a)
  if (t > 1 || t < 0) {
    return null
  }
  return t
}

export function resample(polyline, step) {
  if (polyline.length < 2) {
    return polyline.slice()
  }
  polyline = polyline.slice()
  let out = [polyline[0].slice()]
  let next = null
  let i = 0
  while (i < polyline.length - 1) {
    let a = polyline[i]
    let b = polyline[i + 1]
    let dx = b[0] - a[0]
    let dy = b[1] - a[1]
    let d = Math.sqrt(dx * dx + dy * dy)
    if (d == 0) {
      i++
      continue
    }
    let n = ~~(d / step)
    let rest = (n * step) / d
    let rpx = a[0] * (1 - rest) + b[0] * rest
    let rpy = a[1] * (1 - rest) + b[1] * rest
    for (let j = 1; j <= n; j++) {
      let t = j / n
      let x = a[0] * (1 - t) + rpx * t
      let y = a[1] * (1 - t) + rpy * t
      let xy = [x, y]
      for (let k = 2; k < a.length; k++) {
        xy.push(a[k] * (1 - t) + (a[k] * (1 - rest) + b[k] * rest) * t)
      }
      out.push(xy)
    }

    next = null
    for (let j = i + 2; j < polyline.length; j++) {
      let b = polyline[j - 1]
      let c = polyline[j]
      if (b[0] == c[0] && b[1] == c[1]) {
        continue
      }
      let t = isect_circ_line(rpx, rpy, step, b[0], b[1], c[0], c[1])
      if (t == null) {
        continue
      }

      let q = [b[0] * (1 - t) + c[0] * t, b[1] * (1 - t) + c[1] * t]
      for (let k = 2; k < b.length; k++) {
        q.push(b[k] * (1 - t) + c[k] * t)
      }
      out.push(q)
      polyline[j - 1] = q
      next = j - 1
      break
    }
    if (next == null) {
      break
    }
    i = next
  }

  if (out.length > 1) {
    let lx = out[out.length - 1][0]
    let ly = out[out.length - 1][1]
    let mx = polyline[polyline.length - 1][0]
    let my = polyline[polyline.length - 1][1]
    let d = Math.sqrt((mx - lx) ** 2 + (my - ly) ** 2)
    if (d < step * 0.5) {
      out.pop()
    }
  }
  out.push(polyline[polyline.length - 1].slice())
  return out
}
