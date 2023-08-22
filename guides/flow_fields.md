# Flow Fields

<img src="https://cloud-130z460un-hack-club-bot.vercel.app/0image__2_.png" width=512px>

Let's take a shot at creating some natural looking patterns in the Haxidraw editor. To create images that feel like they flow, a good start would be thinking about how actual fluids work. 

A fluid is composed of many individual particles, each following their own trajectory. Because of the number of moving components, actual fluid simulation is ***really hard***. But, since we're not going for realism here, we get some artistic liberty. By using a form of randomness called *fractal noise*, we can create an effect that resembles turbulence in fluids.

First, let's create a turtle, and draw it to the screen.
```js
const t = createTurtle();
drawTurtles(t);
```

Then, we can define a `Particle` class. Each instance of this class represents one particle. It'll hold information about it's position, and how it should move.

```js
class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  update() {
    this.x += 1
    this.y += 1
  }
}
```	

For now, as a simple update rule, it increases it's x and y position each time it's updated. This moves it up, and to the right.

Since we need a way to remember what particles exist, we can create an array called `particles`.
```js
let particles = []
```

Let's start off by creating 100 particles. This is done by iterating through the rows and columns of a 10x10 grid, placing a particle at each point.

```js
for (let i = 0; i < 10; i+=1) {
  for (let j = 0; j < 10; j+=1) {
    particles.push(new Particle(i, j))
  }
}
```

We've got a list of particles, but now we'll want to actually update and draw them.

First, iterate through every particle:
```js
for (let particle of particles) {
```
We then call `t.up()` to raise the pen, followed by `t.goto([particle.x, particle.y])` to move it to the particle's position. Then, we can lower the pen with `t.down()` to start drawing.
```js
  t.up()
  t.goto([particle.x, particle.y])
  t.down()
```
Let's update the particle 100 times. Each time we update, also move the pen to the new position of the particle.
```js
  for (let i = 0; i < 100; i++) {
    particle.update()
    t.goto([particle.x, particle.y])
  }
}
```
By now, once you press "Run Code", you should be seeing particles marching on and on in one direction.

<img src="https://cloud-7bvcdvsjr-hack-club-bot.vercel.app/0image.png" width=512px>

An easy change we can make is adding some randomness to where the particles are positioned. By instead using the following, things look a bit more natural.
```js
particles.push(new Particle(i + rand(), j + rand()))
```
<img src="https://cloud-6chftxnf2-hack-club-bot.vercel.app/0image.png" width=512px>

Now, let's make the particle's paths a bit more interesting. For example, we can move them according to the sine and cosine of their position:
```js
this.x += Math.cos(this.x);
this.y += Math.sin(this.y);
```

That... doesn't look great.

<img src="https://cloud-16d5nm8vj-hack-club-bot.vercel.app/0image.png" width=512px>

Perhaps we just need more detail. Let's change the step size of the particles down to 0.1 like so:
```js
this.x += 0.1 * Math.cos(this.x);
this.y += 0.1 * Math.sin(this.y);
```
The lines are much smoother now, because we're allowing for more detail. 

<img src="https://cloud-aoww25t9n-hack-club-bot.vercel.app/0image.png" width=512px>

Then, let's add more particles. We can do this by making the grid of particles way more dense:
```js
for (let i = 0; i < 10; i+=0.1) {
  for (let j = 0; j < 10; j+=0.1) {
```
It's starting to look less like a bunch of particles, and more like one fluid!

<img src="https://cloud-oatx9l5ke-hack-club-bot.vercel.app/0image.png" width=512px>

The motion of the particles still isn't very interesting - it's too predictable. Maybe it needs some randomness?

```js
/*
We're multiplying by 2 and
subtracting 1 to keep the randomness within
the range of -1,1 instead of 0,1
*/
this.x += 0.1*(rand()*2 - 1); // rand()
this.y += 0.1*(rand()*2 - 1);
```


<img src="https://cloud-eexv6dv4d-hack-club-bot.vercel.app/0image.png" width=512px>

Well, now it's too random - even particles right next to each other act completely differently. The solution is a specific type of randomness called *fractal noise*. It's random on large scales, but points near each other have similar values. There's actually a function built into the Haxidraw editor for sampling noise: 
```js
noise([x, y])
```
Let's try this:
```js
this.x += 0.1*(noise([this.x, this.y])*2 - 1);
this.y += 0.1*(noise([this.x, this.y])*2 - 1);
```
<img src="https://cloud-cwrp7ap37-hack-club-bot.vercel.app/0image.png" width=512px>

That looks ***really cool***, but it's not exactly what we want. The problem is that the movement in both x and y are always going to be the same, so particles can only move along the diagonal axis. Let's add an arbitrary when we sample the noise to fix this:
```js
// Add this part at the top of the file
const noiseXOffsets = [(rand() * 200), (rand() * 200)]
const noiseYOffsets = [(rand() * 200), (rand() * 200)]
//

this.x += 0.1*(noise([this.x + noiseXOffsets[0],
	this.y + noiseXOffsets[1]])*2 - 1);
this.y += 0.1*(noise([this.x + noiseYOffsets[0],
	this.y + noiseYOffsets[1]])*2 - 1);
```

<img src="https://cloud-a1sbmotr7-hack-club-bot.vercel.app/0image.png" width=512px>

There we go! That looks much more natural. Finally, if you want to really push your computer, add way more particles:

```js
for (let i = 0; i < 10; i+=0.05) {
  for (let j = 0; j < 10; j+=0.05) {
```

Then, wait for it to load, and zoom up close. 

<img src="https://cloud-44i3adoh6-hack-club-bot.vercel.app/0image.png" width=512px>

Doesn't that look interesting?

That's the end of the guide, but you can go further if you want. For example, what if we had used a different type of noise? What about trying mathematical functions other than sine and cosine? There's a lot to explore.

*\- Henry*
