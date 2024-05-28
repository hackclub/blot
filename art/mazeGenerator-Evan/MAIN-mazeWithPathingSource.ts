function drawLines(lines) { }
function setDocDimensions(width, height) { }
class bt {
    public static randIntInRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
}
// ^ Helper stuff above ^
//Delete before running on blot


//Code rough outline:
interface Maze {
    walls: Walls
    grid: CellGrid
    // constructor(rows: number, colums: number)

    generateMaze()

    resetMaze()
}

interface CellGrid {
    grid: Cell[][]
    rowCount: number
    columCount: number
    // constructor(rows:number,colums:number)
}

interface Cell {
    row: number
    colum: number
    boderingWall: boderingWalls
    generated: boolean
    // constructor(row:number,colum:number)
}

interface boderingWalls {
    up: WallState
    down: WallState
    left: WallState
    right: WallState
    // constructor(up:object,down:object,left:object,right:object)
}

interface Walls {
    colums: WallState[][]
    rows: WallState[][]

    // constructor(cellRows: number, cellColums: number)
}

interface WallState {
    isWall: boolean;
}
/*
 ______                       __                                           __                __     __                      
|      \                     |  \                                         |  \              |  \   |  \                     
 \▓▓▓▓▓▓______ ____   ______ | ▓▓ ______  ______ ____   ______  _______  _| ▓▓_    ______  _| ▓▓_   \▓▓ ______  _______  __ 
  | ▓▓ |      \    \ /      \| ▓▓/      \|      \    \ /      \|       \|   ▓▓ \  |      \|   ▓▓ \ |  \/      \|       \|  \
  | ▓▓ | ▓▓▓▓▓▓\▓▓▓▓\  ▓▓▓▓▓▓\ ▓▓  ▓▓▓▓▓▓\ ▓▓▓▓▓▓\▓▓▓▓\  ▓▓▓▓▓▓\ ▓▓▓▓▓▓▓\\▓▓▓▓▓▓   \▓▓▓▓▓▓\\▓▓▓▓▓▓ | ▓▓  ▓▓▓▓▓▓\ ▓▓▓▓▓▓▓\\▓▓
  | ▓▓ | ▓▓ | ▓▓ | ▓▓ ▓▓  | ▓▓ ▓▓ ▓▓    ▓▓ ▓▓ | ▓▓ | ▓▓ ▓▓    ▓▓ ▓▓  | ▓▓ | ▓▓ __ /      ▓▓ | ▓▓ __| ▓▓ ▓▓  | ▓▓ ▓▓  | ▓▓ _ 
 _| ▓▓_| ▓▓ | ▓▓ | ▓▓ ▓▓__/ ▓▓ ▓▓ ▓▓▓▓▓▓▓▓ ▓▓ | ▓▓ | ▓▓ ▓▓▓▓▓▓▓▓ ▓▓  | ▓▓ | ▓▓|  \  ▓▓▓▓▓▓▓ | ▓▓|  \ ▓▓ ▓▓__/ ▓▓ ▓▓  | ▓▓  \
|   ▓▓ \ ▓▓ | ▓▓ | ▓▓ ▓▓    ▓▓ ▓▓\▓▓     \ ▓▓ | ▓▓ | ▓▓\▓▓     \ ▓▓  | ▓▓  \▓▓  ▓▓\▓▓    ▓▓  \▓▓  ▓▓ ▓▓\▓▓    ▓▓ ▓▓  | ▓▓\▓▓
 \▓▓▓▓▓▓\▓▓  \▓▓  \▓▓ ▓▓▓▓▓▓▓ \▓▓ \▓▓▓▓▓▓▓\▓▓  \▓▓  \▓▓ \▓▓▓▓▓▓▓\▓▓   \▓▓   \▓▓▓▓  \▓▓▓▓▓▓▓   \▓▓▓▓ \▓▓ \▓▓▓▓▓▓ \▓▓   \▓▓   
                    | ▓▓                                                                                                    
                    | ▓▓                                                                                                    
                     \▓▓                                                                                                    
*/

/*
@title: mazeGenerator
@author: evanGan
@snapshot: the name of the snapshot file you want in the gallery
*/

