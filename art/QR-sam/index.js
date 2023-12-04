/*
QR Blot
by Sam Liu (@samliu)

This is a custom implementation of https://www.nayuki.io/page/creating-a-qr-code-step-by-step, 
https://www.thonky.com/qr-code-tutorial/, https://www.qrcode.com/, and 
https://en.wikipedia.org/wiki/QR_code with error correction algorithm code from
https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-i-basic-concepts-510a.
I tried my best to not look at existing code, so this will be messy!
*/

const message = "👋🏼 Hello from Sam's Blot QR Code generator! I ❤️ blot + hack club!"
const errorCorrection = "H" // L/M/Q/H
const penWidth = 0.5;
const drawingSize = 200;

function qrCode(text, ecc = "M") {
  let encoding = encodingMode(text);
  console.log("encoding: ", encoding);
  let data = segment(text, encoding);
  console.log("data: ", data);
  console.log("data length: ", data.length);
  let version = findVersion(encoding, data, ecc);
  console.log("version: ", version);
  let sequence = sequencer(encoding, version, text, data, ecc);
  console.log("sequence: ", sequence);
  let eccSeq = calcEcc(sequence, version, ecc);
  console.log("eccSeq: ", eccSeq);
  let [code, dataArea] = fillData(version, eccSeq);
  let [bestMask, maskedCode] = addMask(code, dataArea, ecc);
  console.log("mask: ", bestMask);
  draw(maskedCode, penWidth, drawingSize); // Second number is the pen width if you want to draw it physically
}

function encodingMode(text) {
  let numeric = true;
  let alphanumeric = true;
  for (let i = 0; i < text.length; i++) {
    let code = text.charCodeAt(i);
    if (!(code >= 48 && code <= 57)) {
      numeric = false;
      if (!((code >= 65 && code <= 90) || code == 32 || code == 36 || code == 37 || code == 42 || code == 43 || code == 45 || code == 46 || code == 47 || code == 58)) {
        alphanumeric = false;
      }
    }
  }
  if (numeric) {
    return "0001";
  } else if (alphanumeric) {
    return "0010";
  } else {
    return "0100";
  }
}

function alphanumericCode(char) {
  let code = char.charCodeAt(0);

  if (code >= 48 && code <= 57) {
    return code - 48;
  } else if (code >= 65 && code <= 90) {
    return code - 55;
  } else if (code == 32) {
    return 36;
  } else if (code == 36) {
    return 37;
  } else if (code == 37) {
    return 38;
  } else if (code == 42) {
    return 39;
  } else if (code == 43) {
    return 40;
  } else if (code == 45) {
    return 41;
  } else if (code == 46) {
    return 42;
  } else if (code == 47) {
    return 43;
  } else if (code == 58) {
    return 44;
  }
  return code;
}

var textEncoder = new TextEncoder();

function segment(text, encoding) {
  let size = encoding == "0001" ? 3 : (encoding == "0010" ? 2 : 1);
  let data = "";

  if (encoding == "0100") {
    [...text].forEach((char) => {
      textEncoder.encode(char).forEach((utf8) => {
        data += utf8.toString(2).padStart(8, "0");
      });
    });
  } else {
    for (let i = 0; i < text.length; i += size) {
      let group = text.substring(i, i + size);
      if (encoding == "0001") {
        data += Number(group).toString(2).padStart(group.length == 3 ? 10 : (group.length == 2 ? 7 : 4), "0");
      } else {
        let code1 = alphanumericCode(group.substring(0, 1));
        let code2 = alphanumericCode(group.substring(1, 2));
        if (isNaN(code2)) {
          data += code2.toString(2).padStart(6, "0");
        } else {
          data += (45 * code1 + code2).toString(2).padStart(11, "0");
        }
      }
    }
  }
  return data;
}

