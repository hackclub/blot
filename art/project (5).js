const width = 125;
const height = 125;

// Set canvas dimensions
setDocDimensions(width, height);

const finalLines = [];

const t = new bt.Turtle();

// Generate random position within the canvas frame
const posX = Math.random() * (width - 50); // Ensure the mountain stays within the frame
const posY = Math.random() * (height - 50); // Ensure the mountain stays within the frame

// Generate random size within a specified range
const maxWidth = 75;
const minWidth = 25;
const size = Math.random() * (maxWidth - minWidth) + minWidth;
const scaleRatio = size / maxWidth; // Calculate scale ratio based on maxWidth

// Adjusting the loop to create a mountain-like shape
for (let i = 0; i < 52; i++) {
  t.forward(i * 2 * scaleRatio); // Increase the forward movement for a larger mountain
  t.right(45); // Adjust the angle for a sharper peak
}

// Add turtle to final lines
bt.join(finalLines, t.lines());

// Scale the mountain to fit into the fixed canvas dimensions (125x125)
bt.scale(finalLines, scaleRatio);

// Center piece
const cc = bt.bounds(finalLines).cc;

// Translate the mountain to the random position within the canvas frame
bt.translate(finalLines, [posX + size / 2, posY + size / 2], cc);

// Draw it
drawLines(finalLines);
  