//+------------------------------------+
//| SEE BOTTOM FOR RUN CODE & SETTINGS |
//+------------------------------------+
/*
                   .
                     .
                 . ;.
                  .;
                   ;;.
                 ;.;;
                 ;;;;.
                 ;;;;;
                 ;;;;;
                 ;;;;;
                 ;;;;;
                 ;;;;;
               ..;;;;;..
                ':::::'
                  ':`
*/

//THIS IS A BUILT SOURCE! It's advised you look at the original code before it was transpiled
//You can find the code at: https://github.com/hackclub/blot/tree/main/art/mazeGenerator-Evan
class MazeDrawer {
    public static getPolylines(Xoffset: number, Yoffset: number, width: number, hight: number, maze: Maze) {
        let mazePolylines = []
        //Cleares entrence and exit
        maze.walls.rows[0][0].isWall = false
        maze.walls.rows[maze.walls.rows.length - 1][maze.walls.rows[0].length - 1].isWall = false
        
        const cellWidth = width/maze.grid.columCount
        const cellHight = hight/maze.grid.rowCount

        //Add rows
        for (let row = 0; row < maze.walls.rows.length; row++) { 
            for (let col = 0; col < maze.walls.rows[0].length; col++) { 
                if (maze.walls.rows[row][col].isWall) { 
                    mazePolylines.push([[col*cellWidth+Xoffset,hight-(row*cellHight)+Yoffset],[col*cellWidth+cellWidth+Xoffset,hight-(row*cellHight)+Yoffset]])
                }
            }
        }
        // console.log(JSON.parse(JSON.stringify(maze.walls.colums)))
        //Add colums
        for (let row = 0; row < maze.walls.colums.length; row++) { 
            for (let col = 0; col < maze.walls.colums[0].length; col++) { 
                if (maze.walls.colums[row][col].isWall) { 
                    mazePolylines.push([[col*cellWidth+Xoffset,hight-(row*cellHight)+Yoffset],[col*cellWidth+Xoffset,hight-(row*cellHight+cellHight)+Yoffset]])
                }
            }
        }

        return mazePolylines
    }
}

class MazeImplementation implements Maze {
    walls: Walls
    grid: CellGrid
    constructor(rows: number, colums: number) {
        this.walls = new WallsImplementation(rows, colums)
        this.grid = new CellGridImplementation(rows, colums, this.walls)
    }

    generateMaze() {
        this.generateMazeHelper(0, 0)
    }

    private generateMazeHelper(row: number, colum: number) {
        this.grid.grid[row][colum].generated = true
        while (this.grid.grid[row - 1]?.[colum]?.generated === false || this.grid.grid[row + 1]?.[colum]?.generated === false || this.grid.grid[row]?.[colum - 1]?.generated === false || this.grid.grid[row]?.[colum + 1]?.generated === false) {
            //Math.floor(Math.random() * (max - min + 1) + min)
            const randomNumber = bt.randIntInRange(1,4)
            //up,down,left,right
            if (randomNumber === 1 && this.grid.grid[row - 1]?.[colum] != undefined && this.grid.grid[row - 1][colum].generated === false) {
                this.grid.grid[row][colum].boderingWall.up.isWall = false
                this.generateMazeHelper(row - 1, colum)
            } else if (randomNumber === 2 && this.grid.grid[row + 1]?.[colum] != undefined && this.grid.grid[row + 1][colum].generated === false) {
                this.grid.grid[row][colum].boderingWall.down.isWall = false
                this.generateMazeHelper(row + 1, colum)
            } else if (randomNumber === 3 && this.grid.grid[row]?.[colum - 1] != undefined && this.grid.grid[row][colum - 1].generated === false) {
                this.grid.grid[row][colum].boderingWall.left.isWall = false
                this.generateMazeHelper(row, colum - 1)
            } else if (randomNumber === 4 && this.grid.grid[row]?.[colum + 1] != undefined && this.grid.grid[row][colum + 1].generated === false) {
                this.grid.grid[row][colum].boderingWall.right.isWall = false
                this.generateMazeHelper(row, colum + 1)
            }
        }
    }

    resetMaze() {
        const rows = this.grid.rowCount
        const colums = this.grid.rowCount
        this.walls = new WallsImplementation(rows, colums)
        this.grid = new CellGridImplementation(rows, colums, this.walls)
    }

