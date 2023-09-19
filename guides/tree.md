# let's draw a tree

> You can follow along in this editor: [https://blot.hackclub.dev/editor/
](https://blot.hackclub.dev/editor)
We're going to use abstract scribbles to make a tree that looks like this.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/b2b3b319-1b0f-4c0e-bf78-d8323ab577d4" height="512"/>

## the trunk

<img src="https://github.com/hackclub/haxidraw/assets/27078897/4b0b06ea-4f71-4468-8f92-ed147507aa0e" height="512"/>

Let's look at that a bit closer.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/5f3fac4c-7b52-4cdb-9230-5f9c85fa0070" height="512"/>

To start the trunk let's draw some lines.

```js
let trunk = createTurtle();

// notice this pattern of using t which is 0 to 1
let iMax = 3; // the number of lines
for (let i = 0; i < iMax; i++) {
  const t = i / (iMax - 1);
  const x = t * 0.6; // this factor sets the spacing
  const trunkLine = createTurtle([x, 0]);
  trunkLine.left(90);

  trunkLine.forward(2.8);

  trunk.join(trunkLine);
}

// ...

renderTurtles(trunk);
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/5a6e291a-177f-44b5-913d-e7a2f92c77ff" height="512"/>

Now let's reach for the secret ingredient, perlin noise.

```js
trunkLine
  .forward(2.8)
  .resample(0.02) // we resample so we have points to move
  .iteratePath((pt, tValue) => {
    const [x, y] = pt;
    pt[0] += noise(y * 1.8) * -0.3; // shake them up a little
    pt[0] += Math.sin(y * 0.05); // give a little curve
  });
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/8c7fd1fa-3572-4348-8a94-65710bdff7ef" height="512"/>

We add a few more lines and make a gradient by filtering more out to the right.

```js
.iteratePath((pt, tValue) => {
  const [ x, y ] = pt;
  pt[0] += noise(y*1.8)*-0.3; // shake them up a little
  pt[0] += Math.sin(y*0.05);  // give a little curve

  if (rand() < t*0.44) return "BREAK"; // filter out points
})
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/17dee286-c4a2-4bf3-9103-158060bc17c2" height="512"/>

Keep the first and last line solid.

```js
.iteratePath((pt, tValue) => {
  const [ x, y ] = pt;
  pt[0] += noise(y*1.8)*-0.3; // shake them up a little
  pt[0] += Math.sin(y*0.05);  // give a little curve

  if (t === 0 || t === 1) return pt; // keep the first and last lines solid
  if (rand() < t*0.44) return "BREAK"; // filter out points
})
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/05b38a49-9fe4-4fb7-9d11-d0c1ce484924" height="512"/>

Fade the trunk out towards the leaves.

```js
.iteratePath((pt, tValue) => {
  const [ x, y ] = pt;
  pt[0] += noise(y*1.8)*-0.3; // shake them up a little
  pt[0] += Math.sin(y*0.05);  // give a little curve

  if (t === 0 || t === 1) return pt; // keep the first and last lines solid
  if (rand() < lerp(0, 1, 0.54*tValue**2)) return "BREAK"; // fade the trunk out towards the leaves
  if (rand() < t*0.44) return "BREAK"; // filter out points
})
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/bdaaa4c4-07c3-42bc-bfca-dad7bd1f218d" height="512"/>

Then a little y-displacement so the bottom isn't unnatural looking

```js
const trunkLine = createTurtle([x, 0 + noise(i) * 0.3]);
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/e2575e9c-61c3-473e-bbb2-ab46d4f740da" height="512"/>

Bump up the number of lines and that's our trunk!

<img src="https://github.com/hackclub/haxidraw/assets/27078897/8ae5e540-f33c-4bdd-939e-7be79484411d" height="512"/>

## the leaves

Now let's draw those leaves. This is going to be a random walk through a perturbed signed distance field for a circle.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/549bbf17-3681-446d-8e78-664805379a84" height="512"/>

We'll start with a random walk.

```js
const randomWalk = createTurtle();

const step = 0.05;
for (let i = 0; i < 1000; i++) {
  let angle = randInRange(-1, 1) * 17;
  randomWalk.right(angle);
  randomWalk.forward(step);

  const [endX, endY] = randomWalk.end;
}

drawTurtles(randomWalk);
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/f98e2f48-3785-4449-b936-dc5e637bdff5" height="512"/>

We want this walk to stay in a circle though. What we'll do is define an equation for the distance from some circle. If we step outside (the distance becomes positive) then take a step back towards the circle. Signed distance fields are very powerful tools, which are rewardingly worth exploring.

```js
let startPt = [0, 0];

const r = 2;
const sdf = (x, y) => circleSDF([x, y], startPt, r); // using our circle SDF as a helper function

const randomWalk = createTurtle(startPt);

const step = 0.05;
for (let i = 0; i < 1000; i++) {
  let angle = randInRange(-1, 1) * 17;
  randomWalk.right(angle);
  randomWalk.forward(step);

  const [endX, endY] = randomWalk.end;
  const distance = sdf(endX, endY); // how far are we from the circle
  if (distance > 0) {
    // are we outside
    const up = sdf(endX, endY + step);
    const down = sdf(endX, endY - step);
    const right = sdf(endX + step, endY);
    const left = sdf(endX - step, endY);
    const gradX = (right - left) / (2 * step);
    const gradY = (up - down) / (2 * step);

    let a = (Math.atan2(gradY, gradX) / Math.PI) * 180;
    a += randInRange(-1, 1) * 102;
    a += 180;
    randomWalk.setAngle(a);
    randomWalk.forward(step);
  }
}

function circleSDF([x, y], start, r) {
  let dx = x;
  let dy = y;

  dx -= start[0];
  dy -= start[1];

  return Math.sqrt(dx * dx + dy * dy) - r;
}
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/d05973d5-b50a-496e-a72f-5bf7fd80351b" height="512"/>

Break up the lines to make them look like abstract scribbles.

```js
const step = 0.05;
for (let i = 0; i < 10000; i++) {
  let angle = randInRange(-1, 1) * 17;
  randomWalk.right(angle);
  randomWalk.forward(step);

  const [endX, endY] = randomWalk.end;
  const distance = sdf(endX, endY); // how far are we from the circle
  if (distance > 0) {
    // are we outside
    const up = sdf(endX, endY + step);
    const down = sdf(endX, endY - step);
    const right = sdf(endX + step, endY);
    const left = sdf(endX - step, endY);
    const gradX = (right - left) / (2 * step);
    const gradY = (up - down) / (2 * step);

    let a = (Math.atan2(gradY, gradX) / Math.PI) * 180;
    a += randInRange(-1, 1) * 101; // try adjusting this direction scale
    a += 180;
    randomWalk.setAngle(a);
    randomWalk.forward(step);
  }

  if (rand() < 0.59) {
    randomWalk.up();
  } else {
    randomWalk.down();
  }
}
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/a36c8e40-0db8-4059-94ac-94c40b8e1e54" height="512"/>

Now we can shape the circle by scaling it and adding noise.

```js
function circleSDF([x, y], start, r) {
  let dx = 0.57 * x;
  let dy = 0.48 * y;

  dx -= start[0];
  dy -= start[1];

  return (
    Math.sqrt(dx * dx + dy * dy) -
    r +
    noise([x, y], { octaves: 1 }) * 1.1 +
    noise([x * 0.01, y * 0.01], { octaves: 1 }) * 0.53
  );
}
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/2f976eca-3987-4477-a187-4ef9c24591c4" height="512"/>

Let's add a little noise to the shading too.

```js
if (rand() < +0.6 + noise([endX * 18.7, endY * 1.34]) / 1.8) {
  randomWalk.up();
} else {
  randomWalk.down();
}
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/df03817e-4fd7-4188-ab0c-0e555b9b64db" height="512"/>

Now let's bump down the step and up the iteration count and we get something like this. Here are a few parameters and approximately what they were adjusted to.

```js
let step = 0.03;

i < 100000;

const r = randInRange(0.4, 2.1);
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/5285d821-7c04-4e25-aca1-f9c210f08498" height="512"/>

We can put this together with the trunk with some minor adjustments.

```js
let startPt = trunk.ct;

randomWalk.rotate(randInRange(-5, 5)).translate([-0.1, -0.6]);

drawTurtles(randomWalk, trunk);
```

<img src="https://github.com/hackclub/haxidraw/assets/27078897/114d17dc-b5a3-43ab-baf6-0e1dfee2d959" height="512"/>

And that's our tree!

There is much to discover playing around in the parameter space. Some come out looking quite realistic.

<img src="https://github.com/hackclub/haxidraw/assets/27078897/8d00c3b5-8d93-4e98-9b24-75ee00a85a87" height="512"/>
