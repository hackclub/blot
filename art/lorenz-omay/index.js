/*
@title: Lorenz Attractor
@author: Leonard (Omay)
@snapshot: lorenz.png
*/

const rho = 28;
const sigma = 10;
const beta = 8 / 3;

const xAxis = "x"; // Change to "x", "y", or "z"
const yAxis = "z"; // Change to "x", "y", or "z"

const dt = 0.01;
const finalIter = 10000;

const width = 125;
const height = 125;
const margin = 10;

setDocDimensions(width, height);

let iter = 0;
let lines = [];

let x = 1;
let y = 1;
let z = 1;

let minA = Infinity, maxA = -Infinity;
let minB = Infinity, maxB = -Infinity;

let prevA = 0, prevB = 0;

while (iter < finalIter) {
  let xt = x;
  let yt = y;
  let zt = z;
  x = xt + sigma * (yt - xt) * dt;
  y = yt + (xt * (rho - zt) - yt) * dt;
  z = zt + (xt * yt - beta * zt) * dt;

  let a = 0, b = 0;

  if (xAxis === "x") a = x;
  else if (xAxis === "y") a = y;
  else if (xAxis === "z") a = z;
  
  if (yAxis === "x") b = x;
  else if (yAxis === "y") b = y;
  else if (yAxis === "z") b = z;

  if (a < minA) minA = a;
  if (a > maxA) maxA = a;
  if (b < minB) minB = b;
  if (b > maxB) maxB = b;

  if (iter > 0) {
    lines.push([[prevA, prevB], [a, b]]);
  }

  prevA = a;
  prevB = b;

  iter++;
}

let scaleX = (width - 2 * margin) / (maxA - minA);
let scaleY = (height - 2 * margin) / (maxB - minB);
let scale = Math.min(scaleX, scaleY);

let offsetX = margin + (width - 2 * margin - (maxA - minA) * scale) / 2;
let offsetY = margin + (height - 2 * margin - (maxB - minB) * scale) / 2;

lines = lines.map(val => {
  return [
    [(val[0][0] - minA) * scale + offsetX, (val[0][1] - minB) * scale + offsetY],
    [(val[1][0] - minA) * scale + offsetX, (val[1][1] - minB) * scale + offsetY]
  ];
});

drawLines(lines);
