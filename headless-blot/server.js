import 'dotenv';
import slackbolt from '@slack/bolt';
const { App } = slackbolt;
import 'fs';

import rpigpio from 'rpi-gpio';
const { promise: gpio } = rpigpio;

import { runCodeInner } from "../src/runCodeInner.js";
import { makeIncluded } from "../src/makeIncluded.js";
import { SerialPort, SerialPortMock } from 'serialport';

import { createNodeSerialBuffer } from "../src/haxidraw/createNodeSerialBuffer.js";
import { runMachineHelper } from "../src/runMachineHelper.js";
import { createHaxidraw } from "../src/haxidraw/createHaxidraw.js";

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  port: process.env.PORT || 3000
});

const config = {
  IS_RPI: false,
  MOCK_SERIAL: true,
  SERIAL_PATH: '/dev/tty-usbserial1',
  BAUD: 9600,
  BOARD_PIN: 7
}

let port;
const path = config.SERIAL_PATH;
if (config.MOCK_SERIAL) {
  SerialPortMock.binding.createPort(path);
  port = new SerialPortMock({ path, baudRate: config.BAUD, autoOpen: false });
}
else {
  port = new SerialPort({ path, baudRate: config.BAUD, autoOpen: false })
}

const comsBuffer = await createNodeSerialBuffer(port);
const haxidraw = await createHaxidraw(comsBuffer);

const resetTurtles = await runSync(`
    drawLines([
      [
        [0, 0], [100, 100]
      ]
    ])
  `)

const rpi = {
  pin: config.BOARD_PIN,
  async setup() {
    if (!config.IS_RPI) return;
    await gpio.setup(this.pin, gpio.DIR_OUT);
  },
  async write(val) {
    if (!config.IS_RPI) return;
    await gpio.write(this.pin, val);
  }
}

const webCam = {
  id: '0',
  baseUrl: () => `http://localhost:8080/${this.id}`,
  videoUrl: '',
  snapshotUrl: '',
  async command(str) {
    await fetch(this.baseUrl + str)
  },
  async start() {
    // TODO: test if webcam is connected
    await this.command('/detection/connection');
  },
  async startEvent() {
    await this.command('/detection/start')
  },
  async endEvent() {
    await this.command('/detection/end')
    await this.command('/detection/snapshot')
  }
};

async function runSync(code) {
  const { globalScope, turtles, log, docDimensions } = makeIncluded();
  await runCodeInner(code, globalScope, "../dist");
  return turtles;
}

async function fetchSlackFile(fileUrl) {
  const response = await fetch(fileUrl, {
    //TODO find right token
    headers: { 'Authorization': `Bearer ${process.env.SLACK_BOT_TOKEN}` }
  });
  const body = await response.text()

  return body;
}

const sendSlackFile = async (channelId, fileName, comment = '') => (
  await app.client.files.upload({
    channels: channelId,
    initial_comment: comment,
    file: fs.createReadStream(fileName)
  })
)

const runBlot = async (turtles) => await runMachineHelper(haxidraw, turtles);

async function resetBlot() {
  await runBlot(resetTurtles);
  await clearBoard();
}

const sleep = ms => (
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  })
);

async function clearBoard() {
  await rpi.write(true);
  await sleep(200);
  await rpi.write(false);
}

async function onMessage(message) {
  try {
    if (!message.files) return;

    const fileUrl = message.files[0].url_private;
    const code = await fetchSlackFile(fileUrl);
    console.log(code);

    const turtles = await runSync(code);

    // await webCam.startEvent();
    await runBlot(turtles);
    // await webCam.endEvent();

    await sendSlackFile(message.channel, webCam.videoUrl);
    await sendSlackFile(message.channel, webCam.snapshotUrl);
  }
  catch (error) {
    console.log(error);
  }
  finally {
    // await resetBlot();
  }
}

(async () => {
  await app.start();
  // await webCam.start();
  await rpi.setup();
  // await resetBlot();

  onMessage({
    files: [{
      url_private: 'https://files.slack.com/files-pri/T0266FRGM-F06PHTH3D40/test_pattern.js'
    }]
  });

  console.log('⚡️ Bolt app is running!');
})();

app.message(async ({ message, say }) => {
  try {
    onMessage(message);
  }
  catch (error) {
    say(error);
  }
  finally {
    await resetBlot();
  }
})

