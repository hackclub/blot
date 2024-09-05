/*
@title: Diffraction
@author: ken
@snapshot: gapW=10


What is Diffraction
Diffraction is the bending or spreading of waves around the edges of an obstacle or through a gap, 
as they enter the shadowed region behind it. The amount of diffraction depends on the size of the gap 
compared to the wavelength of the waves. Diffraction is most pronounced when the gap size is similar 
to the wavelength, causing the waves to spread out in semi-circular patterns. (Source: Wikipedia)

Why I Chose Diffraction as My Theme
I drew inspiration from this piece (https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/2DLight-Will/index.js). 
At first, I noticed it seemed to block the light coming from the center. 
So, I thought of creating an opposite work—one that enhances the energy radiating from the center. 
When water waves pass through a slit, diffraction occurs, introducing curves into the otherwise uniform,
parallel wavefronts. I added lines perpendicular to the wavefronts to intensify the sense of outward radiation.

*/
const width = 120;
const height = 130;

setDocDimensions(width, height);

// Slit
const barW = 20;
const gapW = 10;
const barY = 80;
const gapL = (width - gapW) / 2;
const gapR = (width + gapW) / 2;
drawLines([
  [
    [0, barY],
    [gapL, barY]
  ],
  [
    [gapR, barY],
    [width, barY]
  ]
], { stroke: "blue" });

// Wavefront
const srcX = width / 2;
const srcY = height - 10;
const waveL = 10; // Wavelength
const numWaves = (srcY - waveL) / waveL; // Number of wavefronts
const waveSpacing = waveL; // Spacing between wavefronts

let r = waveL;
const tur = new bt.Turtle();

tur.jump([gapL, barY]);
tur.setAngle(-90);
for (let x = gapL; x <= gapR; x++) {
  tur.jump([x, barY]);
  tur.forward(barY - 0.1);
  const path = tur.path;
  drawLines(path, { stroke: "gray" });
};

// Left wavefront lines
const turL = new bt.Turtle();
for (let theta = -90; theta > -180; theta -= (90 / gapW)) {
  turL.jump([gapL, barY]);
  turL.down();
  turL.setAngle(theta);
  let x = turL.pos[0];
  let y = turL.pos[1];
  for (let i = 0; i < 1000; i++) {
    x = turL.pos[0];
    y = turL.pos[1];
    turL.forward(0.1);
    if (x < 0.1 || y < 0.1) {
      break;
    };
  };
  const path = turL.path;
  drawLines(path, { stroke: "gray" });
};

// Right wavefront lines
const turR = new bt.Turtle();
for (let theta = -90; theta < 0; theta += (90 / gapW)) {
  turR.jump([gapR, barY]);
  turR.down();
  turR.setAngle(theta);
  let x = turR.pos[0];
  let y = turR.pos[1];
  for (let i = 0; i < 1000; i++) {
    x = turR.pos[0];
    y = turR.pos[1];
    turR.forward(0.1);
    if (x > width - 0.1 || y < 0.1) {
      break;
    };
  };
  const path = turR.path;
  drawLines(path, { stroke: "gray" });
};

// Arc curves between wavefronts
let turY = barY - waveL;
tur.jump([gapL, barY - waveL]);
tur.right(180);

for (let i = 0; i < numWaves; i++) {
  const yOffset = srcY - (i + 1) * waveSpacing;
  const line = [];
  
  // Left arc
  tur.up();
  tur.jump([gapL, turY]);
  tur.setAngle(180);
  tur.down();
  tur.arc(-90, r);
  const pathL = tur.path;

  const filteredPathL = bt.iteratePoints(pathL, (pt) => {
    const [x, y] = pt;

    if (x <= 0 || y <= 0) {
      return "REMOVE";
    }
    return [x, y];
  });
  drawLines(filteredPathL);

  // Right arc
  tur.up();
  tur.jump([gapR, turY]);
  tur.setAngle(0);
  tur.down();
  tur.arc(90, r);
  const pathR = tur.path;

  const filteredPathR = bt.iteratePoints(pathR, (pt) => {
    const [x, y] = pt;

    if (x >= width || y <= 0) {
      return "REMOVE";
    }
    return [x, y];
  });

  drawLines(filteredPathR);

  r += waveL;
  turY -= waveL;
  
  // Parallel lines
  for (let x = 0; x <= width; x++) {
    let blocked = false;
    if (yOffset <= barY) {
      if (x > gapR || x < gapL) {
        blocked = true;
      }
    }

    if (!blocked) {
      line.push([x, yOffset]);
    }
  }

  if (line.length > 0) {
    drawLines([line], { stroke: "black" });
  }
}
