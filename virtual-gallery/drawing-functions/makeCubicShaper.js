export function makeCubicShaper(initial, p1, p2, final) {
  return t =>
    (1 - t) * (1 - t) * (1 - t) * p1[1] * initial +
    3 * (1 - t) * (1 - t) * t * p1[0] +
    3 * (1 - t) * t * t * p2[1] +
    t * t * t * p2[0] * final
}
