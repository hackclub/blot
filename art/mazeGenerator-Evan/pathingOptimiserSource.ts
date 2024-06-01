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

//Here is some demo code on how to use it:

const width = 125;
const height = 125;
const lines = [[[25,99],[23,90]],[[20,35],[23,90]],[[20,35],[13,12]],[[27,67],[23,90]],[[27,67],[25,54]]]
// const tree = pathingOptimizer.createTreeFromLine([[25, 99],[23, 90]], lines)
// tree.log()
const optomisedLines = pathingOptimizer.optimizeLines(lines)
console.log(optomisedLines)

// @ts-ignore
setDocDimensions(width, height);
// @ts-ignore
drawLines(optomisedLines, { width: 3, stroke: "Green" })