
## Components
- Raspberry Pi Model B (RPi)
- LCD Writing Tablet
- USB Webcam
- Blot from Hack Club

## Setup
The setup requires:
- [ ] RPi connected to WiFi
- [ ] *USB Webcam* and *Blot* connected to RPi through USB
- [ ] *LCD Writing Tablet* connected to RPi through GPIO, ground to ground and positive to BOARD_PIN

In the local directory run:
1. `yarn install`
2. `sudo apt-get install motion`
3. `sudo chown motion:motion /etc/motion`
4. `sudo cp motion.conf /etc/motion/motion.conf`

## Running
1. Start Motion daemon: `sudo systemctl start motion`
2. Run the server: `yarn run`


(Tablet) <-(rpi-gpio)- (Pi) <-(Motion)-> (Webcam)

(Pi) <-(SerialPort)-> (Blot)

(Pi) <-(Bolt Socket API)-> (Slack)


