/*
  Welcome to Blot!

  To get started with learning Blot's toolkit,
  you can find a handful of guides here: https://blot.hackclub.com/guides

  You can find full documentation on Blot's toolkit by clicking the button at the top!

 Before you make a submission, there are a couple *mandatory* requirements for your PR:

 - It must be drawable in Blot! This means keeping the dimensions at 125x125 or smaller
 - It must change based on different parameters; it cannot be hardcoded.

*/
/*
@title: Double Singularities
@author: Dillion Weaver
@snapshot: image1
*/

const width = 125;
const height = 125;
const rr = bt.randInRange

setDocDimensions(width, height);

var singularity = [rr(0, width), rr(0, height)]
var antiSingularity = [width - singularity[0], height - singularity[0]]
var depth = 2
var singularityRadius = 53

/*
if(singularity[0] > width){ singularity[0] = width }
if(singularity[0] < 0){ singularity[0] = 0 }

if(singularity[1] > height){ singularity[1] = height }
if(singularity[1] < 0){ singularity[1] = 0 }
*/

// store final lines here
const finalLines = [];

for(let x=0; x<width; x+= depth){
  for(let y=0; y<height; y+= depth){
    let dx = singularity[0] - x
    let dy = singularity[1] - y
    let distFromRadius = Math.sqrt( dx*dx + dy*dy )
    let goTo = singularity
    
    if(distFromRadius >= singularityRadius){
      let dx = antiSingularity[0] - x
      let dy = antiSingularity[1] - y
      let distFromAntiRadius = Math.sqrt( dx*dx + dy*dy )
      if(distFromAntiRadius <= singularityRadius){
        goTo = antiSingularity
      }
      else{continue}
    }
    
    finalLines.push([
      [x,y],
      goTo
    ])
  }
}


// draw it
drawLines(finalLines);