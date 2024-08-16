/*
@title: DisksAndPorts
@author: TheTwoBoom
@snapshot: rack1.png
*/

const width = 125;
const height = 125;
const seed = 123359;

setDocDimensions(width, height);
bt.setRandSeed(seed);

const rr = bt.randIntInRange

// store final lines here
const finalLines = [];
const servers = [];
var ports
var disks
var stage

for (let i = 0; i < 10;) {
  let server = bt.randInRange(0, 1) < 0.3;
  let serverU = rr(1, 3);
  var heightup = serverU * 10 + i * 10;
  var heightdown = i * 10;
  const serverline = [
    [30, heightup],
    [90, heightup],
    [90, heightdown],
    [30, heightdown],
    [30, heightup]
  ];
  i += serverU;
  if (server) {
    ports = rr(1, 2);
    disks = 14 * serverU;
  } else if (serverU > 1) {
    server = true
    ports = rr(1, 2);
    disks = 14 * serverU + (serverU - 1) * 14;
    if (serverU === 3) {
      disks -= 14
    }
  } else {
    ports = 8;
    disks = 0;
  }
  for (; ports != 0;) {
    let portwidth = server * 40 + 30 + ports * 6
    let portheight = heightup - 3
    var port = [
      [portwidth, portheight],
      [portwidth + 6, portheight],
      [portwidth + 6, portheight - 4],
      [portwidth + 5, portheight - 4],
      [portwidth + 5, portheight - 5],
      [portwidth + 4, portheight - 5],
      [portwidth + 4, portheight - 6],
      [portwidth + 2, portheight - 6],
      [portwidth + 2, portheight - 5],
      [portwidth + 2, portheight - 5],
      [portwidth + 1, portheight - 5],
      [portwidth + 1, portheight - 4],
      [portwidth, portheight - 4],
      [portwidth, portheight],
    ];
    for (let i = 1; i < 5; i++) {
      let portlines = [
        [portwidth + 1.5 * i, portheight - 1.5],
        [portwidth + 1.5 * i, portheight - 2.5]
      ];
      finalLines.push(portlines);
    }
    ports = ports - 1
    finalLines.push(port);
  }
  for (; disks != 0;) {
    if (disks <= 14) {
      stage = 0
    } else if (disks <= 28) {
      stage = 1
    } else if (disks <= 42) {
      stage = 2
    } else if (disks <= 60) {
      stage = 3
    }
    let diskwidth = server * (disks * 3 + 29 - (42 * stage))
    let diskheight = heightup - 2 - 6 * stage
    var disk = [
      [diskwidth, diskheight],
      [diskwidth + 3, diskheight],
      [diskwidth + 3, diskheight - 5],
      [diskwidth, diskheight - 5],
      [diskwidth, diskheight],
    ];
    var statuslight = [
      [diskwidth + 1.25, diskheight - 3.25],
      [diskwidth + 1.75, diskheight - 3.25],
      [diskwidth + 1.75, diskheight - 3.75],
      [diskwidth + 1.25, diskheight - 3.75],
      [diskwidth + 1.25, diskheight - 3.25],
    ];
    disks = disks - 1
    finalLines.push(disk);
    finalLines.push(statuslight);
  }
  bt.join(servers, serverline);
}

// create a polyline
const rackLines = [
  [30, 120],
  [90, 120],
  [90, 0],
  [30, 0],
  [30, 120]
];

// add the polyline to the final lines
bt.join(servers, rackLines);
finalLines.push(servers);
finalLines.push(port);

// transform lines using the toolkit
// bt.rotate(finalLines, 45);

// draw it
drawLines(finalLines, { width: 1 });