    displayMaze() {
        let displayMazed = "Maze:\n";
        for (let row = 0; row < this.grid.rowCount; row++) {
            for (let colum = 0; colum < this.grid.columCount; colum++) {
                displayMazed += this.grid.grid[row][colum].boderingWall.up.isWall ? "+---" : "+   ";
            }
            displayMazed += "+\n";

            for (let colum = 0; colum < this.grid.columCount; colum++) {
                displayMazed += this.grid.grid[row][colum].boderingWall.left.isWall ? "|   " : "    ";
            }
            displayMazed += this.grid.grid[row][this.grid.columCount - 1].boderingWall.right.isWall ? "|\n" : " \n"

            if (this.grid.rowCount - 1 === row) {
                for (let colum = 0; colum < this.grid.columCount; colum++) {
                    displayMazed += this.grid.grid[row][colum].boderingWall.down.isWall ? "+---" : "+   ";
                }
                displayMazed += "+\n";
            }
        }
        console.log(displayMazed);
    }
}

class CellGridImplementation implements CellGrid {
    grid: Cell[][]
    rowCount: number
    columCount: number
    constructor(rows: number, colums: number, walls: Walls) {
        let tempGrid: any[][] = Array.from({ length: rows }, () => Array(colums).fill(undefined));
        for (let row = 0; row < tempGrid.length; row++) {
            for (let colum = 0; colum < tempGrid[row].length; colum++) {
                tempGrid[row][colum] = new CellImplementation(row, colum, walls)
            }
        }
        this.grid = tempGrid
        this.rowCount = rows
        this.columCount = colums
    }
}

class CellImplementation implements Cell {
    row: number
    colum: number
    boderingWall: boderingWalls
    generated: boolean
    constructor(row: number, colum: number, walls: Walls) {
        this.row = row
        this.colum = colum
        this.boderingWall = new BoderingWallsImplementation(row, colum, walls)
        this.generated = false
    }
}

class BoderingWallsImplementation implements boderingWalls {
    up: WallState
    down: WallState
    left: WallState
    right: WallState
    constructor(cellRow: number, cellColum: number, walls: Walls) {
        this.up = walls.rows[cellRow][cellColum]
        this.down = walls.rows[cellRow + 1][cellColum]
        this.left = walls.colums[cellRow][cellColum]
        this.right = walls.colums[cellRow][cellColum + 1]
    }
}

class WallsImplementation implements Walls {
    colums: WallState[][]
    rows: WallState[][]
    //number of rows and colums of walls
    rowCount: number
    columCount: number

    //Assumes user input is in terms of cells, not walls
    constructor(cellRows: number, cellColums: number) {
        this.colums = Array.from(Array(cellRows), () => Array.from(Array(cellColums + 1), () => ({ isWall: true })));
        this.rows = Array.from(Array(cellRows + 1), () => Array.from(Array(cellColums), () => ({ isWall: true })));
        this.rowCount = cellRows + 1
        this.columCount = cellColums + 1
    }
}

//Optimization code:
//Just put it around the drawing EX. drawLines(pathingOptimizer.optimizeLines(<Your wacky line storage name>));

