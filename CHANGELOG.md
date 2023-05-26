# Changelog

This is a list of weekly developments for the drawing-thing updated every week.

## 2023-05-26 - @leomcelroy

Over the last two weeks I built a drawing interface/web editor for controlling the machine, added acknowledgments to the communication system, added COBS encoding and decoding.

Here is the draft interface:

<img width="1113" alt="Screen Shot 2023-05-26 at 10 44 05 AM" src="https://github.com/hackclub/haxidraw/assets/27078897/ca30829b-d886-4253-8fa9-216b2684c198">

I created two ways to make drawings. One is using the Turtle class which lets you create drawings programmatically, and two is by dropping an SVG into the editor which will automatically be converted into a Turtle. You can then use affine transformations (scale, rotate, translate) to position it properly. 

In the bottom right corner the editor has a little console. This was somewhat interesting to implement. I wanted it to have access to the functions in the top-level scope of the most recently run script. So you can define functions in the editor and then run them on command in the command line. I did this by rewriting the script a bit before running it.

Here is the relevant code:

```js
const ast = acorn.parse(code, { ecmaVersion: "latest" });

const topScopeInserts = [];

ast.body.forEach(statement => {
  const { type } = statement;

  if (type === "VariableDeclaration") {
    statement.declarations.forEach(x => {
      topScopeInserts.push(x.id.name);
    })
  }

  if (type === "FunctionDeclaration") {
    topScopeInserts.push(statement.id.name);
  }

})

topScopeInserts.forEach(name => {
  code += `\n;topScope["${name}"] = ${name};`
});
```

One design consideration when making the editor is that when a user calls the `runMachine()` function it should run the drawing which is currently visible.

Moving on to the firmware. It took a bit of patience to implement COBS properly. Though implementing it in JavaScript recently I willfully ignored doing so for the embedded instead opting to use newline delimiters for the communication stream. The ASCII for newline is `0x0A` otherwise known as 10. 10 periodically does show up in bytesteam encodings, which was giving me some trouble. This is what COBS is for, to give you a known unique character which will occur only at the end of your messages. The challenge in implementing it is my Arduino print statements (my primary debugging technique) no longer worked because the other end of my serial communication connection in the browser was then expecting 0 delimited messages. 

The solution is pretty straightforward though. Just implement the encoding and decoding incrementally. So first verify I can encode and decode messages just in JS. Then send encoded messages to the firmware but expect to receive back newline delimited messages so I can read the print statements. Then when I know everything else works encode the messages coming back up and decode them in JS.

I ended up using this pattern frequently for inspecting the packets:

```cpp
Serial.print("RECEIVED: ");
for (int i = 0; i < bufferIndex; i++) {
  Serial.print(msgBuffer[i]);
  Serial.print(", ");
}
Serial.println("DONE");
```

## 2023-05-15 - @leomcelroy

I made the JS controls function asyncronously by adding a number ID to each message and sending back acknowledgements. This allows us to write code like such:

```js
const port = await createWebSerialPort(rawPort);
const bytes = floatsToBytes([ x, y ]);
await port.send("go", bytes);
```

in which the machine actually executes and finishes the command before the await resolves.

In the firmware I have a list of `EventCallback` structs.

```c++
typedef void (*CallbackFunction)(uint8_t*, int);

struct EventCallback {
  String event;
  CallbackFunction callback;
};

const int MAX_EVENTS = 255; // Maximum number of events to store, adjust as needed
EventCallback eventCallbacks[MAX_EVENTS];
int eventCount = 0;

void on(String event, CallbackFunction callback) {
  if (eventCount < MAX_EVENTS) {
    eventCallbacks[eventCount].event = event;
    eventCallbacks[eventCount].callback = callback;
    eventCount++;
  } else {
    Serial.println("Max number of events reached. Cannot register new event.");
  }
}

bool triggerEvent(String event, uint8_t* payload, int payloadLength) {
  for (int i = 0; i < eventCount; i++) {
    if (eventCallbacks[i].event == event) {
      // want to pass payload and payloadLength, need to get response payload
      eventCallbacks[i].callback(payload, payloadLength);
      return true;
    }
  }

  Serial.println("No event registered.");
  return false;
}
```

