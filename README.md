# Drawing Thing

We're in the early stages of developing our next "you ship, we ship", you make some digital art and we'll send you a drawing robot which can fabricate that art. 

Drawing thing is designed to be the best introduction to digital fabrication. It's a small machine you can own, take apart, play with, and modify at any level of its design. You can change the control software, path planning, machine interface and more all from a friendly browser-based IDE (and all in JavaScript).

![image](https://user-images.githubusercontent.com/27078897/210051827-ec3f2719-cfe1-448b-9c77-6a50a4dd31cd.png)

We're also pushing the state of the art with how hackable these machines can be by working with some researchers at MIT to create a new framework for modular machine control called [Modular Things](https://github.com/modular-things/modular-things
). 

You can learn more about Modular Things in the linked repo but the gist is that it allows to write "firmware" for embedded devices without ever having to actually re-flash those devices. Instead the firmware all runs in a high level host (like the browser) and each board runs a small networking program which allows you to access their dedicated functions (like a motor control board).   

<img width="1437" alt="Screen Shot 2022-12-30 at 12 53 45 AM" src="https://user-images.githubusercontent.com/27078897/210052343-8938f17c-c92b-4b83-9663-519fa1a02fe5.png">

That's cool and all but what can you do with them? Well whatever you want really, a good place to start is the sorts of things you would build with an Arduino but Modular Things is more extensible and accommodating of adding things like multiple
coordinate motors. That's why we're focused on building a delightful (and affordable) drawing machine. 

The leading design is strongly influenced by the [AxiDraw MiniKit 2](https://cdn.evilmadscientist.com/dl/ad/public/AxiDraw_MiniKit_v2.5b.pdf). But we've looked at quite a few:

- https://www.amazon.com/Educational-Robots-Toys-Preschool-Learning/dp/B07Z5B5HQH
- https://www.aliexpress.us/item/3256804588342853.html
- https://axidraw.com/
- https://www.media.mit.edu/projects/open-drawing-machine/overview/
- https://github.com/montoyamoraga/open-drawing-machine
- http://davepreiss.github.io/Portfolio/
- https://www.thingiverse.com/thing:3554
- https://www.thingiverse.com/thing:2349232
- https://www.youtube.com/watch?v=CW3tCkms7oM
- https://www.youtube.com/watch?v=XYqx5wg4oLU

## Stuff to Do

There is a lot to do. As previously stated the aim is to make a good quality and affordable drawing machine which is easily hackable by building it with modular things. The basis of many machines is a motion system so we plan to develop the drawing machines motion system in a fairly generic way. The pen tool could be easily swapped for some other sort of end effector. The interface will be created with web technologies in the same environment that the machine control is written and both of these will be modifiable to the user. In order for the machine to perform well we have to improve the path planning and motor control programs. Currently the Modular Things architecture requires one USB per an embedded device. It'd be nice with the devices could be networked to each other so we're also looking at creating a link layer that runs microcontroller to microcontroller.

## Getting Involved

If you want to follow along as we build the project out you can follow along on Slack in [development-of-things-and-stuff](https://app.slack.com/client/T0266FRGM/C04GCH8A91D/thread/C04GCH8A91D-1672275851.810779)

You can also get started working on generative design and pen plotting. [Drawingbots](https://drawingbots.net/) is a good resources. Specifically the [tool section](https://drawingbots.net/knowledge/tools) has a bunch of programs for making plottable patterns.

Here are some blogs about plotting which are worth checking out:

https://revdancatt.com/
https://penplotterartwork.com/
https://greweb.me/
https://targz.fr/
https://larswander.com/
https://www.v3ga.net/
https://bylr.info/
http://andymakes.com/#Plotter
https://www.eyesofpanda.com/
https://mattdesl.svbtle.com/pen-plotter-1

