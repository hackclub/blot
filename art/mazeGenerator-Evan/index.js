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
//You can find the code at: https://github.com/ligerbot/blot/tree/main/art/mazeGenerator-Evan
var MazeDrawer = /** @class */ (function () {
    function MazeDrawer() {
    }
    MazeDrawer.draw = function (X, Y, width, hight, maze) {
        //Cleares entrence and exit
        maze.walls.rows[0][0].isWall = false;
        maze.walls.rows[maze.walls.rows.length - 1][maze.walls.rows[0].length - 1].isWall = false;
        //Turtle time!
        var turtle = createTurtle();
        turtle.jump([X, Y]);
        turtle.down();
        //basicly the width of a colum
        var rowSegmentLength = width / maze.grid.columCount;
        //basicly the hight of a row
        var columSegmentLength = hight / maze.grid.rowCount;
        //ensure most efficient path of plotter
        var directionToggle = true;
        var currentRowY = Y;
        for (var _i = 0, _a = maze.walls.rows.reverse(); _i < _a.length; _i++) {
            var row = _a[_i];
            if (directionToggle) {
                //left to right
                var nextX = X;
                turtle.jump([nextX, currentRowY]);
                for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                    var wall = row_1[_b];
                    nextX += rowSegmentLength;
                    if (wall.isWall) {
                        turtle.goTo([nextX, currentRowY]);
                    }
                    else {
                        turtle.jump([nextX, currentRowY]);
                    }
                }
                directionToggle = false;
            }
            else {
                //right to left
                var nextX = X + width;
                turtle.jump([nextX, currentRowY]);
                for (var _c = 0, _d = row.reverse(); _c < _d.length; _c++) {
                    var wall = _d[_c];
                    nextX -= rowSegmentLength;
                    if (wall.isWall) {
                        turtle.goTo([nextX, currentRowY]);
                    }
                    else {
                        turtle.jump([nextX, currentRowY]);
                    }
                }
                directionToggle = true;
            }
            currentRowY += columSegmentLength;
        }
        //Colums
        var currentColumX = X;
        directionToggle = false;
        for (var colum = 0; colum < maze.walls.colums[0].length; colum++) {
            if (directionToggle) {
                //left to right
                var nextY = Y;
                turtle.jump([currentColumX, nextY]);
                for (var row = 0; row < maze.walls.colums.length; row++) {
                    nextY += columSegmentLength;
                    if (maze.walls.colums[maze.walls.colums.length - 1 - row][colum].isWall) {
                        turtle.goTo([currentColumX, nextY]);
                    }
                    else {
                        turtle.jump([currentColumX, nextY]);
                    }
                }
                directionToggle = false;
            }
            else {
                //right to left
                var nextY = Y + hight;
                turtle.jump([currentColumX, nextY]);
                for (var row = maze.walls.colums.length - 1; row >= 0; row--) {
                    nextY -= columSegmentLength;
                    if (maze.walls.colums[maze.walls.colums.length - 1 - row][colum].isWall) {
                        turtle.goTo([currentColumX, nextY]);
                    }
                    else {
                        turtle.jump([currentColumX, nextY]);
                    }
                }
                directionToggle = true;
            }
            currentColumX += rowSegmentLength;
        }
        drawTurtles([turtle]);
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
            var randomNumber = randIntInRange(1,4);
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
var maze = new MazeImplementation(5, 5);
maze.generateMaze();
MazeDrawer.draw(5, 5, 100, 100, maze);