/*
Pre-Processing:
Break lines at intersections

New idea algorithem (maze gen-esk):
A. Find end segment closest to current pos to start from
B. Compute all possoble paths from there
    1. Recursive function that takes in current path, checks if next option is circling back
C. Pick longest path & write to varable
D. Repeat until no more lines left

Post-Processing:
Join together back into blot lines
*/
class pathingOptimizer {
    static optimizeLinesOLD(blotPolylines): number[][][] {
        console.log(/*"Old lines: ", blotPolylines,*/"\nOld number of jumps: ", blotPolylines.length)
        var lines: number[][][] = this.splitIntersections(this.toLines(blotPolylines))
        var newLines: number[][][] = [lines[0]]
        lines.splice(0, 1)
        while (lines.length > 0) {
            const currentLine = newLines[newLines.length - 1]
            const flatLines = lines.flat()

            //Part A:
            //CHECK IF SECOND POINT AT SAME LOCATION AS LINE HEAD
            const foundIndex = currentLine.findIndex((element) => this.pointsEqual(currentLine[1], element)) //Old idea

            //Check if done, if so push, remove, and continue
            if (foundIndex > -1) {
                var nextLineIndex = foundIndex % 2 == 0 ? foundIndex / 2 : (foundIndex - 1) / 2
                var nextLineFlipped = foundIndex % 2 == 1
                newLines.push(nextLineFlipped ? this.flipLine(lines[nextLineIndex]) : lines[nextLineIndex])
                lines.splice(nextLineIndex, 1)
                continue //Continue on to next loop, as shortest option was found
            }


            //Part B:
            //CHECK FOR NEXT CLOSEST LOCATION
            const closestPointIndex = this.getClosestPointIndex(currentLine[1], flatLines)
            var nextLineIndex = closestPointIndex % 2 == 0 ? closestPointIndex / 2 : (closestPointIndex - 1) / 2
            var nextLineFlipped = closestPointIndex % 2 == 1
            newLines.push(nextLineFlipped ? this.flipLine(lines[nextLineIndex]) : lines[nextLineIndex])
            lines.splice(nextLineIndex, 1)

        }
        const newBlotPolylines = this.toBlotFormat(newLines)
        console.log(/*"New lines: ", newBlotPolylines,*/ "\nNew number of jumps: ", newBlotPolylines.length)
        return newBlotPolylines //Reformats to blot format
    }

    static optimizeLines(blotPolylines): number[][][] {
        console.log(/*"Old lines: ", blotPolylines,*/"\nOld number of jumps: ", blotPolylines.length)
        var lines: number[][][] = this.splitIntersections(this.toLines(blotPolylines))
        var newLines: number[][][] = [lines[0]]
        lines.splice(0, 1)
        while (lines.length > 0) {
            console.log("Loop.\nCurrent new lines length: ",newLines.length)
            const currentLine = newLines[newLines.length - 1]

            //Part A:
            //CHECK IF SECOND POINT AT SAME LOCATION AS LINE HEAD
            const connectingLines:number[][][] = this.getShortestBranchOnTree(this.createTreeFromLine(currentLine, lines))
            console.log("Connecting line: ",connectingLines)
            if (connectingLines.length > 0) {
                console.log("Passed connecting lines")
                //If branch exists, remove from origonal array & append to new
                for (const lineOnBranch of connectingLines) {
                    newLines.push(lineOnBranch)
                    const index = lines.findIndex((element) => this.linesEqual(element, lineOnBranch))
                    console.log("Index in origonal: ", index,"Current lines: ",lines)
                    lines.splice(index, 1)
                }
                continue //Continue on to next loop, as shortest option was found
            }

            //Part B:
            //CHECK FOR NEXT CLOSEST LOCATION
            const flatLines = lines.flat()
            const closestPointIndex = this.getClosestPointIndex(currentLine[1], flatLines)
            var nextLineIndex = closestPointIndex % 2 == 0 ? closestPointIndex / 2 : (closestPointIndex - 1) / 2
            var nextLineFlipped = closestPointIndex % 2 == 1
            newLines.push(nextLineFlipped ? this.flipLine(lines[nextLineIndex]) : lines[nextLineIndex])
            lines.splice(nextLineIndex, 1)

        }
        console.log("New lines: ", newLines)
        const newBlotPolylines = this.toBlotFormat(newLines)

        console.log("New lines: ", newLines, "\nNew number of jumps: ", newBlotPolylines.length)
        return newBlotPolylines //Reformats to blot format
    }

