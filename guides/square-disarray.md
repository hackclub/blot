---
title: Square Disarray
thumbnail: https://cloud-qogbw3upi-hack-club-bot.vercel.app/0260524306-bcaf04e7-a00e-4f98-aaed-01eeebf2c79c.webp
contributors: leomcelroy
---

> You can follow along in [this editor](https://blot.hackclub.dev/editor).

Let's something like draw this:

<img alt="square disarray" src="https://cloud-qogbw3upi-hack-club-bot.vercel.app/0260524306-bcaf04e7-a00e-4f98-aaed-01eeebf2c79c.webp" width="50%"/>

# Setting Up Workarea

Let's start by centering the drawing we'll make in the document.

```js
const width = 120
const height = 120

setDocDimensions(width, height)

const shapes = createTurtle() // this will be our container turtle

shapes.translate([width / 2, height / 2], shapes.cc) // this moves the center of our turtle to the center of our doc

drawTurtles(shapes)
```

# Draw a Square

This function draws squares.

```js
function rect(w, h) {
  const t = createTurtle()

  for (let i = 0; i < 2; i++) {
    t.forward(w)
    t.right(90)
    t.forward(h)
    t.right(90)
  }

  return t
}
```

Let's use it to add a square to our drawing.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/6a9b273c-391e-4ee7-9036-114524589d09" width="50%"/>


<details>
<summary>Hint</summary>
  
```js
// ...

shapes.join(rect(10, 10)) // here is the new line

shapes.translate([width / 2, height / 2], shapes.cc)

// ...
```

</details>

# Make a Grid

First we'll make a row. Start with a lot of squares.

```js
const gridWidth = 10

for (let i = 0; i < gridWidth; i++) {
  const t = rect(10, 10)
  shapes.join(t)
}
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/df700565-f80b-434b-ae92-1b6a4ecbc36b" width="50%"/>

We can't see any change because they are on top of eachother! Space them out.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/367f376f-a903-44ec-8e31-db7e8090782b" width="50%"/>

<details>
<summary>Hint</summary>

```js
for (let i = 0; i < 3; i++) {
  const t = rect(10, 10)
  t.translate([23 * i, 0])
  shapes.join(t)
}
```

</details>

If we want the spacing to be perfect, each square should move by the width of a square.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/4e9e02da-20e3-4b83-ba27-5e384163148f" width="50%"/>

<details>
<summary>Hint</summary>

```js
const squareWidth = 10
for (let i = 0; i < 3; i++) {
  const t = rect(squareWidth, 10)
  t.translate([squareWidth * i, 0])
  shapes.join(t)
}
```

</details>

To make it a grid add another loop.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/9b0fea0d-2b04-492b-9c3e-018bde669099" width="50%"/>

<details>
<summary>Hint</summary>

```js
const squareWidth = 10
const squareHeight = 10
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const t = rect(squareWidth, squareHeight)
    t.translate([squareWidth * i, squareHeight * j])
    shapes.join(t)
  }
}
```

</details>

Increase the loop range for a bigger grid.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/5408832c-2125-47af-9e84-0dd88c2fab67" width="50%"/>

# Add Some Disarray

We can randomly translate each square.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/8f64548c-08dc-4709-85a8-cd941baf8438" width="50%"/>

<details>
<summary>Hint</summary>
  
```js
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const t = rect(squareWidth, squareHeight)
    t.translate([squareWidth * i, squareHeight * j])

    // randomness added here
    t.translate([randInRange(-1, 1), randInRange(-1, 1)])

    shapes.join(t)
  }
}
```

</details>

Scale the randomness with the x location.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/fb392a9b-4ec8-4eec-9f1f-035d67c4ea50" width="50%"/>

<details>
<summary>Hint</summary>
  
```js
t.translate([(randInRange(-1, 1) * i) / 6, (randInRange(-1, 1) * i) / 6])
```

</details>

Now rotate each square in a similar manner.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/1a0902f1-084d-4651-a188-c1dbe6995289" width="50%"/>

<details>
<summary>Hint</summary>

```js
t.rotate(randInRange(-1, 1) * 2 * i)
```

</details>

And that's our piece!

# Extensions

- Can you adjust transformations based on x and y?
- Can you add scale to the transformations?
- Can you change the rectangle sizes?
