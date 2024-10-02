const width = 125;
const height = 125;

const scaleX = width / 500;
const scaleY = height / 700;

setDocDimensions(width, height);

const finalLines = [];

const letters = {
  'A': [
    [[0, 1], [0.5, 0]],
    [[0.5, 0], [1, 1]],
    [[0.25, 0.5], [0.75, 0.5]]
  ],
  'W': [
    [[0, 0], [0.2, 1]],
    [[0.2, 1], [0.5, 0]],
    [[0.5, 0], [0.8, 1]],
    [[0.8, 1], [1, 0]]
  ],
  'N': [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 1]],
    [[1, 1], [1, 0]]
  ],
  'T': [
    [[0, 0], [1, 0]],
    [[0.5, 0], [0.5, 1]]
  ],
  'E': [
    [[0, 0], [0, 1]],
    [[0, 0], [1, 0]],
    [[0, 0.5], [0.7, 0.5]],
    [[0, 1], [1, 1]]
  ],
  'D': [
    [[0, 0], [0, 1]],
    [[0, 0], [0.8, 0.2]],
    [[0.8, 0.2], [0.8, 0.8]],
    [[0.8, 0.8], [0, 1]]
  ],
  'O': [
    [[0.5, 0], [0, 0.5]],
    [[0, 0.5], [0.5, 1]],
    [[0.5, 1], [1, 0.5]],
    [[1, 0.5], [0.5, 0]]
  ],
  'H': [
    [[0, 0], [0, 1]],
    [[1, 0], [1, 1]],
    [[0, 0.5], [1, 0.5]]
  ],
  'J': [
    [[0, 0], [1, 0]],
    [[0.5, 0], [0.5, 0.8]],
    [[0.5, 0.8], [0.3, 1]],
    [[0.3, 1], [0, 0.8]]
  ],
  ' ': []
};

function drawLetter(letter, x, y, size) {
  const letterStrokes = letters[letter.toUpperCase()];
  if (!letterStrokes) return;

  letterStrokes.forEach(stroke => {
    const scaledStroke = stroke.map(point => {
      return [x + point[0]*size, y + (1 - point[1])*size];
    });
    finalLines.push(scaledStroke);
  });
}

function drawText(text, x, y, size, letterSpacing) {
  let currentX = x;
  text.split('').forEach(char => {
    if (char === ' ') {
      currentX += size / 2;
    } else {
      drawLetter(char, currentX, y, size);
      currentX += size + letterSpacing;
    }
  });
}

drawText('WANTED', 50 * scaleX, 574 * scaleY, 63 * scaleX, 5 * scaleX);
drawText('JOHN DOE', 50 * scaleX, 85 * scaleY, 46 * scaleX, 10 * scaleX);

function flipY(y) {
  return height - y;
}

const photoBox = [
  [50 * scaleX, flipY(163 * scaleY)],
  [450 * scaleX, flipY(163 * scaleY)],
  [450 * scaleX, flipY(500 * scaleY)],
  [50 * scaleX, flipY(500 * scaleY)],
  [50 * scaleX, flipY(163 * scaleY)]
];

finalLines.push(photoBox);

const photoBoxX = 50 * scaleX;
const photoBoxY = flipY(500 * scaleY);
const photoBoxWidth = 400 * scaleX;
const photoBoxHeight = 337 * scaleY;

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

const shirts = [
  [
    [[0.3, 1], [0.7, 1]],
    [[0.7, 1], [0.7, 0.6]],
    [[0.7, 0.6], [0.5, 0.5]],
    [[0.5, 0.5], [0.3, 0.6]],
    [[0.3, 0.6], [0.3, 1]]
  ],
  [
    [[0.3, 1], [0.7, 1]],
    [[0.7, 1], [0.7, 0.5]],
    [[0.7, 0.5], [0.6, 0.5]],
    [[0.6, 0.5], [0.5, 0.6]],
    [[0.5, 0.6], [0.4, 0.5]],
    [[0.4, 0.5], [0.3, 0.5]],
    [[0.3, 0.5], [0.3, 1]]
  ],
  [
    [[0.3, 1], [0.7, 1]],
    [[0.7, 1], [0.7, 0.7]],
    [[0.7, 0.7], [0.3, 0.7]],
    [[0.3, 0.7], [0.3, 1]]
  ]
];

