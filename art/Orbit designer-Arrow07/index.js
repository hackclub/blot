/*
@title: Orbit designer
@author: Arrow07
@snapshot: snapshot1.png
*/
/*
https://rivistaclio.com/2021/11/09/disegno-dellorbita-dei-pianeti/  

**DESIGNER ORBIT OF ONE PLANET AROUND ANOTHER!**

thanks to this script you can draw the orbit of a planet 
that rotates around another thanks to simple input data:
╔═══╦═══╦════╦════╦═══╗
║ x ║ y ║ Vx ║ Vy ║ t ║
╚═══╩═══╩════╩════╩═══╝

This calculator obviously has some limitations:

1-The ∆t must not be too small or too large.
  

2-The data entered must be in the order of 10^3 (max 10'000).

3- I recommend setting the initial value of y as 0 and one of x.

The graphs of this calculator are not limited to drawing the orbit of the planet 
but rather provide data on the position at each instant N (N1=N0+∆t) and consequently 
I can also provide the velocity and acceleration of the planet at that instant.

--TIPS--: 
1)put the value of ∆t between 0.1 and 0.01:
  the proportionality between the ∆t and the detail of the graph is inverse:
  the smaller ∆t is, the more instants will appear in the graph.

2)If the drawn ellipse does not close then reset a smaller ∆t or revive the data that you insert.

3)If the ellipse does not form then recheck the data entered

4)Work with "imaginary / probable" numbers
  but not with real numbers like the real earth-sun distance:
  this could make your drawing come out badly.

--RANDOM FUNCTIONS--
This script has some random functions built in for aesthetic reasons:

1) star function:
with this feature you can easily generate stars in random positions and sizes; 
you can control the number of stars by entering the desired value in the "numb_of_stars" variable:
  
  if numb_of_stars== 0 the number of stars will be RANDOM.
  if numb_of_stars== -1 the number of stars will be 0 (FUNCTION DISABLE) 
  if numb_of_stars is negative the code will return an ERROR: 
    please only put positive values, or equal to 0 and -1.

2)Random name generators:
in the lower part of the sheet there is a small space reserved in which to write what orbit it is, 
to check this text act on the "STRINGA" variable:
  if you set the value of this variable to undefined(stringa = "") the text will be generated RANDOMLY
  if you set a value to this variable this value will be written

--PROBLEMS AND BUGS:--
If you run into any problems with the script, don't hesitate to contact me on slack
ID: @giacomo
*/

//--DO NOT TUCH---   dichiaro array
var x = [];
var y = [];
var Vx = [];
var Vy = [];
var Ax = [];
var Ay = [];
var r = [];
var t, scalex, scaley, numb_of_stars, stringa, randomNumber;


//--INSERT DATA BELOW--//   inizializzo variabili
      randomNumber = false; //if this = true is random else is the value that you select in the below variable.
//════════════════════//
      x[0] = 0.50;     
//════════════════════//
      y[0] = 0.0;
//════════════════════//
      Vx[0] = 0;
//════════════════════//
      Vy[0] = 1.57;
//════════════════════//
      t = 0.10; //this is ∆t, IS NOT RANDOM
//════════════════════//
      scalex = 60;    //if you use  RANDOM VALUES PLEASE CORRET THIS VALUE TO FIT THE DRAW IN THE BLU SQUARE
      scaley = 40;    //if you use  RANDOM VALUES PLEASE CORRET THIS VALUE TO FIT THE DRAW IN THE BLU SQUARE
//════════════════════//
    numb_of_stars = 4; //if this =  0 is random, if is -1 no star draw else is nuber of stars. (should be >=0 || ==-1)
//════════════════════//
    stringa = ""; //if this is == "" is random, else print what you write in



//DO NOT TUCH ANYTHINGH BELOW!  DO NOT TUCH ANYTHINGH BELOW!
//DO NOT TUCH ANYTHINGH BELOW!  DO NOT TUCH ANYTHINGH BELOW!
    if(randomNumber == true){
        do{
        x[0]= (bt.randIntInRange(41, 68))/100;
        console.log(x[0] + "x");
        y[0] = (bt.randIntInRange(-40, 33))/100;
        console.log(y[0] + "y");
        }while(x[0] >= 0.4 && x[0] <= 0.6 && y[0] >= -0.4 && y[0] <= 0.25);
    }
    console.log("------");
//inizializzo variabili non inserite da utente

r[0] = Math.sqrt(Math.pow(x[0], 2) + Math.pow(y[0], 2))
Ax[0] = -x[0] / Math.pow(r[0], 3);
Ay[0] = -y[0] / Math.pow(r[0], 3);
// variabili di appoggio
var i = 0, l, soglia= 0.01;

//size of documents
const width = 125;
const height = 125;
setDocDimensions(width, height);

