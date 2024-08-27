/*
@title: Radio
@author: Neon
@snapshot: snapshot1.png
*/

// Minified BlotFont by geschmit
var ParseCoords=($,f=1)=>{const r=[];for(const f of $.split(":"))parseFloat(f)&&r.push(parseFloat(f));return r},RunInstructions=($,f,r=1)=>{const a=new bt.Turtle;a.jump(f);for(const f of $.split(",")){const $=f.split("$")[0],s=f.split("$")[1];let e;switch($){case"u":a.up();break;case"d":a.down();break;case"f":a.forward(parseFloat(s)*r);break;case"arc":e=ParseCoords(s),a.arc(-e[0],e[1]*r);break;case"jmp":e=ParseCoords(s),a.jump(e);break;case"sa":a.setAngle(parseFloat(s));break;case"l":a.left(parseFloat(s));break;case"r":a.right(parseFloat(s))}}return drawLines(a.lines()),a.position},letters={a:"sa$90,f$2,r$90,f$2,r$90,f$2,u,sa$90,f$2,d,l$30,f$2,l$120,f$2",b:"sa$90,f$4,r$90,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1",c:"sa$90,u,r$90,f$2,r$180,d,arc$180:2",d:"sa$90,f$4,r$90,arc$180:2",e:"sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2,u,f$-2,r$90,f$2,l$90,d,f$2",f:"sa$90,f$4,r$90,f$2,u,f$-2,r$90,f$2,l$90,d,f$2",g:"u,f$1,sa$90,f$2,r$90,d,arc$270:1,f$2,arc$90:1",h:"sa$90,f$4,u,f$-2,r$90,d,f$2,u,l$90,f$-2,d,f$4",i:"f$2,u,f$-1,l$90,d,f$4,r$90,u,f$-1,d,f$2",j:"sa$90,u,f$4,r$90,d,f$2,u,f$-1,r$90,d,f$3,arc$90:1",k:"sa$90,f$4,u,f$-2,r$45,d,f$2.75,u,f$-2.75,r$90,d,f$2.75",l:"sa$90,u,f$4,r$180,d,f$4,l$90,f$2",m:"sa$90,f$4,sa$0,r$71.57,f$3.162,sa$0,l$71.57,f$3.162,sa$0,r$90,f$4",n:"sa$90,f$4,r$153.43,f$4.47,l$153.43,f$4",o:"sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1",p:"sa$90,f$4,r$90,f$1,arc$180:1,f$1",q:"sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,r$90,f$1,r$45,d,f$1.414",r:"sa$90,f$4,r$90,f$1,arc$180:1,f$1,sa$-45,f$2.8284",s:"f$1,arc$-180:1,arc$180:1,f$1",t:"u,f$1,sa$90,d,f$4,u,r$90,f$-1,d,f$2",u:"sa$90,u,f$4,sa$-90,d,f$3,arc$-180:1,f$3",v:"sa$90,u,f$4,r$165.96,d,f$4.12,l$151.93,f$4.12",w:"sa$90,u,f$4,sa$0,r$82.87,d,f$4.03,sa$0,l$63.43,f$1.12,sa$0,r$63.43,f$1.12,sa$0,l$82.87,f$4.03",x:"sa$90,u,f$4,r$153.44,d,f$4.47,u,l$153.44,f$4,l$153.44,d,f$4.47",y:"u,f$1,sa$90,d,f$2.5,r$33.69,f$1.8,u,f$-1.8,l$67.38,d,f$1.8",z:"u,f$2,d,f$-2,l$63.44,f$4.47,r$63.44,f$-2",0:"sa$90,u,f$1,d,f$2,arc$180:1,f$2,arc$180:1,u,f$2,arc$45:1,sa$-66.80,d,f$3.675",1:($,f)=>DrawBezier($,-106,f,bezierEasing(.026,[.984,-1],[1,1],.9561),[2,-.47],"f$2,u,f$-1,sa$90,d,f$4,l$90"),2:"u,f$2,r$180,d,f$2,sa$90,arc$90:1,arc$-90:1,f$1,arc$-180:1",3:"sa$90,u,f$4,r$90,d,f$1,arc$180:1,f$1,r$180,f$1,arc$180:1,f$1",4:"u,f$2,sa$90,f$1,l$90,d,f$2,r$116.57,f$3.35,sa$-90,f$4",5:"u,sa$90,f$1,r$180,d,arc$-180:1,f$1,arc$-90:1,arc$90:1,sa$0,f$2",6:($,f)=>DrawBezier($,74,f,bezierEasing(-.018,[.054,-.373],[1,-.758],.9181),[3.2,-.36],"u,sa$90,f$1,d,arc$360:1"),7:($,f)=>DrawBezier($,245,f,bezierEasing(-.005,[0,-.149],[0,1],.206),[4.5,-.59],"u,sa$90,f$4,r$90,d,f$2"),8:"u,f$1,d,arc$-180:1,arc$360:1,arc$-180:1",9:($,f)=>DrawBezier($,-107,f,bezierEasing(-.018,[.054,-.373],[1,-.758],.9181),[3.2,-.36],"u,sa$90,f$4,r$90,f$1,d,arc$360:1,u,arc$90:1,d"),".":"sa$90,u,f$.75,r$90,f$1,d,arc$360:.25",",":"sa$90,u,f$.5,r$90,f$1,r$90,d,arc$90:.25","?":"sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$1,r$90,arc$-270:1","!":"sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$.25,d,f$3","+":"sa$90,u,f$2,r$90,d,f$2,u,f$-1,l$90,f$-1,d,f$2","-":"sa$90,u,f$2,r$90,d,f$2","*":"sa$90,u,f$2,r$90,f$1,l$90,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2,u,f$-1,r$60,f$-1,d,f$2","/":"l$63.43,f$4.47","=":"sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2",$:"f$1,arc$-180:1,arc$180:1,f$1,u,f$-1,r$90,d,f$4",":":"sa$90,u,f$.75,r$90,f$1,d,arc$360:.25,l$90,u,f$2.5,d,r$90,arc$360:.25",";":"sa$90,u,f$.25,r$90,f$1,r$90,d,arc$90:.25,u,arc$270:.25,r$180,f$3,d,r$90,arc$-360:.25","(":"u,f$1.25,r$180,d,arc$90:.5,f$3,arc$90:.5",")":"u,f$.75,d,arc$-90:.5,f$3,arc$-90:.5","[":"u,f$1.5,r$180,d,f$1,r$90,f$4,r$90,f$1","]":"u,f$.5,d,f$1,l$90,f$4,l$90,f$1","#":"sa$90,u,f$1.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2,u,r$90,f$.5,r$90,f$.5,r$90,d,f$2,u,l$90,f$1,l$90,d,f$2","%":"sa$90,u,f$2,r$45,d,f$2.83,u,l$45,f$-1.5,d,arc$-360:.5,u,f$1.5,l$90,f$1.5,d,arc$-360:.5",_:"f$2","|":"u,f$1,sa$90,d,f$4","\\":"u,f$4,r$153.43,d,f$4.47",'"':"u,f$.5,sa$90,f$3,d,f$1,u,r$90,f$1,r$90,f$1","'":"u,f$1,sa$90,f$3,d,f$1",">":"sa$90,u,f$1,r$63.43,d,f$2.24,l$127,f$2.24","<":"u,f$2,sa$90,f$1,l$63.43,d,f$2.24,r$127,f$2.24"," ":"","\r":"","\n":""},allLetters=Object.keys(letters).join(""),DrawBezier=($,f,r,a,s,e)=>{const t=new bt.Turtle;t.jump($),e&&t.jump(RunInstructions(e,$,r)),t.setAngle(f),t.forward(s[0]*r),bt.resample(t.path,.1),warp(t,($=>a($)*s[1]*r)),drawLines(t.lines())},DrawText=($,f,r=100,a=[2.5,4.5])=>{let s=0,e=0;for(const t of $.toLowerCase())if(-1==allLetters.indexOf(t,0))RunInstructions(letters["?"],[f[0]+s*a[0]*r,f[1]-e*a[1]*r],r);else{switch(t){case"\r":s=0;continue;case"\n":s=0,e+=1;continue;default:"string"==typeof letters[t]?RunInstructions(letters[t],[f[0]+s*a[0]*r,f[1]-e*a[1]*r],r):"function"==typeof letters[t]&&letters[t]([f[0]+s*a[0]*r,f[1]-e*a[1]*r],r)}s+=1}};function calculateBezierPoint($,f,r,a,s){let e=1-$,t=$*$,u=e*e,c=u*e,l=t*$,n=[c*f[0],c*f[1]];return n[0]+=3*u*$*r[0],n[1]+=3*u*$*r[1],n[0]+=3*e*t*a[0],n[1]+=3*e*t*a[1],n[0]+=l*s[0],n[1]+=l*s[1],n}function findTForGivenX($,f,r,a,s){let e=.5,t=0;for(;t<1e3;){let u=calculateBezierPoint(e,f,r,a,s)[0]-$;if(Math.abs(u)<1e-5)return e;e-=u/2,t++}return e}function getYForX($,f,r,a,s){return calculateBezierPoint(findTForGivenX($,f,r,a,s),f,r,a,s)[1]}function bezierEasing($,f,r,a){return s=>getYForX(s,[0,$],[Math.min(Math.max(0,f[0]),1),f[1]],[Math.min(Math.max(0,r[0]),1),r[1]],[1,a])}function warp($,f,r=null){const a=tValuesForPoints($.path),s=[];return a.forEach(((a,e)=>{const t=$.path.flat()[e];let u=r??bt.getAngle($.path,a);"function"==typeof u&&(u=u(bt.getAngle($.path,a)));const c=function($,f,r=[0,0]){let a=f/180*Math.PI,s=$[0]-r[0],e=$[1]-r[1],t=[s*Math.cos(a)-e*Math.sin(a)+r[0],e*Math.cos(a)+s*Math.sin(a)+r[1]];return t}([0,f(a)],u);s.push([t[0]+c[0],t[1]+c[1]])})),$.path.flat().forEach((($,f,r)=>{$[0]=s[f][0],$[1]=s[f][1]})),$}function tValuesForPoints($){let f=0,r=[],a=[],s=0;for(let a=0;a<$.length;a++){let e=$[a];for(let $=0;$<e.length;$++){if($>0){let r=e[$][0]-e[$-1][0],a=e[$][1]-e[$-1][1];s=Math.sqrt(r*r+a*a),f+=s}r.push(s)}}let e=0;for(let $=0;$<r.length;$++)e+=r[$],a.push(e/f);return a}

