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
//You can find the code at: https://github.com/evan-gan/blot/tree/main/art/mazeGenerator-Evan
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
//Pathing optimisation

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
drawLines(MazeDrawer.getPolylines(5, 5, 100, 100, maze))
