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

const polyline = [];

//generate random points on page
for(let i = 0; i<control_points_amount; i++){
  polyline.push([
    bt.randInRange(width*0.1, width*0.9),
    bt.randInRange(height*0.1, height*0.9)
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
const curve = bt.nurbs(polyline, curve_ops)

//draw lines to page
const draw_ops = {
  width: ((width+height)/20)
};
drawLines([curve], draw_ops);
