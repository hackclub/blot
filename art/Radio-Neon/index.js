/*
@title: Radio
@author: Neon
@snapshot: snapshot1.png
*/


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
// 
// This blot will generate either a mobile (vehicle mounted) or portable (handheld) radio.
// The first line of text on the screen (typically XXNXX (or a bunch of different variations), replacing Xs with letters and N with numbers) is the callsign (on air identifier) of the repeater owner.
// The second line of text on the screen (typically NNN.NNN MHz, replacing Ns with numbers) is the frequency of the repeater in MHZ.
// All of this data is pulled from the RepeaterBook API. More info can be found at https://www.repeaterbook.com/wiki/doku.php?id=api
// If you're wondering what a repeater is- in simple terms,repeater consists of a transmitter and receiver. The receiver receives radio frequencies, and rebroadcasts them via a higher power transmitter.
// 
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


// Changeable Values
const randomAntenna = Math.floor(bt.rand() * (40 - 15) + 15);
const mobilemenuoptions = ["RSSI", "SITE", "SCAN", "ZONE", "ZNUP", "ZNDN", "CHUP", "CHDN", "EMER", "PAGE"] // 4 Characters per option only!
const posadjustx = Math.floor(bt.rand() * (71 - -11) + -11)
const posadjusty = Math.floor(bt.rand() * (14.5 - -4.5) + -4.5);
const typeofradio = Math.round(bt.rand()); //0 is portable, 1 is mobile
const city = "Indianapolis" // Any US city
const state = "Indiana" // Any US state

// Please dont touch!
const width = 125;
const height = 125;
const body = new bt.Turtle();
const antenna = new bt.Turtle();
const cknob = new bt.Turtle();
const vknob = new bt.Turtle();
const screen = new bt.Turtle();
const buttons = new bt.Turtle();
const numbers = new bt.Turtle();
const keypad = new bt.Turtle();
const logoM = new bt.Turtle();
const logo = new bt.Turtle();
const text = [];

const needsRendering = [body, antenna, cknob, vknob, screen, buttons, numbers, keypad, logo]

setDocDimensions(width, height);

let callsign;
let frequency;

const xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.allorigins.win/get?url=" + encodeURIComponent("https://www.repeaterbook.com/api/export.php?state=" + state + "&city=" + city), false);
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    var rptdata = JSON.parse(JSON.parse(xhr.responseText).contents);
    var arrpos = Math.floor(bt.rand() * (rptdata.results.length - 0 + 1)) + 0
    callsign = rptdata.results[arrpos].Callsign
    frequency = rptdata.results[arrpos].Frequency
    
  }
};
xhr.send();
new Promise(r => setTimeout(r, 1000));

function square(startx, starty, len1, len2, turtle) {
  turtle.jump([startx, starty])
  for (var i = 0; i < 2; i++) {
    turtle.forward(len1)
    turtle.right(90)
    turtle.forward(len2)
    turtle.right(90)
  }
}

