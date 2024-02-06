# Tuning

You'll need to tune your blot after assembly, and every once-and-a-while when it's drawing something incorrectly.

We recommend using the [Blot logo](./test_pattern.js) as a test image. It's a good way to see if your blot is drawing correctly, with a good variety of straight, curved, & diagonal lines.

If well tuned, it should end up looking something like this:

![](https://cloud-6mgw73o2a-hack-club-bot.vercel.app/0well_calibrated.jpeg)

**My blot only draws in diagonal lines!**

This probably means that only one of your motors is turning correctly take the belt off your blot and hold each motors axle to see which motor is behaving, erratically or weekly. ￼

![](https://cloud-3tya9x7l7-hack-club-bot.vercel.app/0img_0806.jpeg)

**Blot only vibrates instead of moving**

This is a sign that your stepper motors are either wired incorrectly or don’t have a good connection.
- Unplug and replug your stepper motors.
- Make sure your stepper motors are plugged in the correct direction. The red wire should connect to the side labeled "red".
- Make sure the stepper motor horizontal breakouts are connected. Steppers **do not** directly connect to the main board.