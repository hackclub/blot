/*
@title: Password/BackupCode gen (do not use)
@author: Carter Tollman
@snapshot: 0.png

Made using BlotFont Library:
  @title: Blot Font
  @author: geschmit
  @Source: https://github.com/geschmit/blotfont
  
  ChatGPT, Gemini, Claude, and Llama3.1 helped troubleshoot the SHA-256 algorithm (it was mostly me being dumb)
  
  The code generates a secure, random password of a specified length using cryptographic techniques.
  It combines multiple sources of entropy, such as the current time and system information, to create
  a string of random data. This entropy is hashed using the SHA-256 algorithm to produce a 
  cryptographically secure hash. The code then selects characters from a predefined character set 
  based on the hash to construct the password. This process ensures that the generated password is 
  both unpredictable and meets the required length. 
  
  PLEASE DO NOT USE THE PASSWORDS, IF YOU GET HACKED I DO NOT WANT TO BE AT FAULT (SORRY <3)

  ** WARNING - DO NOT USE PASSWORDS GENERATED! **
    THIS IS NOT SECURE BECAUSE THE RANDOMNESS IS LIMITED 
    BY THE HASHING PROCESS AND INSUFFICIENT ENTROPY SOURCES.
    USE A REAL PASSWORD GENERATOR IF YOU WANT SECURE PASSWORDS.
  ** WARNING - DO NOT USE PASSWORDS GENERATED! **
*/



//edit to change the number of passwords and their length
const numPassword = 5 //number of passwords to generate
const length = 20; //password length

//Change to limit what chars can be used (do not add any that are not listed, they do not have code to work)
const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%()_+[]|;:,.<>?';  

/**
 * Generates a secure password of a given length.
 * @param {number} length - The desired length of the password.
 * @returns {string} - A secure password of the specified length.
 */
function passwordGen(length) {
    // Define the character set to use for the password

    /**
     * Gathers entropy from various sources to help generate a random value.
     * @returns {string} - A string combining multiple entropy sources.
     */
    function gatherEntropy() {
        // Get various sources of entropy
        const now = Date.now(); // Current timestamp
        const random = bt.rand(); // Basic random value
        const performanceNow = performance.now(); // High-resolution time
        const navigatorInfo = navigator.userAgent; // User agent string
        const language = navigator.language; // Browser language
        const cookieEnabled = navigator.cookieEnabled; // Cookie enabled status
        const onlineStatus = navigator.onLine; // Online status
        const deviceMemory = navigator.deviceMemory || ''; // Device memory (if available)
        const hardwareConcurrency = navigator.hardwareConcurrency || ''; // Number of CPU threads (if available)
        const timezoneOffset = new Date().getTimezoneOffset(); // Timezone offset in minutes
        const platform = navigator.platform; // Platform
        const randomBytes = Array.from({ length: 16 }, () => Math.random()).join('-'); // Additional random bytes

        // Combine all sources of entropy into a single string
        const entropySources = [
            now, random, performanceNow, navigatorInfo, language, cookieEnabled,
            onlineStatus, deviceMemory, hardwareConcurrency, timezoneOffset, platform,
            randomBytes
        ];
        return entropySources.join('-'); // Join sources with a hyphen
    }

    /**
     * Generates a cryptographically secure random integer between min and max (inclusive).
     * @param {number} min - The minimum value.
     * @param {number} max - The maximum value.
     * @returns {number} - A secure random integer between min and max.
     */
    function getSecureRandomInt(min, max) {
        const range = max - min + 1; // Calculate the range of values
        const byteRange = Math.ceil(Math.log2(range) / 8); // Determine the number of bytes needed
        const randomBytes = new Uint8Array(byteRange); // Create an array for random bytes
        crypto.getRandomValues(randomBytes); // Fill the array with cryptographically secure random values
        let randomValue = 0;
        for (let i = 0; i < byteRange; i++) {
            randomValue = (randomValue << 8) | randomBytes[i]; // Build the random integer from the bytes
        }
        return min + (randomValue % range); // Scale and return the random integer within the specified range
    }

    /**
     * Creates a SHA-256 hash from a given string.
     * @param {string} str - The input string to hash.
     * @returns {string} - The SHA-256 hash of the input string.
     */
    function sha256Hash(str) {
        return sha256(str); // Use the SHA-256 function defined below
    }

    // Generate the password
    let password = '';
    while (password.length < length) {
        // Gather entropy and hash it
        const entropy = gatherEntropy();
        let hashed = sha256Hash(entropy);
        const charsetLength = charset.length;
        while (hashed.length > 0 && password.length < length) {
            // Choose a character from the charset based on the hash
            const index = getSecureRandomInt(0, charsetLength - 1);
            password += charset[index]; // Add character to the password
            hashed = hashed.slice(1); // Remove one character from the hash
        }
    }

    return password.slice(0, length); // Ensure the password is exactly the requested length
}

