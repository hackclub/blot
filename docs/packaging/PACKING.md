Hey there! If you're reading this, you're probably trying to pack a blot to ship out to a hack clubber.

Here's a quick checklist of what to include:

- [ ] Welcome to blot letter
- [ ] Box 1: screws
- [ ] Box 2: belt and flanged bearings
- [ ] Box 3: v-wheel box
- [ ] Box 4: nuts
- [ ] Box 5: electronics
- [ ] Tool bundle

Each box should be pre-assembled before packing a blot box & each of the parts should be QA tested before going into their respective boxes. Each box has a checklist of parts, and a following section on how to test the parts. Not all parts need to be tested.

## Welcome to blot letter

This is a letter that accompanies every blot. It's a quick, friendly message and includes a screw size guide. It's drawn on small cardstock using a blot.

![](https://cloud-m6norcnvl-hack-club-bot.vercel.app/0img_2588.jpg)

The code for drawing this on a blot can be found in [notecard.js](./notecard.js). Please make sure to increment the blot number on the card before shipping. At the time of writing there is no source of truth for the incremented number.

## Box 1: screws

- [ ] A paper bag containing:
  - [ ] M3x10 screws (x9) (1 more than required)
  - [ ] metal shims (x6) (1 more than required)
- [ ] M5x20, cyl. head (x1)
- [ ] M5x20 (x6) (1 more than required)
- [ ] M5x35 (x11) (1 more than required)
- [ ] M5x10 (x14) (1 more than required)

**Testing**

A screw size guide is included in the welcome to blot letter. Each group of screws should be tested before being packed.

## Box 2: belt and flanged bearings

- [ ] timing belt
- [ ] 1 flanged bearing tube (which contains at least 10 flanged bearings)

**Testing**

To test the timing belt, hold it up to the master belt and ensure it's at least as long and no longer than 1 inch longer than the master belt.

To test the flanged bearings inside the tube, make sure they take up most of the tube to ensure we don't pack a tube with too few bearings.

## Box 3: v-wheel box

This box should contain:
- [ ] 9 V-wheels (1 more than required).

**Testing**

V-wheels should be tested by inserting a M5 screw of any length to ensure they spin freely.

## Box 4: nuts

This box should contain:
- [ ] M5 T-nut (x14) (1 more than required)
- [ ] M5 nut (x18) (1 more than required)
- [ ] Timing belt pulley (x2)
- [ ] Metal Spacer (x4)
- [ ] Eccentric Spacer (x5)
- [ ] 4 rubber feet stickers

**Testing**

To test the timing belt pulley, quickly screw it into a stepper motor and try turning the motor to ensure it has a firm grip on the stepper motor axle.

## Box 5: Electronics

The electronics box should contain:
- [ ] usb-c power cable + brick
- [ ] usb-c male-male data cable
- [ ] 2 stepper motor 6-pin to 4-pin cables
- [ ] anti-static bag containing:
  - [ ] [blot main board](../../hardware/motor-control-board), assembled & packed in an anti-static bag
    - [ ] 2 stepper driver
    - [ ] 1 xiao seeed rp2040
    - [ ] usb-c power distribution board
    - [ ] [horizontal stepper breakout](https://cloud-9z8rqqzj6-hack-club-bot.vercel.app/0img_0759.jpg)
  - [ ] servo motor
  - [ ] servo motor arm

**Testing**

To test the electonics, plug the steppers and servo into the main board, and try to run any of the art examples in the gallery.
The computer should connect properly to the board.
The steppers should move firmly without clicking, and should resist the user pushing them. To test resistance, you may need to attach the Timing belt pulley from [box 4](#box-4-spacers-and-pulleys-box) to the stepper motor.

## Tool bundle

The taped-together tool bundle should contain:
- [ ] 3mm allen key
- [ ] 5mm allen key
- [ ] 8mm wrench
- [ ] 1 retractable/ballpoint pen

**Testing**

Try to fit each allen key into a screw of a corresponding size. There are many allen keys around the office and we want to make sure we haven't mixed up a slightly different size into the bundle.