/*
@title: iPhone
@author: abjectbrake
@snapshot: snapshot3.png
*/

const cl = 46 //slide to change length of camera bar
const cpl = bt.randInRange(14,40);
const cpr = bt.randInRange(21.5,32.5);
//const cpt = bt.randInRange(
//const cpb = bt.randInRange(
const rh = bt.randInRange(200, 205);
const rw = bt.randInRange(100, 105);

drawLines([
 [[0,0],[0,rw]],
  [[rh,0],[0,0]],
  [[rh,0],[rh,rw]],
  [[0,rw],[rh,rw]],

  //Camera Bar
  [[10,10],[10,cl]],
  [[10,10],[cpr+15,10]],
  [[cpr+15,10],[cpr+15,cl]],
  [[10,cl],[cpr+15,cl]],

  //Larger camera
  [[12.5,12.5],[22.5,12.5]],
  [[12.5,12.5],[12.5,22.5]],
  [[12.5,22.5],[22.5,22.5]],
  [[22.5,22.5],[22.5,12.5]],

  //Smaller camera
  [[cpl,42.5],[cpr,42.5]],
  [[cpl,42.5],[cpl,34.5]],
  [[cpl,34.5],[cpr,34.5]],
  [[cpr,34.5],[cpr,42.5]],

  //Apple
  [[90,40],[90,60]],
  [[110,40],[110,60]],
  [[90,40],[110,40]],
  [[95,55],[105,55]],
  [[90,60],[95,55]],
  [[110,60],[105,55]],

  //Stem
  [[88,52.5],[86,47.5]],
  [[88,52.5],[81,56]],
  [[81,56],[79,50]],
  [[79,50],[86,47.5]],
  
  ])





