/*
@title: Scannable QR Art
@author: AdrianR3
@snapshot: snapshot-1.png
*/

/*

How to use:

There are quick configuration variables below this block comment. 
You can also change the PRESET variable to see some presets I found cool.

When changing settings related to the QR generation, if the correct values are not selected from the table, 
the QR code will often still generate while being unscannable. However, due to the nature of the patterns drawn, 
not all generated QR codes are easily scannable even though they are technically correct.

Please refer to the tables from Thonky's QR Tutorial to find appropriate values.


About the Project:

As a part of this project, I wrote my own QR code generator without the assistance of external libraries.

This project is essentialy the culmination of me learning the math and algorithms
behind the common QR (Quick Response) Code. Although this project pulled me 
straight out of my mathematical comfort zone with GF(256) Arithmetic, I throughoughly enjoyed the adventure.

This project would not be possible without "Thonky.com's QR Tutorial":
https://www.thonky.com/qr-code-tutorial

Other Resources:
https://stackoverflow.com/questions/13238704/calculating-the-position-of-qr-code-alignment-patterns
https://www.cognex.com/blogs/barcode-verification/how-to-perfect-qr-code-quality

There are more inline links to resources used before their respective functions.

*/

const width = 125;
const height = 125;

// Try Presets 1 - 5
// Preset 1 will encode the 'textToEncode' string below
// QR Code is only scannable on Preset 1, but check out the other presets for other cool images.

// Alternatively, set PRESET = 0 to get a COMPLETELY random drawing.
const PRESET = 1;
const maxRandomVersion = 10;

// QR Code Generation (PRESET = 1)
// Substring length can be changed, but the QR code will not scan if textToEncode is too long for the chosen QR code version
const textToEncode = "Never gonna give you up"//.substring(0, 16); 
// Version 1 cannot do more than 16 characters in alphanumeric mode
// See https://www.thonky.com/qr-code-tutorial/character-capacities
const drawShapeMode = 1;
const wireframe = false; // Change to true for wireframe rendering (No Fill)
const fillColor = wireframe ? undefined : '#3477eb';

// The Following Parameters MUST be set correctly with respect each other and textToEncode
// Please refer to the tables from Thonky's QR Tutorial to find appropriate values.
const encodeVersion = 2;          // https://www.thonky.com/qr-code-tutorial/character-capacities
const errorCorrectionLevel = "M"; // L (7%), M (15%), Q (25%), H (30%)
const requiredBits = 28 * 8;      // "Data Codewords" https://www.thonky.com/qr-code-tutorial/error-correction-table
const errorCorrectionBytes = 16;  // "EC Codewords Per Block" https://www.thonky.com/qr-code-tutorial/error-correction-table

let qrMaskId = bt.randIntInRange(0, 7); // Set this manually if you are having issues scanning the qr code

// Only Alphanumeric mode is supported
const modeIndicator = 0b0010; // Numeric Mode = 0b0001, Alphanumeric Mode = 0b0010, etc.
const charCountIndicator = Number(textToEncode.length)
  .toString(2)
  .padStart(encodeVersion <= 9 ? 9 : (encodeVersion <= 26 ? 11 : 13), 0)

let random = [
  bt.randIntInRange(1, maxRandomVersion), 
  bt.randIntInRange(1, 20), 
  12345, 
  bt.randIntInRange(1, 8+2),
  '#fc9003',
  0,
  1
];

// All Available Presets
// Version (1-40), Stroke Width, Seed, Mask, Fill, Data to Use (0-2), Shapes
const presets = [
    random,
    [encodeVersion, 0, 12345, qrMaskId, fillColor, 2, drawShapeMode], // Preset 1
    [8, 1, 12345, 6, '#FFFFFF', 0, 0], // Preset 2
    [1, 0, 12345, 5, undefined, 0, 0], // Preset 3
    [7, 6, 6342, 3, '#3EFFA3', 1, 0], // Preset 4
    [-1, 5, 1333, 5, '#3477eb', 0, 0], // Preset 5
    [5, 20, 12345, 5, '#FF0000', 0, 0], // Preset 6
]

