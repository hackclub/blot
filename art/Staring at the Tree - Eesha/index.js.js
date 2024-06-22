/*
@title: Staring at the Tree
@author: Eesha V
@snapshot: screenshot1.png
*/


const width = 200;
const height = 200;


let randomno = bt.randIntInRange(1, 100);
setDocDimensions(width, height);

const finalLines = [];

const trunk1 = [
  bt.nurbs([
    [randomno, 100],
    [randomno * 0.45, height * 0.3],
    [randomno * 0.55, height * 0.2],
    [randomno / 2, 0]
  ])
  
];

bt.join(finalLines, trunk1);

const ayyy = randomno+50

const trunk2 = [
  bt.nurbs([
    [ayyy, 100],
    [ayyy * 0.45, height * 0.3],
    [ayyy * 0.55, height * 0.2],
    [ayyy / 2, 0]
  ])
  
];

bt.join(finalLines, trunk2);
  


const top = [
  bt.catmullRom([
    [0, 200],
    [randomno, height/2],
    [ayyy, height/2],
    [150, 150],
    [200, 200]
  ])
  
];

bt.join(finalLines, top);

const person = new bt.Turtle();
person.up();
person.goTo([150, 0]); // Starting position for the stick figure

const x = bt.randIntInRange(1, 30);

person.down();
person.goTo([165, x]);
person.goTo([170, 0]);
person.goTo([165, x]);
person.goTo([165, 2*x]);
person.goTo([150, 3*x/2]);
person.goTo([165, 2*x]);
person.goTo([170, 3*x/2]);
person.goTo([165, 2*x]);
person.goTo([165, 8/3*x]);
person.arc(360, x/2);


const path = person.path; 
bt.join(finalLines, path);


// Draw the final tree and person
drawLines(finalLines);