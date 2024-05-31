---
title: Elementary Cellular Automata
thumbnail: https://cloud-i7potzeq3-hack-club-bot.vercel.app/00image-2-2.webp
contributors: henrybass
---

### (Henry Bass, Beginner/Intermediate, 20min)

[Elementary Cellular Automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) is one of the simplest classes of [Cellular Automata](https://en.wikipedia.org/wiki/Cellular_automaton).

Through extremely simple rules, complex patterns can be created.

<img alt="elementary cellular automata" src="https://cloud-i7potzeq3-hack-club-bot.vercel.app/00image-2-2.webp" width="512"/>
<img alt="elementary cellular automata" src="https://cloud-4du3fnctv-hack-club-bot.vercel.app/00image-3.webp" width="512"/>

The rules behind Elementary Cellular Automata, or ECA, are very simple.

First, set up a strip of cells, with each one having a state of either one or zero. This is the first generation. Then, start iterating through the next generation. Depending on the 3 cells above, we either set this new cell as alive or dead. This is best explained in the gif below:

<img src="https://upload.wikimedia.org/wikipedia/commons/e/e2/One-d-cellular-automate-rule-30.gif" width="512"/>

The rules for when to set the new cell as a one or a zero are specified by a rule code. For example, here's how to interpret rule 30:

First, convert 30 into binary digits:
**00011110**

Each of these digits correspond to some possible state the previous that the 3 above cells can be in. For example:

**digit: 0** Since this digit is a 0, whenever the above 3 digits are [0, 0, 0] (_zero in binary_), the below cell in the next generation should be a 0

**digit: 4** Since this digit is a 1, whenever the above 3 digits are [1, 0, 0] (_four in binary_), the below cell in the next generation should be 1

**digit 7: 1** Since this digit is a 0, whenever the above 3 digits are [1, 1, 0] (_seven in binary_), the below cell in the next generation should be 0

Remember, we start counting from zero in this case, not one.

### Starting the code

Create a turtle:
`const t = new Turtle()`

Define the first generation, and fill it randomly:

```
const width = 50
let genStart = Array(width).fill(0)
genStart = genStart.map(() => (Math.round(Math.random())))
```

You might have noticed that there are several conversions between binary and decimal in the ECA algorithm we defined. It'll help to create a function that can do this for us:

```
function toBits(num, overhead) {
  let bits = num.toString(2)
  return (("0".repeat(overhead - (bits.length))) + bits).split("").map((s) => {return parseInt(s)})
}
```

The function first converts the integer into a binary string with `toString(2)`. We then add an overhead, and convert this into an integer array.

Here's what overhead does:

- Without overhead: `toBits(1) -> 1`
- With overhead: `toBits(1, 8) -> 00000001`

This helps because we often care about the full bit sequence, not just the direct binary conversion.

Next, let's define a rule string, and convert it to an 8 bit sequence:
`let rule = toBits(54, 8)` (Rule 54)

Then, we can create an array for the generation history, starting with `genStart`:
`let allGens = [genStart]`

Great! Now, it's time to define how new generations are created.

```
function nextGen(prev) {
  let nextGen = []
```

Iterate through the previous generation:

```
  for (let i = 0; i < prev.length; i++) {
```

Check what state it's in:

```
    for (let state = 0; state < 8; state++) {
      bits = toBits(state, 3)
```

We then check if the state matches, and if it does, follow the rule defined:

```
      let left = (i <= 1) ? 0 : prev[i - 1]
      let center = prev[i]
      let right = (i >= (prev.length - 1)) ? 0 : prev[i + 1]
      if (left == bits[0] && center == bits[1] && right == bits[2]) {
        nextGen.push(rule[8 - state - 1])
        break
      }
    }
  }
  return nextGen
}
```

Now, how should we draw this?
Since the Blot can't directly render pixels, we'll have to be a _bit_ more creative with how we do this.

By using the following rendering method, we can some visually interesting results:

- For each pixel rendered, check the 3 pixels above
- Draw a line to any above pixel if it's filled

<img src="https://cloud-r14rh28dk-hack-club-bot.vercel.app/0image.png" width="512"/>

Here's that in code:

```
function drawGen(arr, gen) {
  prevGen = allGens[gen]
```

`y` is negative because we're drawing top to bottom:

```
  let y = -gen
  for (let x = 0; x < arr.length; x++) {
```

If there's a 1 at this position, do the drawing procedure:

```
    if (arr[x]) {
      t.up()
      t.goTo([x, y])
      t.down()
```

Check the 3 above cells, and if they're in the 1 state, draw a line to them:

```
      if (prevGen[x] == 1) t.goTo([x, y + 1])
      t.goTo([x, y])
      if (prevGen[x - 1] == 1) t.goTo([x - 1, y + 1])
      t.goTo([x, y])
      if (prevGen[x + 1] == 1) t.goTo([x + 1, y + 1])
      t.goTo([x, y])
      if (arr[x - 1] == 1) t.goTo([x - 1, y])
      t.goTo([x, y])
    }

  }
  t.up()
  t.goTo([w, -y - 1])
}
```

Finally, iterate through the generations, and draw:

```
for (let gen = 0; gen < w; gen++) {
  allGens.push(nextGen(allGens[gen]))
  drawGen(allGens[gen + 1], gen)
}

drawTurtles([ t ])
```

Great job! There are plenty of variations on ECAs that you can explore. Here's a few more drawings done with the code, by setting only the center pixel as a one:

<img src="https://cloud-alkz1n9h6-hack-club-bot.vercel.app/0image.png" width="512"/>
<img src="https://cloud-1w9qj075i-hack-club-bot.vercel.app/0image.png" width="512"/>
<img src="https://cloud-ioqpd12zd-hack-club-bot.vercel.app/0image.png" width="512"/>
