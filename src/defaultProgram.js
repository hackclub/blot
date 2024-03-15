export const defaultProgram = `// welcome to blot!

const width = 125;
const height = 125;

setDocDimensions(width, height);

tk.setRandSeed(14);

const finalPolylines = [];
const t = new tk.Turtle();

for (let i = 0; i < 52; i++) {
  t.forward(i);
  t.right(91);
}

// add turtle to final lines
finalPolylines.push(...t.lines());

// center piece
const cc = tk.bounds(finalPolylines).cc;
tk.translate(finalPolylines, [width / 2, height / 2], cc);

// draw it
drawLines(finalPolylines);
`.trim()
