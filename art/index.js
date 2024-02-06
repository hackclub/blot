const width = 125;
const height = 125; // height and width of display (cloned from square disarray)
const gridwidth = 500; // size of grid that lines are on
const px_per_mm = gridwidth/width; // how many grid pixels per mm
const shaded = true

setDocDimensions(width, height);

const shapes = createTurtle() // high level turtle

function mandelbrot_px(x,y) { // calculates mandelbrot set inclusion for a complex number (x+iy)
  let z1 = 0
  let z2 = 0
  let c = 0
  let itr = 0
  let max_itr = 100
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

let pixarr = [] // array of computed pixels

for (let x = 0; x<gridwidth; x++) {
  let row = []
  for (let y = 0; y<gridwidth; y++) {
    let thing = mandelbrot_px(map_linear(0, gridwidth, -2, 0.5, y), map_linear(0, gridwidth, -1.12, 1.12, x)) // calls mandelbrot_px on scaled coordinates
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
        console.log("hi")
      }
    }
    if (block_val) {
      t.up()
      t.goTo([block_begin/px_per_mm, y/px_per_mm])
      t.down()
      t.goTo([gridwidth/px_per_mm, y/px_per_mm])
    }
    console.log("itr done")
  }
  shapes.join(t)
}

if (shaded == false) {
  for (let y = 0; y < pixels_to_render.length; y++) {
    for (let x = 0; x < pixels_to_render[0].length; x++) {
      if (pixels_to_render[y][x] != 0) { // ignore the 0s
        const t = createTurtle()
        // check if the pixel diagonally down and to the left to v is the same, and if it is draws a line to it
        if (x > 0 && y < gridwidth-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x-1]) {
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(-1)/px_per_mm,(1)/px_per_mm])
        }
        // check if the pixel diagonally down and to the right to v is the same, and if it is draws a line to it
        if (x < gridwidth-1 && y < gridwidth-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x+1]){
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(1)/px_per_mm,(1)/px_per_mm])
        }
        // check if the pixel to the right of v is the same, and if it is draws a line to it
        if (x < gridwidth-1 && pixels_to_render[y][x] == pixels_to_render[y][x+1]) {
          t.up()
          t.goTo([0,0])
          t.down()
          t.goTo([(1)/px_per_mm,0])
        }
        // check if the pixel below v is the same, and if it is draws a line to is
        if (y < gridwidth-1 && pixels_to_render[y][x] == pixels_to_render[y+1][x]) {
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
console.log("hi")
shapes.translate([width / 2, height / 2], shapes.cc) // center it
console.log("hi")
drawTurtles([shapes]) // draw it
console.log("fin")