let strokeWidth = getPresets()[1];
let version = getPresets()[0]
let seed = getPresets()[2];

let size = 4 * version + 17;
const lines = [];

setDocDimensions(width, height);

if (PRESET == 0) { 
  // console.log(presets[0]);
} else {
  bt.setRandSeed(seed);
}

if (bt.rand() < 0.20 && random[0] < 6) {random[4] = undefined}

function getPresets() {
  // Version (1-40), Stroke Width, Seed, Mask, Fill, Data to Use (0-2), Shapes
  if (random[0] < random[1]) random[1] = bt.randIntInRange(1, random[1] / 2);

  if (random[3] >= 8) random[5] = 1;

  if (PRESET >= presets.length) return [-1, 0, 0, 0, '#000000'];
  return presets[PRESET];
}

let encoded;// = encodeAlphanumeric(textToEncode);

switch (modeIndicator) {
  case 0b0010:
    encoded = encodeAlphanumeric(textToEncode);
    break;
  case 0b0011:
    encoded = encodeBytes(textToEncode);
    break;
}

let binaryDataString = getRawDataString();

const log = new Uint8Array(256);
const exp = new Uint8Array(256);
setupExpLogTables();

let errorCorrectionData = getErrorCorrectionData(binaryStringToDecimalArray(binaryDataString), requiredBits/8 + errorCorrectionBytes);
    // errorCorrectionData = [196,35,39,119,235,215,231,226,93,23length} bytes`)

let finalBinaryArray = binaryDataString;
for (let i = 0; i < errorCorrectionData.length; i++) {  
  finalBinaryArray += errorCorrectionData[i].toString(2).padStart(8, '0');
}

function getErrorCorrectionData(data, numCodewords) {
  const degree = numCodewords - data.length;
  
  const messagePoly = new Uint8Array(numCodewords);
  
  messagePoly.set(data, 0);
  
  return polyRemainder(messagePoly, getGeneratorPoly(degree, false));
}

function binaryStringToDecimalArray(binaryString) {
    const decimalArray = [];
    const chunkSize = 8;

    const paddedLength = 0//Math.ceil(binaryString.length / chunkSize) * chunkSize;
    const paddedBinaryString = binaryString.padStart(paddedLength, '0');

    for (let i = 0; i < paddedBinaryString.length; i += chunkSize) {
        const chunk = paddedBinaryString.substring(i, i + chunkSize);
        const decimalValue = parseInt(chunk, 2);
        decimalArray.push(decimalValue);
    }

    return decimalArray;
}

function setupExpLogTables() {
  for (let exponent = 1, value = 1; exponent < 256; exponent++) {
    value = value > 127 ? ((value << 1) ^ 285) : value << 1;
    log[value] = exponent % 255;
    exp[exponent % 255] = value;
  }
}

// Example a^252 * a^9 != a^261
//           "      "   = a^
function multiplyAlphaNotation(expA, expB) {
  return (((expA + expB) % 256) + floor((expA + expB) / 256) /*% 255*/)
}


// https://en.wikiversity.org/wiki/Reed%E2%80%93Solomon_codes_for_coders#Multiplication
function multiply(a, b) {
  return a && b ? 
    exp[
      (log[a] + log[b]) % 255
    // Return 0 if a or b is missing
    ] : 0;
}

function divide(a, b) {
  return exp[
      (log[a] + log[b] * 254) % 255
    ];
}

// Big Thanks to maxart2501 for the help
// https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-iii-error-correction-1kbm
function polyMul(poly1, poly2) {
  const coefficients = new Uint8Array(poly1.length + poly2.length - 1);

  for (let i = 0; i < coefficients.length; i++) {
    let coefficient = 0;
    
    for (let p1index = 0; p1index <= i; p1index++) {
      const p2index = i - p1index;
      coefficient = coefficient ^ multiply(poly1[p1index], poly2[p2index]);
    }
    
    coefficients[i] = coefficient;
  }
  return coefficients;
}