const verSizes = {
  "L": [19, 34, 55, 80, 108, 136, 156, 194, 232, 274, 324, 370, 428, 461, 523, 589, 647, 721, 795, 861, 932, 1006, 1094, 1174, 1276, 1370, 1468, 1531, 1631, 1735, 1843, 1955, 2071, 2191, 2306, 2434, 2566, 2702, 2812, 2956],
  "M": [16, 28, 44, 64, 86, 108, 124, 154, 182, 216, 254, 290, 334, 365, 415, 453, 507, 563, 627, 669, 714, 782, 860, 914, 1000, 1062, 1128, 1193, 1267, 1373, 1455, 1541, 1631, 1725, 1812, 1914, 1992, 2102, 2216, 2334],
  "Q": [13, 22, 34, 48, 62, 76, 88, 110, 132, 154, 180, 206, 244, 261, 295, 325, 367, 397, 445, 485, 512, 568, 614, 664, 718, 754, 808, 871, 911, 985, 1033, 1115, 1171, 1231, 1286, 1354, 1426, 1502, 1582, 1666],
  "H": [9, 16, 26, 36, 46, 60, 66, 86, 100, 122, 140, 158, 180, 197, 223, 253, 283, 313, 341, 385, 406, 442, 464, 514, 538, 596, 628, 661, 701, 745, 793, 845, 901, 961, 986, 1054, 1096, 1142, 1222, 1276]
};

function findVersion(encoding, data, ecc) {
  let len = data.length;
  let cci1;
  let cci10;
  let cci27;
  if (encoding == "0001") {
    cci1 = 10;
    cci10 = 12;
    cci27 = 14;
  } else if (encoding == "0010") {
    cci1 = 9;
    cci10 = 11;
    cci27 = 13;
  } else if (encoding == "0100") {
    cci1 = 8;
    cci10 = 16;
    cci27 = 16;
  }

  let cw1 = Math.ceil((4 + cci1 + len) / 8);
  let cw10 = Math.ceil((4 + cci10 + len) / 8);
  let cw27 = Math.ceil((4 + cci27 + len) / 8);

  for (let i = 0; i < 9; i++) {
    if (cw1 <= verSizes[ecc][i]) {
      return i + 1;
    }
  }
  for (let i = 9; i < 26; i++) {
    if (cw10 <= verSizes[ecc][i]) {
      return i + 1;
    }
  }
  for (let i = 26; i < 40; i++) {
    if (cw27 <= verSizes[ecc][i]) {
      return i + 1;
    }
  }
}

