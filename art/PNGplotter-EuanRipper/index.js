/*
@title: PNG sketcher
@author: Euan Ripper
@snapshot: Hack club icon
*/

setDocDimensions(125, 125);
//// PARAMETERS
const finalLines = [];
const t = new bt.Turtle();



const url = "https://raw.githubusercontent.com/EuanRipper/datadump/main/icon.txt";


var lines = [];

var request = new XMLHttpRequest();
request.open("GET", url, false);
request.send(null);
const image = request.responseText;
var dump = image.split(",");
const width = 52;
const height = dump.length / width
var rr = bt.randInRange;

function spiral(x, y, intensity, width) {
  //console.log(x,y,intensity,width)
  y=-y+120
  for (let j = 0; j < Math.round((intensity)); j++) {
    t.up();
    //+rr(0,125 / width)
    t.goTo([x + rr(0, 125 / width), y + rr(0, 125 / width)])
    t.down()
    t.goTo([x + rr(0, 125 / width), y + rr(0, 125 / width)])
    t.up();
  }
  return (t)
}
var dots= 0
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    spiral(x*125/width, y*119/width, Math.min(Math.floor(254-dump[x + y * width])/44,4), width)
    dots = dots + Math.min(Math.floor(255-dump[x + y * width])/129,6)
  }
}
bt.join(finalLines, t.lines());
drawLines(finalLines);
console.log(dots)