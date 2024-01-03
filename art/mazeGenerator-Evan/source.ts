//The import and functions here are so you can have access to the turtle functions when porgraming, for the real thing delete them
import { Turtle } from "blot/virtual-gallery/drawing-functions/Turtle.js"
function createTurtle(): Turtle {
    return new Turtle
}

function drawTurtles(turtle: Turtle[]) { }

function randIntInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
//turtle stuff above^


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


class MazeDrawer {
    public static draw(X: number, Y: number, width: number, hight: number, maze: Maze) {
        //Cleares entrence and exit
        maze.walls.rows[0][0].isWall = false
        maze.walls.rows[maze.walls.rows.length - 1][maze.walls.rows[0].length - 1].isWall = false
        //Turtle time!
        let turtle = createTurtle()
        turtle.jump([X, Y])
        turtle.down()
        //basicly the width of a colum
        const rowSegmentLength = width / maze.grid.columCount
        //basicly the hight of a row
        const columSegmentLength = hight / maze.grid.rowCount

        //ensure most efficient path of plotter
        let directionToggle = true
        let currentRowY = Y
        for (let row of maze.walls.rows.reverse()) {
            if (directionToggle) {
                //left to right
                let nextX = X
                turtle.jump([nextX,currentRowY])
                for (let wall of row) {
                    nextX += rowSegmentLength
                    if (wall.isWall) {
                        turtle.goTo([nextX, currentRowY])
                    } else {
                        turtle.jump([nextX, currentRowY])
                    }
                }
                directionToggle = false
            } else {
                //right to left
                let nextX = X + width
                turtle.jump([nextX,currentRowY])
                for (let wall of row.reverse()) {
                    nextX -= rowSegmentLength
                    if (wall.isWall) {
                        turtle.goTo([nextX, currentRowY])
                    } else {
                        turtle.jump([nextX, currentRowY])
                    }
                }
                directionToggle = true
            }
            currentRowY += columSegmentLength
        }

        //Colums
        let currentColumX = X
        directionToggle = false
        for (let colum = 0; colum < maze.walls.colums[0].length; colum++) {
            if (directionToggle) {
                //left to right
                let nextY = Y
                turtle.jump([currentColumX, nextY])
                for (let row = 0; row < maze.walls.colums.length; row++) {
                    nextY += columSegmentLength
                    if (maze.walls.colums[maze.walls.colums.length - 1 - row][colum].isWall) {
                        turtle.goTo([currentColumX,nextY])
                    } else {
                        turtle.jump([currentColumX,nextY])
                    }
                }
                directionToggle = false
            } else {
                //right to left
                let nextY = Y + hight
                turtle.jump([currentColumX,nextY])
                for (let row = maze.walls.colums.length - 1; row >= 0; row--) {
                    nextY -= columSegmentLength
                    if (maze.walls.colums[maze.walls.colums.length - 1 - row][colum].isWall) {
                        turtle.goTo([currentColumX,nextY])
                    } else {
                        turtle.jump([currentColumX,nextY])
                    }
                }
                directionToggle = true
            }
            currentColumX += rowSegmentLength
        }

        drawTurtles([ turtle ])
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
            const randomNumber = randIntInRange(1,4)
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
let maze = new MazeImplementation(5, 5)
maze.generateMaze()
MazeDrawer.draw(5, 5, 100, 100, maze)
