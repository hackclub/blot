/*
@title: LaTeXWriter
@author: Kosei Tsukamoto
@snapshot: example1.png
*/

/*
This program parses a subset of latex to write math out with polylines
- The latex parser was all written by me (Kosei)
- It supports:
  - numbers
  - + - * / ^
  - \sqrt{}, \int, \times, \cdot, \frac{}{}, 
  - letters
- Impactful and useful since it is something that I and some
of my friends will actually use for practicing
- Infinite possibilites! Technically complex (took 10+ hours, see code lol) and visually engaging
- It is as efficient as I could make it (speed of drawing finish)
- To use it, comment out the "random expression" section
and input your own latex! Just use the
renderLatex(yourLatexStringHere) function call!
- https://blog.writefull.com/the-100-most-frequent-latex-commands/
*/


const width = 125;
const height = 125;

setDocDimensions(width, height);



// RANDOM EXPRESSION SECTION START (this code is for demo purposes only)

{
const DEMO_N = 2; // SET THIS TO CHANGE DEMO: (1 = random generated integrals, 2 = all features)

if (DEMO_N == 1) {
// renderLatex(String.raw`b \int c \sqrt{b}f \times g \cdot e \frac{a}{b}c+-*/^dmmogus`);
{
  renderLatex(String.raw`\int x \sqrt{x^2 + \sqrt{2 + 2\sqrt{2}}} dx`, [10, 5]);
  renderLatex(String.raw`latex\,\, renderer \,\, (demo1)
infinite \,\, possibilities!`, [5, 115]);
}
{
  // U SUB
  let pn = []; // random polynomial
  let pn2 = []; // polynomial for u sub!
  let pd = bt.randIntInRange(2, 4);
  for (let i = pd; i > 0; i--) {
    let n = bt.randIntInRange(1, 9);
    pn.push(n + 'x' + (i == 1 ? '' : '^' + i));
    pn2.push(n * i + (i == 1 ? '' : 'x') + (i - 1 <= 1 ? '' : '^' + (i - 1)));
  }
  renderLatex(String.raw`u-sub
\int (${pn2.join('+')})
  \times\sqrt{${pn.join('+')}} \, dx`, [10, 88]); // random integral
}
{
  // PARTIAL FRACTION DECOMP
  let pn1 = [bt.randIntInRange(1, 9) + 'x', bt.randIntInRange(1, 9)]; // random polynomial
  let pn2 = [bt.randIntInRange(1, 9) + 'x', bt.randIntInRange(1, 9)]; // polynomial for u sub!
  let pn3 = [bt.randIntInRange(1, 9)]
  renderLatex(String.raw`partial \, \, fractions
    \int \frac{${pn3.join('+')}}{(${pn1.join('+')})(${pn2.join('+')})} \, dx`, [10, 55]); // random integral
}
{
  // INTEGRATION BY PARTS
  let pn = []; // random polynomial
  let pd = bt.randIntInRange(1, 3);
  for (let i = pd; i > 0; i--) {
    let n = bt.randIntInRange(1, 9);
    pn.push(n + 'x' + (i == 1 ? '' : '^' + i));
  }
  renderLatex(String.raw`int by parts
\int (${pn.join('+')})\cos (x) \, dx`, [10, 30]); // random integral
}
} else if (DEMO_N == 2) {
  renderLatex(String.raw`latex\,\, renderer v2 \,\, (demo2)`, [2.5, 115]);
  renderLatex(String.raw`fractions \,\, \frac{2x+3}{(x-3)(x+2)}`, [2.5, 105]);
  renderLatex(String.raw`integrals \,\, \int \, xe^x \, dx`, [2.5, 95]);
  renderLatex(String.raw`exponents \,\, 2^2 \cdot 4^2`, [2.5, 85]);
  renderLatex(String.raw`ops \,\, 1+2-3*4/5 \times 6 \cdot 7`, [2.5, 75]);
  renderLatex(String.raw`parens \,\, 2(3(x+4(x+7)))`, [2.5, 65]);
  renderLatex(String.raw`roots \,\, \sqrt{x + 4 \sqrt{x+2}} \times \sqrt{2x+4}`, [2.5, 55]);
  renderLatex(String.raw`nested roots \,\, \sqrt{2x+3\sqrt{4\sqrt{5}\sqrt{6\sqrt{7}}}}`, [2.5, 45]);
  renderLatex(String.raw`nested fractions \,\, \frac{\frac{1+x}{2+2x}}{3+3x}`, [2.5, 35]);
  renderLatex(String.raw`trig \,\, \cos (2) \sin (2)`, [2.5, 25]);
  renderLatex(String.raw`more \,\, calculus \,\, \frac{\, d}{dx}(x+4\int ^x 3 dz)`, [2.5, 15]);
  renderLatex(String.raw`everything \,\, \frac{\, d}{dx} (\int \frac{\frac{xe^x+1*3\cdot 4 \times 3 /2}{1-2(1) \sin 2}}{\sqrt{2+2\sqrt{2}}} dx)`, [2.5, 5]);
}
}

// RANDOM EXPRESSION SECTION END