// shortCount, shortWords, longCount, longWords, ECCWords
const eccs = {
  1: {
    L: [1, 19, 0, 0, 7],
    M: [1, 16, 0, 0, 10],
    Q: [1, 13, 0, 0, 13],
    H: [1, 9, 0, 0, 17]
  },
  2: {
    L: [1, 34, 0, 0, 10],
    M: [1, 28, 0, 0, 16],
    Q: [1, 22, 0, 0, 22],
    H: [1, 16, 0, 0, 28]
  },
  3: {
    L: [1, 55, 0, 0, 15],
    M: [1, 44, 0, 0, 26],
    Q: [2, 17, 0, 0, 18],
    H: [2, 13, 0, 0, 22]
  },
  4: {
    L: [1, 80, 0, 0, 20],
    M: [2, 32, 0, 0, 18],
    Q: [2, 24, 0, 0, 26],
    H: [4, 9, 0, 0, 16]
  },
  5: {
    L: [1, 108, 0, 0, 26],
    M: [2, 43, 0, 0, 24],
    Q: [2, 15, 2, 16, 18],
    H: [2, 11, 2, 12, 22]
  },
  6: {
    L: [2, 68, 0, 0, 18],
    M: [4, 27, 0, 0, 16],
    Q: [4, 19, 0, 0, 24],
    H: [4, 15, 0, 0, 28]
  },
  7: {
    L: [2, 78, 0, 0, 20],
    M: [4, 31, 0, 0, 18],
    Q: [2, 14, 4, 15, 18],
    H: [4, 13, 1, 14, 26]
  },
  8: {
    L: [2, 97, 0, 0, 24],
    M: [2, 38, 2, 39, 22],
    Q: [4, 18, 2, 19, 22],
    H: [4, 14, 2, 15, 26]
  },
  9: {
    L: [2, 116, 0, 0, 30],
    M: [3, 36, 2, 37, 22],
    Q: [4, 16, 4, 17, 20],
    H: [4, 12, 4, 13, 24]
  },
  10: {
    L: [2, 68, 2, 69, 18],
    M: [4, 43, 1, 44, 26],
    Q: [6, 19, 2, 20, 24],
    H: [6, 15, 2, 16, 28]
  },
  11: {
    L: [4, 81, 0, 0, 20],
    M: [1, 50, 4, 51, 30],
    Q: [4, 22, 4, 23, 28],
    H: [3, 12, 8, 13, 24]
  },
  12: {
    L: [2, 92, 2, 93, 24],
    M: [6, 36, 2, 37, 22],
    Q: [4, 20, 6, 21, 26],
    H: [7, 14, 4, 15, 28]
  },
  13: {
    L: [4, 107, 0, 0, 26],
    M: [8, 37, 1, 38, 22],
    Q: [8, 20, 4, 21, 24],
    H: [12, 11, 4, 12, 22]
  },
  14: {
    L: [3, 115, 1, 116, 30],
    M: [4, 40, 5, 41, 24],
    Q: [11, 16, 5, 17, 20],
    H: [11, 12, 5, 13, 24]
  },
  15: {
    L: [5, 87, 1, 88, 22],
    M: [5, 41, 5, 42, 24],
    Q: [5, 24, 7, 25, 30],
    H: [11, 12, 7, 13, 24]
  },
  16: {
    L: [5, 98, 1, 99, 24],
    M: [7, 45, 3, 46, 28],
    Q: [15, 19, 2, 20, 24],
    H: [3, 15, 13, 16, 30]
  },
  17: {
    L: [1, 107, 5, 108, 28],
    M: [10, 46, 1, 47, 28],
    Q: [1, 22, 15, 23, 28],
    H: [2, 14, 17, 15, 28]
  },
  18: {
    L: [5, 120, 1, 121, 30],
    M: [9, 43, 4, 44, 26],
    Q: [17, 22, 1, 23, 28],
    H: [2, 14, 19, 15, 28]
  },
  19: {
    L: [3, 113, 4, 114, 28],
    M: [3, 44, 11, 45, 26],
    Q: [17, 21, 4, 22, 26],
    H: [9, 13, 16, 14, 26]
  },
  20: {
    L: [3, 107, 5, 108, 28],
    M: [3, 41, 13, 42, 26],
    Q: [15, 24, 5, 25, 30],
    H: [15, 15, 10, 16, 28]
  },
  21: {
    L: [4, 116, 4, 117, 28],
    M: [17, 42, 0, 0, 26],
    Q: [17, 22, 6, 23, 28],
    H: [19, 16, 6, 17, 30]
  },
  22: {
    L: [2, 111, 7, 112, 28],
    M: [17, 46, 0, 0, 28],
    Q: [7, 24, 16, 25, 30],
    H: [34, 13, 0, 0, 24]
  },
  23: {
    L: [4, 121, 5, 122, 30],
    M: [4, 47, 14, 48, 28],
    Q: [11, 24, 14, 25, 30],
    H: [16, 15, 14, 16, 30]
  },
  24: {
    L: [6, 117, 4, 118, 30],
    M: [6, 45, 14, 46, 28],
    Q: [11, 24, 16, 25, 30],
    H: [30, 16, 2, 17, 30]
  },
  25: {
    L: [8, 106, 4, 107, 26],
    M: [8, 47, 13, 48, 28],
    Q: [7, 24, 22, 25, 30],
    H: [22, 15, 13, 16, 30]
  },
  26: {
    L: [10, 114, 2, 115, 28],
    M: [19, 46, 4, 47, 28],
    Q: [28, 22, 6, 23, 28],
    H: [33, 16, 4, 17, 30]
  },
  27: {
    L: [8, 122, 4, 123, 30],
    M: [22, 45, 3, 46, 28],
    Q: [8, 23, 26, 24, 30],
    H: [12, 15, 28, 16, 30]
  },
  28: {
    L: [3, 117, 10, 118, 30],
    M: [3, 45, 23, 46, 28],
    Q: [4, 24, 31, 25, 30],
    H: [11, 15, 31, 16, 30]
  },
  29: {
    L: [7, 116, 7, 117, 30],
    M: [21, 45, 7, 46, 28],
    Q: [1, 23, 37, 24, 30],
    H: [19, 15, 26, 16, 30]
  },
  30: {
    L: [5, 115, 10, 116, 30],
    M: [19, 47, 10, 48, 28],
    Q: [15, 24, 25, 25, 30],
    H: [23, 15, 25, 16, 30]
  },
  31: {
    L: [13, 115, 3, 116, 30],
    M: [2, 46, 29, 47, 28],
    Q: [42, 24, 1, 25, 30],
    H: [23, 15, 28, 16, 30]
  },
  32: {
    L: [17, 115, 0, 0, 30],
    M: [10, 46, 23, 47, 28],
    Q: [10, 24, 35, 25, 30],
    H: [19, 15, 35, 16, 30]
  },
  33: {
    L: [17, 115, 1, 116, 30],
    M: [14, 46, 21, 47, 28],
    Q: [29, 24, 19, 25, 30],
    H: [11, 15, 46, 16, 30]
  },
  34: {
    L: [13, 115, 6, 116, 30],
    M: [14, 46, 23, 47, 28],
    Q: [44, 24, 7, 25, 30],
    H: [59, 16, 1, 17, 30]
  },
  35: {
    L: [12, 121, 7, 122, 30],
    M: [12, 47, 26, 48, 28],
    Q: [39, 24, 14, 25, 30],
    H: [22, 15, 41, 16, 30]
  },
  36: {
    L: [6, 121, 14, 122, 30],
    M: [6, 47, 34, 48, 28],
    Q: [46, 24, 10, 25, 30],
    H: [2, 15, 64, 16, 30]
  },
  37: {
    L: [17, 122, 4, 123, 30],
    M: [29, 46, 14, 47, 28],
    Q: [49, 24, 10, 25, 30],
    H: [24, 15, 46, 16, 30]
  },
  38: {
    L: [4, 122, 18, 123, 30],
    M: [13, 46, 32, 47, 28],
    Q: [48, 24, 14, 25, 30],
    H: [42, 15, 32, 16, 30]
  },
  39: {
    L: [20, 117, 4, 118, 30],
    M: [40, 47, 7, 48, 28],
    Q: [43, 24, 22, 25, 30],
    H: [10, 15, 67, 16, 30]
  },
  40: {
    L: [19, 118, 6, 119, 30],
    M: [18, 47, 31, 48, 28],
    Q: [34, 24, 34, 25, 30],
    H: [20, 15, 61, 16, 30]
  }
};

