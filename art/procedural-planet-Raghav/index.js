/*
@title: stoopidity77
@author: Raghav Sinha
@snapshot: procedural planets
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

let pixels = []
let centerx = 60;
let centery = 60;
let noisescale = 0.025
let a = bt.randIntInRange(0,20000)


for(let i = 0; i < 25; i ++){
  pixels.push([]);
  for(let j = 0; j < 25; j++){
    let x = j*5-centerx;
    let y = i*5 - centery;
    if((x*x)+(y*y) <= 3400){
      let brightness = Math.abs(bt.noise([(x+centerx+a)*noisescale,(y+centery+a)*noisescale]));
      if(brightness>0.5){
        pixels[i].push("0");
      }else{
        if(brightness > 0.4){
          pixels[i].push("1");
        }else{
          pixels[i].push("2");
        }
      }
    }else{
      if(bt.rand()>0.3){
      pixels[i].push(".");
      }else{
        pixels[i].push("?");
      }
    }
  }
}
const makePixel = (x, y, brightness,size) => {
  let square = [[x,y],[x+size,y],[x+size,y+size],[x,y+size],[x,y]];
  let lines = [];
  let xs = [];
  let ys = [];
  let segments = Math.round(brightness/5);
  for(let j = 0; j < size;j+= size/segments){
    let i = j*2+1
    xs.push(x);
    ys.push(y+i);
    xs.push(x+i);
    ys.push(y);
    xs.push(x+size-i);
    ys.push(y+size);
    xs.push(x+size);
    ys.push(y+size-i);
  }

  for(let i = 0; i < xs.length/2; i+=2){
    lines.push([[xs[i],ys[i]],[xs[i+1],ys[i+1]]]);
  }
  return [square,lines];
}
  
// store final lines here
const finalLines = [];

// create a polyline
const polyline = [
  [30, 90],
  [100, 90],
  [100, 30],
  [30, 30],
  [30, 90]
];

for(let i = 0; i < pixels.length; i++){
  for(let j = 0; j < pixels[i].length; j++){
    if(pixels[i][j] === "0"){
      drawLines([makePixel(j*5+0.1,i*5+0.1,0,5)[0]]);
      drawLines(makePixel(j*5+0.1,i*5+0.1,50,5)[1]);
    }if(pixels[i][j] == "1"){
drawLines([makePixel(j*5+0.1,i*5+0.1,0,5)[0]]);
      drawLines(makePixel(j*5+0.1,i*5+0.1,25,5)[1]);    }
        if(pixels[i][j] === "2"){
      drawLines([makePixel(j*5+0.1,i*5+0.1,0,5)[0]]);
                drawLines(makePixel(j*5+0.1,i*5+0.1,12.5,5)[1]);    

    }
    if(pixels[i][j] === "?"){
      let size = bt.randIntInRange(1,4);
            drawLines([makePixel(j*5,i*5,0,size)[0]]);
    }
  }
}


