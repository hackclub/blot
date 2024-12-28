/*
@title: Morse Code Writer
@author: Owen O
@snapshot: snapshot1.png
*/

//Go to line 128 to change what text is turned into Morse Code

// Set the dimensions of the doc
setDocDimensions(125, 125);

// Create a dictionary to map characters to their Morse code equivalents
const morseCodeDictionary = {
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----"
};

// Define the drawCircle function
function drawCircle(x, y, size) {
  const steps = 360;
  const angleStep = 2 * Math.PI / steps;
  const points = [];

  for (let i = 0; i < steps; i++) {
    const angle = i * angleStep;
    points.push([x + size * Math.cos(angle), y + size * Math.sin(angle)]);
  }

  drawLines([points]);
}

// Define the drawRectangle function
function drawRectangle(x, y, width, height) {
  const points = [
    [x, y],
    [x + width, y],
    [x + width, y + height],
    [x, y + height],
    [x, y]
  ];

  drawLines([points]);
}

// Create a function to draw a dot or dash at a given position
function drawMorseSymbol(symbol, x, y, size) {
  if (symbol === ".") {
    drawCircle(x, y, size);
  } else if (symbol === "-") {
    // Draw a rectangle for the dash
    drawRectangle(x - size * 1, y - size * 0.75, size * 2, size * 1.50);
  }
}

// Create a function to draw the Morse code message
function drawMorseCodeMessage(message) {
  const docWidth = 125; 
  const dotSize = 2;
  const dashLength = 2 * dotSize;
  const dotSpacing = 2.3 * dotSize; // Changes dot spacing
  const letterSpacing = 3 * dotSize; // Changes letter spacing
  const wordSpacing = 5 * dotSize; // Changes word spacing

  let x = 5;
  let y = 120;
  let currentWord = "";

  for (let i = 0; i < message.length; i++) {
    const char = message[i].toLowerCase();
    if (char === " ") {
      // If the current character is a space, move to the next line
      x = 5;
      y += dotSize * -2.5;
      currentWord = "";
    } else if (morseCodeDictionary.hasOwnProperty(char)) {
      const morseCode = morseCodeDictionary[char];
      for (let j = 0; j < morseCode.length; j++) {
        drawMorseSymbol(morseCode[j], x, y, dotSize);
        x += dotSpacing;
        if (x + dashLength >= docWidth) {
          // If the next symbol would go outside the document, move to the next line
          x = 5;
          y += dotSize * -2.5;
          currentWord = "";
        }
      }
      x += letterSpacing;
      currentWord += char;
    }
  }
}

// Replace the words in the quotation marks to change what text is displayed in Morse Code
const textInput = "Hello random Blot user, how you doing";

// Draw the Morse code message
drawMorseCodeMessage(textInput);