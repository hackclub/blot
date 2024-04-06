/*
@title: Circles
@author: Anshuman Mishra
@snapshot: Original.png
*/

// welcome to blot!
const width = 400;
const height = 400;

setDocDimensions(width, height);
const t = new bt.Turtle();
t.jump([200, 0])
t.arc(370, 133)
t.jump([290, 0])
t.arc(370, 133)
t.jump([177, 10])
t.arc(370, 133)
t.jump([199, 150])
t.arc(370, 133)
t.jump([353, 166])
t.arc(370, 133)
t.jump([299, 166])
t.arc(370, 133)
t.jump([331, 131])
t.arc(370, 133)
drawLines(t.lines());
