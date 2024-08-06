# Blot, the plotter bot from Hack Club

**[🕸 Landing Page](https://blot.hackclub.com)** | **[💻 Online Editor](https://blot.hackclub.com/editor)** | **[👀 Gallery](https://blot.hackclub.com/gallery)**

Create programmatic art in our web-based editor and submit it to the gallery and we'll send you a CNC machine which can make that art for free.
Blot is a [**You Ship, We Ship**](https://github.com/hackclub/blot/tree/main?tab=readme-ov-file#you-ship-we-ship) project from [Hack Club](https://hackclub.com). 

> Everything about Blot is open source. The online editor and drawing library can be freely used by anyone, and we encourage all to submit to the gallery through PRs! However, you must be a teenager or younger to receive a free machine.

<img width="600" alt="blot-white-bg" src="https://github.com/hackclub/blot/assets/27078897/e332631f-1232-4ac5-a573-57b0c570e980" />

A piece of art made for Blot can be the first program you ever write, but it can also be a challenge for a master programmer. Check out some of the art made already in our [gallery](https://blot.hackclub.com/gallery). Every piece of art you see is actually a program. Many of them create unique pieces every time the art is run. You may be looking at an artwork which has never been seen before, even by the creator.

For a short video introduction to Blot [check out our 38 second trailer](https://www.youtube.com/watch?v=d1noJNmfvC0).

<a href="https://www.youtube.com/watch?v=d1noJNmfvC0">
  <img width="500" alt="Screenshot 2024-04-11 at 5 31 07 PM" src="https://github.com/hackclub/blot/assets/27078897/a1ff1494-9624-45ff-ac76-b47da7b7d6e3">
</a>

# How It Works

### 1) Create a piece of programmatic art in the web editor.

To learn the Blot drawing library follow our [getting started guide](https://blot.hackclub.com/editor?guide=start). Check out the examples in the [gallery](https://blot.hackclub.com/gallery) and then follow along with some of our [guides](https://blot.hackclub.com/guides).

<img width="500" alt="editor" src="https://github.com/hackclub/blot/assets/27078897/ec685c69-ec9b-405a-9dbc-fda82c3f1d2b">

### 2) Submit that art to the public gallery.

The [submission rules to get a Blot for a PR are here](https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md). **You must be a teenager (or younger to qualify for a free machine)** but anyone can make art and make a PR.

[<img width="500" src="https://github.com/hackclub/blot/assets/27078897/5666011a-089e-44d9-8956-5c283f00ff14"/>](https://blot.hackclub.com/gallery)

### 3) Receive the parts to build your own Blot that can draw that art in real life.

The [bill of materials can be found here](/docs/BOM.toml) and an [assembly guide here](https://blot.hackclub.com/assembly).

<img width="500" alt="all-parts" src="https://github.com/hackclub/blot/assets/27078897/8559466d-fd36-4126-bf9c-45cb913be6da" />

<img width="500" alt="drawing" src="https://github.com/hackclub/blot/assets/27078897/87f7e5b3-1aee-4082-8ae5-36006ec1ab0d" />

<!-- <img height="341" alt="drawing" src="https://github.com/hackclub/blot/assets/27078897/2f7c9c17-3b67-4674-b2ca-2a4dbd26a3d1" /> -->

# Blot is...

**A custom CNC drawing machine** designed from scratch to introduce you to digital fabrication. 
It's made of 6 unique 3D printed parts with a custom control board and easy to understand firmware, which can be interfaced with through JavaScript in the browser.
Blot is designed in OnShape. Check out the [3D model of the project](https://cad.onshape.com/documents/536478c2ac00624edd8e2182/w/945ceabd15096661108b7650/e/61fd4346c9fdab983c6ba24d?renderMode=0&uiState=66980ee799bd766f406eb9c8).
You can find the [bill of materials here](https://blot.hackclub.com/assembly) and, if you'd like to 3D print your Blot, [the parts are here](https://github.com/hackclub/blot/tree/main/hardware/mechanical/drawing-thing-v4). The entire build costs about $150 dollars. If you're a teen we will give you all the parts for a PR with your an art piece you coded yourself.

**A web based editor for programmatic art** that we designed specifically for pen plotting with a [custom geometry library](/docs/DOCUMENTATION.md).
We practiced programmatic pen plotting with [some](https://github.com/LingDong-) [amazing artists](https://static1.squarespace.com/static/63fbc39db5b01b5fa30423db/t/649b424d33b2ce3e0d5b63a5/1687896656015/June+Cohort+Zine.pdf). 
There is so much to learn and explore on the programming and the aesthetic side. 

<img width="300" alt="parts" src="https://github.com/hackclub/blot/assets/27078897/04ab7345-03fa-4b60-9870-64a99327e8cd">

<img width="300" src="https://github.com/hackclub/blot/assets/27078897/0ffc0ca8-516b-4f9a-b34e-4f09218e41cd"/>

# Blot Docs

Here are a collection of resources for Blot:

- [Complete documentation of the drawing library in the editor](https://github.com/hackclub/blot/blob/main/docs/DOCUMENTATION.md)
- [Short documentation shown in the Blot editor](https://github.com/hackclub/blot/blob/main/public/TOOLKIT.md)
- [The Blot assembly and operation guide](https://github.com/hackclub/blot/blob/main/docs/assembly/ASSEMBLY.md)
- [The source of truth bill of materials (BOM)](https://github.com/hackclub/blot/blob/main/docs/BOM.toml)
- [Criteria for how to get a Blot and a guide on how to submit a PR](https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md)
- [A guide on how to review Blot submissions](https://github.com/hackclub/blot/blob/main/docs/BLOT_REVIEW.md)
- [A brief guide on how to approve Blot requests for Blot shipments](https://github.com/hackclub/blot/blob/main/docs/APPROVING_BLOT_REQUESTS.md)
- [Information on how we order Blot supplies from our manufacturing partners](https://github.com/hackclub/blot/blob/main/docs/ORDERING_BLOT_KITS.md)
- [The files for the 3D printed parts](https://github.com/hackclub/blot/tree/main/hardware/mechanical/blot-v6)
- [The source files for the control PCB](https://github.com/hackclub/blot/tree/main/hardware/motor-control-board/circuit/controller)
- [The source files for the power delivery PCB](https://github.com/hackclub/blot/tree/main/hardware/motor-control-board/circuit/power-delivery)
- [The firmware for the Blot control board](https://github.com/hackclub/blot/blob/main/hardware/motor-control-board/firmware/firmware.ino)
- [Sample Blot based lesson plan](https://github.com/hackclub/blot/blob/main/docs/lesson/LESSON-PLAN.md)
- [Video of a Blot being assembled](https://www.youtube.com/watch?v=7N-Nu6_oo4I)
- [Video of operating a Blot](https://www.youtube.com/watch?v=qDP5CNjFHJE)
- [Video of making a Blot submission](https://www.youtube.com/watch?v=AmbjNEPuv14)
- [Video Blot promo trailer](https://www.youtube.com/watch?v=d1noJNmfvC0)
- [Video introduction to JavaScript in the context of Blot](https://www.youtube.com/watch?v=3KAan1PzmxA)
- [Video introduction to Blot editor](https://www.youtube.com/watch?v=OZ9KaFr1V_o)
- [Video demonstrating working through a Blot guide](https://www.youtube.com/watch?v=mP4rUdaF8ng)

# What are People Making with Blot

Blot has been in development since January 2023 and was released April 2024. We've had lots of people use the Blot editor and the Blot machine to create visual art, run workshops and as part of interactive installations. Here's a sense of what can be done with Blot.

### Programmatic Art

There are all sorts of styles of programmatic art. Here are some examples of great Blot submissions that show a range of styles. This list is by no means exhaustive.

**The natural scene** is a common source of artistic inspiration. This could be called figurative or representational art when it tries to depict a real thing with some fidelity. One example are these roots by Kai (age 17).

<a href="https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/roots-kai/index.js">
  <img width="500" alt="collection" src="https://github.com/hackclub/blot/assets/27078897/a67fec4c-11cc-48b3-981f-5f4108028c03">
</a>

**The geometric pattern** is natural avenue to pursue when making art with computers because code is a great way to describe patterns. Oz's approach of clipping overlapping segments creates a wonderful sense of depth.

<a href="https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/braid-oz/index.js">
  <img width="500" alt="0" src="https://github.com/hackclub/blot/assets/27078897/361e448d-0eeb-4aa2-818e-2831b373efb2">
</a>

**The tech demo (with composition)** is focusing on a specific technical approach like in Henry's (age 15) ray marcher. The art piece isn't complete though until the artists uses the technique to make a composition.

<a href="https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/raymarching-henry/index.js">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/hackclub/blot/assets/61765149/d65464eb-8cc2-4bf3-be82-0b4cc12070bd">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/hackclub/blot/assets/27078897/90c01a52-0404-423f-8ae9-763bc591ff9f">
    <img width="500" alt="0" src="https://github.com/hackclub/blot/assets/27078897/90c01a52-0404-423f-8ae9-763bc591ff9f">
  </picture>
</a>


**The data transformation** can be seen in Kieran's (age 15) self portrait. It takes data from an SVG but modifies it programmatically to produce an art piece. This approach could be used to visualize data that may not of been visual to begin with.

<a href="https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/self_portrait-kieran/index.js">
  <img width="500" alt="0" src="https://github.com/hackclub/blot/assets/27078897/145ebbb5-7187-4062-b41f-c6961c5156b4">
</a>

**The concept** is important with any artwork and can be mixed with any of the genres above. Ultimately an interesting idea can be what elevates something that is visually pretty simple, one example by Ayush is the Blot's own self portrait.

<a href="https://blot.hackclub.com/editor?src=https://raw.githubusercontent.com/hackclub/blot/main/art/blot-ayush/index.js">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/hackclub/blot/assets/61765149/12044cdf-a498-438c-814b-48622488e42f">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/hackclub/blot/assets/27078897/1f367d9b-aa74-4fca-8623-259a06800335">
    <img width="500" alt="0" src="https://github.com/hackclub/blot/assets/27078897/1f367d9b-aa74-4fca-8623-259a06800335">
  </picture>
</a>

For way more examples check out the [gallery](https://blot.hackclub.com/gallery).

### Blot as Creative Material

You ship we ship projects are developed to provide technological creative material. The Blot was developed to not just create visual programs on computers but also to explore robotic and interactive technology. Here are some ways the machine or project has been used to create interactive technology experiences.

[**Lineflow**](https://github.com/leomcelroy/lineflow) was developed as an interactive art piece for an MIT Museum event. Participants would create a single line drawing on the computer and would then watch a simulation of a line folding into their drawing. Three frames of that simulation were strung together to create a timeline of the animation that would be drawn by a Blot to be brought home by the participant.

<img width="500" src="https://github-production-user-asset-6210df.s3.amazonaws.com/27078897/291394243-0333b4ca-52cd-4bca-9141-44d05d2775ce.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240411%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240411T224432Z&X-Amz-Expires=300&X-Amz-Signature=ece92c400e0e3f3a9dddd4ca625b731df08c1eb5e04acf045f026896dee79b44&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=731753090">

<img width="500" src="https://github.com/hackclub/blot/assets/27078897/bfdb83c4-5b65-419f-8b3a-4ceab3bb7f33"/>

**The infinite gallery** at [Outernet](https://www.youtube.com/watch?v=O1s5HqSqKi0) (Hack Club's 2023 summer hackathon). Leo, Kai, and Henry constructed a black out box that contained an infinite art gallery. Participant's entered a room sized black box with one wall illuminated with artwork and a giant joystick in the center. They could navigate the gallery with the joystick and as they explored new (possibly never before seen) art was generated based on their location. 

<img height="500" src="https://github.com/hackclub/blot/assets/27078897/c484d7fe-fb72-4d44-90b5-d7ec0ffe3204">

**Chinese calligraphy workshop** was developed for and run at the [Hack Club leader summit 2024](https://www.youtube.com/watch?v=UZEm5lONg7g) by Bright Li (age 15). During it participants learned how to draw Chinese calligraphy programmatically and then handed ink brushes to Bright's Blot robot to put the drawings to the page.

<img width="500" alt="Screenshot 2024-04-11 at 6 04 53 PM" src="https://github.com/hackclub/blot/assets/27078897/0de4df40-a742-4f9b-a2eb-d17fdd3a1e22">

# It's All Open Source

Every part of Blot is freely available for you to investigate and discover. 
That includes the editor, the hardware design, the electronics, and even the finances around the project.
We think people deserve tools they can take ownership of. That's why we give away the source for free. 

Our projects at Hack Club have hundreds of teenage contributors from all over the world. If you want to learn how to program, we invite you to jump in and start building tools used by thousands.

You're also welcome to participate and use our tools if you aren't a teen (like making art or building your own blot), but our [online community](https://hackclub.com/slack) is for teens only.

# You Ship, We Ship

At Hack Club we're reimagining a new type of public education for technology. We believe people learn best by creating things they care about and sharing them with others. We build open source creative tools with young people all around the world. These tools are gateways to new subjects in technology like [embedded systems](https://sprig.hackclub.com), [circuits](https://onboard.hackclub.com) or digital fabrication robotics. When teenagers build things with our tools we send them more creative materials for free. 

Our goal is to build a new type of library online that offers learners not just media to consume but tools to create. And it is free and open source to all. We're just getting started...

# Development

Join the `#blot` channel on the [Hack Club Slack](https://hackclub.com/slack). 

The Blot editor is run with an Express server.

After installing `Git`, `Node.js`, and `Yarn`, clone the repo.

```
git clone https://github.com/hackclub/blot/
yarn install
```

To run the development server:

```
yarn dev
```

# License
The Hack Club Blot is open source and licensed under the [MIT License](https://github.com/hackclub/blot/LICENSE.md). Fork, remix, and make it your own! Pull requests and other contributions greatly appreciated.

# Acknowledgements

Many people have contributed to Blot, to mention a few and give much thanks too...

MIT's Center for Bits and Atoms for providing expert advice and occasionally a space to work. 

Sam Hu and his team at ISourceAsia for supplying Blot parts and becoming a critical part of the Blot team. 

Paul Hamilton for his contributions to embedded circuit designs.

Oz Nova for writing an excellent getting started guide.

