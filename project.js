/*
  Welcome to Blot!

  To get started with learning Blot's toolkit,
  you can find a handful of guides here: https://blot.hackclub.com/guides

  You can find full documentation on Blot's toolkit by clicking the button at the top!

 Before you make a submission, there are a couple *mandatory* requirements for your PR:

 - It must be drawable in Blot! This means keeping the dimensions at 125x125 or smaller
 - It must change based on different parameters; it cannot be hardcoded.

*/
const width = 135;
const height = 135;
const x = bt.randInRange(0.9, 3);
const y = bt.randInRange(0.9, 3);

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const line = [
  [60/x, 10/y],
  [30/x, 10/y],
  [20/x, 30/y],
  [19/x, 50/y],
  [21/x, 70/y],

  [18/x, 110/y],
  [19/x, 112/y],
  [21/x, 113/y],
  [22/x, 113/y],
  [24/x, 112/y],
  [25/x, 112/y],
  [26/x, 110/y],

  [30/x, 70/y],
  [34/x, 71/y],

  [34/x, 115/y],
  [35/x, 117/y],
  [37/x, 118/y],
  [38/x, 118/y],
  [40/x, 117/y],
  [41/x, 117/y],
  [42/x, 115/y],

  [43/x, 71/y],
  [47/x, 72/y],
  [48/x, 90/y],

  [47/x, 120/y],
  [48/x, 121/y],
  [50/x, 122/y],
  [51/x, 122/y],
  [53/x, 121/y],
  [54/x, 121/y],
  [55/x, 120/y],

  [56/x, 90/y],
  [55/x, 72/y],
  [59/x, 71/y],

  [67/x, 113/y],
  [68/x, 114/y],
  [70/x, 114/y],
  [71/x, 115/y],
  [73/x, 115/y],
  [74/x, 114/y],
  [75/x, 112/y],

  [70/x, 71/y],
  [69/x, 55/y],
  [71/x, 45/y],
  [73/x, 43/y],
  [74/x, 43/y],
  [75/x, 44/y],
  [85/x, 55/y],
  [87/x, 60/y],
  [93/x, 68/y],
  [98/x, 71/y],
  [100/x, 71/y],
  [103/x, 70/y],
  [102/x, 65/y],
  [101/x, 63/y],
  [99/x, 55/y],
  [99/x, 50/y],
  [90/x, 34/y],
  [65/x, 10/y],
  [60/x, 10/y]

];

// add the polyline to the final lines
finalLines.push(line);

// transform lines using the toolkit
bt.rotate(finalLines, 0);

// draw it
drawLines(finalLines);