
Blot is a plotter bot from Hack Club. The TeleBlot Site encourages Hack Clubbers to create with Blot by lowering the barrier for Hack Clubbers to see their Blot works drawn on a Blot machine. Hack Clubbers can upload code to the website and watch through a livestream as a remote blot machine (the TeleBlot) draws their code.

## Components
- Raspberry Pi Model B (RPi)
- LCD Writing Tablet (modified)
- USB Webcam (generic)
- Blot from Hack Club

## Setup
The setup requires:
- [ ] RPi connected to WiFi
- [ ] *USB Webcam* and *Blot* connected to RPi through USB
- [ ] *LCD Writing Tablet* connected to RPi through GPIO (connect the tablet's ground wire to the RPi's ground GPIO pin and the tablet's postive wire to the RPi's BOARD_PIN GPIO, default: 7)
- [ ] Position the *USB Webcam* to look at the *LCD Writing Tablet*

On the RPi in the `headless-blot` directory run:
1. `yarn install`
2. `sudo apt-get install motion`
3. `sudo chown motion:motion /etc/motion`
4. `sudo cp motion.conf /etc/motion/motion.conf`

## Running
1. Start the Motion daemon: `sudo systemctl start motion`
2. Start the server: `yarn run`
3. To test, upload a blot code file (.js) to the "Teleblot" Slack Bot on the Hack Club Slack, you should receive 1) a video of the Blot drawing your sketch and 2) an image of the result.

### Note
- Any changes to motion.conf must be copied to: `sudo cp motion.conf /etc/motion/motion.conf` and the Motion daemon restarted: `sudo systemctl start motion`
- Once started, the Motion daemon will run automatically in the background, even after restarting the RPi
- The USB webcam livestream can be found at http://<rpi_ip>:8081 and exposed externally with a reverse proxy such as [LocalXpose](https://localxpose.io/)
