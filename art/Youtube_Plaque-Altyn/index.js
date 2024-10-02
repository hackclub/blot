/*
@title: Youtube Plaque
@author: Altyn Bassoe
@snapshot: 0.png
*/

//Doc size
const width = 125;
const height = 125;
setDocDimensions(width, height);

//snake random

  const finalLines = [];
const rad = bt.randIntInRange(7, 16);
const len = bt.randIntInRange(12, 13);
const x_pos = bt.randIntInRange(50, 57);
const snake = new bt.Turtle()
.jump([x_pos, 93])
.setAngle(270)
.arc(180,3)
.forward(5)
.setAngle(90)
.arc(-180,2)
.forward(5)
.arc(180,3)
.forward(13)
.setAngle(0)
.arc(180,4)
.forward(3)
.arc(180,4)
.forward(3)

//all text/words

const Channel = []
Channel.push(...bt.text("Bedless Apple", [51, 40], 0.82))
const Youtube =[]
Youtube.push(...bt.text("youtube", [66, 15], 1))
const Presented =[]
Presented.push(...bt.text("Presented TO", [52, 45], 0.8))
const subs =[]
subs.push(...bt.text("For Passing          Subscribers", [34, 35], 0.78))

//frame below

const plaque = [];
const outline = [
  [30, 90],
  [100, 90],
  [100, 3],
  [30, 3],
  [30, 90]];

//plant in backround

const plant = new bt.Turtle();
plant.jump([15,0])
plant.arc(90, 6)
plant.forward(17)
plant.setAngle(180)
plant.forward(18)
plant.setAngle(270)
plant.forward(17)
plant.arc(90, 6)
plant.forward(8)
plant.jump([5,23])
plant.arc(90, 5)
plant.forward(10)
plant.jump([20,23])
plant.setAngle(180)
plant.arc(-90, 5)
plant.forward(10)
plant.setAngle(320)
plant.arc(180,7)
plant.setAngle(90)
plant.arc(180,10)
plant.setAngle(210)
plant.arc(180,6)

//Big YT logo outline below

const YTlogo = new bt.Turtle();
YTlogo.jump([82, 53])
YTlogo.arc(90, 6)
YTlogo.forward(20)
YTlogo.arc(90, 6)
YTlogo.forward(35)
YTlogo.arc(90, 6)
YTlogo.forward(20)
YTlogo.arc(90, 6)
YTlogo.forward(35)
drawLines([[[60,61],[72,67]],[[60,61],[60,75]],[[60,75],[72,67]]])

//small yt logo below

const SmallYTlogo = new bt.Turtle();
SmallYTlogo.jump([55, 10])
SmallYTlogo.arc(90, 5)
SmallYTlogo.forward(5)
SmallYTlogo.arc(90, 5)
SmallYTlogo.forward(15)
SmallYTlogo.arc(90, 5)
SmallYTlogo.forward(5)
SmallYTlogo.arc(90, 5)
SmallYTlogo.forward(15)
drawLines([[[45,14],[45,20]],[[45,14],[50,17]],[[45,20],[50,17]]])

//drawlines polylines below

plaque.push(outline);
bt.rotate(plaque, 0);
drawLines(plaque);
drawLines(Channel);
drawLines(Youtube);
drawLines(Presented);
drawLines(subs);
drawLines(plant.lines());
drawLines(YTlogo.lines());
drawLines(SmallYTlogo.lines());
drawLines(snake.lines(),{fill:"white",stroke:"black",width:"1"})

//numbers of subscribers below

const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("50", [63, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
 const number =[]
subs.push(...bt.text("100", [61, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
  const subs =[]
subs.push(...bt.text("1,000", [59, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("10,000", [59, 35], 0.75)) 
drawLines(subs);}
else{
 
  const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("100,000", [56, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("1,000,000", [56, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("5,000,000", [56, 35], 0.75)) 
drawLines(subs);}
else{

  const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("9,999,999", [56, 35], 0.75)) 
drawLines(subs);}
  else{

    const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("10,332", [59, 35], 0.75)) 
drawLines(subs);}
    else{

     const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("998,582", [59, 35], 0.75)) 
drawLines(subs);}
      else{

     const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("136,342", [59, 35], 0.75)) 
drawLines(subs);}
        else{

     const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("106,832", [59, 35], 0.75)) 
drawLines(subs);}
          else{

     const number = bt.randIntInRange(2,14)
if(number==2){
 const subs =[]
subs.push(...bt.text("6,232", [59, 35], 0.75)) 
drawLines(subs);}
            else{

     const number = bt.randIntInRange(7,7)
if(number==7){
 const subs =[]
subs.push(...bt.text("9,393", [59, 35], 0.75)) 
drawLines(subs);}
  }}}}}}}}}}}}}