// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline

const posx = width/2
const posy = height/2
const LSfrontSquare = [
  [posx-50,posy-2],
  [posx-50,posy+8],
  [posx-42,posy+7],
  [posx-42,posy-3],
  [posx-50,posy-2],
];
const LSbackSquare = bt.copy(LSfrontSquare);
bt.translate([LSbackSquare],[5,5])
const LSconnectingLines = [
  [posx-50,posy+8],
  [posx-45,posy+13],
  [posx-37,posy+12],
  [posx-37,posy+2],
  [posx-42,posy-3],
  [posx-42,posy+7],
  [posx-37,posy+12],
  [posx-45,posy+13],
  [posx-50,posy+8],
]

const LSrotor = [
  [posx-44.5,posy+15],
  [posx-44.5,posy+10],
  [posx-43.5,posy+10],
  [posx-43.5,posy+15],
  [posx-44.5,posy+15],  
]
finalLines.push(LSrotor);

const LSstand = [
  [posx-42,posy+7],
  [posx-45,posy-11],
  [posx-42.5,posy-11],
  [posx-40,posy-9],
  [posx-38.6,posy-3],
  [posx-33,posy+3],
  [posx-37,posy+8.5],
  [posx-39,posy+6.5],
  [posx-42,posy+7],
  [posx-45,posy-11],
  [posx-42.5,posy-11],
  [posx-39,posy+6.5],

]

const LSmount = [
  // [posx-38,posy+11],
  // [posx-29,posy+10.2],
  // [posx-32,posy+7],
  // [posx-41,posy+8],
  // [posx-32,posy+7],
  // [posx-32,posy-3],
  // [posx-41,posy-2],
  // [posx-32,posy-3],
  // [posx-29,posy+0.7],
  // [posx-29,posy+10.2],
  // [posx-38,posy+11],
  // [posx-41,posy+8],
  // [posx-41,posy-2],
  [posx-41,posy+8],
  [posx-38,posy+11],
  [posx-29,posy+10.2],
  [posx-29,posy+0.7],
  [posx-32,posy-3],
  [posx-41,posy-2],
  [posx-41,posy+8],
  [posx-32,posy+7],
  [posx-32,posy-3],
  [posx-32,posy+7],
  [posx-29,posy+10.2],
  [posx-32,posy+7],
]


finalLines.push(...bt.cover(bt.cover(bt.cover([LSconnectingLines], bt.cover([LSbackSquare], [LSfrontSquare])), [LSstand]), [LSmount]));
finalLines.push(...bt.cover(bt.cover([LSfrontSquare], [LSstand]), [LSmount]));
finalLines.push(...bt.cover(bt.cover(bt.cover([LSconnectingLines], [LSstand]), [LSmount]), [LSmount]));
finalLines.push(...bt.cover([LSstand],[LSmount]))

const xrail = [
  [posx+21,posy+1.4],
  [posx-30,posy+7],
  [posx-31.2,posy+6],
  [posx+20,posy+0.4],
  [posx-31.2,posy+6],
  [posx-31.2,posy+4],
  [posx+20,posy-1.4],
  [posx-31.2,posy+4],
  [posx-31.2,posy+3],
  [posx+20,posy-2.4],
  [posx-31.2,posy+3],
  [posx-31.2,posy+1],
  [posx+20,posy-4.4],
  [posx+20,posy+0.4],
  [posx+21,posy+1.4],

]
const RSmount = [

  [posx+21,posy+4.5],
  [posx+19.5,posy+0.5],
  [posx+19.5,posy+-6.7],
  [posx+25,posy-7.3],
  [posx+28,posy+3.6],
  [posx+21,posy+4.5],
  [posx+19.5,posy+0.5],
  [posx+25.5,posy+-0.2],
]

const RSstand = [
  [posx+24.7,posy-1.2],
  [posx+21,posy-20],
  [posx+24,posy-20],
  [posx+27.7,posy+-1.4],
  [posx+27.7,posy-10.8],
  [posx+24,posy-20],
  [posx+27.7,posy-10.8],
  [posx+37.2,posy-12.3],
  [posx+37.7,posy-2.5],
  [posx+39.7,posy+3.7],
  [posx+27.6,posy+4.9],
  [posx+24.7,posy-1.2],
  [posx+37.7,posy-2.5],
]

const RSrotor = [
  [posx+34.5,posy+15],
  [posx+34.5,posy+10],
  [posx+33.5,posy+10],
  [posx+33.5,posy+15],
  [posx+34.5,posy+15],  
]
finalLines.push(RSrotor)
finalLines.push(RSstand)
finalLines.push(...bt.cover([RSmount],[RSstand]))
finalLines.push(...bt.cover([LSmount],[xrail]))
finalLines.push(...bt.cover([xrail],[RSmount]))





const yrail = [
  [posx+-10.2,posy+22.5],
  [posx+-26.9,posy+3.8],
  [posx+-25.1,posy+3.5],
  [posx+-8.4,posy+22.2],
  [posx+-25.1,posy+3.5],
  [posx+-22.8,posy+3.2],
  [posx+-6.1,posy+22.2],
  [posx+-22.8,posy+3.2],
  [posx+-21.1,posy+3.1],
  [posx-4.4,posy+22.4],
  [posx+-21.1,posy+3.1],
  [posx+-21.1,posy+-1.9],
  [posx-4.4,posy+17.9],
  
]

finalLines.push(yrail)
// draw it
drawLines(finalLines);