    //Helper functions
    static createTreeFromLine(line: number[][], allLines: number[][][], linesOnBranch:VisitedLineWraper = new VisitedLineWraper, depth:number = 0): LineTreeNode {
        console.log("Creating tree...")
        var tree: LineTreeNode = new LineTreeNode(line)
        //MAX DEPTH ------------- SETTING:
        //Note, this will result in a slower computing time but may help certine drawings
        const MAX_DEPTH: number = 2
        if (depth > 3) { 
            console.log("Reached max depth, returning...")
            return tree
        }
        const newLinesOnBranch: VisitedLineWraper = linesOnBranch.getCopy()
        newLinesOnBranch.add(line)
        // console.log("LINE: ",line)
        //Get all lines that 
        const connectingLines: number[][][] = allLines.filter((element) => {
            // console.log("For the segment: ", element, ", ", ((this.pointsEqual(line[1], element[0]) || this.pointsEqual(line[1], element[1]))), " should be returned.\n(comparing aginst", line, ")");
            return ((this.pointsEqual(line[1], element[0]) || this.pointsEqual(line[1], element[1])))
        })
        // console.log("Connecting line/'s: ",connectingLines)
        for (const childLine of connectingLines) {//Also serves as an if statement, because at bottom 'connectingLines' will be empty
            //TODO: Check if newLinesOnBranch contiains current line.
            if (!this.linesEqual(line, childLine) && !newLinesOnBranch.contains(childLine)) {
                const childLineAdjusted = this.pointsEqual(line[1], childLine[0]) ? childLine : this.flipLine(childLine)
                //If this is not already on this branch,
                tree.addChild(this.createTreeFromLine(childLineAdjusted, allLines, newLinesOnBranch, depth + 1)) // Check if child line needs to be flipped
            }
        }
        console.log("Done creating tree!")
        return tree
    }

    static getShortestBranchOnTree(tree:LineTreeNode):number[][][] { //Note, excludes head segment
        var lines: number[][][] = tree.longestBranch().leafNode.getBranch().reverse()
            .map((element, index, array) => {
            if (index - 1 >= 0) {
                return (this.pointsEqual(array[index - 1][1],element[0]) ? element : this.flipLine(element))
            } else {return null}
        })
        lines.splice(0, 1)
        return lines
    }

    private static splitIntersections(lines: number[][][]) {
        var localLines = lines
        while (this.overlapingLinesGone(localLines) == false) { //Don't finish untill all overlaps are gone
            for (var index1 = 0; index1 < localLines.length; index1++) {
                for (var index2 = 0; index2 < localLines.length; index2++) {
                    const line1 = lines[index1]
                    const line2 = lines[index2]
                    const overlap = this.intersectionPointOnLine(line1, line2) //If they are the same line, false will be returned
                    if (overlap/*Will be false if no overlap, otherwise will pass due to containing something*/) {
                        //Add new broken up lines
                        for (const point of [line1, line2].flat()) {
                            //Prevent creation of zero length lines
                            if (JSON.stringify(overlap) !== JSON.stringify(point)) {
                                localLines.push([point, overlap])
                            }
                        }
                        //Remove origonal lines from localLines. Must remove higher index first as not to shift indexes for second one
                        if (index1 > index2) {
                            localLines.splice(index1, 1)
                            localLines.splice(index2, 1)
                        } else {
                            localLines.splice(index2, 1)
                            localLines.splice(index1, 1)
                        }
                    }
                }
            }
        }
        return localLines
    }

    private static overlapingLinesGone(lines: number[][][]): boolean {
        for (const line of lines) {
            for (const line2 of lines) {
                if (this.intersectionPointOnLine(line, line2)) {
                    return false
                }
            }
        }
        return true
    }

    private static intersectionPointOnLine(line1: number[][], line2: number[][]) {
        //Assumes line segments are fed in [[x,y],[x,y]]
        const A = { x: line1[0][0], y: line1[0][1] }
        const B = { x: line1[1][0], y: line1[1][1] }
        const C = { x: line2[0][0], y: line2[0][1] }
        const D = { x: line2[1][0], y: line2[1][1] }
        // Line AB represented as a1x + b1y = c1
        var a1 = B.y - A.y;
        var b1 = A.x - B.x;
        var c1 = a1 * (A.x) + b1 * (A.y);

        // Line CD represented as a2x + b2y = c2
        var a2 = D.y - C.y;
        var b2 = C.x - D.x;
        var c2 = a2 * (C.x) + b2 * (C.y);

        var determinant = a1 * b2 - a2 * b1;

        if (determinant == 0) {
            // The lines are parallel. This is simplified
            return false
        }
        var x = (b2 * c1 - b1 * c2) / determinant;
        var y = (a1 * c2 - a2 * c1) / determinant;
        if (Math.min(A.x, B.x) <= x && x <= Math.max(A.x, B.x) && Math.min(A.y, B.y) <= x && x <= Math.max(A.y, B.y) //In range of line 1
            && Math.min(C.x, D.x) <= x && x <= Math.max(C.x, D.x) && Math.min(C.y, D.y) <= x && x <= Math.max(C.y, D.y) //In range of line 2
                /*Checks if endpoints are diffrent*/ && (JSON.stringify(line1[0]) !== JSON.stringify(line2[0]) && JSON.stringify(line1[0]) !== JSON.stringify(line2[1]) && JSON.stringify(line1[1]) !== JSON.stringify(line2[0]) && JSON.stringify(line1[1]) !== JSON.stringify(line2[1]))) {
            return [x, y];
        } else {
            return false
        }
    }

