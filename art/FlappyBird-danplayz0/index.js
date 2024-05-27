/*
@title: Flappy Bird
@author: DanPlayz (danplayz0)
@snapshot: nameOfPicture.png
*/
// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start
const width = 125;
const height = 125;
setDocDimensions(width, height);

// Pipe Settings
const pipeCount = 1;
const pipeWidth = 4; // pipe covers are 2 pixels more
const pipeGap = 10; 

// Bird Settings
const birdPositionX = 15;
const birdPositionY = 60;


// Credits to Stack Overflow for the 'getRandomInt' function
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pipe Spawner
for (let spawnedPipes = 0; spawnedPipes<pipeCount; spawnedPipes++) {
  const i = width-6 - (spawnedPipes * (pipeWidth+2+pipeGap));
  if (i < 0) break;

  const topPipeSpawnY = getRandomInt(4, 30);
  const bottomPipeSpawnY = getRandomInt(-4, -30);
  
  const bottomPipeCover = [
    [i - (pipeWidth+2), height / 2 - 1 + bottomPipeSpawnY],
    [i + (pipeWidth+2), height / 2 - 1 + bottomPipeSpawnY],
    [i + (pipeWidth+2), height / 2 + 1 + bottomPipeSpawnY],
    [i - (pipeWidth+2), height / 2 + 1 + bottomPipeSpawnY],
    [i - (pipeWidth+2), height / 2 - 1 + bottomPipeSpawnY],
  ];
  const bottomPipe = [
    [i - pipeWidth, height / 2 - 10 + bottomPipeSpawnY],
    [i + pipeWidth, height / 2 - 10 + bottomPipeSpawnY],
    [i + pipeWidth, height / 2 - 1 + bottomPipeSpawnY],
    [i - pipeWidth, height / 2 - 1 + bottomPipeSpawnY],
    [i - pipeWidth, height / 2 - 10 + bottomPipeSpawnY]
  ];
  drawLines([bottomPipeCover, bottomPipe], { fill: "green" });
  
  const topPipeCover = [
    [i - 6, height / 2 - 1 + topPipeSpawnY],
    [i + 6, height / 2 - 1 + topPipeSpawnY],
    [i + 6, height / 2 + 1 + topPipeSpawnY],
    [i - 6, height / 2 + 1 + topPipeSpawnY],
    [i - 6, height / 2 - 1 + topPipeSpawnY]
  ];
  const topPipe = [
    [i - 4, height / 2 + 10 + topPipeSpawnY],
    [i + 4, height / 2 + 10 + topPipeSpawnY],
    [i + 4, height / 2 + 1 + topPipeSpawnY],
    [i - 4, height / 2 + 1 + topPipeSpawnY],
    [i - 4, height / 2 + 10 + topPipeSpawnY]
  ];
  drawLines([topPipeCover, topPipe], { fill: "blue" });
}

// Bird
const birdPos = [
  [8+birdPositionX,1+birdPositionY],
  [1+birdPositionX,4+birdPositionY],
  [4+birdPositionX,10+birdPositionY],
  [7+birdPositionX,12+birdPositionY],
  [20+birdPositionX,6+birdPositionY],
  [8+birdPositionX,1+birdPositionY]
]
drawLines([birdPos], {fill:"yellow"});

















