# 10PRINT
## Beginner, 25min

"10PRINT" is one of the oldest and most well-known examples of generative art. It was originally created for the Commodore 64 in BASIC, and the code looked like this:
`10 PRINT CHR$(205.5+RND(1)); : GOTO 10`
From just that one line, the following intricate pattern is be created:
![](https://elmcip.net/sites/default/files/media/work/images/the_ppg256_article_image.png)
There's even a book named after this program: [10print.org](https://10print.org/)

So, how does it work? 

At each square, a line is randomly drawn: either a forward or backward slash. It's that simple. The original artwork creates the slashes by directly writing the characters "/" and "\\" as text, but we'll have to draw them out as lines in the Haxidraw editor.

Let's start by defining a constant `t`: this will represent our turtle. The turtle is basically our pen - we can send it instructions like `t.up()` or `t.goto([x,y])` to move it around.
```
const t = new Turtle();
```
Now, we can declare two more constants. It'll be useful to have things like the size of our final image as constants, because then we can easily change them later in the code to tweak the final image. The step constant just dictates how far apart each slash of our drawing should be. A lower step value means the pattern is more detailed, but you can change this value to whatever you want.
```
const size = 10;
const step = 0.5;
```
Now, we can get to building up the artwork. To be able to draw each line, we can create a `draw` function. This is a block of code that takes in 4 parameters: The x and y position to draw to, along with the width and height of the slash we're going to draw. 
```
function draw(x, y, width, height) {
```
First, randomly choose whether to draw a forwards or backwards slash. This can be code by calling `Math.random()` - a function that returns a random number between 0 and 1. If it's greater than 0.5, (this will be true 50% of the time), we draw a backslash.
```
  if(Math.random() >= 0.5) {
```
To actually draw the slash, we need to give the turtle a few instructions. Start by raising the pen with `t.up()`, then go to our start position at `x, y`. Lower the pen, and move to the bottom-right a little bit, by adding `width` and `height` to the turtle position.
```
    t.up();
    t.goto([x, y]);
    t.down();
    t.goto([x + width, y + height]);    
```
If the random number was instead below 0.5, then we can draw a forward slash. This is done in an `else` statement:
```
  } else {
```
Raise the pen, but this time, start out a bit to the right of `x, y`. Lower the pen, and then move down by `height` from `x, y`. That's a forward slash!
```
    t.up();
    t.goto([x + width, y]);
    t.down();
    t.goto([x, y + height]);
  }
}
```
We've finished the drawing function, but we still need to call it. To run some code repeatedly, we use a for loop.

While the variable `x` is less than `size`, add `step` to it, and run the code in the curly brackets.
```
for (let x = 0; x < size; x += step) {
```
At each `x` column, go through every `y` value, draw a slash there by calling our `draw` function at the current `x` and `y` position.
```
  for (let y = 0; y < size; y += step) {
    draw(x, y, step, step);    
  }
}
```
And, lastly, let's draw this to the screen! This is done simply by calling the function `drawTurtles()` with the turtle we defined at the start.

`drawTurtles(t);`

And, you're done! If all went well, you should be seeing something like the below art:
![https://cloud-e0wpk8chk-hack-club-bot.vercel.app/0image.png](https://cloud-e0wpk8chk-hack-club-bot.vercel.app/0image.png)
Good work! If you feel like it, you can still go farther though. Here are a few ways to experiment with this art:
- Change the random threshold from 0.5 to some other number, and see what changes
- Modify the scale and size of the art by tweaking `step` and `size`
- Try making the slashes taller or wider
