/* 
  @title: Harmonograph
  @author: Ansh Kumar
  @snapshot: snapshot3
  
  What's Harmonograph?
  It's a mechanical device that creates geometrical drawings using the motions of a pendulum. And this code is a digital representation of it using mathemmatical functions to simulate the motions and produce patterns.

  Here's a Video that shows what a real life Harmonograph looks like
  https://www.youtube.com/watch?v=S92mZcNIS8w
  
  Why I Made it?
  I wanted to explore how maths and computers an create such beautiful patterns. It allowed me to combine my interest in maths and programming to generate intricate designs!
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

const e= 2.71828

const polylines= t.lines();

const scale = 30 


// Parameters for the first sine wave affecting the X-axis
const p1 = bt.randInRange(0, 2 * Math.PI); // Phase offset: Determines where the sine wave starts. Altering values will shift the pattern horizontally.
const f1 = bt.randInRange(0.1, 10.1); // Frequency: Controls how many oscillations occur. Higher values create more loops in the X direction.
const d1 = bt.randInRange(0, 0.05); // Damping factor: Causes the wave to decrease in amplitude over time. Higher values make the wave decay faster.



// Parameters for the second sine wave affecting the X-axis
const p2 = bt.randInRange(0, 2 * Math.PI); // Phase offset for the second sine wave. Similar to p1 but creates a combined effect with f1 and d1.
const f2 = bt.randInRange(0.1, 10.1); // Frequency for the second sine wave. Alters the pattern complexity along the X-axis.
const d2 = bt.randInRange(0, 0.05); // Damping factor for the second sine wave. Affects how quickly the combined X-axis waves decay.



// Parameters for the first sine wave affecting the Y-axis
const p3 = bt.randInRange(0, 2 * Math.PI); // Phase offset: Similar to p1, but affects the Y-axis. Shifts the pattern vertically.
const f3 = bt.randInRange(0.1, 10.1); // Frequency: Controls the number of oscillations along the Y-axis.
const d3 = bt.randInRange(0, 0.05); // Damping factor: Causes the Y-axis wave to decay over time. Higher values lead to faster decay.



// Parameters for the second sine wave affecting the Y-axis
const p4 = bt.randInRange(0, 2 * Math.PI); // Phase offset for the second sine wave on the Y-axis. Works with p3 to shape the Y pattern.
const f4 = bt.randInRange(0.1, 10.1); // Frequency for the second Y-axis sine wave. Alters the pattern complexity along the Y-axis.
const d4 = bt.randInRange(0, 0.05); // Damping factor for the second Y-axis wave. Affects how quickly the Y pattern decays.


function walk(step) {
    const i = step / 100;
    const x = Math.sin(f1 * i + p1) * Math.pow(e, -d1 * i) + Math.sin(f2 * i + p2) * Math.pow(e, -d2 * i);
    const y = Math.sin(f3 * i + p3) * Math.pow(e, -d3 * i) + Math.sin(f4 * i + p4) * Math.pow(e, -d4 * i);
    t.goTo([scale * x, scale * y]);
    t.down();
    return step < 10000;
}


let step = 0;
while (walk(step)) {
    step++;
}
function centerPolylines(polylines, documentWidth, documentHeight) {
  const cc = bt.bounds(polylines).cc;
  bt.translate(polylines, [documentWidth / 2, documentHeight / 2], cc);
}

let final = t.lines()
centerPolylines(final,width,height)

drawLines(final);
