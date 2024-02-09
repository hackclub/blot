const width = 125;
const height = 125;
setDocDimensions(width, height);

const t = createTurtle();

//l = number of rings
for(let l = 1; l<4; l++){
    var r = randInRange(5,width/2.5) //radius
    var rotation = randIntInRange(0,205)
    //r is the radius of the ring, r/3 is used so that there is a little bit of gap between flowers
  for(let x = -r; x < r; x=(r/3)+x){
      //r^2 = x^2 + y^2
      var y = Math.sqrt((r*r) - (x*x))
      
      for(let i = 0; i < 6; i++){
        //this is to create flowers on the positive y axis and the negative y axis
        const t1 = fatromb(72*i, [x,y], rotation,r/8)
        const t2 = fatromb(72*i, [-x,-y], rotation, r/8)
        // r/8 is used for the size of the flower so it's smaller inwards, bigger outwards
        
        //more random sizing, this one is similar to earlier lines but it doesn't follow the "smaller inwards bigger outwards" rule
        //const t1 = fatromb(72*i, [x,y], rotation,l*6)
        //const t2 = fatromb(72*i, [-x,-y], rotation, l*6)

        //this moves the flowers to the center of the canvas
        t1.translate([width/2,height/2])
        t2.translate([width/2,height/2])
        t.join(t2)
        t.join(t1)
      }
  }
}


drawTurtles([
    t
]);


function fatromb(angle, tran = [0,0], rot = 0, size=4) {
  const t = createTurtle()
  //setup
  t.right(angle)

    //we choose 108 and 72 because their sum equals 180
  t.forward(size)
  t.right(72)
  t.forward(size)
  t.right(108)
  t.forward(size)
  t.right(72)
  t.forward(size)

  t.translate(tran)
//this rotates the flowers by a degree to add variety
  t.rotate(rot)
  return t
}
