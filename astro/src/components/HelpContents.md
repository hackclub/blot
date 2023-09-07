# API reference

### async loop(fn, minInterval = 0)

Run a function `fn` at least every `minInterval` milliseconds.

### async sleep(ms)

Delay for `ms` milliseconds.

### render(node)

Render the DOM node `node` to the View tab.

### viewEl

A reference to the root node of the View tab.

### createSynchronizer(actuators)

Create a "synchronizer" out of an array of `actuator`s (`Thing`s that support various motion commands). Returns an object with the following properties:

### actuators

The array of `actuator`s passed to `createSynchronizer`.

### async target(pos, vels?, accels?)

Go to the `pos` position without awaiting the end of the movement.

### async absolute(pos, vel?, accel?)

Go to the absolute specified actuator position `pos`, and optionally change the velocity and acceleration to `vel` and `accel` respectively.

### async relative(deltas, vel?, accel?)

Move relative by the `deltas` specified, and optionally change the velocity and acceleration to `vel` and `accel` respectively.

### async velocity(vels, accel?)

Set the velocity vector to `vels`, and optionally change the acceleration to `accel`.

### async stop()

Stop all actuators.

### async awaitMotionEnd()

Wait for all actuators to stop moving.

### async setPosition(pos)

Set the position of all actuators to the respective value in `pos`.

### setVelocity(vel)

Set the velocity to `vel`.

### setAccel(accel)

Set the acceleration to `accel`.

### async getPosition()

Get the current position of all actuators.

### async getVelocity()

Get the current velocity of all actuators.