function sequencer(encoding, version, text, data, ecc) {
  let sequence = encoding;

  let cci
  if (encoding == "0001") {
    if (version <= 9) {
      cci = 10;
    } else if (version >= 10 && version <= 26) {
      cci = 12;
    } else {
      cci = 14;
    }
  } else if (encoding == "0010") {
    if (version <= 9) {
      cci = 9;
    } else if (version >= 10 && version <= 26) {
      cci = 11;
    } else {
      cci = 13;
    }
  } else if (encoding == "0100") {
    if (version <= 9) {
      cci = 8;
    } else if (version >= 10 && version <= 26) {
      cci = 16;
    } else {
      cci = 16;
    }
  }

  if (encoding == "0001" || encoding == "0010") {
    sequence += text.length.toString(2).padStart(cci, "0");
  } else {
    sequence += (data.length / 8).toString(2).padStart(cci, "0");
  }

  sequence += data;
  sequence += "0000";
  sequence = sequence.padEnd(Math.ceil(sequence.length / 8) * 8, "0");
  sequence = sequence.padEnd(verSizes[ecc][version - 1] * 8, "1110110000010001")
  return sequence;
}

function calcEcc(sequence, version, ecc) {
  let codewords = sequence.length / 8;
  let eccstat = eccs[version][ecc];
  let shortCount = eccstat[0];
  let shortWords = eccstat[1];
  let longCount = eccstat[2];
  let longWords = eccstat[3];
  let ECCWords = eccstat[4];

  let blocks = [];
  for (let i = 0; i < shortCount; i++) {
    blocks.push(sequence.substring(i * shortWords * 8, (i + 1) * shortWords * 8).match(/.{1,8}/g));
  }
  for (let i = 0; i < longCount; i++) {
    blocks.push(sequence.substring((shortCount) * shortWords * 8).substring(i * longWords * 8, (i + 1) * longWords * 8).match(/.{1,8}/g));
  }
  blocks = blocks.map((block) => block.map((cw) => parseInt(cw, 2)))

  /*
  As much as I'd like to think I'm good with algorithms, the functions here are from
  https://dev.to/maxart2501/let-s-develop-a-qr-code-generator-part-iii-error-correction-1kbm
  I tried but it ended up a mess...
  */
  const LOG = new Uint8Array(256);
  const EXP = new Uint8Array(256);
  for (let exponent = 1, value = 1; exponent < 256; exponent++) {
    value = value > 127 ? ((value << 1) ^ 285) : value << 1;
    LOG[value] = exponent % 255;
    EXP[exponent % 255] = value;
  }

  function mul(a, b) {
    return a && b ? EXP[(LOG[a] + LOG[b]) % 255] : 0;
  }

  function div(a, b) {
    return EXP[(LOG[a] + LOG[b] * 254) % 255];
  }

  function polyMul(poly1, poly2) {
    const coeffs = new Uint8Array(poly1.length + poly2.length - 1);

    for (let index = 0; index < coeffs.length; index++) {
      let coeff = 0;
      for (let p1index = 0; p1index <= index; p1index++) {
        const p2index = index - p1index;
        coeff ^= mul(poly1[p1index], poly2[p2index]);
      }
      coeffs[index] = coeff;
    }
    return coeffs;
  }

  function polyRest(dividend, divisor) {
    const quotientLength = dividend.length - divisor.length + 1;
    let rest = new Uint8Array(dividend);
    for (let count = 0; count < quotientLength; count++) {
      if (rest[0]) {
        const factor = div(rest[0], divisor[0]);
        const subtr = new Uint8Array(rest.length);
        subtr.set(polyMul(divisor, [factor]), 0);
        rest = rest.map((value, index) => value ^ subtr[index]).slice(1);
      } else {
        rest = rest.slice(1);
      }
    }
    return rest;
  }

  function getGeneratorPoly(degree) {
    let lastPoly = new Uint8Array([1]);
    for (let index = 0; index < degree; index++) {
      lastPoly = polyMul(lastPoly, new Uint8Array([1, EXP[index]]));
    }
    return lastPoly;
  }

  function getECC(data, codewords) {
    const degree = codewords - data.length;
    const messagePoly = new Uint8Array(codewords);
    messagePoly.set(data, 0);
    return polyRest(messagePoly, getGeneratorPoly(degree));
  }

  let eccws = [];

  blocks.forEach((block) => {
    eccws.push(Array.from(getECC(block, block.length + ECCWords)));
  });

  let eccSeq = []

  for (let i = 0; i < (longCount > 0 ? longWords : shortWords); i++) {
    for (let j = 0; j < blocks.length; j++) {
      let block = blocks[j];
      if (i < block.length) {
        eccSeq.push(block[i]);
      }
    }
  }

  for (let i = 0; i < ECCWords; i++) {
    for (let j = 0; j < blocks.length; j++) {
      let block = eccws[j];
      if (i < block.length) {
        eccSeq.push(block[i]);
      }
    }
  }

  return eccSeq.map((cw) => cw.toString(2).padStart(8, "0")).join("");

}

