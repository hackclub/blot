/*
@title: Icicles
@author: Dhyan99
@snapshot: 0.png
*/

setDocDimensions(500, 500);

// Change this stuff
const LengthOfIcicles = 5 // -30 to 200
const NumberOfLayers = 20




// End changing stuff



const WIDTH = 500;
const HEIGHT = 500;
const START = 515;

let icy = [];
const icyNum = NumberOfLayers;
const icySpacing = START / icyNum;

for (let i = 0; i < icyNum; i++) {
  let tempIcy = new bt.Turtle();

  tempIcy.jump([0, START - (i * icySpacing) + LengthOfIcicles]);
  tempIcy.forward(500);

  bt.join(icy, tempIcy.lines());
}

bt.resample(icy, 1);

bt.iteratePoints(icy, pt => {
  let [x, y] = pt;
  let scale = (START) * 0.4
  y += bt.randInRange(0, 1)
  y += bt.noise([x * 0.03]) * scale
  y *= 2
  if (y < 0 || y > START) {
    return "REMOVE";
  }
  return [x, y];
})


drawLines(icy);