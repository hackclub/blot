# Firmware

<img src="https://cloud-las1eixli-hack-club-bot.vercel.app/0235199943-90dc2df5-dc4d-4326-883e-f35f49397ed1.png" alt="assembled control board with annotations" width="500">

You'll need a computer with the Arduino IDE installed, as well as the control board and a USB-C cable. After following these steps, you'll be set up to use your motor control board to interface with your new drawing machine.

## Hardware setup

Hold the `B` (BOOT) button on the XIAO board and plug it in to your computer.

<img src="https://cloud-875fn52pd-hack-club-bot.vercel.app/0img_4068.jpg" width="300">

The "RPI-RP2" disk should show up on your computer if the above step was successful.

<img src="https://cloud-744uh7pdl-hack-club-bot.vercel.app/0image.png" width="200" alt="disk in macos finder">

## Software setup

> You'll need to have the latest version of the Arduino IDE installed. [Install it here.](https://www.arduino.cc/en/software/)

1. Open the Arduino IDE.
2. Add the Seeed Studio XIAO RP2040 board package to your IDE. Navigate to **Arduino IDE** > **Settings...** and add the following URLs to the **Additional Board Manager URLs** field. It's a single line, so you should combine the URLs with a comma.

```
https://github.com/earlephilhower/arduino-pico/releases/download/global/package_rp2040_index.json
https://raw.githubusercontent.com/qbolsee/ArduinoCore-fab-sam/master/json/package_Fab_SAM_index.json
```

4. Navigate to **Tools** > **Board** > **Boards Manager**, and search for "rp2040". Install the latest version of "Raspberry Pi Pico/RP2040" (author Earle F. Philhower, III).

<img src="https://cloud-emp4hciw2-hack-club-bot.vercel.app/0screenshot_2023-05-03_at_6.18.35_am.png" alt="rp2040 in boards manager" width="500">

5. Now that you have the board package installed, you can upload the firmware to the board. Select your board and port in **Tools** > **Board** and find "**Seeed Studio XIAO RP2040**.

<img alt="select board" src="https://cloud-62cyva491-hack-club-bot.vercel.app/0screenshot_2023-05-03_at_6.21.56_am.png" width="400">

To select the port, go to **Tools** > **Port** and select the serial port name of the connected board.

<img src="https://cloud-iclq94ywi-hack-club-bot.vercel.app/0screenshot_2023-05-03_at_6.29.06_am.png" alt="select serial port" width="400">

> Then, install the following libraries via Arduino's library manager:
>
> - FlashStorage_SAMD (by Cristian Maglie, Khoi Hoang)
> - AccelStepper (by Mike McCauley)
> - osap (by Jake Robert Read)

1. Copy the Arduino code from the respective firmware file (found in [`./firmware`](./firmware/)) into your IDE and upload to your board.

> The firmware is very fresh and poorly documented (and rapidly changing). Ask in #haxidraw-developemnt for a link to the latest version.

<img alt="Upload firmware to board" src="https://cloud-8rt747if7-hack-club-bot.vercel.app/0screenshot_2023-05-03_at_6.31.30_am.png" width="500">

> Now you can write your own web interface and use it to control your machine. Check out some example [interfaces](../interfaces/) which are open source on GitHub.
