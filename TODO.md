# So many things TODO

There are many tasks left in the development of our drawing machine which will become one of the best ways to get into digital fabrication. We are rethinking and remaking how hackable these types of machines can be with the [Modular Things project](https://github.com/modular-things/modular-things). Tasks range from mechanical design, to low-level firmware, and high-level interfaces.

Below is a list of various things we are working on, and ways you can engage with the tasks at hand or the associated concepts.

## Hardware

### Mechanical

__Design a pen holder.__
We still need to finalize the part that makes this machine a drawing machine, the pen holder!
We put out an open challange to help with this which you can find [here](https://gist.github.com/exu3/e5c1469467667c8790b3f5bda7172f39).

__Build your own machine.__
You can already build your own machine if you have access to a 3D printer. 
The [bill of materials can be found here](https://github.com/hackclub/drawing-thing/blob/main/BOM.md). You can also find it on [Printables](https://www.printables.com/model/425878-drawing-thing-v10-3d-printed-carriage) for ease of downloading files, but the BOM on GitHub will be more up-to-date.

### Electrical

__Remake the circuits in SVG-PCB.__
The [circuits used in the system are designed here](https://github.com/modular-things/modular-things-circuits). 
I would love to see people remake the circuit designs in [SVG-PCB](https://leomcelroy.com/svg-pcb-website/#/home).

__Create a board-to-board link layer.__
We don't have anyway to connect boards to each other. Right now they are all connected to the computer through USB.

__Create a bus.__
Currently our system uses point-to-point connections. 
It would be more efficient to design a bus (one-to-many connection) for modular things. 
Some thoughts on [bus design for modular things are available here](https://github.com/modular-things/modular-bus).

## Software

### Editor

__Add console to the editor.__
Right now when you run a program in the editor it runs everything.
A console would allow you to run select functions and also log outputs.
Pranav is working on this.

__Create interface to drawing machine in the modular things editor.__
Here is some [skeleton for an interface](https://github.com/modular-things/modular-things/blob/main/examples/machine-interface.js) which isn't hooked up to any machine.
_link screenshot of interface example?_

### Firmware

__Sequential motor control.__
We need smoother motion for our machine. 
Right now we stop at each corner, it would be better to interpolate between them.

__Clean up OSAP the networking library.__
Jake and I are working on making OSAP more comprehensible. 
I made a [toy implementaion recreating some of OSAP's functionality](https://github.com/leomcelroy/nosap).
Making a visualizer for OSAP networks would be a great project.

## Engagement (Interaction Mode/Handles)

__Make some parametric art.__
Make some generative art which could be drawn by a plotter. For some examples of this check out the blogs linked below.

__Make a parametric generator.__
You can also get started working on generative design and pen plotting. 
[Drawingbots](https://drawingbots.net/) is a good resource. 
Specifically the [tool section](https://drawingbots.net/knowledge/tools) has a bunch of programs for making plottable patterns.


__Gallery.__
_Functional_ designs and generators with coherent and consistent interfaces. 
Something like [Printables](https://printables.com) but with the source for the designs available.

### Weekly Updates

Each week or so we post an update to our [`CHANGELOG.md`](./CHANGELOG.md).

## General Inspiration

Here are some blogs about plotting which are worth checking out:

- https://revdancatt.com/
- https://penplotterartwork.com/
- https://greweb.me/
- https://targz.fr/
- https://larswander.com/
- https://www.v3ga.net/
- https://bylr.info/
- http://andymakes.com/#Plotter
- https://www.eyesofpanda.com/
- https://mattdesl.svbtle.com/pen-plotter-1
- https://muffinman.io/art/
