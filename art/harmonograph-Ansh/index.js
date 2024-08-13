/* 
  @title: Harmonograph
  @author: Ansh Kumar
  @snapshot: 
*/

const width = 125;
const height = 125;

setDocDimensions(width, height);

const t = new bt.Turtle();

const e= 2.71828

const polylines= t.lines();

const scale = 30 

//Here you can pass custom values too
const p1 = bt.randInRange(0, 2 * Math.PI);
const f1 = bt.randInRange(0.1, 10.1);
const d1 = bt.randInRange(0, 0.05);

const p2 = bt.randInRange(0, 2 * Math.PI);
const f2 = bt.randInRange(0.1, 10.1);
const d2 = bt.randInRange(0, 0.05);

const p3 = bt.randInRange(0, 2 * Math.PI);
const f3 = bt.randInRange(0.1, 10.1);
const d3 = bt.randInRange(0, 0.05);

const p4 = bt.randInRange(0, 2 * Math.PI);
const f4 = bt.randInRange(0.1, 10.1);
const d4 = bt.randInRange(0, 0.05);
//Till here

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
