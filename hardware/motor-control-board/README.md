# Blot Control Board

There are the two boards we designed to drive the blot machine. The first one is the Carrier Board that holds everything together, and the second one is a USB-C Power Delivery Decoy board. 

![A set of three assembled control boards and decoy boards](https://cloud-1qtfaazar-hack-club-bot.vercel.app/0image_from_ios.jpg)

To drive the stepper motors, we're using a pair of A4988 stepper motor drivers from Allegro Microsystems, controlled by a Seeeduino XIAO RP2040 and powered by a custom USB-C PD board using the Cypress Semiconductor CYPD3177. 

The KiCAD project files are provided in the repo and are designed with KiCAD v7. This may not be compatible with previous versions, but you can get the latest version [here](https://www.kicad.org/download/). 
## Carrier Board

The carrier board wires the breakouts together, provides external power circuitry for the A4988 and steppers, and a convenient way to mount the board to the blot machine. It's a simple 2-layer 1.6mm PCB measured at 50x70mm. It also has a pin header breaking out 5 unused GPIO pins, including 1 DAC channel, 2 analog-capable pins, and one I2C bus. 

![KiCAD Render of Carrier Board](https://cloud-msqq36tmv-hack-club-bot.vercel.app/0v1.20-render-populated.png)

## Power Delivery Board

The power delivery board provides a fixed output of 9V1A using the CYPD3177 chipset. It's highly flexible, allowing USB-C Charging up to 15W and USB-C PD up to 100W. Unlike many other chips available, it does not require any firmware nor flashing, and power settings are configured with pullup and pulldown resistors. This board is set to 9V @ 1A, to ensure maximum compatibility with most PD-capable bricks. It's very compact, measuring less than 22x32mm with breadboard-friendly mounting, an affordable 2-layer design, and single side SMD component placement. 

During prototyping, we used an off-the-shelf module from Amazon. These only had four 2.54mm pins on the edge of the board and were hard to mount onto the board securely. Building our own also gave us better control over supply of these boards. 

![KiCAD Render of PD Board](https://cloud-msqq36tmv-hack-club-bot.vercel.app/1cypd_usb-pd_9v1a.png)

## Additional Relevant Reading

Below is a list of datasheets / product briefs that may be relevant. 

[Seeeduino RP2040 XIAO](https://wiki.seeedstudio.com/XIAO-RP2040/)\
[A4988 Breakout Board](https://www.pololu.com/product/1182)\
[CYPD3177](https://www.infineon.com/cms/en/product/universal-serial-bus/usb-c-charging-port-controllers/ez-pd-barrel-connector-replacement-bcr/cypd3177-24lqxq/)\
[DMP3013SFV](https://www.diodes.com/assets/Datasheets/DMP3013SFV.pdf)\
[MM3Z15VC](https://www.onsemi.com/pdf/datasheet/mm3z9v1c-d.pdf)\
[WCAP-ATG5](https://www.we-online.com/components/products/datasheet/860020573008.pdf)\
[JS Series Switch](https://www.ckswitches.com/media/1422/js.pdf)\
[Schottky Diode](https://datasheets.kyocera-avx.com/schottky.pdf)