const dimensions = [21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93, 97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 169, 173, 177];
const aliPoses = [
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170]
];
const verInfos = ["000111110010010100", "001000010110111100", "001001101010011000", "001010010011010010", "001011101111110110", "001100011101100010", "001101100001000110", "001110011000001100", "001111100100101000", "010000101101111000", "010001010001011100", "010010101000010100", "010011010100110000", "010100100110100100", "010101011010000000", "010110100011001000", "010111011111101100", "011000111011000100", "011001000111100000", "011010111110101000", "011011000010001100", "011100110000011000", "011101001100111100", "011110110101110100", "011111001001010000", "100000100111010000", "100001011011110000", "100010100010111000", "100011011110011000", "100100101100001000", "100101010000101000", "100110101001100000", "100111010101000000", "101000110001101000"];

function fillData(version, data) {
  let code = [];

  // fill entire and timing patterns 
  for (let r = 0; r < dimensions[version - 1]; r++) {
    let row = [];
    for (let c = 0; c < dimensions[version - 1]; c++) {
      if (r == 6) {
        row.push((c % 2) == 0);
      } else if (c == 6) {
        row.push((r % 2) == 0);
      } else {
        row.push(null);
      }
    }
    code.push(row);
  }

  function replace2D(ori, x, y, arr) {
    for (let r = 0; r < arr.length; r++) {
      ori[r + y].splice(x, arr[r].length, ...arr[r])
    }
  }

  // finder patterns
  let finPat = [
    [true, true, true, true, true, true, true, false],
    [true, false, false, false, false, false, true, false],
    [true, false, true, true, true, false, true, false],
    [true, false, true, true, true, false, true, false],
    [true, false, true, true, true, false, true, false],
    [true, false, false, false, false, false, true, false],
    [true, true, true, true, true, true, true, false],
    [false, false, false, false, false, false, false, false]
  ];
  replace2D(code, 0, 0, finPat)
  replace2D(code, code[0].length - 8, 0, finPat[0].map((v, i) => finPat.map(r => r[i]).reverse()));
  replace2D(code, 0, code.length - 8, finPat[0].map((v, i) => finPat.map(r => r[r.length - 1 - i])));

  // alignment patterns
  let aliPat = [
    [true, true, true, true, true],
    [true, false, false, false, true],
    [true, false, true, false, true],
    [true, false, false, false, true],
    [true, true, true, true, true]
  ]
  let aliPos = aliPoses[version - 1]
  for (let r = 0; r < code.length; r++) {
    for (let c = 0; c < code[0].length; c++) {
      if (!((r < 10 && c < 10) || (r > code.length - 11 && c < 10) || (r < 10 && c > code[0].length - 11))) {
        if (aliPos.includes(r) && aliPos.includes(c)) {
          replace2D(code, c - 2, r - 2, aliPat);
        }
      }
    }
  }

  // dummy formatting
  for (let i = 0; i < 8; i++) {
    if (i != 6) {
      code[8][i] = false;
      code[i][8] = false;
    }
    code[8][code[0].length - 1 - i] = false;
    code[code[0].length - 1 - i][8] = i == 7 ? true : false;
  }
  code[8][8] = false;

  // versioning
  if (version >= 7) {
    let verInfo = verInfos[version - 7].split("").map((c) => {
      return c == "1"
    });
    let verPat = [];
    for (let r = 0; r < 3; r++) {
      let row = []
      for (let c = 0; c < 6; c++) {
        row.push(verInfo[(c - 5) * -3 + (2 - r)])
      }
      verPat.push(row)
    }
    replace2D(code, 0, code.length - 11, verPat);
    replace2D(code, code[0].length - 11, 0, verPat[0].map((v, i) => verPat.map(r => r[i])));
  }

  let dataArea = code.map((d) => {
    return d.map((c) => {
      return c == null
    });
  });

  // fill data
  let x = code[0].length - 1
  let y = code.length - 1
  let nextMove = 0; // 0-l(u), 1-ur, 2-dr, 3-l(d)
  for (let i = 0; i < data.length; i++) {
    if (code[y][x] == null) {
      code[y][x] = data[i] == "1";
    } else {
      i--;
    }
    // l(u)
    if (nextMove == 0) {
      x -= 1;
      nextMove = 1;
      // ur
    } else if (nextMove == 1) {
      x += 1;
      y -= 1;
      if (y < 0) {
        y = 0;
        x -= 2
        if (x == 6) {
          x -= 1;
        }
        nextMove = 3;
      } else {
        nextMove = 0
      }
      // dr
    } else if (nextMove == 2) {
      x += 1;
      y += 1;
      if (y > code.length - 1) {
        y = code.length - 1;
        x -= 2;
        nextMove = 0
      } else {
        nextMove = 3;
      }
      // l(d)
    } else if (nextMove == 3) {
      x -= 1;
      nextMove = 2;
    }
  }

  code = code.map((d) => {
    return d.map((c) => {
      return c == null ? false : c
    });
  });

  return [code, dataArea];
}

