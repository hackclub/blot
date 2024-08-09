const url = "https://raw.githubusercontent.com/DedFishy/CHEESE/main/lc.txt";

var lines = [];

var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send(null);
const image = request.responseText;

console.log(image);

const im_row_list = image.split("-")

const width = im_row_list[0].length;
const height = im_row_list.length;
console.log(width);
console.log(height);


setDocDimensions(width, height);

function makeLine(startX, endX, y) {
  y = height - y; // Flips it since y=0 is at the bottom for some reason
  lines.push([
    [startX, y],
    [endX, y]
  ]);
}

for (let y = 0; y < height; y++) {
  let line_beginning = -1;
  
  for (let x = 0; x < width; x++) {

    // If a solid part is there...
    if (im_row_list[y][x] == 0) {
      
      // ...begin the line if we haven't already
      if (line_beginning == -1) {
        line_beginning = x;
      } 
    }
    // ...otherwise...
    else {
      // ..end the line if it has been started
      if (line_beginning != -1) {
        makeLine(line_beginning, x, y);
        line_beginning = -1;
      }
    }
  }
  // If there's still a line being drawn, we need to cut it off here
  if (line_beginning != -1) {
    makeLine(line_beginning, width, y);
  }

  
    
}

drawLines(lines);
