let t = new Turtle([7, -6])
for (let i of eval(
  `'A'` + `.replace(/[AB]/g,c=>c=='A'?'-BF+AFA+FB-':'+AF-BFB-FA+')`.repeat(5)
))
  try {
    eval(i == 'F' ? `t.forward(-0.1)` : `t.left(${i}87)`)
  } catch {}
drawTurtles(t)
