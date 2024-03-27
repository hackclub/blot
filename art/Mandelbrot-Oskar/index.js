/*
@title: mandelbrot
@author: oskar
@snapshot: 1.png
*/

const size = 125; // width and height of display
const gridsize = 250; // size of grid that lines are on
const px_per_mm = gridsize/size; // how many grid pixels per mm
const shaded = true // scan lines

let xrange = [-2,0.5]
let yrange = [-1.125,1.125]
setDocDimensions(size, size);

const shapes = createTurtle() // high level turtle

function mandelbrot_px(x,y) { // calculates mandelbrot set inclusion for a complex number (x+iy)
  let z1 = 0 
  let z2 = 0
  let c = 0
  let itr = 0
  let max_itr = 1000
  let newz1 = 0
  while (z2*z2 + z1*z1 <= 4 && itr <= max_itr) {
    newz1 = z1*z1 - z2 *z2 + x
    z2 = 2*z1*z2 + y
    z1 = newz1
    itr++
  }
  return itr
}

function shade(pixsize, density) { // shades a pixel to a given density (in lines/mm)
  const t = createTurtle()
  for (let i = 0; i < pixsize; i += (1/density)) {
    t.goTo([0,i])
    t.down()
    t.forward(pixsize)
    t.up()
  }
  return t
}

function map_linear(f1, f2, t1, t2, val) { // simple linear mapping to make it easier to get complex values
  let f_dist = f1-f2
  let t_dist = t1-t2
  let mult = t_dist / f_dist
  return val*mult + t1
}

let x_cent = 0
let y_cent = 0 // x and y center to check
let itr = 0
while (itr < 10000) { // checks a bunch of ranom points in the range
  x_cent = map_linear(0,1,-2,0.5,Math.random())
  y_cent = map_linear(0,1,-1.125,1.125,Math.random())
  itr++
  let val = mandelbrot_px(x_cent,y_cent) // the mandelbrot value of the point
  if (val < 1000 && val > 70) { // if point is classified as "interesting"
    let zoom = Math.pow(0.1,Math.random()*5) // set a zoom and zoom in on it.
    xrange = [x_cent-zoom, x_cent+zoom]
    yrange = [y_cent-zoom, y_cent+zoom]
    break; 
  }
}

let pixarr = [] // array of computed pixels

for (let x = 0; x<gridsize; x++) {
  let row = []
  for (let y = 0; y<gridsize; y++) {
    let thing = Math.round(Math.log(mandelbrot_px(map_linear(0, gridsize, xrange[0], xrange[1], y), map_linear(0, gridsize, yrange[0], yrange[1], x)), 1.05)) // calls mandelbrot_px on scaled coordinates
    // above line also takes the log base 1.05 of that and rounds it, to better render things up close (so that not everything is a border)
    row.push(thing)
  }
  pixarr.push(row)
}

let pixels_to_render = []
for (let y = 0; y < pixarr.length; y++) {
  let render_row = []
  for (let x = 0; x < pixarr[0].length; x++) {
    let v = pixarr[y][x]
    if ((pixarr[y+1] == undefined || pixarr[y-1] == undefined) || (v != pixarr[y+1][x] || v != pixarr[y][x+1])) { // this determines if something is different from any of it's neighbors
      render_row.push(v)
    } else {
      render_row.push(0) // push a null value
    }
  }
  pixels_to_render.push(render_row)
}

if (shaded == true) {
  let t = createTurtle()
  for (let y = 0; y < pixels_to_render.length; y++) {
    let block_begin = 0
    let block_val = false
    for (let x = 0; x < pixels_to_render[0].length; x++) {
      let cond = (pixels_to_render[y][x] != 0)
      if (cond != block_val) {
        if (block_val) {
          t.up()
          t.goTo([block_begin/px_per_mm, y/px_per_mm])
          t.down()
          t.goTo([x/px_per_mm, y/px_per_mm])
        }
        block_begin = x
        block_val = !block_val
      }
    }
    if (block_val) {
      t.up()
      t.goTo([block_begin/px_per_mm, y/px_per_mm])
      t.down()
      t.goTo([gridsize/px_per_mm, y/px_per_mm])
    }
  }
  shapes.join(t)
}

if (shaded == false) {
  for (let y = 0; y < pixels_to_render.length; y++) {
    for (let x = 0; x < pixels_to_render[0].length; x++) {
      if (pixels_to_render[y][x] != 0) { // ignore the 0s
        const t = createTurtle()
        // check if the pixel diagonally down and to the left to v is the same, and if it is draws a line to it
        if (x > 0 && y < gridsize-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x-1]) {
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(-1)/px_per_mm,(1)/px_per_mm])
        }
        // check if the pixel diagonally down and to the right to v is the same, and if it is draws a line to it
        if (x < gridsize-1 && y < gridsize-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x+1]){
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(1)/px_per_mm,(1)/px_per_mm])
        }
        // check if the pixel to the right of v is the same, and if it is draws a line to it
        if (x < gridsize-1 && pixels_to_render[y][x] == pixels_to_render[y][x+1]) {
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(1)/px_per_mm,0])
        }
        // check if the pixel below v is the same, and if it is draws a line to is
        if (y < gridsize-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x]) {
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([0,(1)/px_per_mm])
        }
        t.translate([x/px_per_mm,y/px_per_mm])
        shapes.join(t)
      }
    }
  }
}
shapes.translate([size / 2, size / 2], shapes.cc) // center it
drawTurtles([shapes]) // draw it