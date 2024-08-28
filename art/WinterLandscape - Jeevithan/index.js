/*
@title: Winter Landscape
@author: Jeevithan
@snapshot: Snapshot3
*/


const t = new bt.Turtle()

const width = 125;
const height = 125;

setDocDimensions(width, height);

// Draw the floor
const polyline = ([
  [[0, 20],
  [125, 20]]
]);

// Draw a tree

t.up();
t.goTo([100,20]);
t.down();
t.left(90)
t.forward(20);
t.right(180);

const s = 15;
for (let i = 0; i < 3; i++){
  t.left(45);
  t.forward(s-i-2);
  t.right(180);
  t.forward(s-i-2);
  t.left(90);
  t.forward(s-i-2);
  t.left(180);
  t.forward(s-i-2);
  t.right(135);
  t.forward(5);
}

t.up();
t.goTo([98,41]);
t.down();

for (let i = 0; i < 15; i = i+2){
  t.left(135);
  t.forward(10);

}


// Make the hill

const curve = bt.catmullRom([[0,46], [17,50], [40,41], [53, 28], [74,23],[80,20]]);

//Make the snowman

//c = 19,90
//r = 5
//dx = 3
//dy = 4

const ball1 = bt.catmullRom([[16,98], [19,99], [23,97], [24,94], [22,90], 
                            [19,89], [15,91], [14,94], [16,98]]);
bt.rotate([ball1], 20);

//c = 19, 62
//r = 13
//dx = 5
//dy = 12

const ball2 = bt.catmullRom([[19,75], [32,62], [19,49], 
                             [6,62], [19,75]]);
bt.rotate([ball2], 45)

//c = 19, 82
//r = 9
const ball3 = bt.catmullRom([[28,82], [19,73], [10,82], [19,91], [28,82]]);

bt.rotate([ball3], 45);

  // Buttons
t.up();
t.goTo([17.5,52.5]);
t.right(180);

for (let a = 0; a < 3; a++){
 for (let i = 0; i < 5; i++){
     t.down();
     t.forward(3);
    t.right(90);
  };

t.left(90);
t.up();
t.forward(5);

};
t.forward(1);
for (let a = 0; a < 2; a++){
   for (let i = 0; i < 5; i++){
     t.down();
     t.forward(3);
    t.right(90);
    
  };

t.left(90);
t.up()
t.forward(3)
}

  //Face
const eye1 = bt.catmullRom([[17,98], [18,97], [17,96], [16,97], [17,98]]);

const eye2 = bt.catmullRom([[22.5,96], [23.5,95], [22.5,94], [21.5,95], [22.5,96]]);

const smile = bt.catmullRom([[15,93], [19,91], [23,92]]);

const nose = [[17,93], [17,95], [21, 94], [17,93]]

  //Hat
t.up()
t.goTo([19.5, 99]);
t.down();

t.right(90);
t.forward(7.5);
t.left(90);
t.forward(5);
t.left(90);
t.forward(2.5);
t.right(90);
t.forward(10);
t.left(90);
t.forward(10);
t.left(90);
t.forward(10);
t.right(90);
t.forward(2.5);
t.left(90);
t.forward(5);
t.left(90);
t.forward(7.5);


// Snow


const num_of_flakes = bt.randIntInRange(5, 8)


for (let n = 0; n < (num_of_flakes + 1); n++){
  const length = bt.randIntInRange(3, 5);
  t.up();
  t.goTo([bt.randIntInRange(0, 125),bt.randIntInRange(40, 125)]);
  t.down();
  for (let i = 1; i < 13; i++){
    t.forward(length);
    t.left(180);
    t.forward(length);
    t.left(45*i);
  };
  
};


// Window
t.up();
t.goTo([9,42]);
t.down();
t.setAngle(360);
for (let i = 0; i < 9; i++){
 t.forward(7);
  t.right(45);
}
t.up();
t.right(70);
t.forward(4.94)
t.setAngle(180);
t.down()
for (let i = 0; i < 9; i++){
  t.forward(2.899);
  t.right(65);
  t.forward(4.94);
  t.right(180);
  t.forward(4.94);
  t.setAngle(180);
  t.left(45*(i+1));
  
}

// draw it
drawLines(polyline);
drawLines(t.lines());
drawLines([curve]);
drawLines([ball1]);
drawLines([ball2]);
drawLines([ball3]);
drawLines(t.lines());
drawLines([eye1]);
drawLines([eye2]);
drawLines([smile]);
drawLines([nose]);