//calcolo valore per ogni istante
do {
    i++;
    y[i] = y[i - 1] + t * Vy[i - 1];
    x[i] = x[i - 1] + t * Vx[i - 1];
    r[i] = Math.sqrt(Math.pow(x[i], 2) + Math.pow(y[i], 2))
    Ax[i] = -x[i] / Math.pow(r[i], 3);
    Ay[i] = -y[i] / Math.pow(r[i], 3);
    Vy[i] = Vy[i - 1] + t * Ay[i];
    Vx[i] = Vx[i - 1] + t * Ax[i];
    //console.log(`y[${i}]: ${y[i]}, x[${i}]: ${x[i]}, r[${i}]: ${r[i]}, Ax[${i}]: ${Ax[i]}, Ay[${i}]: ${Ay[i]}, Vy[${i}]: ${Vy[i]}, Vx[${i}]: ${Vx[i]}`);
    
} while (Math.abs(x[i] - x[0]) > soglia || i == 1);

//make the draw
var t = new bt.Turtle();
for (l = 0; l <= i; l++) {

    t.goTo([x[l], y[l]]);

}

l = t.path;
//remove first index (0,0)
l[0].splice(0, 1);

//center the draw
function centerPolylines(polylines, documentWidth, documentHeight) {
    const cc = bt.bounds(polylines).cc;
    bt.translate(polylines, [documentWidth / 2, documentHeight / 2], cc);
}
//planet on ellips
function createCircle(centerx, centery, radius, numPoints = 200) {
  const points = [];
  for (let i = 0; i <= numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = centerx + radius * Math.cos(angle);
    const y = centery + radius * Math.sin(angle);
    points.push([x, y]);
  }
  return points;
}
//scale and call the function to center
var randompoint, planet;
randompoint = bt.randIntInRange(0, x.length-1);
planet= createCircle(0, 0, bt.randIntInRange(1, 10));
l = bt.scale(l, [scalex, scaley]);
centerPolylines(l, 125, 125);
planet = bt.translate([planet], [l[0][randompoint][0], l[0][randompoint][1]]);


//draw
drawLines(l);
drawLines(planet);
//draw cartesian plan
drawLines([
    [[62.5, 10], [62.5, 125]]
])
drawLines([
    [[0, 62.5], [125, 62.5]]
])
drawLines([
    [[0, 10], [125, 10]]
])
//random stars
function star(x, y, size) {
    const points = [];
    for (let i = 0; i < 10; i++) {
        const angle = Math.PI / 2 + (Math.PI * 2 * i / 10);
        const length = i % 2 === 0 ? size : size / 2;  // Alternate between outer and inner points
        const endX = x + length * Math.cos(angle);
        const endY = y + length * Math.sin(angle);
        points.push([endX, endY]);
    }

    const starLines = [];
    for (let i = 0; i < points.length; i++) {
        starLines.push([points[i], points[(i + 1) % points.length]]); // Connect each point to the next
    }

    drawLines(starLines);
}
function drawstars(n) {
    var xs, ys, ds, nstar, ncircle, val, circle;
    if (n == 0) {
        n = bt.randIntInRange(1, 10)
    } else if (n < 0) {
        return console.error("n should be >=0");
    }
    val= bt.randIntInRange(1, n-1 )
    nstar= n- val;
    ncircle = n- nstar;
    for (nstar; nstar > 0; nstar--) {
        //const width = 125;
        //const height = 125;
        xs = bt.randIntInRange(10, width - 10);
        ys = bt.randIntInRange(20, height - 10);
        ds = bt.randIntInRange(3, 9);
        star(xs, ys, ds);
        
    }
    for (ncircle; ncircle > 0; ncircle--) {
        //const width = 125;
        //const height = 125;
        xs = bt.randIntInRange(10, width - 10);
        ys = bt.randIntInRange(20, height - 10);
        ds = bt.randIntInRange(3, 9);
        circle = createCircle(xs, ys, ds);
        drawLines([circle]);
    }
    
}
//draw the star
star(62.5,62.5, bt.randIntInRange(12,15));

//disegnare tutte cose
if (numb_of_stars != -1) {
    drawstars(numb_of_stars);
}

// DrawPlanet(x.length);

//random text
function generaNomePianeta() {
    const prefissiPianeti = ["Zar", "Xan", "Vor", "Kry", "Lir", "Nor", "Bel", "Gal", "Zyl", "Ter", "Ark", "Eld"];
    const suffissiPianeti = ["dor", "mar", "ria", "tus", "lon", "via", "zon", "tar", "thus", "nix", "mir", "thus"];

    const prefisso = prefissiPianeti[bt.randIntInRange(0, prefissiPianeti.length - 1)];
    const suffisso = suffissiPianeti[bt.randIntInRange(0, suffissiPianeti.length - 1)];
    return prefisso + suffisso;
}

function generaNomeStella() {
    const prefissiStelle = ["Al", "Bet", "Prox", "Den", "Sir", "Alt", "Rig", "Vega", "Cap", "Ant", "Men", "Tau"];
    const suffissiStelle = ["pha", "nus", "ron", "ari", "zor", "eus", "ion", "nor", "lia", "pol", "des", "ax"];

    const prefisso = prefissiStelle[bt.randIntInRange(0, prefissiStelle.length - 1)];
    const suffisso = suffissiStelle[bt.randIntInRange(0, suffissiStelle.length - 1)];
    return prefisso + suffisso;
}

if (stringa == "") {
    const pianeta = generaNomePianeta();
    const stella = generaNomeStella();
    stringa = "Orbita of " + pianeta + " around the " + stella;
}

drawLines(bt.text(stringa, [3, 3], 1));
