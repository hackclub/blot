/*
@title: A Boat
@author: Ahmet
@snapshot: A boat
*/

const width = 100;
const height = 100;

setDocDimensions(width, height);

const Water = [[
  [0, 0],
  [100, 0],
  [100, 30],
  [0, 30]
]];

const Vortex1 = [
  bt.nurbs([
    [5, 20],
    [15, 30],
    [25, 20]
  ])
]

const Vortex2 = [
  bt.nurbs([
    [15, 10],
    [25, 20],
    [35, 10]
  ])
]

const Vortex3 = [
  bt.nurbs([
    [25, 20],
    [35, 30],
    [45, 20]
  ])
]

const Vortex4 = [
  bt.nurbs([
    [35, 10],
    [45, 20],
    [55, 10]
  ])
]

const Vortex5 = [
  bt.nurbs([
    [45, 20],
    [55, 30],
    [65, 20]
  ])
]

const Vortex6 = [
  bt.nurbs([
    [55, 10],
    [65, 20],
    [75, 10]
  ])
]

const Vortex7 = [
  bt.nurbs([
    [65, 20],
    [75, 30],
    [85, 20]
  ])
]

const BoatBody = [
  bt.nurbs([
    [80, 40],
    [50, 5],
    [10, 40]
  ])
]

const ShipMast = [[
  [45, 40],
  [45, 70],
  [55, 70],
  [55, 40]
]]

const Flag1 = [[
  [75, 70],
  [75, 80],
  [25, 80],
  [25, 70]
]]

const Flag2 = [[
  [75, 80],
  [75, 90],
  [25, 90],
  [25, 80]
]]

const Flag3 = [[
  [75, 90],
  [75, 100],
  [25, 100],
  [25, 90]
]]

// draw it
drawLines(BoatBody, { fill: "#781414" });
drawLines(ShipMast, { fill: "#257b9c" })
drawLines(Flag1, { fill: "#FFCE00" })
drawLines(Flag2, { fill: "#DD0000" })
drawLines(Flag3, { fill: "#000000" })
drawLines(Water, { fill: "#7fcdff" });
drawLines(Vortex1);
drawLines(Vortex2);
drawLines(Vortex3);
drawLines(Vortex4);
drawLines(Vortex5);
drawLines(Vortex6);
drawLines(Vortex7);