if(typeofradio == 0) {
  body
    .jump([(width / 2) - 50 + posadjustx, 5 + posadjusty])
    .down()
    .forward(40)
    .left(90)
    .forward(75)
    .left(90)
    .forward(35)
    .up()
    .forward(5)
    .down()
    .left(90)
    .forward(75)
  
  antenna
    .jump([12.5 + posadjustx, 80 + posadjusty])
    .left(90)
    .forward(randomAntenna)
    .right(90)
    .forward(5)
    .right(90)
    .forward(randomAntenna)
  
  cknob
    .jump([35 + posadjustx, 80 + posadjusty])
    .left(90)
    .forward(6)
    .right(90)
    .forward(4)
    .right(90)
    .forward(6)
  
  vknob
    .jump([45 + posadjustx, 80 + posadjusty])
    .left(90)
    .forward(3)
    .right(90)
    .forward(4)
    .right(90)
    .forward(3)
  
  
  square(22.25 + posadjustx, 68 + posadjusty, 20, 20, screen)
  
  for (var i = 0; i < 4; i++) {
    square(22.25 + (i * 5) + posadjustx, 52 + posadjusty, 5, 4, screen)
  }
  
  let usedMenu = []
  for (var i = 0; i < 4; i++) {
    var menuOption = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    
    menuOption += alphabet[Math.floor(bt.rand() * alphabet.length)];
  
    if (usedMenu.includes(menuOption)) {
      menuOption = "";
      menuOption += alphabet[Math.floor(bt.rand() * alphabet.length)];
    } else {
      usedMenu.push(menuOption)
    }
    
    text.push(...bt.text(menuOption, [24+(i*5) + posadjustx, 49 + posadjusty], 0.5));
  }
  
  text.push(...bt.text(callsign, [25 + posadjustx, 59 + posadjusty], 0.5));
  
  for (var i = 0; i < 4; i++) {
    const blines = new bt.Turtle()
    square(22.25+(i * 5) + posadjustx,46 + posadjusty,5,4,buttons)
    buttons
      .jump([24.8+(i * 5) + posadjustx,43 + posadjusty])
      .arc(360, 1)
    
    blines
    .jump([24.8+(i * 5) + posadjustx,46 + posadjusty])
    .left(90)
    .forward(2)
    drawLines(blines.lines())
  }
  
  const freq = `${frequency} MHz`
  text.push(...bt.text(freq, [25 + posadjustx,55 + posadjusty],0.5))
  
  
  for (var i = 0; i < 3; i++) {
    for (var x = 0; x < 4; x++) {
      square(24.5+(i * 5) + posadjustx,40-(x * 4) + posadjusty,5,4,keypad)
    }
  }
  
  for (var i = 1; i <= 3; i++) {
    text.push(...bt.text(`${i}`, [26.5 + ((i * 5)-5) + posadjustx,37 + posadjusty],0.5))
  }
  
  for (var i = 4; i <= 6; i++) {
    text.push(...bt.text(`${i}`, [26.5 + (((i-3) * 5)-5) + posadjustx,37-4 + posadjusty],0.5))
  }
  
  for (var i = 7; i <= 9; i++) {
    text.push(...bt.text(`${i}`, [26.5 + (((i-6) * 5)-5) + posadjustx,37-8 + posadjusty],0.5))
  }
  
  text.push(...bt.text(`*`, [26.5 + ((1 * 5)-5) + posadjustx,37-12 + posadjusty],0.5))
  text.push(...bt.text(`0`, [26.5 + ((2 * 5)-5) + posadjustx,37-12 + posadjusty],0.5))
  text.push(...bt.text(`#`, [26.5 + ((3 * 5)-5) + posadjustx,37-12 + posadjusty],0.5))
  
  const mSize = 1.5
  logoM
    .jump([30.5 + posadjustx, 71 + posadjusty])
    .setAngle(90)
    .forward(4 + mSize)
    .setAngle(0)
    .right(71.57)
    .forward(3.162 + mSize)
    .setAngle(0)
    .left(71.57)
    .forward(3.162 +mSize)
    .setAngle(0)
    .right(90)
    .forward(4 + mSize)
  
  
  logo
    .jump([32 + posadjustx, 69.7 + posadjusty])
    .arc(360,4)
  
  drawLines(logoM.lines(), {width: 2.5})
} else if(typeofradio == 1) {
    body
    .jump([width -25 + posadjusty, 5 + posadjustx])
    .down()
    .left(90)
    .forward(40)
    .left(90)
    .forward(75)
    .left(90)
    .forward(40)
    .left(90)
    .forward(75)

  square(width -25 - 69.5 + posadjusty, 35 + posadjustx, 65, 20, screen)

  const freq = `${frequency} MHz`
  text.push(...bt.text(freq, [width -25 - 50 + posadjusty, 18 + posadjustx],1))

  text.push(...bt.text(callsign, [width -25 - 50 + posadjusty, 27 + posadjustx], 1));

  for (var i = 0; i < 3; i++) {
    square(width -25 - 74 + posadjusty, 21 +(i * 5) + posadjustx,3,2,buttons)
  }

  const mSize = 1.0
  logoM
    .jump([width -25 - 38.3 + posadjusty, 37.4 + posadjustx])
    .setAngle(90)
    .forward(4 + mSize)
    .setAngle(0)
    .right(71.57)
    .forward(3.162 + mSize)
    .setAngle(0)
    .left(71.57)
    .forward(3.162 + mSize)
    .setAngle(0)
    .right(90)
    .forward(4 + mSize)
  
  
  logo
    .jump([width -25 - 37 + posadjusty, 36 + posadjustx])
    .arc(360,4)

  drawLines(logoM.lines(), {width: 2.5})

  for (var i = 0; i < 5; i++) {
    square(width -25 - 69.5 + (i * 13) + posadjusty, 15 + posadjustx, 13, 4, screen)  
  }
  
  let usedMenu = []
  for (var i = 0; i < 5; i++) {
    var menuOption = "";
    var alphabet = "abcdefghijklmnopqrstuvwxyz";

    for (var x = 0; x < 5; x++) {
      //menuOption += alphabet[Math.floor(bt.rand() * alphabet.length)];
      menuOption = mobilemenuoptions[Math.floor(bt.rand() * mobilemenuoptions.length)];
      //menuOption += " ";
      if (usedMenu.includes(menuOption)) {
        menuOption = mobilemenuoptions[Math.floor(bt.rand() * mobilemenuoptions.length)];
        usedMenu.push(menuOption)
      } else {
        usedMenu.push(menuOption)
      }
      
    }
  
    text.push(...bt.text(menuOption, [width -25 - 66 + (i * 13) + posadjusty, 12 + posadjustx], 0.5));
  }

  const mcknob = new bt.Turtle();
  const mvknob = new bt.Turtle();

  mcknob
    .jump([width -30 + posadjusty, 36.8 + posadjustx])
    .arc(360,3)
  
  mvknob
    .jump([width -95 + posadjusty, 36.8 + posadjustx])
    .arc(360,3)
    .jump([width -95 + posadjusty, 36.8 + posadjustx])

  drawLines(mcknob.lines(), {fill: true})
  drawLines(mvknob.lines(), {fill: true})

}

needsRendering.forEach((element) => drawLines(element.lines(), {width: 2}));
drawLines(text);