function polyRemainder(dividend, divisor) {
  const quotientLength = dividend.length - divisor.length + 1;

  let rest = new Uint8Array(dividend);
  for (let count = 0; count < quotientLength; count++) {

    if (rest[0]) {
      const factor = divide(rest[0], divisor[0]);
      const subtr = new Uint8Array(rest.length);
      subtr.set(polyMul(divisor, [factor]), 0);
      rest = rest.map((value, index) => value ^ subtr[index]).slice(1);
    } else {
      rest = rest.slice(1);
    }
  }
  return rest;
}

function getGeneratorPoly(degree, returnAlphaExponents = false) {
  let lastPoly = new Uint8Array([1]);
  for (let index = 0; index < degree; index++) {
    lastPoly = polyMul(lastPoly, new Uint8Array([1, exp[index]]));
  }

  if (returnAlphaExponents) {
    for (let i = 0; i < lastPoly.length; i++) {
      lastPoly[i] = log[lastPoly[i]];
    }
  }
  
  return lastPoly;
}

function getRawDataString() {
  // Concatenate Indicators and Encoded Data
  let dataString = modeIndicator.toString(2).padStart(4, 0) + charCountIndicator.toString(2) + encoded;

  // Add Terminator Bits
  dataString = dataString.padEnd(Math.min(requiredBits, dataString.length + 4), 0)

  // Pad string with zeros so length is multiple of 8
  dataString = dataString + '0'.repeat((8 - dataString.length % 8) % 8);

  if (dataString.length < requiredBits) {
    // Data String is still to short to fill QR Code
    dataString = dataString.padEnd(requiredBits, "1110110000010001")
  }
  
  return dataString;
}

// Draw a rectangle at x, y of width w and height h
function rect(w, h, x = 0, y = 0) {
  return [
    [-w/2 + x, h/2 + y],
    [-w/2 + x, -h/2 + y],
    [w/2 + x, -h/2 + y],
    [w/2 + x, h/2 + y],
    [-w/2 + x, h/2 + y],
  ]
}

function circle(r, x, y) {
  const t = new bt.Turtle();
  t.arc(360, r);
  const cc = bt.bounds(t.path).lt;
  bt.translate(t.path, [x, y], cc);

  return t.path;
}

