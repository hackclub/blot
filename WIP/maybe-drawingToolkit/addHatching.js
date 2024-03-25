  function addHatching(a, d) {
    const tp = new Polygon();
    tp.cp.push([-1e5, -1e5], [1e5, -1e5], [1e5, 1e5], [-1e5, 1e5]);
    const dx = Math.sin(a) * d,
      dy = Math.cos(a) * d;
    const cx = Math.sin(a) * 200,
      cy = Math.cos(a) * 200;
    for (let i = 0.5; i < 150 / d; i++) {
      tp.dp.push([dx * i + cy, dy * i - cx], [dx * i - cy, dy * i + cx]);
      tp.dp.push([-dx * i + cy, -dy * i - cx], [-dx * i - cy, -dy * i + cx]);
    }
    tp.boolean(this, false);
    this.dp = [...this.dp, ...tp.dp];
  }