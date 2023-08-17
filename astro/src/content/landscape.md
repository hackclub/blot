---
title: Landscape
description: >
  This is an explainer on how to create art like the image above in the [Haxidraw editor](https://haxidraw.hackclub.dev/). It assumes some knowledge of programming in JavaScript and how Haxidraw works, but nothing beyond that.
---

# Draw a landscape in Haxidraw with noise

### (Intermediate, ~45 min, by Henry Bass)

<img src="https://cloud-gfjjr08b1-hack-club-bot.vercel.app/0image.png" width="512"/>

This is an explainer on how to create art like the image above in the [Haxidraw editor](https://haxidraw.hackclub.dev/). It assumes some knowledge of programming in JavaScript and how Haxidraw works, but nothing beyond that.

#### Steps:

- Create a height-map
- Draw it
- Add occlusion
- Make it look nice

## Creating a height-map

To try and create realistic terrain, we should first look at the real thing. Here's a map of some hills in Canada:

<img src="https://cloud-g5b83d93q-hack-club-bot.vercel.app/0image.png" width="512"/>
Notice that, although the terrain is complex, it looks somewhat random. There's also seemingly random detail at both large and small scales, from massive hills to small bumps.

To replicate this in code, a technique is used called Fractal Noise. A reasonable first step would be to start out with pure randomness.

Here's an image made up of large pixels of completely random brightness:

<img src="https://cloud-fgexi20ng-hack-club-bot.vercel.app/0test.png" width="512"/>

Real terrain, of course, isn't made up of large squares. To get closer to the real thing, we can blur this image to make it smoother.

<img src="https://cloud-i3ygpagk6-hack-club-bot.vercel.app/0test1.png" width="512"/>

This is much closer, but it's missing an essential aspect: Detail. Hills on a large scale resemble our image, but that resemblance breaks when we look closer. Conveniently though, the detail at both large and small scales looks pretty similar. So to capture this, we can try adding together our random noise on different scales. Each time, we decrease the amplitude of the noise and the blur radius ("Sigma"), while increasing the frequency.

<img src="https://cloud-oidzg4hcv-hack-club-bot.vercel.app/0untitled_drawing__5_.png" width="512"/>

That looks a lot closer! As a note, the amount we change the frequency, amplitude, and blur with respect to each octave is arbitrary, and tweaking those functions can lead to interesting variations of our noise. The name of this technique is: *Fractal Noise*.

In fact, the Haxidraw editor actually has a function for fractal noise built in!

```js
// y and z are optional
noise(
  [
    x: number,
    y: number,
    z: number
  ],
  {
    octaves = 4,
    falloff = 0.5
  }
)
```

We can sample a fractal noise function at any x and y by calling `noise([x, y])`. By default, this calculates fractal noise with 4 octaves and a 50% decrease in amplitude for each, but you can change this as needed. Now that we have the function, let's turn this into height.

## Drawing the noise

First, we can initialize a new Turtle with `const t = new Turtle()`.

Then, iterate over all the points within some area, such as 0 < y < 15 and 0 < x < 10, moving by a small value `dx` and `dy` each time.

```js
const dx = Some small number
const dy = Vertical spacing between lines
const noise_x_scale = How horizontally stretched the noise is
const noise_y_scale = How vertically stretched the noise is
const noise_amp = The height scale of the terrain

function getHeight(x, y) {
	return noise(
	[x * noise_x_scale, y * noise_y_scale]
	) * noise_amp
}

for (let y = 0; y < 15; y += dy) {
	for (let x = 0; x < 10; x += dx) {
		height = getHeight(x, y)
	 }
}
```

Using the `t.goto([x, y])` function in Haxidraw, we can create straight lines. If we want to replicate a smooth curve, we have to use many `goto` commands with very small changes in the x and y.

If we just call `t.goto([x, y])` at every x and y in our loop, we'll get straight lines. Instead, let's add the noise height to this, with `t.goto([x, y + height])`.

Using `drawTurtles(t)` at the end, we can visualize the path.
You may notice that there's a straight line between the start and end of each path. This is because the pen is still down when we start a new line, and it can be solved by simply raising the pen if we're going to the first point of a new line.

If all goes well, you should see many rough lines, that look something like this:

<img src="https://cloud-2d1gm9q2d-hack-club-bot.vercel.app/0image.png" width="512"/>

To give the appearance that we're looking at this from the side, we can divide the y value by 2 or 3 in each `goto` command. This will shrink the terrain vertically, but leave the hill height the same.

This is starting to look like mountains! If we want to make these look more like islands instead, we'd need to cut off the noise below a given height, and replace it with flat-looking water. By returning `Math.max(height, sea_level)` in our `getHeight` function, only the larger of the two values will be returned. This means we'll see a line at sea level whenever the noise height is below it.

That water still looks a bit boring, though! Trigonometric functions like `Math.sin()` and `Math.cos()` are great for creating wave-like patterns. If we add the sine of the x value to the sea level, the water will be higher and lower in a wave-like pattern. Going further, by offsetting the input to the sine function by another wave, such as the cosine of the y value, the waves will sway side to side depending on how far up in the image they are. If you're not following along with why this works, try tweaking constants and scaling the waves in various ways to gain an intuition for what each part of the code contributes to the output.

```js
sea_level = default_wave_height + (
	wave_height *
	Math.sin(
		(x + Math.cos(y * offset_freq)
	) * wave_freq)
)
```

Of course, for this code, you'd need to set actual values to all the variables mentioned. By now, you'll probably have something that looks like this:

<img src="https://cloud-nngt3uf5z-hack-club-bot.vercel.app/0image.png" width="512"/>

Most of the hard work is done by now! But, you might be noticing a big problem with how this all looks, especially with high enough mountains. We can see through the terrain in some places! Because we're just 2D drawing lines that _look_ 3D, paths in "front" of others won't block paths that are "behind". To solve this, we need something called **occlusion**.

## Adding occlusion

Occlusion can be tricky, so it'll help to break down the problem a bit.

Our problem:

> If an line is in **front** of another, and the other line goes **under** it, it should be **invisible**

Let's define some of those phrases in the context of our code:

> **Front**: Lines that we draw earlier in our loop along the y axis are the ones that should be occluding others
> **Under**: If a line has the same x value as another but a lower y value, it's under it
> **Invisible**: We should raise the pen before moving to it

So, we need to remember where the previous lines in the same x column are, to check if our current line is in front. Actually, we only need to store the maximum y value in our column, because there's no need to occlude behind a line when there's another higher one.

We can store these values simply using an array where each index corresponds to some x value we'll stop at:
`let maxHeights = Array(Math.floor(screen_width/dx)).fill(0)`

Now, for each point, we can check if we're below the previous maximum y value, with `if (height + y/3 > maxHeights[Math.floor(x/dx)])`. If so, simply set our current height to be the new maximum at this `maxHeights` index, and draw. Otherwise, raise the pen.

`dx` has to be lowered a lot after this, because otherwise there's a lot of obvious artifacts.

Once that's implemented, the image will look more like this:

<img src="https://cloud-lp7dkev90-hack-club-bot.vercel.app/0image.png" width="512"/>

If you compare that to the image before occlusion, you'll see the difference. Now, we're almost done! The image still looks a bit too much like just noise, and we can go farther to make it look like real islands.

## Making it look nice

An easy fix would be to add some perspective. This can be done by shrinking hills proportionally to their distance. Simply divide the height by y plus some number: `(y + perspective_offset)` at the end of the `getHeight` function. We need to add that extra value to y because 1/x is asymptotic at 0, and we want to avoid the infinity. In 3D, you can think of this as moving backward some distance from the first hill. This change will probably have to be counteracted by changing the sea level and default hill height, because we're shrinking distant hills so much.

We're really close to a complete image, but there's a one more thing we can add to really make the image look nicer: trees.

Trees generally grow a good distance above sea level, and they're pretty random in height. Luckily for us, trees can be easily approximated as straight lines from far enough away. Simply create a `drawTree(x, y)` function, that creates a vertical line like this:

```js
size = tree_size * Math.random() + (size/2)
  t.goto([x, y])
  t.goto([x, y+size])
  t.up()
  t.goto([x, y])
```

Then, we should only call this if `Math.random() > tree_prob && height * (y + perspective_offset) > tree_line`. We multiply by `(y + perspective_offset)` to cancel out the division back in the `getHeight` function, and ignore perspective. With all this done, you'll have a nice looking landscape, generated 100% from code. Great job!

<img src="https://cloud-gfjjr08b1-hack-club-bot.vercel.app/0image.png" width="512"/>

## More experimentation

- Try tweaking all the parameters, and see if you can create different types of environments.
- What happens if we use a different noise function?
- The way we implemented perspective only shrinks distant hills vertically. See what happens if you decrease the horizontal noise scale as the hills get farther away, and try using that for more realistic perspective.
- Add more decorations! We've added trees, but you could also add houses, rocks, or anything.

## The code

I've avoided giving away too much code, as it's more fun to work through some of the potential problems yourself, but if you get stuck somewhere along the guide, you can reference this:

```js
const t = new Turtle()

const dx = 0.005
const dy = 0.26
const noise_x_scale = 0.4
const noise_y_scale = 0.6
const noise_amp = 28.2

const wave_height = 0.052
const offset_freq = -1.3
const wave_freq = 16.5
const default_wave_height = 11
const tree_size = 0.04

let maxHeights = Array(Math.floor(10/dx)).fill(0)

function drawTree(x, y) {
  size = tree_size * Math.random() + (size/2)
  t.goto([x, y])
  t.goto([x, y+size])
  t.up()
  t.goto([x, y])
}

function getHeight(x, y) {
	let height = noise(
	[x * noise_x_scale, y * noise_y_scale]
	) * noise_amp
    sea_level = default_wave_height + (
    	wave_height *
    	Math.sin(
    		(x + Math.cos(y * offset_freq)
    	) * wave_freq)
    )
    return Math.max(sea_level, height) * (1/(y + 10))
}

for (let y = 0; y < 15; y += dy) {
	for (let x = 0; x < +6; x += dx) {
      	height = getHeight(x, y)
        if (height + y/3 > maxHeights[Math.floor(x/dx)]) {
          maxHeights[Math.floor(x/dx)] = height + y/3
          if (x == 0) {t.up()} else {t.down()}
          if (Math.random() > 0.75 && height * (y + 9) > +13.0) {
            drawTree(x, y/3 + height)
          }
        } else {
          t.up()
        }
        t.goto([x, y/3 + height])
	 }
}

drawTurtles(t)
```
