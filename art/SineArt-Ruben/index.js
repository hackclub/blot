/*
@title: SineArt
@author: Ruben Stenlund
@snapshot: lion.png
*/


//what the image should be of
const query = "<image prompt>"
//image resolution
const width = 300
// multiplier of the size of the circles
const radius_multiplier = 1;
//multiplier for size of output
const scale = 1;
// amount of horizontal steps (lower number will give higher resolution)
const step_x = 0.1
const step_y = 2
// multiplier for the wave frequency
const freq_multiplier = 0.5

function lerp(a, b, alpha) {
  return a + alpha * (b- a)
}

function drawImage(image) {
  const t = new bt.Turtle();

  const width = image[0].length * scale;
  const height = image.length * scale;

  setDocDimensions(width, height);
  let sinusFactor = 1
  const finalLines = [];
  for (let y = 0; y < image.length - 1; y+=Math.round(step_y)) {
    sinusFactor = 1
    let pos_y = image.length - y * scale;
    t.up()
    t.goTo([0, pos_y])
    t.down()

    for (let x = 0; x < image[0].length - 1; x+=step_x) {
      let x_index = Math.round(x)
      let pos_x = x * scale;
      let pixel = 255-image[y][x_index]
      sinusFactor = lerp(sinusFactor, x * pixel / 255, 0.06)
      let sinus_change = Math.sin(sinusFactor*freq_multiplier) * pixel / 300
      t.goTo([pos_x, pos_y + sinus_change]);
    }
  }


  bt.join(finalLines, t.lines());

  // center piece
  const cc = bt.bounds(finalLines).cc;
  bt.translate(finalLines, [width / 2, height / 2], cc);

  // draw it
  drawLines(finalLines);
}


function fetchCells(q, w) {
  const url = "https://130.61.120.29:3001/img?query=" + q + "&w=" + w
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.send();
  const newImage = JSON.parse(req.response).image_cells;
  console.log(newImage)
  drawImage(newImage);
}


fetchCells(query, width);