const faces = [
  [
    [[0.5, 0.1], [0.35, 0.2]],
    [[0.35, 0.2], [0.3, 0.35]],
    [[0.3, 0.35], [0.3, 0.55]],
    [[0.3, 0.55], [0.35, 0.7]],
    [[0.35, 0.7], [0.5, 0.8]],
    [[0.5, 0.8], [0.65, 0.7]],
    [[0.65, 0.7], [0.7, 0.55]],
    [[0.7, 0.55], [0.7, 0.35]],
    [[0.7, 0.35], [0.65, 0.2]],
    [[0.65, 0.2], [0.5, 0.1]]
  ],
  [
    [[0.5, 0.1], [0.4, 0.2]],
    [[0.4, 0.2], [0.35, 0.35]],
    [[0.35, 0.35], [0.35, 0.55]],
    [[0.35, 0.55], [0.4, 0.7]],
    [[0.4, 0.7], [0.5, 0.8]],
    [[0.5, 0.8], [0.6, 0.7]],
    [[0.6, 0.7], [0.65, 0.55]],
    [[0.65, 0.55], [0.65, 0.35]],
    [[0.65, 0.35], [0.6, 0.2]],
    [[0.6, 0.2], [0.5, 0.1]]
  ],
  [
    [[0.35, 0.2], [0.65, 0.2]],
    [[0.65, 0.2], [0.65, 0.7]],
    [[0.65, 0.7], [0.35, 0.7]],
    [[0.35, 0.7], [0.35, 0.2]]
  ]
];

const hairs = [
  [
    [[0.35, 0.2], [0.4, 0]],
    [[0.4, 0], [0.45, 0.2]],
    [[0.45, 0.2], [0.5, 0]],
    [[0.5, 0], [0.55, 0.2]],
    [[0.55, 0.2], [0.6, 0]],
    [[0.6, 0], [0.65, 0.2]]
  ],
  [
    [[0.35, 0.2], [0.4, 0.1]],
    [[0.4, 0.1], [0.45, 0.2]],
    [[0.45, 0.2], [0.5, 0.1]],
    [[0.5, 0.1], [0.55, 0.2]],
    [[0.55, 0.2], [0.6, 0.1]],
    [[0.6, 0.1], [0.65, 0.2]]
  ],
  []
];

const eyes = [
  [
    [[0.47, 0.4], [0.49, 0.4]],
    [[0.51, 0.4], [0.53, 0.4]]
  ],
  [
    [[0.42, 0.4], [0.44, 0.4]],
    [[0.56, 0.4], [0.58, 0.4]]
  ],
  [
    [[0.45, 0.4], [0.47, 0.4]],
    [[0.53, 0.4], [0.55, 0.4]]
  ]
];

const facialHairs = [
  [
    [[0.46, 0.5], [0.54, 0.5]]
  ],
  [
    [[0.4, 0.55], [0.6, 0.55]],
    [[0.6, 0.55], [0.6, 0.7]],
    [[0.6, 0.7], [0.4, 0.7]],
    [[0.4, 0.7], [0.4, 0.55]]
  ],
  [
    [[0.48, 0.6], [0.52, 0.6]],
    [[0.52, 0.6], [0.52, 0.7]],
    [[0.52, 0.7], [0.48, 0.7]],
    [[0.48, 0.7], [0.48, 0.6]]
  ],
  []
];

const selectedShirt = getRandomElement(shirts);
const selectedFace = getRandomElement(faces);
const selectedHair = getRandomElement(hairs);
const selectedEyes = getRandomElement(eyes);
const selectedFacialHair = getRandomElement(facialHairs);

function drawFeature(featureLines) {
  featureLines.forEach(stroke => {
    const scaledStroke = stroke.map(point => {
      return [
        photoBoxX + point[0] * photoBoxWidth,
        photoBoxY + (1 - point[1]) * photoBoxHeight
      ];
    });
    finalLines.push(scaledStroke);
  });
}

drawFeature(selectedShirt);
drawFeature(selectedFace);
drawFeature(selectedHair);
drawFeature(selectedEyes);
drawFeature(selectedFacialHair);

drawLines(finalLines);