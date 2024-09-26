/*
@title: A Million Mazes
@author: akul
@snapshot: image(1).png
*/

var MazeDrawer = /** @class */ (function () {
    function MazeDrawer() {
    }
    MazeDrawer.getPolylines = function (Xoffset, Yoffset, width, hight, maze) {
        var mazePolylines = [];
        //Cleares entrence and exit
        maze.walls.rows[0][0].isWall = false;
        maze.walls.rows[maze.walls.rows.length - 1][maze.walls.rows[0].length - 1].isWall = false;
        var cellWidth = width / maze.grid.columCount;
        var cellHight = hight / maze.grid.rowCount;
        //Add rows
        for (var row = 0; row < maze.walls.rows.length; row++) {
            for (var col = 0; col < maze.walls.rows[0].length; col++) {
                if (maze.walls.rows[row][col].isWall) {
                    mazePolylines.push([[col * cellWidth + Xoffset, hight - (row * cellHight) + Yoffset], [col * cellWidth + cellWidth + Xoffset, hight - (row * cellHight) + Yoffset]]);
                }
            }
        }
        // console.log(JSON.parse(JSON.stringify(maze.walls.colums)))
        //Add colums
        for (var row = 0; row < maze.walls.colums.length; row++) {
            for (var col = 0; col < maze.walls.colums[0].length; col++) {
                if (maze.walls.colums[row][col].isWall) {
                    mazePolylines.push([[col * cellWidth + Xoffset, hight - (row * cellHight) + Yoffset], [col * cellWidth + Xoffset, hight - (row * cellHight + cellHight) + Yoffset]]);
                }
            }
        }
        return mazePolylines;
    };
    return MazeDrawer;
}());
var MazeImplementation = /** @class */ (function () {
    function MazeImplementation(rows, colums) {
        this.walls = new WallsImplementation(rows, colums);
        this.grid = new CellGridImplementation(rows, colums, this.walls);
    }
    MazeImplementation.prototype.generateMaze = function () {
        this.generateMazeHelper(0, 0);
    };
    MazeImplementation.prototype.generateMazeHelper = function (row, colum) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        this.grid.grid[row][colum].generated = true;
        while (((_b = (_a = this.grid.grid[row - 1]) === null || _a === void 0 ? void 0 : _a[colum]) === null || _b === void 0 ? void 0 : _b.generated) === false || ((_d = (_c = this.grid.grid[row + 1]) === null || _c === void 0 ? void 0 : _c[colum]) === null || _d === void 0 ? void 0 : _d.generated) === false || ((_f = (_e = this.grid.grid[row]) === null || _e === void 0 ? void 0 : _e[colum - 1]) === null || _f === void 0 ? void 0 : _f.generated) === false || ((_h = (_g = this.grid.grid[row]) === null || _g === void 0 ? void 0 : _g[colum + 1]) === null || _h === void 0 ? void 0 : _h.generated) === false) {
            //Math.floor(Math.random() * (max - min + 1) + min)
            var randomNumber = bt.randIntInRange(1, 4);
            //up,down,left,right
            if (randomNumber === 1 && ((_j = this.grid.grid[row - 1]) === null || _j === void 0 ? void 0 : _j[colum]) != undefined && this.grid.grid[row - 1][colum].generated === false) {
                this.grid.grid[row][colum].boderingWall.up.isWall = false;
                this.generateMazeHelper(row - 1, colum);
            }
            else if (randomNumber === 2 && ((_k = this.grid.grid[row + 1]) === null || _k === void 0 ? void 0 : _k[colum]) != undefined && this.grid.grid[row + 1][colum].generated === false) {
                this.grid.grid[row][colum].boderingWall.down.isWall = false;
                this.generateMazeHelper(row + 1, colum);
            }
            else if (randomNumber === 3 && ((_l = this.grid.grid[row]) === null || _l === void 0 ? void 0 : _l[colum - 1]) != undefined && this.grid.grid[row][colum - 1].generated === false) {
                this.grid.grid[row][colum].boderingWall.left.isWall = false;
                this.generateMazeHelper(row, colum - 1);
            }
            else if (randomNumber === 4 && ((_m = this.grid.grid[row]) === null || _m === void 0 ? void 0 : _m[colum + 1]) != undefined && this.grid.grid[row][colum + 1].generated === false) {
                this.grid.grid[row][colum].boderingWall.right.isWall = false;
                this.generateMazeHelper(row, colum + 1);
            }
        }
    };
    MazeImplementation.prototype.resetMaze = function () {
        var rows = this.grid.rowCount;
        var colums = this.grid.rowCount;
        this.walls = new WallsImplementation(rows, colums);
        this.grid = new CellGridImplementation(rows, colums, this.walls);
    };
    MazeImplementation.prototype.displayMaze = function () {
        var displayMazed = "Maze:\n";
        for (var row = 0; row < this.grid.rowCount; row++) {
            for (var colum = 0; colum < this.grid.columCount; colum++) {
                displayMazed += this.grid.grid[row][colum].boderingWall.up.isWall ? "+---" : "+   ";
            }
            displayMazed += "+\n";
            for (var colum = 0; colum < this.grid.columCount; colum++) {
                displayMazed += this.grid.grid[row][colum].boderingWall.left.isWall ? "|   " : "    ";
            }
            displayMazed += this.grid.grid[row][this.grid.columCount - 1].boderingWall.right.isWall ? "|\n" : " \n";
            if (this.grid.rowCount - 1 === row) {
                for (var colum = 0; colum < this.grid.columCount; colum++) {
                    displayMazed += this.grid.grid[row][colum].boderingWall.down.isWall ? "+---" : "+   ";
                }
                displayMazed += "+\n";
            }
        }
        console.log(displayMazed);
    };
    return MazeImplementation;
}());
var CellGridImplementation = /** @class */ (function () {
    function CellGridImplementation(rows, colums, walls) {
        var tempGrid = Array.from({ length: rows }, function () { return Array(colums).fill(undefined); });
        for (var row = 0; row < tempGrid.length; row++) {
            for (var colum = 0; colum < tempGrid[row].length; colum++) {
                tempGrid[row][colum] = new CellImplementation(row, colum, walls);
            }
        }
        this.grid = tempGrid;
        this.rowCount = rows;
        this.columCount = colums;
    }
    return CellGridImplementation;
}());
var CellImplementation = /** @class */ (function () {
    function CellImplementation(row, colum, walls) {
        this.row = row;
        this.colum = colum;
        this.boderingWall = new BoderingWallsImplementation(row, colum, walls);
        this.generated = false;
    }
    return CellImplementation;
}());
var BoderingWallsImplementation = /** @class */ (function () {
    function BoderingWallsImplementation(cellRow, cellColum, walls) {
        this.up = walls.rows[cellRow][cellColum];
        this.down = walls.rows[cellRow + 1][cellColum];
        this.left = walls.colums[cellRow][cellColum];
        this.right = walls.colums[cellRow][cellColum + 1];
    }
    return BoderingWallsImplementation;
}());
var WallsImplementation = /** @class */ (function () {
    //Assumes user input is in terms of cells, not walls
    function WallsImplementation(cellRows, cellColums) {
        this.colums = Array.from(Array(cellRows), function () { return Array.from(Array(cellColums + 1), function () { return ({ isWall: true }); }); });
        this.rows = Array.from(Array(cellRows + 1), function () { return Array.from(Array(cellColums), function () { return ({ isWall: true }); }); });
        this.rowCount = cellRows + 1;
        this.columCount = cellColums + 1;
    }
    return WallsImplementation;
}());
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
var pathingOptimizer = /** @class */ (function () {
    function pathingOptimizer() {
    }
    pathingOptimizer.optimizeLinesOLD = function (blotPolylines) {
        var _this = this;
        console.log(/*"Old lines: ", blotPolylines,*/ "\nOld number of jumps: ", blotPolylines.length);
        var lines = this.splitIntersections(this.toLines(blotPolylines));
        var newLines = [lines[0]];
        lines.splice(0, 1);
        var _loop_1 = function () {
            var currentLine = newLines[newLines.length - 1];
            var flatLines = lines.flat();
            //Part A:
            //CHECK IF SECOND POINT AT SAME LOCATION AS LINE HEAD
            var foundIndex = currentLine.findIndex(function (element) { return _this.pointsEqual(currentLine[1], element); }); //Old idea
            //Check if done, if so push, remove, and continue
            if (foundIndex > -1) {
                nextLineIndex = foundIndex % 2 == 0 ? foundIndex / 2 : (foundIndex - 1) / 2;
                nextLineFlipped = foundIndex % 2 == 1;
                newLines.push(nextLineFlipped ? this_1.flipLine(lines[nextLineIndex]) : lines[nextLineIndex]);
                lines.splice(nextLineIndex, 1);
                return "continue";
            }
            //Part B:
            //CHECK FOR NEXT CLOSEST LOCATION
            var closestPointIndex = this_1.getClosestPointIndex(currentLine[1], flatLines);
            nextLineIndex = closestPointIndex % 2 == 0 ? closestPointIndex / 2 : (closestPointIndex - 1) / 2;
            nextLineFlipped = closestPointIndex % 2 == 1;
            newLines.push(nextLineFlipped ? this_1.flipLine(lines[nextLineIndex]) : lines[nextLineIndex]);
            lines.splice(nextLineIndex, 1);
        };
        var this_1 = this, nextLineIndex, nextLineFlipped, nextLineIndex, nextLineFlipped;
        while (lines.length > 0) {
            _loop_1();
        }
        var newBlotPolylines = this.toBlotFormat(newLines);
        console.log(/*"New lines: ", newBlotPolylines,*/ "\nNew number of jumps: ", newBlotPolylines.length);
        return newBlotPolylines; //Reformats to blot format
    };
    pathingOptimizer.optimizeLines = function (blotPolylines) {
        var _this = this;
        console.log(/*"Old lines: ", blotPolylines,*/ "\nOld number of jumps: ", blotPolylines.length);
        var lines = this.splitIntersections(this.toLines(blotPolylines));
        var newLines = [lines[0]];
        lines.splice(0, 1);
        while (lines.length > 0) {
            console.log("Loop.\nCurrent new lines length: ", newLines.length);
            var currentLine = newLines[newLines.length - 1];
            //Part A:
            //CHECK IF SECOND POINT AT SAME LOCATION AS LINE HEAD
            var connectingLines = this.getShortestBranchOnTree(this.createTreeFromLine(currentLine, lines));
            console.log("Connecting line: ", connectingLines);
            if (connectingLines.length > 0) {
                console.log("Passed connecting lines");
                var _loop_2 = function (lineOnBranch) {
                    newLines.push(lineOnBranch);
                    var index = lines.findIndex(function (element) { return _this.linesEqual(element, lineOnBranch); });
                    console.log("Index in origonal: ", index, "Current lines: ", lines);
                    lines.splice(index, 1);
                };
                //If branch exists, remove from origonal array & append to new
                for (var _i = 0, connectingLines_1 = connectingLines; _i < connectingLines_1.length; _i++) {
                    var lineOnBranch = connectingLines_1[_i];
                    _loop_2(lineOnBranch);
                }
                continue; //Continue on to next loop, as shortest option was found
            }
            //Part B:
            //CHECK FOR NEXT CLOSEST LOCATION
            var flatLines = lines.flat();
            var closestPointIndex = this.getClosestPointIndex(currentLine[1], flatLines);
            var nextLineIndex = closestPointIndex % 2 == 0 ? closestPointIndex / 2 : (closestPointIndex - 1) / 2;
            var nextLineFlipped = closestPointIndex % 2 == 1;
            newLines.push(nextLineFlipped ? this.flipLine(lines[nextLineIndex]) : lines[nextLineIndex]);
            lines.splice(nextLineIndex, 1);
        }
        console.log("New lines: ", newLines);
        var newBlotPolylines = this.toBlotFormat(newLines);
        console.log("New lines: ", newLines, "\nNew number of jumps: ", newBlotPolylines.length);
        return newBlotPolylines; //Reformats to blot format
    };
    //Helper functions
    pathingOptimizer.createTreeFromLine = function (line, allLines, linesOnBranch, depth) {
        var _this = this;
        if (linesOnBranch === void 0) { linesOnBranch = new VisitedLineWraper; }
        if (depth === void 0) { depth = 0; }
        console.log("Creating tree...");
        var tree = new LineTreeNode(line);
        //MAX DEPTH ------------- SETTING:
        //Note, this will result in a slower computing time but may help certine drawings
        var MAX_DEPTH = 2;
        if (depth > 3) {
            console.log("Reached max depth, returning...");
            return tree;
        }
        var newLinesOnBranch = linesOnBranch.getCopy();
        newLinesOnBranch.add(line);
        // console.log("LINE: ",line)
        //Get all lines that 
        var connectingLines = allLines.filter(function (element) {
            // console.log("For the segment: ", element, ", ", ((this.pointsEqual(line[1], element[0]) || this.pointsEqual(line[1], element[1]))), " should be returned.\n(comparing aginst", line, ")");
            return ((_this.pointsEqual(line[1], element[0]) || _this.pointsEqual(line[1], element[1])));
        });
        // console.log("Connecting line/'s: ",connectingLines)
        for (var _i = 0, connectingLines_2 = connectingLines; _i < connectingLines_2.length; _i++) { //Also serves as an if statement, because at bottom 'connectingLines' will be empty
            var childLine = connectingLines_2[_i];
            //TODO: Check if newLinesOnBranch contiains current line.
            if (!this.linesEqual(line, childLine) && !newLinesOnBranch.contains(childLine)) {
                var childLineAdjusted = this.pointsEqual(line[1], childLine[0]) ? childLine : this.flipLine(childLine);
                //If this is not already on this branch,
                tree.addChild(this.createTreeFromLine(childLineAdjusted, allLines, newLinesOnBranch, depth + 1)); // Check if child line needs to be flipped
            }
        }
        console.log("Done creating tree!");
        return tree;
    };
    pathingOptimizer.getShortestBranchOnTree = function (tree) {
        var _this = this;
        var lines = tree.longestBranch().leafNode.getBranch().reverse()
            .map(function (element, index, array) {
            if (index - 1 >= 0) {
                return (_this.pointsEqual(array[index - 1][1], element[0]) ? element : _this.flipLine(element));
            }
            else {
                return null;
            }
        });
        lines.splice(0, 1);
        return lines;
    };
    pathingOptimizer.splitIntersections = function (lines) {
        var localLines = lines;
        while (this.overlapingLinesGone(localLines) == false) { //Don't finish untill all overlaps are gone
            for (var index1 = 0; index1 < localLines.length; index1++) {
                for (var index2 = 0; index2 < localLines.length; index2++) {
                    var line1 = lines[index1];
                    var line2 = lines[index2];
                    var overlap = this.intersectionPointOnLine(line1, line2); //If they are the same line, false will be returned
                    if (overlap /*Will be false if no overlap, otherwise will pass due to containing something*/) {
                        //Add new broken up lines
                        for (var _i = 0, _a = [line1, line2].flat(); _i < _a.length; _i++) {
                            var point = _a[_i];
                            //Prevent creation of zero length lines
                            if (JSON.stringify(overlap) !== JSON.stringify(point)) {
                                localLines.push([point, overlap]);
                            }
                        }
                        //Remove origonal lines from localLines. Must remove higher index first as not to shift indexes for second one
                        if (index1 > index2) {
                            localLines.splice(index1, 1);
                            localLines.splice(index2, 1);
                        }
                        else {
                            localLines.splice(index2, 1);
                            localLines.splice(index1, 1);
                        }
                    }
                }
            }
        }
        return localLines;
    };
    pathingOptimizer.overlapingLinesGone = function (lines) {
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            for (var _a = 0, lines_2 = lines; _a < lines_2.length; _a++) {
                var line2 = lines_2[_a];
                if (this.intersectionPointOnLine(line, line2)) {
                    return false;
                }
            }
        }
        return true;
    };
    pathingOptimizer.intersectionPointOnLine = function (line1, line2) {
        //Assumes line segments are fed in [[x,y],[x,y]]
        var A = { x: line1[0][0], y: line1[0][1] };
        var B = { x: line1[1][0], y: line1[1][1] };
        var C = { x: line2[0][0], y: line2[0][1] };
        var D = { x: line2[1][0], y: line2[1][1] };
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
            return false;
        }
        var x = (b2 * c1 - b1 * c2) / determinant;
        var y = (a1 * c2 - a2 * c1) / determinant;
        if (Math.min(A.x, B.x) <= x && x <= Math.max(A.x, B.x) && Math.min(A.y, B.y) <= x && x <= Math.max(A.y, B.y) //In range of line 1
            && Math.min(C.x, D.x) <= x && x <= Math.max(C.x, D.x) && Math.min(C.y, D.y) <= x && x <= Math.max(C.y, D.y) //In range of line 2
            /*Checks if endpoints are diffrent*/ && (JSON.stringify(line1[0]) !== JSON.stringify(line2[0]) && JSON.stringify(line1[0]) !== JSON.stringify(line2[1]) && JSON.stringify(line1[1]) !== JSON.stringify(line2[0]) && JSON.stringify(line1[1]) !== JSON.stringify(line2[1]))) {
            return [x, y];
        }
        else {
            return false;
        }
    };
    pathingOptimizer.toLines = function (blotPolylines) {
        var lines = [];
        for (var _i = 0, blotPolylines_1 = blotPolylines; _i < blotPolylines_1.length; _i++) {
            var line = blotPolylines_1[_i];
            for (var index = 0; index < line.length - 1; index++) {
                lines.push([line[index], line[index + 1]]);
            }
        }
        return lines;
    };
    pathingOptimizer.toBlotFormat = function (lines) {
        var blotPolylines = [lines[0]];
        for (var index = 1; index < lines.length; index++) {
            if (this.pointsEqual(lines[index - 1][1], lines[index][0])) {
                blotPolylines[blotPolylines.length - 1].push(lines[index][1]);
            }
            else {
                blotPolylines.push(lines[index]);
            }
        }
        return blotPolylines;
    };
    pathingOptimizer.getClosestPointIndex = function (target, pointArray) {
        var minDistance = Infinity;
        var closestPoint = null;
        var closestPointIndex = null;
        for (var index = 0; index < pointArray.length; index++) {
            var point = pointArray[index];
            var distanceToTarget = this.distance(target, point);
            if (distanceToTarget < minDistance) {
                minDistance = distanceToTarget;
                closestPoint = point;
                closestPointIndex = index;
            }
        }
        return closestPointIndex;
    };
    pathingOptimizer.lengthOfLine = function (line) {
        return this.distance(line[0], line[1]);
    };
    pathingOptimizer.distance = function (p1, p2) {
        return Math.sqrt(Math.pow((p1[0] - p2[0]), 2) + Math.pow((p1[1] - p2[1]), 2));
    };
    //Note: will flip line orientation
    pathingOptimizer.linesEqual = function (line1, line2) {
        return this.pointsEqual(line1[0], line2[0]) && this.pointsEqual(line1[1], line2[1]) || this.pointsEqual(line1[0], line2[1]) && this.pointsEqual(line1[1], line2[0]);
    };
    pathingOptimizer.pointsEqual = function (a, b) {
        // console.log("Comparing",a,b,"Should return: ",(a[0] == b[0] && a[1] == b[1]))
        var tolorence = 0.05;
        return (Math.abs(a[0] - b[0]) < tolorence && Math.abs(a[1] - b[1]) < tolorence);
    };
    pathingOptimizer.flipLine = function (line) {
        var a = line[0];
        var b = line[1];
        return [b, a];
    };
    return pathingOptimizer;
}());
var LineTreeNode = /** @class */ (function () {
    function LineTreeNode(value) {
        this.parent = null;
        this.children = [];
        this.line = value;
    }
    LineTreeNode.prototype.log = function () {
        console.log(this.printHelper());
    };
    LineTreeNode.prototype.printHelper = function () {
        return {
            line: this.line,
            children: this.children.map(function (element) { return (element.printHelper()); })
        };
    };
    LineTreeNode.prototype.addChild = function (child) {
        child.parent = this; // Set this node as the parent
        this.children.push(child); // Add the new child to the children array
    };
    LineTreeNode.prototype.removeChild = function (child) {
        var index = this.children.indexOf(child);
        if (index > -1) {
            child.parent = null; // Remove the parent reference
            this.children.splice(index, 1); // Remove the child from the children array
        }
    };
    LineTreeNode.prototype.longestBranch = function () {
        /*If bottom return an object containing 'this' & length. If not bottom, pick longest child & add
        self to the length value of the object and pass it up */
        if (this.children.length !== 0) {
            var lengthOfChildBranches = [];
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var lineNode = _a[_i];
                lengthOfChildBranches.push(lineNode.longestBranch());
            }
            lengthOfChildBranches.sort(function (a, b) { return b.cumilitiveLength - a.cumilitiveLength; }); //Sorts highest first
            return new LineTreeLeaf(lengthOfChildBranches[0].leafNode, lengthOfChildBranches[0].cumilitiveLength + pathingOptimizer.lengthOfLine(this.line));
        }
        else {
            return new LineTreeLeaf(this, pathingOptimizer.lengthOfLine(this.line));
        }
    };
    LineTreeNode.prototype.getBranch = function () {
        var lineSequence = [this.line];
        var currentParrent = this.parent;
        while (currentParrent != null) {
            lineSequence.push(currentParrent.line);
            console.log("Current line in get branch: ", currentParrent.line);
            currentParrent = currentParrent.parent;
        }
        return lineSequence;
    };
    return LineTreeNode;
}());
var LineTreeLeaf = /** @class */ (function () {
    function LineTreeLeaf(leafNode, cumilitiveLength) {
        this.leafNode = leafNode;
        this.cumilitiveLength = cumilitiveLength;
    }
    return LineTreeLeaf;
}());
var VisitedLineWraper = /** @class */ (function () {
    function VisitedLineWraper() {
        this.visitedLines = new Set();
    }
    VisitedLineWraper.prototype.add = function (line) {
        this.visitedLines.add(JSON.stringify(line));
    };
    VisitedLineWraper.prototype.contains = function (line) {
        return this.visitedLines.has(JSON.stringify(line)) || this.visitedLines.has(JSON.stringify(pathingOptimizer.flipLine(line)));
    };
    VisitedLineWraper.prototype.addStringifyed = function (line) {
        this.visitedLines.add(line);
    };
    VisitedLineWraper.prototype.getCopy = function () {
        var newVisitedLineWrapper = new VisitedLineWraper;
        for (var _i = 0, _a = Array.from(this.visitedLines.values()); _i < _a.length; _i++) {
            var line = _a[_i];
            newVisitedLineWrapper.addStringifyed(line);
        }
        return newVisitedLineWrapper;
    };
    return VisitedLineWraper;
}());

var width = 125;
var height = 125;
setDocDimensions(width, height);
var maze = new MazeImplementation(5, 5);
maze.generateMaze();
drawLines(pathingOptimizer.optimizeLines(MazeDrawer.getPolylines(5, 5, 100, 100, maze)));