/*
format: [
  Node (CommandNode || TextNode) {
    type: 'command' || 'text',
    data: 'commandName' || 'textChar',
    body?(only if type=='command'): [Arg [Node {}, ...], ...],
  },
  ...
]
*/
function parseLatex(latex) {
  let parsed = [];
  for (let i = 0; i < latex.length; i++) {
    let s = latex[i];
    if (s == '\\') {
      let o = {
        type: 'command',
        data: null,
        body: [], // array of argument arrays
      };
      let startI = i + 1;
      while (i < latex.length) {
        i++;
        let s = latex[i];
        if (('a' <= s && s <= 'z') || s == ',' || s == '.') {
          // o.data += s;
        } else {
          break;
        }
      }
      o.data = latex.substring(startI, i);

      if (o.data == 'sin' || o.data == 'cos') {
        // just convert to text
        o.type = 'text';
        delete o.body;
      } else {

        while (i < latex.length) {
          let s = latex[i];
          if (s != '{') {
            break;
          }
          let startI = i + 1;
          let nest = 1;
          while (i < latex.length) {
            i++;
            let s = latex[i];
            if (s == '{') {
              nest++;
            } else if (s == '}') {
              nest--;
              if (nest == 0) {
                break;
              }
            }
          }
          o.body.push(parseLatex(latex.substring(startI, i)));
          i++;
        }
      }
      i--;

      parsed.push(o);
    } else if (s == ' ') {
      // whitespace, do nothing
    } else if (s == '^') {
      // exponent (command with optional brackets)
      i++;
      let startI = i;
      if (latex[i] == '{') {
        let nest = 1;
        while (i < latex.length) {
          i++;
          let s = latex[i];
          if (s == '{') {
            nest++;
          } else if (s == '}') {
            nest--;
            if (nest == 0) {
              break;
            }
          }
        }
      } else {
        i++;
      }
      
      let o = {
        type: 'command',
        data: s,
        body: [parseLatex(latex.substring(startI, i))], // array of argument arrays
      };

      parsed.push(o);
      i--;
    } else if (s == '\n') {
      let o = {
        type: 'command',
        data: s,
        body: null
      };
      parsed.push(o);
    } else {
      let startI = i;
      while (i < latex.length) {
        i++;
        let s = latex[i];
        if (s == '\\' || s == ' ' || s == '^' || s == '\n') {
          break;
        }
      }
      parsed.push({
        type: 'text',
        data: latex.substring(startI, i),
      });
      i--;
    }
  }
  return parsed;
}

