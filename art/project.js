// check out the workshop tab to get started
// welcome to blot!

// check out this guide to learn how to program in blot
// https://blot.hackclub.com/editor?guide=start

/*
@title: blotMaze
@author: Sophia
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const finalLines = [];

const maze1width = 3.5 * width / 4;
const maze1height = 3.5 * height / 4;
const maze2width = 3 * width / 4;
const maze2height = 3 * height / 4;
const maze3width = 2.5 * width / 4;
const maze3height = 2.5 * height / 4;
const maze4width = 2 * width / 4;
const maze4height = 2 * height / 4;
const maze5width = 1.5 * width / 4;
const maze5height = 1.5 * height / 4;
const maze6width = 1 * width / 4;
const maze6height = 1 * height / 4;
const crownwidth = 0.5 * width / 4;
const crownheight = 0.5 * height / 4;



function drawLine(startpointx, startpointy, endpointx, endpointy) {
  const turtle = new bt.Turtle();
  turtle.jump([startpointx, startpointy]);
  turtle.goTo([endpointx, endpointy]);
  drawLines(turtle.lines());
}

//maze layer one
drawLine((width / 2) - (maze1width / 2), (height / 2) - (maze1height / 2), (width / 2) + (maze1width / 2), (height / 2) - (maze1height / 2));
drawLine((width / 2) - (maze1width / 2), (height / 2) - (maze1height / 2), (width / 2) - (maze1width / 2), (height / 4) + (maze1height / 4));
drawLine((width / 2) - (maze1width / 2), (height / 1) - (maze1height / 2), (width / 2) - (maze1width / 2), (height / 2) + (maze1height / 2));
drawLine((width / 2) + (maze1width / 2), (height / 2) - (maze1height / 2), (width / 2) + (maze1width / 2), (height / 2) + (maze1height / 2));
drawLine((width / 2) - (maze1width / 2), (height / 2) + (maze1height / 2), (width / 2) + (maze1width / 2), (height / 2) + (maze1height / 2));

//maze layer two
drawLine((width / 2) - (maze2width / 2), (height / 2) - (maze2height / 2), (width / 2) + (maze2width / 2), (height / 2) - (maze2height / 2));
drawLine((width / 2) - (maze2width / 2), (height / 2) - (maze2height / 2), (width / 2) - (maze2width / 2), (height / 2) + (maze2height / 2));
drawLine((width / 2) + (maze2width / 2), (height / 2) - (maze2height / 2), (width / 2) + (maze2width / 2), (height / 2) + (maze2height / 2));
drawLine((width / 2) - (maze2width / 2), (height / 2) + (maze2height / 2), (width / 3) + (maze2width / 4), (height / 2) + (maze2height / 2));
drawLine((width / 2.2) + (maze2width / 5), (height / 2) + (maze2height / 2), (width / 2) + (maze2width / 2), (height / 2) + (maze2height / 2));


//maze layer three
drawLine((width / 2) - (maze3width / 2), (height / 2) - (maze3height / 2), (width / 2) + (maze3width / 2), (height / 2) - (maze3height / 2));
drawLine((width / 2) - (maze3width / 2), (height / 2) - (maze3height / 2), (width / 2) - (maze3width / 2), (height / 2) + (maze3height / 2));
drawLine((width / 2) + (maze3width / 2), (height / 2) - (maze3height / 2), (width / 2) + (maze3width / 2), (height / 3) + (maze3height / 2));
drawLine((width / 2) + (maze3width / 2), (height / 0.98) - (maze3height / 2), (width / 2) + (maze3width / 2), (height / 2) + (maze3height / 2));
drawLine((width / 2) - (maze3width / 2), (height / 2) + (maze3height / 2), (width / 2) + (maze3width / 2), (height / 2) + (maze3height / 2));

//maze layer four
drawLine((width / 2) - (maze4width / 2), (height / 2) - (maze4height / 2), (width / 3) + (maze4width / 4), (height / 2) - (maze4height / 2));
drawLine((width / 1.4) - (maze4width / 3), (height / 2) - (maze4height / 2), (width / 2) + (maze4width / 2), (height / 2) - (maze4height / 2));
drawLine((width / 2) - (maze4width / 2), (height / 2) - (maze4height / 2), (width / 2) - (maze4width / 2), (height / 2) + (maze4height / 2));
drawLine((width / 2) + (maze4width / 2), (height / 2) - (maze4height / 2), (width / 2) + (maze4width / 2), (height / 2) + (maze4height / 2));
drawLine((width / 2) - (maze4width / 2), (height / 2) + (maze4height / 2), (width / 2) + (maze4width / 2), (height / 2) + (maze4height / 2));

//maze layer five
drawLine((width / 2) - (maze5width / 2), (height / 2) - (maze5height / 2), (width / 2) + (maze5width / 2), (height / 2) - (maze5height / 2));
drawLine((width / 2) - (maze5width / 2), (height / 2) - (maze5height / 2), (width / 2) - (maze5width / 2), (height / 3) + (maze5height / 3));
drawLine((width / 2) - (maze5width / 2), (height / 1.5) - (maze5height / 3), (width / 2) - (maze5width / 2), (height / 2) + (maze5height / 2));
drawLine((width / 2) + (maze5width / 2), (height / 2) - (maze5height / 2), (width / 2) + (maze5width / 2), (height / 2) + (maze5height / 2));
drawLine((width / 2) - (maze5width / 2), (height / 2) + (maze5height / 2), (width / 2) + (maze5width / 2), (height / 2) + (maze5height / 2));

//maze layer six
drawLine((width / 2) - (maze6width / 2), (height / 2) - (maze6height / 2), (width / 2) + (maze6width / 2), (height / 2) - (maze6height / 2));
drawLine((width / 2) - (maze6width / 2), (height / 2) - (maze6height / 2), (width / 2) - (maze6width / 2), (height / 2) + (maze6height / 2));
drawLine((width / 2) + (maze6width / 2), (height / 2) - (maze6height / 2), (width / 2) + (maze6width / 2), (height / 3) + (maze6height / 3));
drawLine((width / 2) + (maze6width / 2), (height / 1.7) - (maze6height / 3), (width / 2) + (maze6width / 2), (height / 2) + (maze6height / 2));
drawLine((width / 2) - (maze6width / 2), (height / 2) + (maze6height / 2), (width / 2) + (maze6width / 2), (height / 2) + (maze6height / 2));

//crown
drawLine((width / 2) - (crownwidth / 2), (height / 2) - (crownheight / 2), (width / 2) + (crownwidth / 2), (height / 2) - (crownheight / 2));
drawLine((width / 2) - (crownwidth / 2), (height / 2) - (crownheight / 2), (width / 2) - (crownwidth / 2), (height / 2) + (crownheight / 2));
drawLine((width / 2) + (crownwidth / 2), (height / 2) - (crownheight / 2), (width / 2) + (crownwidth / 2), (height / 2) + (crownheight / 2));
drawLine((width / 1.9), (height / 3) + (crownheight / 0.8), (width / 2) + (crownwidth / 2), (height / 2) + (crownheight / 2));
drawLine((width / 2.1), (height / 3) + (crownheight / 0.8), (width / 2) - (crownwidth / 2), (height / 2) + (crownheight / 2));
drawLine((width / 2.1), (height / 3) + (crownheight / 0.8), (width / 2.2) + (crownwidth / 3), (height / 2) + (crownheight / 2));
drawLine((width / 1.9), (height / 3) + (crownheight / 0.8), (width / 2.2) + (crownwidth / 3), (height / 2) + (crownheight / 2));

//block pieces
drawLine((width / 2) + (maze2width / 2.4), (height / 2) - (maze2height / 3), (width / 2) + (maze2width / 2), (height / 2) - (maze2height / 3));
drawLine((width / 2) - (maze3width / 1.68), (height / 2) + (maze3height / 3), (width / 2.52) - (maze3width / 3), (height / 2) + (maze3height / 3));
drawLine((width / 2) + (maze5width / 3), (height / 2) - (maze5height / 1.5), (width / 2) + (maze5width / 3), (height / 5) + (maze5height / 3.3));
drawLine((width / 1.78) + (maze4width / 2), (height / 2) + (maze4height / 8), (width / 2) + (maze4width / 2), (height / 2) + (maze4height / 8));



// center piece
const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [width / 2, height / 2], cc);

// draw it
drawLines(finalLines);