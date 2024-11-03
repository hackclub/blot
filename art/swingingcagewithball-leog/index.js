/*
@title: swinging cage with ball
@author: Leo G
@snapshot: snapshot3.png
*/

const sf=0.1
const drawer = new bt.Turtle()

drawer.up()
drawer.goTo([614*sf,320*sf])
drawer.down()
for (let i = 0; i < 360; i++) {
  drawer.left(1)
  drawer.forward(1*sf)
}


const width = 1115*sf;
const height = 823*sf;

setDocDimensions(width, height);

// store final lines here
const finalLines = [];

// create a polyline
const polyline = [
  
  
  [32*sf, 743*sf],
  [30*sf, 90*sf],
  [970*sf, 88*sf],
  [1053*sf, 87*sf],
  [1053*sf, 739*sf],
  [32*sf, 744*sf],
  [410*sf, 557*sf],
  [720*sf, 549*sf],
  [1052*sf, 739*sf],
  [1053*sf, 89*sf],
  [714*sf, 318*sf],
  [720*sf, 547*sf],
  [411*sf, 556*sf],
  [405*sf, 322*sf],
  [716*sf, 318*sf],
  [402*sf, 322*sf],
  [34*sf, 93*sf]
];
// create a polyline 2
const polyline2 = [
 

[450*sf, 319*sf],
[456*sf, 551*sf]
]
// add the polyline to the final lines
finalLines.push(polyline);

// add the polyline to the final lines
finalLines.push(polyline2);

// create a polyline 2
const polyline3 = [
 

[496*sf, 322*sf],
[502*sf, 551*sf]
]

// add the polyline to the final lines
finalLines.push(polyline3);

// create a polyline 2
const polyline4 = [
 

[541*sf, 318*sf],
[544*sf, 551*sf]
]

// create a polyline 2
const polyline5 = [
 

[583*sf, 318*sf],
[587*sf, 554*sf]
]

// create a polyline 2
const polyline6 = [
 

[628*sf, 318*sf],
[634*sf, 554*sf]
]


// create a polyline 2
const polyline7 = [
 

[671*sf, 318*sf],
[675*sf, 554*sf]
]

// create a polyline 2
const polyline8 = [
 

[720*sf, 464*sf],
[408*sf, 473*sf]
]

// create a polyline 2
const polyline9= [
 

[721*sf, 377*sf],
[408*sf, 385*sf]
]

let z =bt.randInRange( 1, 6);

// create a polyline 2
const polyline10= [
 

[372*sf-z*50*sf, 380*sf],
[265*sf, 385*sf]
]

let v =bt.randInRange( -1, 6);

// create a polyline 2
const polyline11= [
 

[345*sf-v*50*sf, 437*sf],
[212*sf, 436*sf]
]

let x =bt.randInRange( 1, 6);

// create a polyline 2
const polyline12= [
 


[390*sf-x*50*sf, 508*sf],
[293*sf, 502*sf]
]

// create a polyline 2
const polyline13= [
 

[542*sf, 444*sf],
[513*sf, 445*sf]
]

// create a polyline 2
const polyline14= [
 

[514*sf, 445*sf],
[514*sf, 405*sf]
]

// create a polyline 2
const polyline15= [
 

[524*sf, 415*sf],
[530*sf, 415*sf]
]

// create a polyline 2
const polyline17= [
 

[524*sf, 415*sf],
[524*sf, 422*sf]
]

// create a polyline 2
const polyline19= [
 

[532*sf, 415*sf],
[530*sf, 422*sf]
]

// create a polyline 2
const polyline20= [
 

[533*sf, 426*sf],
[530*sf, 422*sf]
]

// create a polyline 2
const polyline21= [
 

[533*sf, 426*sf],
[533*sf, 432*sf]
]

// create a polyline 2
const polyline22= [
 

[531*sf, 435*sf],
[533*sf, 432*sf]
]

// create a polyline 2
const polyline23= [
 

[531*sf, 435*sf],
[524*sf, 435*sf]
]

// create a polyline 2
const polyline24= [
 

[522*sf, 425*sf],
[524*sf, 422*sf]
]

// create a polyline 2
const polyline25= [
 

[522*sf, 425*sf],
[522*sf, 431*sf]
]



// create a polyline 2
const polyline26= [
 

[524*sf, 435*sf],
[522*sf, 431*sf]
]

// create a polyline 2
const polyline16= [
 

[542*sf, 405*sf],
[514*sf, 403*sf]
]


// add the polyline to the final lines
finalLines.push(polyline7);

// add the polyline to the final lines
finalLines.push(polyline13);

// add the polyline to the final lines
finalLines.push(polyline14);

// add the polyline to the final lines
finalLines.push(polyline15);

// add the polyline to the final lines
finalLines.push(polyline16);

// add the polyline to the final lines
finalLines.push(polyline10);

// add the polyline to the final lines
finalLines.push(polyline11);

// add the polyline to the final lines
finalLines.push(polyline12);

// add the polyline to the final lines
finalLines.push(polyline9);

// add the polyline to the final lines
finalLines.push(polyline8);

// add the polyline to the final lines
finalLines.push(polyline6);

// add the polyline to the final lines
finalLines.push(polyline17);

// add the polyline to the final lines
finalLines.push(polyline19);

// add the polyline to the final lines
finalLines.push(polyline20);

// add the polyline to the final lines
finalLines.push(polyline21);

// add the polyline to the final lines
finalLines.push(polyline22);

// add the polyline to the final lines
finalLines.push(polyline23);

// add the polyline to the final lines
finalLines.push(polyline24);

// add the polyline to the final lines
finalLines.push(polyline25);

// add the polyline to the final lines
finalLines.push(polyline26);

// add the polyline to the final lines
finalLines.push(polyline4);

// add the polyline to the final lines
finalLines.push(polyline5);

// transform lines using the toolkit
bt.rotate(finalLines, 360);

bt.join(finalLines, drawer.lines())

// draw it
drawLines(finalLines);