let dataArray = emptyArray(version, -1);
let canMask = emptyArray(version, 1);
function generateQRCode(
  version = 1,
  matrix
) {
    dataArray = emptyArray(version, -1);
    // Version 1 QR Code -> size = 21
    // Version 40 QR Code -> size = 177
    let size = 4 * version + 17;

    // If no predefined QR Code Array
    if (matrix == undefined) {
      matrix = Array.from({ length: size }, () => Array(size).fill(0));
    }

    // Function to set a fixed module in the matrix
    function setBlock(x, y, value = 1, canMaskModuleBit = 0) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            matrix[y][x] = value;
            canMask[y][x] = canMaskModuleBit;
            // dataArray[y][x] = -2;
        }
    }

    // Set a data module in the matrix
    function setData(x, y, value = 1) {
        if (x >= 0 && x < size && y >= 0 && y < size) {
            dataArray[y][x] = value;
            canMask[y][x] = 1;
        }
    }
    // Draw the finder patterns
    function drawFinderPattern(x, y) {
        for (let i = 0; i <= 6; i++) {
            for (let j = 0; j <= 6; j++) {
                if (i == 0 || i == 6 || j == 0 || j == 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
                    setBlock(x + i, y + j, 1);
                } else {
                    setBlock(x + i, y + j, 0);
                }
            }
        }
    }
    // Draw the separator rings around the finder patterns
    function separatorRing(x, y, v = 0) {
        for (let i = 0; i < 9; i++) {
            setBlock(x, y + i, v);
            setBlock(x + 8, y + i, v);
            setBlock(x + i, y, v);
            setBlock(x + i, y + 8, v);
        }
    }
    // Generate Alignment Patterns
    function alignmentPattern(x, y) {
      x-=2;
      y-=2;
        for (let i = 0; i <= 4; i++) {
            for (let j = 0; j <= 4; j++) {
                if (i == 0 || i == 4 || j == 0 || j == 4 || (i == 2 && j == 2)) {
                    setBlock(x + i, y + j, 1);
                } else {
                    setBlock(x + i, y + j, 0);
                }
            }
        }
    }

    const availablePositions = [];
    function getAvailablePositions() {
      // Collect all available positions in zigzag order
      for (let x = 0; x < size; x++) {
        let ax = size - x - 1;
        let shift = 0;

        // Skip Vertical Timing Pattern
        if (ax < 7) {
          shift = 1
        }
        
        if (ax % 4 == 0 + (shift * 3)) {
          // zigzag from bottom to top
          for (let y = size - 1; y >= 0; y--) {
            if (matrix[y][ax] == 3) {availablePositions.push({ ax, y });}
            if (matrix[y][--ax] == 3) {availablePositions.push({ ax, y });}
            ax++;
          }
        } 
        else 
          if (x % 4 == 2 + shift) {
          // zigzag from top to bottom
          for (let y = 0; y < size; y++) {
            if (matrix[y][ax] == 3) {availablePositions.push({ ax, y });}
            if (matrix[y][--ax] == 3) {availablePositions.push({ ax, y });}
            ax++;
          }
        }
      }
    }

    function setDataModule(targetIndex, dataValue, doSetBlock = false) {
  
      // Check if we have enough positions
      if (targetIndex >= availablePositions.length) {
        console.error(`Target index ${targetIndex} exceeds the number of available modules.`)
        return;
      }

      // Set the data module at next available bit
      const { ax, y } = availablePositions[targetIndex];
      setData(ax, y, dataValue);
      
      if (doSetBlock) setBlock(ax, y, dataValue);
    }

    // Finder patterns
    // (Three big rings)
    drawFinderPattern(0, 0);
    drawFinderPattern(0, size - 7);
    drawFinderPattern(size - 7, 0);

    // Separator Rings 
    // (Dark rings around the finder patterns)
    separatorRing(-1, -1);
    separatorRing(-1, size-8);
    separatorRing(size-8, -1);

    // Alignment Patterns
    if (version > 1) {
      const coords = getPossibleAlignmentCoords(version);
      // Add alignment patterns
      for (let cyi = 0; cyi < coords.length; cyi++) {
        for (let cxi = 0; cxi < coords.length; cxi++) {
          let x = coords[cxi];
          let y = coords[cyi];
          
          if (matrix[y][x] == 1) continue;
          
          alignmentPattern(x, y);
        }
      }
    }

    // Timing Patterns
    // (Alternating black and white stripes)
    for (let i = 7; i < size - 7; i++) {
      // Horizontal Timing Pattern  
      setBlock(i, 6, !(i % 2));

      // Vertical Timing Pattern
      setBlock(6, i, !(i % 2));
    }


    const reservedValue = 4;
    // Reserve Format Information Area
    for (let x = 0; x < size; x++) {
      if (!(x < 9 || x > size - 9)) continue;
      if (matrix[8][x] != 3) continue;
      setBlock(x, 8, reservedValue)
    }

    for (let y = 0; y < size; y++) {
      if (!(y < 9 || y > size - 9)) continue;
      if (matrix[y][8] != 3) continue;
      setBlock(8, y, reservedValue)
    }

    // Dark Module
    setBlock(8, 4 * version + 9, 1);
  
    // Reserve Version Information Area
    if (version >= 7) {
      // Top Right
      for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 3; y++) {
          setBlock(x, y + size - 7 - 4, 0)
        }
      }
      
      // Bottom Left
      for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 6; y++) {
          setBlock(x + size - 7 - 4, y, 0)
        }
      }
    }
    
    getAvailablePositions();
    // console.log(`Available Data Bits: ${availablePositions.length}`)

    // Write zeros to all data modules
    for (let i = 0; i < availablePositions.length; i++) {
      setDataModule(i, 0)
    }
  
    // Fill Data modules
    for (let i = 0; i < finalBinaryArray.length; i++) {
      setDataModule(i, finalBinaryArray[i])
    }

    let maskId = getPresets()[3];
    const maskedData = maskMatrix(JSON.parse(JSON.stringify(dataArray)), maskId);
    
    applyMaskedMatrix(matrix, maskedData);

    const usedMaskID = maskId;

    // QR Code Metadata
    // Error Correction Bits
    let errorCorrectionBits = "MLHQ".indexOf(errorCorrectionLevel).toString(2);
    let maskPatternBits = maskId.toString(2).slice(-3);

    // let formatString = errorCorrectionBits.padStart(2, "0") + maskPatternBits.padStart(3, "0") + "0".repeat(0);
    // const generatorPolynomial = 10100110111;

    const formatStrings = [0b111011111000100, 0b111001011110011, 0b111110110101010, 0b111100010011101, 0b110011000101111, 0b110001100011000, 0b110110001000001, 0b110100101110110, 0b101010000010010, 0b101000100100101, 0b101111001111100, 0b101101101001011, 0b100010111111001, 0b100000011001110, 0b100111110010111, 0b100101010100000, 0b011010101011111, 0b011000001101000, 0b011111100110001, 0b011101000000110, 0b010010010110100, 0b010000110000011, 0b010111011011010, 0b010101111101101, 0b001011010001001, 0b001001110111110, 0b001110011100111, 0b001100111010000, 0b000011101100010, 0b000001001010101, 0b000110100001100, 0b000100000111011]	
    const formatIndex = "LMQH".indexOf(errorCorrectionLevel) * 8 + (maskId % 8);
    
    let formatString = formatStrings[formatIndex].toString(2).padStart(15, "0");
  
    for (let i = 0; i < formatString.length; i++) {
      if (i < 8) {
        setBlock(i > 5 ? i+1 : i, 8, formatString[i])
        if (i == 6) {
          setBlock(matrix.length - 8, 8, formatString[i])
        }
        setBlock(8, matrix.length - i - 1, formatString[i])
      } else {
        setBlock(8, i < 9 ? 15-i : 14-i, formatString[i])
        setBlock(matrix.length - 15 + i, 8, formatString[i])
      }
    }

    return matrix;
}

