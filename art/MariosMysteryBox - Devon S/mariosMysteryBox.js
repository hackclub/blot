/*
@title: mysteryBox
@author: Devon S.
@snapshot: Mario's Mystery Box
*/


const width = 16;
const height = 16;

setDocDimensions(width, height);

const t = new bt.Turtle();


//randomizing the not filled box design
const x = bt.randInRange(.25, .5);
const y = 1-1.41421356237*x;
const z = bt.randInRange(.4, .6);
const w = 1-z;
const side_length = 0.70710678118

let spot = [
  
  [0, 2],[0, 3],[0, 4],[0, 5],[0, 6],[0, 7],[0, 8],[0, 9],[0, 10],[0,11],[0,12],[0,13],[0,14],[0,15],
  [1,16],[2,16],[3,16],[4,16],[5,16],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],

  [4, 10],[4, 11],[4, 12],[5, 10],[5, 11],[5, 12],[5,13],
  [6, 13], [7, 13], [8, 13], [9, 13], 
  [9, 9],[9,10],[9, 11],[9, 12],[10, 9],[10,10],[10, 11],[10, 12],
  [7, 4], [7, 5],  [7, 7], [7, 8], 
  [8, 4], [8, 5],  [8, 7], [8, 8], [8, 9],
  ]

let dot = [

  [0, 16], [15, 16], [15, 15], [15, 14], [15, 13], [15, 12], [15, 11], [15, 10], [15, 9], [15, 8], [15, 7], [15, 6], [15, 5], [15, 4], [15, 3], [15, 2],
  [0,1],[1, 1],[2, 1],[3, 1],[4, 1],[5, 1],[6, 1],[7, 1],[8, 1],[9, 1],[10,1],[11,1],[12,1],[13, 1],[14,1],[15,1],

  [2, 14], [13, 14], [2, 3], [13, 3], 
  [8, 3], [9, 3], [9, 4],
  [8, 6], [9, 6], [9, 7], [9, 8], [10, 8], [11, 8], [11, 9], [11, 10], [11, 11],
  [5, 9], [6, 9], [6, 10], [6, 11], [6, 12], [7, 12], [8, 12],
  
  ]






function trace(value) {


  t.jump(value)
  {
//Draw the box
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
    
//Randomized design within the box
t.right(45)
t.forward(x)
t.left(45)
t.forward(y)
t.left(45)
t.forward(x)
t.right(135)
t.forward(z)
t.right(90)
t.forward(1)
t.left(90)
t.forward(w)
t.left(135)
t.forward(x)
t.right(45)
t.forward(y)
t.right(45)
t.forward(x)
t.left(45)

  }
}


function complete(entry) {


  t.jump(entry)
  {
//Draw the box
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
t.right(90)
t.forward(1)
    
    //Draw the Fill
t.right(180)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1) 
t.left(90)
t.forward(0.05)
t.left(90)
t.forward(1)
t.right(90)
t.forward(0.05)
t.right(90)
t.forward(1)
    
//Fill the box

  }
}

dot.forEach(complete);
spot.forEach(trace);
drawLines(t.lines());