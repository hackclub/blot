import { i as createVNode, s as spreadAttributes, F as Fragment } from "./astro.2c740cbe.mjs";
import "html-escaper";
import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
const images = {};
function updateImageReferences(html2) {
  return html2.replaceAll(
    /__ASTRO_IMAGE_="([^"]+)"/gm,
    (full, imagePath) => spreadAttributes({ src: images[imagePath].src, ...images[imagePath].attributes })
  );
}
const html = updateImageReferences('<h3 id="this-guide-is-based-on-a-tutorial-on-generativeartistry-by-maxwellito">This guide is based on a tutorial on <em><a href="https://generativeartistry.com/tutorials/triangular-mesh/">generativeartistry</a></em> by <a href="https://maxwellito.com/">maxwellito</a></h3>\n<hr>\n<img src="https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png" width="512">\n<p>We’ll build the above mesh like this:</p>\n<ul>\n<li>First, generate a grid of points, where every other line is slightly offset</li>\n<li>Next, offset each point according to some noise</li>\n<li>Then, we iterate through that grid, drawing triangles at every 3 points</li>\n</ul>\n<h3 id="lets-start-with-some-code">Let’s start with some code</h3>\n<p>First, create a turtle:\n<code>const t = new Turtle();</code></p>\n<p>Next, let’s define a scale for the whole image:\n<code>const size = 80</code></p>\n<p>Then, we can create a grid. This is identical to a typical rectangular grid, except we offset every other line by a bit, making it triangular.</p>\n<pre class="language-plaintext"><code is:raw="" class="language-plaintext">var line, dot,\n    odd = false,\n    lines = [],\n    gap = 1;\n\nfor(var y = gap / 2; y &#x3C;= size; y+= gap) {\n  odd = !odd;\n  line = [];\n  for(var x = gap / 4; x &#x3C;= size; x+= gap) {\n    dot = {x: x + (odd ? gap/2 : 0), y: y};</code></pre>\n<p>Then, use the built-in haxidraw noise function to offset the points again, this time randomly. Also, add an offset on the x axis if we’re drawing an odd-numbered line.</p>\n<pre class="language-plaintext"><code is:raw="" class="language-plaintext">    let n = noise([x * 0.1, y * 0.1])\n    line.push({\n      x: x + (n*4.1 - .4) * gap  + (odd ? gap/2 : 0),\n      y: y + (n*6.9 - .4) * gap\n    });\n  }\n  lines.push(line);\n}</code></pre>\n<p>Now, we need a way to draw this. We can define a simple function to render a triange, where we simply go through every point of the triangle with the turtle <code>goto</code> function.</p>\n<pre class="language-plaintext"><code is:raw="" class="language-plaintext">function drawTriangle(pointA, pointB, pointC) {\n  t.goto([pointA.x, pointA.y]);\n  t.down()\n  t.goto([pointB.x, pointB.y]);\n  t.goto([pointC.x, pointC.y]);\n  t.goto([pointA.x, pointA.y]);\n  t.up()\n}</code></pre>\n<p>Now, to draw the whole mesh, we can iterate through the points, drawing triangles at every 3 points next to each other in 2D.</p>\n<pre class="language-plaintext"><code is:raw="" class="language-plaintext">var dotLine;\nodd = true;\n\nfor(var y = 0; y &#x3C; lines.length - 1; y++) {\n  odd = !odd;\n  dotLine = [];\n  for(var i = 0; i &#x3C; lines[y].length; i++) {\n    dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);\n    dotLine.push(odd ? lines[y+1][i] : lines[y][i]);\n  }\n  for(var i = 0; i &#x3C; dotLine.length - 2; i++) {\n    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);\n  }\n}\n\ndrawTurtles(t)</code></pre>\n<p>And, that’s it! If all went well, you should have an image resembling the one at the start of the guide.</p>');
const frontmatter = { "title": "Draw a triangle mesh", "thumbnail": "https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png", "contributors": "henrybass" };
const file = "/Users/jchen/Documents/Programming/haxidraw/new/guides/mesh.md";
const url = void 0;
function rawContent() {
  return "\n### This guide is based on a tutorial on _[generativeartistry](https://generativeartistry.com/tutorials/triangular-mesh/)_ by [maxwellito](https://maxwellito.com/)\n\n---\n\n<img src=\"https://cloud-fxnwjivpd-hack-club-bot.vercel.app/0image__1_.png\" width=\"512\"/>\n\nWe'll build the above mesh like this:\n\n- First, generate a grid of points, where every other line is slightly offset\n- Next, offset each point according to some noise\n- Then, we iterate through that grid, drawing triangles at every 3 points\n\n### Let's start with some code\n\nFirst, create a turtle:\n`const t = new Turtle();`\n\nNext, let's define a scale for the whole image:\n`const size = 80`\n\nThen, we can create a grid. This is identical to a typical rectangular grid, except we offset every other line by a bit, making it triangular.\n\n```\nvar line, dot,\n    odd = false,\n    lines = [],\n    gap = 1;\n\nfor(var y = gap / 2; y <= size; y+= gap) {\n  odd = !odd;\n  line = [];\n  for(var x = gap / 4; x <= size; x+= gap) {\n    dot = {x: x + (odd ? gap/2 : 0), y: y};\n```\n\nThen, use the built-in haxidraw noise function to offset the points again, this time randomly. Also, add an offset on the x axis if we're drawing an odd-numbered line.\n\n```\n    let n = noise([x * 0.1, y * 0.1])\n    line.push({\n      x: x + (n*4.1 - .4) * gap  + (odd ? gap/2 : 0),\n      y: y + (n*6.9 - .4) * gap\n    });\n  }\n  lines.push(line);\n}\n```\n\nNow, we need a way to draw this. We can define a simple function to render a triange, where we simply go through every point of the triangle with the turtle `goto` function.\n\n```\nfunction drawTriangle(pointA, pointB, pointC) {\n  t.goto([pointA.x, pointA.y]);\n  t.down()\n  t.goto([pointB.x, pointB.y]);\n  t.goto([pointC.x, pointC.y]);\n  t.goto([pointA.x, pointA.y]);\n  t.up()\n}\n```\n\nNow, to draw the whole mesh, we can iterate through the points, drawing triangles at every 3 points next to each other in 2D.\n\n```\nvar dotLine;\nodd = true;\n\nfor(var y = 0; y < lines.length - 1; y++) {\n  odd = !odd;\n  dotLine = [];\n  for(var i = 0; i < lines[y].length; i++) {\n    dotLine.push(odd ? lines[y][i]   : lines[y+1][i]);\n    dotLine.push(odd ? lines[y+1][i] : lines[y][i]);\n  }\n  for(var i = 0; i < dotLine.length - 2; i++) {\n    drawTriangle(dotLine[i], dotLine[i+1], dotLine[i+2]);\n  }\n}\n\ndrawTurtles(t)\n```\n\nAnd, that's it! If all went well, you should have an image resembling the one at the start of the guide.\n";
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 3, "slug": "this-guide-is-based-on-a-tutorial-on-generativeartistry-by-maxwellito", "text": "This guide is based on a tutorial on generativeartistry by maxwellito" }, { "depth": 3, "slug": "lets-start-with-some-code", "text": "Let’s start with some code" }];
}
async function Content() {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;
  const contentFragment = createVNode(Fragment, { "set:html": html });
  return contentFragment;
}
Content[Symbol.for("astro.needsHeadRendering")] = true;
export {
  Content,
  compiledContent,
  Content as default,
  file,
  frontmatter,
  getHeadings,
  images,
  rawContent,
  url
};