function encodeAlphanumeric(dataToEncode) {
  let output = "";
  for (let i = 0; i < dataToEncode.length; i+=2) {
    let a = convertToAlphanumericNum(dataToEncode.charAt(i));
    let b = convertToAlphanumericNum(dataToEncode.charAt(i+1));
    
    let dataBlock;
    if (b == 0) {
      // Single Character
      dataBlock = Number(a).toString(2).padStart(6, 0)
    } else {
      // Character pair
      let n = (a * 45) + b
      dataBlock = Number(n).toString(2).padStart(11, 0)
    }

    output += dataBlock;
  }

  return output;
}

function encodeBytes(input) {
  return Array.from(input)
    .map(char => {
      const code = char.charCodeAt(0);
      return code.toString(2).padStart(8, '0');
    })
    .join('');
}

function convertToAlphanumericNum(char) {
    const alphanumericChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:';
    char = char.toUpperCase();

    const index = alphanumericChars.indexOf(char);
    return index !== -1 ? index : null;
}

function applyMaskedMatrix(baseMatrix, maskedData) {
  for (let y = 0; y < baseMatrix.length; y++) {
    for (let x = 0; x < baseMatrix[y].length; x++) {
      let maskedBit = maskedData[y][x];
      if (canMask[y][x] != 1) continue;

      // if (maskedBit == -1) continue;
      // if (maskedBit == -2) continue;

      baseMatrix[y][x] = maskedBit;
    }
  }
  
  return baseMatrix;
}

