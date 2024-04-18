/*
@title: Ear
@author: Cindy Wang
@snapshot: pic
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);
var x = bt.randInRange(0.5, 1.5);
var y = bt.randInRange(0.5, 1.5);
var a = bt.randInRange(0, 10);
var b = bt.randInRange(0, 10);
const outer = bt.catmullRom([
  [29*x, 91*y+b],
  [38*x, 108*y],
  [55*x+a,113*y],
  [74*x, 102*y+b],
  [82*x+a, 77*y],
  [76*x+a, 57*y+b],
  [56*x, 45*y],
  [50*x, 33*y],
  [34*x+a, 32*y],
  [32*x, 40*y]
])
const inner = bt.catmullRom([
  [54*x, 56*y],
  [68*x+a, 68*y+b],
  [68*x+a, 91*y],
  [45*x, 101*y],
  [39*x, 89*y+b],
  [59*x, 71*y],
  [43*x+a, 59*y],
  [42*x, 48*y],
  [32*x, 50*y+b],
  [34*x, 66*y],
  [41*x, 70*y+b],
])
drawLines([outer])
drawLines([inner])