function renderParsed(parsed, originalOrigin, scale, spacingV, drawNothing = false) {
  let origin = [...originalOrigin]; // clone origin since it will be mutated
  // console.log(origin)

  let spacing = spacingV[0];
  let spacingY = spacingV[1];

  const textSize = 2; // size of text only (still needs to be multiplied with scale)
  const spacingSize = spacing - textSize; // size of spacing only (still needs to be multiplied with scale)
  const textSizeY = 4; // size of text y (still needs to be multiplied with scale)

  const lines = [];
  for (let i = 0; i < parsed.length; i++) {
    let p = parsed[i];
    if (p.type == 'command') {
      switch (p.data) {
        case 'times': {
          lines.push([
            [origin[0] + (spacingSize) * scale, origin[1] + (spacingSize) * scale],
            [origin[0] + (spacingSize * 3 + textSize) * scale, origin[1] + (textSize + spacingSize * 3) * scale],
          ], [
            [origin[0] + (spacingSize) * scale, origin[1] + (textSize + spacingSize * 3) * scale],
            [origin[0] + (spacingSize * 3 + textSize) * scale, origin[1] + (spacingSize) * scale],
          ]);
          origin[0] += (spacing + spacingSize * 4) * scale;
          break;
        }
        case 'cdot': {
          const t = new bt.Turtle();
          let r = 0.25;
          for (let i = 0; i < 5; i++) {
            t.jump([origin[0] + (spacingSize * 1 + textSize / 2) * scale, origin[1] + (textSizeY / 2 - r) * scale]);
            t.arc(360, r * scale);
            r -= 0.05;
          }
          lines.push(...t.lines());
          origin[0] += (spacing + spacingSize * 2) * scale;
          break;
        }
        case 'int': {
          const t = new bt.Turtle();
          t.jump([origin[0], origin[1]]);
          t.up();
          // t.arc(270, 0.25 * scale);
          t.right(90);
          t.down();
          t.arc(180 - 15, 0.25 * scale);
          t.forward((textSizeY / Math.cos(Math.PI/180 * 15) + 2 * 0.25 * Math.sin(Math.PI/180 * 15)) * scale);
          t.arc(-(180 - 15), 0.25 * scale);
          lines.push(...t.lines());
          origin[0] += (spacing - spacingSize) * scale;
          break;
        }
        case 'sqrt': {


          /*
          // DOESNT WORK FOR NESTED (ENLARGES OUTSIDE)
          let oldOriginX = origin[0];
          origin[0] += 1.5 * scale;
          let newOrigin = renderParsed(p.body[0], origin, scale, spacing);
          const t = new bt.Turtle();
          t.jump([oldOriginX, origin[1]]);
          t.up();
          // t.arc(270, 0.25 * scale);
          t.right(90 - 15);
          t.down();
          t.forward(0.25 * scale);
          t.left(180 - 15 * 2);
          t.forward((textSizeY / Math.cos(Math.PI/180 * 15) + 0.25 * 2) * scale);
          t.right(90 - 15);
          t.forward(newOrigin[0] - origin[0]);
          lines.push(...t.lines());
          */

          // SHRINKS INSIDE
          let oldOriginX = origin[0];
          origin[0] += 1.5 * scale;
          let newScale = scale / 1.1;
          let newOrigin = renderParsed(p.body[0], origin, newScale, spacingV, drawNothing);
          const t = new bt.Turtle();
          t.jump([oldOriginX, origin[1]]);
          t.up();
          // t.arc(270, 0.25 * scale);
          t.right(90 - 15);
          t.down();
          t.forward(0.25 * scale);
          t.left(180 - 15 * 2);
          t.forward((textSizeY / Math.cos(Math.PI/180 * 15) + 0.25) * scale);
          t.right(90 - 15);
          t.forward(newOrigin[0] - origin[0]);
          lines.push(...t.lines());

          origin = newOrigin;
          break;
        }
        case 'frac': {
          let newScale = scale / 2.1;

          // New: slower but recursively render first to get size so we can center
          let bottomOrigin = renderParsed(p.body[1], [origin[0] + spacingSize / 2 * scale, origin[1]], newScale, spacingV, true);
          let topOrigin = renderParsed(p.body[0], [origin[0] + spacingSize / 2 * scale, origin[1] + (textSizeY) * (scale / 2 + scale / 2 - scale / 2.1)], newScale, spacingV, true);
          let bottomWidth = bottomOrigin[0] - origin[0];
          let topWidth = topOrigin[0] - origin[0];
          let bottomOffset = 0;
          let topOffset = 0;
          if (topWidth > bottomWidth) {
            // center bottom
            bottomOffset = (topWidth - bottomWidth) / 2;
          } else {
            // center top
            topOffset = (bottomWidth - topWidth) / 2;
          }
          
          renderParsed(p.body[1], [origin[0] + spacingSize / 2 * scale + bottomOffset, origin[1]], newScale, spacingV, drawNothing);
          renderParsed(p.body[0], [origin[0] + spacingSize / 2 * scale + topOffset, origin[1] + (textSizeY) * (scale / 2 + scale / 2 - scale / 2.1)], newScale, spacingV, drawNothing);

          // Old: faster but no center
          /*
          renderParsed(p.body[1], [origin[0] + spacingSize / 2 * scale, origin[1]], newScale, spacingV);
          renderParsed(p.body[0], [origin[0] + spacingSize / 2 * scale, origin[1] + (textSizeY) * (scale / 2 + scale / 2 - scale / 2.1)], newScale, spacingV);
          */

          const t = new bt.Turtle();
          t.jump([origin[0], origin[1] + textSizeY / 2 * scale]);
          let newOrigin = [Math.max(bottomOrigin[0], topOrigin[0]) - (spacingSize * newScale) + spacingSize / 2 * scale, origin[1]];
          t.forward(newOrigin[0] - origin[0]);
          lines.push(...t.lines());

          newOrigin[0] += spacingSize * scale;
          origin = newOrigin;
          break;
        }
        case '^': {
          // old
          /*
          let newScale = scale / 2;
          let newOrigin = renderParsed(p.body[0], [origin[0], origin[1] + textSizeY * scale - (textSizeY / 2) * newScale], newScale, spacing);

          origin = [newOrigin[0] - spacingSize * newScale + spacingSize * scale, origin[1]];
          */

          // keep consistent height for roots!
          let newScale = scale / 2;
          let newOrigin = renderParsed(p.body[0], [origin[0], origin[1] + textSizeY * scale - (textSizeY) * newScale], newScale, spacingV, drawNothing);

          origin = [newOrigin[0] - spacingSize * newScale + spacingSize * scale, origin[1]];
          break;
        }
        case '\n': {
          origin[1] -= spacingY * scale;
          origin[0] = originalOrigin[0];
          break;
        }
        case ',': {
          origin[0] += spacingSize * 2 * scale;
          break;
        }
        case '.': {
          origin[0] += spacingSize * scale;
          break;
        }
        default: {
          console.log(p.data + ' not implemented yet');
        }
      }
    } else if (p.type == 'text') {
      let d = p.data;
      lines.push(...bt.text(d, origin, scale))
      origin[0] += spacing * scale * d.length;
    }
  }
  
  // 3. draw
  if (!drawNothing) {
    drawLines(lines);
  }

  return origin;
}

function renderLatex(latex, originalOrigin = [10, 10], scale = 2, spacing = [2.5, 4.5]) {
  // 1. parse latex
  let parsed = parseLatex(latex);

  // 2. draw
  return renderParsed(parsed, originalOrigin, scale, spacing);
}
