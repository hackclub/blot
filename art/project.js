/*

@title: Oikko's Hand
@Author: Mohammad Islam
@snapshot: capture2.PNG


  Welcome to Blot!

  To get started with learning Blot's toolkit,
  you can find a handful of guides here: https://blot.hackclub.com/guides

  You can find full documentation on Blot's toolkit by clicking the button at the top!

 Before you make a submission, there are a couple *mandatory* requirements for your PR:

 - It must be drawable in Blot! This means keeping the dimensions at 125x125 or smaller
 - It must change based on different parameters; it cannot be hardcoded.

*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const line = [
  [60, 10],
  [30, 10],
  [20, 30],
  [19, 50],
  [21, 70],
  
  [18, 110],
  [19, 112],
  [21, 113],
  [22, 113],
  [24, 112],
  [25, 112],
  [26, 110],
  
  [30, 70],
  [34, 71],
  
  [34, 115],
  [35, 117],
  [37, 118],
  [38, 118],
  [40, 117],
  [41, 117],
  [42, 115],
  
  [43, 71],
  [47, 72],
  [48, 90],
  
  [47, 120],
  [48, 121],
  [50, 122],
  [51, 122],
  [53, 121],
  [54, 121],
  [55, 120],
  
  [56, 90],
  [55, 72],
  [59, 71],
  
  [67, 113],
  [68, 114],
  [70, 114],
  [71, 115],
  [73, 115],
  [74, 114],
  [75, 112],
  
  [70, 71],
  [69, 55],
  [71, 45],
  [73, 43],
  [74, 43],
  [75, 44],
  [85, 55],
  [87, 60],
  [93, 68],
  [98, 71],
  [100, 71],
  [103, 70],
  [102, 65],
  [101, 63],
  [99, 55],
  [99, 50],
  [90, 34],
  [65, 10],
  [60, 10]
  
];




// add the polyline to the final lines
finalLines.push(line);

// transform lines using the toolkit
bt.rotate(finalLines, 0);

// draw it
drawLines(finalLines);