const formats = {
  L: ["111011111000100", "111001011110011", "111110110101010", "111100010011101", "110011000101111", "110001100011000", "110110001000001", "110100101110110"],
  M: ["101010000010010", "101000100100101", "101111001111100", "101101101001011", "100010111111001", "100000011001110", "100111110010111", "100101010100000"],
  Q: ["011010101011111", "011000001101000", "011111100110001", "011101000000110", "010010010110100", "010000110000011", "010111011011010", "010101111101101"],
  H: ["001011010001001", "001001110111110", "001110011100111", "001100111010000", "000011101100010", "000001001010101", "000110100001100", "000100000111011"]
};

function addMask(code, dataArea, ecc) {
  let bestMask = 0;
  let lowestP = Infinity;
  let maskedCodes = [];

  for (let maskNum = 0; maskNum < 8; maskNum++) {
    let mask = [];
    for (let r = 0; r < code.length; r++) {
      let row = []
      for (let c = 0; c < code[0].length; c++) {
        if (dataArea[r][c]) {
          if (maskNum == 0) {
            row.push((r + c) % 2 == 0);
          } else if (maskNum == 1) {
            row.push(r % 2 == 0);
          } else if (maskNum == 2) {
            row.push(c % 3 == 0);
          } else if (maskNum == 3) {
            row.push((r + c) % 3 == 0);
          } else if (maskNum == 4) {
            row.push((Math.floor(r / 2) + Math.floor(c / 3)) % 2 == 0);
          } else if (maskNum == 5) {
            row.push((r * c) % 2 + (r * c) % 3 == 0);
          } else if (maskNum == 6) {
            row.push(((r * c) % 2 + (r * c) % 3) % 2 == 0);
          } else if (maskNum == 7) {
            row.push(((r + c) % 2 + (r * c) % 3) % 2 == 0);
          }
        } else {
          row.push(null);
        }
      }
      mask.push(row)
    }

    let masked = [];
    for (let r = 0; r < code.length; r++) {
      masked.push([...code[r]]);
    }

    for (let r = 0; r < code.length; r++) {
      for (let c = 0; c < code[0].length; c++) {
        if (mask[r][c] != null) {
          masked[r][c] = Boolean(code[r][c] ^ mask[r][c]);
        }
      }
    }

    let format = formats[ecc][maskNum]

    for (let i = 0; i < 7; i++) {
      if (i == 6) {
        masked[8][7] = format[i] == "1";
        masked[7][8] = format[14 - i] == "1"
      } else {
        masked[8][i] = format[i] == "1";
        masked[i][8] = format[14 - i] == "1";
      }
      masked[masked.length - 1 - i][8] = format[i] == "1";
      masked[8][masked[0].length - 1 - i] = format[14 - i] == "1";
    }
    masked[8][8] = format[7]
    masked[8][masked[0].length - 8] = format[7]

    maskedCodes[maskNum] = masked;

    let runP = 0;
    for (let r = 0; r < masked.length; r++) {
      let len = 0;
      let current = false;
      for (let c = 0; c < masked[0].length; c++) {
        if (masked[r][c] != current) {
          current = masked[r][c];
          len = 1;
        } else {
          len++;
          if (len == 5) {
            runP += 3;
          } else if (len > 5) {
            runP++;
          }
        }
      }
    }
    for (let c = 0; c < masked[0].length; c++) {
      let len = 0;
      let current = false;
      for (let r = 0; r < masked.length; r++) {
        if (masked[r][c] != current) {
          current = masked[r][c];
          len = 1;
        } else {
          len++;
          if (len == 5) {
            runP += 3;
          } else if (len > 5) {
            runP++;
          }
        }
      }
    }

    let boxP = 0;
    for (let r = 0; r < masked.length - 1; r++) {
      for (let c = 0; c < masked[0].length - 1; c++) {
        if (masked[r][c] == masked[r + 1][c] && masked[r][c] == masked[r][c + 1] && masked[r][c] == masked[r + 1][c + 1]) {
          boxP += 3
        }
      }
    }

    let findP = 0;
    let findPats = [
      [false, true, false, true, true, true, false, true, false, false, false, false],
      [false, false, false, false, true, false, true, true, true, false, true, false]
    ]
    for (let pat of findPats) {
      for (let r of masked) {
        let row = [false, false, false, false].concat(r.concat([false, false, false, false]));
        for (let i = 0; i <= row.length - pat.length; i++) {
          let hasPat = true;
          for (let j = 0; j < pat.length; j++) {
            if (row[i + j] != pat[j]) {
              hasPat = false;
              break;
            }
          }
          if (hasPat) {
            findP += 40;
          }
        }
      }
    }
    for (let pat of findPats) {
      for (let c = 0; c < masked[0].length; c++) {
        let col = [false, false, false, false];
        for (let r = 0; r < masked.length; r++) {
          col.push(masked[r][c]);
        }
        col = col.concat([false, false, false, false]);
        for (let i = 0; i <= col.length - pat.length; i++) {
          let hasPat = true;
          for (let j = 0; j < pat.length; j++) {
            if (col[i + j] != pat[j]) {
              hasPat = false;
              break;
            }
          }
          if (hasPat) {
            findP += 40;
          }
        }
      }
    }

    let totBlack = 0;
    for (let r of masked) {
      for (let c of r) {
        if (c) {
          totBlack++;
        }
      }
    }
    let bal = totBlack / (masked.length * masked.length) * 100;
    bal = bal > 50 ? Math.floor(bal / 5) * 5 : Math.ceil(bal / 5) * 5
    let balP = Math.abs(bal - 50) * 2
    let totalP = runP + boxP + findP + balP;
    if (totalP < lowestP) {
      lowestP = totalP;
      bestMask = maskNum;
    }
  }
  return [bestMask, maskedCodes[bestMask]];
}