// Changeable Values
const randomAntenna = Math.floor(bt.rand() * (40 - 15) + 15);
const talkgroups = ["EMS DISP", "FIRE DISP", "LAW DISP", "FIRE OPS", "FIRE TAC", "EMS OPS", "EMS TAC", "LAW OPS", "LAW TAC"]
const mobilemenuoptions = ["RSSI", "SITE", "SCAN", "ZONE", "ZNUP", "ZNDN", "CHUP", "CHDN", "EMER", "PAGE"] // 4 Characters per option only!
const posadjustx = Math.floor(bt.rand() * (71 - -11) + -11)
const posadjusty = Math.floor(bt.rand() * (14.5 - -4.5) + -4.5);
const typeofradio = Math.round(bt.rand()); //0 is portable, 1 is mobile
//const typeofradio = 1;

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

const needsRendering = [body, antenna, cknob, vknob, screen, buttons, numbers, keypad, logo]

setDocDimensions(width, height);

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
    
    DrawText(menuOption, [24+(i*5) + posadjustx, 49 + posadjusty], 0.5);
  }
  
  var talkgroup = talkgroups[Math.floor(bt.rand() * talkgroups.length)];
  DrawText(talkgroup, [27 + posadjustx, 59 + posadjusty], 0.5);
  
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
  
  const freq = `${Math.floor(bt.rand() * (9 - 1) + 1)}${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)}.${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)} MHz`
  DrawText(freq, [27 + posadjustx,55 + posadjusty],0.5)
  
  
  for (var i = 0; i < 3; i++) {
    for (var x = 0; x < 4; x++) {
      square(24.5+(i * 5) + posadjustx,40-(x * 4) + posadjusty,5,4,keypad)
    }
  }
  
  for (var i = 1; i <= 3; i++) {
    DrawText(`${i}`, [26.5 + ((i * 5)-5) + posadjustx,37 + posadjusty],0.5)
  }
  
  for (var i = 4; i <= 6; i++) {
    DrawText(`${i}`, [26.5 + (((i-3) * 5)-5) + posadjustx,37-4 + posadjusty],0.5)
  }
  
  for (var i = 7; i <= 9; i++) {
    DrawText(`${i}`, [26.5 + (((i-6) * 5)-5) + posadjustx,37-8 + posadjusty],0.5)
  }
  
  DrawText(`*`, [26.5 + ((1 * 5)-5) + posadjustx,37-12 + posadjusty],0.5)
  DrawText(`0`, [26.5 + ((2 * 5)-5) + posadjustx,37-12 + posadjusty],0.5)
  DrawText(`#`, [26.5 + ((3 * 5)-5) + posadjustx,37-12 + posadjusty],0.5)
  
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

  const freq = `${Math.floor(bt.rand() * (9 - 1) + 1)}${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)}.${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)}${Math.floor(bt.rand() * 10)} MHz`
  DrawText(freq, [width -25 - 50 + posadjusty, 18 + posadjustx],1)

  var talkgroup = talkgroups[Math.floor(bt.rand() * talkgroups.length)];
  DrawText(talkgroup, [width -25 - 50 + posadjusty, 27 + posadjustx], 1);

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
    }
  
    if (usedMenu.includes(menuOption)) {
      menuOption = "";
      for (var x = 0; x < 5; x++) {
         //menuOption += alphabet[Math.floor(bt.rand() * alphabet.length)];
         menuOption += mobilemenuoptions[Math.floor(bt.rand() * mobilemenuoptions.length)];
         //menuOption += " ";
         usedMenu.push(menuOption)
      }
    } else {
      usedMenu.push(menuOption)
    }
    
    DrawText(menuOption, [width -25 - 66 + (i * 13) + posadjusty, 12 + posadjustx], 0.4);
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