    private static toLines(blotPolylines): number[][][] {
        var lines = []
        for (var line of blotPolylines) {
            for (var index = 0; index < line.length - 1; index++) {
                lines.push([line[index], line[index + 1]])
            }
        }
        return lines
    }

    private static toBlotFormat(lines: number[][][]): number[][][] {
        var blotPolylines = [lines[0]]
        for (var index = 1; index < lines.length; index++) {
            if (this.pointsEqual(lines[index - 1][1], lines[index][0])) {
                blotPolylines[blotPolylines.length - 1].push(lines[index][1])
            } else {
                blotPolylines.push(lines[index])
            }
        }
        return blotPolylines
    }

    private static getClosestPointIndex(target: number[], pointArray: number[][]): number {
        let minDistance = Infinity;
        let closestPoint = null;
        let closestPointIndex = null;
        for (var index = 0; index < pointArray.length; index++) {
            const point = pointArray[index]
            let distanceToTarget = this.distance(target, point);
            if (distanceToTarget < minDistance) {
                minDistance = distanceToTarget;
                closestPoint = point;
                closestPointIndex = index;
            }
        }
        return closestPointIndex;
    }

    static lengthOfLine(line: number[][]): number {
        return this.distance(line[0], line[1])
    }

    private static distance(p1: number[], p2: number[]): number {
        return Math.sqrt((p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2);
    }

    //Note: will flip line orientation
    private static linesEqual(line1:number[][],line2:number[][]) { 
        return this.pointsEqual(line1[0],line2[0]) && this.pointsEqual(line1[1],line2[1]) || this.pointsEqual(line1[0],line2[1]) && this.pointsEqual(line1[1],line2[0])
    }

    private static pointsEqual(a: number[], b: number[]): boolean {
        // console.log("Comparing",a,b,"Should return: ",(a[0] == b[0] && a[1] == b[1]))
        const tolorence = 0.05
        return (Math.abs(a[0] - b[0]) < tolorence && Math.abs(a[1] - b[1]) < tolorence)
    }

    static flipLine(line: number[][]): number[][] {
        const a = line[0]
        const b = line[1]
        return [b, a]
    }
}

class LineTreeNode {
    line: [][]
    parent: LineTreeNode | null = null
    children: LineTreeNode[] = [];

    constructor(value) {
        this.line = value;
    }

    log() { 
        console.log(this.printHelper())
    }

    private printHelper() {
        return { 
            line: this.line,
            children: this.children.map((element) => (element.printHelper()))
        }
    }


    addChild(child: LineTreeNode): void {
        child.parent = this; // Set this node as the parent
        this.children.push(child); // Add the new child to the children array
    }

    removeChild(child: LineTreeNode): void {
        const index = this.children.indexOf(child);
        if (index > -1) {
            child.parent = null; // Remove the parent reference
            this.children.splice(index, 1); // Remove the child from the children array
        }
    }

    longestBranch(): LineTreeLeaf {
        /*If bottom return an object containing 'this' & length. If not bottom, pick longest child & add 
        self to the length value of the object and pass it up */
        if (this.children.length !== 0) {
            var lengthOfChildBranches: LineTreeLeaf[] = []
            for (const lineNode of this.children) {
                lengthOfChildBranches.push(lineNode.longestBranch())
            }
            lengthOfChildBranches.sort((a, b) => b.cumilitiveLength - a.cumilitiveLength) //Sorts highest first
            return new LineTreeLeaf(lengthOfChildBranches[0].leafNode, lengthOfChildBranches[0].cumilitiveLength + pathingOptimizer.lengthOfLine(this.line))
        } else {
            return new LineTreeLeaf(this, pathingOptimizer.lengthOfLine(this.line))
        }
    }

