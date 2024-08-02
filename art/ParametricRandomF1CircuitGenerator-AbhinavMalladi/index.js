/*
@title: Parametric Random F1 Circuit Generator
@author: Abhinav Malladi
@snapshot: Track.png
*/

//document size - change as you wish, everything else will scale parametrically
const width = 210;
const height = 297;

setDocDimensions(width, height);

//can also be messed around with, but have been somewhat tuned for decent tracks
const control_points_amount = 34;
const nurbs_curve_degree = 20;

//find midpoint of page
const midx = width/2;
const midy = height/2;




//F1 Polyline DO NOT EDIT VALUES!
//By Liberty Media - https://www.formula1.com/, Public Domain, https://commons.wikimedia.org/w/index.php?curid=145228957
//Registered trademark symbol removed due to small size
const F1_width = 120;
const F1_height = 30;
const F1 = [[[90, 0], [120, 30], [102, 30], [72, 0], [90, 0]]];
const F1_lower_F = [[[86, 17], [49, 17], [32, 12], [20, 0], [36, 0], [40, 4], [48, 6], [75, 6], [86, 17]]];
const F1_upper_F = [[[31, 14], [17, 0], [0, 0], [21, 21], [47, 30], [99, 30], [88, 19], [48, 19], [31, 14]]];
bt.join(F1, F1_lower_F, F1_upper_F);

//Scale F1 logo to stay in page size
let scale_width = (width*0.8)/F1_width;
let scale_height =(height*0.1)/F1_height;
if(width*0.2 < height*0.1){
  bt.scale(F1, scale_width, [0,0]);
}
else{
  bt.scale(F1, scale_height, [0,0]);
}

//Translate F1 Logo
bt.originate(F1);
bt.translate(F1, [midx,height*0.9]);




//point generation polyline
const polyline = [];

//generate random points on page
for(let i = 0; i<control_points_amount; i++){
  polyline.push([
    bt.randInRange(width*0.1, width*0.9),
    bt.randInRange(height*0.1, height*0.8)
  ]);
}

//sort the points so they run "anti clockwise" around the centre, by using angle from page centre
//this is done using the atan2 function and a custom sorting function
polyline.sort(function(a,b){
  return Math.atan2((a[1]-midy), (a[0]-midx)) - Math.atan2((b[1]-midy), (b[0]-midx))
});

//add beginning point to end to make a polygon
polyline.push([
  polyline[0][0],
  polyline[0][1]
]);




//turn lines into a curve
//make options object to be passed to the nurbs curve maker
const curve_ops = {
  degree: nurbs_curve_degree
};
const curve = [bt.nurbs(polyline, curve_ops)];

//Create track outline from track curve
const inner_line = bt.copy(curve);
const outer_line = bt.copy(curve);
bt.offset(inner_line, -((width+height)/160));
bt.offset(outer_line, ((width+height)/160));

//join all polylines for drawing
const joined_polylines = bt.copy(inner_line);
bt.join(joined_polylines, outer_line, F1);

//draw lines to page
drawLines(joined_polylines);