You may notice this is still somewhat incomplete as I'm not sending back response payloads. This could be added fairly easily though I don't actually have a need for it now. I was also planning to use interrupts but haven't completed that yet. I got a bit sidetracked testing writing firmware with other languages. Specifically Nim and TinyGo.

Both were fairly easy to set up. I used [piconim](https://github.com/EmbeddedNim/picostdlib) for Nim and TinyGo just worked out of the box (https://tinygo.org/docs/reference/microcontrollers/xiao-rp2040/). So far TinyGo has the cleanest development experience. After downloading the compiler you just need to use these two commands to build UF2s

```
tinygo build -target=xiao-rp2040 -gc=none -o hello.uf2 ./test.go
```

or flash UF2s

```
tinygo flash -target=xiao-rp2040 ./test.go
```

## 2023-05-08 - @leomcelroy

It looks like we'll be using the single control board designed for the drawing machine in the version we ship. Consequently I'm writing the firmware for this specific machine. Some design considerations:

- We should still be able to interface with the machine in high-level languages as a virtual object.
- The motor control should be good

These two goals and our approaches to addressing them are heavily influenced by the work we did the Modular Things project. For the first goal we need to define a communication interface. Almost like a REST API for the machine (if you're coming from the web dev world). 

Motor control is a tricky topic. Historically most digital fabrication machines have been built around [GRBL](https://github.com/grbl/grbl) recently [Klipper3D](https://www.klipper3d.org/) has risen in popularity.

The basic problem is about figuring out how to turn multiple motors who's collective motion results in the movement of the machine in a controlled manner. In the case of our machine we have two motors which are coupled together through a belt. 

In short I managed to write a fairly low quality motion controller (but a functional one) which has constant speed. Preferably we would set maximum accelerations and the planner would figure out the appropriate speeds based on the path it needs to take. But we'll build up to that in the coming weeks. We are sending out machines to testers and developers now so we need to have a nice interface for people to develop devices.

Something like this:

```js
import { createHaxidraw } from "createHaxidraw.js";

await haxidraw.servo(-90);
await haxidraw.moveTo(x, y);
```

This is a virtual machine which communicates with the actual machine through the serial port.

On the other side of this communication is the firmware. I took five passes on this and ultimately made one that does the right thing by using Bresenham's Line Algorithm to coordinate the stepper motor motion. The relevant code is below:

```c++
void goTo(float x, float y) {
    // Set your target distances for each motor (in steps)
  float motor1Target = (x + y) - pos[0];
  float motor2Target = (y - x) - pos[1];

  // Set motor direction based on target values
  digitalWrite(motor1DirPin, motor1Target >= 0 ? HIGH : LOW);
  digitalWrite(motor2DirPin, motor2Target >= 0 ? HIGH : LOW);

  // Calculate the relative speeds and maximum duration for both motors
  float maxSteps = max(abs(motor1Target), abs(motor2Target));
  float motor1Speed = abs(motor1Target) / maxSteps;
  float motor2Speed = abs(motor2Target) / maxSteps;

  unsigned long stepDuration = 500; // The time it takes to perform one step in microseconds
  unsigned long motor1StepInterval = stepDuration / motor1Speed;
  unsigned long motor2StepInterval = stepDuration / motor2Speed;

  // Initialize variables for step timing
  unsigned long motor1PrevStepTime = 0;
  unsigned long motor2PrevStepTime = 0;
  float motor1Step = 0;
  float motor2Step = 0;

  // Loop until both motors reach their target steps
  while (abs(motor1Step) < abs(motor1Target) || abs(motor2Step) < abs(motor2Target)) {
    unsigned long currentTime = micros();

    // Motor 1
    if (abs(motor1Step) < abs(motor1Target) && currentTime - motor1PrevStepTime >= motor1StepInterval) {
      digitalWrite(motor1StepPin, HIGH);
      delayMicroseconds(1);
      digitalWrite(motor1StepPin, LOW);
      delayMicroseconds(1);

      motor1Step += (motor1Target >= 0 ? 1.0 : -1.0)/SPU;
      motor1PrevStepTime = currentTime;
    }

    // Motor 2
    if (abs(motor2Step) < abs(motor2Target) && currentTime - motor2PrevStepTime >= motor2StepInterval) {
      digitalWrite(motor2StepPin, HIGH);
      delayMicroseconds(1);
      digitalWrite(motor2StepPin, LOW);
      delayMicroseconds(1);

      motor2Step += (motor2Target >= 0 ? 1.0 : -1.0)/SPU;
      motor2PrevStepTime = currentTime;
    }
  }

  pos[0] += motor1Step;
  pos[1] += motor2Step;
}
```

Ella and I ported some of the interfaces from Modular Things to be stand alone web-pages.

Using the Turtle drawing tool I managed to get some images which came out more or less as intended.

![PXL_20230506_055516518 (1)](https://user-images.githubusercontent.com/27078897/236872728-09c65721-2e53-40ab-93e9-96a6875925c6.jpg)

Next I'm going to use interrupts to make the movement code non-blocking in the firmware and have the JS messages properly await confirmations (or "acks") from the machine.

## 2023-05-01 - @exu3

Last week, we recevied the control boards from JLCPCB, and I assembled a few. I documented the components and assembly process in [`motor-control-board/`](./motor-control-board/README.md). Here's a photo of what the board looks like:

![assembled control board](https://cloud-gxlagq7i7-hack-club-bot.vercel.app/0img_4025.jpg)

The next step would be writing firmware for this board so that it can be used in the modular-things editor.

I also wrote an assembly guide for the drawing machine so people can start building them. It can be found in [`drawing-thing-v2/ASSEMBLY.md`](./drawing-thing-v2/ASSEMBLY.md). The Bill of Materials, adding line numbers which correspond to the various bags of hardware that people will receive the drawing machine parts in.

## April 2023 - @leomcelroy

Not directly about the development but during this month I went to two conferences where I shared the machine. You can read about them in my Slack posts here:

https://hackclub.slack.com/archives/C04GCH8A91D/p1681746685468929

and here:

https://hackclub.slack.com/archives/C04GCH8A91D/p1682972980825199

## 2023-04-03 - @leomcelroy

Big updates from last week!

I decided to make a single control board to make it easier to send people supplies to complete due diligence on what the cheapest version of the machine might be. A contributor to SVG PCB recently submitted some PRs adding excellent Gerber support so I took great satisfaction designing the boards in my own CAD tool and ordering them from JLCPCB. You can find the design [here](./motor-control-board/). You can also play with the [design in the SVG-PCB editor here](https://leomcelroy.com/svg-pcb/?file=https://raw.githubusercontent.com/hackclub/drawing-thing/main/motor-board.js).

Here is a picture of the board.

![anon (29)](https://user-images.githubusercontent.com/27078897/229582246-6fe83a9a-d152-4247-8ec1-05eac1996bb9.png)

We've made heaps of pen holders but none were stiff enough. Not anymore! By 3D printing a rail and using a similar v-wheel carriage design to the rest of the machine we were able to make this slick little servo-driven z-axis which works very well. I'm extremely pleased with this design!

![Screen Shot 2023-04-05 at 11 54 21 AM](https://user-images.githubusercontent.com/27078897/230136134-608da594-d128-4077-90af-82aeeda1ac40.png)

Thanks to finally having a good pen holder we were able to put together a well functioning complete machine. Conveniently this happened on the day Ella came to visit cambridge so we got to run it together.

We also wrote a [small Turtle drawing library](./editor-examples/turtle.js) which can drive the machine. You can first visualize what you will draw in the editor and then run the machine.

<img width="991" alt="Screen Shot 2023-04-04 at 1 30 21 PM" src="https://user-images.githubusercontent.com/27078897/229871440-1ce4843d-60e7-4c8e-8a62-0cfbdd91c1ce.png">

Here are some shots of the complete device below.

![PXL_20230331_155348599](https://user-images.githubusercontent.com/27078897/229580877-e9b5ddb2-307a-4a15-a72b-7476413d2106.jpg)

![PXL_20230331_180032688](https://user-images.githubusercontent.com/27078897/229580879-11ef0f5d-234c-4880-a3fd-4ee8dbe78cbb.jpg)
![PXL_20230331_180037006](https://user-images.githubusercontent.com/27078897/229580881-2e2974af-0c2f-416a-b622-705ffee39d0f.jpg)

![PXL_20230331_190512856](https://user-images.githubusercontent.com/27078897/229580883-e7aa550a-e553-4fa2-98c8-350248c619ae.jpg)
![PXL_20230331_181623941](https://user-images.githubusercontent.com/27078897/229580887-b8b1f037-6bfd-4293-abf1-afa319781167.jpg)
![PXL_20230401_194444526](https://user-images.githubusercontent.com/27078897/229580889-4126d6ec-d9ff-42d8-a2f6-cb6034fc875a.jpg)

## 2023-03-28 - @leomcelroy

This week I released a toy re-implementation of the networking library we are using for modular things.
You can find this library here [modular-things/nosap](https://github.com/modular-things/nosap).
The point of this is better understand what [OSAP](http://osap.tools/) (current JavaScript implementation [here](https://github.com/jakeread/osapjs/tree/main)) does and what it needs to do.
Primarily it's a library for packing and routing messages across devices.

It differs somewhat from what Jake (the original OSAP author) describes in his [approach](http://osap.tools/approach/) for the sake of making things simpler and easier to comprehend.
Hopefully these difference will diminish in the near future.
In a series of long conversations with Jake I've come to better understand OSAP itself and I believe to persuade him to remove notions of hierarchy from the graph design.

I'd like to make a visualizer for networks in the toy implementation which can be used to investigate actual OSAP networks in the future. Which brings us to another thing we worked on last week.

We released a [TODO list](https://github.com/hackclub/drawing-thing/blob/main/TODO.md) to help people find ways to participate in the project. This will evolve into proper GitHub issues with good project management but we started just by dumping thoughts and tasks into this Markdown document.

## 2023-03-20 - @leomcelroy

This week we tested some resin parts, built two pen holders, and published the BOM (bill of materials) for the most up to date machine design.

We ordered the parts from [JLCPCB's 3D printing service](https://jlcpcb.com/3d-printing) which is amazingly cheap and quick. The concern using resin prints over FDM ones is that resin tends to be more brittle. The print quality is very nice and consistent though so the verdict is still up in the air.

A friend Rob Hart helped design a sliding mechanism for a pen holder with very few parts. It uses 3 little posts on compliant levers which act as little springs holding the moving portion of the design in place. The other pen design is an adapted version of the lever which B. Smith used all the way back in our v0 prototype. You can see both of these designs in the photos below.

Below is the full slider machine with resin parts:

<img width="930" alt="slider" src="https://user-images.githubusercontent.com/27078897/226514041-fc2cbc7f-644f-4fa9-8e50-8c01ac3027af.png">

Here is the front of the slider:

<img width="854" alt="front slider" src="https://user-images.githubusercontent.com/27078897/226514096-f837e4fe-2329-4fe8-a91b-4b59f1c8e555.png">

Here is the inner portion:

<img width="510" alt="inner slider" src="https://user-images.githubusercontent.com/27078897/226514143-354ff9eb-48ae-4fe0-ab09-2daeb55cefad.png">

Here is the same machine with a lever pen holder:

<img width="974" alt="lever" src="https://user-images.githubusercontent.com/27078897/226514072-dec44dda-8f80-48c5-9f13-a7c76f246998.png">

I also organized and published the materials and STL files for this current machine design. [The BOM can be found here](https://github.com/hackclub/drawing-thing/blob/main/BOM.md).

## 2023-03-10 - @leomcelroy

> https://hackclub.slack.com/archives/C04GCH8A91D/p1678497440093879

Time for this week's update! We've got yet another rework of some key parts of the design.

First, those who have been following know I've been battling for weeks with making the motor brackets stiffer so they don't bend under loads from the belts. They were starting to get a bit chunky when what I really wanted to do was make the side supports taller. You can see in the second picture I was able to thin out the material and make the stiffest bracket yet. I also made the lever the belt pulls on a bit shorter by moving the motors closer to each other. The two main wins in decreasing the distance were removing some extra material where the aluminum extrusion attaches to the rest of the bracket and moving the foot to the other side (so it's no longer between the motor and the plastic).

The biggest change yet is we're testing a 3D printed carriage design. It won't be as stiff as the sandwiched metal plates but it should be stiff enough and it's much easier to assemble. I was able to knock more than 10 parts off the bill of materials (BOM) with this.

I also spent some time with our collaborators at MIT looking at the networking system used among the boards in the machine. I started to implement it from scratch to test my own understanding and to see if there are parts we can simplify. One of the most interesting parts was learning about [consistent overhead byte stuffing](https://en.wikipedia.org/wiki/Consistent_Overhead_Byte_Stuffing).

Looking forward we still need to sort out our pen holder, design a custom connector for board-to-board communication, figure out power delivery (right now everything is powered by 5V), and put the whole system through its paces.

<img src="https://cloud-8drubj8im-hack-club-bot.vercel.app/0screen_shot_2023-03-10_at_8.09.23_pm.png" width="300" alt="latest development of machine"><img src="https://cloud-8drubj8im-hack-club-bot.vercel.app/1screen_shot_2023-03-10_at_8.10.52_pm.png" width="300" alt="stiffer motor brackets">

## 2023-03-03 - @exu3

> https://hackclub.slack.com/archives/C04GCH8A91D/p1677875892149909

This week, I got the latest version of the 2d-cut parts fabricated using metal for a better test to see how the machine flexes/bends/moves when tensioned. I sent the DXF files to a super cool local manufacturing company to get them fabricated. The pieces were cut from 1/4" thick aluminum on a waterjet, then sandblasted to remove burr.

<img src="https://cloud-9j4oha9ti-hack-club-bot.vercel.app/0img_3612.jpg" alt="machine with metal plats and feet" width="500">

## 2023-02-24 - @leomcelroy

> https://hackclub.slack.com/archives/C04GCH8A91D/p1677285634597069

Time for this week's update. The hardware design is starting to anneal. The key thing I've been paying attention to is how belt tension bends/twists parts of the device. This is primarily an issue on the side motor brackets. You can see how it's been beefed up in the first image.

In addition to Ella's pen holder we experimented with a minimal part sliding design which you can see in the second image. Thanks to Rob Hart for assisting with this one.

Ultimately the flat pieces (carriage plates and feet) will be made out of metal. Consequently they'll be much stiffer than the current plates which bend (causing the wheels to wiggle) if you stick out floating axis arm and press on it. In order to get a more representative test I cut some plate from Delrin on a ShopBot (seen in image 3). The best test though would just be to have them fabricated from aluminum as the design intends. I'll try an order for that next week.

<img src="https://cloud-605hpcdwy-hack-club-bot.vercel.app/2screen_shot_2023-02-24_at_7.26.54_pm.png" width="500" alt="">
<img src="https://cloud-605hpcdwy-hack-club-bot.vercel.app/1screen_shot_2023-02-24_at_7.28.19_pm.png" width="500" alt="">
<img src="https://cloud-605hpcdwy-hack-club-bot.vercel.app/0pxl_20230223_205609117__1_.jpg" width="500" alt="delrin on shop bot">

## 2023-02-17 - @exu3

> https://hackclub.slack.com/archives/C04GCH8A91D/p1676690988312429

This week’s update in development of the drawing thing includes the fabrication yet another prototype and improvements correcting some issues. The images below are the CAD models of latest prototype. Notable revisions include:

- Using flanged bearings instead of normal bearings inside the 3D printed idlers. I found the normal 625 bearings a bit difficult to fit inside the idlers and cracked some plastic idlers in the process of getting them in.
- The carriage is now a sandwich, which helps with making it more stable. In previous designs, it was a flexing a bit. Adding the extra v-wheel was also helpful.

I also thought about a new design for the pen holder. Specifically using a compliant mechanism, to reduce the number of parts needed, and because I think they are cool. I haven’t fabricated this part yet, but it will be one of my objectives for the week ahead.

<img src="https://cloud-lqlntubb2-hack-club-bot.vercel.app/0screenshot_2023-02-17_at_10.22.40_pm.png" width="300" alt="3d model of machine prototype"> <img src="https://cloud-lqlntubb2-hack-club-bot.vercel.app/1screenshot_2023-02-17_at_10.17.23_pm.png" width="300" alt="3d model of machine prototype">

## 2023-02-10 - @leomcelroy

> https://hackclub.slack.com/archives/C0M8PUPU6/p1676083722576069

Here's another update on the drawing machine @Ella and I are making. You can follow along in #development-of-things-and-stuff.

This week we made another prototype design (1st photo), fabricated it, then yet another prototype design correcting more issues we found. The improvements involved 3D printing idlers with 625 bearings inside in order to reduce part count and hone in on the dimensions we need to align the belt. The belt sits in a cross formation which allows two motors to control the x and y motion through coupled kinematics. The idlers sit on the carriage which moves and redirect the belt along each side of the perpendicular axis. You can see this in the 2nd photo below.

The main issues with the design we fabricated this week were the whole machine tipping because the feet had too narrow a base, the belts being misaligned, and the carriage flexing. In the third photo you can see we made the machine more stable by adding wider feet, we repositioned the idlers to align the belts, and we also swapped the double beam for a single one (plus added an extra v-wheel) to help with the carriage flexing issue. In the final machine we'll probably make the carriage plate out of aluminum with a service like SendCutSend which will make it much stiffer than our 3D printed prototypes.

Ella also made a very nice pen holder (4th photo) which cleverly uses nails as rails.

I took a pass at creating an SVG importing interface within the modular things editor. You can import svgs which get separated based on color, then rearrange them and apply some basic affine transformations to them. This is the start to an interface for dropping in vector drawings which the machine will then make.

Very excited to start making art with this soon!

<img src="https://cloud-e1pbn3n73-hack-club-bot.vercel.app/3screen_shot_2023-02-10_at_9.31.20_pm.png" width="500" alt="3d model of machine prototype"><img src="https://cloud-e1pbn3n73-hack-club-bot.vercel.app/2screen_shot_2023-02-10_at_9.36.23_pm.png" width="500" alt="machine wheels">
<img src="https://cloud-e1pbn3n73-hack-club-bot.vercel.app/1screen_shot_2023-02-10_at_9.30.53_pm.png" width="500" alt="machine with improved feet design"><img src="https://cloud-e1pbn3n73-hack-club-bot.vercel.app/0img_3313__2_.jpg" width="500" alt="pen holder that uses nails as rails">

## 2023-02-03 - @exu3

> ohyeah it's a drawing-thing