function draw(code, lineWidth, drawingSize) {
  if (lineWidth <= 0) {
    return;
  }
  let size = drawingSize;
  let pxSize = size/code.length;
  setDocDimensions(size, size);
  let t = createTurtle();

  function drawPixel(x, y, noFill = false) {
    t.down()
    if (!noFill) {
      let lineCount = Math.ceil((pxSize - lineWidth * 3 - lineWidth) / (lineWidth * 2))*2;
      if (pxSize - (lineCount+3)*lineWidth > 0) {
        lineCount+=2;
      } else {
        lineCount += 1;
      }
      let spacing = (pxSize-lineWidth) / (lineCount+1);
      console.log(spacing);
      t.jump([x*pxSize + lineWidth / 2 * 3, size - y*pxSize - lineWidth / 2 - spacing])
      for (let i = 0; i < pxSize - lineWidth * 3 - lineWidth; i += lineWidth * 2) {
        t.forward(pxSize - lineWidth * 3)
        t.right(90)
        t.forward(spacing);
        t.right(90);
        t.forward(pxSize - lineWidth * 3)
        t.left(90)
        t.forward(spacing);
        t.left(90)
      }
      let heightDrawn = (Math.ceil((pxSize - lineWidth * 3 - lineWidth) / (lineWidth * 2))*2+3)*lineWidth
      if (pxSize - heightDrawn > 0) {
        t.forward(pxSize - lineWidth * 3)
        t.right(90)
        t.forward(lineWidth);
        t.right(90);
        t.forward(pxSize - lineWidth * 3)
        t.right(180)
      } else {
        t.forward(pxSize - lineWidth * 3)
      }
    } else {
      t.jump([x*pxSize + lineWidth / 2 * 3, size - y*pxSize - lineWidth / 2 * 3])
      t.goTo([x*pxSize + (pxSize - lineWidth / 2 * 3), size - y*pxSize - (pxSize - lineWidth / 2 * 3)])
    }
    t.jump([x*pxSize + lineWidth / 2, size - y*pxSize - lineWidth / 2])
    for (let i = 0; i < 4; i++) {
      t.forward(pxSize - lineWidth)
      t.right(90)
    }

    t.up();
  }

  for (let y = 0; y < code.length; y++) {
    for (let x = 0; x < code[0].length; x++) {
      if (code[y][x] == true) {
        drawPixel(x, y);
      } else if (code[y][x] == null) {
        drawPixel(x, y, true);
      }
    }
  }

  drawTurtles([
    t
  ]);
}

qrCode(message, errorCorrection);
