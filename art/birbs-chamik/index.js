/*
@title: birbs
@author: chamik
@snapshot: birbs1.png
*/

// BIRBS - a Boids implemenation
// This program is very quadratic and will not run well with many birbs
// Tips for cool results:
//    - set STEPS >= 30 so that birbs have time to move around and influence each other
//      ... but not too high or you're going to wait a long time
//    - don't set VISUAL_RANGE too high otherwise it's just a homogenous blob
//    - don't set PROTECTED_RANGE too high otherwise it's just dots
//    - experiment!! there are no rules, for starters try putting negative signs in random places


const BIRB_AMOUNT = 3800;                   // amount of simulated birbs
const STEPS = 30;                           // how many steps to simulate
                                            
const MAX_SPEED = 8;                        // MAX distance per step
const MIN_SPEED = 3;                        // MIN distance per step
const VISUAL_RANGE = 11;                    // each birb will try to mimic the movements of other birbs in this range
const PROTECTED_RANGE = 3.1;                // personal space

const CENTERING_FACTOR = 0.08;              // how much do birbs like to hang out in the center
const MATCHING_FACTOR = 0.4;                // how much do birbs vibe with each other
const AVOID_FACTOR = 0.08;                  // how much they dislike each other
const TURN_FACTOR = 0.7;                    // how much do birbs not like the edges of the canvas

const BIAS_VAL = 0.005;                     // starting bias value
const BIAS_INCREMENT = 0.005;               // this is added each step
const MAX_BIAS = 0.1;                       // MAX bias value
const RIGHT_BIAS_MODULO = 17;               // 1/x of birds will be biased towards the right side
const LEFT_BIAS_MODULO = 2;                 // 1/x of birds will be biased towards the left side

const SCALE_FACTOR = 0.75;                  // scaling postprocessing

const RNG_SEED = parseInt('0d9e', 16);      // randomness seed
bt.setRandSeed(RNG_SEED);

const DIM = 125;                            // canvas dimensions
const MARGIN = 19;                          // birbs will steer towards the center if they are in the margin
setDocDimensions(DIM, DIM);

// ========= PROGRAM =========

const t = new bt.Turtle();

function rnd_vector(scalar=1) {
  let theta = bt.randInRange(0, 2 * Math.PI);
  return { x: Math.cos(theta) * scalar, y: Math.sin(theta) * scalar, a: theta };
}

function generate_flock() {
  let flock = [];

  for (let i = 0; i < BIRB_AMOUNT; i++) {
    let x = bt.randIntInRange(0, DIM);
    let y = bt.randIntInRange(0, DIM);
    let s = bt.randInRange(MIN_SPEED, MAX_SPEED)
    let v = rnd_vector(s);
    
    flock.push({ id: i, x, y, vx: v.x, vy: v.y, a: v.a, s, bias: BIAS_VAL });
  }

  return flock;
}

function draw_birb(birb) {
  t.jump([birb.x, birb.y]);
  t.setAngle(birb.a * 57.29);
  t.forward(birb.s / 3);
}

function update_birb(birb, flock) {
  let xpos_avg = 0;
  let ypos_avg = 0;
  let xvel_avg = 0;
  let yvel_avg = 0;
  let neighboring_birbs = 0;
  let close_dx = 0;
  let close_dy = 0;

  // 
  for (let i = 0; i < flock.length; i++) {
    let other_birb = flock[i];

    if (other_birb.id == birb.id)
      continue;

    let dx = birb.x - other_birb.x;
    let dy = birb.y - other_birb.y;

    if (Math.abs(dx) < VISUAL_RANGE && Math.abs(dy) < VISUAL_RANGE) {
        let squared_distance = dx*dx + dy*dy;

        if (squared_distance < PROTECTED_RANGE*PROTECTED_RANGE) {
            close_dx += birb.x - other_birb.x;
            close_dy += birb.y - other_birb.y;
        }
        else if (squared_distance < VISUAL_RANGE*VISUAL_RANGE) {
            neighboring_birbs += 1;
            xvel_avg += other_birb.vx;
            yvel_avg += other_birb.vy;
            xpos_avg += other_birb.x;
            ypos_avg += other_birb.y;
        }
    }
  }

  // VIBING
  if (neighboring_birbs > 0) {
    xvel_avg = xvel_avg / neighboring_birbs
    yvel_avg = yvel_avg / neighboring_birbs
    xpos_avg = xpos_avg / neighboring_birbs
    ypos_avg = ypos_avg / neighboring_birbs

    birb.vx += (xpos_avg - birb.x)*CENTERING_FACTOR + (xvel_avg - birb.vx)*MATCHING_FACTOR;
    birb.vy += (ypos_avg - birb.y)*CENTERING_FACTOR + (yvel_avg - birb.vy)*MATCHING_FACTOR;
  }

  birb.vx += close_dx * AVOID_FACTOR;
  birb.vy += close_dy * AVOID_FACTOR; 

  // avoiding the edges
  if (birb.y > DIM - MARGIN)
    birb.vy -= TURN_FACTOR;

  if (birb.y < MARGIN)   
    birb.vy += TURN_FACTOR;

  if (birb.x < MARGIN)        
    birb.vx += TURN_FACTOR;

  if (birb.x > DIM - MARGIN)
    birb.vx -= TURN_FACTOR;

  // bias
  if (birb.id % LEFT_BIAS_MODULO == 0) { 
    if (birb.vx < 0) {
      birb.bias = Math.min(MAX_BIAS, birb.bias + BIAS_INCREMENT);
    }
    else {
      birb.bias = Math.max(BIAS_INCREMENT, birb.bias - BIAS_INCREMENT);
    }

    birb.vx = (1 - birb.bias)*birb.vx + (birb.bias * -1)
  }
  else if (birb.id % RIGHT_BIAS_MODULO == 0) { 
    if (birb.vx > 0) {
      birb.bias = Math.min(MAX_BIAS, birb.bias + BIAS_INCREMENT);
    }
    else {
      birb.bias = Math.max(BIAS_INCREMENT, birb.bias - BIAS_INCREMENT);
    }

    birb.vx = (1 - birb.bias)*birb.vx + birb.bias
  }

  let speed = Math.sqrt(birb.vx*birb.vx + birb.vy*birb.vy);

  if (speed < MIN_SPEED) {
    birb.vx = (birb.vx / speed) * MIN_SPEED;
    birb.vy = (birb.vy / speed) * MIN_SPEED;
  }
  if (speed > MAX_SPEED) {
    birb.vx = (birb.vx / speed) * MAX_SPEED;
    birb.vy = (birb.vy / speed) * MAX_SPEED;
  }

  birb.x += birb.vx;
  birb.y += birb.vy;
}

// simulation

let flock = generate_flock();

for (let i = 0; i < STEPS; i++) {
    let new_flock = flock.slice();

    for (let j = 0; j < flock.length; j++) {
        update_birb(new_flock[j], flock);
    }

    flock = new_flock;
}

flock.forEach(draw_birb);

let finalLines = [];
bt.join(finalLines, t.lines());

finalLines = bt.scale(finalLines, SCALE_FACTOR);

const cc = bt.bounds(finalLines).cc;
bt.translate(finalLines, [DIM / 2, DIM / 2], cc);

drawLines(finalLines);