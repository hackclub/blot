/*
@title: CircleGen
@author: Ruben Stenlund
@snapshot: bird.png
*/


//what the image should be of
const query = "<your image prompt>"
//amount of circles - horizontally
const width = 80
// multiplier of the size of the circles
const radius_multiplier = 1;
//size scaler
const scale = 1;


function drawImage(image) {
  const t = new bt.Turtle();

  const width = image[0].length * scale;
  const height = image.length * scale;

  setDocDimensions(width, height);

  const finalLines = [];
  for (let y = 0; y < image.length - 1; y++) {
    for (let x = 0; x < image[0].length - 1; x++) {
      let pos_x = x * scale;
      let pos_y = image.length - y * scale;
      let radius = (1 - (image[y][x] / 255)) * (scale / 2) * radius_multiplier;
      t.up();
      t.goTo([pos_x, pos_y - radius]);
      t.forward(scale / 2);
      t.down();
      t.arc(360, radius);
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
  drawImage(newImage);
}


fetchCells(query, width);