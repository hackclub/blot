# blot-to-gcode
This is a quick and dirty tool for converting Blot code into GCode (see [marlin-blot](https://github.com/rivques/Marlin-blot)
for firmware that supports this).

## Usage
Run `server.js`, then visit `http://localhost:3000/` in your browser.
Paste your Blot code into the text area, and click "Convert". Depending on the complexity of your code, this may take a while.
Once the conversion is complete, you can download the GCode file and run it with software like Pronterface or Repetier-Host.

## Settings
The default settings roughly mirror the Blot defaults. I've had success running as fast as 18000 mm/min (300mm/sec), but your mileage may vary.

## Why?
Speed! This lets you run your Blot much faster than stock. For example, drawing a [qr code](https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/QR-sam/index.js) at medium quality for `https://blot.hackclub.com` took a whole 18 minutes on stock, while running at 300 mm/s took only 11 minutes. That's a 40% speedup! Plus, you can go even faster if you're willing to compromise on quality - now you can tweak your accelerations!

Also, this makes it easier to run your Blot headlessly (without the web interface), though you'll probably need to put in a bit more work for that.