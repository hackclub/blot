
*This tutorial is aimed at beginners, but it works best if you have a little prior programming experience.*

"10PRINT" is one of the oldest and most well-known examples of generative art. It was originally created for the Commodore 64 in BASIC, and the code looked like this:
```basic
10 PRINT CHR$(205.5+RND(1)); : GOTO 10
```
From just that one line, the following intricate pattern is be created:

<img src="https://elmcip.net/sites/default/files/media/work/images/the_ppg256_article_image.png"  width="512px">

There's even a book named after this program: [10print.org](https://10print.org/)! For this guide, let's try to replicate this artwork for ***Haxidraw***. (This tutorial works fine if you don't have one!)

A Haxidraw is a small drawing robot that can be programed from a browser. You send it instructions through code, and it follows those instructions to create a drawing. By the end of this guide, you will have created some art that can be drawn by the machine!

<img src="https://cloud-imp7l9zfa-hack-club-bot.vercel.app/0232548454-cfc5bbb6-f242-43a8-bbec-d573518cc505.jpg" width="512px">

<img src="https://cloud-gal4nsl32-hack-club-bot.vercel.app/0image.png" width="512px">
Here are some examples of art people have made with Haxidraw:


<img src="https://github.com/hackclub/haxidraw/blob/main/art/landscape-henry/snapshots/landscape.png?raw=true" width="512px">

<img src="https://github.com/hackclub/haxidraw/blob/main/art/roots-kai/snapshots/roots.png?raw=true" width="512px">

<img src="https://github.com/hackclub/haxidraw/blob/main/art/tidal-flats-leo/snapshots/tidalFlats.png?raw=true" width="512px">

The artwork seems to be a grid of slashes. Some slashes point to to the top-right, others point to the bottom-right. Overall, the distribution seems to be about 50/50. If you look closely, you might notice that the slashes are just plain text: "/" or "\\". In fact, the Commodore program just prints a random sequence of characters to the screen, left to right. The challenge is, in the Haxidraw editor, you can't write symbols directly to the screen - we'll have to draw the slashes as lines.

Let's start by defining a constant `t`: this will represent our turtle. The turtle is basically our pen - we can send it instructions like `t.up()` or `t.goto([x,y])` to move it around. For example, calling `t.down()` places the pen on the paper, and `t.goto([0, 0])` moves the pen to the position `0, 0`.

```js
const t = createTurtle();
```
Directly below that, write `drawTurtles(t);`. This function makes it so that we can see the turtle's path in the preview window as we add to it.

Since the original artwork is made up of many diagonal lines, we'll need a function that can draw these. 

```js
function drawSlash(x, y, width, height) {
		t.up();
    t.goto([x, y]);
    t.down();
    t.goto([x + width, y + height]);
}
```
When we call this function, you should see a small slash in a corner of the screen.
```
drawSlash(0, 0, 10, 10);
```
<img src="https://cloud-8v0w01f9r-hack-club-bot.vercel.app/0image.png" width="512px">

We can draw more by using a `for` loop.

```js
for (let i = 0; i < 10; i++) {
  drawSlash(0, 0, 12, 12);
}
```

You'll still only see one, because they all overlap. We can draw more by moving the slash to the right each time we loop.

```js
drawSlash(0 + i, 0, 12, 12);
```

<img src="https://cloud-q034t1mck-hack-club-bot.vercel.app/0image.png" width="512px">

That's a start, but they're too close together. We want them to be evenly spaced out in a grid.

```js
const gridCellSize = 12;
for (let i = 0; i < 10; i++) {
  drawSlash(i * gridCellSize, 0, 12, 12);
}
```
<img src="https://cloud-gx75sdvws-hack-club-bot.vercel.app/0image.png" width="512px">

Now, let's do the same, but on the `y` axis.
```js
const gridCellSize = 12;
for (let i = 0; i < 10; i++) {
	for (let j = 0; j < 10; j++) {
	  drawSlash(i * gridCellSize, j * gridCellSize, 	gridCellSize, gridCellSize);
    }
}

```
<img src="https://cloud-ivwz75d5q-hack-club-bot.vercel.app/0image.png" width="512px">
The lines don't quite reach the edge of the screen, though. Try changing `gridCellSize` until it fits.

<img src="https://cloud-3n0g15soa-hack-club-bot.vercel.app/0image.png" width="512px">

We're getting close, but all the lines still face in the same direction. Going back to `drawSlash`, try flipping the lines we draw horizontally, making them face the other way.

<img src="https://cloud-7ho7ggvxw-hack-club-bot.vercel.app/0image.png" width="512px">

In the original 10PRINT artwork, the lines can face in either direction randomly. By calling the `rand()` function built into Haxidraw, we can randomly swap between the two line styles.

Since `rand()` returns a number between 0 and 1, 50% of the time it's going to be over 0.5.
```js
function drawSlash(x, y, width, height) {
    if (rand() > 0.5) {
      t.up();
      t.goto([x + width, y]);
      t.down();
      t.goto([x, y + height]);
    } else {
      t.up();
      t.goto([x, y]);
      t.down();
      t.goto([x + width, y + height]);
    }
}
```
Good work!

<img src="https://cloud-hu9gaiddg-hack-club-bot.vercel.app/0image.png" width="512px">
If we change 0.5 to something lower, we see more of one type of line than another.

<img src="https://cloud-bjalbh40g-hack-club-bot.vercel.app/0image.png" width="512px">
# Further experimentation
- Try making the grid more dense, while keeping it the same size on the screen
- Change the line to something else
