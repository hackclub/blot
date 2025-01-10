/*
@title: wireframe sphere
@author: piplup7575
@snapshot: snapshot1.png
*/

// this project is based off of https://www.desmos.com/calculator/9wnbwaas3z, also created by me

// dimention size of blot
setDocDimensions(100, 100);

// orentation of the ball
const a = bt.randInRange(0, 10);
const b = bt.randInRange(0, 10);
const c = -.3*a*b;

// resolution
const n = 7;

// placeholders
let j = 0;
let k = 0;
let l = 0;
let m = 0;
const finalLines1 = [];
const finalLines2 = [];
let polyline1 = [];
let polyline2 = [];

// math! glorious math!
const xX = Math.cos(c) * Math.cos(a) - Math.sin(c) * Math.sin(a) * Math.sin(b);
const xY = Math.cos(c) * Math.sin(a) * Math.sin(b) + Math.sin(c) * Math.cos(a);

const yX = - Math.cos(c) * Math.sin(a) - Math.sin(c) * Math.cos(a) * Math.sin(b);
const yY = Math.cos(c) * Math.cos(a) * Math.sin(b) - Math.sin(c) * Math.sin(a);

const zX = - Math.sin(c) * Math.cos(b);
const zY = Math.cos(c) * Math.cos(b);

function g(x) {
  return Math.PI * ( Math.floor(x*n) / n);
};

function h(x) {
  return (x * n * 2 * Math.PI) % (2 * Math.PI);
};

function fX(q,d) {
  return Math.sin(d) * Math.cos(q);
};

function fY(q,d) {
  return Math.sin(d) * Math.sin(q);
};

function fZ(q,d) {
  return Math.cos(d);
};

// calculate points on the sphere, upscale
function sphere(q) {
  j = xX * fX(h(q),g(q)) + yX * fY(h(q),g(q)) + zX * fZ(h(q),g(q));
  k = xY * fX(h(q),g(q)) + yY * fY(h(q),g(q)) + zY * fZ(h(q),g(q));

  l = xX * fX(g(q),h(q)) + yX * fY(g(q),h(q)) + zX * fZ(g(q),h(q));
  m = xY * fX(g(q),h(q)) + yY * fY(g(q),h(q)) + zY * fZ(g(q),h(q));
  
  j = j * 40 + 50;
  k = k * 40 + 50;
  l = l * 40 + 50;
  m = m * 40 + 50;
}

// iterate so all points are included
for (let i = 0; i <= 1.0001; i = i + 0.0001) {
  sphere(i);
  polyline1.push([j, k]);
  polyline2.push([l, m]);
}

// plot sphere!
finalLines1.push(polyline1);
finalLines2.push(polyline2);
drawLines(finalLines1);
drawLines(finalLines2);