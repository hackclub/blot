# Blot, the plotter bot from Hack Club

**[💻 Online Editor: Make art](https://blot.hackclub.com/editor)** | **[👀 Gallery](https://blot.hackclub.com/gallery)** | **[🕸 Landing Page](https://blot.hackclub.com)**

Create programmatic art in our web-based editor and submit it to the gallery and we'll send you a CNC machine which can make that art.
Blot is a **"You Ship, We Ship"** project from [Hack Club](https://hackclub.com) (like [Sprig](https://github.com/hackclub/sprig)). 

<img width="500" src="https://github.com/hackclub/blot/assets/27078897/38f394aa-643b-4eb0-926f-06c798f500e0" />

A piece of art made for Blot can be the first program you ever write, but it can also be a challenge for a master programmer. Check out some of the art made already in our [gallery](https://blot.hackclub.com/gallery). Every piece of art you see is actually a program. Many of them create unique pieces everytime the art is run. So you may be looking at an artwork which has never been seen before, even by the creator.

[<img width="500" src="https://github.com/hackclub/blot/assets/27078897/5666011a-089e-44d9-8956-5c283f00ff14"/>](https://blot.hackclub.com/gallery)


# Blot is...

**A custom CNC drawing machine** designed from scratch to introduce you to digital fabrication. 
It's made of 6 unique 3D printed parts with a custom control board and easy to understand firmware, which can be interfaced with through JavaScript in the browser.
Blot is designed in OnShape. Check out the [3D model of the project](https://cad.onshape.com/documents/0bcd2f50d2614ea26189f43b/w/23913e7defc94fc29f7833e6/e/72ea852bfc1822955e506e37?renderMode=0&uiState=6538235d42737a70b1996741).
You can find the [bill of materials here](https://blot.hackclub.com/assembly) and, if you'd like to 3D print your Blot, [the parts are here](https://github.com/hackclub/blot/tree/main/hardware/mechanical/drawing-thing-v4). The entire build costs about $150 dollars. If you're a teen we will give you all the parts for a PR with your an art piece you coded yourself.

<img width="250" alt="parts" src="https://github.com/hackclub/blot/assets/27078897/04ab7345-03fa-4b60-9870-64a99327e8cd">

<img width="250" src="https://github.com/hackclub/blot/assets/27078897/0ffc0ca8-516b-4f9a-b34e-4f09218e41cd"/>

**A web based editor for programmatic art** that we designed specifically for pen plotting with a custom geometry library.
We practiced programmatic pen plotting with [some](https://github.com/LingDong-) [amazing artists](https://static1.squarespace.com/static/63fbc39db5b01b5fa30423db/t/649b424d33b2ce3e0d5b63a5/1687896656015/June+Cohort+Zine.pdf). 
There is so much to learn and explore on the programming and the aesthetic side. 

<img width="500" alt="editor" src="https://github.com/hackclub/blot/assets/27078897/6f444dcf-cd44-4e49-986a-3bd9b57e6593">

# To get started

Check out the examples in the [gallery](https://blot.hackclub.com/gallery) and then follow along with some of our [guides](https://blot.hackclub.com/guides).

<img width="500" src="https://github.com/hackclub/blot/assets/27078897/a072225f-dcaf-4571-bcaa-966d7271247c"/>

The guides are designed to work like visual coding puzzles, which incrementally bring you through building generative art pieces.

The [submission rules to get a Blot for a PR are here](https://github.com/hackclub/blot/blob/main/docs/GET_A_BLOT.md). **You must be a teenager (or younger) to qualify**, but anyone can make art and make a PR. Also...

# It's all Open Source

Every part of Blot is freely available for you to investigate and discover. 
That includes the editor, the hardware design, the electronics, and even the finances around the project.
We think people deserve tools they can take ownership of. That's why we give away the source for free. 

Our projects at Hack Club have hundreds of teenage contributors from all over the world. If you want to learn how to program, we invite you to jump in and start building tools used by thousands.

You're also welcome to participate and use our tools if you aren't a teen (like making art or building your own blot), but our [online community](https://hackclub.com/slack) is for teens only.

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
