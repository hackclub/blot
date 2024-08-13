import { runCodeInner } from "../src/runCodeInner.js";
import { makeIncluded } from "../src/makeIncluded.js";

async function runSync(code) {
  const { globalScope, turtles, log, docDimensions } = makeIncluded();
  await runCodeInner(code, globalScope, "../dist");
  return turtles;
}

document.getElementById("blot-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const code = document.getElementById("blot-code").value;
  const penUpGcode = document.getElementById("pen-up-gcode").value;
  const penDownGcode = document.getElementById("pen-down-gcode").value;
  const travelFeedrate = parseInt(document.getElementById("travel-feedrate").value);
  const drawFeedrate = parseInt(document.getElementById("drawing-feedrate").value);
  const turtles = await runSync(code);
  console.log(turtles);
  document.getElementById("gcode-output").innerText = JSON.stringify(turtles, null, 2);
  const polylines = turtles.map(x => x.path).flat();
  let output = "";
  for (const polyline of polylines) {
    for (let i = 0; i < polyline.length; i++) {
      const [x, y] = polyline[i];
      if (i === 0) {
        output += penUpGcode + "\n";
      } else if (i === 1) {
        output += penDownGcode + "\n";
      }
      output += `G1 X${Math.round((x + Number.EPSILON) * 100) / 100} Y${Math.round((y + Number.EPSILON) * 100) / 100} F${i === 0 ? travelFeedrate : drawFeedrate}\n`;
    }
  }
  output += penUpGcode + "\n";
  console.log(output);
  document.getElementById("gcode-output").textContent = output;
});

document.getElementById("save-gcode").addEventListener("click", () => {
  console.log(`saving ${document.getElementById("gcode-output").textContent.length} chars`)
  const element = document.createElement("a");
  const file = new Blob([document.getElementById("gcode-output").textContent], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = "output.gcode";
  element.click();
});