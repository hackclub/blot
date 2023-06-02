// import { createHaxidraw } from "../../motor-control-board/js/createHaxidraw.js";
import { GLOBAL_STATE } from "./GLOBAL_STATE.js";
import { init } from "./init.js";
import "./videoLoop.js";


/* TURTLE SCRIPT */

let spu = 10;
const SCALE = [.2, -.2].map(x => x*spu);

// const t = new Turtle();

// function main() {
//   t.up();
//   t.goTo(2, 1);
//   t.down();
//   for (let i = 0; i < 30; i++) {
//     t.forward(.1*i);
//     t.right(90);
//   }


//   const limits = {
//     x: [0, machineWidth*SCALE[0]].sort((a, b) => a-b),
//     y: [0, machineHeight*SCALE[1]].sort((a, b) => a-b)
//   };

//   // t.draw(SCALE, limits);

// }


// main();

window.addEventListener("load", e => {
  init(GLOBAL_STATE);
});




