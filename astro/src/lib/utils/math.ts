export const dist = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a
export const clamp = (a: number, min: number = 0, max: number = 1) =>
  Math.min(max, Math.max(min, a))
export const invlerp = (x: number, y: number, a: number) =>
  clamp((a - x) / (y - x))
export const range = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  a: number
) => lerp(x2, y2, invlerp(x1, y1, a))
