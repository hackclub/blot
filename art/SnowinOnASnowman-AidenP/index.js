/*
@title: Snowin on a snowman
@author: Aiden
@snapshot: snapshotGallery.png
*/




// Doc Setup

const width = 125;
const height = 125;

setDocDimensions(width, height);

bt.setRandSeed(4072008);

// This is for the ground
const upperLim = 32

const ground = [bt.catmullRom(
  [
    [0, 20],
    [30, 20],
    [50, (bt.randInRange(20, upperLim))],
    [75, (bt.randInRange(20, upperLim))],
    [100, (bt.randInRange(20, upperLim))],
    [125, (bt.randInRange(20, upperLim))]

  ])]

// This is for the snowman generation

const size = (bt.randInRange(5, 20));

const smallerBall = (size * (bt.randInRange(.5, .9)));




// Snowman circle function
function snowmanDraw(radius, xOffset, yOffset) {
  const snowman = [bt.catmullRom( // Catmull Rom is Inclusive of the point
    [
      [xOffset, yOffset],
      [radius + xOffset, (radius + yOffset)],
      [xOffset, ((2 * radius) + yOffset)],
      [((-1 * radius) + xOffset), (radius + yOffset)],
      [xOffset, yOffset]

    ])]

  drawLines(snowman);
}





// Snowflake stuff

for (let i = 0; i < bt.randIntInRange(40, 50); i++) {

  let randomX = bt.randInRange(0, 125);
  let randomY = bt.randInRange(34, 125);


  let snowflake = [bt.catmullRom(
    [
      [randomX, randomY],
      [randomX + .5, randomY + .5],
      [randomX - 1, randomY - 1],
      [randomX + .5, randomY + .5]
    ])]
  let snowflake2 = [bt.catmullRom(
    [
      [randomX, randomY],
      [randomX + .5, randomY - .5],
      [randomX - 1, randomY + 1]
    ])]
  let snowflake3 = [bt.catmullRom(
    [
      [randomX, randomY],
      [randomX + .5, randomY],
      [randomX - 1, randomY]
    ])]

  let snowflake4 = [bt.catmullRom(
    [
      [randomX, randomY],
      [randomX, randomY + .5],
      [randomX, randomY - 1]
    ])]

  drawLines(snowflake);
  drawLines(snowflake2);
  drawLines(snowflake3);
  drawLines(snowflake4);

}





// face of snowman

// Eyes
snowmanDraw((.2 * smallerBall), (30 + (.5 * smallerBall)), (2 * size + 20) + .82 * smallerBall)

snowmanDraw((.2 * smallerBall), (30 - (.5 * smallerBall)), (2 * size + 20) + .82 * smallerBall)

// Nose
const nose = [bt.catmullRom( 
    [
      [(30 + (.1 * smallerBall)), (2 * size + 20) + (.5 * smallerBall) + (.4*smallerBall)],
      [30, (2 * size + 20) + (.2 * smallerBall) + (.4*smallerBall)],
      [(30 - (.1 * smallerBall)), (2 * size + 20) + (.5 * smallerBall) + (.4*smallerBall)]


    ])]


// Smiles
const smile = [bt.catmullRom( 
    [
      [(30 + (.4 * smallerBall)), (2 * size + 20) + (.5 * smallerBall)],
      [30, (2 * size + 20) + (.2 * smallerBall)],
      [(30 - (.4 * smallerBall)), (2 * size + 20) + (.5 * smallerBall)]


    ])]

drawLines(nose);

drawLines(smile)

snowmanDraw(size, 30, 20);

snowmanDraw(smallerBall, 30, (2 * size + 20));

drawLines(ground);