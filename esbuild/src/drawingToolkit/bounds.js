
export function bounds(polylines) {
  const { xMin, xMax, yMin, yMax } = extrema(polylines.flat());

  const width = xMax - xMin;
  const height = yMax - yMin;
  const lt = [xMin, yMax];
  const lc = [xMin, (yMax + yMin) / 2];
  const lb = [xMin, yMin];
  const ct = [(xMax + xMin) / 2, yMax];
  const cc = [(xMax + xMin) / 2, (yMax + yMin) / 2]
  const cb = [(xMax + xMin) / 2, yMin];
  const rt = [xMax, yMax];
  const rc = [xMax, (yMax + yMin) / 2];
  const rb = [xMax, yMin];

  return {
    width,
    height,
    lt,
    lc,
    lb,
    ct,
    cc,
    cb,
    rt,
    rc,
    rb,
    xMin,
    xMax,
    yMin,
    yMax
  }
}

function extrema(pts) {
  let xMin = Number.POSITIVE_INFINITY
  let xMax = Number.NEGATIVE_INFINITY
  let yMin = Number.POSITIVE_INFINITY
  let yMax = Number.NEGATIVE_INFINITY

  pts.forEach(p => {
    const [x, y] = p

    if (xMin > x) xMin = x
    if (xMax < x) xMax = x
    if (yMin > y) yMin = y
    if (yMax < y) yMax = y
  })

  return {
    xMin,
    xMax,
    yMin,
    yMax
  }
}