    getBranch(): number[][][] {
        var lineSequence = [this.line]
        var currentParrent = this.parent
        while (currentParrent != null) {
            lineSequence.push(currentParrent.line)
            console.log("Current line in get branch: ",currentParrent.line)
            currentParrent = currentParrent.parent
        }
        return lineSequence
    }
}

class LineTreeLeaf {
    leafNode: LineTreeNode
    cumilitiveLength: number

    constructor(leafNode: LineTreeNode, cumilitiveLength: number) {
        this.leafNode = leafNode;
        this.cumilitiveLength = cumilitiveLength
    }
}

class VisitedLineWraper { 
    visitedLines = new Set<string>();

    add(line:number[][]) { 
        this.visitedLines.add(JSON.stringify(line))
    }

    contains(line: number[][]):boolean { 
        return this.visitedLines.has(JSON.stringify(line)) || this.visitedLines.has(JSON.stringify(pathingOptimizer.flipLine(line)))
    }

    private addStringifyed(line:string) { 
        this.visitedLines.add(line)
    }

    getCopy(): VisitedLineWraper { 
        var newVisitedLineWrapper = new VisitedLineWraper
        for (const line of Array.from(this.visitedLines.values())) {
            newVisitedLineWrapper.addStringifyed(line)
        }
        return newVisitedLineWrapper
    }
}

/*
 __       __                                 _______                                                  
|  \     /  \                               |       \                                                 
| ▓▓\   /  ▓▓ ______  ________  ______      | ▓▓▓▓▓▓▓\__    __ _______  _______   ______   ______  __ 
| ▓▓▓\ /  ▓▓▓|      \|        \/      \     | ▓▓__| ▓▓  \  |  \       \|       \ /      \ /      \|  \
| ▓▓▓▓\  ▓▓▓▓ \▓▓▓▓▓▓\\▓▓▓▓▓▓▓▓  ▓▓▓▓▓▓\    | ▓▓    ▓▓ ▓▓  | ▓▓ ▓▓▓▓▓▓▓\ ▓▓▓▓▓▓▓\  ▓▓▓▓▓▓\  ▓▓▓▓▓▓\\▓▓
| ▓▓\▓▓ ▓▓ ▓▓/      ▓▓ /    ▓▓| ▓▓    ▓▓    | ▓▓▓▓▓▓▓\ ▓▓  | ▓▓ ▓▓  | ▓▓ ▓▓  | ▓▓ ▓▓    ▓▓ ▓▓   \▓▓ _ 
| ▓▓ \▓▓▓| ▓▓  ▓▓▓▓▓▓▓/  ▓▓▓▓_| ▓▓▓▓▓▓▓▓    | ▓▓  | ▓▓ ▓▓__/ ▓▓ ▓▓  | ▓▓ ▓▓  | ▓▓ ▓▓▓▓▓▓▓▓ ▓▓     |  \
| ▓▓  \▓ | ▓▓\▓▓    ▓▓  ▓▓    \\▓▓     \    | ▓▓  | ▓▓\▓▓    ▓▓ ▓▓  | ▓▓ ▓▓  | ▓▓\▓▓     \ ▓▓      \▓▓
 \▓▓      \▓▓ \▓▓▓▓▓▓▓\▓▓▓▓▓▓▓▓ \▓▓▓▓▓▓▓     \▓▓   \▓▓ \▓▓▓▓▓▓ \▓▓   \▓▓\▓▓   \▓▓ \▓▓▓▓▓▓▓\▓▓         
*/
//Please exuse the lack of documentation
//To generate a maze you need to make a new instance of MazeImplementation and then run the generateMaze(rows,colums) method on it.
//Then use MazeDrawer.draw(startX, startY, widthInMM, hightInMM, mazeInstance)

//Below is an example I made that you can play around with
const width = 125
const height = 125
setDocDimensions(width, height);
let maze = new MazeImplementation(5, 5)
maze.generateMaze()
drawLines(pathingOptimizer.optimizeLines(MazeDrawer.getPolylines(5, 5, 100, 100, maze)))