function maskMatrix(matrix, mask = 0) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      let bit = matrix[y][x];
      // if (bit == -1) continue;
      // if (bit == -2) continue;

      if (canMask[y][x] != 1) continue;
      
      matrix[y][x] = maskBit(y, x, bit, mask);
    }
  }
  
  return matrix;
}

function maskBit(row, col, bit, mask) {
  switch (Number(mask)) {
    case 0: return bit ^ ((row + col) % 2 == 0)
    case 1: return bit ^ (row % 2 == 0);
    case 2: return bit ^ (col % 3 == 0);
    case 3: return bit ^ ((row + col) % 3 == 0);
    case 4: return bit ^ ((Math.floor(row / 2) + Math.floor(col / 3)) % 2 == 0);
    case 5: return bit ^ (row * col % 2 + row * col % 3 == 0);
    case 6: return bit ^ (((row * col) % 2 + row * col % 3) % 2 == 0);
    case 7: return bit ^ (((row + col) % 2 + row * col % 3) % 2 == 0);
    default: return bit; // No Mask
  }
}

// Big Thanks to StackOverflow
function getPossibleAlignmentCoords(version) {
  if (version === 1) {
    return [];
  }
  const intervals = Math.floor(version / 7) + 1;
  const distance = 4 * version + 4; // between first and last alignment pattern
  const step = Math.ceil(distance / intervals / 2) * 2; // To get the next even number
  return [6].concat(Array.from(
    { length: intervals },
    (_, index) => distance + 6 - (intervals - 1 - index) * step)
  );
}

// console.log(`QR Version: ${version}`)

function randomArray(size = 21) {
  const array = [];
    
    for (let i = 0; i < size; i++) {
        const row = [];
        for (let j = 0; j < size; j++) {
          if (Math.round(bt.rand())) {
            row.push(1); // Randomly push 0 or 1
          } else {
            row.push(3);
          }
        }
        array.push(row);
    }
    
    return array;
}

function emptyArray(version, value = 0) {
    let n = 4*version + 17;
    return Array.from({ length: n }, () => Array(n).fill(value));
}

// Data Loading
let baseArray = randomArray(size);
switch (Number(getPresets()[5])) {
  case 0:
    // No Data
    baseArray = Array.from({ length: size }, () => Array(size).fill(3));
    break;
  case 1:
    // Random Data
    baseArray = randomArray(size);
    break;
  case 2:
    // String Data
    baseArray = Array.from({ length: size }, () => Array(size).fill(3));
    break;
  default:
    baseArray = emptyArray(version);
    break;
}

let finalQRArray = generateQRCode(version, baseArray);

// console.log(QR2Text(finalQRArray));

function QR2Text(QRArray) {
  return QRArray.map(row => 
    row.map(val => {
      let char;
      switch (Number(val)) {
        case -1:
          char = 'o';
          break;
        case 0:
          char = ' ';
          break;
        case 1:
          char = '■';
          break;
        case 2:
          char = 'x';
          break;
        case 3:
          char = '⋅';
          break;
        default:
          char = Number(val)-3;
          break;
      }
      return char;
    }).join(' ')
  ).join('\n');
}

// Debugging
let renderEmpty = false;