/**
 * Computes the SHA-256 hash of a given message.
 * @param {string} message - The input message to hash.
 * @returns {string} - The SHA-256 hash of the input message.
 */
function sha256(message) {
    // SHA-256 constants
    const K = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    /**
     * Preprocesses the input message for SHA-256 hashing.
     * @param {string} message - The input message to preprocess.
     * @returns {Uint8Array} - The preprocessed message as an array of bytes.
     */
    function preprocess(message) {
        const bytes = new TextEncoder().encode(message); // Convert message to byte array
        const bitLength = bytes.length * 8; // Calculate the bit length of the message
        const paddingLength = (448 - (bitLength + 1) % 512 + 512) % 512; // Calculate the padding length
        const paddedLength = bitLength + 1 + paddingLength + 64; // Calculate total length after padding and length encoding
        const blocks = new Uint8Array((paddedLength + 7) >> 3); // Create an array to hold the padded message
        blocks.set(bytes); // Set the original message bytes
        blocks[bytes.length] = 0x80; // Append the '1' bit (0x80)
        const view = new DataView(blocks.buffer);
        view.setUint32(blocks.length - 8, Math.floor(bitLength / 0x100000000), false); // Append the high 32 bits of the length
        view.setUint32(blocks.length - 4, bitLength, false); // Append the low 32 bits of the length
        return blocks; // Return the preprocessed message
    }

    /**
     * Computes the SHA-256 hash of the preprocessed message blocks.
     * @param {Uint8Array} blocks - The preprocessed message blocks.
     * @returns {Uint8Array} - The hash value as an array of bytes.
     */
    function hashBlocks(blocks) {
        // Initialize hash values
        const H = [
            0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
        ];
        const W = new Uint32Array(64); // Array to hold message schedule

        for (let i = 0; i < blocks.length; i += 64) {
            // Process each 512-bit chunk
            const chunk = blocks.slice(i, i + 64); // Extract chunk
            const view = new DataView(chunk.buffer);
            // Load the first 16 words from the chunk
            for (let j = 0; j < 16; j++) {
                if (j * 4 + 4 <= chunk.length) {
                    W[j] = view.getUint32(j * 4); // Get 32-bit words
                }
            }
            // Extend the message schedule
            for (let j = 16; j < 64; j++) {
                const s0 = ((W[j - 15] >>> 7) | (W[j - 15] << 25)) ^ ((W[j - 15] >>> 18) | (W[j - 15] << 14)) ^ (W[j - 15] >>> 3);
                const s1 = ((W[j - 2] >>> 17) | (W[j - 2] << 15)) ^ ((W[j - 2] >>> 19) | (W[j - 2] << 13)) ^ (W[j - 2] >>> 10);
                W[j] = (W[j - 16] + s0 + W[j - 7] + s1) >>> 0; // Calculate word values
            }
            
            // Initialize working variables
            let [a, b, c, d, e, f, g, h] = H;
            for (let j = 0; j < 64; j++) {
                // Compute SHA-256 operations
                const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
                const ch = (e & f) ^ (~e & g);
                const temp1 = (h + S1 + ch + K[j] + W[j]) >>> 0;
                const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
                const maj = (a & b) ^ (a & c) ^ (b & c);
                const temp2 = (S0 + maj) >>> 0;
                
                // Update hash values
                h = g;
                g = f;
                f = e;
                e = (d + temp1) >>> 0;
                d = c;
                c = b;
                b = a;
                a = (temp1 + temp2) >>> 0;
            }
            
            // Add the compressed chunk's hash to the current hash values
            H[0] = (H[0] + a) >>> 0;
            H[1] = (H[1] + b) >>> 0;
            H[2] = (H[2] + c) >>> 0;
            H[3] = (H[3] + d) >>> 0;
            H[4] = (H[4] + e) >>> 0;
            H[5] = (H[5] + f) >>> 0;
            H[6] = (H[6] + g) >>> 0;
            H[7] = (H[7] + h) >>> 0;
        }
        
        // Convert hash values to byte array
        return new Uint8Array(H.flatMap(h => [
            (h >>> 24) & 0xff, (h >>> 16) & 0xff, (h >>> 8) & 0xff, h & 0xff
        ]));
    }
    
    // Convert hash to hexadecimal string
    return Array.from(hashBlocks(preprocess(message)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}


var ParseCoords = (cstr, multScale = 1) => {
  const coordArray = [];
  for (const x of cstr.split(":")) {
    if (parseFloat(x)) {
      coordArray.push(parseFloat(x));
    }
  }
  return coordArray;
};
var RunInstructions = (inst, org, scale = 1) => {
  const turtle = new bt.Turtle();
  turtle.jump(org)
  for (const x of inst.split(",")) {
    const cmd = x.split("$")[0];
    const args = x.split("$")[1];
    let data;
    switch (cmd) {
      case "u":
        turtle.up();
        break;
      case "d":
        turtle.down();
        break;
      case "f":
        turtle.forward(parseFloat(args) * scale);
        break;
      case "arc":
        data = ParseCoords(args);
        turtle.arc(-data[0], data[1] * scale);
        break;
      case "jmp":
        data = ParseCoords(args);
        turtle.jump(data);
        break;
      case "sa":
        turtle.setAngle(parseFloat(args));
        break;
      case "l":
        turtle.left(parseFloat(args));
        break;
      case "r":
        turtle.right(parseFloat(args));
        break;
      default:
        break;
    }
  }
  drawLines(turtle.lines());
  return turtle.position;
};

// letters.ts
var letters = {
  // some of these instructions could definitely be minified. I will most
  // likely submit a second pr to fix some of these later
  // todo unterrible letter instructions
  a: `sa$90,f$2,r$90,f$2,r$90,f$2,u,sa$90,f$2,d,l$30,f$2,l$120,f$2`,
  b: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1`,
  c: `sa$90,u,r$90,f$2,r$180,d,arc$180:2`,
  d: `sa$90,f$4,r$90,arc$180:2`,
  e: `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  f: `sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2`,
  g: `u,f$1,sa$90,f$2,r$90,d,arc$270:1,f$2,arc$90:1`,
  h: `sa$90,f$4,u,f$-2,r$90,d,f$2,u,l$90,f$-2,d,f$4`,
  i: `f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2`,
  j: `sa$90,u,f$4,r$90,d,f$2,u,f$-1,r$90,d,f$3,arc$90:1`,
  k: `sa$90,f$4,u,f$-2,r$45,d,f$2.75,u,f$-2.75,r$90,d,f$2.75`,
  l: `sa$90,u,f$4,r$180,d,f$4,l$90,f$2`,
  m: `sa$90,f$4,sa$0,r$71.57,f$3.162,sa$0,l$71.57,f$3.162,sa$0,r$90,f$4`,
  n: `sa$90,f$4,r$153.43,f$4.47,l$153.43,f$4`,
  o: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1`,
  p: `sa$90,f$4,r$90,f$1,arc$180:1,f$1`,
  q: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,r$90,f$1,r$45,d,f$1.414`,
  r: `sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284`,
  s: `f$1,arc$-180:1,arc$180:1,f$1`,
  t: `u,f$1,sa$90,d,f$4,u,r$90,f$-1,d,f$2`,
  u: `sa$90,u,f$4,sa$-90,d,f$3,arc$-180:1,f$3`,
  v: `sa$90,u,f$4,r$165.96,d,f$4.12,l$151.93,f$4.12`,
  w: `sa$90,u,f$4,sa$0,r$82.87,d,f$4.03,sa$0,l$63.43,f$1.12,sa$0,r$63.43,f$1.12,sa$0,l$82.87,f$4.03`,
  x: `sa$90,u,f$4,r$153.44,d,f$4.47,u,l$153.44,f$4,l$153.44,d,f$4.47`,
  y: `u,f$1,sa$90,d,f$2.5,r$33.69,f$1.8,u,f$-1.8,l$67.38,d,f$1.8`,
  z: `u,f$2,d,f$-2,l$63.44,f$4.47,r$63.44,f$-2`,
  ["0"]: `sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,f$2,arc$45:1,sa$-66.80,d,f$3.675`,
  ["1"]: (origin, scale) => DrawBezier(
    origin,
    -106,
    scale,
    bezierEasing(0.026, [0.984, -1], [1, 1], 0.9561),
    [2, -0.47],
    `f$2,u,f$-1,sa$90,d,f$4,l$90`
  ),
  ["2"]: `u,f$2,r$180,d,f$2,sa$90,arc$90:1,arc$-90:1,f$1,arc$-180:1`,
  ["3"]: `sa$90,u,f$4,r$90,d,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1`,
  ["4"]: `u,f$2,sa$90,f$1,l$90,d,f$2,r$116.57,f$3.35,sa$-90,f$4`,
  ["5"]: `u,sa$90,f$1,r$180,d,arc$-180:1,f$1,arc$-90:1,arc$90:1,sa$0,f$2`,
  ["6"]: (origin, scale) => DrawBezier(
    origin,
    74,
    scale,
    bezierEasing(-0.018, [0.054, -0.373], [1, -0.758], 0.9181),
    [3.2, -0.36],
    `u,sa$90,f$1,d,arc$360:1`
  ),
  ["7"]: (origin, scale) => DrawBezier(
    origin,
    245,
    scale,
    bezierEasing(-5e-3, [0, -0.149], [0, 1], 0.206),
    [4.5, -0.59],
    `u,sa$90,f$4,r$90,d,f$2`
  ),
  ["8"]: `u,f$1,d,arc$-180:1,arc$360:1,arc$-180:1`,
  ["9"]: (origin, scale) => DrawBezier(
    origin,
    -107,
    scale,
    bezierEasing(-0.018, [0.054, -0.373], [1, -0.758], 0.9181),
    [3.2, -0.36],
    `u,sa$90,f$4,r$90,f$1,d,arc$360:1,u,arc$90:1,d`
  ),
  ["."]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25`,
  [","]: `sa$90,u,f$.5,r$90,f$1,r$90,d,arc$90:.25`,
  ["?"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$1,r$90,arc$-270:1`,
  ["!"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$3`,
  ["+"]: `sa$90,u,f$2,r$90,d,f$2,u,f$-1,l$90,f$-1,d,f$2`,
  ["-"]: `sa$90,u,f$2,r$90,d,f$2`,
  ["*"]: `sa$90,u,f$2,r$90,f$1,l$90,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2`,
  ["/"]: `l$63.43,f$4.47`,
  ["="]: `sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2`,
  ["$"]: `f$1,arc$-180:1,arc$180:1,f$1,u,f$-1,r$90,d,f$4`,
  [":"]: `sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$2.5,d,r$90,arc$360:.25`,
  [";"]: `sa$90,u,f$.25,r$90,f$1,r$90,d,arc$90:.25,u,arc$270:.25,r$180,f$3,d,r$90,arc$-360:.25`,
  ["("]: `u,f$1.25,r$180,d,arc$90:.5,f$3,arc$90:.5`,
  [")"]: `u,f$.75,d,arc$-90:.5,f$3,arc$-90:.5`,
  ["["]: `u,f$1.5,r$180,d,f$1,r$90,f$4,r$90,f$1`,
  ["]"]: `u,f$.5,d,f$1,l$90,f$4,l$90,f$1`,
  ["#"]: `sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2,u,r$90,f$.5,r$90,f$.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2`,
  ["%"]: `sa$90,u,f$2,r$45,d,f$2.83,u,l$45,f$-1.5,d,arc$-360:.5,u,f$1.5,l$90,f$1.5,d,arc$-360:.5`,
  ["_"]: `f$2`,
  ["|"]: `u,f$1,sa$90,d,f$4`,
  ["\\"]: `u,f$4,r$153.43,d,f$4.47`,
  ['"']: `u,f$.5,sa$90,f$3,d,f$1,u,r$90,f$1,r$90,f$1`,
  ["'"]: `u,f$1,sa$90,f$3,d,f$1`,
  [">"]: `sa$90,u,f$1,r$63.43,d,f$2.24,l$127,f$2.24`,
  // redo
  ["<"]: `u,f$2,sa$90,f$1,l$63.43,d,f$2.24,r$127,f$2.24`,
  // specials
  [" "]: ``,
  ["\r"]: ``,
  ["\n"]: ``
};
var allLetters = Object.keys(letters).join("");

// funcs.ts
var DrawBezier = (org, ang, scale, bezfunc, curveSizes, instructions) => {
  const turtle = new bt.Turtle();
  turtle.jump(org);
  if (instructions) {
    turtle.jump(RunInstructions(instructions, org, scale));
  }
  turtle.setAngle(ang);
  turtle.forward(curveSizes[0] * scale);
  bt.resample(turtle.path, 0.1);
  warp(turtle, (x) => bezfunc(x) * curveSizes[1] * scale);
  drawLines(turtle.lines());
  return;
};

var DrawText = (text, org, scale = 10, spacing = [2.5, 4.5]) => {
  let xInd = 0;
  let yInd = 0;
  for (const x of text.toLowerCase()) {
    if (allLetters.indexOf(x, 0) == -1) {
      RunInstructions(
        letters["?"],
        [
          org[0] + xInd * spacing[0] * scale,
          org[1] - yInd * spacing[1] * scale
        ],
        scale
      );
    } else {
      switch (x) {
        case "\r":
          xInd = 0;
          continue;
        case "\n":
          xInd = 0;
          yInd += 1;
          continue;
        default:
          if (typeof letters[x] == "string") {
            RunInstructions(
              letters[x],
              [
                org[0] + xInd * spacing[0] * scale,
                org[1] - yInd * spacing[1] * scale
              ],
              scale
            );
          } else if (typeof letters[x] == "function") {
            letters[x]([
              org[0] + xInd * spacing[0] * scale,
              org[1] - yInd * spacing[1] * scale
            ], scale);
          }
          break;
      }
      xInd += 1;
      continue;
    }
  }
  return;
};

// main.ts
setDocDimensions(125, 125);

DrawText("", [48, 125], 14);
DrawText(
  `Passwords: (DO NOT USE)`,
  [5, 115],
  1.25
);
for (let t = 0; t < numPassword; t++){
DrawText(passwordGen(length),
  [15, 107 - t*7.5],
  1,
  [2.75, 5]
);
}


// helper functions - added by Leo when porting piece from old library

function calculateBezierPoint(t, p0, p1, p2, p3) {
  let u = 1 - t
  let tt = t * t
  let uu = u * u
  let uuu = uu * u
  let ttt = tt * t

  let p = [uuu * p0[0], uuu * p0[1]] // u^3 * p0
  p[0] += 3 * uu * t * p1[0] // 3u^2t * p1
  p[1] += 3 * uu * t * p1[1]
  p[0] += 3 * u * tt * p2[0] // 3ut^2 * p2
  p[1] += 3 * u * tt * p2[1]
  p[0] += ttt * p3[0] // t^3 * p3
  p[1] += ttt * p3[1]

  return p
}

function findTForGivenX(xTarget, p0, p1, p2, p3) {
  let tolerance = 0.00001
  let t = 0.5 // Start with approximate solution
  let iterations = 0

  while (iterations < 1000) {
    // Max iterations to prevent infinite loop
    let p = calculateBezierPoint(t, p0, p1, p2, p3)
    let difference = p[0] - xTarget
    if (Math.abs(difference) < tolerance) {
      return t
    } else {
      t = t - difference / 2 // Approximate a new t value
    }
    iterations++
  }
  return t // Return the approximate t value
}

function getYForX(x, p0, p1, p2, p3) {
  let t = findTForGivenX(x, p0, p1, p2, p3)
  let p = calculateBezierPoint(t, p0, p1, p2, p3)
  return p[1]
}

function bezierEasing(initial, p0, p1, final) {
  return (x) =>
    getYForX(
      x,
      [0, initial],
      [Math.min(Math.max(0, p0[0]), 1), p0[1]],
      [Math.min(Math.max(0, p1[0]), 1), p1[1]],
      [1, final]
    )
}

function warp(turtle, fn, baseAngle = null) {
  const tValues = tValuesForPoints(turtle.path);
  const newPts = [];
  tValues.forEach((t, i) => {
    const pt = turtle.path.flat()[i];
    let angle = baseAngle ?? bt.getAngle(turtle.path, t);
    if (typeof angle === "function") {
      angle = angle(bt.getAngle(turtle.path, t));
    } else if (typeof angle === "number") {
      angle = angle;
    }
    const y = fn(t);
    const newPoint = rotate([0, y], angle);
    newPts.push([pt[0] + newPoint[0], pt[1] + newPoint[1]]);
  });
  turtle.path.flat().forEach((pt, i, arr) => {
    pt[0] = newPts[i][0];
    pt[1] = newPts[i][1];
  });
  return turtle

  function rotate(pt, angle, origin = [0, 0]) {
    let delta = angle / 180 * Math.PI;
    let hereX = pt[0] - origin[0];
    let hereY = pt[1] - origin[1];
    let newPoint = [
      hereX * Math.cos(delta) - hereY * Math.sin(delta) + origin[0],
      hereY * Math.cos(delta) + hereX * Math.sin(delta) + origin[1]
    ];
    return newPoint;
  }
}

function tValuesForPoints(polylines) {
  let totalLength = 0;
  let lengths = [];
  let tValues = [];
  let segmentLength = 0;
  for (let i = 0; i < polylines.length; i++) {
    let polyline2 = polylines[i];
    for (let j = 0; j < polyline2.length; j++) {
      if (j > 0) {
        let dx = polyline2[j][0] - polyline2[j - 1][0];
        let dy = polyline2[j][1] - polyline2[j - 1][1];
        segmentLength = Math.sqrt(dx * dx + dy * dy);
        totalLength += segmentLength;
      }
      lengths.push(segmentLength);
    }
  }
  let accumulatedLength = 0;
  for (let i = 0; i < lengths.length; i++) {
    accumulatedLength += lengths[i];
    tValues.push(accumulatedLength / totalLength);
  }
  return tValues;
};
