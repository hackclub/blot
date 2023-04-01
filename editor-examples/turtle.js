class Turtle {
  constructor() {
    this.drawing = true;
    this.location = { x: 0, y: 0 };
    this.angle = 0;
    this.path = [
      [{ x: 0, y: 0 }]
    ];
    
    this.size = 1;
    this.color = "black";
  }

  up() {
    this.drawing = false;
    this.path.push([{...this.location}])
    return this;
  }

  down() {
    this.drawing = true;
    return this;
  }

 

  goTo(x, y) {

    const lastPath = this.path.at(-1);
    if (this.drawing) {
      lastPath.push({x, y});
    } else {
      if (lastPath.length === 1) lastPath[0] = {x, y};
    }

    this.location = { x, y };
    
    return this;
  }



  forward(distance) {
    const last = this.location;
    const a = this.angle/180 * Math.PI;
    const x = last.x + distance * Math.cos(a);
    const y = last.y + distance * Math.sin(a);

    this.goTo(x, y);

    return this;
  }

  arc(angle, radius) {
    const theta = Math.abs(angle);
    
    const length = radius*theta/180*Math.PI;

    const ogAngle = this.angle;
    const thetaStep = 1;
    const steps = theta/thetaStep;
    const distanceStep = length/steps;

    for (let i = 0; i < steps; i++) {
      if (angle >= 0) this.right(thetaStep);
      else this.left(thetaStep);

      this.forward(distanceStep);
    }

    this.setAngle(ogAngle + angle);

    return this;
  }

  setAngle(theta) {
    this.angle = theta;

    return this;
  }

  right(theta) {
    this.angle += theta;

    return this;
  }

  left(theta) {
    this.angle -= theta;

    return this;
  }

  draw() {
    
    const view = `
      <style>
        .svg-viewer {
          width: 200px;
          height: 200px;
          border: 1px black solid;
          margin: 10px;
        }
      </style>
      <svg class="svg-viewer">
        ${drawPath(this.path)}
      </svg>
    `
    
    
    function drawPath(path) {
      let d = "";
      path.forEach(polyline => {
        polyline.forEach((pt, i) => {
          const {x, y} = pt;
          if (i === 0) d += `M ${x} ${y}`
          else d += `L ${x} ${y}`
        })
      })
      return `
        <path d="${d}" stroke="black" stroke-width="2px" fill="none"/>
      `
    }

    viewWindow.innerHTML = view;

  }

  async runMachine(scale) {

    for (const polyline of this.path) {
      for (let i = 0; i < polyline.length; i++) { 
        const {x, y} = polyline[i];
        console.log(polyline[i])
        if (i === 0) await penUp();
        else if (i === 1) await penDown();
        
        await goTo(x/scale, y/scale);
      }
    }

    await penUp();
  }

  
}


await motor0.setCurrentScale(0.7);
await motor0.setStepsPerUnit(200);

await motor1.setCurrentScale(0.7);
await motor1.setStepsPerUnit(200);

const machine = createSynchronizer([motor0, motor1]);

async function penUp() {
  await servo.writeAngle(0);
}

async function penDown() {
  await servo.writeAngle(180);
  await delay(500);
}


async function goTo(x, y) {
  await machine.absolute([x+y, y-x]);
}


const t = new Turtle();
const u = new Turtle();

t.up();
t.goTo(100, 50);
t.down();
for (let i = 0; i < 80; i++) {
  t.forward(i*2);
  t.right(94);
  t.left(20);
}
// t.draw()

u.up();
u.goTo(50,100);
u.down();
for(let i = 0; i< 30; i++) {
  u.forward(i*1.5);
  u.right(100);
  u.left(i);
}

u.up();
u.goTo(150,100);
u.down();
for(let i = 0; i< 40; i++) {
  u.forward(i*1.5);
  u.right(100);
  u.left(i);
}

u.draw()
u.runMachine(50);

// t.runMachine(50)

// machine.setPosition([0, 0]);
