/*
@title: Minion
@author: Amish Gupta
@snapshot: Minion1.png
*/
const width = 125;
const height = 125;

setDocDimensions(width, height);

// Minion's Body
const body = new bt.Turtle()
body.jump([22.5, 81.5])
body.goTo([22.5, 0])
body.jump([100.0, 81.0])
body.goTo([100.0, 0])
drawLines(body.lines(), {fill:"yellow"})

const head = new bt.Turtle()
head.jump([100.0, 81.0])
head.setAngle(104)
head.arc(152, 40);
drawLines(head.lines(), {fill:"yellow"})

const random = bt.randIntInRange(58, 60)
const hair = new bt.Turtle()
hair.jump([random, 109.4])
hair.setAngle(90)
hair.arc(27, 26);

const random1 = bt.randIntInRange(57, 58.5)
hair.jump([random1, 109.4])
hair.setAngle(96)
hair.arc(18, 26);

const random2 = bt.randIntInRange(55, 56.5)
hair.jump([random2, 109.4])
hair.setAngle(102)
hair.arc(9, 26);

const random3 = bt.randIntInRange(61, 63)
hair.jump([random3, 119.8])
hair.setAngle(66)
hair.arc(32, -19);

const random4 = bt.randIntInRange(64, 66)
hair.jump([random4, 116.3])
hair.setAngle(61)
hair.arc(22, -19);

const random5 = bt.randIntInRange(66, 68)
hair.jump([random5, 113.2])
hair.setAngle(61)
hair.arc(13, -19);
drawLines(hair.lines())

// arms

const arms = new bt.Turtle()

// left arm

// left part 1
arms.jump([26.7, 35.7])
arms.setAngle(131)
arms.arc(29, -28);

arms.jump([38.1, 27.8])
arms.setAngle(165)
arms.arc(19.3, -55);

arms.jump([78.1, 30.8])
arms.setAngle(8)
arms.arc(12.8, -55);

arms.jump([83.7, 27.4])
arms.setAngle(-35)
arms.arc(6.8, -55);

arms.jump([83.7, 27.4])
arms.goTo([83.7, 24.9])

arms.jump([78.7, 25.3])
arms.setAngle(307)
arms.arc(28.7, -13);

// left part 2
arms.jump([22.5, 28.5])
arms.setAngle(131)
arms.arc(30, -28);

arms.jump([34.3, 20.5])
arms.setAngle(165)
arms.arc(32.0, -55);

// right arm

//right part 1
arms.jump([78.0, 24.7])
arms.setAngle(536)
arms.arc(50, -28);

arms.jump([78.0, 24.7])
arms.goTo([63.0, 28.7])

arms.jump([63.0, 28.7])
arms.setAngle(-37)
arms.arc(16.6, -55);

arms.jump([49.2, 36.4])
arms.setAngle(28)
arms.arc(21.7, -13);

arms.jump([45.4, 33.1])
arms.setAngle(-14)
arms.arc(21.7, -13);

arms.jump([40.6, 33.3])
arms.setAngle(62)
arms.arc(26.0, -13);

// right part 2
arms.jump([72.9, 17.6])
arms.setAngle(523)
arms.arc(55, -28);

arms.jump([64.0, 21.4])
arms.setAngle(508)
arms.arc(18, -33);
arms.jump([56.6, 26.4])
arms.setAngle(497)
arms.arc(20, -33);

drawLines(arms.lines(), {fill:"black"})

// Minion's Face
const goggles = new bt.Turtle()
goggles.jump([61.6, 55.5])
goggles.arc(360, 21);
drawLines(goggles.lines(), {fill:"silver"})

const inner_goggles = new bt.Turtle()
inner_goggles.jump([61.7, 59.4])
inner_goggles.arc(360, 17);
drawLines(inner_goggles.lines(), {fill:"yellow"})

const eyelid = new bt.Turtle()
eyelid.jump([45.3, 78.4])
eyelid.goTo([78.2, 78.4])
eyelid.jump([45.3, 78.4])
eyelid.setAngle(-61)
eyelid.arc(122, 18.8)
drawLines(eyelid.lines(), {fill:"white"})

const random6 = bt.randIntInRange(52, 53)
const eye = new bt.Turtle()
eye.jump([random6, 78.4])
eye.setAngle(-97)
eye.arc(194, 6.2)
drawLines(eye.lines(), {fill:"brown"})

const pupil = new bt.Turtle()
pupil.jump([55.7, 78.4])
pupil.setAngle(-85)
pupil.arc(170, 3.4)
drawLines(pupil.lines(), {fill:"black"})

const goggle_band = new bt.Turtle()
goggle_band.jump([22.5, 80.1])
goggle_band.goTo([40.9, 80.1])
goggle_band.jump([22.5, 70.5])
goggle_band.goTo([41.5, 70.5])

goggle_band.jump([100.1, 79.8])
goggle_band.goTo([82.3, 80.0])
goggle_band.jump([100.1, 70.5])
goggle_band.goTo([81.7, 70.5])
drawLines(goggle_band.lines(), {fill:"black"})

const frown = new bt.Turtle()
frown.jump([73.1, 42.1])
frown.setAngle(-221)
frown.arc(100, 10.9)
drawLines(frown.lines())

































