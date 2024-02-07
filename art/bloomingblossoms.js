const width = 125;
const height = 125;
setDocDimensions(width, height);

const t = createTurtle();

for(let l = 1; l<4; l++){
    var r = randInRange(5,width/2.5) //radius
    var rotation = randIntInRange(0,205)
  for(let x = -r; x < r; x=(r/3)+x){
      //r^2 = x^2 + y^2
      var y = Math.sqrt((r*r) - (x*x))
   
      for(let i = 0; i < 6; i++){
        //smaller inwards, bigger outwards
        const t1 = fatromb(72*i, [x,y], rotation,r/8)
        const t2 = fatromb(72*i, [-x,-y], rotation, r/8)
        
        //more random sizing
        //const t1 = fatromb(72*i, [x,y], rotation,l*6)
        //const t2 = fatromb(72*i, [-x,-y], rotation, l*6)
        
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
  
  t.forward(size)
  t.right(72)
  t.forward(size)
  t.right(108)
  t.forward(size)
  t.right(72)
  t.forward(size)

  t.translate(tran)
  t.rotate(rot)
  return t
}