// Convert QR Code Array into shapes for drawing
const s = height/finalQRArray.length;
for(let y = 0; y < finalQRArray.length; y++) {
  for (let x = 0; x < finalQRArray[y].length; x++) {
    const val = finalQRArray[y][x];
    const dataVal = dataArray[y][x];
    
    if (val == 1) {
      // Full Square
      // renderSquare(x, y);
      
      // if (dataVal == -2 && val == 1) {
        // renderSquare(x, y);
        // continue;
      // }

      if (bt.rand() < 0.15) {
        switch (Number(bt.randIntInRange(1, 5))) {
          case 1:
            renderXMark(x, y);
            break;
          case 2:
            renderPlusSign(x, y);
            break;
          case 3:
            renderBox(x, y);
            break;
          case 4:
            renderAsterisk(x, y)
            break;
          case 5:
            renderDiamond(x, y, 1.75)
            break;
        }
      } else {
        renderRounded(x, y);
      }
    } else if (val == 3) {
      // Draw Diamond
      renderDiamond(x, y)
    } else if (val == 2) {
      // Draw 'X'
      renderXMark(x, y)
    } else if (val > 3) {
      // Draw 'X'
      renderXMark(x, y)
    } else if (renderEmpty) {
      // Small Square
      let a = [rect(s/4, s/4, s*x + s/2, height- s*y - s/2)];
      lines.push(a[0]);
    }
  }
}

function renderXMark(x, y) {
  let a = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  let b = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  bt.rotate(a, 45)
  bt.rotate(b, -45)
  lines.push(a[0]);
  lines.push(b[0]);
}

function renderBox(x, y) {
  let a = [rect(s, s, s*x + s/2, height- s*y - s/2)];
  bt.scale(a, 0.75)
  lines.push(a[0]);
}

function renderPlusSign(x, y) {
  let a = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  let b = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  bt.rotate(a, 90)
  lines.push(a[0]);
  lines.push(b[0]);
}

function renderAsterisk(x, y) {
  let a = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  let b = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  let c = [rect(s/4, s, s*x + s/2, height- s*y - s/2)];
  bt.rotate(b, 60)
  bt.rotate(c, -60)
  lines.push(a[0]);
  lines.push(b[0]);
  lines.push(c[0]);
}

function renderDiamond(x, y, size = 1) {
  let a = [rect(size*s/3, size*s/3, s*x + s/2, height- s*y - s/2)];
  bt.rotate(a, 45)
  lines.push(a[0]);
}

function renderRounded(x, y) {
  let a = circle(s/2, width/size*x, height - height/size*y);
  let r = []
  // Down & Right
  if (y < size - 1 && x < size && finalQRArray[y+1][x] || finalQRArray[y][x+1]) {
    let c = [rect(s/2, s/2, s*x + 3*s/4, height- s*y - 3*s/4)];
    lines.push(c[0])
  }

  // Down & Left
  if (y < size - 1 && x < size && finalQRArray[y+1][x] || finalQRArray[y][x-1]) {
    let c = [rect(s/2, s/2, s*x + 1*s/4, height- s*y - 3*s/4)];
    lines.push(c[0])
  }

  // Up & Right
  if (y > 0 && x < size && finalQRArray[y-1][x] || finalQRArray[y][x+1]) {
    let c = [rect(s/2, s/2, s*x + 3*s/4, height- s*y - 1*s/4)];
    lines.push(c[0])
  }

  // Up & Left
  if (y > 0 && x < size && finalQRArray[y-1][x] || finalQRArray[y][x-1]) {
    let c = [rect(s/2, s/2, s*x + 1*s/4, height- s*y - 1*s/4)];
    lines.push(c[0])
  }
  
  lines.push(a[0]);
}

function renderCircle(x, y, size = 1) {
  let a = circle(size * s/2, width/size*x, height - height/size*y);
  lines.push(a[0]);
}

function renderSquare(x, y) {
  let a = [rect(s, s, s*x + s/2, height- s*y - s/2)];
  lines.push(a[0]);
}

// Create QR "Quiet Zone"
bt.scale(lines, finalQRArray.length/(finalQRArray.length+8))

drawLines(lines, {'fill': getPresets()[4], 'width': strokeWidth});