#Creating Your First Blot Drawing
Start by moving the rails all the way to the right and forward, as shown below

![](https://cloud-lhuhtdwzz-hack-club-bot.vercel.app/020240206_201742.jpg)

Next, connect the power adapter to the port labeled "Usb Power", and connect your computer or laptop to the other port

![](https://cloud-27tuag4xc-hack-club-bot.vercel.app/020240206_202109.jpg)

On your computer, head to the editor, and click the "Machine Controls" button on the top right. The click "Connect to Machine". 

On the pop-up, select your blot. It might be labeled as XIAO RP2040 or similar

Once it's connected, go back to machine controls and click pen down. Put the toolhead on the servo as shown.

![](https://cloud-nbhnhtepz-hack-club-bot.vercel.app/120240206_201003.jpg)

Place the pen in the holder, and tighten the screw

![](https://cloud-nbhnhtepz-hack-club-bot.vercel.app/020240206_201014.jpg)

Finally, head to the machine conrtols and hit run machine

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
