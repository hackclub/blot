# Joy Division Album Cover

Here's the cover to Joy Division's first album. The actual album is based on [real data](https://blogs.scientificamerican.com/sa-visual/pop-culture-pulsar-origin-story-of-joy-division-s-unknown-pleasures-album-cover-video/), but we'll try to make a simpler version.

<img src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-PkgzZc0jsVE%2FUMqYzFOzNLI%2FAAAAAAAAA3A%2FbCOqig095Lk%2Fs1600%2Fjoy_division-unknown_pleasures.jpg&f=1&nofb=1&ipt=966d8be0c759bd539613c5eaa7b35acc898bd99a43d050df6c9df643367314dc&ipo=images" width="512"/>

First, let's start by noticing what we see in the image. It seems to be composed of several horizontal lines, each vertically distorted randomly. More specifically, the distortion closer to the center is more extreme, while it's flattened farther out. There's also another, smaller amount of random distortion evenly distributed across each line.

Let's give this a shot! First, simply declare a turtle, and draw it's path to the screen:
```
const t = new Turtle();
drawTurtles(t);
```
To actually get it to draw something, we can iterate through a grid, drawing horizontal lines:

```
const height = 13;
const lineWidth = 10;
const lineSpacing = 0.2;
const dx = 0.005;

for (let line = 0; line < height; line += lineSpacing) {
  for (let x = -lineWidth/2; x < lineWidth/2; x += dx) {
    let height = line;
    if (x == -lineWidth/2) t.up();
    t.goto(
      [x, height]
    );
    t.down();
  }
}
```

Each line is spaced vertically by `lineSpacing`, and composed of many line segments, each with length `dx`.  We lift the turtle with `t.up()` at the start of each line to break up the path into horizontal strips.

You should now be seeing a bunch of straight horizontal lines. Let's add some randomness!

A first attempt may look something like this:
```
let height = Math.random();
```

You'll quickly notice that this doesn't look too good - the offset is *too* random. A good compromise is smooth noise. This kind of noise is random on large scales, but smooth when looked at close up. It's good for natural-looking curves, and matches the randomness seen on the Joy Division album cover.

We can call this in the Haxidraw editor with `noise([x, y], {octaves:n, falloff:k})`. The octaves dictate how intricate this noise is, and the falloff dictates how much the small scale detail should affect the final value. 

We don't want pure smooth noise, and we'll instead want to modify how we sample it a bit. Set `height` equal to `line + sampleNoise(x, line)`, and define that function:

```
const baseNoiseHorizontalScale = 1.5;
const baseNoiseVerticalScale = 10;
const baseNoiseAmp = 0.1;

const addedNoiseScale = 3.2;
const addedNoiseAmp = 0.2;

function sampleNoise(x, y) {
  let baseNoise = (
	  baseNoiseAmp * 
	  Math.pow(distFromCenter(x), 2) *
	  noise([x * baseNoiseHorizontalScale + 14, y * baseNoiseVerticalScale], {octaves:2})
  );
  let addedNoise = addedNoiseAmp * noise([x * addedNoiseScale - 17, y], {octaves:2})
  return baseNoise + addedNoise
}
```

This function takes in a x and y, and returns some modified noise at that position. We can break the noise seen in the album cover down into 2 layers:
- Base noise: This is stronger when closer to the center, and weaker farther way. It appears to be quite smooth
- Added noise: This is more random, and distributed evenly across the whole image

We define a few constants to dictate how vertically and horizontally stretched both layers of noise should be, along with a final amplitude.

Notice that when defining the base noise, we use a function `distFromCenter`. We'll have to define this as such:

```
function distFromCenter(x) {
  return lineWidth/2 - Math.abs(x)
}
```

When incorporating this distance into the base noise, we also square the value. This simply leads to a slightly nicer looking height distribution.

This looks close to the final product, but there's still one big thing that it's missing. Lines can overlap with each other, which really doesn't make sense. What we need is *occlusion*. This means that lines closer to the front of the screen hide lines behind them. There's a quick and hacky way to do this:

- Store an array corresponding to the maximum height so far in each vertical column
- Only draw a line when it's higher than the previous max height
- If it's the new highest, set corresponding point in the array to it's height

Create the array, and fill it with zeroes:
```
let maxHeights = new Array(lineWidth / dx);
```

Above the line `if (x == -lineWidth/2) t.up();` in our main loop, add the following logic doing what we outlined earlier:
```
    let maxHeightsIndex = Math.floor((x + lineWidth/2) / dx)
   if (height > maxHeights[maxHeightsIndex]) {
      t.down()
      maxHeights[maxHeightsIndex] = height
    } else {
      t.up()
    }
```

The occlusion works best when `dx` is really low.

And that's it, you're done! When drawing the final image, you should see something like this:

<img src="https://cloud-osfrnfrf2-hack-club-bot.vercel.app/0image.png" width="512"/>