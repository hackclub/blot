
/*
@title: BF Visualizer
@author: Chang Lu
@snapshot: BF Visualizer
*/

const code = '+++++>+++<[>[>+>+<<-]>>[<<+>>-]<<<-]>>';
// const code = '++++++>++++<[->+<]>';
// const code = '++++++[->++<]>';

const CHAR_SEGMENTS = {
    // Digits 0-9
    '0': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 1]], [[0, 1], [0, 0]]
    ],
    '1': [
        [[0.5, 0], [0.5, 1]]
    ],
    '2': [
        [[0, 0], [1, 0]], [[1, 0], [1, 0.5]], [[1, 0.5], [0, 0.5]], [[0, 0.5], [0, 1]], [[0, 1], [1, 1]]
    ],
    '3': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]], [[0, 1], [1, 1]]
    ],
    '4': [
        [[0, 0], [0, 0.5]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]]
    ],
    '5': [
        [[1, 0], [0, 0]], [[0, 0], [0, 0.5]], [[0, 0.5], [1, 0.5]], [[1, 0.5], [1, 1]], [[0, 1], [1, 1]]
    ],
    '6': [
        [[1, 0], [0, 0]], [[0, 0], [0, 1]], [[0, 0.5], [1, 0.5]], [[1, 0.5], [1, 1]], [[0, 1], [1, 1]]
    ],
    '7': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]]
    ],
    '8': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]], [[0, 1], [1, 1]], [[0, 0], [0, 1]]
    ],
    '9': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]], [[0, 0], [0, 0.5]], [[0, 1], [1, 1]]
    ],
    // Letters A-Z
    'A': [
        [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]], [[0, 0], [1, 0]]
    ],
    'B': [
        [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[1, 0], [1, 0.5]], [[0, 0.5], [1, 0.5]], [[0, 1], [1, 1]], [[1, 0.5], [1, 1]]
    ],
    'C': [
        [[1, 0], [0, 0]], [[0, 0], [0, 1]], [[0, 1], [1, 1]]
    ],
    'D': [
        [[0, 0], [0, 1]], [[0, 0], [1, 0.5]], [[1, 0.5], [1, 1]], [[0, 1], [1, 1]]
    ],
    'E': [
        [[1, 0], [0, 0]], [[0, 0], [0, 1]], [[0, 1], [1, 1]], [[0, 0.5], [1, 0.5]]
    ],
    'F': [
        [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[0, 0.5], [1, 0.5]]
    ],
    'G': [
        [[1, 0], [0, 0]], [[0, 0], [0, 1]], [[0, 1], [1, 1]], [[1, 0.5], [1, 1]], [[0.5, 0.5], [1, 0.5]]
    ],
    'H': [
        [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0.5], [1, 0.5]]
    ],
    'I': [
        [[0.5, 0], [0.5, 1]]
    ],
    'J': [
        [[1, 0.5], [0.5, 1]], [[0.5, 1], [0, 1]], [[0, 0], [1, 0]], [[1, 0], [1, 0.5]]
    ],
    'K': [
        [[0, 0], [0, 1]], [[0, 0.5], [1, 1]], [[0, 0.5], [1, 0]]
    ],
    'L': [
        [[0, 0], [0, 1]], [[0, 1], [1, 1]]
    ],
    'M': [
        [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 0], [0.5, 1]], [[1, 0], [0.5, 1]]
    ],
    'N': [
        [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 1], [1, 0]]
    ],
    'O': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 1]], [[0, 1], [0, 0]]
    ],
    'P': [
        [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[1, 0], [1, 0.5]], [[0, 0.5], [1, 0.5]]
    ],
    'Q': [
        [[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 1]], [[0, 1], [0, 0]], [[0.5, 0.5], [1, 1]]
    ],
    'R': [
        [[0, 0], [0, 1]], [[0, 0], [1, 0]], [[1, 0], [1, 0.5]], [[0, 0.5], [1, 0.5]], [[0.5, 0.5], [1, 1]]
    ],
    'S': [
        [[1, 0], [0, 0]], [[0, 0], [0, 0.5]], [[0, 0.5], [1, 0.5]], [[1, 0.5], [1, 1]], [[0, 1], [1, 1]]
    ],
    'T': [
        [[0.5, 0], [0.5, 1]], [[0, 0], [1, 0]]
    ],
    'U': [
        [[0, 0], [0, 1]], [[1, 0], [1, 1]], [[0, 1], [1, 1]]
    ],
    'V': [
        [[0, 0], [0.5, 1]], [[0.5, 1], [1, 0]]
    ],
    'W': [
        [[0, 1], [0.5, 0]], [[1, 1], [0.5, 0]], [[0, 1], [0, 0]], [[1, 1], [1, 0]]
    ],
    'X': [
        [[0, 0], [1, 1]], [[0, 1], [1, 0]]
    ],
    'Y': [
        [[0, 0], [0.5, 0.5]], [[1, 0], [0.5, 0.5]], [[0.5, 0.5], [0.5, 1]]
    ],
    'Z': [
        [[0, 1], [1, 1]], [[1, 0], [0, 1]], [[0, 0], [1, 0]]
    ],
    // Basic punctuation
    '.': [
        [[0.5, 0], [0.5, 0.1]]
    ],
    ',': [
        [[0.5, 0], [0.5, 0.1], [0.4, -0.1]]
    ],
    '!': [
        [[0.5, 0], [0.5, 0.7]], [[0.5, 0.8], [0.5, 1]]
    ],
    '?': [
        [[0.5, 1], [0.5, 0.9]], [[0.5, 0.8], [0.5, 0.5]], [[0.5, 0.5], [0.6, 0.4]], [[0.6, 0.4], [0.4, 0.2]]
    ],
    ' ': [
        // Empty for space
    ],
    '+': [
        [[0.5, 0], [0.5, 1]], [[0, 0.5], [1, 0.5]]
    ],
    '-': [
        [[0, 0.5], [1, 0.5]]
    ],
    '[': [
        [[0, 1], [1, 1]], [[0, 0], [0, 1]], [[1, 0], [0, 0]]
    ],
    ']': [
        [[1, 1], [0, 1]], [[1, 0], [1, 1]], [[0, 0], [1, 0]]
    ],
    '>': [
        [[0, 0], [1, 0.5]], [[1, 0.5], [0, 1]]
    ],
    '<': [
        [[1, 0], [0, 0.5]], [[0, 0.5], [1, 1]]
    ]
};
function drawText(text, x, y, size, width=1) {
    const scale = size;
    let offsetX = x;

    for (const char of text.toUpperCase()) {
        if (CHAR_SEGMENTS[char]) {
            const segments = CHAR_SEGMENTS[char].map(segment => {
                return segment.map(([sx, sy]) => [
                    offsetX + sx * scale,
                    y - sy * scale + scale,
                ]);
            });

            drawLines(segments, { stroke: 'black', width: width });
        }
        offsetX += scale * 1.5; // Adjust spacing between characters
    }
}
function drawTape(tape, x, y, size, pointerLocation) {
    const scale = size;
    const tapeLength = tape.length;

    // Draw the tape
    for (let i = 0; i < tapeLength; i++) {
        const value = tape[i] || 0; // Default value if tape[i] is undefined

        // Draw square representing each tape cell
        drawLines([
            [[x + i * scale, y], [x + (i + 1) * scale, y]],
            [[x + (i + 1) * scale, y], [x + (i + 1) * scale, y + scale]],
            [[x + (i + 1) * scale, y + scale], [x + i * scale, y + scale]],
            [[x + i * scale, y + scale], [x + i * scale, y]]
        ], { stroke: 'black', width: 3 });

        // Calculate the appropriate text size based on the length of the number
        const textSize = scale / (Math.max(value.toString().length, 1)*1.5-0.5) * 0.6;
        
        // Draw text inside the cell
        drawText(value.toString(), x + i * scale + scale * 0.2, y + scale * 0.5 - textSize/2, textSize);
    }

    // Draw an arrow to indicate the current cell
    drawLines([
        [[x + pointerLocation * scale + scale * 0.5, y + scale + 10], [x + pointerLocation * scale + scale * 0.5, y + scale + 2]],
        [[x + pointerLocation * scale + scale * 0.5, y + scale + 2], [x + pointerLocation * scale + scale * 0.25, y + scale + 5]],
        [[x + pointerLocation * scale + scale * 0.5, y + scale + 2], [x + pointerLocation * scale + scale * 0.75, y + scale + 5]]
    ], { stroke: 'black', width: 3 });
}
function drawCode(code, x, y, size, pointerLocation) {
    const scale = size;
    let offsetX = x;

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        const isHighlighted = i === pointerLocation;
        const lineWidth = isHighlighted ? 3 : 1;

        if (CHAR_SEGMENTS[char]) {
            const segments = CHAR_SEGMENTS[char].map(segment => {
                return segment.map(([sx, sy]) => [
                    offsetX + sx * scale,
                    y + sy * scale,
                ]);
            });

            drawLines(segments, { stroke: 'black', width: lineWidth });
        }
        offsetX += scale * 1.5; // Adjust spacing between characters
    }
}
function interpretBrainfuck(code, maxFrames = 100) {
    const tape = new Array(10).fill(0);
    let pointer = 0;
    let codePointer = 0;
    const tapeSnapshots = [];

    for (let frame = 0; frame < maxFrames; frame++) {
        if (codePointer >= code.length) {
            break;
        }

        const command = code[codePointer];

        switch (command) {
            case '>':
                pointer = (pointer + 1) % tape.length;
                break;
            case '<':
                pointer = (pointer - 1 + tape.length) % tape.length;
                break;
            case '+':
                tape[pointer]++;
                break;
            case '-':
                tape[pointer]--;
                break;
            case '[':
                if (tape[pointer] === 0) {
                    let loopCounter = 1;
                    while (loopCounter > 0) {
                        codePointer++;
                        if (code[codePointer] === '[') loopCounter++;
                        if (code[codePointer] === ']') loopCounter--;
                    }
                }
                break;
            case ']':
                if (tape[pointer] !== 0) {
                    let loopCounter = 1;
                    while (loopCounter > 0) {
                        codePointer--;
                        if (code[codePointer] === '[') loopCounter--;
                        if (code[codePointer] === ']') loopCounter++;
                    }
                }
                break;
        }

        // Store the current state of the tape, pointer position, and code pointer
        tapeSnapshots.push({
            tape: [...tape],
            pointer,
            codePointer
        });

        codePointer++;
    }

    return tapeSnapshots;
}
function visualizeBrainfuck(tapeSnapshots, code, x, y, cellSize) {
    tapeSnapshots.forEach((snapshot, index) => {
        const offsetY = y + index * (cellSize + 20 + 30);
        drawTape(snapshot.tape, x, offsetY, cellSize, snapshot.pointer);
        drawCode(code, x, offsetY + cellSize + 20, cellSize * 0.8, snapshot.codePointer); // Adjust y to draw code above the tape
    });
}

// Example usage with the provided Brainfuck program and visualization
const tapeSnapshots = interpretBrainfuck(code, 1000);
const frameCount = tapeSnapshots.length;
const cellSize = 20;
const tapeLength = 10;
const frameHeight = tapeLength * cellSize;
const frameWidth = cellSize + 20 + 40 + (cellSize * 0.8); // Additional space for the arrow and code
const spaceBetweenFrames = 20;

setDocDimensions(Math.max(tapeLength*20+20,code.length*24+10), frameCount*70+10);
visualizeBrainfuck(tapeSnapshots, code, 10, 10, 20);
