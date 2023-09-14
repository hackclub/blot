import { i as createVNode, s as spreadAttributes, F as Fragment } from "./astro.2c740cbe.mjs";
import "html-escaper";
import "cookie";
import "kleur/colors";
import "path-to-regexp";
import "mime";
import "string-width";
const images = {};
function updateImageReferences(html2) {
  return html2.replaceAll(
    /__ASTRO_IMAGE_="([^"]+)"/gm,
    (full, imagePath) => spreadAttributes({ src: images[imagePath].src, ...images[imagePath].attributes })
  );
}
const html = updateImageReferences('<h2 id="blot-instructions">Blot instructions</h2>\n<p>Below is a list of all parts needed to construct your Blot. Keep in mind that the colors shown below are not representative of the actual color of the components. The components are colored differently to ease differentiation when going through these instructions.</p>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Part</th><th>Quantity</th><th>Image</th></tr></thead><tbody><tr><td>M5x30</td><td>?</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/0image0056.png" alt="aaa" width="100"></td></tr><tr><td>M5x20</td><td>?</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/2image0058.png" alt="aaa" width="100"></td></tr><tr><td>M5x10</td><td>?</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/3image0059.png" alt="aaa" width="100"></td></tr><tr><td>M3x10</td><td>8</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/1image0057.png" alt="aaa" width="100"></td></tr><tr><td>Shim</td><td>?</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/4image0060.png" alt="aaa" width="100"></td></tr><tr><td>Eccentric<br>Spacer</td><td>5</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/8image0055.png" alt="aaa" width="100"></td></tr><tr><td>Spacer</td><td>?</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/5image0061.png" alt="aaa" width="100"></td></tr><tr><td>V-Wheel</td><td>8</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/6image0053.png" alt="aaa" width="100"></td></tr><tr><td>Idler bearing</td><td>10</td><td><img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/7image0054.png" alt="aaa" width="100"></td></tr><tr><td>Timing Belt<br>Pulley</td><td>2</td><td><img src="https://cloud-ailzl7xby-hack-club-bot.vercel.app/1image0068.png" alt="aaa" width="100"></td></tr><tr><td>Rubber<br>Feet</td><td>4</td><td><img src="" alt="aaa" width="100"></td></tr><tr><td>Carriage</td><td>1</td><td><img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/0image0062.png" alt="aaa" width="100"></td></tr><tr><td>Tool Head</td><td>1</td><td><img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/1image0063.png" alt="aaa" width="100"></td></tr><tr><td>Printed Rail</td><td>1</td><td><img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/2image0064.png" alt="aaa" width="100"></td></tr><tr><td>Motor Leg</td><td>2</td><td><img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/3image0065.png" alt="aaa" width="100"></td></tr><tr><td>Belt Clip</td><td>1</td><td><img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/4image0066.png" alt="aaa" width="100"></td></tr><tr><td>Stepper<br>Motor</td><td>2</td><td><img src="https://cloud-ailzl7xby-hack-club-bot.vercel.app/0image0067.png" alt="aaa" width="100"></td></tr></tbody></table>\n<hr>\n<h2 id="carriage-assembly">Carriage assembly</h2>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/1image0001.png" alt="aaa" width="300"><br>\nInsert 4 nuts into the nut traps on the back of the carriage. Nut traps are hexagonal holes which nuts fit into.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/2image0002.png" alt="aaa" width="300"><br>\nNext, create 4 bearing assemblies in the manner shown above using M5x20mm screws, 2 Idler bearings, and shims.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/3image0003.png" alt="aaa" width="300"><br>\nFlip over the carriage, and install your bearing assemblies into the carriage.</p>\n<hr>\n<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/4image0004.png" alt="aaa" width="300">\n<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/5image0005.png" alt="aaa" width="300"><br>\nInsert 8 nuts into the remaining nut traps before proceeding to the next step.\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/7image0007.png" alt="aaa" width="300"><br>\nOn the back of the carriage, 4 circular holes can be found. Two of these holes are large, and two are smaller. Identify the two large circular holes, circled above.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"><br>\nAssemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and eccentric spacers.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/8image0008.png" alt="aaa" width="300"><img src="https://cloud-poei2v4f9-hack-club-bot.vercel.app/0image0074.png" alt="aaa" width="300"><br>\nScrew these assemblies into the large circular holes identified earlier. Ensure that the eccentric spacers are flush with the part they’re screwed into, as shown above.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/9image0009.png" alt="aaa" width="300"><br>\nNext, assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and spacers. Do not use eccentric spacers in these assemblies.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/0image0010.png" alt="aaa" width="300"><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/1image0011.png" alt="aaa" width="300"><br>\nScrew in these two V-wheel assemblies into the remaining two circular holes. We will now repeat this process for the other side.</p>\n<hr>\n<p><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/2image0012.png" alt="aaa" width="300"><br>\nFlip over the carriage, and identify the larger set of circular holes as shown above.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"><br>\nAssemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and eccentric spacers.</p>\n<hr>\n<p><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/3image0013.png" alt="aaa" width="300"><br>\nScrew these assemblies into the large circular holes identified earlier.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/9image0009.png" alt="aaa" width="300"><br>\nNext, assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and spacers. Do not use eccentric spacers in these assemblies.</p>\n<hr>\n<p><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/4image0014.png" alt="aaa" width="300"><br>\nScrew in these two V-wheel assemblies into the remaining two circular holes.</p>\n<hr>\n<p><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/5image0015.png" alt="aaa" width="300"><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/0image0016.png" alt="aaa" width="300"><br>\nYour final carriage assembly should now look like this.</p>\n<hr>\n<h2 id="leg-assembly">Leg assembly</h2>\n<p><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/4image0069.png" alt="aaa" width="300"><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/5image0070.png" alt="aaa" width="300"><br>\nInsert a timing belt pulley onto a stepper motor, and tighten the collar screw so that the pulley is flush with the motor shaft.</p>\n<hr>\n<p><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/0image0017.png" alt="aaa" width="300"><br>\nInsert a motor into the motor mount, with its cable facing away from the legs, as identified above. Ensure that the shaft of the motor is going through the large circular hole in the center of the motor mount.</p>\n<hr>\n<p><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/1image0018.png" alt="aaa" width="300"><br>\nScrew the motor in place with 4 m3x10 screws. Do this assembly twice, once for each leg.</p>\n<hr>\n<h2 id="printed-rail-assembly">Printed rail assembly</h2>\n<p><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/2image0019.png" alt="aaa" width="300"><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/3image0020.png" alt="aaa" width="300"><br>\nInsert a nut into the nut trap as identified above.</p>\n<hr>\n<h2 id="toolhead-assembly">Toolhead assembly</h2>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/0image0021.png" alt="aaa" width="300"><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/1image0022.png" alt="aaa" width="300"><br>\nInsert 4 nuts into each of the nut traps.</p>\n<hr>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/2image0023.png" alt="aaa" width="300"><br>\nIdentify the large hole on the back of the tool head.</p>\n<hr>\n<p><img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"><br>\nAssemble a V-wheel assembly as shown above using a V-wheel, m5x35 screw, and an eccentric spacer.</p>\n<hr>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/3image0024.png" alt="aaa" width="300"><br>\nInsert the V-wheel assembly into the hole previously identified and screw it in.</p>\n<hr>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/4image0025.png" alt="aaa" width="300"><br>\nAssemble 2 V-wheel assemblies as shown above using V-wheels and m5x35 screws.</p>\n<hr>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/5image0026.png" alt="aaa" width="300"><br>\nScrew the two assemblies you just assembled into the remaining two holes on the back of the tool head.</p>\n<hr>\n<p><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/6image0027.png" alt="aaa" width="300"><br>\nYour final toolhead assembly should now look like this.</p>\n<hr>\n<h2 id="final-assembly">Final assembly</h2>\n<p><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/0image0028.png" alt="aaa" width="300"><br>\nInsert one aluminum extrusion into one of your leg assemblies.</p>\n<hr>\n<p><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/1image0029.png" alt="aaa" width="300"><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/2image0030.png" alt="aaa" width="300"><br>\nIdentify all three circular mounting holes on the end of the leg.</p>\n<hr>\n<p><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/3image0031.png" alt="aaa" width="300"><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/4image0032.png" alt="aaa" width="300"><br>\nInsert a t-nut into the rail, and slide it under one of the circular holes on the leg, so that the hole of the t-nut and the hole of the leg line up.</p>\n<hr>\n<p><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/5image0033.png" alt="aaa" width="300"><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/6image0034.png" alt="aaa" width="300"><br>\nScrew the leg to the rail using M5x10mm screws. Repeat this for all three holes previously identified.</p>\n<hr>\n<p><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/7image0035.png" alt="aaa" width="300"><br>\nAttach the carriage onto the rail with the belt bearings facing upwards. Should this prove difficult, you may need to adjust the eccentric spacers using the 8mm wrench provided. turning the eccentric spacers changes the width of the space between the v-wheels.</p>\n<hr>\n<p>attach the other leg, enclosing the carriage between both legs.</p>\n<p>Attach the printed rail to one side of the other aluminum extrusion, using the same t-nut+ m5x10mm screw technique as with the feet.\nInsert the rail into the top of the carriage. Then, flip the blot over so that its feet are facing up.</p>\n<p>Create another belt bearing assembly and ensure the belt is behind it. Then, screw it into the printed rail.</p>\n<p>Next, we need to attach the belt clip.\nSimply attach it to the end of the printed-rail extrusion and screw it on using the same t-nut technique.</p>\n<p>Here comes the hardest part: routing the belt. Basically it goes like this:</p>\n<p>Ensure it goes around the shafts of both motors, and runs between the belt bearings within the carriage.</p>\n<p>Bend the belt around on itself (with the teeth facing outwards) in order to hold it tight.</p>');
const frontmatter = {};
const file = "/Users/jchen/Documents/Programming/haxidraw/new/ASSEMBLY.md";
const url = void 0;
function rawContent() {
  return `## Blot instructions

Below is a list of all parts needed to construct your Blot. Keep in mind that the colors shown below are not representative of the actual color of the components. The components are colored differently to ease differentiation when going through these instructions.

| Part                  | Quantity | Image                                                                                              |
| --------------------- | -------- | -------------------------------------------------------------------------------------------------- |
| M5x30                 | ?        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/0image0056.png" alt="aaa" width="100"/> |
| M5x20                 | ?        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/2image0058.png" alt="aaa" width="100"/> |
| M5x10                 | ?        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/3image0059.png" alt="aaa" width="100"/> |
| M3x10                 | 8        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/1image0057.png" alt="aaa" width="100"/> |
| Shim                  | ?        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/4image0060.png" alt="aaa" width="100"/> |
| Eccentric<br>Spacer   | 5        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/8image0055.png" alt="aaa" width="100"/> |
| Spacer                | ?        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/5image0061.png" alt="aaa" width="100"/> |
| V-Wheel               | 8        | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/6image0053.png" alt="aaa" width="100"/> |
| Idler bearing         | 10       | <img src="https://cloud-agax6w6e0-hack-club-bot.vercel.app/7image0054.png" alt="aaa" width="100"/> |
| Timing Belt<br>Pulley | 2        | <img src="https://cloud-ailzl7xby-hack-club-bot.vercel.app/1image0068.png" alt="aaa" width="100"/> |
| Rubber<br>Feet        | 4        | <img src="" alt="aaa" width="100"/>                                                                |
| Carriage              | 1        | <img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/0image0062.png" alt="aaa" width="100"/> |
| Tool Head             | 1        | <img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/1image0063.png" alt="aaa" width="100"/> |
| Printed Rail          | 1        | <img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/2image0064.png" alt="aaa" width="100"/> |
| Motor Leg             | 2        | <img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/3image0065.png" alt="aaa" width="100"/> |
| Belt Clip             | 1        | <img src="https://cloud-dxz9fnfpj-hack-club-bot.vercel.app/4image0066.png" alt="aaa" width="100"/> |
| Stepper<br>Motor      | 2        | <img src="https://cloud-ailzl7xby-hack-club-bot.vercel.app/0image0067.png" alt="aaa" width="100"/> |

---

## Carriage assembly

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/1image0001.png" alt="aaa" width="300"/><br>
Insert 4 nuts into the nut traps on the back of the carriage. Nut traps are hexagonal holes which nuts fit into.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/2image0002.png" alt="aaa" width="300"/><br>
Next, create 4 bearing assemblies in the manner shown above using M5x20mm screws, 2 Idler bearings, and shims.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/3image0003.png" alt="aaa" width="300"/><br>
Flip over the carriage, and install your bearing assemblies into the carriage.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/4image0004.png" alt="aaa" width="300"/>
<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/5image0005.png" alt="aaa" width="300"/><br>
Insert 8 nuts into the remaining nut traps before proceeding to the next step.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/7image0007.png" alt="aaa" width="300"/><br>
On the back of the carriage, 4 circular holes can be found. Two of these holes are large, and two are smaller. Identify the two large circular holes, circled above.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"/><br>
Assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and eccentric spacers.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/8image0008.png" alt="aaa" width="300"/><img src="https://cloud-poei2v4f9-hack-club-bot.vercel.app/0image0074.png" alt="aaa" width="300"/><br>
Screw these assemblies into the large circular holes identified earlier. Ensure that the eccentric spacers are flush with the part they're screwed into, as shown above.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/9image0009.png" alt="aaa" width="300"/><br>
Next, assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and spacers. Do not use eccentric spacers in these assemblies.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/0image0010.png" alt="aaa" width="300"/><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/1image0011.png" alt="aaa" width="300"/><br>
Screw in these two V-wheel assemblies into the remaining two circular holes. We will now repeat this process for the other side.

---

<img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/2image0012.png" alt="aaa" width="300"/><br>
Flip over the carriage, and identify the larger set of circular holes as shown above.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"/><br>
Assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and eccentric spacers.

---

<img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/3image0013.png" alt="aaa" width="300"/><br>
Screw these assemblies into the large circular holes identified earlier.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/9image0009.png" alt="aaa" width="300"/><br>
Next, assemble 2 V-wheel assemblies as shown above using V-wheels, m5x35 screws, and spacers. Do not use eccentric spacers in these assemblies.

---

<img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/4image0014.png" alt="aaa" width="300"/><br>
Screw in these two V-wheel assemblies into the remaining two circular holes.

---

<img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/5image0015.png" alt="aaa" width="300"/><img src="https://cloud-nu3r4cixj-hack-club-bot.vercel.app/0image0016.png" alt="aaa" width="300"/><br>
Your final carriage assembly should now look like this.

---

## Leg assembly

<img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/4image0069.png" alt="aaa" width="300"/><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/5image0070.png" alt="aaa" width="300"/><br>
Insert a timing belt pulley onto a stepper motor, and tighten the collar screw so that the pulley is flush with the motor shaft.

---

<img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/0image0017.png" alt="aaa" width="300"/><br>
Insert a motor into the motor mount, with its cable facing away from the legs, as identified above. Ensure that the shaft of the motor is going through the large circular hole in the center of the motor mount.

---

<img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/1image0018.png" alt="aaa" width="300"/><br>
Screw the motor in place with 4 m3x10 screws. Do this assembly twice, once for each leg.

---

## Printed rail assembly

<img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/2image0019.png" alt="aaa" width="300"/><img src="https://cloud-nzd74pzqy-hack-club-bot.vercel.app/3image0020.png" alt="aaa" width="300"/><br>
Insert a nut into the nut trap as identified above.

---

## Toolhead assembly

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/0image0021.png" alt="aaa" width="300"/><img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/1image0022.png" alt="aaa" width="300"/><br>
Insert 4 nuts into each of the nut traps.

---

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/2image0023.png" alt="aaa" width="300"/><br>
Identify the large hole on the back of the tool head.

---

<img src="https://cloud-7i4fszop8-hack-club-bot.vercel.app/6image0006.png" alt="aaa" width="300"/><br>
Assemble a V-wheel assembly as shown above using a V-wheel, m5x35 screw, and an eccentric spacer.

---

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/3image0024.png" alt="aaa" width="300"/><br>
Insert the V-wheel assembly into the hole previously identified and screw it in.

---

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/4image0025.png" alt="aaa" width="300"/><br>
Assemble 2 V-wheel assemblies as shown above using V-wheels and m5x35 screws.

---

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/5image0026.png" alt="aaa" width="300"/><br>
Screw the two assemblies you just assembled into the remaining two holes on the back of the tool head.

---

<img src="https://cloud-4l49hjvuu-hack-club-bot.vercel.app/6image0027.png" alt="aaa" width="300"/><br>
Your final toolhead assembly should now look like this.

---

## Final assembly

<img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/0image0028.png" alt="aaa" width="300"/><br>
Insert one aluminum extrusion into one of your leg assemblies.

---

<img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/1image0029.png" alt="aaa" width="300"/><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/2image0030.png" alt="aaa" width="300"/><br>
Identify all three circular mounting holes on the end of the leg.

---

<img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/3image0031.png" alt="aaa" width="300"/><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/4image0032.png" alt="aaa" width="300"/><br>
Insert a t-nut into the rail, and slide it under one of the circular holes on the leg, so that the hole of the t-nut and the hole of the leg line up.

---

<img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/5image0033.png" alt="aaa" width="300"/><img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/6image0034.png" alt="aaa" width="300"/><br>
Screw the leg to the rail using M5x10mm screws. Repeat this for all three holes previously identified.

---

<img src="https://cloud-8faenwnrg-hack-club-bot.vercel.app/7image0035.png" alt="aaa" width="300"/><br>
Attach the carriage onto the rail with the belt bearings facing upwards. Should this prove difficult, you may need to adjust the eccentric spacers using the 8mm wrench provided. turning the eccentric spacers changes the width of the space between the v-wheels.

---

attach the other leg, enclosing the carriage between both legs.

Attach the printed rail to one side of the other aluminum extrusion, using the same t-nut+ m5x10mm screw technique as with the feet.
Insert the rail into the top of the carriage. Then, flip the blot over so that its feet are facing up.

Create another belt bearing assembly and ensure the belt is behind it. Then, screw it into the printed rail.

Next, we need to attach the belt clip.
Simply attach it to the end of the printed-rail extrusion and screw it on using the same t-nut technique.

Here comes the hardest part: routing the belt. Basically it goes like this:

Ensure it goes around the shafts of both motors, and runs between the belt bearings within the carriage.

Bend the belt around on itself (with the teeth facing outwards) in order to hold it tight.
`;
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [{ "depth": 2, "slug": "blot-instructions", "text": "Blot instructions" }, { "depth": 2, "slug": "carriage-assembly", "text": "Carriage assembly" }, { "depth": 2, "slug": "leg-assembly", "text": "Leg assembly" }, { "depth": 2, "slug": "printed-rail-assembly", "text": "Printed rail assembly" }, { "depth": 2, "slug": "toolhead-assembly", "text": "Toolhead assembly" }, { "depth": 2, "slug": "final-assembly", "text": "Final assembly" }];
}
async function Content() {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;
  const contentFragment = createVNode(Fragment, { "set:html": html });
  return contentFragment;
}
Content[Symbol.for("astro.needsHeadRendering")] = true;
export {
  Content,
  compiledContent,
  Content as default,
  file,
  frontmatter,
  getHeadings,
  images,
  rawContent,
  url
};
