const id = "mesh.md";
const collection = "workshops";
const slug = "mesh";
const body = "\n\n# Draw a triangle mesh in Haxidraw\n\n### This guide is based on a tutorial on _[generativeartistry](https://generativeartistry.com/tutorials/triangular-mesh/)_ by [maxwellito](https://maxwellito.com/)\n\n---\n\n<img src=\"https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png\" width=\"512\"/>\n\nWe'll build the above mesh like this:\n\n- First, generate a grid of points, where every other line is slightly offset\n- Next, offset each point according to some noise\n- Then, we iterate through that grid, drawing triangles at every 3 points\n\n### Let's start with some code\n\nFirst, create a turtle:\n`const t = new Turtle();`\n\nNext, let's define a scale for the whole image:\n`const size = 80`\n\nThen, we can create a grid. This is identical to a typical rectangular grid, except we offset every other line by a bit, making it triangular.\n\n```\nvar line, dot,\n    odd = false,\n    lines = [],\n    gap = 1;\n\nfor(var y = gap / 2; y <= size; y+= gap) {\n  odd = !odd;\n  line = [];\n  for(var x = gap / 4; x <= size; x+= gap) {\n    dot = {x: x + (odd ? gap/2 : 0), y: y};\n```\n\nThen, use the built-in haxidraw noise function to offset the points again, this time randomly. Also, add an offset on the x axis if we're drawing an odd-numbered line.\n\n```\n    let n = noise([x * 0.1, y * 0.1])\n    line.push({\n      x: x + (n*4.1 - .4) * gap  + (odd ? gap/2 : 0),\n      y: y + (n*6.9 - .4) * gap\n    });\n  }\n  lines.push(line);\n}\n```\n\nNow, we need a way to draw this. We can define a simple function to render a triange, where we simply go through every point of the triangle with the turtle `goto` function.\n\n```\nfunction drawTriangle(pointA, pointB, pointC) {\n  t.goto([pointA.x, pointA.y]);\n  t.down()\n  t.goto([pointB.x, pointB.y]);\n  t.goto([pointC.x, pointC.y]);\n  t.goto([pointA.x, pointA.y]);\n  t.up()\n}\n```\n\nNow, to draw the whole mesh, we can iterate through the points, drawing triangles at every 3 points next to each other in 2D.\n\n```\nvar dotLine;\nodd = true;\n\nfor(var y = 0; y < lines.length - 1; y++) {\n  odd = !odd;\n  dotLine = [];\n  for(var i = 0; i < lines[y].length; i++) {\n    dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);\n    dotLine.push(odd ? lines[y+1][i] : lines[y][i]);\n  }\n  for(var i = 0; i < dotLine.length - 2; i++) {\n    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);\n  }\n}\n\ndrawTurtles(t)\n```\n\nAnd, that's it! If all went well, you should have an image resembling the one at the start of the guide.\n";
const data = { title: "Draw a triangle mesh", description: "This guide is based on a tutorial on _[generativeartistry](https://generativeartistry.com/tutorials/triangular-mesh/)_ by [maxwellito](https://maxwellito.com/)\n", thumbnail: "https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png" };
const _internal = {
  type: "content",
  filePath: "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/mesh.md",
  rawData: "\ntitle: Draw a triangle mesh\ndescription: >\n  This guide is based on a tutorial on _[generativeartistry](https://generativeartistry.com/tutorials/triangular-mesh/)_ by [maxwellito](https://maxwellito.com/)\nthumbnail: https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png"
};
export {
  _internal,
  body,
  collection,
  data,
  id,
  slug
};
