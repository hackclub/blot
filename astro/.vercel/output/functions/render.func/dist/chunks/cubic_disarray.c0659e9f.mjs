const id = "cubic_disarray.md";
const collection = "workshops";
const slug = "cubic_disarray";
const body = "\n\n# Cubic Disarray\n\n**_Georg Nees_** was a pioneer of digital art, responsible for interesting works like Cubic Disarray.\n\n<img src=\"https://www.seekingoutside.com/wp-content/uploads/2018/12/Screen-Shot-2018-12-11-at-3.40.46-AM-480x670.png\" width=\"512\"/>\n\nLet's try to recreate this in the Haxidraw editor. A good first step to reverse engineering any artwork is to break it down into the obvious components. There's a grid of squares, and the squares closer to the bottom seem to be rotated more and more.\n\nWe can get started by setting up a turtle, and define some constants:\n\n```js\nconst t = createTurtle();\ndrawTurtles(t);\n\nconst size = 10;\nconst squareSize = 1;\n```\n\nObviously we'll need a way to draw these rotated squares, so let's define a function for that:\n\n```js\nfunction draw(x, y, width, height, theta) {\n  t.up()\n  let startX = x - height/2\n  let startY = y - height/2\n\n  t.goto(rotatePoints(x, y, startX, startY, theta))\n  t.down()\n  t.goto(rotatePoints(x, y, startX + width, startY, theta))\n  t.goto(rotatePoints(x, y, startX + width, startY + height, theta))\n  t.goto(rotatePoints(x, y, startX, startY + height, theta))\n  t.goto(rotatePoints(x, y, startX, startY, theta))\n  t.up()\n}\n```\n\nThis function takes in a `x`, `y` position, along with a `width` and `height` for the square. Lastly, we'll want a `theta` to rotate the points by. The function works by creating a square path, and rotating it around the center by a given amount. We still need to define how to do this rotation, though.\n\nThis can be done using the sine and cosine functions. They decompose a given angle into an x and y component, which we can use to preform the rotation. The function takes in:\n\n- An origin x and y to rotate around\n- The x and y to rotate\n- The angle to rotate by\n\nIt then returns the rotated points as an array.\n\n```js\nfunction rotatePoints(ox, oy, x, y, theta) {\n    let dx = x - ox\n    let dy = y - oy\n    let newX = dx * Math.cos(theta) - dy * Math.sin(theta)\n    let newY = dx * Math.sin(theta) + dy * Math.cos(theta)\n    return [newX + ox, newY + oy]\n}\n```\n\nGreat, we're almost done! Now it's down to simply drawing the grid. Loop over every x and y in some range, and draw a square there. We rotate them by a random amount, scaled proportional to how low the square is on the screen.\n\n```js\nfor (let x = 0; x < size; x++) {\n  for (let y = 0; y < size; y++) {\n    draw(x, y, squareSize, squareSize, (Math.random()-0.5) * ((10-y)/10))\n  }\n}\n```\n\nAnd, you're done! The final result should look something like this in the editor:\n\n<img src=\"https://cloud-ot8pxbd0h-hack-club-bot.vercel.app/0image.png\" width=\"512\"/>\n";
const data = { title: "Cubic Disarray", description: "**_Georg Nees_** was a pioneer of digital art, responsible for interesting works like Cubic Disarray.\n", thumbnail: "https://www.seekingoutside.com/wp-content/uploads/2018/12/Screen-Shot-2018-12-11-at-3.40.46-AM-480x670.png" };
const _internal = {
  type: "content",
  filePath: "/Users/jchen/Documents/Programming/prs/haxidraw/astro/src/content/workshops/cubic_disarray.md",
  rawData: "\ntitle: Cubic Disarray\ndescription: >\n  **_Georg Nees_** was a pioneer of digital art, responsible for interesting works like Cubic Disarray.\nthumbnail: https://www.seekingoutside.com/wp-content/uploads/2018/12/Screen-Shot-2018-12-11-at-3.40.46-AM-480x670.png"
};
export {
  _internal,
  body,
  collection,
  data,
  id,
  slug
};
