# Changelog

This is a list of weekly developments for the drawing-thing updated every Friday.

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
