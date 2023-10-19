let t = createTurtle([7, -7])
for (let i of eval(
  `'A'` + `.replace(/[AB]/g,c=>c=='A'?'-BF+AFA+FB-':'+AF-BFB-FA+')`.repeat(5)
))
  try {
    eval(i == 'F' ? `t.forward(-0.1)` : `t.left(${i}87)`)
  } catch {}

t.scale(110/t.width);
t.translate([125/2, 125/2], t.cc);
drawTurtles([t])
